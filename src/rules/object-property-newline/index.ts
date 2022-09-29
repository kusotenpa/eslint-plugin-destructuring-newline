import type { Rule } from 'eslint'
import type { ObjectPattern } from 'estree'

type FixParams = {
  context: Rule.RuleContext
  node: ObjectPattern & Rule.NodeParentExtension
  index: number
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    messages: {
      propertiesOnNewline: 'Destructuring properties must go on a new line.',
    },
    fixable: 'whitespace',
  },
  create: context => {
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) {
          return
        }

        for (let i = 1; i < node.properties.length; i++) {
          fix({
            context,
            node,
            index: i,
          })
        }
      },
    }
  },
}

function fix(params: FixParams) {
  const {
    context,
    node,
    index,
  } = params

  const sourceCode = context.getSourceCode()
  const prev = node.properties[ index - 1 ]
  const current = node.properties[ index ]

  if (!prev || !current) return

  const lastPrev = sourceCode.getLastToken(prev)
  const firstCurrent = sourceCode.getFirstToken(current)

  if (
    !lastPrev
    || !firstCurrent
    || lastPrev.loc.end.line !== firstCurrent.loc.start.line
  ) return

  context.report({
    node,
    loc: firstCurrent.loc,
    messageId: 'propertiesOnNewline',
    fix(fixer) {
      const comma = sourceCode.getTokenBefore(firstCurrent)

      if (!comma) return null

      return fixer.replaceTextRange(
        [ comma.range[ 1 ], firstCurrent.range[ 0 ] ],
        '\n',
      )
    },
  })
}

export default rule
