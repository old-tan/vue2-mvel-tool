export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
export function deepCompare(source, target) {
  if (source.length !== target.length) {
    return false;
  }

  return target.every(bItem => {
    return source.find(aItem => aItem.id === bItem.id);
  });
}
export function deepCompare1(source, target) {
  if (Array.isArray(source) && Array.isArray(target)) {
    if (source.length !== target.length) {
      return false;
    }
    const visited = new Set();

    for (let i = 0; i < source.length; i++) {
      let found = false;

      for (let j = 0; j < target.length; j++) {
        if (visited.has(j)) {
          continue;
        }

        if (deepCompare(source[i], target[j])) {
          visited.add(j);
          found = true;
          break;
        }
      }

      if (!found) {
        return false;
      }
    }
    return true;
  } else if (typeof source === 'object' && typeof target === 'object') {
    const keysA = Object.keys(source);
    const keysB = Object.keys(target);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let key of keysA) {
      if (!target.hasOwnProperty(key)) {
        return false;
      }

      if (!deepCompare(source[key], target[key])) {
        return false;
      }
    }

    return true;
  } else {
    return source === target;
  }
}