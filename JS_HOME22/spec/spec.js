var app = require('../src/unit.js');

describe("percent of correct answer", function(){
    it("percent()", function(){
        // prepare
        var result;
        // act
        result = app.percent(5, 10);
        // assert
        //toBe  toBeNull    toBeUndefined   .not.toBeUndefined
        expect(result).toEqual(50);
    });
});
