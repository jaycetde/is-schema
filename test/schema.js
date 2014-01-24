var isSchema = require('..')
  , should = require('should')
;

describe('isSchema', function () {
    
    it('should validate a simple schema', function () {
        
        var ret
          , schema = {
            type: 'string',
            length: {
                between: [5, 15]
            },
            match: /^[a-z ]+$/i
        };
        
        ret = isSchema('hello world', schema);
        
        ret.valid.should.be.true;
        ret.value.should.equal('hello world');
        
        ret = isSchema('cat', schema);
        
        ret.valid.should.be.false;
        
    });
    
    it('should convert variable types', function () {
        
        var ret
          , schema = {
              type: 'number'
          }
        ;
        
        ret = isSchema('55', schema);
        
        ret.valid.should.be.true;
        ret.value.should.equal(55);
        
        ret = isSchema('cat', schema);
        
        ret.valid.should.be.false;
        
    });
    
    it('should use a string schema as the `type`', function () {
        
        var ret
          , schema = 'number'
        ;
        
        ret = isSchema('55', schema);
        
        ret.valid.should.be.true;
        ret.value.should.equal(55);
        
        ret = isSchema('cat', schema);
        
        ret.valid.should.be.false;
        
    });
    
    it('should not error on schema properties not in `is`', function () {
        
        var ret
          , schema = {
              type: 'string',
              nonsenseProperty: 'foobar'
          }
        ;
        
        ret = isSchema('cat', schema);
        
        ret.valid.should.be.true;
        
    });
    
    it('should use the property `name` as the variable name in the chain', function () {
        
        var ret
          , schema = {
              type: 'number',
              name: 'Your age',
              between: [18, 110]
          }
        ;
        
        ret = isSchema(12, schema);
        
        ret.valid.should.be.false;
        ret.errorMessage.should.equal('Your age must be between 18 and 110');
        
    });
    
});