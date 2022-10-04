# eslint-plugin-destructuring-newline
Enforce placing destructuring properties on separate lines.

## Installation
```
$ npm install --save-dev eslint eslint-plugin-destructuring-newline
```

## Rules
🔧: Fixable

| Rule                                          | 🔧 |
| --------------------------------------------- | --------- |
| destructuring-newline/object-property-newline | 🔧         |

## Usage
In your `.eslintrc`
```
{
  "plugins": [
    "destructuring-newline"
  ],
  "rules": {
    "object-curly-newline": 2, // recommended
    "destructuring-newline/object-property-newline": 2
  }
}
```

## Rule Details
```js
// bad
const { a, b } = obj

// good
const { a } = obj
const {
    a,
    b,
} = obj
```

## Option
### maxProperties
Limit the number of properties per line.
```js
// "destructuring-newline/object-property-newline": [2, { maxProperties: 3 }]

// bad
const {
  a,
  b,
  c,
  d,
} = obj

// good
const {
  a, b, c,
  d,
} = obj

const { a, b } = obj
```
