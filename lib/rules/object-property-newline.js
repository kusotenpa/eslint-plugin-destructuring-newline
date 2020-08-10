'use strict'

module.exports = {
  meta: {
    type: 'layout',
    messages: {
      propertiesOnNewline: 'Destructuring properties must go on a new line.',
    },
    fixable: 'whitespace',
  },
  create: context => {
    const sourceCode = context.getSourceCode()

    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) {
          return
        }

        for (let i = 1; i < node.properties.length; i++) {
          const lastPrev = sourceCode.getLastToken(node.properties[ i - 1 ])
          const firstCurrent = sourceCode.getFirstToken(node.properties[ i ])

          if (lastPrev.loc.end.line === firstCurrent.loc.start.line) {
            context.report({
              node,
              loc: firstCurrent.loc,
              messageId: 'propertiesOnNewline',
              fix(fixer) {
                const comma = sourceCode.getTokenBefore(firstCurrent)
                const afterComma = [ comma.range[ 1 ], firstCurrent.range[ 0 ] ]

                return fixer.replaceTextRange(afterComma, '\n')
              },
            })
          }
        }
      },
    }
  },
}
