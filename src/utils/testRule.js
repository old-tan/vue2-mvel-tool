export function generateRuleMap(list) {
  const finalExpression = list.map((item, idx, arr) => {
    let expr = generateRuleExpression(item);
    if (idx !== arr.length - 1) {
      expr += ` ${item.props5}`;
    }
    return expr;
  }).join(' ');

  return finalExpression
}

function generateRuleExpression(item) {
  let ruleExpr = '';

  // 如果存在rule
  if (item.rule) {
    ruleExpr = `${item.rule.props1} ${item.rule.props2} '${item.rule.props3}'`;
    if (item.rule.not) {
      ruleExpr = `not ${ruleExpr}`;
    }
  }

  // 处理children
  if (item.children && item.children.length) {
    const childrenExprs = item.children.map((child, idx) => {
      let expr = generateRuleExpression(child);
      if (child.rule && idx !== item.children.length - 1) {
        expr += ` ${child.rule.props4 || ''}`;
      }
      return expr;
    });
    let childrenStr = childrenExprs.join(` `);
    if (ruleExpr) {
      ruleExpr += ` ${item.rule?.props4 || item.props5} `;
    }
    ruleExpr += childrenStr;
  }

  // 根据bracket的值，决定是否为生成的表达式加括号
  if (item.bracket === 1) {
    ruleExpr = `(${ruleExpr})`;
  }

  return ruleExpr.trim();
}