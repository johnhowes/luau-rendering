/* jshint node: true */
/* jshint esversion: 6 */
"use strict";

function urlFormDataEncoding(formdata) {
  function urlEncodeNameValuePair(entry) {
    var value = entry.length > 1 ? entry[1] : "";
    return encodeURIComponent(entry[0]) + "=" + encodeURIComponent(value);
  }
  
  var content = Array.from(formdata.entries).map(urlEncodeNameValuePair)
    .join("&")
    .replace(/%20/g, "+")
    .replace(/'/g, "%27");

  return {
    data: new Buffer(content, "utf8"),
    type: "application/x-www-form-urlencoded"
  };
}

module.exports = exports = async (ctx, next) => {
  if (ctx.request.formData && ctx.request.enctype === "application/x-www-form-urlencoded") {
    ctx.request.content = urlFormDataEncoding(ctx.request.formData);
  }
  
  await next();
};
