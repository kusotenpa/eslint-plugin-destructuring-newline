import { RuleTester } from 'eslint'

import rule from '../index'

const tester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })

tester.run('object-property-newline:default option', rule, {
  valid: [
    { code: 'var {a,\nb} = obj;' },
    { code: 'var {a} = obj;' },
    { code: 'var {\na\n} = obj;' },
    { code: 'function foo({a,\nb}){};' },
  ],
  invalid: [
    {
      code: 'var {a,b} = obj;',
      output: 'var {a,\nb} = obj;',
      errors: [ { messageId: 'maxProperties' } ],
    },
    {
      code: 'var {a,b,c} = obj;',
      output: 'var {a,\nb,\nc} = obj;',
      errors: [
        { messageId: 'maxProperties' },
        { messageId: 'maxProperties' },
      ],
    },
    {
      code: 'var {\na,b} = obj;',
      output: 'var {\na,\nb} = obj;',
      errors: [
        { messageId: 'maxProperties' },
      ],
    },
    {
      code: 'function foo({a,b}){};',
      output: 'function foo({a,\nb}){};',
      errors: [
        { messageId: 'maxProperties' },
      ],
    },
  ],
})

tester.run('object-property-newline:maxProperties', rule, {
  valid: [
    {
      code: 'var {a} = obj;',
      options: [ { maxProperties: 3 } ],
    },
    {
      code: 'var {a,b} = obj;',
      options: [ { maxProperties: 3 } ],
    },
    {
      code: 'var {a,b,c} = obj;',
      options: [ { maxProperties: 3 } ],
    },
    {
      code: 'var {a,b,c,\nd} = obj;',
      options: [ { maxProperties: 3 } ],
    },
  ],
  invalid: [
    {
      code: 'var {a,\nb} = obj;',
      options: [ { maxProperties: 3 } ],
      output: 'var {a,b} = obj;',
      errors: [ { messageId: 'maxProperties' } ],
    },
    {
      code: 'var {a,b,\nc} = obj;',
      options: [ { maxProperties: 3 } ],
      output: 'var {a,b,c} = obj;',
      errors: [ { messageId: 'maxProperties' } ],
    },
    {
      code: 'var {a,\nb,\nc,\nd,\ne,\nf} = obj;',
      options: [ { maxProperties: 3 } ],
      output: 'var {a,b,c,\nd,e,f} = obj;',
      errors: [
        { messageId: 'maxProperties' },
        { messageId: 'maxProperties' },
      ],
    },
  ],
})
