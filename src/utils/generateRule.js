export function generateRuleMap(list) {
  const expressionParts = list.map((item, index) => generateRuleExpression(item, index));
  // console.log(expressionParts)
  // const finalExpression = expressionParts.join(' ');
  // return finalExpression
  return expressionParts
}

function generateRuleExpression(item, index) {
  let results = [];

  // 如果存在rule
  if (item.rule) {
    item.rule.not
      ? item.rule.props1 === 'Base_Info'
        ? results.push(`!(${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4})`)
        : results.push(`!(${item.rule.props1} ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4})`)
      : item.rule.props1 === 'Base_Info'
        ? results.push(`${item.rule.props1}.get('${item.rule.get}') ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4}`)
        : results.push(`${item.rule.props1} ${item.rule.props2} '${item.rule.props3}' ${item.rule.props4}`)
  }

  // 递归处理children属性
  if (item.children && item.children.length) {
    results.push(...item.children.map((child, cIndex) => generateRuleExpression(child)));
  }

  // 使用props5来连接生成的表达式
  // let combinedResult = results.join(` ${item.props5} `);
  let combinedResult = results.join(' ');

  // 根据bracket的值决定是否为生成的表达式加括号
  if (item.bracket === 1) {
    combinedResult = `(${combinedResult}) ${item.props5} `;
  }

  return combinedResult.trim();
}