const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
chai.use(chaiAsPromised);
const urlEncoding = require("../src");
const Luau = require("luau");
const rendering = require("../src");

describe("app.render", function () {
  it("should render text/plain for type text/plain", function (done) {
    var app = new Luau();
    app.use(async (ctx, next) => {
      ctx.response = async () => {
        return {
          type: "text/plain",
          data: new Buffer("Hello")
        };
      };
      
      await next();
    });
    
    app.use(rendering(app));
    app.render("text/plain", async (ctx) => {
      ctx.element = {};
    });
    
    app.use(async (ctx, next) => {
      should.exist(ctx.element);
      done();
    });
    
    app.request("http://example.com").catch(done);
  });
  
  it("should render text/* for type text/plain", function (done) {
    var app = new Luau();
    app.use(async (ctx, next) => {
      ctx.response = async () => {
        return {
          type: "text/plain",
          data: new Buffer("Hello")
        };
      };
      
      await next();
    });
    
    app.use(rendering(app));
    app.render("text/*", async (ctx) => {
      ctx.element = {};
    });
    
    app.use(async (ctx, next) => {
      should.exist(ctx.element);
      done();
    });
    
    app.request("http://example.com").catch(done);
  });
  
  it("should render */* for type text/plain", function (done) {
    var app = new Luau();
    app.use(async (ctx, next) => {
      ctx.response = async () => {
        return {
          type: "text/plain",
          data: new Buffer("Hello")
        };
      };
      
      await next();
    });
    
    app.use(rendering(app));
    app.render("*/*", async (ctx) => {
      ctx.element = {};
    });
    
    app.use(async (ctx, next) => {
      should.exist(ctx.element);
      done();
    });
    
    app.request("http://example.com").catch(done);
  });
  
  it("should not render text/* for type application/json", function (done) {
    var app = new Luau();
    app.use(async (ctx, next) => {
      ctx.response = async () => {
        return {
          type: "application/json",
          data: new Buffer("Hello")
        };
      };
      
      await next();
    });
    
    app.use(rendering(app));
    app.render("text/*", async (ctx) => {
      ctx.element = {};
    });
    
    app.use(async (ctx, next) => {
      should.not.exist(ctx.element);
      done();
    });
    
    app.request("http://example.com").catch(done);
  });
  
  it("should execute rendering middleware composite and then move next", function (done) {
    var app = new Luau();
    app.use(async (ctx, next) => {
      ctx.response = async () => {
        return {
          type: "text/plain",
          data: new Buffer("Hello")
        };
      };
      
      await next();
    });
    
    app.use(rendering(app));
    app.render("*/*", async (ctx, next) => {
      await next();
      var response = await ctx.response;
      ctx.element.type = response.type;
    });
    app.render("text/*", async (ctx) => {
      ctx.element = {};
    });
    
    app.use(async (ctx, next) => {
      ctx.element.type.should.equal("text/plain");
      done();
    });
    
    app.request("http://example.com").catch(done);
  });
});
