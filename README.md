Luau URL Encoding
================================================

Luau middleware component to convert ctx.request.formData to ctx.request.content with a type of 
`application/x-www-form-urlencoded`.

Usage
------------------------------------------------

```js

const app = new Luau();
const urlEncoding = require("luau-url-encoding");

app.use(urlEncoding);

var formData = new FormData();
formData.append("name", "George Burns");
app.request("http://example.com/", {
  enctype: "application/x-www-form-urlencoded",
  formData: formData
}).then(ctx => {
  console.log(ctx.request.content.type === "application/x-www-form-urlencoded");
  console.log(ctx.request.content.data.toString() === "name=George+Burns");
});

```
