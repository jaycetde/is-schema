var is = require('is-validation')
  , fastApply = require('fast-apply')
;

var typeMap = {
    'string': 'toString'
  , 'number': 'toNumber'
  , 'integer': 'toInteger'
  , 'float': 'toFloat'
  , 'date': 'toDate'
  , 'regExp': 'toRegExp'
  , 'object': 'object'
};

module.exports = isSchema;

function isSchema(obj, schema, chain) {
    
    chain = chain || is(obj, schema.name || null);
    
    if (typeof schema === 'string') schema = { type: schema };
    
    // run type conversion first
    if (schema.type) {
        if (!chain[typeMap[schema.type] || schema.type]) throw new Error('unrecognized schema type: ' + schema.type);
        chain[typeMap[schema.type] || schema.type]();
    }
    
    for (var prop in schema) {
        if (prop !== 'type' && schema.hasOwnProperty(prop)) {
            
            
            if (typeof obj[prop] !== 'undefined' && is.literalObject(schema[prop])) {
                isSchema(obj[prop], schema[prop], chain.property(prop));
                continue;
            }
            
            if (chain[prop]) {
                fastApply(chain[prop], chain, is.array(schema[prop]) ? schema[prop] : [ schema[prop] ]);
            }
            
        }
    }
    
    return chain;
    
}