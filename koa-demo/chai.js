const should = require("chai").should();

const foo = "bar";

describe('String',()=>{
  it('foo should be a string',()=>{
    foo.should.be.a('number')
  })
})