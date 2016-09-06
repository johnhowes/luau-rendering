const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
chai.use(chaiAsPromised);
const urlEncoding = require("../src");

describe("url encoded form data", function () {
  it("should encode each name value pair according to the rules of the media type", function (done) {
    var formData = {};
    var entries = new Set();
    entries.add(["name", "George Burns"]);
    entries.add(["gibberish", "!@#$%^&*() ''"]);
    formData.entries = () => entries;
    
    var ctx = {
      request: {
        enctype: "application/x-www-form-urlencoded",
        formData: formData
      }
    };
    
    urlEncoding(ctx, async () => {}).then(() => {
      ctx.request.content.type.should.equal("application/x-www-form-urlencoded");
      ctx.request.content.data.toString().should.equal("name=George+Burns&gibberish=!%40%23%24%25%5E%26*()+%27%27");
      done();
    }).catch(done);
  });
});
