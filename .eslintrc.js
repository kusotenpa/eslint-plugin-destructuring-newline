const rulesDirPlugin = require('eslint-plugin-rulesdir')

rulesDirPlugin.RULES_DIR = 'lib/rules'

module.exports = {
  extends: [
    'plugin:@kusotenpa/base',
  ],
  plugins: [ 'rulesdir' ],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'rulesdir/object-property-newline': 2,
  },
}
