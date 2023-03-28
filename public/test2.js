!(function () {
  var t = {
      9662: function (t, e, n) {
        var r = n(614),
          o = n(6330),
          i = TypeError;
        t.exports = function (t) {
          if (r(t)) return t;
          throw i(o(t) + " is not a function");
        };
      },
      9670: function (t, e, n) {
        var r = n(111),
          o = String,
          i = TypeError;
        t.exports = function (t) {
          if (r(t)) return t;
          throw i(o(t) + " is not an object");
        };
      },
      8533: function (t, e, n) {
        "use strict";
        var r = n(2092).forEach,
          o = n(9341)("forEach");
        t.exports = o
          ? [].forEach
          : function (t) {
              return r(this, t, arguments.length > 1 ? arguments[1] : void 0);
            };
      },
      1318: function (t, e, n) {
        var r = n(5656),
          o = n(1400),
          i = n(6244),
          a = function (t) {
            return function (e, n, a) {
              var u,
                c = r(e),
                s = i(c),
                f = o(a, s);
              if (t && n != n) {
                for (; s > f; ) if ((u = c[f++]) != u) return !0;
              } else
                for (; s > f; f++)
                  if ((t || f in c) && c[f] === n) return t || f || 0;
              return !t && -1;
            };
          };
        t.exports = { includes: a(!0), indexOf: a(!1) };
      },
      2092: function (t, e, n) {
        var r = n(9974),
          o = n(1702),
          i = n(8361),
          a = n(7908),
          u = n(6244),
          c = n(5417),
          s = o([].push),
          f = function (t) {
            var e = 1 == t,
              n = 2 == t,
              o = 3 == t,
              f = 4 == t,
              l = 6 == t,
              p = 7 == t,
              d = 5 == t || l;
            return function (v, y, g, m) {
              for (
                var x,
                  h,
                  w = a(v),
                  b = i(w),
                  S = r(y, g),
                  O = u(b),
                  j = 0,
                  L = m || c,
                  I = e ? L(v, O) : n || p ? L(v, 0) : void 0;
                O > j;
                j++
              )
                if ((d || j in b) && ((h = S((x = b[j]), j, w)), t))
                  if (e) I[j] = h;
                  else if (h)
                    switch (t) {
                      case 3:
                        return !0;
                      case 5:
                        return x;
                      case 6:
                        return j;
                      case 2:
                        s(I, x);
                    }
                  else
                    switch (t) {
                      case 4:
                        return !1;
                      case 7:
                        s(I, x);
                    }
              return l ? -1 : o || f ? f : I;
            };
          };
        t.exports = {
          forEach: f(0),
          map: f(1),
          filter: f(2),
          some: f(3),
          every: f(4),
          find: f(5),
          findIndex: f(6),
          filterReject: f(7),
        };
      },
      9341: function (t, e, n) {
        "use strict";
        var r = n(7293);
        t.exports = function (t, e) {
          var n = [][t];
          return (
            !!n &&
            r(function () {
              n.call(
                null,
                e ||
                  function () {
                    return 1;
                  },
                1
              );
            })
          );
        };
      },
      3671: function (t, e, n) {
        var r = n(9662),
          o = n(7908),
          i = n(8361),
          a = n(6244),
          u = TypeError,
          c = function (t) {
            return function (e, n, c, s) {
              r(n);
              var f = o(e),
                l = i(f),
                p = a(f),
                d = t ? p - 1 : 0,
                v = t ? -1 : 1;
              if (c < 2)
                for (;;) {
                  if (d in l) {
                    (s = l[d]), (d += v);
                    break;
                  }
                  if (((d += v), t ? d < 0 : p <= d))
                    throw u("Reduce of empty array with no initial value");
                }
              for (; t ? d >= 0 : p > d; d += v)
                d in l && (s = n(s, l[d], d, f));
              return s;
            };
          };
        t.exports = { left: c(!1), right: c(!0) };
      },
      7475: function (t, e, n) {
        var r = n(3157),
          o = n(4411),
          i = n(111),
          a = n(5112)("species"),
          u = Array;
        t.exports = function (t) {
          var e;
          return (
            r(t) &&
              ((e = t.constructor),
              ((o(e) && (e === u || r(e.prototype))) ||
                (i(e) && null === (e = e[a]))) &&
                (e = void 0)),
            void 0 === e ? u : e
          );
        };
      },
      5417: function (t, e, n) {
        var r = n(7475);
        t.exports = function (t, e) {
          return new (r(t))(0 === e ? 0 : e);
        };
      },
      4326: function (t, e, n) {
        var r = n(84),
          o = r({}.toString),
          i = r("".slice);
        t.exports = function (t) {
          return i(o(t), 8, -1);
        };
      },
      648: function (t, e, n) {
        var r = n(1694),
          o = n(614),
          i = n(4326),
          a = n(5112)("toStringTag"),
          u = Object,
          c =
            "Arguments" ==
            i(
              (function () {
                return arguments;
              })()
            );
        t.exports = r
          ? i
          : function (t) {
              var e, n, r;
              return void 0 === t
                ? "Undefined"
                : null === t
                ? "Null"
                : "string" ==
                  typeof (n = (function (t, e) {
                    try {
                      return t[e];
                    } catch (t) {}
                  })((e = u(t)), a))
                ? n
                : c
                ? i(e)
                : "Object" == (r = i(e)) && o(e.callee)
                ? "Arguments"
                : r;
            };
      },
      9920: function (t, e, n) {
        var r = n(2597),
          o = n(3887),
          i = n(1236),
          a = n(3070);
        t.exports = function (t, e, n) {
          for (var u = o(e), c = a.f, s = i.f, f = 0; f < u.length; f++) {
            var l = u[f];
            r(t, l) || (n && r(n, l)) || c(t, l, s(e, l));
          }
        };
      },
      8880: function (t, e, n) {
        var r = n(9781),
          o = n(3070),
          i = n(9114);
        t.exports = r
          ? function (t, e, n) {
              return o.f(t, e, i(1, n));
            }
          : function (t, e, n) {
              return (t[e] = n), t;
            };
      },
      9114: function (t) {
        t.exports = function (t, e) {
          return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e,
          };
        };
      },
      8052: function (t, e, n) {
        var r = n(614),
          o = n(3070),
          i = n(6339),
          a = n(3072);
        t.exports = function (t, e, n, u) {
          u || (u = {});
          var c = u.enumerable,
            s = void 0 !== u.name ? u.name : e;
          if ((r(n) && i(n, s, u), u.global)) c ? (t[e] = n) : a(e, n);
          else {
            try {
              u.unsafe ? t[e] && (c = !0) : delete t[e];
            } catch (t) {}
            c
              ? (t[e] = n)
              : o.f(t, e, {
                  value: n,
                  enumerable: !1,
                  configurable: !u.nonConfigurable,
                  writable: !u.nonWritable,
                });
          }
          return t;
        };
      },
      3072: function (t, e, n) {
        var r = n(7854),
          o = Object.defineProperty;
        t.exports = function (t, e) {
          try {
            o(r, t, { value: e, configurable: !0, writable: !0 });
          } catch (n) {
            r[t] = e;
          }
          return e;
        };
      },
      9781: function (t, e, n) {
        var r = n(7293);
        t.exports = !r(function () {
          return (
            7 !=
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1]
          );
        });
      },
      4154: function (t) {
        var e = "object" == typeof document && document.all,
          n = void 0 === e && void 0 !== e;
        t.exports = { all: e, IS_HTMLDDA: n };
      },
      317: function (t, e, n) {
        var r = n(7854),
          o = n(111),
          i = r.document,
          a = o(i) && o(i.createElement);
        t.exports = function (t) {
          return a ? i.createElement(t) : {};
        };
      },
      8324: function (t) {
        t.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };
      },
      8509: function (t, e, n) {
        var r = n(317)("span").classList,
          o = r && r.constructor && r.constructor.prototype;
        t.exports = o === Object.prototype ? void 0 : o;
      },
      5268: function (t, e, n) {
        var r = n(4326),
          o = n(7854);
        t.exports = "process" == r(o.process);
      },
      8113: function (t, e, n) {
        var r = n(5005);
        t.exports = r("navigator", "userAgent") || "";
      },
      7392: function (t, e, n) {
        var r,
          o,
          i = n(7854),
          a = n(8113),
          u = i.process,
          c = i.Deno,
          s = (u && u.versions) || (c && c.version),
          f = s && s.v8;
        f && (o = (r = f.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])),
          !o &&
            a &&
            (!(r = a.match(/Edge\/(\d+)/)) || r[1] >= 74) &&
            (r = a.match(/Chrome\/(\d+)/)) &&
            (o = +r[1]),
          (t.exports = o);
      },
      748: function (t) {
        t.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      2109: function (t, e, n) {
        var r = n(7854),
          o = n(1236).f,
          i = n(8880),
          a = n(8052),
          u = n(3072),
          c = n(9920),
          s = n(4705);
        t.exports = function (t, e) {
          var n,
            f,
            l,
            p,
            d,
            v = t.target,
            y = t.global,
            g = t.stat;
          if ((n = y ? r : g ? r[v] || u(v, {}) : (r[v] || {}).prototype))
            for (f in e) {
              if (
                ((p = e[f]),
                (l = t.dontCallGetSet ? (d = o(n, f)) && d.value : n[f]),
                !s(y ? f : v + (g ? "." : "#") + f, t.forced) && void 0 !== l)
              ) {
                if (typeof p == typeof l) continue;
                c(p, l);
              }
              (t.sham || (l && l.sham)) && i(p, "sham", !0), a(n, f, p, t);
            }
        };
      },
      7293: function (t) {
        t.exports = function (t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      },
      9974: function (t, e, n) {
        var r = n(1702),
          o = n(9662),
          i = n(4374),
          a = r(r.bind);
        t.exports = function (t, e) {
          return (
            o(t),
            void 0 === e
              ? t
              : i
              ? a(t, e)
              : function () {
                  return t.apply(e, arguments);
                }
          );
        };
      },
      4374: function (t, e, n) {
        var r = n(7293);
        t.exports = !r(function () {
          var t = function () {}.bind();
          return "function" != typeof t || t.hasOwnProperty("prototype");
        });
      },
      6916: function (t, e, n) {
        var r = n(4374),
          o = Function.prototype.call;
        t.exports = r
          ? o.bind(o)
          : function () {
              return o.apply(o, arguments);
            };
      },
      6530: function (t, e, n) {
        var r = n(9781),
          o = n(2597),
          i = Function.prototype,
          a = r && Object.getOwnPropertyDescriptor,
          u = o(i, "name"),
          c = u && "something" === function () {}.name,
          s = u && (!r || (r && a(i, "name").configurable));
        t.exports = { EXISTS: u, PROPER: c, CONFIGURABLE: s };
      },
      84: function (t, e, n) {
        var r = n(4374),
          o = Function.prototype,
          i = o.call,
          a = r && o.bind.bind(i, i);
        t.exports = function (t) {
          return r
            ? a(t)
            : function () {
                return i.apply(t, arguments);
              };
        };
      },
      1702: function (t, e, n) {
        var r = n(4326),
          o = n(84);
        t.exports = function (t) {
          if ("Function" === r(t)) return o(t);
        };
      },
      5005: function (t, e, n) {
        var r = n(7854),
          o = n(614),
          i = function (t) {
            return o(t) ? t : void 0;
          };
        t.exports = function (t, e) {
          return arguments.length < 2 ? i(r[t]) : r[t] && r[t][e];
        };
      },
      8173: function (t, e, n) {
        var r = n(9662),
          o = n(8554);
        t.exports = function (t, e) {
          var n = t[e];
          return o(n) ? void 0 : r(n);
        };
      },
      7854: function (t, e, n) {
        var r = function (t) {
          return t && t.Math == Math && t;
        };
        t.exports =
          r("object" == typeof globalThis && globalThis) ||
          r("object" == typeof window && window) ||
          r("object" == typeof self && self) ||
          r("object" == typeof n.g && n.g) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      2597: function (t, e, n) {
        var r = n(1702),
          o = n(7908),
          i = r({}.hasOwnProperty);
        t.exports =
          Object.hasOwn ||
          function (t, e) {
            return i(o(t), e);
          };
      },
      3501: function (t) {
        t.exports = {};
      },
      490: function (t, e, n) {
        var r = n(5005);
        t.exports = r("document", "documentElement");
      },
      4664: function (t, e, n) {
        var r = n(9781),
          o = n(7293),
          i = n(317);
        t.exports =
          !r &&
          !o(function () {
            return (
              7 !=
              Object.defineProperty(i("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      8361: function (t, e, n) {
        var r = n(1702),
          o = n(7293),
          i = n(4326),
          a = Object,
          u = r("".split);
        t.exports = o(function () {
          return !a("z").propertyIsEnumerable(0);
        })
          ? function (t) {
              return "String" == i(t) ? u(t, "") : a(t);
            }
          : a;
      },
      2788: function (t, e, n) {
        var r = n(1702),
          o = n(614),
          i = n(5465),
          a = r(Function.toString);
        o(i.inspectSource) ||
          (i.inspectSource = function (t) {
            return a(t);
          }),
          (t.exports = i.inspectSource);
      },
      9909: function (t, e, n) {
        var r,
          o,
          i,
          a = n(4811),
          u = n(7854),
          c = n(111),
          s = n(8880),
          f = n(2597),
          l = n(5465),
          p = n(6200),
          d = n(3501),
          v = "Object already initialized",
          y = u.TypeError,
          g = u.WeakMap;
        if (a || l.state) {
          var m = l.state || (l.state = new g());
          (m.get = m.get),
            (m.has = m.has),
            (m.set = m.set),
            (r = function (t, e) {
              if (m.has(t)) throw y(v);
              return (e.facade = t), m.set(t, e), e;
            }),
            (o = function (t) {
              return m.get(t) || {};
            }),
            (i = function (t) {
              return m.has(t);
            });
        } else {
          var x = p("state");
          (d[x] = !0),
            (r = function (t, e) {
              if (f(t, x)) throw y(v);
              return (e.facade = t), s(t, x, e), e;
            }),
            (o = function (t) {
              return f(t, x) ? t[x] : {};
            }),
            (i = function (t) {
              return f(t, x);
            });
        }
        t.exports = {
          set: r,
          get: o,
          has: i,
          enforce: function (t) {
            return i(t) ? o(t) : r(t, {});
          },
          getterFor: function (t) {
            return function (e) {
              var n;
              if (!c(e) || (n = o(e)).type !== t)
                throw y("Incompatible receiver, " + t + " required");
              return n;
            };
          },
        };
      },
      3157: function (t, e, n) {
        var r = n(4326);
        t.exports =
          Array.isArray ||
          function (t) {
            return "Array" == r(t);
          };
      },
      614: function (t, e, n) {
        var r = n(4154),
          o = r.all;
        t.exports = r.IS_HTMLDDA
          ? function (t) {
              return "function" == typeof t || t === o;
            }
          : function (t) {
              return "function" == typeof t;
            };
      },
      4411: function (t, e, n) {
        var r = n(1702),
          o = n(7293),
          i = n(614),
          a = n(648),
          u = n(5005),
          c = n(2788),
          s = function () {},
          f = [],
          l = u("Reflect", "construct"),
          p = /^\s*(?:class|function)\b/,
          d = r(p.exec),
          v = !p.exec(s),
          y = function (t) {
            if (!i(t)) return !1;
            try {
              return l(s, f, t), !0;
            } catch (t) {
              return !1;
            }
          },
          g = function (t) {
            if (!i(t)) return !1;
            switch (a(t)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            try {
              return v || !!d(p, c(t));
            } catch (t) {
              return !0;
            }
          };
        (g.sham = !0),
          (t.exports =
            !l ||
            o(function () {
              var t;
              return (
                y(y.call) ||
                !y(Object) ||
                !y(function () {
                  t = !0;
                }) ||
                t
              );
            })
              ? g
              : y);
      },
      4705: function (t, e, n) {
        var r = n(7293),
          o = n(614),
          i = /#|\.prototype\./,
          a = function (t, e) {
            var n = c[u(t)];
            return n == f || (n != s && (o(e) ? r(e) : !!e));
          },
          u = (a.normalize = function (t) {
            return String(t).replace(i, ".").toLowerCase();
          }),
          c = (a.data = {}),
          s = (a.NATIVE = "N"),
          f = (a.POLYFILL = "P");
        t.exports = a;
      },
      8554: function (t) {
        t.exports = function (t) {
          return null == t;
        };
      },
      111: function (t, e, n) {
        var r = n(614),
          o = n(4154),
          i = o.all;
        t.exports = o.IS_HTMLDDA
          ? function (t) {
              return "object" == typeof t ? null !== t : r(t) || t === i;
            }
          : function (t) {
              return "object" == typeof t ? null !== t : r(t);
            };
      },
      1913: function (t) {
        t.exports = !1;
      },
      2190: function (t, e, n) {
        var r = n(5005),
          o = n(614),
          i = n(7976),
          a = n(3307),
          u = Object;
        t.exports = a
          ? function (t) {
              return "symbol" == typeof t;
            }
          : function (t) {
              var e = r("Symbol");
              return o(e) && i(e.prototype, u(t));
            };
      },
      6244: function (t, e, n) {
        var r = n(7466);
        t.exports = function (t) {
          return r(t.length);
        };
      },
      6339: function (t, e, n) {
        var r = n(7293),
          o = n(614),
          i = n(2597),
          a = n(9781),
          u = n(6530).CONFIGURABLE,
          c = n(2788),
          s = n(9909),
          f = s.enforce,
          l = s.get,
          p = Object.defineProperty,
          d =
            a &&
            !r(function () {
              return 8 !== p(function () {}, "length", { value: 8 }).length;
            }),
          v = String(String).split("String"),
          y = (t.exports = function (t, e, n) {
            "Symbol(" === String(e).slice(0, 7) &&
              (e = "[" + String(e).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
              n && n.getter && (e = "get " + e),
              n && n.setter && (e = "set " + e),
              (!i(t, "name") || (u && t.name !== e)) &&
                (a
                  ? p(t, "name", { value: e, configurable: !0 })
                  : (t.name = e)),
              d &&
                n &&
                i(n, "arity") &&
                t.length !== n.arity &&
                p(t, "length", { value: n.arity });
            try {
              n && i(n, "constructor") && n.constructor
                ? a && p(t, "prototype", { writable: !1 })
                : t.prototype && (t.prototype = void 0);
            } catch (t) {}
            var r = f(t);
            return (
              i(r, "source") ||
                (r.source = v.join("string" == typeof e ? e : "")),
              t
            );
          });
        Function.prototype.toString = y(function () {
          return (o(this) && l(this).source) || c(this);
        }, "toString");
      },
      4758: function (t) {
        var e = Math.ceil,
          n = Math.floor;
        t.exports =
          Math.trunc ||
          function (t) {
            var r = +t;
            return (r > 0 ? n : e)(r);
          };
      },
      30: function (t, e, n) {
        var r,
          o = n(9670),
          i = n(6048),
          a = n(748),
          u = n(3501),
          c = n(490),
          s = n(317),
          f = n(6200),
          l = "prototype",
          p = "script",
          d = f("IE_PROTO"),
          v = function () {},
          y = function (t) {
            return "<" + p + ">" + t + "</" + p + ">";
          },
          g = function (t) {
            t.write(y("")), t.close();
            var e = t.parentWindow.Object;
            return (t = null), e;
          },
          m = function () {
            try {
              r = new ActiveXObject("htmlfile");
            } catch (t) {}
            var t, e, n;
            m =
              "undefined" != typeof document
                ? document.domain && r
                  ? g(r)
                  : ((e = s("iframe")),
                    (n = "java" + p + ":"),
                    (e.style.display = "none"),
                    c.appendChild(e),
                    (e.src = String(n)),
                    (t = e.contentWindow.document).open(),
                    t.write(y("document.F=Object")),
                    t.close(),
                    t.F)
                : g(r);
            for (var o = a.length; o--; ) delete m[l][a[o]];
            return m();
          };
        (u[d] = !0),
          (t.exports =
            Object.create ||
            function (t, e) {
              var n;
              return (
                null !== t
                  ? ((v[l] = o(t)), (n = new v()), (v[l] = null), (n[d] = t))
                  : (n = m()),
                void 0 === e ? n : i.f(n, e)
              );
            });
      },
      6048: function (t, e, n) {
        var r = n(9781),
          o = n(3353),
          i = n(3070),
          a = n(9670),
          u = n(5656),
          c = n(1956);
        e.f =
          r && !o
            ? Object.defineProperties
            : function (t, e) {
                a(t);
                for (var n, r = u(e), o = c(e), s = o.length, f = 0; s > f; )
                  i.f(t, (n = o[f++]), r[n]);
                return t;
              };
      },
      3070: function (t, e, n) {
        var r = n(9781),
          o = n(4664),
          i = n(3353),
          a = n(9670),
          u = n(4948),
          c = TypeError,
          s = Object.defineProperty,
          f = Object.getOwnPropertyDescriptor,
          l = "enumerable",
          p = "configurable",
          d = "writable";
        e.f = r
          ? i
            ? function (t, e, n) {
                if (
                  (a(t),
                  (e = u(e)),
                  a(n),
                  "function" == typeof t &&
                    "prototype" === e &&
                    "value" in n &&
                    d in n &&
                    !n[d])
                ) {
                  var r = f(t, e);
                  r &&
                    r[d] &&
                    ((t[e] = n.value),
                    (n = {
                      configurable: p in n ? n[p] : r[p],
                      enumerable: l in n ? n[l] : r[l],
                      writable: !1,
                    }));
                }
                return s(t, e, n);
              }
            : s
          : function (t, e, n) {
              if ((a(t), (e = u(e)), a(n), o))
                try {
                  return s(t, e, n);
                } catch (t) {}
              if ("get" in n || "set" in n) throw c("Accessors not supported");
              return "value" in n && (t[e] = n.value), t;
            };
      },
      1236: function (t, e, n) {
        var r = n(9781),
          o = n(6916),
          i = n(5296),
          a = n(9114),
          u = n(5656),
          c = n(4948),
          s = n(2597),
          f = n(4664),
          l = Object.getOwnPropertyDescriptor;
        e.f = r
          ? l
          : function (t, e) {
              if (((t = u(t)), (e = c(e)), f))
                try {
                  return l(t, e);
                } catch (t) {}
              if (s(t, e)) return a(!o(i.f, t, e), t[e]);
            };
      },
      8006: function (t, e, n) {
        var r = n(6324),
          o = n(748).concat("length", "prototype");
        e.f =
          Object.getOwnPropertyNames ||
          function (t) {
            return r(t, o);
          };
      },
      5181: function (t, e) {
        e.f = Object.getOwnPropertySymbols;
      },
      7976: function (t, e, n) {
        var r = n(1702);
        t.exports = r({}.isPrototypeOf);
      },
      6324: function (t, e, n) {
        var r = n(1702),
          o = n(2597),
          i = n(5656),
          a = n(1318).indexOf,
          u = n(3501),
          c = r([].push);
        t.exports = function (t, e) {
          var n,
            r = i(t),
            s = 0,
            f = [];
          for (n in r) !o(u, n) && o(r, n) && c(f, n);
          for (; e.length > s; ) o(r, (n = e[s++])) && (~a(f, n) || c(f, n));
          return f;
        };
      },
      1956: function (t, e, n) {
        var r = n(6324),
          o = n(748);
        t.exports =
          Object.keys ||
          function (t) {
            return r(t, o);
          };
      },
      5296: function (t, e) {
        "use strict";
        var n = {}.propertyIsEnumerable,
          r = Object.getOwnPropertyDescriptor,
          o = r && !n.call({ 1: 2 }, 1);
        e.f = o
          ? function (t) {
              var e = r(this, t);
              return !!e && e.enumerable;
            }
          : n;
      },
      2140: function (t, e, n) {
        var r = n(6916),
          o = n(614),
          i = n(111),
          a = TypeError;
        t.exports = function (t, e) {
          var n, u;
          if ("string" === e && o((n = t.toString)) && !i((u = r(n, t))))
            return u;
          if (o((n = t.valueOf)) && !i((u = r(n, t)))) return u;
          if ("string" !== e && o((n = t.toString)) && !i((u = r(n, t))))
            return u;
          throw a("Can't convert object to primitive value");
        };
      },
      3887: function (t, e, n) {
        var r = n(5005),
          o = n(1702),
          i = n(8006),
          a = n(5181),
          u = n(9670),
          c = o([].concat);
        t.exports =
          r("Reflect", "ownKeys") ||
          function (t) {
            var e = i.f(u(t)),
              n = a.f;
            return n ? c(e, n(t)) : e;
          };
      },
      2261: function (t, e, n) {
        "use strict";
        var r,
          o,
          i = n(6916),
          a = n(1702),
          u = n(1340),
          c = n(7066),
          s = n(2999),
          f = n(2309),
          l = n(30),
          p = n(9909).get,
          d = n(9441),
          v = n(7168),
          y = f("native-string-replace", String.prototype.replace),
          g = RegExp.prototype.exec,
          m = g,
          x = a("".charAt),
          h = a("".indexOf),
          w = a("".replace),
          b = a("".slice),
          S =
            ((o = /b*/g),
            i(g, (r = /a/), "a"),
            i(g, o, "a"),
            0 !== r.lastIndex || 0 !== o.lastIndex),
          O = s.BROKEN_CARET,
          j = void 0 !== /()??/.exec("")[1];
        (S || j || O || d || v) &&
          (m = function (t) {
            var e,
              n,
              r,
              o,
              a,
              s,
              f,
              d = this,
              v = p(d),
              L = u(t),
              I = v.raw;
            if (I)
              return (
                (I.lastIndex = d.lastIndex),
                (e = i(m, I, L)),
                (d.lastIndex = I.lastIndex),
                e
              );
            var E = v.groups,
              T = O && d.sticky,
              P = i(c, d),
              k = d.source,
              M = 0,
              R = L;
            if (
              (T &&
                ((P = w(P, "y", "")),
                -1 === h(P, "g") && (P += "g"),
                (R = b(L, d.lastIndex)),
                d.lastIndex > 0 &&
                  (!d.multiline ||
                    (d.multiline && "\n" !== x(L, d.lastIndex - 1))) &&
                  ((k = "(?: " + k + ")"), (R = " " + R), M++),
                (n = new RegExp("^(?:" + k + ")", P))),
              j && (n = new RegExp("^" + k + "$(?!\\s)", P)),
              S && (r = d.lastIndex),
              (o = i(g, T ? n : d, R)),
              T
                ? o
                  ? ((o.input = b(o.input, M)),
                    (o[0] = b(o[0], M)),
                    (o.index = d.lastIndex),
                    (d.lastIndex += o[0].length))
                  : (d.lastIndex = 0)
                : S &&
                  o &&
                  (d.lastIndex = d.global ? o.index + o[0].length : r),
              j &&
                o &&
                o.length > 1 &&
                i(y, o[0], n, function () {
                  for (a = 1; a < arguments.length - 2; a++)
                    void 0 === arguments[a] && (o[a] = void 0);
                }),
              o && E)
            )
              for (o.groups = s = l(null), a = 0; a < E.length; a++)
                s[(f = E[a])[0]] = o[f[1]];
            return o;
          }),
          (t.exports = m);
      },
      7066: function (t, e, n) {
        "use strict";
        var r = n(9670);
        t.exports = function () {
          var t = r(this),
            e = "";
          return (
            t.hasIndices && (e += "d"),
            t.global && (e += "g"),
            t.ignoreCase && (e += "i"),
            t.multiline && (e += "m"),
            t.dotAll && (e += "s"),
            t.unicode && (e += "u"),
            t.unicodeSets && (e += "v"),
            t.sticky && (e += "y"),
            e
          );
        };
      },
      2999: function (t, e, n) {
        var r = n(7293),
          o = n(7854).RegExp,
          i = r(function () {
            var t = o("a", "y");
            return (t.lastIndex = 2), null != t.exec("abcd");
          }),
          a =
            i ||
            r(function () {
              return !o("a", "y").sticky;
            }),
          u =
            i ||
            r(function () {
              var t = o("^r", "gy");
              return (t.lastIndex = 2), null != t.exec("str");
            });
        t.exports = { BROKEN_CARET: u, MISSED_STICKY: a, UNSUPPORTED_Y: i };
      },
      9441: function (t, e, n) {
        var r = n(7293),
          o = n(7854).RegExp;
        t.exports = r(function () {
          var t = o(".", "s");
          return !(t.dotAll && t.exec("\n") && "s" === t.flags);
        });
      },
      7168: function (t, e, n) {
        var r = n(7293),
          o = n(7854).RegExp;
        t.exports = r(function () {
          var t = o("(?<a>b)", "g");
          return (
            "b" !== t.exec("b").groups.a || "bc" !== "b".replace(t, "$<a>c")
          );
        });
      },
      4488: function (t, e, n) {
        var r = n(8554),
          o = TypeError;
        t.exports = function (t) {
          if (r(t)) throw o("Can't call method on " + t);
          return t;
        };
      },
      6200: function (t, e, n) {
        var r = n(2309),
          o = n(9711),
          i = r("keys");
        t.exports = function (t) {
          return i[t] || (i[t] = o(t));
        };
      },
      5465: function (t, e, n) {
        var r = n(7854),
          o = n(3072),
          i = "__core-js_shared__",
          a = r[i] || o(i, {});
        t.exports = a;
      },
      2309: function (t, e, n) {
        var r = n(1913),
          o = n(5465);
        (t.exports = function (t, e) {
          return o[t] || (o[t] = void 0 !== e ? e : {});
        })("versions", []).push({
          version: "3.25.5",
          mode: r ? "pure" : "global",
          copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      6293: function (t, e, n) {
        var r = n(7392),
          o = n(7293);
        t.exports =
          !!Object.getOwnPropertySymbols &&
          !o(function () {
            var t = Symbol();
            return (
              !String(t) ||
              !(Object(t) instanceof Symbol) ||
              (!Symbol.sham && r && r < 41)
            );
          });
      },
      1400: function (t, e, n) {
        var r = n(9303),
          o = Math.max,
          i = Math.min;
        t.exports = function (t, e) {
          var n = r(t);
          return n < 0 ? o(n + e, 0) : i(n, e);
        };
      },
      5656: function (t, e, n) {
        var r = n(8361),
          o = n(4488);
        t.exports = function (t) {
          return r(o(t));
        };
      },
      9303: function (t, e, n) {
        var r = n(4758);
        t.exports = function (t) {
          var e = +t;
          return e != e || 0 === e ? 0 : r(e);
        };
      },
      7466: function (t, e, n) {
        var r = n(9303),
          o = Math.min;
        t.exports = function (t) {
          return t > 0 ? o(r(t), 9007199254740991) : 0;
        };
      },
      7908: function (t, e, n) {
        var r = n(4488),
          o = Object;
        t.exports = function (t) {
          return o(r(t));
        };
      },
      7593: function (t, e, n) {
        var r = n(6916),
          o = n(111),
          i = n(2190),
          a = n(8173),
          u = n(2140),
          c = n(5112),
          s = TypeError,
          f = c("toPrimitive");
        t.exports = function (t, e) {
          if (!o(t) || i(t)) return t;
          var n,
            c = a(t, f);
          if (c) {
            if (
              (void 0 === e && (e = "default"), (n = r(c, t, e)), !o(n) || i(n))
            )
              return n;
            throw s("Can't convert object to primitive value");
          }
          return void 0 === e && (e = "number"), u(t, e);
        };
      },
      4948: function (t, e, n) {
        var r = n(7593),
          o = n(2190);
        t.exports = function (t) {
          var e = r(t, "string");
          return o(e) ? e : e + "";
        };
      },
      1694: function (t, e, n) {
        var r = {};
        (r[n(5112)("toStringTag")] = "z"),
          (t.exports = "[object z]" === String(r));
      },
      1340: function (t, e, n) {
        var r = n(648),
          o = String;
        t.exports = function (t) {
          if ("Symbol" === r(t))
            throw TypeError("Cannot convert a Symbol value to a string");
          return o(t);
        };
      },
      6330: function (t) {
        var e = String;
        t.exports = function (t) {
          try {
            return e(t);
          } catch (t) {
            return "Object";
          }
        };
      },
      9711: function (t, e, n) {
        var r = n(1702),
          o = 0,
          i = Math.random(),
          a = r((1).toString);
        t.exports = function (t) {
          return "Symbol(" + (void 0 === t ? "" : t) + ")_" + a(++o + i, 36);
        };
      },
      3307: function (t, e, n) {
        var r = n(6293);
        t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
      },
      3353: function (t, e, n) {
        var r = n(9781),
          o = n(7293);
        t.exports =
          r &&
          o(function () {
            return (
              42 !=
              Object.defineProperty(function () {}, "prototype", {
                value: 42,
                writable: !1,
              }).prototype
            );
          });
      },
      4811: function (t, e, n) {
        var r = n(7854),
          o = n(614),
          i = r.WeakMap;
        t.exports = o(i) && /native code/.test(String(i));
      },
      5112: function (t, e, n) {
        var r = n(7854),
          o = n(2309),
          i = n(2597),
          a = n(9711),
          u = n(6293),
          c = n(3307),
          s = o("wks"),
          f = r.Symbol,
          l = f && f.for,
          p = c ? f : (f && f.withoutSetter) || a;
        t.exports = function (t) {
          if (!i(s, t) || (!u && "string" != typeof s[t])) {
            var e = "Symbol." + t;
            u && i(f, t) ? (s[t] = f[t]) : (s[t] = c && l ? l(e) : p(e));
          }
          return s[t];
        };
      },
      5827: function (t, e, n) {
        "use strict";
        var r = n(2109),
          o = n(3671).left,
          i = n(9341),
          a = n(7392),
          u = n(5268);
        r(
          {
            target: "Array",
            proto: !0,
            forced: !i("reduce") || (!u && a > 79 && a < 83),
          },
          {
            reduce: function (t) {
              var e = arguments.length;
              return o(this, t, e, e > 1 ? arguments[1] : void 0);
            },
          }
        );
      },
      4916: function (t, e, n) {
        "use strict";
        var r = n(2109),
          o = n(2261);
        r({ target: "RegExp", proto: !0, forced: /./.exec !== o }, { exec: o });
      },
      4747: function (t, e, n) {
        var r = n(7854),
          o = n(8324),
          i = n(8509),
          a = n(8533),
          u = n(8880),
          c = function (t) {
            if (t && t.forEach !== a)
              try {
                u(t, "forEach", a);
              } catch (e) {
                t.forEach = a;
              }
          };
        for (var s in o) o[s] && c(r[s] && r[s].prototype);
        c(i);
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var i = (e[r] = { exports: {} });
    return t[r](i, i.exports, n), i.exports;
  }
  (n.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return n.d(e, { a: e }), e;
  }),
    (n.d = function (t, e) {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (function () {
      "use strict";
      var t;
      n(4916),
        n(5827),
        n(4747),
        (window.qs = function (t) {
          return document.querySelectorAll(t).item(0);
        }),
        (window.onpopstate = function () {
          var e,
            n = /\+/g,
            r = /(autoplay|tv|maxQuality)=?([^&]*)/g,
            o = function (t) {
              return decodeURIComponent(t.replace(n, " "));
            },
            i = window.location.search.substring(1);
          for (t = {}; (e = r.exec(i)); ) t[o(e[1])] = o(e[2]);
        })();
      var e,
        r,
        o = "1" === t.autoplay,
        i = "1" === t.tv,
        a = jwplayer("player_box"),
        u = {
          preload: "metadata",
          playbackRateControls: !0,
          autostart: o,
          controls: !i,
          liveTimeout: 10,
          displayPlaybackLabel: !1,
          pipIcon: "enabled",
          autoPause: { viewability: !0, pauseAds: !0 },
          advertising: {
            client: "vast",
            outstream: !1,
            preloadAds: !1,
            rules: { startOnSeek: "pre", timeBetweenAds: 0 },
            schedule: [{ offset: "pre", tag: window.ads, type: "linear" }],
          },
          cast: {},
        },
        c = 0;
      window.statsSent = !1;
      var s =
          '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-download"><path d="M96.215 105h-72.18c-3.33 0-5.94-2.61-5.94-5.94V75.03c0-3.33 2.61-5.94 5.94-5.94 3.33 0 5.94 2.61 5.94 5.94v18h60.03v-18c0-3.33 2.61-5.94 5.94-5.94 3.33 0 5.94 2.61 5.94 5.94v24.03c.27 3.33-2.34 5.94-5.67 5.94Zm-32.4-34.47c-2.07 1.89-5.4 1.89-7.56 0l-18.72-17.19c-2.07-1.89-2.07-4.86 0-6.84 2.07-1.98 5.4-1.89 7.56 0l8.91 8.19V20.94c0-3.33 2.61-5.94 5.94-5.94 3.33 0 5.94 2.61 5.94 5.94V54.6l8.91-8.19c2.07-1.89 5.4-1.89 7.56 0 2.07 1.89 2.07 4.86 0 6.84l-18.54 17.28Z"/></svg>',
        f =
          '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon"><path d="M43.792 15c-1.395.072-3.08.76-4.118 1.696L16.715 39.655c-.937 1.038-1.643 2.715-1.715 4.11v32.443c.072 1.395.76 3.08 1.696 4.118l22.959 22.959c1.038.937 2.715 1.643 4.11 1.715h32.443c1.395-.072 3.08-.76 4.118-1.696l22.959-22.959c.937-1.038 1.643-2.715 1.715-4.11V43.792c-.072-1.395-.76-3.08-1.696-4.118L80.345 16.715c-1.038-.937-2.715-1.643-4.11-1.715Zm2.421 11.701h27.574l19.512 19.512v27.574L73.787 93.299H46.213L26.701 73.787V46.213Zm9.651 13.503c-.961.961-1.634 2.656-1.713 4.104L54.15 60c.079 1.448.78 3.149 1.714 4.136.987.935 2.656 1.635 4.104 1.713 1.447-.079 3.207-.752 4.168-1.713.961-.961 1.634-2.656 1.713-4.104l.001-15.692c-.079-1.448-.753-3.175-1.714-4.136-.961-.961-2.655-1.635-4.104-1.714-1.448.079-3.207.753-4.168 1.714Zm0 39.592c.987.935 2.656 1.635 4.104 1.714 2.006-.152 4.166-1.426 5.099-2.924.831-1.541.952-4.042.001-5.851-1.089-1.729-3.316-2.927-5.066-2.927s-3.976 1.197-5.067 2.925c-.458.83-.755 1.988-.785 2.908.079 1.448.78 3.168 1.714 4.155Z"/></svg>',
        l =
          '\n<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind" viewBox="0 0 240 240" focusable="false">\n  <path d="M185,135.6c-3.7-6.3-10.4-10.3-17.7-10.6c-7.3,0.3-14,4.3-17.7,10.6c-8.6,14.2-8.6,32.1,0,46.3c3.7,6.3,10.4,10.3,17.7,10.6\n  c7.3-0.3,14-4.3,17.7-10.6C193.6,167.6,193.6,149.8,185,135.6z M167.3,182.8c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1\n  s14.4,11,14.4,24.1S175.2,182.8,167.3,182.8z M123.9,192.5v-51l-4.8,4.8l-6.8-6.8l13-13c1.9-1.9,4.9-1.9,6.8,0\n  c0.9,0.9,1.4,2.1,1.4,3.4v62.7L123.9,192.5z M22.7,57.4h130.1V38.1c0-5.3,3.6-7.2,8-4.3l41.8,27.9c1.2,0.6,2.1,1.5,2.7,2.7\n  c1.4,3,0.2,6.5-2.7,8l-41.8,27.9c-4.4,2.9-8,1-8-4.3V76.7H37.1v96.4h48.2v19.3H22.6c-2.6,0-4.8-2.2-4.8-4.8V62.3\n  C17.8,59.6,20,57.4,22.7,57.4z">\n  </path>\n</svg>\n    ';
      function p() {
        window.open(window.downloadUrl);
      }
      q();
      var d,
        v,
        y = "uid4",
        g = new Promise(function (t, e) {
          d = t;
        });
      function m(t, e) {
        var n = new XMLHttpRequest();
        return (
          n.open("POST", "/stats?t=" + t),
          n.setRequestHeader("Content-Type", "application/json"),
          e &&
            (n.onreadystatechange = function () {
              4 === n.readyState && 204 === n.status && (window[e] = !0);
            }),
          n
        );
      }
      function x(t) {
        if (!localStorage.getItem("stats")) {
          var e = m("users"),
            n = JSON.stringify({
              uid: t,
              width: Math.floor(window.screen.width * window.devicePixelRatio),
              height: Math.floor(
                window.screen.height * window.devicePixelRatio
              ),
              tz: new Date().getTimezoneOffset(),
              adb: +a.getAdBlock(),
              lang: window.navigator.language || window.navigator.userLanguage,
            });
          (e.onreadystatechange = function () {
            4 === e.readyState &&
              204 === e.status &&
              localStorage.setItem("stats", 1);
          }),
            e.send(n);
        }
      }
      function h(t) {
        if ("adComplete" === t.type || "adSkipped" === t.type)
          try {
            (e = new Date()).setTime(Date.now() + 6e5),
              (document.cookie =
                "vast=1; path=/; expires=" +
                e.toUTCString() +
                " SameSite=none; Secure");
          } catch (t) {}
        var e, n;
        try {
          (n = t),
            g.then(function (t) {
              !(function (t, e) {
                if (e.tag) {
                  var n = e.tag.split("/")[2];
                  if (n && "adRequest" !== e.type) {
                    var r,
                      o = "ads";
                    if ("adError" === e.type) {
                      if (303 === e.code || 301 === e.code || 900 === e.code)
                        return;
                      (o = "ads_err"), (r = { aid: n, code: e.code });
                    } else
                      r = {
                        v_id: window.v_id,
                        aid: n,
                        event: {
                          adRequest: 0,
                          adImpression: 1,
                          adComplete: 2,
                          adSkipped: 3,
                          adClick: 4,
                          adError: 5,
                        }[e.type],
                        hour: new Date().getHours(),
                        site: +(window.location.href.indexOf("&a=1") > -1),
                        uid: t,
                      };
                    m(o).send(JSON.stringify(r));
                  }
                }
              })(t, n);
            });
        } catch (t) {}
      }
      function w(t) {
        delete u.advertising, c < 5 && setTimeout(q, 1e3);
      }
      function b(t) {
        if (
          !(window.statsSent || (u.playlist && 0 === u.playlist.sources.length))
        ) {
          var e = 0;
          u.playlist.hasOwnProperty("pm") && (e = u.playlist.pm);
          var n = m("views", "statsSent"),
            r = JSON.stringify({ v_id: window.v_id, pm: e });
          n.send(r);
        }
      }
      Object.defineProperty(window, "localStorage", {
        value:
          void 0 !== window.localStorage
            ? window.localStorage
            : ((v = {}),
              {
                getItem: function (t) {
                  return v[t];
                },
                setItem: function (t, e) {
                  v[t] = e.toString();
                },
              }),
      }),
        setTimeout(function () {
          var t;
          localStorage.getItem(y) ||
            ((t = localStorage.getItem(y))
              ? (x(t), d(t))
              : ((t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (t) {
                    var e = (16 * Math.random()) | 0;
                    return ("x" == t ? e : (3 & e) | 8).toString(16);
                  }
                )),
                localStorage.setItem(y, t),
                localStorage.setItem("nofp", "1"),
                x(t),
                d(t)));
        }, 5e3);
      var S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        O = 0,
        j = 0;
      function L(t) {
        var e,
          n = {},
          o = !0,
          i = 0,
          u = !1,
          c = t.type,
          s = a.getPosition(),
          f = parseInt(a.getDuration());
        ({
          ready: function () {
            e = "inited";
          },
          play: function () {
            (e = "started"),
              s > 0 && (n.time = parseInt(s)),
              (n.duration = f),
              r && (a.setCurrentQuality(r), (r = null));
          },
          pause: function () {
            (e = "paused"), (s = a.getPosition()), (n.time = parseInt(s));
          },
          complete: function () {
            (e = "ended"), (s = a.getPosition()), (n.time = parseInt(s));
          },
          time: function () {
            (e = "timeupdate"),
              (n.time = parseInt(t.position)),
              (n.duration = parseInt(t.duration)),
              O || (O = n.duration / S.length),
              (function (t) {
                if (j != t) {
                  var e = Math.floor(j / O);
                  e != S.length && (S[e] += 1), (j = t);
                } else j = t;
              })(n.time);
          },
          error: function () {
            (e = "error"),
              (s = a.getPosition()),
              (n.time = parseInt(s)),
              (n.code = 5);
          },
          seek: function () {
            (e = "rewound"),
              (n.time = parseInt(t.offset)),
              (n.previousTime = parseInt(t.position));
          },
          volume: function () {
            (e = "volumechange"),
              (i = t.volume),
              (u = !1),
              0 !== i
                ? ((n.volume = parseInt(i) / 100), (n.muted = u))
                : (o = !1);
          },
          mute: function () {
            (e = "volumechange"),
              (i = 0),
              (u = t.mute) || (i = a.getVolume()),
              (n.volume = parseInt(i) / 100),
              (n.muted = t.mute);
          },
          adImpression: function () {
            e = "adShown";
            var r = !0,
              o = t.skipoffset || 0;
            (n.time = s),
              (n.duration = t.duration),
              (o && 0 !== o) || (r = !1),
              (n.skipAdEnabled = r),
              (n.skipAd = o);
          },
        }[c](),
          o &&
            (function (t, e) {
              window.parent.postMessage(
                Object.assign({}, { event: t }, e),
                "*"
              );
            })(e, n));
      }
      function I(t) {
        var n = e.indexOf(t),
          r = e.length > 2 ? e.indexOf("large") : 0;
        return "number" == typeof n && n >= 0 ? n : r;
      }
      function E(t) {
        var e = t.data,
          n = {
            play: () => a.play(),
            pause: () => a.pause(),
            seek: () => a.seek(parseInt(e.time)),
            setVolume: () => a.setVolume(100 * parseFloat(e.volume)),
            mute: () => a.setMute(!0),
            unmute: () => a.setMute(!1),
            setQuality: () => {
              "idle" !== a.getState() && a.setCurrentQuality(I(e.quality));
            },
          }[e.method];
        n && n();
      }
      document.addEventListener("visibilitychange", function () {
        if ("hidden" === document.visibilityState) {
          if (0 == O) return;
          var t = S.map((t) => Math.round((t / O) * 10) / 10);
          if (0 === t.reduce((t, e) => t + e, 0)) return;
          var e = { v_id: window.v_id, views: t },
            n = new Blob([JSON.stringify(e)], { type: "application/json" });
          navigator.sendBeacon("/stats?t=timeline_views", n),
            (S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
            (j = 0);
        }
      });
      var T = null,
        P = !1;
      function k() {
        (qs(".report-container").style.display = "flex"),
          P || (T = a.getState()),
          a.pause(),
          (P = !0);
      }
      for (
        var M = document.querySelectorAll("input[name=report]"), R = 0;
        R < M.length;
        R++
      )
        M[R].addEventListener("click", function (t) {
          qs(".report-button").disabled = !1;
        });
      function C(t) {
        "playing" === t ? a.play() : a.pause();
      }
      function q() {
        var n;
        ((n = new XMLHttpRequest()),
        (n.timeout = 5e3),
        n.open("GET", window.playlistUrl, !0),
        (n.onreadystatechange = function () {
          if (4 === n.readyState && 200 === n.status) {
            var o;
            try {
              o = JSON.parse(n.responseText);
            } catch (t) {
              "string" == typeof n.response
                ? (o = JSON.parse(n.response))
                : "object" == typeof n.response && (o = n.response);
            }
            if (
              ((u.playlist = o),
              a.setup(u),
              a.on("play", b),
              a.on("error", w),
              a.on("ready", function (n) {
                qs(".jw-controls").appendChild(qs(".report-container"));
                var o = {
                    240: "small",
                    360: "medium",
                    480: "large",
                    720: "hd720",
                    1080: "hd1080",
                  },
                  i = a.getQualityLevels();
                (e = i.map(function (t) {
                  return o[t.label];
                })),
                  t.maxQuality && (r = I(t.maxQuality)),
                  (function () {
                    var t = a.getContainer(),
                      e = A.forward[D],
                      n = t
                        .querySelector(".jw-display-icon-rewind")
                        .cloneNode(!0),
                      r = n.querySelector(".jw-icon-rewind");
                    (r.innerHTML = l), (r.ariaLabel = e);
                    var o = t.querySelector(".jw-display-icon-next");
                    o.parentNode.insertBefore(n, o),
                      (t.querySelector(".jw-display-icon-next").style.display =
                        "none");
                    var i = t
                        .querySelector(".jw-button-container")
                        .querySelector(".jw-icon-rewind"),
                      u = i.cloneNode(!0);
                    (u.innerHTML = l),
                      (u.ariaLabel = e),
                      i.parentNode.insertBefore(u, i.nextElementSibling),
                      [r, u].forEach((t) => {
                        t.onclick = () => {
                          a.seek(a.getPosition() + 10);
                        };
                      });
                  })();
              }),
              a.on("setupError", w),
              a.on(
                "adImpression adComplete adSkipped adClick adRequest adError",
                h
              ),
              a.addButton(f, A.report[D], k, "reportDialog"),
              a.addButton(s, A["download-video"][D], p, "download"),
              a.on(
                "ready play pause time complete seek volume mute adImpression",
                L
              ),
              window.addEventListener("message", E),
              !o.trusted)
            ) {
              var i = qs(".alert-container");
              i &&
                (qs("body").classList.add("alert_open"),
                (i.style.display = "flex"),
                qs(".alert-button").addEventListener("click", function (t) {
                  t.preventDefault(),
                    (i.style.display = "none"),
                    qs("body").classList.remove("alert_open"),
                    a.play();
                }));
            }
          }
          4 === n.readyState && 200 !== n.status && c < 5 && setTimeout(q, 1e3);
        }),
        (n.onerror = function () {
          c < 5 && setTimeout(q, 1e3);
        }),
        n).send(null),
          (c += 1);
      }
      qs(".jw-settings-close").addEventListener("click", function (t) {
        (qs(".report-container").style.display = "none"), (P = !1), C(T);
      }),
        qs(".report-button").addEventListener("click", function (t) {
          var e = document.querySelector("input[name=report]:checked"),
            n = parseInt(e.value),
            r = localStorage.getItem("uid4"),
            o = new XMLHttpRequest(),
            i = qs('[name="csrfmiddlewaretoken"]').value;
          o.open("POST", "/claim/" + v_id + "/" + n + "?uid=" + r, !0),
            o.setRequestHeader("X-CSRFToken", i),
            o.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
            (o.onreadystatechange = function () {
              4 == o.readyState &&
                (200 === o.status
                  ? (alert(A["report-sent"][D]),
                    (qs(".report-container").style.display = "none"),
                    (P = !1),
                    C(T))
                  : alert(A["report-fail"][D]));
            }),
            o.send(null);
        });
      var A = {
          "alert-text": {
            en: "The following video may contain unacceptable content. Please let us know by clicking the <b>REPORT</b> button in the lower right corner while watching.",
            ru: "Содержание данного видео может оказаться неприемлемым. Сообщите нам об этом, кликнув на кнопку <b>Пожаловаться</b> в правом нижнем углу во время просмотра.",
          },
          "alert-button": { en: "Start watching", ru: "Начать просмотр" },
          report: { en: "Report", ru: "Пожаловаться" },
          "content-problems": {
            en: "Inappropriate content",
            ru: "Неприемлемый контент",
          },
          "video-problems": { en: "Video problems", ru: "Проблемы с видео" },
          "send-report": { en: "Send report", ru: "Отправить" },
          "download-video": { en: "Download video", ru: "Загрузить видео" },
          "report-sent": { en: "Report sent", ru: "Жалоба отправлена" },
          "report-fail": {
            en: "Report already sent",
            ru: "Жалоба уже отправлена",
          },
          forward: {
            en: "Forward 10 Seconds",
            ru: "Перемотать на 10 сек вперед",
          },
        },
        _ = window.navigator.language || window.navigator.userLanguage,
        D = "en";
      try {
        "ru" != (D = _.split("-")[0]) && (D = "en");
      } catch (t) {}
      !(function (t) {
        for (var e = Object.keys(A), n = 0; n < e.length; n++) {
          var r = qs("[i18n=" + e[n] + "]");
          r && (r.innerHTML = A[e[n]][t]);
        }
      })(D),
        document.cookie.indexOf("csrftoken") > -1 &&
          (document.cookie =
            "csrftoken=1;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;");
    })();
})();
