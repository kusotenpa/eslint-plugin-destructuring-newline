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
const { foo, bar } = obj

// good
const { foo } = obj
const {
    foo,
    bar,
} = obj
```
