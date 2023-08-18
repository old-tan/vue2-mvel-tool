export function validateRules(data) {
  for (let item of data) {
    // 校验rule中get属性和props3属性是否为空字符串
    if (item.rule && ((item.rule.props1 === 'Base_Info' && item.rule.get === '') || item.rule.props3 === '')) {
      return false;
    }

    // 校验bracket===1且children的length为0
    if (item.bracket === 1 && item.children.length === 0) {
      return false;
    }

    // 递归校验子节点的规则
    if (item.children && item.children.length > 0) {
      if (!validateRules(item.children)) {
        return false;
      }
    }
  }

  return true;
}