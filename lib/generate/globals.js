const createGlobalsFileContent = globals => {
  const rows = [];
  globals.forEach(g => {
    Object.keys(g).forEach(k => {
      rows.push(`${k}: ${g[k]};`);
    });
  });
  return rows.join('\n');
}

export default createGlobalsFileContent;
