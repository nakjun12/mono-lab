export const isEqual = (value: unknown, other: unknown): boolean => {
  if (value === other) {
    return true;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }
    return true;
  }

  if (
    typeof value === "object" &&
    typeof other === "object" &&
    value !== null &&
    other !== null
  ) {
    const valueObj = value as Record<string, unknown>;
    const otherObj = other as Record<string, unknown>;
    const valueKeys = Object.keys(valueObj);
    const otherKeys = Object.keys(otherObj);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    return valueKeys.every(
      (key) =>
        //객체가 덮어져서 hasOwnProperty를 갖지 못하는 경우를 고려해서 작성
        //Object.hasOwn(otherObj, key)
        Object.prototype.hasOwnProperty.call(otherObj, key) &&
        //재귀적으로 탐색
        isEqual(valueObj[key], otherObj[key])
    );
  }

  return value === other;
};
