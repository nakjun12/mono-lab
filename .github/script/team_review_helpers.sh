#!/bin/bash

# 팀 멤버 정보 가져오기
get_member_info() {
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
        local reviewer_slack_id=$(get_member_info "$team_members" "$reviewer_github_id" "slack_id")
        reviewer_mentions+="(<@${reviewer_slack_id}>) "
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