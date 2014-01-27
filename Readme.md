# is-schema

Constrain a variable to a schema

```javascript

var isSchema = require('is-schema')
  , val = 'hello world'
  , ret
;

ret = isSchema(val, {
    type: 'string'
  , length: {
      between: [5, 15]
  }
  , match: /^[a-zA-Z ]+$/
});

ret.valid;
// true
ret.value;
// 'hello world'

```

## Installation

    $ npm install is-schema

## Dependencies

  - [is-validation](https://npmjs.org/package/is-validation)
  - [fast-apply](https://npmjs.org/package/fast-apply)
  
## API

is-schema uses [is-validation](https://github.com/JayceTDE/is-validation) to constrain the schema.  All methods
on is-validation's `Chain` are available through the schema.

### isSchema(val, schema)

  - val - The variable to constrain to a schema
  - schema - The schema object describing what `val` should be.  If `schema` is a string, it will be treated as
the schema's `type`

The schema `type` may be one of the following:

  - string
  - number
  - integer
  - float
  - date
  - regExp
  - object

If a schema's property is an object, it will treat it as another schema for `val`'s property:

```javascript

isSchema({ foo: 5 }, {
    type: 'object'
  , foo: { // constrain `val`'s `foo` property to this schema
      type: number
    , greaterThan: 0
  }
}).valid;
// true

```

## Limitations

  - The order in which the variable is validated / manipulated against the schema cannot be defined.
  Using the manipulation methods of `is-validation` may have unexpected results