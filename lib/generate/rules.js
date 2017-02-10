const createRulesFileContent = rules => {
  const parsedRules = {};
  Object.keys(rules).forEach(r => {
    const thisRule = [`${r} {`];
    Object.keys(rules[r]).forEach(d => {
      thisRule.push(`  ${d}: ${rules[r][d]};`);
    });
    thisRule.push('}');
    parsedRules[r] = thisRule.join('\n');
  });
  return parsedRules;
};

export default createRulesFileContent;
