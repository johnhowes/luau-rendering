/* jshint node: true */
/* jshint esversion: 6 */
"use strict";
const contentType = require("content-type");

function matchesTypeRange(typeRange, type) {
  if (typeRange === "*/*") return true;
  type = contentType.parse(type).type;
  if (typeRange === type) return true;
  
  var expected = typeRange.split("/");
  var actual = type.split("/");
  if (expected[1] === "*") return expected[0] === actual[0];
  
  return false;
}

module.exports = exports = function (app) {
  app.render = async (typeRange, renderingFn) => {
    app.render.middleware.push(async (ctx, next) => {
      var response = await ctx.response;
      
      if (matchesTypeRange(typeRange, response.type)) {
        return await renderingFn(ctx, next);
      }
      
      await next();
    });
  };
  
  app.render.middleware = [];
  
  return async (ctx, next) => {
    var renderingComposite = app.compose(app.render.middleware);
    await renderingComposite(ctx);
    await next();
  };
};
