'use strict'

const RuleTester = require('eslint').RuleTester

const rule = require('../../lib/rules/object-property-newline')

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

tester.run('object-property-newline', rule, {
  valid: [
    {
      code: 'var {a,\nb} = obj;',
    },
    {
      code: 'var {a} = obj;',
    },
    {
      code: 'var {\na\n} = obj;',
    },
    {
      code: 'function foo({a,\nb}){};',
    },
  ],
  invalid: [
    {
      code: 'var {a,b} = obj;',
      output: 'var {a,\nb} = obj;',
      errors: [ {
        messageId: 'propertiesOnNewline',
      } ],
    },
    {
      code: 'var {a,b,c} = obj;',
      output: 'var {a,\nb,\nc} = obj;',
      errors: [
        {
          messageId: 'propertiesOnNewline',
        },
        {
          messageId: 'propertiesOnNewline',
        },
      ],
    },
    {
      code: 'var {\na,b} = obj;',
      output: 'var {\na,\nb} = obj;',
      errors: [
        {
          messageId: 'propertiesOnNewline',
        },
      ],
    },
    {
      code: 'function foo({a,b}){};',
      output: 'function foo({a,\nb}){};',
      errors: [
        {
          messageId: 'propertiesOnNewline',
        },
      ],
    },
  ],
})
