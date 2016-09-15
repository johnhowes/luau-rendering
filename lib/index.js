/* jshint node: true */
/* jshint esversion: 6 */
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var contentType = require("content-type");

function matchesTypeRange(typeRange, type) {
  if (typeRange === "*/*") return true;
  type = contentType.parse(type).type;
  if (typeRange === type) return true;

  var expected = typeRange.split("/");
  var actual = type.split("/");
  if (expected[1] === "*") return expected[0] === actual[0];

  return false;
}

module.exports = exports = function exports(app) {
  var _this = this;

  app.render = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(typeRange, renderingFn) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              app.render.middleware.push(function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                  var response;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!ctx.element) {
                            _context.next = 4;
                            break;
                          }

                          _context.next = 3;
                          return next();

                        case 3:
                          return _context.abrupt("return", _context.sent);

                        case 4:
                          _context.next = 6;
                          return ctx.response;

                        case 6:
                          response = _context.sent;

                          if (!matchesTypeRange(typeRange, response.type)) {
                            _context.next = 11;
                            break;
                          }

                          _context.next = 10;
                          return renderingFn(ctx, next);

                        case 10:
                          return _context.abrupt("return", _context.sent);

                        case 11:
                          _context.next = 13;
                          return next();

                        case 13:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  app.render.middleware = [];

  return function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
      var renderingComposite;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              renderingComposite = app.compose(app.render.middleware);
              _context3.next = 3;
              return renderingComposite(ctx);

            case 3:
              _context3.next = 5;
              return next();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
};