/* jshint node: true */
/* jshint esversion: 6 */
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function urlFormDataEncoding(formData) {
  function urlEncodeNameValuePair(entry) {
    var value = entry.length > 1 ? entry[1] : "";
    return encodeURIComponent(entry[0]) + "=" + encodeURIComponent(value);
  }

  var content = Array.from(formData.entries()).map(urlEncodeNameValuePair).join("&").replace(/%20/g, "+").replace(/'/g, "%27");

  return {
    data: new Buffer(content, "utf8"),
    type: "application/x-www-form-urlencoded"
  };
}

module.exports = exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (ctx.request.formData && ctx.request.enctype === "application/x-www-form-urlencoded") {
              ctx.request.content = urlFormDataEncoding(ctx.request.formData);
            }

            _context.next = 3;
            return next();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function exports(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();