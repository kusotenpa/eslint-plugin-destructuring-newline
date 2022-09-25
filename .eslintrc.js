module.exports = {
  extends: [
    'plugin:@kusotenpa/base',
    'plugin:@kusotenpa/+ts',
  ],
  plugins: [
    'local-rules',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'destructuring-newline/object-property-newline': 0,
    'local-rules/object-property-newline': 2,
  },
}
