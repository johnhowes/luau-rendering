Luau Rendering
================================================

Adds content rendering to a Luau app.

Usage
------------------------------------------------

```js

const app = new Luau();
const rendering = require("luau-rendering");
const httpRequest = require("luau-http-request");

app.use(async (ctx, next) => {
  ctx.createElement = name => document.createElement(name);
  await next();
});

app.use(httpRequest);
app.use(rendering(app));

app.render("*/*", async (ctx, next) => {
  await next();
  
  var response = await ctx.response;
  ctx.element.dataset.contentType = response.type;
});

app.render("text/plain", async (ctx) => {
  var response = await response;
  var element = ctx.element = ctx.createElement("pre");
  element.textContent = response.data.toString();
});

app.use(async (ctx, next) => {
  document.body.appendChild(ctx.element);
  await next();
});

app.request("http://example.com/greeting");
```
