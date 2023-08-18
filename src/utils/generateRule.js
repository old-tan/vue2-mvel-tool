export function generateRuleMap(list) {
  const expressionParts = list.map((item, index, list) => generateRuleExpression(item, index, list));
  const finalExpression = expressionParts.join(' ');
  return finalExpression
}

function generateRuleExpression(item, index, list) {
  let results = [];
  // 如果存在rule
  if (item.rule) {
    // 是否取反
    item.rule.not
      // Base_Info 特殊处理
      ? item.rule.props1 === 'Base_Info'
        // 最后一条规则去掉连接符
        ? index === list.length - 1
          ? results.push(`!(${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}')`)
          : results.push(`!(${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}') ${item.rule.props4}`)
        : index === list.length - 1
          ? results.push(`!(${item.rule.props1} ${item.rule.props2} '${item.rule.props3}')`)
          : results.push(`!(${item.rule.props1} ${item.rule.props2} '${item.rule.props3}') ${item.rule.props4}`)
      : item.rule.props1 === 'Base_Info'
        ? index === list.length - 1
          ? results.push(`${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}'`)
          : results.push(`${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4}`)
        : index === list.length - 1
          ? results.push(`${item.rule.props1} ${item.rule.props2} '${item.rule.props3}'`)
          : results.push(`${item.rule.props1} ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4}`)
  }

  // 递归处理children属性
  if (item.children && item.children.length) {
    results.push(...item.children.map((child, cIndex, arr) => generateRuleExpression(child, cIndex, arr)));
  }

  // 转字符串，并用空格拼接
  let combinedResult = results.join(' ');

  // 根据bracket的值决定是否为生成的表达式加括号，使用props5来连接生成的表达式，最后一个表达式去掉连接符
  if (item.bracket && !(index === (list.length - 1))) {
    combinedResult = `(${combinedResult}) ${item.props5} `;
  } else if (item.bracket && (index === (list.length - 1))) {
    combinedResult = `(${combinedResult})`;
  }

  return combinedResult.trim();
}