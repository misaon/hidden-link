module.exports = {
  '*': 'npm run fmt:check',
  '*.{js,cjs,ts,vue}': ['npm run lint' /*'npm run test' */],
};
