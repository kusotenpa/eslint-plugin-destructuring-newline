# eslint-plugin-destructuring-newline
Enforce placing destructuring properties on separate lines.

## Installation
```
$ npm install --save-dev eslint eslint-plugin-destructuring-newline
```

## Usage
In your `.eslintrc`
```
{
  "plugins": [
    "destructuring-newline"
  ],
  "rules": {
    "destructuring-newline/object-property-newline": 2
  }
}
```

## Rule Details
```js
// bad
const { foo, bar } = obj3

// good
const { foo } = obj1
const {
    foo,
    bar,
} = obj2
```
