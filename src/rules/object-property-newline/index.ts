import type { Rule } from 'eslint'
import type {
  AssignmentProperty,
  RestElement,
  ObjectPattern,
} from 'estree'
import 'core-js/features/array/at'

type Options = {
  maxProperties?: number
  maxLength?: number
}
type Property = AssignmentProperty | RestElement
type FixParams = {
  context: Rule.RuleContext
  node: ObjectPattern & Rule.NodeParentExtension
  index: number
  propertiesList: Property[][]
  maxProperties: number
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    messages: {
      maxProperties: 'Destructuring properties must be {{maxProperties}} properties per line.',
    },
    fixable: 'whitespace',
    schema: {
      type: 'array',
      minItems: 0,
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          maxProperties: {
            type: 'integer',
            minimum: 1,
          },
        },
      },
    },
  },
  create: context => {
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) {
          return
        }

        const { maxProperties = 1 } = (context.options[ 0 ] ?? {}) as Options
        const propertiesList = node.properties.reduce<Property[][]>((result, item, i) => {
          const chunkIndex = Math.floor(i / maxProperties)

          result[ chunkIndex ] ||= []
          result[ chunkIndex ]!.push(item)

          return result
        }, [])

        for (const index of propertiesList.keys()) {
          checkMaxProperties({
            context,
            node,
            index,
            propertiesList,
            maxProperties,
          })
        }
      },
    }
  },
}

function checkMaxProperties(params: FixParams) {
  const {
    context,
    node,
    propertiesList,
    index,
    maxProperties,
  } = params

  const properties = propertiesList[ index ]!
  const shouldNextLine = index === 0
    ? false
    : propertiesList[ index - 1 ]?.at(-1)?.loc?.end.line === properties[ 0 ]?.loc?.start.line

  const sourceCode = context.getSourceCode()
  const isSameLine = properties.every(property => {
    return properties[ 0 ]?.loc?.start.line === property.loc?.end.line
  })

  const isValid = !shouldNextLine && isSameLine
  const firstProperty = properties[ 0 ]
  const lastProperty = properties.at(-1)

  if (isValid || !firstProperty?.loc || !lastProperty?.loc) return

  context.report({
    node,
    loc: {
      start: firstProperty.loc.start,
      end: lastProperty.loc.end,
    },
    messageId: 'maxProperties',
    data: {
      maxProperties: maxProperties.toString(),
    },
    fix(fixer) {
      const nextLine = shouldNextLine ? '\n' : ''
      const text = nextLine + properties.map(x => sourceCode.getText(x)).join(',')

      if (!firstProperty.range || !lastProperty.range) return null

      return fixer.replaceTextRange(
        [ firstProperty.range[ 0 ], lastProperty.range[ 1 ] ],
        text,
      )
    },
  })
}

export default rule
