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
              name: 'stringSchema'
          }
        ;
        
        ret = isSchema('cat', schema);
        
        ret.valid.should.be.true;
        
    });
    
});