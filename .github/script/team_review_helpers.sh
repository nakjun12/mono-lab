#!/bin/bash

# 팀 멤버 정보 가져오기
get_review_member_info() {
    local team_members="$1"
    local author_github_id="$2"
    local info_key="$3"
    echo "$team_members" | jq -r --arg author_github_id "$author_github_id" '.members[] | select(.github_id == $author_github_id) | .'"$info_key"''
}

# 리뷰어 선택 및 멘션 생성
select_reviewers_and_create_mentions() {
    local team_members="$1"
    local author="$2"
    local num_reviewers="${3:-2}"  # 기본값 2

    local reviewers=$(echo "$team_members" | jq -r --arg author "$author" '.members[] | select(.github_id != $author) | .github_id' | shuf -n "$num_reviewers")

    local reviewer_mentions=""
    for reviewer_github_id in $reviewers; do
        local reviewer_slack_id=$(get_review_member_info "$team_members" "$reviewer_github_id" "slack_id")
        reviewer_mentions+="<@${reviewer_slack_id}> "
    done

    echo "$reviewer_mentions"

}

# 작성자 확인
check_author() {
    local team_members="$1"
    local author="$2"

    if ! echo "$team_members" | jq -e --arg author "$author" '.members[] | select(.github_id == $author)' > /dev/null; then
        echo "PR author ${author} is not in the notification list. Skipping notification."
        return 1
    fi
    return 0
}


# 리뷰어 할당 및 Slack 멘션 생성 (개선된 버전)
assign_reviewers_and_create_mentions() {
    local pr_author_login="$1"
    local github_token="$2"
    local github_repository="$3"
    local pr_number="$4"
    local review_members="$5"

    echo "DEBUG: 리뷰어 할당 시작" >&2
    echo "DEBUG: PR 작성자: $pr_author_login" >&2
    echo "DEBUG: 저장소: $github_repository" >&2
    echo "DEBUG: PR 번호: $pr_number" >&2

    local MAX_REVIEWERS=1

    # review_members 유효성 검사
    if [ -z "$review_members" ]; then
        echo "ERROR: review_members가 비어있습니다" >&2
        return 1
    fi

    # JSON 파싱 가능 여부 확인
    if ! echo "$review_members" | jq . >/dev/null 2>&1; then
        echo "ERROR: review_members가 유효한 JSON이 아닙니다" >&2
        echo "DEBUG: review_members 내용: $review_members" >&2
        return 1
    fi

    # 후보자 목록 추출
    local CANDIDATES=$(echo "$review_members" | jq -r --arg author "$pr_author_login" '.members[] | select(.github_id != $author) | .github_id')
    echo "DEBUG: 후보자 목록: $CANDIDATES" >&2

    if [ -z "$CANDIDATES" ]; then
        echo "ERROR: 리뷰 가능한 후보자가 없습니다 (작성자: $pr_author_login 제외)" >&2
        return 1
    fi

    local REVIEWER_IDS=$(echo "$CANDIDATES" | shuf -n "$MAX_REVIEWERS" | tr '\n' ',' | sed 's/,$//')
    echo "DEBUG: 선택된 리뷰어 ID: $REVIEWER_IDS" >&2

    if [ -z "$REVIEWER_IDS" ]; then
        echo "ERROR: 리뷰어 선택에 실패했습니다" >&2
        return 1
    fi

    # 리뷰어 배열 생성 및 API 호출
    IFS=',' read -ra REVIEWER_ARRAY <<< "$REVIEWER_IDS"
    local REVIEWERS_JSON=$(printf '%s\n' "${REVIEWER_ARRAY[@]}" | jq -R . | jq -s .)
    echo "DEBUG: GitHub API용 JSON: $REVIEWERS_JSON" >&2

    # GitHub API로 리뷰어 추가
    echo "DEBUG: GitHub API 호출 시작" >&2
    local API_RESPONSE=$(curl -s -X POST \
      -H "Authorization: token $github_token" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$github_repository/pulls/$pr_number/requested_reviewers" \
      -d "{\"reviewers\": $REVIEWERS_JSON}")

    echo "DEBUG: GitHub API 응답: $API_RESPONSE" >&2

    # API 응답에서 오류 확인
    if echo "$API_RESPONSE" | jq -e '.message' >/dev/null 2>&1; then
        echo "ERROR: GitHub API 호출 실패: $(echo "$API_RESPONSE" | jq -r '.message')" >&2
        return 1
    fi

    # Slack 멘션 생성
    local REVIEWER_MENTIONS=""
    for reviewer_id in "${REVIEWER_ARRAY[@]}"; do
        if [ -z "$reviewer_id" ]; then
            echo "DEBUG: 빈 reviewer_id 건너뜀" >&2
            continue
        fi

        local slack_id=$(get_review_member_info "$review_members" "$reviewer_id" "slack_id")
        echo "DEBUG: $reviewer_id의 Slack ID: $slack_id" >&2

        if [ -z "$slack_id" ] || [ "$slack_id" = "null" ]; then
            echo "WARNING: $reviewer_id의 Slack ID를 찾을 수 없습니다" >&2
            continue
        fi

        REVIEWER_MENTIONS+="<@$slack_id> "
    done

    if [ -z "$REVIEWER_MENTIONS" ]; then
        echo "ERROR: Slack 멘션 생성에 실패했습니다" >&2
        return 1
    fi

    echo "DEBUG: 생성된 Slack 멘션: $REVIEWER_MENTIONS" >&2
    echo "\n*리뷰어:* $(echo $REVIEWER_MENTIONS | xargs) :crown-sw:"
}