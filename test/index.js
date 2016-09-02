const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
chai.use(chaiAsPromised);
const sut = require("../");

describe("url encoded form data", function () {
  it("should encode each name value pair according to the rules of the media type", function (done) {
    var formData = {};
    formData.entries = new Set();
    formData.entries.add(["name", "George Burns"]);
    formData.entries.add(["gibberish", "!@#$%^&*() ''"]);
    
    var ctx = {
      request: {
        enctype: "application/x-www-form-urlencoded",
        formData: formData
      }
    };
    
    sut(ctx, async () => {}).then(() => {
      ctx.request.content.type.should.equal("application/x-www-form-urlencoded");
      ctx.request.content.data.toString().should.equal("name=George+Burns&gibberish=!%40%23%24%25%5E%26*()+%27%27");
      done();
    }).catch(done);
  });
});
