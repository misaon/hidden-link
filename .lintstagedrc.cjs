module.exports = {
  '*': 'npm run fmt',
  '*.{js,cjs,ts,vue}': ['npm run lint' /*'npm run test' */],
};
