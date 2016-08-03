!function(a) {
    a.Parse = a.Parse || {}, a.Parse.VERSION = "js1.4.2";
}(this), function() {
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function(a) {
        return a instanceof x ? a : this instanceof x ? void (this._wrapped = a) : new x(a);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), 
    exports._ = x) : a._ = x, x.VERSION = "1.4.4";
    var y = x.each = x.forEach = function(a, b, d) {
        if (null != a) if (l && a.forEach === l) a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++) if (b.call(d, a[e], e, a) === c) return;
        } else for (var g in a) if (x.has(a, g) && b.call(d, a[g], g, a) === c) return;
    };
    x.map = x.collect = function(a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f);
        }), d);
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), 
        e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function(a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
        }), !e) throw new TypeError(z);
        return c;
    }, x.reduceRight = x.foldr = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), 
        e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length;
        }
        if (y(a, function(h, i, j) {
            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0);
        }), !e) throw new TypeError(z);
        return c;
    }, x.find = x.detect = function(a, b, c) {
        var d;
        return A(a, function(a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0;
        }), d;
    }, x.filter = x.select = function(a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a);
        }), d);
    }, x.reject = function(a, b, c) {
        return x.filter(a, function(a, d, e) {
            return !b.call(c, a, d, e);
        }, c);
    }, x.every = x.all = function(a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
            return (e = e && b.call(d, a, f, g)) ? void 0 : c;
        }), !!e);
    };
    var A = x.some = x.any = function(a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
            return e || (e = b.call(d, a, f, g)) ? c : void 0;
        }), !!e);
    };
    x.contains = x.include = function(a, b) {
        return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
            return a === b;
        });
    }, x.invoke = function(a, b) {
        var c = h.call(arguments, 2), d = x.isFunction(b);
        return x.map(a, function(a) {
            return (d ? b : a[b]).apply(a, c);
        });
    }, x.pluck = function(a, b) {
        return x.map(a, function(a) {
            return a[b];
        });
    }, x.where = function(a, b, c) {
        return x.isEmpty(b) ? c ? null : [] : x[c ? "find" : "filter"](a, function(a) {
            for (var c in b) if (b[c] !== a[c]) return !1;
            return !0;
        });
    }, x.findWhere = function(a, b) {
        return x.where(a, b, !0);
    }, x.max = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a)) return -(1 / 0);
        var d = {
            computed: -(1 / 0),
            value: -(1 / 0)
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, x.min = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a)) return 1 / 0;
        var d = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, x.shuffle = function(a) {
        var b, c = 0, d = [];
        return y(a, function(a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a;
        }), d;
    };
    var B = function(a) {
        return x.isFunction(a) ? a : function(b) {
            return b[a];
        };
    };
    x.sortBy = function(a, b, c) {
        var d = B(b);
        return x.pluck(x.map(a, function(a, b, e) {
            return {
                value: a,
                index: b,
                criteria: d.call(c, a, b, e)
            };
        }).sort(function(a, b) {
            var c = a.criteria, d = b.criteria;
            if (c !== d) {
                if (c > d || void 0 === c) return 1;
                if (d > c || void 0 === d) return -1;
            }
            return a.index < b.index ? -1 : 1;
        }), "value");
    };
    var C = function(a, b, c, d) {
        var e = {}, f = B(b || x.identity);
        return y(a, function(b, g) {
            var h = f.call(c, b, g, a);
            d(e, h, b);
        }), e;
    };
    x.groupBy = function(a, b, c) {
        return C(a, b, c, function(a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c);
        });
    }, x.countBy = function(a, b, c) {
        return C(a, b, c, function(a, b) {
            x.has(a, b) || (a[b] = 0), a[b]++;
        });
    }, x.sortedIndex = function(a, b, c, d) {
        c = null == c ? x.identity : B(c);
        for (var e = c.call(d, b), f = 0, g = a.length; g > f; ) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h;
        }
        return f;
    }, x.toArray = function(a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [];
    }, x.size = function(a) {
        return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length;
    }, x.first = x.head = x.take = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b);
    }, x.initial = function(a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b));
    }, x.last = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0));
    }, x.rest = x.tail = x.drop = function(a, b, c) {
        return h.call(a, null == b || c ? 1 : b);
    }, x.compact = function(a) {
        return x.filter(a, x.identity);
    };
    var D = function(a, b, c) {
        return y(a, function(a) {
            x.isArray(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a);
        }), c;
    };
    x.flatten = function(a, b) {
        return D(a, b, []);
    }, x.without = function(a) {
        return x.difference(a, h.call(arguments, 1));
    }, x.uniq = x.unique = function(a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a, f = [], g = [];
        return y(e, function(c, d) {
            (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]));
        }), f;
    }, x.union = function() {
        return x.uniq(i.apply(d, arguments));
    }, x.intersection = function(a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function(a) {
            return x.every(b, function(b) {
                return x.indexOf(b, a) >= 0;
            });
        });
    }, x.difference = function(a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function(a) {
            return !x.contains(b, a);
        });
    }, x.zip = function() {
        for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
        return c;
    }, x.object = function(a, b) {
        if (null == a) return {};
        for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c;
    }, x.indexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = 0, e = a.length;
        if (c) {
            if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = 0 > c ? Math.max(0, e + c) : c;
        }
        if (s && a.indexOf === s) return a.indexOf(b, c);
        for (;e > d; d++) if (a[d] === b) return d;
        return -1;
    }, x.lastIndexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = null != c;
        if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        for (var e = d ? c : a.length; e--; ) if (a[e] === b) return e;
        return -1;
    }, x.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e; ) f[e++] = a, 
        a += c;
        return f;
    }, x.bind = function(a, b) {
        if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
        var c = h.call(arguments, 2);
        return function() {
            return a.apply(b, c.concat(h.call(arguments)));
        };
    }, x.partial = function(a) {
        var b = h.call(arguments, 1);
        return function() {
            return a.apply(this, b.concat(h.call(arguments)));
        };
    }, x.bindAll = function(a) {
        var b = h.call(arguments, 1);
        return 0 === b.length && (b = x.functions(a)), y(b, function(b) {
            a[b] = x.bind(a[b], a);
        }), a;
    }, x.memoize = function(a, b) {
        var c = {};
        return b || (b = x.identity), function() {
            var d = b.apply(this, arguments);
            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
        };
    }, x.delay = function(a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c);
        }, b);
    }, x.defer = function(a) {
        return x.delay.apply(x, [ a, 1 ].concat(h.call(arguments, 1)));
    }, x.throttle = function(a, b) {
        var c, d, e, f, g = 0, h = function() {
            g = new Date(), e = null, f = a.apply(c, d);
        };
        return function() {
            var i = new Date(), j = b - (i - g);
            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), 
            f;
        };
    }, x.debounce = function(a, b, c) {
        var d, e;
        return function() {
            var f = this, g = arguments, h = function() {
                d = null, c || (e = a.apply(f, g));
            }, i = c && !d;
            return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e;
        };
    }, x.once = function(a) {
        var b, c = !1;
        return function() {
            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b);
        };
    }, x.wrap = function(a, b) {
        return function() {
            var c = [ a ];
            return g.apply(c, arguments), b.apply(this, c);
        };
    }, x.compose = function() {
        var a = arguments;
        return function() {
            for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
            return b[0];
        };
    }, x.after = function(a, b) {
        return 0 >= a ? b() : function() {
            return --a < 1 ? b.apply(this, arguments) : void 0;
        };
    }, x.keys = v || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [];
        for (var c in a) x.has(a, c) && (b[b.length] = c);
        return b;
    }, x.values = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push(a[c]);
        return b;
    }, x.pairs = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push([ c, a[c] ]);
        return b;
    }, x.invert = function(a) {
        var b = {};
        for (var c in a) x.has(a, c) && (b[a[c]] = c);
        return b;
    }, x.functions = x.methods = function(a) {
        var b = [];
        for (var c in a) x.isFunction(a[c]) && b.push(c);
        return b.sort();
    }, x.extend = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b) for (var c in b) a[c] = b[c];
        }), a;
    }, x.pick = function(a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        return y(c, function(c) {
            c in a && (b[c] = a[c]);
        }), b;
    }, x.omit = function(a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        for (var e in a) x.contains(c, e) || (b[e] = a[e]);
        return b;
    }, x.defaults = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b) for (var c in b) null == a[c] && (a[c] = b[c]);
        }), a;
    }, x.clone = function(a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a;
    }, x.tap = function(a, b) {
        return b(a), a;
    };
    var E = function(a, b, c, d) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b)) return !1;
        switch (e) {
          case "[object String]":
            return a == String(b);

          case "[object Number]":
            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return !1;
        for (var f = c.length; f--; ) if (c[f] == a) return d[f] == b;
        c.push(a), d.push(b);
        var g = 0, h = !0;
        if ("[object Array]" == e) {
            if (g = a.length, h = g == b.length) for (;g-- && (h = E(a[g], b[g], c, d)); ) ;
        } else {
            var i = a.constructor, k = b.constructor;
            if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return !1;
            for (var l in a) if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
            if (h) {
                for (l in b) if (x.has(b, l) && !g--) break;
                h = !g;
            }
        }
        return c.pop(), d.pop(), h;
    };
    x.isEqual = function(a, b) {
        return E(a, b, [], []);
    }, x.isEmpty = function(a) {
        if (null == a) return !0;
        if (x.isArray(a) || x.isString(a)) return 0 === a.length;
        for (var b in a) if (x.has(a, b)) return !1;
        return !0;
    }, x.isElement = function(a) {
        return !(!a || 1 !== a.nodeType);
    }, x.isArray = u || function(a) {
        return "[object Array]" == j.call(a);
    }, x.isObject = function(a) {
        return a === Object(a);
    }, y([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(a) {
        x["is" + a] = function(b) {
            return j.call(b) == "[object " + a + "]";
        };
    }), x.isArguments(arguments) || (x.isArguments = function(a) {
        return !(!a || !x.has(a, "callee"));
    }), "function" != typeof /./ && (x.isFunction = function(a) {
        return "function" == typeof a;
    }), x.isFinite = function(a) {
        return isFinite(a) && !isNaN(parseFloat(a));
    }, x.isNaN = function(a) {
        return x.isNumber(a) && a != +a;
    }, x.isBoolean = function(a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a);
    }, x.isNull = function(a) {
        return null === a;
    }, x.isUndefined = function(a) {
        return void 0 === a;
    }, x.has = function(a, b) {
        return k.call(a, b);
    }, x.noConflict = function() {
        return a._ = b, this;
    }, x.identity = function(a) {
        return a;
    }, x.times = function(a, b, c) {
        for (var d = Array(a), e = 0; a > e; e++) d[e] = b.call(c, e);
        return d;
    }, x.random = function(a, b) {
        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
    };
    var F = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    F.unescape = x.invert(F.escape);
    var G = {
        escape: new RegExp("[" + x.keys(F.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(F.unescape).join("|") + ")", "g")
    };
    x.each([ "escape", "unescape" ], function(a) {
        x[a] = function(b) {
            return null == b ? "" : ("" + b).replace(G[a], function(b) {
                return F[a][b];
            });
        };
    }), x.result = function(a, b) {
        if (null == a) return null;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c;
    }, x.mixin = function(a) {
        y(x.functions(a), function(b) {
            var c = x[b] = a[b];
            x.prototype[b] = function() {
                var a = [ this._wrapped ];
                return g.apply(a, arguments), L.call(this, c.apply(x, a));
            };
        });
    };
    var H = 0;
    x.uniqueId = function(a) {
        var b = ++H + "";
        return a ? a + b : b;
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var I = /(.)^/, J = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function(a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([ (c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source ].join("|") + "|$", "g"), f = 0, g = "__p+='";
        a.replace(e, function(b, c, d, e, h) {
            return g += a.slice(f, h).replace(K, function(a) {
                return "\\" + J[a];
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), 
            e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b;
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g);
        } catch (h) {
            throw h.source = g, h;
        }
        if (b) return d(b, x);
        var i = function(a) {
            return d.call(this, a, x);
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i;
    }, x.chain = function(a) {
        return x(a).chain();
    };
    var L = function(a) {
        return this._chain ? x(a).chain() : a;
    };
    x.mixin(x), y([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            var c = this._wrapped;
            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], 
            L.call(this, c);
        };
    }), y([ "concat", "join", "slice" ], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            return L.call(this, b.apply(this._wrapped, arguments));
        };
    }), x.extend(x.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}.call(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = "function" == typeof require ? require : null;
    "undefined" != typeof XMLHttpRequest ? b.XMLHttpRequest = XMLHttpRequest : "function" == typeof require && "undefined" == typeof require.ensure && (b.XMLHttpRequest = c("xmlhttprequest").XMLHttpRequest), 
    "undefined" != typeof exports && exports._ ? (b._ = exports._.noConflict(), exports.Parse = b) : b._ = _.noConflict(), 
    "undefined" != typeof $ && (b.$ = $);
    var d = function() {}, e = function(a, c, e) {
        var f;
        return f = c && c.hasOwnProperty("constructor") ? c.constructor : function() {
            a.apply(this, arguments);
        }, b._.extend(f, a), d.prototype = a.prototype, f.prototype = new d(), c && b._.extend(f.prototype, c), 
        e && b._.extend(f, e), f.prototype.constructor = f, f.__super__ = a.prototype, f;
    };
    b.serverURL = "https://api.parse.com", "undefined" != typeof process && process.versions && process.versions.node && (b._isNode = !0), 
    b.initialize = function(a, c, d) {
        if (d) throw "Parse.initialize() was passed a Master Key, which is only allowed from within Node.js.";
        b._initialize(a, c);
    }, b._initialize = function(a, c, d) {
        b.applicationId = a, b.javaScriptKey = c, b.masterKey = d, b._useMasterKey = !1;
    }, b._isNode && (b.initialize = b._initialize, b.Cloud = b.Cloud || {}, b.Cloud.useMasterKey = function() {
        b._useMasterKey = !0;
    }), b._getParsePath = function(a) {
        if (!b.applicationId) throw "You need to call Parse.initialize before using Parse.";
        if (a || (a = ""), !b._.isString(a)) throw "Tried to get a Storage path that wasn't a String.";
        return "/" === a[0] && (a = a.substring(1)), "Parse/" + b.applicationId + "/" + a;
    }, b._installationId = null, b._getInstallationId = function() {
        if (b._installationId) return b.Promise.as(b._installationId);
        var a = b._getParsePath("installationId");
        return b.Storage.getItemAsync(a).then(function(c) {
            if (b._installationId = c, !b._installationId || "" === b._installationId) {
                var d = function() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                };
                return b._installationId = d() + d() + "-" + d() + "-" + d() + "-" + d() + "-" + d() + d() + d(), 
                b.Storage.setItemAsync(a, b._installationId);
            }
            return b.Promise.as(b._installationId);
        });
    }, b._parseDate = function(a) {
        var b = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"), c = b.exec(a);
        if (!c) return null;
        var d = c[1] || 0, e = (c[2] || 1) - 1, f = c[3] || 0, g = c[4] || 0, h = c[5] || 0, i = c[6] || 0, j = c[8] || 0;
        return new Date(Date.UTC(d, e, f, g, h, i, j));
    }, b._ajaxIE8 = function(a, c, d) {
        var e = new b.Promise(), f = new XDomainRequest();
        return f.onload = function() {
            var a;
            try {
                a = JSON.parse(f.responseText);
            } catch (b) {
                e.reject(b);
            }
            a && e.resolve(a);
        }, f.onerror = f.ontimeout = function() {
            var a = {
                responseText: JSON.stringify({
                    code: b.Error.X_DOMAIN_REQUEST,
                    error: "IE's XDomainRequest does not supply error info."
                })
            };
            e.reject(a);
        }, f.onprogress = function() {}, f.open(a, c), f.send(d), e;
    }, b._useXDomainRequest = function() {
        return "undefined" != typeof XDomainRequest ? "withCredentials" in new XMLHttpRequest() ? !1 : !0 : !1;
    }, b._ajax = function(a, c, d, e, f) {
        var g = {
            success: e,
            error: f
        };
        if (b._useXDomainRequest()) return b._ajaxIE8(a, c, d)._thenRunCallbacks(g);
        var h = new b.Promise(), i = 0, j = function() {
            var e = !1, f = new b.XMLHttpRequest();
            f.onreadystatechange = function() {
                if (4 === f.readyState) {
                    if (e) return;
                    if (e = !0, f.status >= 200 && f.status < 300) {
                        var a;
                        try {
                            a = JSON.parse(f.responseText);
                        } catch (b) {
                            h.reject(b);
                        }
                        a && h.resolve(a, f.status, f);
                    } else if (f.status >= 500) if (++i < 5) {
                        var c = Math.round(125 * Math.random() * Math.pow(2, i));
                        setTimeout(j, c);
                    } else h.reject(f); else h.reject(f);
                }
            }, f.open(a, c, !0), f.setRequestHeader("Content-Type", "text/plain"), b._isNode && f.setRequestHeader("User-Agent", "Parse/" + b.VERSION + " (NodeJS " + process.versions.node + ")"), 
            f.send(d);
        };
        return j(), h._thenRunCallbacks(g);
    }, b._extend = function(a, b) {
        var c = e(this, a, b);
        return c.extend = this.extend, c;
    }, b._request = function(a) {
        var c = a.route, d = a.className, e = a.objectId, f = a.method, g = a.useMasterKey, h = a.sessionToken, i = a.data;
        if (!b.applicationId) throw "You must specify your applicationId using Parse.initialize.";
        if (!b.javaScriptKey && !b.masterKey) throw "You must specify a key using Parse.initialize.";
        if ("batch" !== c && "classes" !== c && "events" !== c && "files" !== c && "functions" !== c && "login" !== c && "logout" !== c && "push" !== c && "requestPasswordReset" !== c && "rest_verify_analytics" !== c && "users" !== c && "jobs" !== c && "config" !== c && "sessions" !== c && "upgradeToRevocableSession" !== c) throw "Bad route: '" + c + "'.";
        var j = b.serverURL;
        return "/" !== j.charAt(j.length - 1) && (j += "/"), j += "1/" + c, d && (j += "/" + d), 
        e && (j += "/" + e), i = b._.clone(i || {}), "POST" !== f && (i._method = f, f = "POST"), 
        b._.isUndefined(g) && (g = b._useMasterKey), i._ApplicationId = b.applicationId, 
        g ? i._MasterKey = b.masterKey : i._JavaScriptKey = b.javaScriptKey, i._ClientVersion = b.VERSION, 
        b._getInstallationId().then(function(a) {
            return i._InstallationId = a, h ? b.Promise.as({
                _sessionToken: h
            }) : b.User._currentAsync();
        }).then(function(a) {
            a && a._sessionToken && (i._SessionToken = a._sessionToken), b.User._isRevocableSessionEnabled && (i._RevocableSession = "1");
            var c = JSON.stringify(i);
            return b._ajax(f, j, c);
        }).then(null, function(a) {
            var c;
            if (a && a.responseText) try {
                var d = JSON.parse(a.responseText);
                c = new b.Error(d.code, d.error);
            } catch (e) {
                c = new b.Error(b.Error.INVALID_JSON, "Received an error with invalid JSON from Parse: " + a.responseText);
            } else c = new b.Error(b.Error.CONNECTION_FAILED, "XMLHttpRequest failed: " + JSON.stringify(a));
            return b.Promise.error(c);
        });
    }, b._getValue = function(a, c) {
        return a && a[c] ? b._.isFunction(a[c]) ? a[c]() : a[c] : null;
    }, b._encode = function(a, c, d) {
        var e = b._;
        if (a instanceof b.Object) {
            if (d) throw "Parse.Objects not allowed here";
            if (!c || e.include(c, a) || !a._hasData) return a._toPointer();
            if (!a.dirty()) return c = c.concat(a), b._encode(a._toFullJSON(c), c, d);
            throw "Tried to save an object with a pointer to a new, unsaved object.";
        }
        if (a instanceof b.ACL) return a.toJSON();
        if (e.isDate(a)) return {
            __type: "Date",
            iso: a.toJSON()
        };
        if (a instanceof b.GeoPoint) return a.toJSON();
        if (e.isArray(a)) return e.map(a, function(a) {
            return b._encode(a, c, d);
        });
        if (e.isRegExp(a)) return a.source;
        if (a instanceof b.Relation) return a.toJSON();
        if (a instanceof b.Op) return a.toJSON();
        if (a instanceof b.File) {
            if (!a.url()) throw "Tried to save an object containing an unsaved file.";
            return {
                __type: "File",
                name: a.name(),
                url: a.url()
            };
        }
        if (e.isObject(a)) {
            var f = {};
            return b._objectEach(a, function(a, e) {
                f[e] = b._encode(a, c, d);
            }), f;
        }
        return a;
    }, b._decode = function(a, c) {
        var d = b._;
        if (!d.isObject(c)) return c;
        if (d.isArray(c)) return b._arrayEach(c, function(a, d) {
            c[d] = b._decode(d, a);
        }), c;
        if (c instanceof b.Object) return c;
        if (c instanceof b.File) return c;
        if (c instanceof b.Op) return c;
        if (c.__op) return b.Op._decode(c);
        if ("Pointer" === c.__type && c.className) {
            var e = b.Object._create(c.className);
            return e._finishFetch({
                objectId: c.objectId
            }, !1), e;
        }
        if ("Object" === c.__type && c.className) {
            var f = c.className;
            delete c.__type, delete c.className;
            var g = b.Object._create(f);
            return g._finishFetch(c, !0), g;
        }
        if ("Date" === c.__type) return b._parseDate(c.iso);
        if ("GeoPoint" === c.__type) return new b.GeoPoint({
            latitude: c.latitude,
            longitude: c.longitude
        });
        if ("ACL" === a) return c instanceof b.ACL ? c : new b.ACL(c);
        if ("Relation" === c.__type) {
            var h = new b.Relation(null, a);
            return h.targetClassName = c.className, h;
        }
        if ("File" === c.__type) {
            var i = new b.File(c.name);
            return i._url = c.url, i;
        }
        return b._objectEach(c, function(a, d) {
            c[d] = b._decode(d, a);
        }), c;
    }, b._arrayEach = b._.each, b._traverse = function(a, c, d) {
        if (a instanceof b.Object) {
            if (d = d || [], b._.indexOf(d, a) >= 0) return;
            return d.push(a), b._traverse(a.attributes, c, d), c(a);
        }
        return a instanceof b.Relation || a instanceof b.File ? c(a) : b._.isArray(a) ? (b._.each(a, function(e, f) {
            var g = b._traverse(e, c, d);
            g && (a[f] = g);
        }), c(a)) : b._.isObject(a) ? (b._each(a, function(e, f) {
            var g = b._traverse(e, c, d);
            g && (a[f] = g);
        }), c(a)) : c(a);
    }, b._objectEach = b._each = function(a, c) {
        var d = b._;
        d.isObject(a) ? d.each(d.keys(a), function(b) {
            c(a[b], b);
        }) : d.each(a, c);
    }, b._isNullOrUndefined = function(a) {
        return b._.isNull(a) || b._.isUndefined(a);
    };
}(this), function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse, Storage = {
        async: !1
    }, hasLocalStorage = "undefined" != typeof localStorage;
    if (hasLocalStorage) try {
        localStorage.setItem("supported", !0), localStorage.removeItem("supported");
    } catch (e) {
        hasLocalStorage = !1;
    }
    if (hasLocalStorage) Storage.getItem = function(a) {
        return localStorage.getItem(a);
    }, Storage.setItem = function(a, b) {
        return localStorage.setItem(a, b);
    }, Storage.removeItem = function(a) {
        return localStorage.removeItem(a);
    }, Storage.clear = function() {
        return localStorage.clear();
    }; else if ("function" == typeof require) {
        var AsyncStorage;
        try {
            AsyncStorage = eval("require('AsyncStorage')"), Storage.async = !0, Storage.getItemAsync = function(a) {
                var b = new Parse.Promise();
                return AsyncStorage.getItem(a, function(a, c) {
                    a ? b.reject(a) : b.resolve(c);
                }), b;
            }, Storage.setItemAsync = function(a, b) {
                var c = new Parse.Promise();
                return AsyncStorage.setItem(a, b, function(a) {
                    a ? c.reject(a) : c.resolve(b);
                }), c;
            }, Storage.removeItemAsync = function(a) {
                var b = new Parse.Promise();
                return AsyncStorage.removeItem(a, function(a) {
                    a ? b.reject(a) : b.resolve();
                }), b;
            }, Storage.clear = function() {
                AsyncStorage.clear();
            };
        } catch (e) {}
    }
    if (!Storage.async && !Storage.getItem) {
        var memMap = Storage.inMemoryMap = {};
        Storage.getItem = function(a) {
            return memMap.hasOwnProperty(a) ? memMap[a] : null;
        }, Storage.setItem = function(a, b) {
            memMap[a] = String(b);
        }, Storage.removeItem = function(a) {
            delete memMap[a];
        }, Storage.clear = function() {
            for (var a in memMap) memMap.hasOwnProperty(a) && delete memMap[a];
        };
    }
    Storage.async || (Storage.getItemAsync = function(a) {
        return Parse.Promise.as(Storage.getItem(a));
    }, Storage.setItemAsync = function(a, b) {
        return Storage.setItem(a, b), Parse.Promise.as(b);
    }, Storage.removeItemAsync = function(a) {
        return Parse.Promise.as(Storage.removeItem(a));
    }), Parse.Storage = Storage;
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Analytics = b.Analytics || {}, c.extend(b.Analytics, {
        track: function(a, d, e) {
            if (a = a || "", a = a.replace(/^\s*/, ""), a = a.replace(/\s*$/, ""), 0 === a.length) throw "A name for the custom event must be provided";
            return c.each(d, function(a, b) {
                if (!c.isString(b) || !c.isString(a)) throw 'track() dimensions expects keys and values of type "string".';
            }), e = e || {}, b._request({
                route: "events",
                className: a,
                method: "POST",
                data: {
                    dimensions: d
                }
            })._thenRunCallbacks(e);
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Config = function() {
        this.attributes = {}, this._escapedAttributes = {};
    }, b.Config.current = function() {
        if (b.Config._currentConfig) return b.Config._currentConfig;
        var a = new b.Config();
        if (b.Storage.async) return a;
        var c = b.Storage.getItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY));
        return c && (a._finishFetch(JSON.parse(c)), b.Config._currentConfig = a), a;
    }, b.Config.get = function(a) {
        a = a || {};
        var c = b._request({
            route: "config",
            method: "GET"
        });
        return c.then(function(a) {
            if (!a || !a.params) {
                var c = new b.Error(b.Error.INVALID_JSON, "Config JSON response invalid.");
                return b.Promise.error(c);
            }
            var d = new b.Config();
            return d._finishFetch(a), b.Config._currentConfig = d, d;
        })._thenRunCallbacks(a);
    }, b.Config.prototype = {
        escape: function(a) {
            var d = this._escapedAttributes[a];
            if (d) return d;
            var e, f = this.attributes[a];
            return e = b._isNullOrUndefined(f) ? "" : c.escape(f.toString()), this._escapedAttributes[a] = e, 
            e;
        },
        get: function(a) {
            return this.attributes[a];
        },
        _finishFetch: function(a) {
            this.attributes = b._decode(null, c.clone(a.params)), b.Storage.async || b.Storage.setItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY), JSON.stringify(a));
        }
    }, b.Config._currentConfig = null, b.Config._CURRENT_CONFIG_KEY = "currentConfig";
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Error = function(a, b) {
        this.code = a, this.message = b;
    }, c.extend(b.Error, {
        OTHER_CAUSE: -1,
        INTERNAL_SERVER_ERROR: 1,
        CONNECTION_FAILED: 100,
        OBJECT_NOT_FOUND: 101,
        INVALID_QUERY: 102,
        INVALID_CLASS_NAME: 103,
        MISSING_OBJECT_ID: 104,
        INVALID_KEY_NAME: 105,
        INVALID_POINTER: 106,
        INVALID_JSON: 107,
        COMMAND_UNAVAILABLE: 108,
        NOT_INITIALIZED: 109,
        INCORRECT_TYPE: 111,
        INVALID_CHANNEL_NAME: 112,
        PUSH_MISCONFIGURED: 115,
        OBJECT_TOO_LARGE: 116,
        OPERATION_FORBIDDEN: 119,
        CACHE_MISS: 120,
        INVALID_NESTED_KEY: 121,
        INVALID_FILE_NAME: 122,
        INVALID_ACL: 123,
        TIMEOUT: 124,
        INVALID_EMAIL_ADDRESS: 125,
        MISSING_CONTENT_TYPE: 126,
        MISSING_CONTENT_LENGTH: 127,
        INVALID_CONTENT_LENGTH: 128,
        FILE_TOO_LARGE: 129,
        FILE_SAVE_ERROR: 130,
        DUPLICATE_VALUE: 137,
        INVALID_ROLE_NAME: 139,
        EXCEEDED_QUOTA: 140,
        SCRIPT_FAILED: 141,
        VALIDATION_ERROR: 142,
        INVALID_IMAGE_DATA: 150,
        UNSAVED_FILE_ERROR: 151,
        INVALID_PUSH_TIME_ERROR: 152,
        FILE_DELETE_ERROR: 153,
        REQUEST_LIMIT_EXCEEDED: 155,
        INVALID_EVENT_NAME: 160,
        USERNAME_MISSING: 200,
        PASSWORD_MISSING: 201,
        USERNAME_TAKEN: 202,
        EMAIL_TAKEN: 203,
        EMAIL_MISSING: 204,
        EMAIL_NOT_FOUND: 205,
        SESSION_MISSING: 206,
        MUST_CREATE_USER_THROUGH_SIGNUP: 207,
        ACCOUNT_ALREADY_LINKED: 208,
        INVALID_SESSION_TOKEN: 209,
        LINKED_ID_MISSING: 250,
        INVALID_LINKED_SESSION: 251,
        UNSUPPORTED_SERVICE: 252,
        AGGREGATE_ERROR: 600,
        FILE_READ_ERROR: 601,
        X_DOMAIN_REQUEST: 602
    });
}(this), function() {
    var a = this, b = a.Parse || (a.Parse = {}), c = /\s+/, d = Array.prototype.slice;
    b.Events = {
        on: function(a, b, d) {
            var e, f, g, h, i;
            if (!b) return this;
            for (a = a.split(c), e = this._callbacks || (this._callbacks = {}), f = a.shift(); f; ) i = e[f], 
            g = i ? i.tail : {}, g.next = h = {}, g.context = d, g.callback = b, e[f] = {
                tail: h,
                next: i ? i.next : g
            }, f = a.shift();
            return this;
        },
        off: function(a, b, d) {
            var e, f, g, h, i, j;
            if (f = this._callbacks) {
                if (!(a || b || d)) return delete this._callbacks, this;
                for (a = a ? a.split(c) : Object.keys(f), e = a.shift(); e; ) if (g = f[e], delete f[e], 
                g && (b || d)) {
                    for (h = g.tail, g = g.next; g !== h; ) i = g.callback, j = g.context, (b && i !== b || d && j !== d) && this.on(e, i, j), 
                    g = g.next;
                    e = a.shift();
                } else e = a.shift();
                return this;
            }
        },
        trigger: function(a) {
            var b, e, f, g, h, i, j;
            if (!(f = this._callbacks)) return this;
            for (i = f.all, a = a.split(c), j = d.call(arguments, 1), b = a.shift(); b; ) {
                if (e = f[b]) for (g = e.tail; (e = e.next) !== g; ) e.callback.apply(e.context || this, j);
                if (e = i) for (g = e.tail, h = [ b ].concat(j); (e = e.next) !== g; ) e.callback.apply(e.context || this, h);
                b = a.shift();
            }
            return this;
        }
    }, b.Events.bind = b.Events.on, b.Events.unbind = b.Events.off;
}.call(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.GeoPoint = function(a, d) {
        c.isArray(a) ? (b.GeoPoint._validate(a[0], a[1]), this.latitude = a[0], this.longitude = a[1]) : c.isObject(a) ? (b.GeoPoint._validate(a.latitude, a.longitude), 
        this.latitude = a.latitude, this.longitude = a.longitude) : c.isNumber(a) && c.isNumber(d) ? (b.GeoPoint._validate(a, d), 
        this.latitude = a, this.longitude = d) : (this.latitude = 0, this.longitude = 0);
        var e = this;
        this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, 
        this._longitude = this.longitude, this.__defineGetter__("latitude", function() {
            return e._latitude;
        }), this.__defineGetter__("longitude", function() {
            return e._longitude;
        }), this.__defineSetter__("latitude", function(a) {
            b.GeoPoint._validate(a, e.longitude), e._latitude = a;
        }), this.__defineSetter__("longitude", function(a) {
            b.GeoPoint._validate(e.latitude, a), e._longitude = a;
        }));
    }, b.GeoPoint._validate = function(a, b) {
        if (-90 > a) throw "Parse.GeoPoint latitude " + a + " < -90.0.";
        if (a > 90) throw "Parse.GeoPoint latitude " + a + " > 90.0.";
        if (-180 > b) throw "Parse.GeoPoint longitude " + b + " < -180.0.";
        if (b > 180) throw "Parse.GeoPoint longitude " + b + " > 180.0.";
    }, b.GeoPoint.current = function(a) {
        var c = new b.Promise();
        return navigator.geolocation.getCurrentPosition(function(a) {
            c.resolve(new b.GeoPoint({
                latitude: a.coords.latitude,
                longitude: a.coords.longitude
            }));
        }, function(a) {
            c.reject(a);
        }), c._thenRunCallbacks(a);
    }, b.GeoPoint.prototype = {
        toJSON: function() {
            return b.GeoPoint._validate(this.latitude, this.longitude), {
                __type: "GeoPoint",
                latitude: this.latitude,
                longitude: this.longitude
            };
        },
        radiansTo: function(a) {
            var b = Math.PI / 180, c = this.latitude * b, d = this.longitude * b, e = a.latitude * b, f = a.longitude * b, g = c - e, h = d - f, i = Math.sin(g / 2), j = Math.sin(h / 2), k = i * i + Math.cos(c) * Math.cos(e) * j * j;
            return k = Math.min(1, k), 2 * Math.asin(Math.sqrt(k));
        },
        kilometersTo: function(a) {
            return 6371 * this.radiansTo(a);
        },
        milesTo: function(a) {
            return 3958.8 * this.radiansTo(a);
        }
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._, d = "*";
    b.ACL = function(a) {
        var d = this;
        if (d.permissionsById = {}, c.isObject(a)) if (a instanceof b.User) d.setReadAccess(a, !0), 
        d.setWriteAccess(a, !0); else {
            if (c.isFunction(a)) throw "Parse.ACL() called with a function.  Did you forget ()?";
            b._objectEach(a, function(a, e) {
                if (!c.isString(e)) throw "Tried to create an ACL with an invalid userId.";
                d.permissionsById[e] = {}, b._objectEach(a, function(a, b) {
                    if ("read" !== b && "write" !== b) throw "Tried to create an ACL with an invalid permission type.";
                    if (!c.isBoolean(a)) throw "Tried to create an ACL with an invalid permission value.";
                    d.permissionsById[e][b] = a;
                });
            });
        }
    }, b.ACL.prototype.toJSON = function() {
        return c.clone(this.permissionsById);
    }, b.ACL.prototype._setAccess = function(a, d, e) {
        if (d instanceof b.User ? d = d.id : d instanceof b.Role && (d = "role:" + d.getName()), 
        !c.isString(d)) throw "userId must be a string.";
        if (!c.isBoolean(e)) throw "allowed must be either true or false.";
        var f = this.permissionsById[d];
        if (!f) {
            if (!e) return;
            f = {}, this.permissionsById[d] = f;
        }
        e ? this.permissionsById[d][a] = !0 : (delete f[a], c.isEmpty(f) && delete f[d]);
    }, b.ACL.prototype._getAccess = function(a, c) {
        c instanceof b.User ? c = c.id : c instanceof b.Role && (c = "role:" + c.getName());
        var d = this.permissionsById[c];
        return d && d[a] ? !0 : !1;
    }, b.ACL.prototype.setReadAccess = function(a, b) {
        this._setAccess("read", a, b);
    }, b.ACL.prototype.getReadAccess = function(a) {
        return this._getAccess("read", a);
    }, b.ACL.prototype.setWriteAccess = function(a, b) {
        this._setAccess("write", a, b);
    }, b.ACL.prototype.getWriteAccess = function(a) {
        return this._getAccess("write", a);
    }, b.ACL.prototype.setPublicReadAccess = function(a) {
        this.setReadAccess(d, a);
    }, b.ACL.prototype.getPublicReadAccess = function() {
        return this.getReadAccess(d);
    }, b.ACL.prototype.setPublicWriteAccess = function(a) {
        this.setWriteAccess(d, a);
    }, b.ACL.prototype.getPublicWriteAccess = function() {
        return this.getWriteAccess(d);
    }, b.ACL.prototype.getRoleReadAccess = function(a) {
        if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.getReadAccess("role:" + a);
        throw "role must be a Parse.Role or a String";
    }, b.ACL.prototype.getRoleWriteAccess = function(a) {
        if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.getWriteAccess("role:" + a);
        throw "role must be a Parse.Role or a String";
    }, b.ACL.prototype.setRoleReadAccess = function(a, d) {
        if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return void this.setReadAccess("role:" + a, d);
        throw "role must be a Parse.Role or a String";
    }, b.ACL.prototype.setRoleWriteAccess = function(a, d) {
        if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return void this.setWriteAccess("role:" + a, d);
        throw "role must be a Parse.Role or a String";
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Op = function() {
        this._initialize.apply(this, arguments);
    }, b.Op.prototype = {
        _initialize: function() {}
    }, c.extend(b.Op, {
        _extend: b._extend,
        _opDecoderMap: {},
        _registerDecoder: function(a, c) {
            b.Op._opDecoderMap[a] = c;
        },
        _decode: function(a) {
            var c = b.Op._opDecoderMap[a.__op];
            return c ? c(a) : void 0;
        }
    }), b.Op._registerDecoder("Batch", function(a) {
        var c = null;
        return b._arrayEach(a.ops, function(a) {
            a = b.Op._decode(a), c = a._mergeWithPrevious(c);
        }), c;
    }), b.Op.Set = b.Op._extend({
        _initialize: function(a) {
            this._value = a;
        },
        value: function() {
            return this._value;
        },
        toJSON: function() {
            return b._encode(this.value());
        },
        _mergeWithPrevious: function(a) {
            return this;
        },
        _estimate: function(a) {
            return this.value();
        }
    }), b.Op._UNSET = {}, b.Op.Unset = b.Op._extend({
        toJSON: function() {
            return {
                __op: "Delete"
            };
        },
        _mergeWithPrevious: function(a) {
            return this;
        },
        _estimate: function(a) {
            return b.Op._UNSET;
        }
    }), b.Op._registerDecoder("Delete", function(a) {
        return new b.Op.Unset();
    }), b.Op.Increment = b.Op._extend({
        _initialize: function(a) {
            this._amount = a;
        },
        amount: function() {
            return this._amount;
        },
        toJSON: function() {
            return {
                __op: "Increment",
                amount: this._amount
            };
        },
        _mergeWithPrevious: function(a) {
            if (a) {
                if (a instanceof b.Op.Unset) return new b.Op.Set(this.amount());
                if (a instanceof b.Op.Set) return new b.Op.Set(a.value() + this.amount());
                if (a instanceof b.Op.Increment) return new b.Op.Increment(this.amount() + a.amount());
                throw "Op is invalid after previous op.";
            }
            return this;
        },
        _estimate: function(a) {
            return a ? a + this.amount() : this.amount();
        }
    }), b.Op._registerDecoder("Increment", function(a) {
        return new b.Op.Increment(a.amount);
    }), b.Op.Add = b.Op._extend({
        _initialize: function(a) {
            this._objects = a;
        },
        objects: function() {
            return this._objects;
        },
        toJSON: function() {
            return {
                __op: "Add",
                objects: b._encode(this.objects())
            };
        },
        _mergeWithPrevious: function(a) {
            if (a) {
                if (a instanceof b.Op.Unset) return new b.Op.Set(this.objects());
                if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                if (a instanceof b.Op.Add) return new b.Op.Add(a.objects().concat(this.objects()));
                throw "Op is invalid after previous op.";
            }
            return this;
        },
        _estimate: function(a) {
            return a ? a.concat(this.objects()) : c.clone(this.objects());
        }
    }), b.Op._registerDecoder("Add", function(a) {
        return new b.Op.Add(b._decode(void 0, a.objects));
    }), b.Op.AddUnique = b.Op._extend({
        _initialize: function(a) {
            this._objects = c.uniq(a);
        },
        objects: function() {
            return this._objects;
        },
        toJSON: function() {
            return {
                __op: "AddUnique",
                objects: b._encode(this.objects())
            };
        },
        _mergeWithPrevious: function(a) {
            if (a) {
                if (a instanceof b.Op.Unset) return new b.Op.Set(this.objects());
                if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                if (a instanceof b.Op.AddUnique) return new b.Op.AddUnique(this._estimate(a.objects()));
                throw "Op is invalid after previous op.";
            }
            return this;
        },
        _estimate: function(a) {
            if (a) {
                var d = c.clone(a);
                return b._arrayEach(this.objects(), function(a) {
                    if (a instanceof b.Object && a.id) {
                        var e = c.find(d, function(c) {
                            return c instanceof b.Object && c.id === a.id;
                        });
                        if (e) {
                            var f = c.indexOf(d, e);
                            d[f] = a;
                        } else d.push(a);
                    } else c.contains(d, a) || d.push(a);
                }), d;
            }
            return c.clone(this.objects());
        }
    }), b.Op._registerDecoder("AddUnique", function(a) {
        return new b.Op.AddUnique(b._decode(void 0, a.objects));
    }), b.Op.Remove = b.Op._extend({
        _initialize: function(a) {
            this._objects = c.uniq(a);
        },
        objects: function() {
            return this._objects;
        },
        toJSON: function() {
            return {
                __op: "Remove",
                objects: b._encode(this.objects())
            };
        },
        _mergeWithPrevious: function(a) {
            if (a) {
                if (a instanceof b.Op.Unset) return a;
                if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                if (a instanceof b.Op.Remove) return new b.Op.Remove(c.union(a.objects(), this.objects()));
                throw "Op is invalid after previous op.";
            }
            return this;
        },
        _estimate: function(a) {
            if (a) {
                var d = c.difference(a, this.objects());
                return b._arrayEach(this.objects(), function(a) {
                    a instanceof b.Object && a.id && (d = c.reject(d, function(c) {
                        return c instanceof b.Object && c.id === a.id;
                    }));
                }), d;
            }
            return [];
        }
    }), b.Op._registerDecoder("Remove", function(a) {
        return new b.Op.Remove(b._decode(void 0, a.objects));
    }), b.Op.Relation = b.Op._extend({
        _initialize: function(a, d) {
            this._targetClassName = null;
            var e = this, f = function(a) {
                if (a instanceof b.Object) {
                    if (!a.id) throw "You can't add an unsaved Parse.Object to a relation.";
                    if (e._targetClassName || (e._targetClassName = a.className), e._targetClassName !== a.className) throw "Tried to create a Parse.Relation with 2 different types: " + e._targetClassName + " and " + a.className + ".";
                    return a.id;
                }
                return a;
            };
            this.relationsToAdd = c.uniq(c.map(a, f)), this.relationsToRemove = c.uniq(c.map(d, f));
        },
        added: function() {
            var a = this;
            return c.map(this.relationsToAdd, function(c) {
                var d = b.Object._create(a._targetClassName);
                return d.id = c, d;
            });
        },
        removed: function() {
            var a = this;
            return c.map(this.relationsToRemove, function(c) {
                var d = b.Object._create(a._targetClassName);
                return d.id = c, d;
            });
        },
        toJSON: function() {
            var a = null, b = null, d = this, e = function(a) {
                return {
                    __type: "Pointer",
                    className: d._targetClassName,
                    objectId: a
                };
            }, f = null;
            return this.relationsToAdd.length > 0 && (f = c.map(this.relationsToAdd, e), a = {
                __op: "AddRelation",
                objects: f
            }), this.relationsToRemove.length > 0 && (f = c.map(this.relationsToRemove, e), 
            b = {
                __op: "RemoveRelation",
                objects: f
            }), a && b ? {
                __op: "Batch",
                ops: [ a, b ]
            } : a || b || {};
        },
        _mergeWithPrevious: function(a) {
            if (a) {
                if (a instanceof b.Op.Unset) throw "You can't modify a relation after deleting it.";
                if (a instanceof b.Op.Relation) {
                    if (a._targetClassName && a._targetClassName !== this._targetClassName) throw "Related object must be of class " + a._targetClassName + ", but " + this._targetClassName + " was passed in.";
                    var d = c.union(c.difference(a.relationsToAdd, this.relationsToRemove), this.relationsToAdd), e = c.union(c.difference(a.relationsToRemove, this.relationsToAdd), this.relationsToRemove), f = new b.Op.Relation(d, e);
                    return f._targetClassName = this._targetClassName, f;
                }
                throw "Op is invalid after previous op.";
            }
            return this;
        },
        _estimate: function(a, c, d) {
            if (a) {
                if (a instanceof b.Relation) {
                    if (this._targetClassName) if (a.targetClassName) {
                        if (a.targetClassName !== this._targetClassName) throw "Related object must be a " + a.targetClassName + ", but a " + this._targetClassName + " was passed in.";
                    } else a.targetClassName = this._targetClassName;
                    return a;
                }
                throw "Op is invalid after previous op.";
            }
            var e = new b.Relation(c, d);
            e.targetClassName = this._targetClassName;
        }
    }), b.Op._registerDecoder("AddRelation", function(a) {
        return new b.Op.Relation(b._decode(void 0, a.objects), []);
    }), b.Op._registerDecoder("RemoveRelation", function(a) {
        return new b.Op.Relation([], b._decode(void 0, a.objects));
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Relation = function(a, b) {
        this.parent = a, this.key = b, this.targetClassName = null;
    }, b.Relation.prototype = {
        _ensureParentAndKey: function(a, b) {
            if (this.parent = this.parent || a, this.key = this.key || b, this.parent !== a) throw "Internal Error. Relation retrieved from two different Objects.";
            if (this.key !== b) throw "Internal Error. Relation retrieved from two different keys.";
        },
        add: function(a) {
            c.isArray(a) || (a = [ a ]);
            var d = new b.Op.Relation(a, []);
            this.parent.set(this.key, d), this.targetClassName = d._targetClassName;
        },
        remove: function(a) {
            c.isArray(a) || (a = [ a ]);
            var d = new b.Op.Relation([], a);
            this.parent.set(this.key, d), this.targetClassName = d._targetClassName;
        },
        toJSON: function() {
            return {
                __type: "Relation",
                className: this.targetClassName
            };
        },
        query: function() {
            var a, c;
            return this.targetClassName ? (a = b.Object._getSubclass(this.targetClassName), 
            c = new b.Query(a)) : (a = b.Object._getSubclass(this.parent.className), c = new b.Query(a), 
            c._extraOptions.redirectClassNameForKey = this.key), c._addCondition("$relatedTo", "object", this.parent._toPointer()), 
            c._addCondition("$relatedTo", "key", this.key), c;
        }
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Promise = function() {
        this._resolved = !1, this._rejected = !1, this._resolvedCallbacks = [], this._rejectedCallbacks = [];
    }, c.extend(b.Promise, {
        _isPromisesAPlusCompliant: !1,
        is: function(a) {
            return a && a.then && c.isFunction(a.then);
        },
        as: function() {
            var a = new b.Promise();
            return a.resolve.apply(a, arguments), a;
        },
        error: function() {
            var a = new b.Promise();
            return a.reject.apply(a, arguments), a;
        },
        when: function(a) {
            var c;
            c = a && b._isNullOrUndefined(a.length) ? arguments : a;
            var d = c.length, e = !1, f = [], g = [];
            if (f.length = c.length, g.length = c.length, 0 === d) return b.Promise.as.apply(this, f);
            var h = new b.Promise(), i = function() {
                d -= 1, 0 === d && (e ? h.reject(g) : h.resolve.apply(h, f));
            };
            return b._arrayEach(c, function(a, c) {
                b.Promise.is(a) ? a.then(function(a) {
                    f[c] = a, i();
                }, function(a) {
                    g[c] = a, e = !0, i();
                }) : (f[c] = a, i());
            }), h;
        },
        _continueWhile: function(a, c) {
            return a() ? c().then(function() {
                return b.Promise._continueWhile(a, c);
            }) : b.Promise.as();
        }
    }), c.extend(b.Promise.prototype, {
        resolve: function(a) {
            if (this._resolved || this._rejected) throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._resolved = !0, this._result = arguments;
            var c = arguments;
            b._arrayEach(this._resolvedCallbacks, function(a) {
                a.apply(this, c);
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = [];
        },
        reject: function(a) {
            if (this._resolved || this._rejected) throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._rejected = !0, this._error = a, b._arrayEach(this._rejectedCallbacks, function(b) {
                b(a);
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = [];
        },
        then: function(a, c) {
            var d = new b.Promise(), e = function() {
                var c = arguments;
                if (a) if (b.Promise._isPromisesAPlusCompliant) try {
                    c = [ a.apply(this, c) ];
                } catch (e) {
                    c = [ b.Promise.error(e) ];
                } else c = [ a.apply(this, c) ];
                1 === c.length && b.Promise.is(c[0]) ? c[0].then(function() {
                    d.resolve.apply(d, arguments);
                }, function(a) {
                    d.reject(a);
                }) : d.resolve.apply(d, c);
            }, f = function(a) {
                var e = [];
                if (c) {
                    if (b.Promise._isPromisesAPlusCompliant) try {
                        e = [ c(a) ];
                    } catch (f) {
                        e = [ b.Promise.error(f) ];
                    } else e = [ c(a) ];
                    1 === e.length && b.Promise.is(e[0]) ? e[0].then(function() {
                        d.resolve.apply(d, arguments);
                    }, function(a) {
                        d.reject(a);
                    }) : b.Promise._isPromisesAPlusCompliant ? d.resolve.apply(d, e) : d.reject(e[0]);
                } else d.reject(a);
            }, g = function(a) {
                a.call();
            };
            b.Promise._isPromisesAPlusCompliant && ("undefined" != typeof window && window.setTimeout ? g = function(a) {
                window.setTimeout(a, 0);
            } : "undefined" != typeof process && process.nextTick && (g = function(a) {
                process.nextTick(a);
            }));
            var h = this;
            return this._resolved ? g(function() {
                e.apply(h, h._result);
            }) : this._rejected ? g(function() {
                f(h._error);
            }) : (this._resolvedCallbacks.push(e), this._rejectedCallbacks.push(f)), d;
        },
        always: function(a) {
            return this.then(a, a);
        },
        done: function(a) {
            return this.then(a);
        },
        fail: function(a) {
            return this.then(null, a);
        },
        _thenRunCallbacks: function(a, d) {
            var e;
            if (c.isFunction(a)) {
                var f = a;
                e = {
                    success: function(a) {
                        f(a, null);
                    },
                    error: function(a) {
                        f(null, a);
                    }
                };
            } else e = c.clone(a);
            return e = e || {}, this.then(function(a) {
                return e.success ? e.success.apply(this, arguments) : d && d.trigger("sync", d, a, e), 
                b.Promise.as.apply(b.Promise, arguments);
            }, function(a) {
                return e.error ? c.isUndefined(d) ? e.error(a) : e.error(d, a) : d && d.trigger("error", d, a, e), 
                b.Promise.error(a);
            });
        },
        _continueWith: function(a) {
            return this.then(function() {
                return a(arguments, null);
            }, function(b) {
                return a(null, b);
            });
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._, d = function(a) {
        if (26 > a) return String.fromCharCode(65 + a);
        if (52 > a) return String.fromCharCode(97 + (a - 26));
        if (62 > a) return String.fromCharCode(48 + (a - 52));
        if (62 === a) return "+";
        if (63 === a) return "/";
        throw "Tried to encode large digit " + a + " in base64.";
    }, e = function(a) {
        var b = [];
        return b.length = Math.ceil(a.length / 3), c.times(b.length, function(c) {
            var e = a[3 * c], f = a[3 * c + 1] || 0, g = a[3 * c + 2] || 0, h = 3 * c + 1 < a.length, i = 3 * c + 2 < a.length;
            b[c] = [ d(e >> 2 & 63), d(e << 4 & 48 | f >> 4 & 15), h ? d(f << 2 & 60 | g >> 6 & 3) : "=", i ? d(63 & g) : "=" ].join("");
        }), b.join("");
    }, f = {
        ai: "application/postscript",
        aif: "audio/x-aiff",
        aifc: "audio/x-aiff",
        aiff: "audio/x-aiff",
        asc: "text/plain",
        atom: "application/atom+xml",
        au: "audio/basic",
        avi: "video/x-msvideo",
        bcpio: "application/x-bcpio",
        bin: "application/octet-stream",
        bmp: "image/bmp",
        cdf: "application/x-netcdf",
        cgm: "image/cgm",
        "class": "application/octet-stream",
        cpio: "application/x-cpio",
        cpt: "application/mac-compactpro",
        csh: "application/x-csh",
        css: "text/css",
        dcr: "application/x-director",
        dif: "video/x-dv",
        dir: "application/x-director",
        djv: "image/vnd.djvu",
        djvu: "image/vnd.djvu",
        dll: "application/octet-stream",
        dmg: "application/octet-stream",
        dms: "application/octet-stream",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        docm: "application/vnd.ms-word.document.macroEnabled.12",
        dotm: "application/vnd.ms-word.template.macroEnabled.12",
        dtd: "application/xml-dtd",
        dv: "video/x-dv",
        dvi: "application/x-dvi",
        dxr: "application/x-director",
        eps: "application/postscript",
        etx: "text/x-setext",
        exe: "application/octet-stream",
        ez: "application/andrew-inset",
        gif: "image/gif",
        gram: "application/srgs",
        grxml: "application/srgs+xml",
        gtar: "application/x-gtar",
        hdf: "application/x-hdf",
        hqx: "application/mac-binhex40",
        htm: "text/html",
        html: "text/html",
        ice: "x-conference/x-cooltalk",
        ico: "image/x-icon",
        ics: "text/calendar",
        ief: "image/ief",
        ifb: "text/calendar",
        iges: "model/iges",
        igs: "model/iges",
        jnlp: "application/x-java-jnlp-file",
        jp2: "image/jp2",
        jpe: "image/jpeg",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        js: "application/x-javascript",
        kar: "audio/midi",
        latex: "application/x-latex",
        lha: "application/octet-stream",
        lzh: "application/octet-stream",
        m3u: "audio/x-mpegurl",
        m4a: "audio/mp4a-latm",
        m4b: "audio/mp4a-latm",
        m4p: "audio/mp4a-latm",
        m4u: "video/vnd.mpegurl",
        m4v: "video/x-m4v",
        mac: "image/x-macpaint",
        man: "application/x-troff-man",
        mathml: "application/mathml+xml",
        me: "application/x-troff-me",
        mesh: "model/mesh",
        mid: "audio/midi",
        midi: "audio/midi",
        mif: "application/vnd.mif",
        mov: "video/quicktime",
        movie: "video/x-sgi-movie",
        mp2: "audio/mpeg",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        mpe: "video/mpeg",
        mpeg: "video/mpeg",
        mpg: "video/mpeg",
        mpga: "audio/mpeg",
        ms: "application/x-troff-ms",
        msh: "model/mesh",
        mxu: "video/vnd.mpegurl",
        nc: "application/x-netcdf",
        oda: "application/oda",
        ogg: "application/ogg",
        pbm: "image/x-portable-bitmap",
        pct: "image/pict",
        pdb: "chemical/x-pdb",
        pdf: "application/pdf",
        pgm: "image/x-portable-graymap",
        pgn: "application/x-chess-pgn",
        pic: "image/pict",
        pict: "image/pict",
        png: "image/png",
        pnm: "image/x-portable-anymap",
        pnt: "image/x-macpaint",
        pntg: "image/x-macpaint",
        ppm: "image/x-portable-pixmap",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
        ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
        pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
        potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
        ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
        ps: "application/postscript",
        qt: "video/quicktime",
        qti: "image/x-quicktime",
        qtif: "image/x-quicktime",
        ra: "audio/x-pn-realaudio",
        ram: "audio/x-pn-realaudio",
        ras: "image/x-cmu-raster",
        rdf: "application/rdf+xml",
        rgb: "image/x-rgb",
        rm: "application/vnd.rn-realmedia",
        roff: "application/x-troff",
        rtf: "text/rtf",
        rtx: "text/richtext",
        sgm: "text/sgml",
        sgml: "text/sgml",
        sh: "application/x-sh",
        shar: "application/x-shar",
        silo: "model/mesh",
        sit: "application/x-stuffit",
        skd: "application/x-koan",
        skm: "application/x-koan",
        skp: "application/x-koan",
        skt: "application/x-koan",
        smi: "application/smil",
        smil: "application/smil",
        snd: "audio/basic",
        so: "application/octet-stream",
        spl: "application/x-futuresplash",
        src: "application/x-wais-source",
        sv4cpio: "application/x-sv4cpio",
        sv4crc: "application/x-sv4crc",
        svg: "image/svg+xml",
        swf: "application/x-shockwave-flash",
        t: "application/x-troff",
        tar: "application/x-tar",
        tcl: "application/x-tcl",
        tex: "application/x-tex",
        texi: "application/x-texinfo",
        texinfo: "application/x-texinfo",
        tif: "image/tiff",
        tiff: "image/tiff",
        tr: "application/x-troff",
        tsv: "text/tab-separated-values",
        txt: "text/plain",
        ustar: "application/x-ustar",
        vcd: "application/x-cdlink",
        vrml: "model/vrml",
        vxml: "application/voicexml+xml",
        wav: "audio/x-wav",
        wbmp: "image/vnd.wap.wbmp",
        wbmxl: "application/vnd.wap.wbxml",
        wml: "text/vnd.wap.wml",
        wmlc: "application/vnd.wap.wmlc",
        wmls: "text/vnd.wap.wmlscript",
        wmlsc: "application/vnd.wap.wmlscriptc",
        wrl: "model/vrml",
        xbm: "image/x-xbitmap",
        xht: "application/xhtml+xml",
        xhtml: "application/xhtml+xml",
        xls: "application/vnd.ms-excel",
        xml: "application/xml",
        xpm: "image/x-xpixmap",
        xsl: "application/xml",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
        xltm: "application/vnd.ms-excel.template.macroEnabled.12",
        xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
        xslt: "application/xslt+xml",
        xul: "application/vnd.mozilla.xul+xml",
        xwd: "image/x-xwindowdump",
        xyz: "chemical/x-xyz",
        zip: "application/zip"
    }, g = function(a, c) {
        var d = new b.Promise();
        if ("undefined" == typeof FileReader) return b.Promise.error(new b.Error(b.Error.FILE_READ_ERROR, "Attempted to use a FileReader on an unsupported browser."));
        var e = new FileReader();
        return e.onloadend = function() {
            if (2 !== e.readyState) return void d.reject(new b.Error(b.Error.FILE_READ_ERROR, "Error reading file."));
            var a = e.result, f = /^data:([^;]*);base64,(.*)$/.exec(a);
            return f ? void d.resolve(f[2], c || f[1]) : void d.reject(new b.Error(b.Error.FILE_READ_ERROR, "Unable to interpret data URL: " + a));
        }, e.readAsDataURL(a), d;
    };
    b.File = function(a, d, h) {
        this._name = a;
        var i = /\.([^.]*)$/.exec(a);
        i && (i = i[1].toLowerCase());
        var j = h || f[i] || "text/plain";
        if (c.isArray(d)) this._source = b.Promise.as(e(d), j); else if (d && d.base64) {
            var k = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,(\S+)/, l = k.exec(d.base64);
            this._source = l && l.length > 0 ? b.Promise.as(4 === l.length ? l[3] : l[2], l[1]) : b.Promise.as(d.base64, j);
        } else if ("undefined" != typeof File && d instanceof File) this._source = g(d, h); else if (c.isString(d)) throw "Creating a Parse.File from a String is not yet supported.";
    }, b.File.prototype = {
        name: function() {
            return this._name;
        },
        url: function() {
            return this._url;
        },
        save: function(a) {
            a = a || {};
            var c = this;
            return c._previousSave || (c._previousSave = c._source.then(function(d, e) {
                var f = {
                    base64: d,
                    _ContentType: e
                };
                return b._request({
                    route: "files",
                    className: c._name,
                    method: "POST",
                    data: f,
                    useMasterKey: a.useMasterKey
                });
            }).then(function(a) {
                return c._name = a.name, c._url = a.url, c;
            })), c._previousSave._thenRunCallbacks(a);
        }
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Object = function(a, d) {
        if (c.isString(a)) return b.Object._create.apply(this, arguments);
        a = a || {}, d && d.parse && (a = this.parse(a));
        var e = b._getValue(this, "defaults");
        if (e && (a = c.extend({}, e, a)), d && d.collection && (this.collection = d.collection), 
        this._serverData = {}, this._opSetQueue = [ {} ], this.attributes = {}, this._hashedJSON = {}, 
        this._escapedAttributes = {}, this.cid = c.uniqueId("c"), this.changed = {}, this._silent = {}, 
        this._pending = {}, !this.set(a, {
            silent: !0
        })) throw new Error("Can't create an invalid Parse.Object");
        this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = c.clone(this.attributes), 
        this.initialize.apply(this, arguments);
    }, b.Object.saveAll = function(a, c) {
        return c = c || {}, b.Object._deepSaveAsync(a, {
            useMasterKey: c.useMasterKey
        })._thenRunCallbacks(c);
    }, b.Object.destroyAll = function(a, d) {
        d = d || {};
        var e = function(a) {
            a.trigger("destroy", a, a.collection, d);
        }, f = [], g = function(a) {
            var g = b.Promise.as();
            return a.length > 0 && (g = g.then(function() {
                return b._request({
                    route: "batch",
                    method: "POST",
                    useMasterKey: d.useMasterKey,
                    data: {
                        requests: c.map(a, function(a) {
                            return {
                                method: "DELETE",
                                path: "/1/classes/" + a.className + "/" + a.id
                            };
                        })
                    }
                });
            }).then(function(c, g, h) {
                b._arrayEach(a, function(a, g) {
                    if (c[g].success && d.wait) e(a); else if (c[g].error) {
                        var h = new b.Error(c[g].error.code, c[g].error.error);
                        h.object = a, f.push(h);
                    }
                });
            })), g;
        }, h = b.Promise.as(), i = [];
        return b._arrayEach(a, function(b, c) {
            if (b.id && d.wait || e(b), b.id && i.push(b), 20 === i.length || c + 1 === a.length) {
                var f = i;
                i = [], h = h.then(function() {
                    return g(f);
                });
            }
        }), h.then(function() {
            if (0 === f.length) return !0;
            var a = new b.Error(b.Error.AGGREGATE_ERROR, "Error deleting an object in destroyAll");
            return a.errors = f, b.Promise.error(a);
        })._thenRunCallbacks(d);
    }, b.Object.fetchAll = function(a, c) {
        return b.Object._fetchAll(a, !0)._thenRunCallbacks(c);
    }, b.Object.fetchAllIfNeeded = function(a, c) {
        return b.Object._fetchAll(a, !1)._thenRunCallbacks(c);
    }, c.extend(b.Object.prototype, b.Events, {
        _existed: !1,
        initialize: function() {},
        toJSON: function() {
            var a = this._toFullJSON();
            return b._arrayEach([ "__type", "className" ], function(b) {
                delete a[b];
            }), a;
        },
        _toFullJSON: function(a) {
            var d = c.clone(this.attributes);
            return b._objectEach(d, function(c, e) {
                d[e] = b._encode(c, a);
            }), b._objectEach(this._operations, function(a, b) {
                d[b] = a;
            }), c.has(this, "id") && (d.objectId = this.id), c.has(this, "createdAt") && (d.createdAt = c.isDate(this.createdAt) ? this.createdAt.toJSON() : this.createdAt), 
            c.has(this, "updatedAt") && (d.updatedAt = c.isDate(this.updatedAt) ? this.updatedAt.toJSON() : this.updatedAt), 
            d.__type = "Object", d.className = this.className, d;
        },
        _refreshCache: function() {
            var a = this;
            a._refreshingCache || (a._refreshingCache = !0, b._objectEach(this.attributes, function(d, e) {
                if (d instanceof b.Object) d._refreshCache(); else if (c.isObject(d)) {
                    var f = !1;
                    c.isArray(d) && c.each(d, function(a) {
                        a instanceof b.Object && (f = !0, a._refreshCache());
                    }), !f && a._resetCacheForKey(e) && a.set(e, new b.Op.Set(d), {
                        silent: !0
                    });
                }
            }), delete a._refreshingCache);
        },
        dirty: function(a) {
            this._refreshCache();
            var b = c.last(this._opSetQueue);
            return a ? b[a] ? !0 : !1 : this.id ? c.keys(b).length > 0 ? !0 : !1 : !0;
        },
        dirtyKeys: function() {
            return c.keys(c.last(this._opSetQueue));
        },
        _toPointer: function() {
            if (!this.id) throw new Error("Can't serialize an unsaved Parse.Object");
            return {
                __type: "Pointer",
                className: this.className,
                objectId: this.id
            };
        },
        get: function(a) {
            return this.attributes[a];
        },
        relation: function(a) {
            var c = this.get(a);
            if (c) {
                if (!(c instanceof b.Relation)) throw "Called relation() on non-relation field " + a;
                return c._ensureParentAndKey(this, a), c;
            }
            return new b.Relation(this, a);
        },
        escape: function(a) {
            var d = this._escapedAttributes[a];
            if (d) return d;
            var e, f = this.attributes[a];
            return e = b._isNullOrUndefined(f) ? "" : c.escape(f.toString()), this._escapedAttributes[a] = e, 
            e;
        },
        has: function(a) {
            return !b._isNullOrUndefined(this.attributes[a]);
        },
        _mergeMagicFields: function(a) {
            var d = this, e = [ "id", "objectId", "createdAt", "updatedAt" ];
            b._arrayEach(e, function(e) {
                a[e] && ("objectId" === e ? d.id = a[e] : d[e] = "createdAt" !== e && "updatedAt" !== e || c.isDate(a[e]) ? a[e] : b._parseDate(a[e]), 
                delete a[e]);
            });
        },
        _copyServerData: function(a) {
            var c = {};
            b._objectEach(a, function(a, d) {
                c[d] = b._decode(d, a);
            }), this._serverData = c, this._rebuildAllEstimatedData(), this._refreshCache(), 
            this._opSetQueue = [ {} ], this._rebuildAllEstimatedData();
        },
        _mergeFromObject: function(a) {
            a && (this.id = a.id, this.createdAt = a.createdAt, this.updatedAt = a.updatedAt, 
            this._copyServerData(a._serverData), this._hasData = !0);
        },
        _startSave: function() {
            this._opSetQueue.push({});
        },
        _cancelSave: function() {
            var a = c.first(this._opSetQueue);
            this._opSetQueue = c.rest(this._opSetQueue);
            var d = c.first(this._opSetQueue);
            b._objectEach(a, function(b, c) {
                var e = a[c], f = d[c];
                e && f ? d[c] = f._mergeWithPrevious(e) : e && (d[c] = e);
            }), this._saving = this._saving - 1;
        },
        _finishSave: function(a) {
            var d = {};
            b._traverse(this.attributes, function(a) {
                a instanceof b.Object && a.id && a._hasData && (d[a.id] = a);
            });
            var e = c.first(this._opSetQueue);
            this._opSetQueue = c.rest(this._opSetQueue), this._applyOpSet(e, this._serverData), 
            this._mergeMagicFields(a);
            var f = this;
            b._objectEach(a, function(a, c) {
                f._serverData[c] = b._decode(c, a);
                var e = b._traverse(f._serverData[c], function(a) {
                    return a instanceof b.Object && d[a.id] ? d[a.id] : void 0;
                });
                e && (f._serverData[c] = e);
            }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1;
        },
        _finishFetch: function(a, b) {
            this._opSetQueue = [ {} ], this._mergeMagicFields(a), this._copyServerData(a), this._hasData = b;
        },
        _applyOpSet: function(a, c) {
            var d = this;
            b._objectEach(a, function(a, e) {
                c[e] = a._estimate(c[e], d, e), c[e] === b.Op._UNSET && delete c[e];
            });
        },
        _resetCacheForKey: function(a) {
            var d = this.attributes[a];
            if (!(!c.isObject(d) || d instanceof b.Object || d instanceof b.File)) {
                d = d.toJSON ? d.toJSON() : d;
                var e = JSON.stringify(d);
                if (this._hashedJSON[a] !== e) {
                    var f = !!this._hashedJSON[a];
                    return this._hashedJSON[a] = e, f;
                }
            }
            return !1;
        },
        _rebuildEstimatedDataForKey: function(a) {
            var c = this;
            delete this.attributes[a], this._serverData[a] && (this.attributes[a] = this._serverData[a]), 
            b._arrayEach(this._opSetQueue, function(d) {
                var e = d[a];
                e && (c.attributes[a] = e._estimate(c.attributes[a], c, a), c.attributes[a] === b.Op._UNSET ? delete c.attributes[a] : c._resetCacheForKey(a));
            });
        },
        _rebuildAllEstimatedData: function() {
            var a = this, d = c.clone(this.attributes);
            this.attributes = c.clone(this._serverData), b._arrayEach(this._opSetQueue, function(c) {
                a._applyOpSet(c, a.attributes), b._objectEach(c, function(b, c) {
                    a._resetCacheForKey(c);
                });
            }), b._objectEach(d, function(b, c) {
                a.attributes[c] !== b && a.trigger("change:" + c, a, a.attributes[c], {});
            }), b._objectEach(this.attributes, function(b, e) {
                c.has(d, e) || a.trigger("change:" + e, a, b, {});
            });
        },
        set: function(a, d, e) {
            var f;
            if (c.isObject(a) || b._isNullOrUndefined(a) ? (f = a, b._objectEach(f, function(a, c) {
                f[c] = b._decode(c, a);
            }), e = d) : (f = {}, f[a] = b._decode(a, d)), e = e || {}, !f) return this;
            f instanceof b.Object && (f = f.attributes);
            var g = this;
            b._objectEach(f, function(a, b) {
                if (g.constructor.readOnlyAttributes && g.constructor.readOnlyAttributes[b]) throw new Error("Cannot modify readonly key: " + b);
            }), e.unset && b._objectEach(f, function(a, c) {
                f[c] = new b.Op.Unset();
            });
            var h = c.clone(f);
            if (b._objectEach(h, function(a, c) {
                a instanceof b.Op && (h[c] = a._estimate(g.attributes[c], g, c), h[c] === b.Op._UNSET && delete h[c]);
            }), !this._validate(f, e)) return !1;
            this._mergeMagicFields(f), e.changes = {};
            {
                var i = this._escapedAttributes;
                this._previousAttributes || {};
            }
            return b._arrayEach(c.keys(f), function(a) {
                var d = f[a];
                d instanceof b.Relation && (d.parent = g), d instanceof b.Op || (d = new b.Op.Set(d));
                var h = !0;
                d instanceof b.Op.Set && c.isEqual(g.attributes[a], d.value) && (h = !1), h && (delete i[a], 
                e.silent ? g._silent[a] = !0 : e.changes[a] = !0);
                var j = c.last(g._opSetQueue);
                j[a] = d._mergeWithPrevious(j[a]), g._rebuildEstimatedDataForKey(a), h ? (g.changed[a] = g.attributes[a], 
                e.silent || (g._pending[a] = !0)) : (delete g.changed[a], delete g._pending[a]);
            }), e.silent || this.change(e), this;
        },
        unset: function(a, b) {
            return b = b || {}, b.unset = !0, this.set(a, null, b);
        },
        increment: function(a, d) {
            return (c.isUndefined(d) || c.isNull(d)) && (d = 1), this.set(a, new b.Op.Increment(d));
        },
        add: function(a, c) {
            return this.set(a, new b.Op.Add([ c ]));
        },
        addUnique: function(a, c) {
            return this.set(a, new b.Op.AddUnique([ c ]));
        },
        remove: function(a, c) {
            return this.set(a, new b.Op.Remove([ c ]));
        },
        op: function(a) {
            return c.last(this._opSetQueue)[a];
        },
        clear: function(a) {
            a = a || {}, a.unset = !0;
            var b = c.extend(this.attributes, this._operations);
            return this.set(b, a);
        },
        _getSaveJSON: function() {
            var a = c.clone(c.first(this._opSetQueue));
            return b._objectEach(a, function(b, c) {
                a[c] = b.toJSON();
            }), a;
        },
        _canBeSerialized: function() {
            return b.Object._canBeSerializedAsValue(this.attributes);
        },
        fetch: function(a) {
            var c = this;
            a = a || {};
            var d = b._request({
                method: "GET",
                route: "classes",
                className: this.className,
                objectId: this.id,
                useMasterKey: a.useMasterKey
            });
            return d.then(function(a, b, d) {
                return c._finishFetch(c.parse(a, b, d), !0), c;
            })._thenRunCallbacks(a, this);
        },
        save: function(a, d, e) {
            var f, g, h;
            if (c.isObject(a) || b._isNullOrUndefined(a) ? (f = a, h = d) : (f = {}, f[a] = d, 
            h = e), !h && f) {
                var i = c.reject(f, function(a, b) {
                    return c.include([ "success", "error", "wait" ], b);
                });
                if (0 === i.length) {
                    var j = !0;
                    if (c.has(f, "success") && !c.isFunction(f.success) && (j = !1), c.has(f, "error") && !c.isFunction(f.error) && (j = !1), 
                    j) return this.save(null, f);
                }
            }
            h = c.clone(h) || {}, h.wait && (g = c.clone(this.attributes));
            var k = c.clone(h) || {};
            k.wait && (k.silent = !0);
            var l;
            if (k.error = function(a, b) {
                l = b;
            }, f && !this.set(f, k)) return b.Promise.error(l)._thenRunCallbacks(h, this);
            var m = this;
            m._refreshCache();
            var n = [], o = [];
            return b.Object._findUnsavedChildren(m.attributes, n, o), n.length + o.length > 0 ? b.Object._deepSaveAsync(this.attributes, {
                useMasterKey: h.useMasterKey
            }).then(function() {
                return m.save(null, h);
            }, function(a) {
                return b.Promise.error(a)._thenRunCallbacks(h, m);
            }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || b.Promise.as(), 
            this._allPreviousSaves = this._allPreviousSaves._continueWith(function() {
                var a = m.id ? "PUT" : "POST", d = m._getSaveJSON(), e = "classes", i = m.className;
                "_User" !== m.className || m.id || (e = "users", i = null);
                var j = b._request({
                    route: e,
                    className: i,
                    objectId: m.id,
                    method: a,
                    useMasterKey: h.useMasterKey,
                    data: d
                });
                return j = j.then(function(a, b, d) {
                    var e = m.parse(a, b, d);
                    return h.wait && (e = c.extend(f || {}, e)), m._finishSave(e), h.wait && m.set(g, k), 
                    m;
                }, function(a) {
                    return m._cancelSave(), b.Promise.error(a);
                })._thenRunCallbacks(h, m);
            }), this._allPreviousSaves);
        },
        destroy: function(a) {
            a = a || {};
            var c = this, d = function() {
                c.trigger("destroy", c, c.collection, a);
            };
            if (!this.id) return d();
            a.wait || d();
            var e = b._request({
                route: "classes",
                className: this.className,
                objectId: this.id,
                method: "DELETE",
                useMasterKey: a.useMasterKey
            });
            return e.then(function() {
                return a.wait && d(), c;
            })._thenRunCallbacks(a, this);
        },
        parse: function(a, d, e) {
            var f = c.clone(a);
            return c([ "createdAt", "updatedAt" ]).each(function(a) {
                f[a] && (f[a] = b._parseDate(f[a]));
            }), f.updatedAt || (f.updatedAt = f.createdAt), d && (this._existed = 201 !== d), 
            f;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return !this.id;
        },
        change: function(a) {
            a = a || {};
            var d = this._changing;
            this._changing = !0;
            var e = this;
            b._objectEach(this._silent, function(a) {
                e._pending[a] = !0;
            });
            var f = c.extend({}, a.changes, this._silent);
            if (this._silent = {}, b._objectEach(f, function(b, c) {
                e.trigger("change:" + c, e, e.get(c), a);
            }), d) return this;
            for (var g = function(a, b) {
                e._pending[b] || e._silent[b] || delete e.changed[b];
            }; !c.isEmpty(this._pending); ) this._pending = {}, this.trigger("change", this, a), 
            b._objectEach(this.changed, g), e._previousAttributes = c.clone(this.attributes);
            return this._changing = !1, this;
        },
        existed: function() {
            return this._existed;
        },
        hasChanged: function(a) {
            return arguments.length ? this.changed && c.has(this.changed, a) : !c.isEmpty(this.changed);
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? c.clone(this.changed) : !1;
            var d = {}, e = this._previousAttributes;
            return b._objectEach(a, function(a, b) {
                c.isEqual(e[b], a) || (d[b] = a);
            }), d;
        },
        previous: function(a) {
            return arguments.length && this._previousAttributes ? this._previousAttributes[a] : null;
        },
        previousAttributes: function() {
            return c.clone(this._previousAttributes);
        },
        isValid: function() {
            return !this.validate(this.attributes);
        },
        validate: function(a, d) {
            if (c.has(a, "ACL") && !(a.ACL instanceof b.ACL)) return new b.Error(b.Error.OTHER_CAUSE, "ACL must be a Parse.ACL.");
            var e = !0;
            return b._objectEach(a, function(a, b) {
                /^[A-Za-z][0-9A-Za-z_]*$/.test(b) || (e = !1);
            }), e ? !1 : new b.Error(b.Error.INVALID_KEY_NAME);
        },
        _validate: function(a, b) {
            if (b.silent || !this.validate) return !0;
            a = c.extend({}, this.attributes, a);
            var d = this.validate(a, b);
            return d ? (b && b.error ? b.error(this, d, b) : this.trigger("error", this, d, b), 
            !1) : !0;
        },
        getACL: function() {
            return this.get("ACL");
        },
        setACL: function(a, b) {
            return this.set("ACL", a, b);
        }
    }), b.Object._getSubclass = function(a) {
        if (!c.isString(a)) throw "Parse.Object._getSubclass requires a string argument.";
        var d = b.Object._classMap[a];
        return d || (d = b.Object.extend(a), b.Object._classMap[a] = d), d;
    }, b.Object._create = function(a, c, d) {
        var e = b.Object._getSubclass(a);
        return new e(c, d);
    }, b.Object._toObjectIdArray = function(a, c) {
        if (0 === a.length) return b.Promise.as(a);
        for (var d, e = a[0].className, f = [], g = 0; g < a.length; g++) {
            var h = a[g];
            if (e !== h.className) return d = new b.Error(b.Error.INVALID_CLASS_NAME, "All objects should be of the same class"), 
            b.Promise.error(d);
            if (!h.id) return d = new b.Error(b.Error.MISSING_OBJECT_ID, "All objects must have an ID"), 
            b.Promise.error(d);
            c && h._hasData || f.push(h.id);
        }
        return b.Promise.as(f);
    }, b.Object._updateWithFetchedResults = function(a, c, d) {
        var e = {};
        b._arrayEach(c, function(a, b) {
            e[a.id] = a;
        });
        for (var f = 0; f < a.length; f++) {
            var g = a[f], h = e[g.id];
            if (!h && d) {
                var i = new b.Error(b.Error.OBJECT_NOT_FOUND, "All objects must exist on the server");
                return b.Promise.error(i);
            }
            g._mergeFromObject(h);
        }
        return b.Promise.as(a);
    }, b.Object._fetchAll = function(a, c) {
        if (0 === a.length) return b.Promise.as(a);
        var d = !c;
        return b.Object._toObjectIdArray(a, d).then(function(c) {
            var d = a[0].className, e = new b.Query(d);
            return e.containedIn("objectId", c), e.limit = c.length, e.find();
        }).then(function(d) {
            return b.Object._updateWithFetchedResults(a, d, c);
        });
    }, b.Object._classMap = {}, b.Object._extend = b._extend, b.Object.extend = function(a, d, e) {
        if (!c.isString(a)) {
            if (a && c.has(a, "className")) return b.Object.extend(a.className, a, d);
            throw new Error("Parse.Object.extend's first argument should be the className.");
        }
        "User" === a && b.User._performUserRewrite && (a = "_User"), d = d || {}, d.className = a;
        var f = null;
        if (c.has(b.Object._classMap, a)) {
            var g = b.Object._classMap[a];
            f = g._extend(d, e);
        } else f = this._extend(d, e);
        return f.extend = function(d) {
            if (c.isString(d) || d && c.has(d, "className")) return b.Object.extend.apply(f, arguments);
            var e = [ a ].concat(b._.toArray(arguments));
            return b.Object.extend.apply(f, e);
        }, f.createWithoutData = function(a) {
            var b = new f();
            return b.id = a, b;
        }, b.Object._classMap[a] = f, f;
    }, b.Object._findUnsavedChildren = function(a, c, d) {
        b._traverse(a, function(a) {
            return a instanceof b.Object ? (a._refreshCache(), void (a.dirty() && c.push(a))) : a instanceof b.File ? void (a.url() || d.push(a)) : void 0;
        });
    }, b.Object._canBeSerializedAsValue = function(a) {
        if (a instanceof b.Object) return !!a.id;
        if (a instanceof b.File) return !0;
        var d = !0;
        return c.isArray(a) ? b._arrayEach(a, function(a) {
            b.Object._canBeSerializedAsValue(a) || (d = !1);
        }) : c.isObject(a) && b._objectEach(a, function(a) {
            b.Object._canBeSerializedAsValue(a) || (d = !1);
        }), d;
    }, b.Object._deepSaveAsync = function(a, d) {
        var e = [], f = [];
        b.Object._findUnsavedChildren(a, e, f);
        var g = b.Promise.as();
        c.each(f, function(a) {
            g = g.then(function() {
                return a.save(d);
            });
        });
        var h = c.uniq(e), i = c.uniq(h);
        return g.then(function() {
            return b.Promise._continueWhile(function() {
                return i.length > 0;
            }, function() {
                var a = [], e = [];
                if (b._arrayEach(i, function(b) {
                    return a.length > 20 ? void e.push(b) : void (b._canBeSerialized() ? a.push(b) : e.push(b));
                }), i = e, 0 === a.length) return b.Promise.error(new b.Error(b.Error.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                var f = b.Promise.when(c.map(a, function(a) {
                    return a._allPreviousSaves || b.Promise.as();
                })), g = new b.Promise();
                return b._arrayEach(a, function(a) {
                    a._allPreviousSaves = g;
                }), f._continueWith(function() {
                    return b._request({
                        route: "batch",
                        method: "POST",
                        useMasterKey: d.useMasterKey,
                        data: {
                            requests: c.map(a, function(a) {
                                var b = a._getSaveJSON(), c = "POST", d = "/1/classes/" + a.className;
                                return a.id && (d = d + "/" + a.id, c = "PUT"), a._startSave(), {
                                    method: c,
                                    path: d,
                                    body: b
                                };
                            })
                        }
                    }).then(function(c, d, e) {
                        var f;
                        return b._arrayEach(a, function(a, b) {
                            c[b].success ? a._finishSave(a.parse(c[b].success, d, e)) : (f = f || c[b].error, 
                            a._cancelSave());
                        }), f ? b.Promise.error(new b.Error(f.code, f.error)) : void 0;
                    }).then(function(a) {
                        return g.resolve(a), a;
                    }, function(a) {
                        return g.reject(a), b.Promise.error(a);
                    });
                });
            });
        }).then(function() {
            return a;
        });
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Role = b.Object.extend("_Role", {
        constructor: function(a, d) {
            c.isString(a) && d instanceof b.ACL ? (b.Object.prototype.constructor.call(this, null, null), 
            this.setName(a), this.setACL(d)) : b.Object.prototype.constructor.call(this, a, d);
        },
        getName: function() {
            return this.get("name");
        },
        setName: function(a, b) {
            return this.set("name", a, b);
        },
        getUsers: function() {
            return this.relation("users");
        },
        getRoles: function() {
            return this.relation("roles");
        },
        validate: function(a, d) {
            if ("name" in a && a.name !== this.getName()) {
                var e = a.name;
                if (this.id && this.id !== a.objectId) return new b.Error(b.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                if (!c.isString(e)) return new b.Error(b.Error.OTHER_CAUSE, "A role's name must be a String.");
                if (!/^[0-9a-zA-Z\-_ ]+$/.test(e)) return new b.Error(b.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.");
            }
            return b.Object.prototype.validate ? b.Object.prototype.validate.call(this, a, d) : !1;
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Collection = function(a, b) {
        b = b || {}, b.comparator && (this.comparator = b.comparator), b.model && (this.model = b.model), 
        b.query && (this.query = b.query), this._reset(), this.initialize.apply(this, arguments), 
        a && this.reset(a, {
            silent: !0,
            parse: b.parse
        });
    }, c.extend(b.Collection.prototype, b.Events, {
        model: b.Object,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(a) {
                return a.toJSON();
            });
        },
        add: function(a, d) {
            var e, f, g, h, i, j, k = {}, l = {};
            for (d = d || {}, a = c.isArray(a) ? a.slice() : [ a ], e = 0, g = a.length; g > e; e++) {
                if (a[e] = this._prepareModel(a[e], d), h = a[e], !h) throw new Error("Can't add an invalid model to a collection");
                if (i = h.cid, k[i] || this._byCid[i]) throw new Error("Duplicate cid: can't add the same model to a collection twice");
                if (j = h.id, !b._isNullOrUndefined(j) && (l[j] || this._byId[j])) throw new Error("Duplicate id: can't add the same model to a collection twice");
                l[j] = h, k[i] = h;
            }
            for (e = 0; g > e; e++) (h = a[e]).on("all", this._onModelEvent, this), this._byCid[h.cid] = h, 
            h.id && (this._byId[h.id] = h);
            if (this.length += g, f = b._isNullOrUndefined(d.at) ? this.models.length : d.at, 
            this.models.splice.apply(this.models, [ f, 0 ].concat(a)), this.comparator && this.sort({
                silent: !0
            }), d.silent) return this;
            for (e = 0, g = this.models.length; g > e; e++) h = this.models[e], k[h.cid] && (d.index = e, 
            h.trigger("add", h, this, d));
            return this;
        },
        remove: function(a, b) {
            var d, e, f, g;
            for (b = b || {}, a = c.isArray(a) ? a.slice() : [ a ], d = 0, e = a.length; e > d; d++) g = this.getByCid(a[d]) || this.get(a[d]), 
            g && (delete this._byId[g.id], delete this._byCid[g.cid], f = this.indexOf(g), this.models.splice(f, 1), 
            this.length--, b.silent || (b.index = f, g.trigger("remove", g, this, b)), this._removeReference(g));
            return this;
        },
        get: function(a) {
            return a && this._byId[a.id || a];
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a];
        },
        at: function(a) {
            return this.models[a];
        },
        sort: function(a) {
            if (a = a || {}, !this.comparator) throw new Error("Cannot sort a set without a comparator");
            var b = c.bind(this.comparator, this);
            return 1 === this.comparator.length ? this.models = this.sortBy(b) : this.models.sort(b), 
            a.silent || this.trigger("reset", this, a), this;
        },
        pluck: function(a) {
            return c.map(this.models, function(b) {
                return b.get(a);
            });
        },
        reset: function(a, c) {
            var d = this;
            return a = a || [], c = c || {}, b._arrayEach(this.models, function(a) {
                d._removeReference(a);
            }), this._reset(), this.add(a, {
                silent: !0,
                parse: c.parse
            }), c.silent || this.trigger("reset", this, c), this;
        },
        fetch: function(a) {
            a = c.clone(a) || {}, void 0 === a.parse && (a.parse = !0);
            var d = this, e = this.query || new b.Query(this.model);
            return e.find({
                useMasterKey: a.useMasterKey
            }).then(function(b) {
                return a.add ? d.add(b, a) : d.reset(b, a), d;
            })._thenRunCallbacks(a, this);
        },
        create: function(a, b) {
            var d = this;
            if (b = b ? c.clone(b) : {}, a = this._prepareModel(a, b), !a) return !1;
            b.wait || d.add(a, b);
            var e = b.success;
            return b.success = function(c, f, g) {
                b.wait && d.add(c, b), e ? e(c, f) : c.trigger("sync", a, f, b);
            }, a.save(null, b), a;
        },
        parse: function(a, b) {
            return a;
        },
        chain: function() {
            return c(this.models).chain();
        },
        _reset: function(a) {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {};
        },
        _prepareModel: function(a, c) {
            if (a instanceof b.Object) a.collection || (a.collection = this); else {
                var d = a;
                c.collection = this, a = new this.model(d, c), a._validate(a.attributes, c) || (a = !1);
            }
            return a;
        },
        _removeReference: function(a) {
            this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(a, b, c, d) {
            ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), 
            b && "change:objectId" === a && (delete this._byId[b.previous("objectId")], this._byId[b.id] = b), 
            this.trigger.apply(this, arguments));
        }
    });
    var d = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy" ];
    b._arrayEach(d, function(a) {
        b.Collection.prototype[a] = function() {
            return c[a].apply(c, [ this.models ].concat(c.toArray(arguments)));
        };
    }), b.Collection.extend = b._extend;
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.View = function(a) {
        this.cid = c.uniqueId("view"), this._configure(a || {}), this._ensureElement(), 
        this.initialize.apply(this, arguments), this.delegateEvents();
    };
    var d = /^(\S+)\s*(.*)$/, e = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ];
    c.extend(b.View.prototype, b.Events, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this;
        },
        make: function(a, c, d) {
            var e = document.createElement(a);
            return c && b.$(e).attr(c), d && b.$(e).html(d), e;
        },
        setElement: function(a, c) {
            return this.$el = b.$(a), this.el = this.$el[0], c !== !1 && this.delegateEvents(), 
            this;
        },
        delegateEvents: function(a) {
            if (a = a || b._getValue(this, "events")) {
                this.undelegateEvents();
                var e = this;
                b._objectEach(a, function(b, f) {
                    if (c.isFunction(b) || (b = e[a[f]]), !b) throw new Error('Event "' + a[f] + '" does not exist');
                    var g = f.match(d), h = g[1], i = g[2];
                    b = c.bind(b, e), h += ".delegateEvents" + e.cid, "" === i ? e.$el.bind(h, b) : e.$el.delegate(i, h, b);
                });
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid);
        },
        _configure: function(a) {
            this.options && (a = c.extend({}, this.options, a));
            var b = this;
            c.each(e, function(c) {
                a[c] && (b[c] = a[c]);
            }), this.options = a;
        },
        _ensureElement: function() {
            if (this.el) this.setElement(this.el, !1); else {
                var a = b._getValue(this, "attributes") || {};
                this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.setElement(this.make(this.tagName, a), !1);
            }
        }
    }), b.View.extend = b._extend;
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.User = b.Object.extend("_User", {
        _isCurrentUser: !1,
        _mergeFromObject: function(a) {
            a.getSessionToken() && (this._sessionToken = a.getSessionToken()), b.User.__super__._mergeFromObject.call(this, a);
        },
        _mergeMagicFields: function(a) {
            a.sessionToken && (this._sessionToken = a.sessionToken, delete a.sessionToken), 
            b.User.__super__._mergeMagicFields.call(this, a);
        },
        _cleanupAuthData: function() {
            if (this.isCurrent()) {
                var a = this.get("authData");
                a && b._objectEach(this.get("authData"), function(b, c) {
                    a[c] || delete a[c];
                });
            }
        },
        _synchronizeAllAuthData: function() {
            var a = this.get("authData");
            if (a) {
                var c = this;
                b._objectEach(this.get("authData"), function(a, b) {
                    c._synchronizeAuthData(b);
                });
            }
        },
        _synchronizeAuthData: function(a) {
            if (this.isCurrent()) {
                var d;
                c.isString(a) ? (d = a, a = b.User._authProviders[d]) : d = a.getAuthType();
                var e = this.get("authData");
                if (e && a) {
                    var f = a.restoreAuthentication(e[d]);
                    f || this._unlinkFrom(a);
                }
            }
        },
        _handleSaveResult: function(a) {
            a && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), 
            delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), 
            this._refreshCache(), (a || this.isCurrent()) && b.User._saveCurrentUser(this);
        },
        _linkWith: function(a, d) {
            var e;
            if (c.isString(a) ? (e = a, a = b.User._authProviders[a]) : e = a.getAuthType(), 
            c.has(d, "authData")) {
                var f = this.get("authData") || {};
                f[e] = d.authData, this.set("authData", f);
                var g = c.clone(d) || {};
                return g.success = function(a) {
                    a._handleSaveResult(!0), d.success && d.success.apply(this, arguments);
                }, this.save({
                    authData: f
                }, g);
            }
            var h = this, i = new b.Promise();
            return a.authenticate({
                success: function(a, b) {
                    h._linkWith(a, {
                        authData: b,
                        success: d.success,
                        error: d.error
                    }).then(function() {
                        i.resolve(h);
                    });
                },
                error: function(a, b) {
                    d.error && d.error(h, b), i.reject(b);
                }
            }), i;
        },
        _unlinkFrom: function(a, d) {
            var e;
            c.isString(a) ? (e = a, a = b.User._authProviders[a]) : e = a.getAuthType();
            var f = c.clone(d), g = this;
            return f.authData = null, f.success = function(b) {
                g._synchronizeAuthData(a), d.success && d.success.apply(this, arguments);
            }, this._linkWith(a, f);
        },
        _isLinked: function(a) {
            var b;
            b = c.isString(a) ? a : a.getAuthType();
            var d = this.get("authData") || {};
            return !!d[b];
        },
        _logOutWithAll: function() {
            var a = this.get("authData");
            if (a) {
                var c = this;
                b._objectEach(this.get("authData"), function(a, b) {
                    c._logOutWith(b);
                });
            }
        },
        _logOutWith: function(a) {
            this.isCurrent() && (c.isString(a) && (a = b.User._authProviders[a]), a && a.deauthenticate && a.deauthenticate());
        },
        signUp: function(a, d) {
            var e;
            d = d || {};
            var f = a && a.username || this.get("username");
            if (!f || "" === f) return e = new b.Error(b.Error.OTHER_CAUSE, "Cannot sign up user with an empty name."), 
            d && d.error && d.error(this, e), b.Promise.error(e);
            var g = a && a.password || this.get("password");
            if (!g || "" === g) return e = new b.Error(b.Error.OTHER_CAUSE, "Cannot sign up user with an empty password."), 
            d && d.error && d.error(this, e), b.Promise.error(e);
            var h = c.clone(d);
            return h.success = function(a) {
                a._handleSaveResult(!0), d.success && d.success.apply(this, arguments);
            }, this.save(a, h);
        },
        logIn: function(a) {
            var c = this;
            a = a || {};
            var d = b._request({
                route: "login",
                method: "GET",
                useMasterKey: a.useMasterKey,
                data: this.toJSON()
            });
            return d.then(function(a, b, d) {
                var e = c.parse(a, b, d);
                return c._finishFetch(e), c._handleSaveResult(!0), c;
            })._thenRunCallbacks(a, this);
        },
        save: function(a, d, e) {
            var f, g;
            c.isObject(a) || c.isNull(a) || c.isUndefined(a) ? (f = a, g = d) : (f = {}, f[a] = d, 
            g = e), g = g || {};
            var h = c.clone(g);
            return h.success = function(a) {
                a._handleSaveResult(!1), g.success && g.success.apply(this, arguments);
            }, b.Object.prototype.save.call(this, f, h);
        },
        fetch: function(a) {
            var d = a ? c.clone(a) : {};
            return d.success = function(b) {
                b._handleSaveResult(!1), a && a.success && a.success.apply(this, arguments);
            }, b.Object.prototype.fetch.call(this, d);
        },
        isCurrent: function() {
            return this._isCurrentUser;
        },
        getUsername: function() {
            return this.get("username");
        },
        setUsername: function(a, b) {
            return this.set("username", a, b);
        },
        setPassword: function(a, b) {
            return this.set("password", a, b);
        },
        getEmail: function() {
            return this.get("email");
        },
        setEmail: function(a, b) {
            return this.set("email", a, b);
        },
        authenticated: function() {
            return !!this._sessionToken && b.User.current() && b.User.current().id === this.id;
        },
        getSessionToken: function() {
            return this._sessionToken;
        },
        _upgradeToRevocableSession: function(a) {
            if (a = a || {}, !b.User.current()) return b.Promise.as()._thenRunCallbacks(a);
            var c = b.User.current().getSessionToken();
            return b.Session._isRevocable(c) ? b.Promise.as()._thenRunCallbacks(a) : b._request({
                route: "upgradeToRevocableSession",
                method: "POST",
                useMasterKey: a.useMasterKey,
                sessionToken: c
            }).then(function(a) {
                var c = new b.Session();
                c._finishFetch(a);
                var d = b.User.current();
                d._sessionToken = c.getSessionToken(), b.User._saveCurrentUser(d);
            })._thenRunCallbacks(a);
        }
    }, {
        _currentUser: null,
        _currentUserMatchesDisk: !1,
        _CURRENT_USER_KEY: "currentUser",
        _authProviders: {},
        _performUserRewrite: !0,
        _isRevocableSessionEnabled: !1,
        signUp: function(a, c, d, e) {
            d = d || {}, d.username = a, d.password = c;
            var f = b.Object._create("_User");
            return f.signUp(d, e);
        },
        logIn: function(a, c, d) {
            var e = b.Object._create("_User");
            return e._finishFetch({
                username: a,
                password: c
            }), e.logIn(d);
        },
        become: function(a, c) {
            c = c || {};
            var d = b.Object._create("_User");
            return b._request({
                route: "users",
                className: "me",
                method: "GET",
                useMasterKey: c.useMasterKey,
                sessionToken: a
            }).then(function(a, b, c) {
                var e = d.parse(a, b, c);
                return d._finishFetch(e), d._handleSaveResult(!0), d;
            })._thenRunCallbacks(c, d);
        },
        logOut: function() {
            return b.User._currentAsync().then(function(a) {
                var c = b.Storage.removeItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY));
                if (null !== a) {
                    var d = a.getSessionToken();
                    b.Session._isRevocable(d) && c.then(function() {
                        return b._request({
                            route: "logout",
                            method: "POST",
                            sessionToken: d
                        });
                    }), a._logOutWithAll(), a._isCurrentUser = !1;
                }
                return b.User._currentUserMatchesDisk = !0, b.User._currentUser = null, c;
            });
        },
        requestPasswordReset: function(a, c) {
            c = c || {};
            var d = b._request({
                route: "requestPasswordReset",
                method: "POST",
                useMasterKey: c.useMasterKey,
                data: {
                    email: a
                }
            });
            return d._thenRunCallbacks(c);
        },
        current: function() {
            if (b.Storage.async) return b.User._currentAsync(), b.User._currentUser;
            if (b.User._currentUser) return b.User._currentUser;
            if (b.User._currentUserMatchesDisk) return b.User._currentUser;
            b.User._currentUserMatchesDisk = !0;
            var a = b.Storage.getItem(b._getParsePath(b.User._CURRENT_USER_KEY));
            if (!a) return null;
            b.User._currentUser = b.Object._create("_User"), b.User._currentUser._isCurrentUser = !0;
            var c = JSON.parse(a);
            return b.User._currentUser.id = c._id, delete c._id, b.User._currentUser._sessionToken = c._sessionToken, 
            delete c._sessionToken, b.User._currentUser._finishFetch(c), b.User._currentUser._synchronizeAllAuthData(), 
            b.User._currentUser._refreshCache(), b.User._currentUser._opSetQueue = [ {} ], b.User._currentUser;
        },
        _currentAsync: function() {
            return b.User._currentUser ? b.Promise.as(b.User._currentUser) : b.User._currentUserMatchesDisk ? b.Promise.as(b.User._currentUser) : b.Storage.getItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY)).then(function(a) {
                if (!a) return null;
                b.User._currentUser = b.Object._create("_User"), b.User._currentUser._isCurrentUser = !0;
                var c = JSON.parse(a);
                return b.User._currentUser.id = c._id, delete c._id, b.User._currentUser._sessionToken = c._sessionToken, 
                delete c._sessionToken, b.User._currentUser._finishFetch(c), b.User._currentUser._synchronizeAllAuthData(), 
                b.User._currentUser._refreshCache(), b.User._currentUser._opSetQueue = [ {} ], b.User._currentUser;
            });
        },
        allowCustomUserClass: function(a) {
            this._performUserRewrite = !a;
        },
        enableRevocableSession: function(a) {
            return a = a || {}, b.User._isRevocableSessionEnabled = !0, !b._isNode && b.User.current() ? b.User.current()._upgradeToRevocableSession(a) : b.Promise.as()._thenRunCallbacks(a);
        },
        _saveCurrentUser: function(a) {
            null !== b.User._currentUser && b.User._currentUser !== a && b.User.logOut(), a._isCurrentUser = !0, 
            b.User._currentUser = a, b.User._currentUserMatchesDisk = !0;
            var c = a.toJSON();
            c._id = a.id, c._sessionToken = a._sessionToken, b.Storage.async ? b.Storage.setItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY), JSON.stringify(c)) : b.Storage.setItem(b._getParsePath(b.User._CURRENT_USER_KEY), JSON.stringify(c));
        },
        _registerAuthenticationProvider: function(a) {
            b.User._authProviders[a.getAuthType()] = a, b.User.current() && b.User.current()._synchronizeAuthData(a.getAuthType());
        },
        _logInWith: function(a, c) {
            var d = b.Object._create("_User");
            return d._linkWith(a, c);
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse;
    b.Session = b.Object.extend("_Session", {
        getSessionToken: function() {
            return this._sessionToken;
        },
        _mergeMagicFields: function(a) {
            a.sessionToken && (this._sessionToken = a.sessionToken, delete a.sessionToken), 
            b.Session.__super__._mergeMagicFields.call(this, a);
        }
    }, {
        readOnlyAttributes: {
            createdWith: !0,
            expiresAt: !0,
            installationId: !0,
            restricted: !0,
            sessionToken: !0,
            user: !0
        },
        current: function(a) {
            a = a || {};
            var c = b.Object._create("_Session"), d = b.User.current().getSessionToken();
            return b._request({
                route: "sessions",
                className: "me",
                method: "GET",
                useMasterKey: a.useMasterKey,
                sessionToken: d
            }).then(function(a, b, d) {
                var e = c.parse(a, b, d);
                return c._finishFetch(e), c;
            })._thenRunCallbacks(a, c);
        },
        _isRevocable: function(a) {
            return a.indexOf("r:") > -1;
        },
        isCurrentSessionRevocable: function() {
            return null !== b.User.current() ? b.Session._isRevocable(b.User.current().getSessionToken()) : void 0;
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Query = function(a) {
        c.isString(a) && (a = b.Object._getSubclass(a)), this.objectClass = a, this.className = a.prototype.className, 
        this._where = {}, this._include = [], this._limit = -1, this._skip = 0, this._extraOptions = {};
    }, b.Query.or = function() {
        var a = c.toArray(arguments), d = null;
        b._arrayEach(a, function(a) {
            if (c.isNull(d) && (d = a.className), d !== a.className) throw "All queries must be for the same class";
        });
        var e = new b.Query(d);
        return e._orQuery(a), e;
    }, b.Query.prototype = {
        get: function(a, d) {
            var e = this;
            e.equalTo("objectId", a);
            var f = {};
            return d && c.has(d, "useMasterKey") && (f = {
                useMasterKey: d.useMasterKey
            }), e.first(f).then(function(a) {
                if (a) return a;
                var c = new b.Error(b.Error.OBJECT_NOT_FOUND, "Object not found.");
                return b.Promise.error(c);
            })._thenRunCallbacks(d, null);
        },
        toJSON: function() {
            var a = {
                where: this._where
            };
            return this._include.length > 0 && (a.include = this._include.join(",")), this._select && (a.keys = this._select.join(",")), 
            this._limit >= 0 && (a.limit = this._limit), this._skip > 0 && (a.skip = this._skip), 
            void 0 !== this._order && (a.order = this._order.join(",")), b._objectEach(this._extraOptions, function(b, c) {
                a[c] = b;
            }), a;
        },
        find: function(a) {
            var d = this;
            a = a || {};
            var e = b._request({
                route: "classes",
                className: this.className,
                method: "GET",
                useMasterKey: a.useMasterKey,
                data: this.toJSON()
            });
            return e.then(function(a) {
                return c.map(a.results, function(c) {
                    var e;
                    return e = a.className ? new b.Object(a.className) : new d.objectClass(), e._finishFetch(c, !0), 
                    e;
                });
            })._thenRunCallbacks(a);
        },
        count: function(a) {
            var c = this;
            a = a || {};
            var d = this.toJSON();
            d.limit = 0, d.count = 1;
            var e = b._request({
                route: "classes",
                className: c.className,
                method: "GET",
                useMasterKey: a.useMasterKey,
                data: d
            });
            return e.then(function(a) {
                return a.count;
            })._thenRunCallbacks(a);
        },
        first: function(a) {
            var d = this;
            a = a || {};
            var e = this.toJSON();
            e.limit = 1;
            var f = b._request({
                route: "classes",
                className: this.className,
                method: "GET",
                useMasterKey: a.useMasterKey,
                data: e
            });
            return f.then(function(a) {
                return c.map(a.results, function(c) {
                    var e;
                    return e = a.className ? new b.Object(a.className) : new d.objectClass(), e._finishFetch(c, !0), 
                    e;
                })[0];
            })._thenRunCallbacks(a);
        },
        collection: function(a, d) {
            return d = d || {}, new b.Collection(a, c.extend(d, {
                model: this.objectClass,
                query: this
            }));
        },
        skip: function(a) {
            return this._skip = a, this;
        },
        limit: function(a) {
            return this._limit = a, this;
        },
        equalTo: function(a, d) {
            return c.isUndefined(d) ? this.doesNotExist(a) : (this._where[a] = b._encode(d), 
            this);
        },
        _addCondition: function(a, c, d) {
            return this._where[a] || (this._where[a] = {}), this._where[a][c] = b._encode(d), 
            this;
        },
        notEqualTo: function(a, b) {
            return this._addCondition(a, "$ne", b), this;
        },
        lessThan: function(a, b) {
            return this._addCondition(a, "$lt", b), this;
        },
        greaterThan: function(a, b) {
            return this._addCondition(a, "$gt", b), this;
        },
        lessThanOrEqualTo: function(a, b) {
            return this._addCondition(a, "$lte", b), this;
        },
        greaterThanOrEqualTo: function(a, b) {
            return this._addCondition(a, "$gte", b), this;
        },
        containedIn: function(a, b) {
            return this._addCondition(a, "$in", b), this;
        },
        notContainedIn: function(a, b) {
            return this._addCondition(a, "$nin", b), this;
        },
        containsAll: function(a, b) {
            return this._addCondition(a, "$all", b), this;
        },
        exists: function(a) {
            return this._addCondition(a, "$exists", !0), this;
        },
        doesNotExist: function(a) {
            return this._addCondition(a, "$exists", !1), this;
        },
        matches: function(a, b, c) {
            return this._addCondition(a, "$regex", b), c || (c = ""), b.ignoreCase && (c += "i"), 
            b.multiline && (c += "m"), c && c.length && this._addCondition(a, "$options", c), 
            this;
        },
        matchesQuery: function(a, b) {
            var c = b.toJSON();
            return c.className = b.className, this._addCondition(a, "$inQuery", c), this;
        },
        doesNotMatchQuery: function(a, b) {
            var c = b.toJSON();
            return c.className = b.className, this._addCondition(a, "$notInQuery", c), this;
        },
        matchesKeyInQuery: function(a, b, c) {
            var d = c.toJSON();
            return d.className = c.className, this._addCondition(a, "$select", {
                key: b,
                query: d
            }), this;
        },
        doesNotMatchKeyInQuery: function(a, b, c) {
            var d = c.toJSON();
            return d.className = c.className, this._addCondition(a, "$dontSelect", {
                key: b,
                query: d
            }), this;
        },
        _orQuery: function(a) {
            var b = c.map(a, function(a) {
                return a.toJSON().where;
            });
            return this._where.$or = b, this;
        },
        _quote: function(a) {
            return "\\Q" + a.replace("\\E", "\\E\\\\E\\Q") + "\\E";
        },
        contains: function(a, b) {
            return this._addCondition(a, "$regex", this._quote(b)), this;
        },
        startsWith: function(a, b) {
            return this._addCondition(a, "$regex", "^" + this._quote(b)), this;
        },
        endsWith: function(a, b) {
            return this._addCondition(a, "$regex", this._quote(b) + "$"), this;
        },
        ascending: function() {
            return this._order = [], this.addAscending.apply(this, arguments);
        },
        addAscending: function(a) {
            var c = this;
            return this._order || (this._order = []), b._arrayEach(arguments, function(a) {
                Array.isArray(a) && (a = a.join()), c._order = c._order.concat(a.replace(/\s/g, "").split(","));
            }), this;
        },
        descending: function(a) {
            return this._order = [], this.addDescending.apply(this, arguments);
        },
        addDescending: function(a) {
            var d = this;
            return this._order || (this._order = []), b._arrayEach(arguments, function(a) {
                Array.isArray(a) && (a = a.join()), d._order = d._order.concat(c.map(a.replace(/\s/g, "").split(","), function(a) {
                    return "-" + a;
                }));
            }), this;
        },
        near: function(a, c) {
            return c instanceof b.GeoPoint || (c = new b.GeoPoint(c)), this._addCondition(a, "$nearSphere", c), 
            this;
        },
        withinRadians: function(a, b, c) {
            return this.near(a, b), this._addCondition(a, "$maxDistance", c), this;
        },
        withinMiles: function(a, b, c) {
            return this.withinRadians(a, b, c / 3958.8);
        },
        withinKilometers: function(a, b, c) {
            return this.withinRadians(a, b, c / 6371);
        },
        withinGeoBox: function(a, c, d) {
            return c instanceof b.GeoPoint || (c = new b.GeoPoint(c)), d instanceof b.GeoPoint || (d = new b.GeoPoint(d)), 
            this._addCondition(a, "$within", {
                $box: [ c, d ]
            }), this;
        },
        include: function() {
            var a = this;
            return b._arrayEach(arguments, function(b) {
                c.isArray(b) ? a._include = a._include.concat(b) : a._include.push(b);
            }), this;
        },
        select: function() {
            var a = this;
            return this._select = this._select || [], b._arrayEach(arguments, function(b) {
                c.isArray(b) ? a._select = a._select.concat(b) : a._select.push(b);
            }), this;
        },
        each: function(a, d) {
            if (d = d || {}, this._order || this._skip || this._limit >= 0) {
                var e = "Cannot iterate on a query with sort, skip, or limit.";
                return b.Promise.error(e)._thenRunCallbacks(d);
            }
            var f = (new b.Promise(), new b.Query(this.objectClass));
            f._limit = d.batchSize || 100, f._where = c.clone(this._where), f._include = c.clone(this._include), 
            this._select && (f._select = c.clone(this._select)), f.ascending("objectId");
            var g = {};
            c.has(d, "useMasterKey") && (g.useMasterKey = d.useMasterKey);
            var h = !1;
            return b.Promise._continueWhile(function() {
                return !h;
            }, function() {
                return f.find(g).then(function(c) {
                    var d = b.Promise.as();
                    return b._.each(c, function(b) {
                        d = d.then(function() {
                            return a(b);
                        });
                    }), d.then(function() {
                        c.length >= f._limit ? f.greaterThan("objectId", c[c.length - 1].id) : h = !0;
                    });
                });
            })._thenRunCallbacks(d);
        }
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b, c, d = a.Parse, e = d._, f = !1, g = {
        authenticate: function(a) {
            var c = this;
            FB.login(function(b) {
                b.authResponse ? a.success && a.success(c, {
                    id: b.authResponse.userID,
                    access_token: b.authResponse.accessToken,
                    expiration_date: new Date(1e3 * b.authResponse.expiresIn + new Date().getTime()).toJSON()
                }) : a.error && a.error(c, b);
            }, {
                scope: b
            });
        },
        restoreAuthentication: function(a) {
            if (a) {
                var b = {
                    userID: a.id,
                    accessToken: a.access_token,
                    expiresIn: (d._parseDate(a.expiration_date).getTime() - new Date().getTime()) / 1e3
                }, f = e.clone(c);
                f.authResponse = b, f.status = !1;
                var g = FB.getAuthResponse();
                g && g.userID !== b.userID && FB.logout(), FB.init(f);
            }
            return !0;
        },
        getAuthType: function() {
            return "facebook";
        },
        deauthenticate: function() {
            this.restoreAuthentication(null);
        }
    };
    d.FacebookUtils = {
        init: function(a) {
            if ("undefined" == typeof FB) throw "The Facebook JavaScript SDK must be loaded before calling init.";
            if (c = e.clone(a) || {}, c.status && "undefined" != typeof console) {
                var b = console.warn || console.log || function() {};
                b.call(console, "The 'status' flag passed into FB.init, when set to true, can interfere with Parse Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.");
            }
            c.status = !1, FB.init(c), d.User._registerAuthenticationProvider(g), f = !0;
        },
        isLinked: function(a) {
            return a._isLinked("facebook");
        },
        logIn: function(a, c) {
            if (!a || e.isString(a)) {
                if (!f) throw "You must initialize FacebookUtils before calling logIn.";
                return b = a, d.User._logInWith("facebook", c);
            }
            var g = e.clone(c) || {};
            return g.authData = a, d.User._logInWith("facebook", g);
        },
        link: function(a, c, d) {
            if (!c || e.isString(c)) {
                if (!f) throw "You must initialize FacebookUtils before calling link.";
                return b = c, a._linkWith("facebook", d);
            }
            var g = e.clone(d) || {};
            return g.authData = c, a._linkWith("facebook", g);
        },
        unlink: function(a, b) {
            if (!f) throw "You must initialize FacebookUtils before calling unlink.";
            return a._unlinkFrom("facebook", b);
        }
    };
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.History = function() {
        this.handlers = [], c.bindAll(this, "checkUrl");
    };
    var d = /^[#\/]/, e = /msie [\w.]+/;
    b.History.started = !1, c.extend(b.History.prototype, b.Events, {
        interval: 50,
        getHash: function(a) {
            var b = a ? a.location : window.location, c = b.href.match(/#(.*)$/);
            return c ? c[1] : "";
        },
        getFragment: function(a, c) {
            if (b._isNullOrUndefined(a)) if (this._hasPushState || c) {
                a = window.location.pathname;
                var e = window.location.search;
                e && (a += e);
            } else a = this.getHash();
            return a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), 
            a.replace(d, "");
        },
        start: function(a) {
            if (b.History.started) throw new Error("Parse.history has already been started");
            b.History.started = !0, this.options = c.extend({}, {
                root: "/"
            }, this.options, a), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, 
            this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var f = this.getFragment(), g = document.documentMode, h = e.exec(navigator.userAgent.toLowerCase()) && (!g || 7 >= g);
            h && (this.iframe = b.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, 
            this.navigate(f)), this._hasPushState ? b.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !h ? b.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = window.setInterval(this.checkUrl, this.interval)), 
            this.fragment = f;
            var i = window.location, j = i.pathname === this.options.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !j ? (this.fragment = this.getFragment(null, !0), 
            window.location.replace(this.options.root + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && j && i.hash && (this.fragment = this.getHash().replace(d, ""), 
            window.history.replaceState({}, document.title, i.protocol + "//" + i.host + this.options.root + this.fragment)), 
            this.options.silent ? void 0 : this.loadUrl());
        },
        stop: function() {
            b.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), 
            window.clearInterval(this._checkUrlInterval), b.History.started = !1;
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function(a) {
            var b = this.getFragment();
            return b === this.fragment && this.iframe && (b = this.getFragment(this.getHash(this.iframe))), 
            b === this.fragment ? !1 : (this.iframe && this.navigate(b), void (this.loadUrl() || this.loadUrl(this.getHash())));
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a), d = c.any(this.handlers, function(a) {
                return a.route.test(b) ? (a.callback(b), !0) : void 0;
            });
            return d;
        },
        navigate: function(a, c) {
            if (!b.History.started) return !1;
            c && c !== !0 || (c = {
                trigger: c
            });
            var e = (a || "").replace(d, "");
            if (this.fragment !== e) {
                if (this._hasPushState) {
                    0 !== e.indexOf(this.options.root) && (e = this.options.root + e), this.fragment = e;
                    var f = c.replace ? "replaceState" : "pushState";
                    window.history[f]({}, document.title, e);
                } else this._wantsHashChange ? (this.fragment = e, this._updateHash(window.location, e, c.replace), 
                this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (c.replace || this.iframe.document.open().close(), 
                this._updateHash(this.iframe.location, e, c.replace))) : window.location.assign(this.options.root + a);
                c.trigger && this.loadUrl(a);
            }
        },
        _updateHash: function(a, b, c) {
            if (c) {
                var d = a.toString().replace(/(javascript:|#).*$/, "");
                a.replace(d + "#" + b);
            } else a.hash = b;
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Router = function(a) {
        a = a || {}, a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    };
    var d = /:\w+/g, e = /\*\w+/g, f = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;
    c.extend(b.Router.prototype, b.Events, {
        initialize: function() {},
        route: function(a, d, e) {
            return b.history = b.history || new b.History(), c.isRegExp(a) || (a = this._routeToRegExp(a)), 
            e || (e = this[d]), b.history.route(a, c.bind(function(c) {
                var f = this._extractParameters(a, c);
                e && e.apply(this, f), this.trigger.apply(this, [ "route:" + d ].concat(f)), b.history.trigger("route", this, d, f);
            }, this)), this;
        },
        navigate: function(a, c) {
            b.history.navigate(a, c);
        },
        _bindRoutes: function() {
            if (this.routes) {
                var a = [];
                for (var b in this.routes) this.routes.hasOwnProperty(b) && a.unshift([ b, this.routes[b] ]);
                for (var c = 0, d = a.length; d > c; c++) this.route(a[c][0], a[c][1], this[a[c][1]]);
            }
        },
        _routeToRegExp: function(a) {
            return a = a.replace(f, "\\$&").replace(d, "([^/]+)").replace(e, "(.*?)"), new RegExp("^" + a + "$");
        },
        _extractParameters: function(a, b) {
            return a.exec(b).slice(1);
        }
    }), b.Router.extend = b._extend;
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse, c = b._;
    b.Cloud = b.Cloud || {}, c.extend(b.Cloud, {
        run: function(a, c, d) {
            d = d || {};
            var e = b._request({
                route: "functions",
                className: a,
                method: "POST",
                useMasterKey: d.useMasterKey,
                data: b._encode(c, null, !0)
            });
            return e.then(function(a) {
                return b._decode(null, a).result;
            })._thenRunCallbacks(d);
        }
    });
}(this), function(a) {
    a.Parse = a.Parse || {};
    var b = a.Parse;
    b.Installation = b.Object.extend("_Installation"), b.Push = b.Push || {}, b.Push.send = function(a, c) {
        if (c = c || {}, a.where && (a.where = a.where.toJSON().where), a.push_time && (a.push_time = a.push_time.toJSON()), 
        a.expiration_time && (a.expiration_time = a.expiration_time.toJSON()), a.expiration_time && a.expiration_interval) throw "Both expiration_time and expiration_interval can't be set";
        var d = b._request({
            route: "push",
            method: "POST",
            data: a,
            useMasterKey: c.useMasterKey
        });
        return d._thenRunCallbacks(c);
    };
}(this);

function Event() {
    var subscriptions = {};
    //Remove a listener for an event
    this.unsubscribe = function(eventName, callbackFunction) {
        //Check if there are listeners for the event type
        if (!subscriptions[eventName]) {
            return false;
        }
        //Remove the existing listner
        var subscriptionIndex = subscriptions[eventName].indexOf(callbackFunction);
        if (subscriptionIndex < 0) {
            return false;
        }
        subscriptions[eventName].splice(subscriptionIndex, 1);
        return true;
    };
    //Add a listener for an event
    this.subscribe = function(eventName, callbackFunction) {
        //Create a list of listeners for a certain event type if it doesn't exist yet
        if (!subscriptions[eventName]) {
            subscriptions[eventName] = [];
        }
        //Check if the listener already exists
        if (subscriptions[eventName].indexOf(callbackFunction) < 0) {
            subscriptions[eventName].push(callbackFunction);
        }
    };
    //Fire an event
    this.publish = function(eventName, caller, eventData) {
        //Check if there are subscriptions for the event type
        if (!subscriptions[eventName]) {
            return false;
        }
        //Notify each of the subscriptions
        var i;
        for (i = 0; i < subscriptions[eventName].length; i++) {
            subscriptions[eventName][i].call(caller, eventName, eventData);
        }
    };
}

function ScreenManager() {
    var self = this, screens = [], events = new Event();
    this.container = null;
    //Get the current screen (the last screen in the chain)
    function getCurrentScreen() {
        var screenCount = screens.length, screenIndex = screenCount - 1;
        return screens[screenIndex];
    }
    function getPreviousScreen() {
        var screenCount = screens.length, screenIndex = screenCount - 2;
        return screens[screenIndex] || false;
    }
    //Check if the screen is a root screen and remove all previous screens if so
    function rootScreen(target) {
        if (!target.root && !target.forceRoot) {
            return;
        }
        var i, removeCount = screens.length - 1;
        //Destroy the screens that will be removed
        for (i = 0; i < removeCount; i++) {
            screens[i].destroy();
        }
        screens.splice(0, removeCount);
    }
    //Destroy and remove the last screen
    function clearLastScreen() {
        var screenCount = screens.length, lastIndex = screenCount - 1;
        screens[lastIndex].destroy();
        screens.splice(lastIndex, 1);
    }
    function queueScreenSlideLeft(direction) {
        direction = direction || 1;
        var target = getCurrentScreen(), prevScreen = getPreviousScreen(), startPos = 100, endPos = 0, tweener = new Tweenable();
        if (direction === -1) {
            startPos = 0;
            endPos = 100;
            target.container.style.left = "0%";
            if (prevScreen) {
                prevScreen.container.style.display = "";
            }
        } else {
            target.container.style.left = "100%";
            target.container.style.visibility = "";
        }
        tweener.tween({
            from: {
                left: startPos
            },
            to: {
                left: endPos
            },
            easing: "easeInOutCubic",
            duration: 400,
            step: function(state) {
                target.container.style.left = state["left"] + "%";
            },
            finish: function(state) {
                if (direction === 1) {
                    if (prevScreen) {
                        prevScreen.container.style.display = "none";
                    }
                    rootScreen(target);
                } else {
                    clearLastScreen();
                }
            }
        });
    }
    //Show a screen with no transition
    function queueScreenNoTransition(direction) {
        direction = direction || 1;
        var target = getCurrentScreen(), prevScreen = getPreviousScreen();
        if (direction === 1) {
            target.container.style.visibility = "";
            target.container.style.display = "";
            if (prevScreen) {
                prevScreen.container.style.display = "none";
            }
            rootScreen(target);
        } else {
            target.container.style.visibility = "hidden";
            target.container.style.display = "none";
            if (prevScreen) {
                prevScreen.container.style.display = "";
            }
            clearLastScreen();
        }
    }
    //Trigger a screen transition animation
    function triggerScreenTransition(direction) {
        direction = direction || 1;
        var target = getCurrentScreen();
        switch (target.transition) {
          case "slideLeft":
            queueScreenSlideLeft(direction);
            break;

          default:
            queueScreenNoTransition(direction);
            break;
        }
    }
    //Add the screen to the history and 
    function screenReady() {
        events.unsubscribe(this.id + "ContainerReady", screenReady);
        screens.push(this);
        triggerScreenTransition();
    }
    //Go back one screen
    this.goBack = function() {
        triggerScreenTransition(-1);
    };
    //Init a screen from its constructor
    this.addScreen = function(screen, screenData, forceRoot) {
        var screenConstructor = new screen(self, events, screenData, forceRoot);
        //Listen for when the screen container and its contents are ready to be displayed
        events.subscribe(screenConstructor.id + "ContainerReady", screenReady);
        screenConstructor.init();
    };
    //Destroy the screen manager and all the currently loaded screens
    this.destroy = function() {
        var i;
        for (i = 0; i < screens.length; i++) {
            screens[i].destroy();
        }
        screens = [];
    };
    //Initiate the screen manager
    this.init = function() {
        this.container = document.getElementById("app");
        //Load StartScreen by default
        if (StartScreen) {
            this.addScreen(StartScreen);
        }
    };
    this.init();
}

var FormHandler = function(userConfig) {
    var validate, fieldErrors = {}, fieldErrorContainers = {}, config = {
        form: false,
        submitBlacklist: {},
        onFieldChanged: false,
        onSubmitSuccess: false
    }, request, submitting = false;
    for (i in userConfig) {
        if (userConfig.hasOwnProperty(i)) {
            config[i] = userConfig[i];
        }
    }
    function resetValidation() {
        var i, wrapper;
        for (i in fieldErrors) {
            if (i && fieldErrors.hasOwnProperty(i)) {
                wrapper = getParentWithClass(config["form"].elements[i], "field-wrapper");
                wrapper.className = "field-wrapper";
            }
        }
        for (i in fieldErrorContainers) {
            if (i && fieldErrorContainers.hasOwnProperty(i)) {
                fieldErrorContainers[i].innerHTML = "";
            }
        }
        fieldErrors = {};
        fieldErrorContainers = {};
    }
    function updateFieldError(field) {
        var wrapper = getParentWithClass(field, "field-wrapper");
        if (fieldErrors[field.name]) {
            swapClass(wrapper, "ok", "error");
            if (!fieldErrorContainers[field.name]) {
                fieldErrorContainers[field.name] = wrapper.querySelector("p.field-error");
            }
            if (fieldErrorContainers[field.name]) {
                fieldErrorContainers[field.name].textContent = fieldErrors[field.name];
            }
        } else {
            swapClass(wrapper, "error", "ok");
            if (fieldErrorContainers[field.name]) {
                fieldErrorContainers[field.name].innerHTML = "";
            }
        }
    }
    //Full processing of a single field validation
    function validateField(e) {
        var field = e.target || e, fieldName = field.name, fieldValidation = validate.field(field), linkedField;
        //Update form errors
        if (fieldValidation.valid && fieldErrors[fieldName]) {
            fieldErrors[fieldName] = false;
        } else {
            fieldErrors[fieldName] = fieldValidation.error;
        }
        updateFieldError(field);
        if (e.target && config.onFieldChanged) {
            config.onFieldChanged(fieldName, fieldValidation);
        }
        linkedField = field.getAttribute("linkeddate") || field.getAttribute("linkedtime") || false;
        //Validate linked field
        //Compare the field and value of e to avoid an infinite loop of linked fields
        if (linkedField && field !== e) {
            linkedField = field.form.elements[linkedField];
            validateField(linkedField);
        }
        return fieldValidation;
    }
    //Full processing of an entire form validation
    function validateForm() {
        var isValid = true, fields = config["form"].elements, i, fieldValidation, validationBlacklist = [ "fieldset", "button", "hidden", "reset", "submit" ];
        for (i = 0; i < fields.length; i++) {
            if (validationBlacklist.indexOf(fields[i].type) < 0) {
                fieldValidation = validateField(fields[i]);
                if (!fieldValidation.valid) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
    function disableFormActions() {
        var formFields = config["form"].elements;
        if (formFields["submit-btn"]) {
            formFields["submit-btn"].disabled = true;
        }
        if (formFields["reset-btn"]) {
            formFields["reset-btn"].disabled = true;
        }
    }
    function enableFormActions() {
        var formFields = config["form"].elements;
        if (formFields["submit-btn"]) {
            formFields["submit-btn"].disabled = false;
        }
        if (formFields["reset-btn"]) {
            formFields["reset-btn"].disabled = false;
        }
    }
    function formResponse(e) {
        var target = e.target, response, onSuccessGoTo;
        if (target.readyState !== 4) {
            return;
        }
        if (target.status >= 200 && target.status < 400) {
            response = JSON.parse(target.responseText);
            if (response.success) {
                onSuccessGoTo = config["form"].getAttribute("onsuccessgoto");
                if (onSuccessGoTo) {
                    return window.location = onSuccessGoTo;
                }
                if (config["onSubmitSuccess"]) {
                    config["onSubmitSuccess"]();
                }
            } else {}
            if (config["form"].getAttribute("onsuccessgoto")) {}
        } else {
            console.error("Error submitting form.", target.responseText);
        }
        enableFormActions();
        submitting = false;
    }
    function serializeFormData() {
        var fields = config["form"].elements, fieldType, i, j, valuePairs = [];
        for (i = 0; i < fields.length; i++) {
            if (fields[i].name && !config.submitBlacklist[fields[i].name]) {
                fieldType = fields[i].type;
                nodeName = fields[i].nodeName.toLowerCase();
                if (nodeName === "button" || nodeName === "fieldset") {
                    continue;
                }
                if (fieldType === "checkbox" || fieldType === "radio") {
                    if (!fields[i].checked) {
                        continue;
                    }
                }
                if (fieldType !== "select-multiple") {
                    valuePairs.push(encodeURIComponent(fields[i].name) + "=" + encodeURIComponent(fields[i].value));
                    continue;
                }
                for (j = 0; j < fields[i].selectedOptions.length; j += 1) {
                    valuePairs.push(encodeURIComponent(fields[i].name) + "=" + encodeURIComponent(fields[i].selectedOptions[j].value));
                }
            }
        }
        return valuePairs.join("&");
    }
    function sendFormData() {
        var formData = serializeFormData(), method = config["form"].method.toUpperCase(), action = config["form"].action + (method === "GET" ? "?" + formData : "");
        request = new XMLHttpRequest();
        request.onreadystatechange = formResponse;
        request.open(method, action, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (method === "POST") {
            request.send(formData);
        } else {
            request.send();
        }
    }
    function submitForm(e) {
        e.preventDefault();
        if (submitting) {
            return;
        }
        var isValid = validateForm(), formData;
        if (isValid) {
            submitting = true;
            config["form"].classList.add("submitting");
            disableFormActions();
            sendFormData();
        } else {
            console.log("errors in the form");
        }
    }
    function formReset() {
        var photoPreviews = config.form.getElementsByClassName("photo-crop-preview"), photoPreview, i;
        for (i = 0; i < photoPreviews.length; i++) {
            photoPreview = photoPreviews[i];
            photoPreview.parentNode.removeChild(photoPreview);
        }
        setTimeout(resetValidation, 50);
    }
    function initDateUI(dateField) {
        dateField.readOnly = true;
        var datePickerOpts = {
            field: dateField,
            format: "YYYY-MM-DD"
        }, datePicker, minDate = dateField.getAttribute("min"), maxDate = dateField.getAttribute("max");
        if (minDate) {
            datePickerOpts["minDate"] = moment(minDate, "YYYY-MM-DD").toDate();
        }
        if (maxDate) {
            datePickerOpts["maxDate"] = moment(maxDate, "YYYY-MM-DD").toDate();
        }
        datePicker = new Pikaday(datePickerOpts);
    }
    function initTimeUI(timeField) {
        timeField.readOnly = true;
        var timePicker = new TimePicker({
            target: timeField
        });
        timePicker.init();
    }
    //Remove event listeners
    function destroy() {
        config["form"].removeEventListener("change", validateForm);
        config["form"].removeEventListener("submit", submitForm);
        config["form"].removeEventListener("reset", formReset);
        config["form"].reset();
        enableFormActions();
        config = {
            form: false,
            submitBlacklist: []
        };
        fieldErrors = undefined;
        fieldErrorContainers = undefined;
        validate = undefined;
        if (request) {
            request.abort();
            request = undefined;
        }
    }
    //Add event listeners and required attributes
    function init() {
        if (!config["form"]) {
            return;
        }
        enableFormActions();
        var i, fields = config["form"].elements, dateInputSupport = dateInputSupported();
        for (i = 0; i < fields.length; i += 1) {
            if (fields[i].getAttribute("type") === "date" && !dateInputSupport) {
                initDateUI(fields[i]);
            } else if (fields[i].getAttribute("type") === "time" && !dateInputSupport) {
                initTimeUI(fields[i]);
            }
        }
        validate = new Validate();
        config["form"].addEventListener("change", validateField);
        config["form"].addEventListener("submit", submitForm);
        config["form"].addEventListener("reset", formReset);
        config["form"].setAttribute("novalidate", "novalidate");
    }
    return {
        init: init,
        destroy: destroy,
        validateField: validateField
    };
};

var Validate = function() {
    //Validate the maximum value of a field
    function isMaxValueValid(field) {
        var output = {
            valid: true,
            field: field
        }, type = field.type, altType = field.getAttribute("type"), max = field.getAttribute("max"), value;
        if (max !== null) {
            if (type === "file") {
                max = parseFloat(max);
                if (field.files.length > max) {
                    output.valid = false;
                    output.error = "The maximum accepted number of uploaded files is " + max + ".";
                }
            } else if (field.value.length > 0) {
                max = parseFloat(max);
                value = parseFloat(field.value);
                if (value > max) {
                    field.value = max;
                    output.valid = false;
                    output.error = "The maximum accepted value is " + max + ".";
                }
            }
        }
        return output;
    }
    //Validate the minimum value of a field
    function isMinValueValid(field) {
        var output = {
            valid: true,
            field: field
        }, type = field.type, altType = field.getAttribute("type"), min = field.getAttribute("min"), value;
        if (min !== null) {
            if (type === "file" && field.files.length > 0) {
                min = parseFloat(min);
                if (field.files.length < min) {
                    output.valid = false;
                    output.error = "The minimum accepted number of uploaded files is " + min + ".";
                }
            } else if (field.value.length > 0) {
                min = parseFloat(min);
                value = parseFloat(field.value);
                if (value < min) {
                    field.value = min;
                    output.valid = false;
                    output.error = "The minimum accepted value is " + min + ".";
                }
            }
        }
        return output;
    }
    //Validate the maximum length of the value of a field
    function isMaxLengthValid(field) {
        var output = {
            valid: true,
            field: field
        }, maxLength = field.getAttribute("maxlength");
        if (maxLength !== null && field.value.length > parseInt(maxLength, 10)) {
            field.value = field.value.substring(0, maxLength);
            output.valid = false;
            output.error = "TThe maximum accepted length is " + maxLength + " characters.";
        }
        return output;
    }
    //Validate the minimum length of the value of a field
    function isMinLengthValid(field) {
        var output = {
            valid: true,
            field: field
        }, minLength = field.getAttribute("minlength");
        if (minLength !== null && field.value.length > 0 && field.value.length < parseInt(minLength, 10)) {
            output.valid = false;
            output.error = "The minimum accepted length is " + minLength + " characters.";
        }
        return output;
    }
    //Validate the value pattern of the field
    function isPatternValid(field) {
        var output = {
            valid: true,
            field: field
        }, pattern = field.getAttribute("pattern");
        pattern = pattern !== null ? new RegExp(pattern) : false;
        if (pattern && field.value.length > 0 && !pattern.test(field.value)) {
            output.valid = false;
            output.error = "The format is not valid.";
        }
        return output;
    }
    //Validate an email address in the field
    function isEmailValid(field) {
        var output = {
            valid: true,
            field: field
        }, type = field.type, emailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (type === "email" && field.value.length > 0 && !emailRegEx.test(field.value)) {
            output.valid = false;
            output.error = "The email address provided is not valid.";
        }
        return output;
    }
    //Validate the requirement of a field
    function isRequiredValid(field) {
        var output = {
            valid: true,
            field: field
        }, type = field.type;
        if (field.required) {
            if (type === "file") {
                if (field.files.length === 0) {
                    output.valid = false;
                    output.error = "This field is required.";
                }
            } else if (type === "select-multiple") {
                if (field.selectedOptions.length === 0) {
                    output.valid = false;
                    output.error = "This field is required.";
                }
            } else if (field.value.length === 0) {
                output.valid = false;
                output.error = "This field is required.";
            }
        }
        return output;
    }
    //Full processing of a single field validation
    function validateField(field) {
        if (!field) {
            console.warn("Tried to validate a form field, but no field was provided.");
            return;
        }
        var type = field.type, validationOutput = {
            valid: true,
            field: field
        }, requiredValidations = [ isRequiredValid, isPatternValid, isEmailValid, isMinLengthValid, isMaxLengthValid, isMinValueValid, isMaxValueValid ], i;
        //Remove white space on the ends
        if (type !== "file" && type !== "select" && type !== "select-multiple") {
            if (type === "number") {
                field.value = parseFloat(field.value);
            } else {
                field.value = field.value.trim();
            }
        }
        for (i = 0; i < requiredValidations.length; i++) {
            validationOutput = requiredValidations[i](field);
            if (!validationOutput.valid) {
                return validationOutput;
            }
        }
        return validationOutput;
    }
    return {
        field: validateField
    };
};

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === "object") {
        // CommonJS
        module.exports = factory();
    } else {
        // running in browser
        root.latinize = factory();
    }
})(this, function() {
    function latinize(str) {
        return str.replace(/[^A-Za-z0-9]/g, function(x) {
            return latinize.characters[x] || x;
        });
    }
    latinize.characters = {
        "á": "a",
        "ă": "a",
        "ắ": "a",
        "ặ": "a",
        "ằ": "a",
        "ẳ": "a",
        "ẵ": "a",
        "ǎ": "a",
        "â": "a",
        "ấ": "a",
        "ậ": "a",
        "ầ": "a",
        "ẩ": "a",
        "ẫ": "a",
        "ä": "a",
        "ǟ": "a",
        "ȧ": "a",
        "ǡ": "a",
        "ạ": "a",
        "ȁ": "a",
        "à": "a",
        "ả": "a",
        "ȃ": "a",
        "ā": "a",
        "ą": "a",
        "ᶏ": "a",
        "ẚ": "a",
        "å": "a",
        "ǻ": "a",
        "ḁ": "a",
        "ⱥ": "a",
        "ã": "a",
        "ꜳ": "aa",
        "æ": "ae",
        "ǽ": "ae",
        "ǣ": "ae",
        "ꜵ": "ao",
        "ꜷ": "au",
        "ꜹ": "av",
        "ꜻ": "av",
        "ꜽ": "ay",
        "ḃ": "b",
        "ḅ": "b",
        "ɓ": "b",
        "ḇ": "b",
        "ᵬ": "b",
        "ᶀ": "b",
        "ƀ": "b",
        "ƃ": "b",
        "ɵ": "o",
        "ć": "c",
        "č": "c",
        "ç": "c",
        "ḉ": "c",
        "ĉ": "c",
        "ɕ": "c",
        "ċ": "c",
        "ƈ": "c",
        "ȼ": "c",
        "ď": "d",
        "ḑ": "d",
        "ḓ": "d",
        "ȡ": "d",
        "ḋ": "d",
        "ḍ": "d",
        "ɗ": "d",
        "ᶑ": "d",
        "ḏ": "d",
        "ᵭ": "d",
        "ᶁ": "d",
        "đ": "d",
        "ɖ": "d",
        "ƌ": "d",
        "ı": "i",
        "ȷ": "j",
        "ɟ": "j",
        "ʄ": "j",
        "ǳ": "dz",
        "ǆ": "dz",
        "é": "e",
        "ĕ": "e",
        "ě": "e",
        "ȩ": "e",
        "ḝ": "e",
        "ê": "e",
        "ế": "e",
        "ệ": "e",
        "ề": "e",
        "ể": "e",
        "ễ": "e",
        "ḙ": "e",
        "ë": "e",
        "ė": "e",
        "ẹ": "e",
        "ȅ": "e",
        "è": "e",
        "ẻ": "e",
        "ȇ": "e",
        "ē": "e",
        "ḗ": "e",
        "ḕ": "e",
        "ⱸ": "e",
        "ę": "e",
        "ᶒ": "e",
        "ɇ": "e",
        "ẽ": "e",
        "ḛ": "e",
        "ꝫ": "et",
        "ḟ": "f",
        "ƒ": "f",
        "ᵮ": "f",
        "ᶂ": "f",
        "ǵ": "g",
        "ğ": "g",
        "ǧ": "g",
        "ģ": "g",
        "ĝ": "g",
        "ġ": "g",
        "ɠ": "g",
        "ḡ": "g",
        "ᶃ": "g",
        "ǥ": "g",
        "ḫ": "h",
        "ȟ": "h",
        "ḩ": "h",
        "ĥ": "h",
        "ⱨ": "h",
        "ḧ": "h",
        "ḣ": "h",
        "ḥ": "h",
        "ɦ": "h",
        "ẖ": "h",
        "ħ": "h",
        "ƕ": "hv",
        "í": "i",
        "ĭ": "i",
        "ǐ": "i",
        "î": "i",
        "ï": "i",
        "ḯ": "i",
        "ị": "i",
        "ȉ": "i",
        "ì": "i",
        "ỉ": "i",
        "ȋ": "i",
        "ī": "i",
        "į": "i",
        "ᶖ": "i",
        "ɨ": "i",
        "ĩ": "i",
        "ḭ": "i",
        "ꝺ": "d",
        "ꝼ": "f",
        "ᵹ": "g",
        "ꞃ": "r",
        "ꞅ": "s",
        "ꞇ": "t",
        "ꝭ": "is",
        "ǰ": "j",
        "ĵ": "j",
        "ʝ": "j",
        "ɉ": "j",
        "ḱ": "k",
        "ǩ": "k",
        "ķ": "k",
        "ⱪ": "k",
        "ꝃ": "k",
        "ḳ": "k",
        "ƙ": "k",
        "ḵ": "k",
        "ᶄ": "k",
        "ꝁ": "k",
        "ꝅ": "k",
        "ĺ": "l",
        "ƚ": "l",
        "ɬ": "l",
        "ľ": "l",
        "ļ": "l",
        "ḽ": "l",
        "ȴ": "l",
        "ḷ": "l",
        "ḹ": "l",
        "ⱡ": "l",
        "ꝉ": "l",
        "ḻ": "l",
        "ŀ": "l",
        "ɫ": "l",
        "ᶅ": "l",
        "ɭ": "l",
        "ł": "l",
        "ǉ": "lj",
        "ſ": "s",
        "ẜ": "s",
        "ẛ": "s",
        "ẝ": "s",
        "ḿ": "m",
        "ṁ": "m",
        "ṃ": "m",
        "ɱ": "m",
        "ᵯ": "m",
        "ᶆ": "m",
        "ń": "n",
        "ň": "n",
        "ņ": "n",
        "ṋ": "n",
        "ȵ": "n",
        "ṅ": "n",
        "ṇ": "n",
        "ǹ": "n",
        "ɲ": "n",
        "ṉ": "n",
        "ƞ": "n",
        "ᵰ": "n",
        "ᶇ": "n",
        "ɳ": "n",
        "ñ": "n",
        "ǌ": "nj",
        "ó": "o",
        "ŏ": "o",
        "ǒ": "o",
        "ô": "o",
        "ố": "o",
        "ộ": "o",
        "ồ": "o",
        "ổ": "o",
        "ỗ": "o",
        "ö": "o",
        "ȫ": "o",
        "ȯ": "o",
        "ȱ": "o",
        "ọ": "o",
        "ő": "o",
        "ȍ": "o",
        "ò": "o",
        "ỏ": "o",
        "ơ": "o",
        "ớ": "o",
        "ợ": "o",
        "ờ": "o",
        "ở": "o",
        "ỡ": "o",
        "ȏ": "o",
        "ꝋ": "o",
        "ꝍ": "o",
        "ⱺ": "o",
        "ō": "o",
        "ṓ": "o",
        "ṑ": "o",
        "ǫ": "o",
        "ǭ": "o",
        "ø": "o",
        "ǿ": "o",
        "õ": "o",
        "ṍ": "o",
        "ṏ": "o",
        "ȭ": "o",
        "ƣ": "oi",
        "ꝏ": "oo",
        "ɛ": "e",
        "ᶓ": "e",
        "ɔ": "o",
        "ᶗ": "o",
        "ȣ": "ou",
        "ṕ": "p",
        "ṗ": "p",
        "ꝓ": "p",
        "ƥ": "p",
        "ᵱ": "p",
        "ᶈ": "p",
        "ꝕ": "p",
        "ᵽ": "p",
        "ꝑ": "p",
        "ꝙ": "q",
        "ʠ": "q",
        "ɋ": "q",
        "ꝗ": "q",
        "ŕ": "r",
        "ř": "r",
        "ŗ": "r",
        "ṙ": "r",
        "ṛ": "r",
        "ṝ": "r",
        "ȑ": "r",
        "ɾ": "r",
        "ᵳ": "r",
        "ȓ": "r",
        "ṟ": "r",
        "ɼ": "r",
        "ᵲ": "r",
        "ᶉ": "r",
        "ɍ": "r",
        "ɽ": "r",
        "ↄ": "c",
        "ꜿ": "c",
        "ɘ": "e",
        "ɿ": "r",
        "ś": "s",
        "ṥ": "s",
        "š": "s",
        "ṧ": "s",
        "ş": "s",
        "ŝ": "s",
        "ș": "s",
        "ṡ": "s",
        "ṣ": "s",
        "ṩ": "s",
        "ʂ": "s",
        "ᵴ": "s",
        "ᶊ": "s",
        "ȿ": "s",
        "ɡ": "g",
        "ᴑ": "o",
        "ᴓ": "o",
        "ᴝ": "u",
        "ť": "t",
        "ţ": "t",
        "ṱ": "t",
        "ț": "t",
        "ȶ": "t",
        "ẗ": "t",
        "ⱦ": "t",
        "ṫ": "t",
        "ṭ": "t",
        "ƭ": "t",
        "ṯ": "t",
        "ᵵ": "t",
        "ƫ": "t",
        "ʈ": "t",
        "ŧ": "t",
        "ᵺ": "th",
        "ɐ": "a",
        "ᴂ": "ae",
        "ǝ": "e",
        "ᵷ": "g",
        "ɥ": "h",
        "ʮ": "h",
        "ʯ": "h",
        "ᴉ": "i",
        "ʞ": "k",
        "ꞁ": "l",
        "ɯ": "m",
        "ɰ": "m",
        "ᴔ": "oe",
        "ɹ": "r",
        "ɻ": "r",
        "ɺ": "r",
        "ⱹ": "r",
        "ʇ": "t",
        "ʌ": "v",
        "ʍ": "w",
        "ʎ": "y",
        "ꜩ": "tz",
        "ú": "u",
        "ŭ": "u",
        "ǔ": "u",
        "û": "u",
        "ṷ": "u",
        "ü": "u",
        "ǘ": "u",
        "ǚ": "u",
        "ǜ": "u",
        "ǖ": "u",
        "ṳ": "u",
        "ụ": "u",
        "ű": "u",
        "ȕ": "u",
        "ù": "u",
        "ủ": "u",
        "ư": "u",
        "ứ": "u",
        "ự": "u",
        "ừ": "u",
        "ử": "u",
        "ữ": "u",
        "ȗ": "u",
        "ū": "u",
        "ṻ": "u",
        "ų": "u",
        "ᶙ": "u",
        "ů": "u",
        "ũ": "u",
        "ṹ": "u",
        "ṵ": "u",
        "ᵫ": "ue",
        "ꝸ": "um",
        "ⱴ": "v",
        "ꝟ": "v",
        "ṿ": "v",
        "ʋ": "v",
        "ᶌ": "v",
        "ⱱ": "v",
        "ṽ": "v",
        "ꝡ": "vy",
        "ẃ": "w",
        "ŵ": "w",
        "ẅ": "w",
        "ẇ": "w",
        "ẉ": "w",
        "ẁ": "w",
        "ⱳ": "w",
        "ẘ": "w",
        "ẍ": "x",
        "ẋ": "x",
        "ᶍ": "x",
        "ý": "y",
        "ŷ": "y",
        "ÿ": "y",
        "ẏ": "y",
        "ỵ": "y",
        "ỳ": "y",
        "ƴ": "y",
        "ỷ": "y",
        "ỿ": "y",
        "ȳ": "y",
        "ẙ": "y",
        "ɏ": "y",
        "ỹ": "y",
        "ź": "z",
        "ž": "z",
        "ẑ": "z",
        "ʑ": "z",
        "ⱬ": "z",
        "ż": "z",
        "ẓ": "z",
        "ȥ": "z",
        "ẕ": "z",
        "ᵶ": "z",
        "ᶎ": "z",
        "ʐ": "z",
        "ƶ": "z",
        "ɀ": "z",
        "ﬀ": "ff",
        "ﬃ": "ffi",
        "ﬄ": "ffl",
        "ﬁ": "fi",
        "ﬂ": "fl",
        "ĳ": "ij",
        "œ": "oe",
        "ﬆ": "st",
        "ₐ": "a",
        "ₑ": "e",
        "ᵢ": "i",
        "ⱼ": "j",
        "ₒ": "o",
        "ᵣ": "r",
        "ᵤ": "u",
        "ᵥ": "v",
        "ₓ": "x"
    };
    return latinize;
});

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*global define: false*/
(function defineMustache(global, factory) {
    if (typeof exports === "object" && exports) {
        factory(exports);
    } else if (typeof define === "function" && define.amd) {
        define([ "exports" ], factory);
    } else {
        factory(global.Mustache = {});
    }
})(this, function mustacheFactory(mustache) {
    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === "[object Array]";
    };
    function isFunction(object) {
        return typeof object === "function";
    }
    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }
    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    /**
	 * Breaks up the given `template` string into a tree of tokens. If the `tags`
	 * argument is given here it must be an array with two string values: the
	 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	 * course, the default is to use mustaches (i.e. mustache.tags).
	 *
	 * A token is an array with at least 4 elements. The first element is the
	 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	 * all text that appears outside a symbol this element is "text".
	 *
	 * The second element of a token is its "value". For mustache tags this is
	 * whatever else was inside the tag besides the opening symbol. For text tokens
	 * this is the text itself.
	 *
	 * The third and fourth elements of the token are the start and end indices,
	 * respectively, of the token in the original template.
	 *
	 * Tokens that are the root node of a subtree contain two more elements: 1) an
	 * array of tokens in the subtree and 2) the index in the original template at
	 * which the closing tag for that section begins.
	 */
    function parseTemplate(template, tags) {
        if (!template) return [];
        var sections = [];
        // Stack to hold section tokens
        var tokens = [];
        // Buffer to hold the tokens
        var spaces = [];
        // Indices of whitespace tokens on the current line
        var hasTag = false;
        // Is there a {{tag}} on the current line?
        var nonSpace = false;
        // Is there a non-space char on the current line?
        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
            if (hasTag && !nonSpace) {
                while (spaces.length) delete tokens[spaces.pop()];
            } else {
                spaces = [];
            }
            hasTag = false;
            nonSpace = false;
        }
        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === "string") tagsToCompile = tagsToCompile.split(spaceRe, 2);
            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error("Invalid tags: " + tagsToCompile);
            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
            closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
        }
        compileTags(tags || mustache.tags);
        var scanner = new Scanner(template);
        var start, type, value, chr, token, openSection;
        while (!scanner.eos()) {
            start = scanner.pos;
            // Match any text between tags.
            value = scanner.scanUntil(openingTagRe);
            if (value) {
                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                    chr = value.charAt(i);
                    if (isWhitespace(chr)) {
                        spaces.push(tokens.length);
                    } else {
                        nonSpace = true;
                    }
                    tokens.push([ "text", chr, start, start + 1 ]);
                    start += 1;
                    // Check for whitespace on the current line.
                    if (chr === "\n") stripSpace();
                }
            }
            // Match the opening tag.
            if (!scanner.scan(openingTagRe)) break;
            hasTag = true;
            // Get the tag type.
            type = scanner.scan(tagRe) || "name";
            scanner.scan(whiteRe);
            // Get the tag value.
            if (type === "=") {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === "{") {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = "&";
            } else {
                value = scanner.scanUntil(closingTagRe);
            }
            // Match the closing tag.
            if (!scanner.scan(closingTagRe)) throw new Error("Unclosed tag at " + scanner.pos);
            token = [ type, value, start, scanner.pos ];
            tokens.push(token);
            if (type === "#" || type === "^") {
                sections.push(token);
            } else if (type === "/") {
                // Check section nesting.
                openSection = sections.pop();
                if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
                if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === "name" || type === "{" || type === "&") {
                nonSpace = true;
            } else if (type === "=") {
                // Set the tags for the next time around.
                compileTags(value);
            }
        }
        // Make sure there are no open sections when we're done.
        openSection = sections.pop();
        if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
        return nestTokens(squashTokens(tokens));
    }
    /**
	 * Combines the values of consecutive text tokens in the given `tokens` array
	 * to a single token.
	 */
    function squashTokens(tokens) {
        var squashedTokens = [];
        var token, lastToken;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            if (token) {
                if (token[0] === "text" && lastToken && lastToken[0] === "text") {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }
        return squashedTokens;
    }
    /**
	 * Forms the given array of `tokens` into a nested tree structure where
	 * tokens that represent a section have two additional items: 1) an array of
	 * all tokens that appear in that section and 2) the index in the original
	 * template that represents the end of that section.
	 */
    function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];
        var token, section;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            switch (token[0]) {
              case "#":
              case "^":
                collector.push(token);
                sections.push(token);
                collector = token[4] = [];
                break;

              case "/":
                section = sections.pop();
                section[5] = token[2];
                collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                break;

              default:
                collector.push(token);
            }
        }
        return nestedTokens;
    }
    /**
	 * A simple string scanner that is used by the template parser to find
	 * tokens in template strings.
	 */
    function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }
    /**
	 * Returns `true` if the tail is empty (end of string).
	 */
    Scanner.prototype.eos = function eos() {
        return this.tail === "";
    };
    /**
	 * Tries to match the given regular expression at the current position.
	 * Returns the matched text if it can match, the empty string otherwise.
	 */
    Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);
        if (!match || match.index !== 0) return "";
        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
    };
    /**
	 * Skips all text until the given regular expression can be matched. Returns
	 * the skipped string, which is the entire tail if no match can be made.
	 */
    Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;
        switch (index) {
          case -1:
            match = this.tail;
            this.tail = "";
            break;

          case 0:
            match = "";
            break;

          default:
            match = this.tail.substring(0, index);
            this.tail = this.tail.substring(index);
        }
        this.pos += match.length;
        return match;
    };
    /**
	 * Represents a rendering context by wrapping a view object and
	 * maintaining a reference to the parent context.
	 */
    function Context(view, parentContext) {
        this.view = view;
        this.cache = {
            ".": this.view
        };
        this.parent = parentContext;
    }
    /**
	 * Creates a new context using the given view with this context
	 * as the parent.
	 */
    Context.prototype.push = function push(view) {
        return new Context(view, this);
    };
    /**
	 * Returns the value of the given name in this context, traversing
	 * up the context hierarchy if the value is absent in this context's view.
	 */
    Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;
        var value;
        if (name in cache) {
            value = cache[name];
        } else {
            var context = this, names, index, lookupHit = false;
            while (context) {
                if (name.indexOf(".") > 0) {
                    value = context.view;
                    names = name.split(".");
                    index = 0;
                    /**
					 * Using the dot notion path in `name`, we descend through the
					 * nested objects.
					 *
					 * To be certain that the lookup has been successful, we have to
					 * check if the last object in the path actually has the property
					 * we are looking for. We store the result in `lookupHit`.
					 *
					 * This is specially necessary for when the value has been set to
					 * `undefined` and we want to avoid looking up parent contexts.
					 **/
                    while (value != null && index < names.length) {
                        if (index === names.length - 1 && value != null) lookupHit = typeof value === "object" && value.hasOwnProperty(names[index]);
                        value = value[names[index++]];
                    }
                } else if (context.view != null && typeof context.view === "object") {
                    value = context.view[name];
                    lookupHit = context.view.hasOwnProperty(name);
                }
                if (lookupHit) break;
                context = context.parent;
            }
            cache[name] = value;
        }
        if (isFunction(value)) value = value.call(this.view);
        return value;
    };
    /**
	 * A Writer knows how to take a stream of tokens and render them to a
	 * string, given a context. It also maintains a cache of templates to
	 * avoid the need to parse the same template twice.
	 */
    function Writer() {
        this.cache = {};
    }
    /**
	 * Clears all cached templates in this writer.
	 */
    Writer.prototype.clearCache = function clearCache() {
        this.cache = {};
    };
    /**
	 * Parses and caches the given `template` and returns the array of tokens
	 * that is generated from the parse.
	 */
    Writer.prototype.parse = function parse(template, tags) {
        var cache = this.cache;
        var tokens = cache[template];
        if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);
        return tokens;
    };
    /**
	 * High-level method that is used to render the given `template` with
	 * the given `view`.
	 *
	 * The optional `partials` argument may be an object that contains the
	 * names and templates of partials that are used in the template. It may
	 * also be a function that is used to load partial templates on the fly
	 * that takes a single argument: the name of the partial.
	 */
    Writer.prototype.render = function render(template, view, partials) {
        var tokens = this.parse(template);
        var context = view instanceof Context ? view : new Context(view);
        return this.renderTokens(tokens, context, partials, template);
    };
    /**
	 * Low-level method that renders the given array of `tokens` using
	 * the given `context` and `partials`.
	 *
	 * Note: The `originalTemplate` is only ever used to extract the portion
	 * of the original template that was contained in a higher-order section.
	 * If the template doesn't use higher-order sections, this argument may
	 * be omitted.
	 */
    Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
        var buffer = "";
        var token, symbol, value;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = undefined;
            token = tokens[i];
            symbol = token[0];
            if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate); else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate); else if (symbol === ">") value = this.renderPartial(token, context, partials, originalTemplate); else if (symbol === "&") value = this.unescapedValue(token, context); else if (symbol === "name") value = this.escapedValue(token, context); else if (symbol === "text") value = this.rawValue(token);
            if (value !== undefined) buffer += value;
        }
        return buffer;
    };
    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
        var self = this;
        var buffer = "";
        var value = context.lookup(token[1]);
        // This function is used to render an arbitrary template
        // in the current context by higher-order sections.
        function subRender(template) {
            return self.render(template, context, partials);
        }
        if (!value) return;
        if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
            }
        } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
            if (typeof originalTemplate !== "string") throw new Error("Cannot use higher-order sections without the original template");
            // Extract the portion of the original template that the section contains.
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (value != null) buffer += value;
        } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }
        return buffer;
    };
    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
        var value = context.lookup(token[1]);
        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
    };
    Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
        if (!partials) return;
        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
    };
    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null) return value;
    };
    Writer.prototype.escapedValue = function escapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null) return mustache.escape(value);
    };
    Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };
    mustache.name = "mustache.js";
    mustache.version = "2.0.0";
    mustache.tags = [ "{{", "}}" ];
    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();
    /**
	 * Clears all cached templates in the default writer.
	 */
    mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };
    /**
	 * Parses and caches the given template in the default writer and returns the
	 * array of tokens it contains. Doing this ahead of time avoids the need to
	 * parse templates on the fly as they are rendered.
	 */
    mustache.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
    };
    /**
	 * Renders the `template` with the given `view` and `partials` using the
	 * default writer.
	 */
    mustache.render = function render(template, view, partials) {
        return defaultWriter.render(template, view, partials);
    };
    // This is here for backwards compatibility with 0.4.x.,
    /*eslint-disable */
    // eslint wants camel cased function name
    mustache.to_html = function to_html(template, view, partials, send) {
        /*eslint-enable*/
        var result = mustache.render(template, view, partials);
        if (isFunction(send)) {
            send(result);
        } else {
            return result;
        }
    };
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;
    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
});

(function() {
    var root = this;
    /*!
 * Shifty Core
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */
    var Tweenable = function() {
        "use strict";
        // Aliases that get defined later in this function
        var formula;
        // CONSTANTS
        var DEFAULT_SCHEDULE_FUNCTION;
        var DEFAULT_EASING = "linear";
        var DEFAULT_DURATION = 500;
        var UPDATE_TIME = 1e3 / 60;
        var _now = Date.now ? Date.now : function() {
            return +new Date();
        };
        var now = typeof SHIFTY_DEBUG_NOW !== "undefined" ? SHIFTY_DEBUG_NOW : _now;
        if (typeof window !== "undefined") {
            // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
            // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
            DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame || setTimeout;
        } else {
            DEFAULT_SCHEDULE_FUNCTION = setTimeout;
        }
        function noop() {}
        /*!
	 * Handy shortcut for doing a for-in loop. This is not a "normal" each
	 * function, it is optimized for Shifty.  The iterator function only receives
	 * the property name, not the value.
	 * @param {Object} obj
	 * @param {Function(string)} fn
	 */
        function each(obj, fn) {
            var key;
            for (key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    fn(key);
                }
            }
        }
        /*!
	 * Perform a shallow copy of Object properties.
	 * @param {Object} targetObject The object to copy into
	 * @param {Object} srcObject The object to copy from
	 * @return {Object} A reference to the augmented `targetObj` Object
	 */
        function shallowCopy(targetObj, srcObj) {
            each(srcObj, function(prop) {
                targetObj[prop] = srcObj[prop];
            });
            return targetObj;
        }
        /*!
	 * Copies each property from src onto target, but only if the property to
	 * copy to target is undefined.
	 * @param {Object} target Missing properties in this Object are filled in
	 * @param {Object} src
	 */
        function defaults(target, src) {
            each(src, function(prop) {
                if (typeof target[prop] === "undefined") {
                    target[prop] = src[prop];
                }
            });
        }
        /*!
	 * Calculates the interpolated tween values of an Object for a given
	 * timestamp.
	 * @param {Number} forPosition The position to compute the state for.
	 * @param {Object} currentState Current state properties.
	 * @param {Object} originalState: The original state properties the Object is
	 * tweening from.
	 * @param {Object} targetState: The destination state properties the Object
	 * is tweening to.
	 * @param {number} duration: The length of the tween in milliseconds.
	 * @param {number} timestamp: The UNIX epoch time at which the tween began.
	 * @param {Object} easing: This Object's keys must correspond to the keys in
	 * targetState.
	 */
        function tweenProps(forPosition, currentState, originalState, targetState, duration, timestamp, easing) {
            var normalizedPosition = forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;
            var prop;
            var easingObjectProp;
            var easingFn;
            for (prop in currentState) {
                if (currentState.hasOwnProperty(prop)) {
                    easingObjectProp = easing[prop];
                    easingFn = typeof easingObjectProp === "function" ? easingObjectProp : formula[easingObjectProp];
                    currentState[prop] = tweenProp(originalState[prop], targetState[prop], easingFn, normalizedPosition);
                }
            }
            return currentState;
        }
        /*!
	 * Tweens a single property.
	 * @param {number} start The value that the tween started from.
	 * @param {number} end The value that the tween should end at.
	 * @param {Function} easingFunc The easing curve to apply to the tween.
	 * @param {number} position The normalized position (between 0.0 and 1.0) to
	 * calculate the midpoint of 'start' and 'end' against.
	 * @return {number} The tweened value.
	 */
        function tweenProp(start, end, easingFunc, position) {
            return start + (end - start) * easingFunc(position);
        }
        /*!
	 * Applies a filter to Tweenable instance.
	 * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
	 * upon.
	 * @param {String} filterName The name of the filter to apply.
	 */
        function applyFilter(tweenable, filterName) {
            var filters = Tweenable.prototype.filter;
            var args = tweenable._filterArgs;
            each(filters, function(name) {
                if (typeof filters[name][filterName] !== "undefined") {
                    filters[name][filterName].apply(tweenable, args);
                }
            });
        }
        var timeoutHandler_endTime;
        var timeoutHandler_currentTime;
        var timeoutHandler_isEnded;
        var timeoutHandler_offset;
        /*!
	 * Handles the update logic for one step of a tween.
	 * @param {Tweenable} tweenable
	 * @param {number} timestamp
	 * @param {number} delay
	 * @param {number} duration
	 * @param {Object} currentState
	 * @param {Object} originalState
	 * @param {Object} targetState
	 * @param {Object} easing
	 * @param {Function(Object, *, number)} step
	 * @param {Function(Function,number)}} schedule
	 * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
	 * Tweenable#seek.
	 */
        function timeoutHandler(tweenable, timestamp, delay, duration, currentState, originalState, targetState, easing, step, schedule, opt_currentTimeOverride) {
            timeoutHandler_endTime = timestamp + delay + duration;
            timeoutHandler_currentTime = Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);
            timeoutHandler_isEnded = timeoutHandler_currentTime >= timeoutHandler_endTime;
            timeoutHandler_offset = duration - (timeoutHandler_endTime - timeoutHandler_currentTime);
            if (tweenable.isPlaying() && !timeoutHandler_isEnded) {
                tweenable._scheduleId = schedule(tweenable._timeoutHandler, UPDATE_TIME);
                applyFilter(tweenable, "beforeTween");
                // If the animation has not yet reached the start point (e.g., there was
                // delay that has not yet completed), just interpolate the starting
                // position of the tween.
                if (timeoutHandler_currentTime < timestamp + delay) {
                    tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
                } else {
                    tweenProps(timeoutHandler_currentTime, currentState, originalState, targetState, duration, timestamp + delay, easing);
                }
                applyFilter(tweenable, "afterTween");
                step(currentState, tweenable._attachment, timeoutHandler_offset);
            } else if (tweenable.isPlaying() && timeoutHandler_isEnded) {
                step(targetState, tweenable._attachment, timeoutHandler_offset);
                tweenable.stop(true);
            }
        }
        /*!
	 * Creates a usable easing Object from a string, a function or another easing
	 * Object.  If `easing` is an Object, then this function clones it and fills
	 * in the missing properties with `"linear"`.
	 * @param {Object.<string|Function>} fromTweenParams
	 * @param {Object|string|Function} easing
	 * @return {Object.<string|Function>}
	 */
        function composeEasingObject(fromTweenParams, easing) {
            var composedEasing = {};
            var typeofEasing = typeof easing;
            if (typeofEasing === "string" || typeofEasing === "function") {
                each(fromTweenParams, function(prop) {
                    composedEasing[prop] = easing;
                });
            } else {
                each(fromTweenParams, function(prop) {
                    if (!composedEasing[prop]) {
                        composedEasing[prop] = easing[prop] || DEFAULT_EASING;
                    }
                });
            }
            return composedEasing;
        }
        /**
	 * Tweenable constructor.
	 * @class Tweenable
	 * @param {Object=} opt_initialState The values that the initial tween should
	 * start at if a `from` object is not provided to `{{#crossLink
	 * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
	 * "Tweenable/setConfig:method"}}{{/crossLink}}`.
	 * @param {Object=} opt_config Configuration object to be passed to
	 * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	 * @module Tweenable
	 * @constructor
	 */
        function Tweenable(opt_initialState, opt_config) {
            this._currentState = opt_initialState || {};
            this._configured = false;
            this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;
            // To prevent unnecessary calls to setConfig do not set default
            // configuration here.  Only set default configuration immediately before
            // tweening if none has been set.
            if (typeof opt_config !== "undefined") {
                this.setConfig(opt_config);
            }
        }
        /**
	 * Configure and start a tween.
	 * @method tween
	 * @param {Object=} opt_config Configuration object to be passed to
	 * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	 * @chainable
	 */
        Tweenable.prototype.tween = function(opt_config) {
            if (this._isTweening) {
                return this;
            }
            // Only set default config if no configuration has been set previously and
            // none is provided now.
            if (opt_config !== undefined || !this._configured) {
                this.setConfig(opt_config);
            }
            this._timestamp = now();
            this._start(this.get(), this._attachment);
            return this.resume();
        };
        /**
	 * Configure a tween that will start at some point in the future.
	 *
	 * @method setConfig
	 * @param {Object} config The following values are valid:
	 * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
	 *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
	 * - __to__ (_Object=_): Ending position.
	 * - __duration__ (_number=_): How many milliseconds to animate for.
	 * - __delay__ (_delay=_): How many milliseconds to wait before starting the
	 *   tween.
	 * - __start__ (_Function(Object, *)_): Function to execute when the tween
	 *   begins.  Receives the state of the tween as the first parameter and
	 *   `attachment` as the second parameter.
	 * - __step__ (_Function(Object, *, number)_): Function to execute on every
	 *   tick.  Receives `{{#crossLink
	 *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
	 *   `attachment` as the second parameter, and the time elapsed since the
	 *   start of the tween as the third. This function is not called on the
	 *   final step of the animation, but `finish` is.
	 * - __finish__ (_Function(Object, *)_): Function to execute upon tween
	 *   completion.  Receives the state of the tween as the first parameter and
	 *   `attachment` as the second parameter.
	 * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
	 *   name(s) or function(s) to use for the tween.
	 * - __attachment__ (_*_): Cached value that is passed to the
	 *   `step`/`start`/`finish` methods.
	 * @chainable
	 */
        Tweenable.prototype.setConfig = function(config) {
            config = config || {};
            this._configured = true;
            // Attach something to this Tweenable instance (e.g.: a DOM element, an
            // object, a string, etc.);
            this._attachment = config.attachment;
            // Init the internal state
            this._pausedAtTime = null;
            this._scheduleId = null;
            this._delay = config.delay || 0;
            this._start = config.start || noop;
            this._step = config.step || noop;
            this._finish = config.finish || noop;
            this._duration = config.duration || DEFAULT_DURATION;
            this._currentState = shallowCopy({}, config.from) || this.get();
            this._originalState = this.get();
            this._targetState = shallowCopy({}, config.to) || this.get();
            var self = this;
            this._timeoutHandler = function() {
                timeoutHandler(self, self._timestamp, self._delay, self._duration, self._currentState, self._originalState, self._targetState, self._easing, self._step, self._scheduleFunction);
            };
            // Aliases used below
            var currentState = this._currentState;
            var targetState = this._targetState;
            // Ensure that there is always something to tween to.
            defaults(targetState, currentState);
            this._easing = composeEasingObject(currentState, config.easing || DEFAULT_EASING);
            this._filterArgs = [ currentState, this._originalState, targetState, this._easing ];
            applyFilter(this, "tweenCreated");
            return this;
        };
        /**
	 * @method get
	 * @return {Object} The current state.
	 */
        Tweenable.prototype.get = function() {
            return shallowCopy({}, this._currentState);
        };
        /**
	 * @method set
	 * @param {Object} state The current state.
	 */
        Tweenable.prototype.set = function(state) {
            this._currentState = state;
        };
        /**
	 * Pause a tween.  Paused tweens can be resumed from the point at which they
	 * were paused.  This is different from `{{#crossLink
	 * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
	 * causes a tween to start over when it is resumed.
	 * @method pause
	 * @chainable
	 */
        Tweenable.prototype.pause = function() {
            this._pausedAtTime = now();
            this._isPaused = true;
            return this;
        };
        /**
	 * Resume a paused tween.
	 * @method resume
	 * @chainable
	 */
        Tweenable.prototype.resume = function() {
            if (this._isPaused) {
                this._timestamp += now() - this._pausedAtTime;
            }
            this._isPaused = false;
            this._isTweening = true;
            this._timeoutHandler();
            return this;
        };
        /**
	 * Move the state of the animation to a specific point in the tween's
	 * timeline.  If the animation is not running, this will cause the `step`
	 * handlers to be called.
	 * @method seek
	 * @param {millisecond} millisecond The millisecond of the animation to seek
	 * to.  This must not be less than `0`.
	 * @chainable
	 */
        Tweenable.prototype.seek = function(millisecond) {
            millisecond = Math.max(millisecond, 0);
            var currentTime = now();
            if (this._timestamp + millisecond === 0) {
                return this;
            }
            this._timestamp = currentTime - millisecond;
            if (!this.isPlaying()) {
                this._isTweening = true;
                this._isPaused = false;
                // If the animation is not running, call timeoutHandler to make sure that
                // any step handlers are run.
                timeoutHandler(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, currentTime);
                this.pause();
            }
            return this;
        };
        /**
	 * Stops and cancels a tween.
	 * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
	 * its current state, and the `finish` handler is not invoked.  If `true`,
	 * the tweened object's values are instantly set to the target values, and
	 * `finish` is invoked.
	 * @method stop
	 * @chainable
	 */
        Tweenable.prototype.stop = function(gotoEnd) {
            this._isTweening = false;
            this._isPaused = false;
            this._timeoutHandler = noop;
            (root.cancelAnimationFrame || root.webkitCancelAnimationFrame || root.oCancelAnimationFrame || root.msCancelAnimationFrame || root.mozCancelRequestAnimationFrame || root.clearTimeout)(this._scheduleId);
            if (gotoEnd) {
                applyFilter(this, "beforeTween");
                tweenProps(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing);
                applyFilter(this, "afterTween");
                applyFilter(this, "afterTweenEnd");
                this._finish.call(this, this._currentState, this._attachment);
            }
            return this;
        };
        /**
	 * @method isPlaying
	 * @return {boolean} Whether or not a tween is running.
	 */
        Tweenable.prototype.isPlaying = function() {
            return this._isTweening && !this._isPaused;
        };
        /**
	 * Set a custom schedule function.
	 *
	 * If a custom function is not set,
	 * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
	 * is used if available, otherwise
	 * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
	 * is used.
	 * @method setScheduleFunction
	 * @param {Function(Function,number)} scheduleFunction The function to be
	 * used to schedule the next frame to be rendered.
	 */
        Tweenable.prototype.setScheduleFunction = function(scheduleFunction) {
            this._scheduleFunction = scheduleFunction;
        };
        /**
	 * `delete` all "own" properties.  Call this when the `Tweenable` instance
	 * is no longer needed to free memory.
	 * @method dispose
	 */
        Tweenable.prototype.dispose = function() {
            var prop;
            for (prop in this) {
                if (this.hasOwnProperty(prop)) {
                    delete this[prop];
                }
            }
        };
        /*!
	 * Filters are used for transforming the properties of a tween at various
	 * points in a Tweenable's life cycle.  See the README for more info on this.
	 */
        Tweenable.prototype.filter = {};
        /**
	 * This object contains all of the tweens available to Shifty.  It is
	 * extensible - simply attach properties to the `Tweenable.prototype.formula`
	 * Object following the same format as `linear`.
	 *
	 * `pos` should be a normalized `number` (between 0 and 1).
	 * @property formula
	 * @type {Object(function)}
	 */
        Tweenable.prototype.formula = {
            linear: function(pos) {
                return pos;
            }
        };
        formula = Tweenable.prototype.formula;
        shallowCopy(Tweenable, {
            now: now,
            each: each,
            tweenProps: tweenProps,
            tweenProp: tweenProp,
            applyFilter: applyFilter,
            shallowCopy: shallowCopy,
            defaults: defaults,
            composeEasingObject: composeEasingObject
        });
        // `root` is provided in the intro/outro files.
        // A hook used for unit testing.
        if (typeof SHIFTY_DEBUG_NOW === "function") {
            root.timeoutHandler = timeoutHandler;
        }
        // Bootstrap Tweenable appropriately for the environment.
        if (typeof exports === "object") {
            // CommonJS
            module.exports = Tweenable;
        } else if (typeof define === "function" && define.amd) {
            // AMD
            define(function() {
                return Tweenable;
            });
        } else if (typeof root.Tweenable === "undefined") {
            // Browser: Make `Tweenable` globally accessible.
            root.Tweenable = Tweenable;
        }
        return Tweenable;
    }();
    (function() {
        Tweenable.shallowCopy(Tweenable.prototype.formula, {
            easeInQuad: function(pos) {
                return Math.pow(pos, 2);
            },
            easeOutQuad: function(pos) {
                return -(Math.pow(pos - 1, 2) - 1);
            },
            easeInOutQuad: function(pos) {
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(pos, 2);
                }
                return -.5 * ((pos -= 2) * pos - 2);
            },
            easeInCubic: function(pos) {
                return Math.pow(pos, 3);
            },
            easeOutCubic: function(pos) {
                return Math.pow(pos - 1, 3) + 1;
            },
            easeInOutCubic: function(pos) {
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(pos, 3);
                }
                return .5 * (Math.pow(pos - 2, 3) + 2);
            },
            easeInQuart: function(pos) {
                return Math.pow(pos, 4);
            },
            easeOutQuart: function(pos) {
                return -(Math.pow(pos - 1, 4) - 1);
            },
            easeInOutQuart: function(pos) {
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(pos, 4);
                }
                return -.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
            },
            easeInQuint: function(pos) {
                return Math.pow(pos, 5);
            },
            easeOutQuint: function(pos) {
                return Math.pow(pos - 1, 5) + 1;
            },
            easeInOutQuint: function(pos) {
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(pos, 5);
                }
                return .5 * (Math.pow(pos - 2, 5) + 2);
            },
            easeInSine: function(pos) {
                return -Math.cos(pos * (Math.PI / 2)) + 1;
            },
            easeOutSine: function(pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function(pos) {
                return -.5 * (Math.cos(Math.PI * pos) - 1);
            },
            easeInExpo: function(pos) {
                return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1));
            },
            easeOutExpo: function(pos) {
                return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
            },
            easeInOutExpo: function(pos) {
                if (pos === 0) {
                    return 0;
                }
                if (pos === 1) {
                    return 1;
                }
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(2, 10 * (pos - 1));
                }
                return .5 * (-Math.pow(2, -10 * --pos) + 2);
            },
            easeInCirc: function(pos) {
                return -(Math.sqrt(1 - pos * pos) - 1);
            },
            easeOutCirc: function(pos) {
                return Math.sqrt(1 - Math.pow(pos - 1, 2));
            },
            easeInOutCirc: function(pos) {
                if ((pos /= .5) < 1) {
                    return -.5 * (Math.sqrt(1 - pos * pos) - 1);
                }
                return .5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
            },
            easeOutBounce: function(pos) {
                if (pos < 1 / 2.75) {
                    return 7.5625 * pos * pos;
                } else if (pos < 2 / 2.75) {
                    return 7.5625 * (pos -= 1.5 / 2.75) * pos + .75;
                } else if (pos < 2.5 / 2.75) {
                    return 7.5625 * (pos -= 2.25 / 2.75) * pos + .9375;
                } else {
                    return 7.5625 * (pos -= 2.625 / 2.75) * pos + .984375;
                }
            },
            easeInBack: function(pos) {
                var s = 1.70158;
                return pos * pos * ((s + 1) * pos - s);
            },
            easeOutBack: function(pos) {
                var s = 1.70158;
                return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
            },
            easeInOutBack: function(pos) {
                var s = 1.70158;
                if ((pos /= .5) < 1) {
                    return .5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
                }
                return .5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
            },
            elastic: function(pos) {
                // jshint maxlen:90
                return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
            },
            swingFromTo: function(pos) {
                var s = 1.70158;
                return (pos /= .5) < 1 ? .5 * (pos * pos * (((s *= 1.525) + 1) * pos - s)) : .5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
            },
            swingFrom: function(pos) {
                var s = 1.70158;
                return pos * pos * ((s + 1) * pos - s);
            },
            swingTo: function(pos) {
                var s = 1.70158;
                return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
            },
            bounce: function(pos) {
                if (pos < 1 / 2.75) {
                    return 7.5625 * pos * pos;
                } else if (pos < 2 / 2.75) {
                    return 7.5625 * (pos -= 1.5 / 2.75) * pos + .75;
                } else if (pos < 2.5 / 2.75) {
                    return 7.5625 * (pos -= 2.25 / 2.75) * pos + .9375;
                } else {
                    return 7.5625 * (pos -= 2.625 / 2.75) * pos + .984375;
                }
            },
            bouncePast: function(pos) {
                if (pos < 1 / 2.75) {
                    return 7.5625 * pos * pos;
                } else if (pos < 2 / 2.75) {
                    return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + .75);
                } else if (pos < 2.5 / 2.75) {
                    return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + .9375);
                } else {
                    return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + .984375);
                }
            },
            easeFromTo: function(pos) {
                if ((pos /= .5) < 1) {
                    return .5 * Math.pow(pos, 4);
                }
                return -.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
            },
            easeFrom: function(pos) {
                return Math.pow(pos, 4);
            },
            easeTo: function(pos) {
                return Math.pow(pos, .25);
            }
        });
    })();
    (function() {
        // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
        function cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
            var ax = 0, bx = 0, cx = 0, ay = 0, by = 0, cy = 0;
            function sampleCurveX(t) {
                return ((ax * t + bx) * t + cx) * t;
            }
            function sampleCurveY(t) {
                return ((ay * t + by) * t + cy) * t;
            }
            function sampleCurveDerivativeX(t) {
                return (3 * ax * t + 2 * bx) * t + cx;
            }
            function solveEpsilon(duration) {
                return 1 / (200 * duration);
            }
            function solve(x, epsilon) {
                return sampleCurveY(solveCurveX(x, epsilon));
            }
            function fabs(n) {
                if (n >= 0) {
                    return n;
                } else {
                    return 0 - n;
                }
            }
            function solveCurveX(x, epsilon) {
                var t0, t1, t2, x2, d2, i;
                for (t2 = x, i = 0; i < 8; i++) {
                    x2 = sampleCurveX(t2) - x;
                    if (fabs(x2) < epsilon) {
                        return t2;
                    }
                    d2 = sampleCurveDerivativeX(t2);
                    if (fabs(d2) < 1e-6) {
                        break;
                    }
                    t2 = t2 - x2 / d2;
                }
                t0 = 0;
                t1 = 1;
                t2 = x;
                if (t2 < t0) {
                    return t0;
                }
                if (t2 > t1) {
                    return t1;
                }
                while (t0 < t1) {
                    x2 = sampleCurveX(t2);
                    if (fabs(x2 - x) < epsilon) {
                        return t2;
                    }
                    if (x > x2) {
                        t0 = t2;
                    } else {
                        t1 = t2;
                    }
                    t2 = (t1 - t0) * .5 + t0;
                }
                return t2;
            }
            cx = 3 * p1x;
            bx = 3 * (p2x - p1x) - cx;
            ax = 1 - cx - bx;
            cy = 3 * p1y;
            by = 3 * (p2y - p1y) - cy;
            ay = 1 - cy - by;
            return solve(t, solveEpsilon(duration));
        }
        /*!
	 *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
	 *
	 *  Generates a transition easing function that is compatible
	 *  with WebKit's CSS transitions `-webkit-transition-timing-function`
	 *  CSS property.
	 *
	 *  The W3C has more information about CSS3 transition timing functions:
	 *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
	 *
	 *  @param {number} x1
	 *  @param {number} y1
	 *  @param {number} x2
	 *  @param {number} y2
	 *  @return {function}
	 */
        function getCubicBezierTransition(x1, y1, x2, y2) {
            return function(pos) {
                return cubicBezierAtTime(pos, x1, y1, x2, y2, 1);
            };
        }
        // End ported code
        /**
	 * Create a Bezier easing function and attach it to `{{#crossLink
	 * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
	 * function gives you total control over the easing curve.  Matthew Lein's
	 * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
	 * the curves you can make with this function.
	 * @method setBezierFunction
	 * @param {string} name The name of the easing curve.  Overwrites the old
	 * easing function on `{{#crossLink
	 * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
	 * exists.
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} x2
	 * @param {number} y2
	 * @return {function} The easing function that was attached to
	 * Tweenable.prototype.formula.
	 */
        Tweenable.setBezierFunction = function(name, x1, y1, x2, y2) {
            var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
            cubicBezierTransition.displayName = name;
            cubicBezierTransition.x1 = x1;
            cubicBezierTransition.y1 = y1;
            cubicBezierTransition.x2 = x2;
            cubicBezierTransition.y2 = y2;
            return Tweenable.prototype.formula[name] = cubicBezierTransition;
        };
        /**
	 * `delete` an easing function from `{{#crossLink
	 * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
	 * careful with this method, as it `delete`s whatever easing formula matches
	 * `name` (which means you can delete standard Shifty easing functions).
	 * @method unsetBezierFunction
	 * @param {string} name The name of the easing function to delete.
	 * @return {function}
	 */
        Tweenable.unsetBezierFunction = function(name) {
            delete Tweenable.prototype.formula[name];
        };
    })();
    (function() {
        function getInterpolatedValues(from, current, targetState, position, easing, delay) {
            return Tweenable.tweenProps(position, current, from, targetState, 1, delay, easing);
        }
        // Fake a Tweenable and patch some internals.  This approach allows us to
        // skip uneccessary processing and object recreation, cutting down on garbage
        // collection pauses.
        var mockTweenable = new Tweenable();
        mockTweenable._filterArgs = [];
        /**
	 * Compute the midpoint of two Objects.  This method effectively calculates a
	 * specific frame of animation that `{{#crossLink
	 * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
	 * of a full tween.
	 *
	 *     var interpolatedValues = Tweenable.interpolate({
	 *       width: '100px',
	 *       opacity: 0,
	 *       color: '#fff'
	 *     }, {
	 *       width: '200px',
	 *       opacity: 1,
	 *       color: '#000'
	 *     }, 0.5);
	 *
	 *     console.log(interpolatedValues);
	 *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
	 *
	 * @static
	 * @method interpolate
	 * @param {Object} from The starting values to tween from.
	 * @param {Object} targetState The ending values to tween to.
	 * @param {number} position The normalized position value (between `0.0` and
	 * `1.0`) to interpolate the values between `from` and `to` for.  `from`
	 * represents `0` and `to` represents `1`.
	 * @param {Object.<string|Function>|string|Function} easing The easing
	 * curve(s) to calculate the midpoint against.  You can reference any easing
	 * function attached to `Tweenable.prototype.formula`, or provide the easing
	 * function(s) directly.  If omitted, this defaults to "linear".
	 * @param {number=} opt_delay Optional delay to pad the beginning of the
	 * interpolated tween with.  This increases the range of `position` from (`0`
	 * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
	 * increase all valid values of `position` to numbers between `0` and `1.5`.
	 * @return {Object}
	 */
        Tweenable.interpolate = function(from, targetState, position, easing, opt_delay) {
            var current = Tweenable.shallowCopy({}, from);
            var delay = opt_delay || 0;
            var easingObject = Tweenable.composeEasingObject(from, easing || "linear");
            mockTweenable.set({});
            // Alias and reuse the _filterArgs array instead of recreating it.
            var filterArgs = mockTweenable._filterArgs;
            filterArgs.length = 0;
            filterArgs[0] = current;
            filterArgs[1] = from;
            filterArgs[2] = targetState;
            filterArgs[3] = easingObject;
            // Any defined value transformation must be applied
            Tweenable.applyFilter(mockTweenable, "tweenCreated");
            Tweenable.applyFilter(mockTweenable, "beforeTween");
            var interpolatedValues = getInterpolatedValues(from, current, targetState, position, easingObject, delay);
            // Transform values back into their original format
            Tweenable.applyFilter(mockTweenable, "afterTween");
            return interpolatedValues;
        };
    })();
    (function(Tweenable) {
        /*!
	 * @typedef {{
	 *   formatString: string
	 *   chunkNames: Array.<string>
	 * }}
	 */
        var formatManifest;
        // CONSTANTS
        var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
        var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
        var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
        var R_RGB = new RegExp("rgb\\(" + R_UNFORMATTED_VALUES.source + /,\s*/.source + R_UNFORMATTED_VALUES.source + /,\s*/.source + R_UNFORMATTED_VALUES.source + "\\)", "g");
        var R_RGB_PREFIX = /^.*\(/;
        var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
        var VALUE_PLACEHOLDER = "VAL";
        // HELPERS
        /*!
	 * @param {Array.number} rawValues
	 * @param {string} prefix
	 *
	 * @return {Array.<string>}
	 */
        function getFormatChunksFrom(rawValues, prefix) {
            var accumulator = [];
            var rawValuesLength = rawValues.length;
            var i;
            for (i = 0; i < rawValuesLength; i++) {
                accumulator.push("_" + prefix + "_" + i);
            }
            return accumulator;
        }
        /*!
	 * @param {string} formattedString
	 *
	 * @return {string}
	 */
        function getFormatStringFrom(formattedString) {
            var chunks = formattedString.match(R_FORMAT_CHUNKS);
            if (!chunks) {
                // chunks will be null if there were no tokens to parse in
                // formattedString (for example, if formattedString is '2').  Coerce
                // chunks to be useful here.
                chunks = [ "", "" ];
            } else if (chunks.length === 1 || // ...or if the string starts with a number component (".", "-", or a
            // digit)...
            formattedString[0].match(R_NUMBER_COMPONENT)) {
                // ...prepend an empty string here to make sure that the formatted number
                // is properly replaced by VALUE_PLACEHOLDER
                chunks.unshift("");
            }
            return chunks.join(VALUE_PLACEHOLDER);
        }
        /*!
	 * Convert all hex color values within a string to an rgb string.
	 *
	 * @param {Object} stateObject
	 *
	 * @return {Object} The modified obj
	 */
        function sanitizeObjectForHexProps(stateObject) {
            Tweenable.each(stateObject, function(prop) {
                var currentProp = stateObject[prop];
                if (typeof currentProp === "string" && currentProp.match(R_HEX)) {
                    stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
                }
            });
        }
        /*!
	 * @param {string} str
	 *
	 * @return {string}
	 */
        function sanitizeHexChunksToRGB(str) {
            return filterStringChunks(R_HEX, str, convertHexToRGB);
        }
        /*!
	 * @param {string} hexString
	 *
	 * @return {string}
	 */
        function convertHexToRGB(hexString) {
            var rgbArr = hexToRGBArray(hexString);
            return "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")";
        }
        var hexToRGBArray_returnArray = [];
        /*!
	 * Convert a hexadecimal string to an array with three items, one each for
	 * the red, blue, and green decimal values.
	 *
	 * @param {string} hex A hexadecimal string.
	 *
	 * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
	 * valid string, or an Array of three 0's.
	 */
        function hexToRGBArray(hex) {
            hex = hex.replace(/#/, "");
            // If the string is a shorthand three digit hex notation, normalize it to
            // the standard six digit notation
            if (hex.length === 3) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
            hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
            hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));
            return hexToRGBArray_returnArray;
        }
        /*!
	 * Convert a base-16 number to base-10.
	 *
	 * @param {Number|String} hex The value to convert
	 *
	 * @returns {Number} The base-10 equivalent of `hex`.
	 */
        function hexToDec(hex) {
            return parseInt(hex, 16);
        }
        /*!
	 * Runs a filter operation on all chunks of a string that match a RegExp
	 *
	 * @param {RegExp} pattern
	 * @param {string} unfilteredString
	 * @param {function(string)} filter
	 *
	 * @return {string}
	 */
        function filterStringChunks(pattern, unfilteredString, filter) {
            var pattenMatches = unfilteredString.match(pattern);
            var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);
            if (pattenMatches) {
                var pattenMatchesLength = pattenMatches.length;
                var currentChunk;
                for (var i = 0; i < pattenMatchesLength; i++) {
                    currentChunk = pattenMatches.shift();
                    filteredString = filteredString.replace(VALUE_PLACEHOLDER, filter(currentChunk));
                }
            }
            return filteredString;
        }
        /*!
	 * Check for floating point values within rgb strings and rounds them.
	 *
	 * @param {string} formattedString
	 *
	 * @return {string}
	 */
        function sanitizeRGBChunks(formattedString) {
            return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
        }
        /*!
	 * @param {string} rgbChunk
	 *
	 * @return {string}
	 */
        function sanitizeRGBChunk(rgbChunk) {
            var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
            var numbersLength = numbers.length;
            var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];
            for (var i = 0; i < numbersLength; i++) {
                sanitizedString += parseInt(numbers[i], 10) + ",";
            }
            sanitizedString = sanitizedString.slice(0, -1) + ")";
            return sanitizedString;
        }
        /*!
	 * @param {Object} stateObject
	 *
	 * @return {Object} An Object of formatManifests that correspond to
	 * the string properties of stateObject
	 */
        function getFormatManifests(stateObject) {
            var manifestAccumulator = {};
            Tweenable.each(stateObject, function(prop) {
                var currentProp = stateObject[prop];
                if (typeof currentProp === "string") {
                    var rawValues = getValuesFrom(currentProp);
                    manifestAccumulator[prop] = {
                        formatString: getFormatStringFrom(currentProp),
                        chunkNames: getFormatChunksFrom(rawValues, prop)
                    };
                }
            });
            return manifestAccumulator;
        }
        /*!
	 * @param {Object} stateObject
	 * @param {Object} formatManifests
	 */
        function expandFormattedProperties(stateObject, formatManifests) {
            Tweenable.each(formatManifests, function(prop) {
                var currentProp = stateObject[prop];
                var rawValues = getValuesFrom(currentProp);
                var rawValuesLength = rawValues.length;
                for (var i = 0; i < rawValuesLength; i++) {
                    stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
                }
                delete stateObject[prop];
            });
        }
        /*!
	 * @param {Object} stateObject
	 * @param {Object} formatManifests
	 */
        function collapseFormattedProperties(stateObject, formatManifests) {
            Tweenable.each(formatManifests, function(prop) {
                var currentProp = stateObject[prop];
                var formatChunks = extractPropertyChunks(stateObject, formatManifests[prop].chunkNames);
                var valuesList = getValuesList(formatChunks, formatManifests[prop].chunkNames);
                currentProp = getFormattedValues(formatManifests[prop].formatString, valuesList);
                stateObject[prop] = sanitizeRGBChunks(currentProp);
            });
        }
        /*!
	 * @param {Object} stateObject
	 * @param {Array.<string>} chunkNames
	 *
	 * @return {Object} The extracted value chunks.
	 */
        function extractPropertyChunks(stateObject, chunkNames) {
            var extractedValues = {};
            var currentChunkName, chunkNamesLength = chunkNames.length;
            for (var i = 0; i < chunkNamesLength; i++) {
                currentChunkName = chunkNames[i];
                extractedValues[currentChunkName] = stateObject[currentChunkName];
                delete stateObject[currentChunkName];
            }
            return extractedValues;
        }
        var getValuesList_accumulator = [];
        /*!
	 * @param {Object} stateObject
	 * @param {Array.<string>} chunkNames
	 *
	 * @return {Array.<number>}
	 */
        function getValuesList(stateObject, chunkNames) {
            getValuesList_accumulator.length = 0;
            var chunkNamesLength = chunkNames.length;
            for (var i = 0; i < chunkNamesLength; i++) {
                getValuesList_accumulator.push(stateObject[chunkNames[i]]);
            }
            return getValuesList_accumulator;
        }
        /*!
	 * @param {string} formatString
	 * @param {Array.<number>} rawValues
	 *
	 * @return {string}
	 */
        function getFormattedValues(formatString, rawValues) {
            var formattedValueString = formatString;
            var rawValuesLength = rawValues.length;
            for (var i = 0; i < rawValuesLength; i++) {
                formattedValueString = formattedValueString.replace(VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
            }
            return formattedValueString;
        }
        /*!
	 * Note: It's the duty of the caller to convert the Array elements of the
	 * return value into numbers.  This is a performance optimization.
	 *
	 * @param {string} formattedString
	 *
	 * @return {Array.<string>|null}
	 */
        function getValuesFrom(formattedString) {
            return formattedString.match(R_UNFORMATTED_VALUES);
        }
        /*!
	 * @param {Object} easingObject
	 * @param {Object} tokenData
	 */
        function expandEasingObject(easingObject, tokenData) {
            Tweenable.each(tokenData, function(prop) {
                var currentProp = tokenData[prop];
                var chunkNames = currentProp.chunkNames;
                var chunkLength = chunkNames.length;
                var easing = easingObject[prop];
                var i;
                if (typeof easing === "string") {
                    var easingChunks = easing.split(" ");
                    var lastEasingChunk = easingChunks[easingChunks.length - 1];
                    for (i = 0; i < chunkLength; i++) {
                        easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
                    }
                } else {
                    for (i = 0; i < chunkLength; i++) {
                        easingObject[chunkNames[i]] = easing;
                    }
                }
                delete easingObject[prop];
            });
        }
        /*!
	 * @param {Object} easingObject
	 * @param {Object} tokenData
	 */
        function collapseEasingObject(easingObject, tokenData) {
            Tweenable.each(tokenData, function(prop) {
                var currentProp = tokenData[prop];
                var chunkNames = currentProp.chunkNames;
                var chunkLength = chunkNames.length;
                var firstEasing = easingObject[chunkNames[0]];
                var typeofEasings = typeof firstEasing;
                if (typeofEasings === "string") {
                    var composedEasingString = "";
                    for (var i = 0; i < chunkLength; i++) {
                        composedEasingString += " " + easingObject[chunkNames[i]];
                        delete easingObject[chunkNames[i]];
                    }
                    easingObject[prop] = composedEasingString.substr(1);
                } else {
                    easingObject[prop] = firstEasing;
                }
            });
        }
        Tweenable.prototype.filter.token = {
            tweenCreated: function(currentState, fromState, toState, easingObject) {
                sanitizeObjectForHexProps(currentState);
                sanitizeObjectForHexProps(fromState);
                sanitizeObjectForHexProps(toState);
                this._tokenData = getFormatManifests(currentState);
            },
            beforeTween: function(currentState, fromState, toState, easingObject) {
                expandEasingObject(easingObject, this._tokenData);
                expandFormattedProperties(currentState, this._tokenData);
                expandFormattedProperties(fromState, this._tokenData);
                expandFormattedProperties(toState, this._tokenData);
            },
            afterTween: function(currentState, fromState, toState, easingObject) {
                collapseFormattedProperties(currentState, this._tokenData);
                collapseFormattedProperties(fromState, this._tokenData);
                collapseFormattedProperties(toState, this._tokenData);
                collapseEasingObject(easingObject, this._tokenData);
            }
        };
    })(Tweenable);
}).call(null);

/*********************

Authors:
	Luis Rodrigues

Description:
	Age Gate class

*********************/
function AgeGateScreen() {
    var self = this, ageGateForm, dayField, monthField, yearField, formValidation = new Validate(), isSubmitting = false;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "age-gate-screen";
    this.name = "Age gate";
    this.templateId = "age-gate-template";
    // added function to set custom button and to be able to get the users data
    function fb_login() {
        FB.login(function(response) {
            if (!response.authResponse) {
                return console.log("User cancelled login or did not fully authorize.");
            }
            FB.api("/me?fields=age_range,first_name,last_name,email", function(response) {
                console.log(response);
                var user_email = response.email, user_firstName = response.first_name, user_lastName = response.last_name, day = 1, month = 1, // Facebook only returns a minimum age, for our purposes this is enough
                // as we don't really care when the user was born, just that they are
                // old enough
                currentYear = new Date().getFullYear(), year = currentYear - response.age_range.min;
                currentUser.set("email", user_email);
                currentUser.set("name", user_firstName + " " + user_lastName);
                dayField.value = day;
                monthField.value = month;
                yearField.value = year;
                validateInputs();
            });
        }, {
            scope: "email,user_birthday"
        });
    }
    // Facebook widget END
    function loadUserDetailsPage() {
        self.scrManager.addScreen(UserDetailsScreen);
    }
    function validateInputs(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        var errorWrapper = document.getElementById("error-overlay"), errorMessage = document.getElementById("dateErrorMessage"), generalDateMessage = '<p class="intro-text middle"><span class="lower blue">but </span><span class="upper blue">Y</span><span class="lower blue">ou must be 18 or over to </span><span class="upper red">FREE </span><span class="lower red">Havana Club <br>Cuban Cocktail </span><span class="lower blue"> with us.</span></p>';
        if (parseInt(yearField.value, 10) == 1998 && parseInt(monthField.value, 10) == 1 && parseInt(dayField.value, 10) == 1) {
            document.getElementById("birth-month").value = "";
            document.getElementById("birth-day").value = "";
            document.getElementById("birth-day").style.display = "inline";
            document.getElementById("birth-month").style.display = "inline";
            isSubmitting = false;
            return false;
        }
        if (!formValidation.field(dayField).valid || !formValidation.field(monthField).valid || !formValidation.field(yearField).valid) {
            errorMessage.innerHTML = generalDateMessage;
            errorWrapper.style.display = "block";
            isSubmitting = false;
            return false;
        }
        var minAge = 18, dayVal = dayField.value, monthVal = monthField.value - 1, yearVal = yearField.value, today = new Date(), minBirthDateUnix = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate() + 1, 12, 0, 0, 0).getTime(), usersBirthday = new Date(yearVal, monthVal, dayVal, 12, 0, 0, 0), usersBirthdayUnix = usersBirthday.getTime();
        if (usersBirthdayUnix - minBirthDateUnix < 0) {
            ga("send", "event", "Age Gate", "Submit", "submit success");
            currentUser.set("birthday", usersBirthday);
            loadUserDetailsPage();
        } else {
            ga("send", "event", "Age Gate", "Submit", "submit fail");
            errorMessage.innerHTML = generalDateMessage;
            errorWrapper.style.display = "block";
            isSubmitting = false;
            return false;
        }
        return true;
    }
    function limitFieldInput(e) {
        var target = e.target, maxLength = target.getAttribute("maxlength");
        if (maxLength && target.value.length >= maxLength) {
            e.preventDefault();
            return false;
        }
        return true;
    }
    function loadPrivacyPolicy(e) {
        e.preventDefault();
        self.scrManager.addScreen(PrivacyPolicyScreen);
    }
    function validateFieldInput(e) {
        var key = e.keyCode, field = e.target, nextSibling = field.nextElementSibling, maxLength = field.getAttribute("maxlength");
        if ((e.charCode < 48 || e.charCode > 57 || field.value.length >= parseInt(maxLength, 10)) && key !== 8 && key !== 13 && key !== 9) {
            return false;
        }
        if (key === 8) {
            return true;
        }
        if (field.value.length >= maxLength - 1) {
            if (nextSibling && nextSibling.tagName.toLowerCase() === "input") {
                setTimeout(function() {
                    nextSibling.focus();
                }, 10);
            } else {
                setTimeout(function() {
                    field.blur();
                }, 10);
            }
        }
    }
    function validateFieldInputYear(e) {
        var yearField = document.getElementById("birth-year").value;
        var monthField = document.getElementById("birth-month").value;
        var dayField = document.getElementById("birth-day").value;
        if (parseInt(yearField, 10) == 1998 && parseInt(monthField, 10) == 0 && parseInt(dayField, 10) == 0) {
            document.getElementById("birth-month").value = "";
            document.getElementById("birth-day").value = "";
            document.getElementById("birth-day").style.display = "inline";
            document.getElementById("birth-month").style.display = "inline";
            e.preventDefault();
            return false;
        }
        return true;
    }
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        dayField = document.getElementById("birth-day");
        monthField = document.getElementById("birth-month");
        yearField = document.getElementById("birth-year");
        ageGateForm = document.getElementById("age-validation-form");
        ageGateForm.addEventListener("submit", validateInputs);
        ageGateForm.addEventListener("keypress", validateFieldInput);
        ageGateForm.addEventListener("keypress", limitFieldInput);
        ageGateForm.addEventListener("keyup", validateFieldInputYear);
        document.getElementById("facebook-login-button").addEventListener("click", fb_login);
        //document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
        return this.container;
    };
}

AgeGateScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/
function BarsListScreen() {
    var self = this;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "bars-list-screen";
    this.name = "Bars list page";
    this.templateId = "bars-list-template";
    function showBarsMap() {
        // console.log('Will change page and switch to map view');
        self.scrManager.addScreen(MapPageScreen);
    }
    //Do post container creation processing
    this.processContainer = function() {
        // document.getElementById('tile1').style.display = "none";
        // document.getElementById('tile2').style.display = "none";
        // document.getElementById('tile3').style.display = "none";
        // document.getElementById('tile4').style.display = "none";
        // document.getElementById('tile5').style.display = "none";
        // document.getElementById('tile6').style.display = "none";
        this.events.publish(this.id + "ContainerReady", this);
        document.getElementById("show-map").addEventListener("click", showBarsMap);
        return this.container;
    };
}

BarsListScreen.prototype = new Screen();

/*********************

Authors:
	Oli

Description:
	Comming soon class

*********************/
function CommingSoonScreen() {
    var self = this;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "comming-soon-screen";
    this.name = "Promotion over";
    this.templateId = "comming-soon-template";
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        return this.container;
    };
}

CommingSoonScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Home page class

*********************/
function HomePageScreen() {
    var self = this, startDate = new Date(2015, 6, 10, 12, 0, 0, 0), now = new Date(), voucherCTA, checkDate;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "home-page-screen";
    this.name = "Home page";
    this.templateId = "home-page-template";
    function loadMapPage(e) {
        e.preventDefault();
        self.scrManager.addScreen(MapPageScreen);
        ga("send", "event", "Find a bar", "click", "click initial button");
    }
    function loadEnterVoucherPage(e) {
        e.preventDefault();
        if (now >= startDate) {
            ga("send", "event", "Voucher", "click", "click initial button");
            self.scrManager.addScreen(VoucherPageScreen);
        } else {
            // self.scrManager.addScreen(VoucherPageScreen);
            var errorWrapper = document.getElementById("error-overlay"), errorMessage = document.getElementById("dateErrorMessage"), voucherError = '<p class="intro-text middle"><span class="upper blue">Y</span><span class="lower blue">ou’re keen! it’s not quite time to enjoy a </span><span class="upper red">H</span><span class="lower red">avana Club cuban cocktail </span><span class="lower blue">just yet though, you’ll have to wait until the 18th of august.</span></p>';
            errorMessage.innerHTML = voucherError;
            errorWrapper.style.display = "block";
        }
    }
    function updateVoucherStatus() {
        if (now >= startDate) {
            clearInterval(checkDate);
            voucherCTA.style.opacity = "";
        } else {
            return;
        }
    }
    function loadPrivacyPolicy(e) {
        e.preventDefault();
        self.scrManager.addScreen(PrivacyPolicyScreen);
    }
    //Do post container creation processing
    this.processContainer = function() {
        // document.getElementById('tile1').style.display = "none";
        // document.getElementById('tile2').style.display = "none";
        // document.getElementById('tile3').style.display = "none";
        // document.getElementById('tile4').style.display = "none";
        // document.getElementById('tile5').style.display = "none";
        // document.getElementById('tile6').style.display = "none";
        this.events.publish(this.id + "ContainerReady", this);
        document.getElementById("find-a-bar-btn").addEventListener("click", loadMapPage);
        //document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
        voucherCTA = document.getElementById("voucher-cta");
        if (now < startDate) {
            voucherCTA.style.opacity = "0.5";
            checkDate = setInterval(updateVoucherStatus, 5e3);
        }
        voucherCTA.addEventListener("click", loadEnterVoucherPage);
        var calendarCTA = document.getElementById("calendarCTA"), ua = navigator.userAgent.toLowerCase(), isAndroid = ua.indexOf("android") > -1;
        //if(ua.indexOf('ios') >= 0 || ua.indexOf('os x') >= 0 || ua.indexOf('macintosh') >= 0) {
        calendarCTA.href = "/calendar/mnpcd.ics";
        calendarCTA.addEventListener("click", function() {
            ga("send", "event", "Calendar", "click");
        });
        //} else {
        //	calendarCTA.style.display = "none";
        //}
        return this.container;
    };
}

HomePageScreen.prototype = new Screen();

/*********************

Authors:
	Dan Dvoracek
	Luis Rodrigues

Description:
	Map page class

*********************/
function MapPageScreen() {
    var self = this, listWrap, barList, map, geoCoder, minZoomLevel = 6, mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(49.378087, (-8.906589)), new google.maps.LatLng(61.039487, 2.730992)), barBounds, userLocation, mapCenterLocation, mapMarkers = [], barListItemTemplate = "", listedBars = [], activeBar, directionsService, directionsDisplay, errorMessage = document.getElementById("dateErrorMessage"), errorWrapper = document.getElementById("error-overlay"), isReceivingData = false, userSearch = "";
    barListItemTemplate += '<h2 class="bar-name">{{ name }}</h2>';
    barListItemTemplate += "{{#directionsEnabled}}";
    barListItemTemplate += '<div class="bar-more-info">';
    barListItemTemplate += '<span class="distance">{{ distance }}</span>';
    barListItemTemplate += '<span class="getDirectionsArrow" data-bar="{{ index }}"></span>';
    barListItemTemplate += "</div>";
    barListItemTemplate += "{{/directionsEnabled}}";
    barListItemTemplate += "<address>{{ address }}</address>";
    barListItemTemplate += '<p class="phoneNumber">Tel. <a href="tel:{{ phoneClean }}" title="Call the bar!">{{ phone }}</a></p>';
    barListItemTemplate += '<div class="clearfix"></div>';
    barListItemTemplate += '<div class="dots-border"></div>';
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "map-page-screen";
    this.name = "Map page";
    this.templateId = "map-page-template";
    this.root = false;
    if (localStorage && localStorage.getItem("usersLocation")) {
        var userCoordinates = JSON.parse(localStorage.getItem("usersLocation"));
        userLocation = new google.maps.LatLng(userCoordinates[0], userCoordinates[1]);
    }
    // Close that same popup...
    function hideBarDetails(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (directionsDisplay) {
            directionsDisplay.setMap(null);
        }
        var barInfoOverlay = document.getElementById("bar-details-overlay");
        barInfoOverlay.style.display = "none";
    }
    // Show the bar list on map-page; different behavior depending on if the user enabled geolocation or not
    function showBarsList(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            ga("send", "event", "Find a bar", "click", "List");
        }
        var filtersMap = document.getElementById("show-map"), filtersList = document.getElementById("show-list"), listOverlay = self.container.querySelector(".bars-list-view"), listWrap = document.getElementById("bars-list-wrap");
        listOverlay.style.display = "block";
        hideBarDetails();
        if (filtersMap.className.indexOf("map-filter-active") >= 0) {
            filtersMap.className = "";
            filtersList.className = "map-filter-active";
        }
    }
    // Hide bar list when switch to map view
    function hideBarsList(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            ga("send", "event", "Find a bar", "click", "Map");
        }
        var listOverlay = self.container.querySelector(".bars-list-view"), filtersMap = document.getElementById("show-map"), filtersList = document.getElementById("show-list");
        if (filtersList.className.indexOf("map-filter-active") >= 0) {
            filtersList.className = "";
            filtersMap.className = "map-filter-active";
        }
        listOverlay.style.display = "none";
    }
    //Prevent zooming out the map too much
    function restrictMapZoom() {
        if (map.getZoom() < minZoomLevel) {
            map.setZoom(minZoomLevel);
        }
    }
    //Prevent panning the map to other countries
    function restrictMapCenter() {
        var center = map.getCenter(), x, y, maxX, maxY, minX, minY;
        if (!mapBounds.contains(center)) {
            x = center.lng(), y = center.lat(), maxX = mapBounds.getNorthEast().lng(), maxY = mapBounds.getNorthEast().lat(), 
            minX = mapBounds.getSouthWest().lng(), minY = mapBounds.getSouthWest().lat();
            if (x < minX) {
                x = minX;
            } else if (x > maxX) {
                x = maxX;
            }
            if (y < minY) {
                y = minY;
            } else if (y > maxY) {
                y = maxY;
            }
            map.setCenter(new google.maps.LatLng(y, x));
        }
    }
    function getDirectionsToBar(e, barData) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        ga("send", "event", "Find a bar", "Search", "get directions");
        barData = barData || activeBar;
        var request = {
            origin: userLocation || mapCenterLocation,
            destination: new google.maps.LatLng(barData.latitude, barData.longitude),
            travelMode: google.maps.TravelMode.DRIVING
        };
        hideBarDetails();
        directionsDisplay.setMap(map);
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            } else {
                errorMessage.textContent = "It was not possible to get directions from the location provided.";
                errorWrapper.style.display = "block";
            }
        });
    }
    function showBarDetails(barData) {
        if (!barData) {
            ga("send", "event", "Find a bar", "Search", "select bar");
        }
        if (barData && barData.latLng) {
            barData = false;
        }
        var barMarker = this, barData = barData || barMarker.get("barData"), nameField = document.getElementById("barName"), addressField = document.getElementById("barAddress"), phoneNumField = document.getElementById("barPhoneNum"), barInfoOverlay = document.getElementById("bar-details-overlay"), barPostcode = document.getElementById("barPostcode"), distance = document.getElementById("barDistance"), distanceOrigin = userLocation || mapCenterLocation || false, distanceToBar;
        if (distanceOrigin) {
            distanceToBar = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(barData.latitude, barData.longitude), distanceOrigin);
            distanceToBar = (distanceToBar * .000621371192).toFixed(2) + " miles";
        }
        barInfoOverlay.style.display = "block";
        nameField.textContent = barData.name1 + (barData.name2 ? " " + barData.name2 : "");
        addressField.textContent = barData.address1 + (barData.address2 ? "\n" + barData.address2 : "") + (barData.address3 ? "\n" + barData.address3 : "") + (barData.address4 ? "\n" + barData.address4 : "");
        barPostcode.textContent = barData.postcode;
        distance.textContent = distanceToBar ? distanceToBar : "";
        if (barData.phone) {
            phoneNumField.innerHTML = barData.phone;
            phoneNumField.href = "tel:" + barData.phone.replace(/ /g, "");
            phoneNumField.parentNode.style.display = "block";
        } else {
            phoneNumField.parentNode.style.display = "none";
        }
        activeBar = barData;
    }
    function addBarMarker(barData) {
        barData = barData.attributes;
        var barCoordinates = new google.maps.LatLng(barData.latitude, barData.longitude), barMarker = new google.maps.Marker({
            position: barCoordinates,
            map: map,
            icon: "assets/img/pin.png",
            title: barData.name1 + (barData.name2 ? " " + barData.name2 : "")
        });
        barMarker.set("barData", barData);
        google.maps.event.addListener(barMarker, "click", showBarDetails);
        mapMarkers.push(barMarker);
        barBounds.extend(barCoordinates);
    }
    function renderBarListItem(barData, index) {
        barData = barData.attributes;
        var template, barItemData, distanceOrigin = userLocation || mapCenterLocation || false, distanceToBar;
        if (distanceOrigin) {
            distanceToBar = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(barData.latitude, barData.longitude), distanceOrigin);
            distanceToBar = (distanceToBar * .000621371192).toFixed(2) + " miles";
        }
        barItemData = {
            name: barData.name1 + (barData.name2 ? " " + barData.name2 : ""),
            distance: distanceToBar,
            address: barData.address1 + (barData.address2 ? "\n" + barData.address2 : "") + (barData.address3 ? "\n" + barData.address3 : "") + (barData.address4 ? "\n" + barData.address4 : "") + (barData.postcode ? "\n" + barData.postcode : ""),
            phone: barData.phone,
            phoneClean: barData.phone ? barData.phone.replace(/ /g, "") : false,
            directionsEnabled: !distanceToBar || self.screenData.standalone ? false : true,
            index: index
        };
        return Mustache.render(barListItemTemplate, barItemData);
    }
    function removeBarPins() {
        var i;
        for (i = 0; i < mapMarkers.length; i++) {
            mapMarkers[i].setMap(null);
        }
    }
    function populateBars(barData) {
        var i, output = "";
        listedBars = barData;
        barBounds = new google.maps.LatLngBounds();
        //Only deal with map markers if not showing the standalone bar list
        if (!self.screenData.standalone) {
            removeBarPins();
            mapMarkers = [];
            for (i = 0; i < barData.length; i++) {
                addBarMarker(barData[i]);
            }
        }
        for (i = 0; i < barData.length; i++) {
            output += renderBarListItem(barData[i], i);
        }
        if (map && barBounds) {
            map.fitBounds(barBounds);
        }
        barList.innerHTML = output;
        isReceivingData = false;
    }
    function getNearestToMapCenter() {
        if (!mapCenterLocation) {
            return;
        }
        //No bars should be displayed with no user location or addres searched
        if (!userSearch && !userLocation) {
            isReceivingData = false;
            return removeBarPins();
        }
        isReceivingData = true;
        var BarsList = Parse.Object.extend("Bars"), query = new Parse.Query(BarsList), parseGeopoint = new Parse.GeoPoint(mapCenterLocation.lat(), mapCenterLocation.lng());
        if (!self.screenData.standalone) {
            query.limit(25);
        } else {
            query.limit(1e3);
        }
        query.near("geopoints", parseGeopoint);
        query.find().then(populateBars);
    }
    function initMap() {
        var defaultZoom = 6;
        mapCenterLocation = userLocation || mapBounds.getCenter();
        map = new google.maps.Map(document.getElementById("map-canvas"), {
            center: mapCenterLocation,
            zoom: defaultZoom,
            disableDefaultUI: true
        });
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        geoCoder = new google.maps.Geocoder();
        if (userLocation) {
            new google.maps.Marker({
                position: userLocation,
                map: map,
                icon: "assets/img/pin-user.png"
            });
        }
        //Prevent zooming out too much
        google.maps.event.addListener(map, "zoom_changed", restrictMapZoom);
        //Prevent panning to other countries
        google.maps.event.addListener(map, "center_changed", restrictMapCenter);
    }
    function showNoResults() {
        errorMessage.textContent = "No bars were found near the location provided.";
        errorWrapper.style.display = "block";
        isReceivingData = false;
    }
    function searchNearAddress(address) {
        var search_text = address.toLowerCase();
        // birmingham - B1 2DS
        // newport - NP20 1DS
        // cambridge - CB2 1AB
        // worcester - WR1 3LD
        // lincoln - LN2 1JG
        // sheffield - S9 1EP
        // york - YO1 8AD
        // carlisle - CA1 1RP
        if (search_text === "birmingham".toLowerCase()) {
            search_text = "B1 2DS";
        } else if (search_text === "newport".toLowerCase()) {
            search_text = "NP20 1DS";
        } else if (search_text === "cambridge".toLowerCase()) {
            search_text = "CB2 1AB";
        } else if (search_text === "worcester".toLowerCase()) {
            search_text = "WR1 3LD";
        } else if (search_text === "lincoln".toLowerCase()) {
            search_text = "LN2 1JG";
        } else if (search_text === "sheffield".toLowerCase()) {
            search_text = "S9 1EP";
        } else if (search_text === "york".toLowerCase()) {
            search_text = "YO1 8AD";
        } else if (search_text === "carlisle".toLowerCase()) {
            search_text = "CA1 1RP";
        }
        isReceivingData = true;
        geoCoder.geocode({
            address: search_text
        }, function(results, status) {
            var locationCoordinates;
            if (status == google.maps.GeocoderStatus.OK && results.length) {
                //Use the first result
                locationCoordinates = results[0].geometry.location;
                if (mapBounds.contains(locationCoordinates)) {
                    mapCenterLocation = locationCoordinates;
                    getNearestToMapCenter();
                } else {
                    showNoResults();
                }
            } else {
                showNoResults();
            }
        });
    }
    function getDirectionsFromList(e) {
        if (e.target.className === "getDirectionsArrow") {
            e.preventDefault();
            activeBar = listedBars[e.target.getAttribute("data-bar")];
            activeBar = activeBar.attributes;
            hideBarsList();
            showBarDetails(activeBar);
            getDirectionsToBar(null, activeBar);
        }
    }
    function resetSearch() {
        if (userLocation) {
            mapCenterLocation = userLocation;
        }
        map.setCenter(mapCenterLocation);
    }
    function searchFromList(e) {
        e.preventDefault();
        if (isReceivingData) {
            return;
        }
        isReceivingData = true;
        var listSearchField = document.getElementById("list-search"), mapSearchField = document.getElementById("map-search");
        mapSearchField.value = listSearchField.value.trim();
        userSearch = mapSearchField.value;
        ga("send", "event", "Find a bar", "Search", mapSearchField.value);
        if (mapSearchField.value) {
            searchNearAddress(listSearchField.value);
        } else {
            resetSearch();
        }
    }
    function searchFromMap(e) {
        e.preventDefault();
        if (isReceivingData) {
            return;
        }
        isReceivingData = true;
        var listSearchField = document.getElementById("list-search"), mapSearchField = document.getElementById("map-search");
        listSearchField.value = mapSearchField.value.trim();
        userSearch = listSearchField.value;
        ga("send", "event", "Find a bar", "Search", listSearchField.value);
        if (listSearchField.value) {
            searchNearAddress(mapSearchField.value);
        } else {
            resetSearch();
        }
    }
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        var backBtn = document.getElementById("backBtn"), getDirectionsBtn;
        listWrap = this.container.querySelector(".bar-list-wrapper");
        barList = document.getElementById("bars-list-wrap");
        if (this.screenData.standalone) {
            mapCenterLocation = userLocation || mapBounds.getCenter();
            showBarsList();
            this.container.className += " standalone-version";
            listWrap.style.paddingTop = "60px";
            backBtn.parentNode.removeChild(backBtn);
        } else {
            this.container.className += " full-version";
            document.getElementById("show-list").addEventListener("click", showBarsList);
            document.getElementById("show-map").addEventListener("click", hideBarsList);
            document.getElementById("closeBtn").addEventListener("click", hideBarDetails);
            document.getElementById("searchBarMapForm").addEventListener("submit", searchFromMap);
            document.getElementById("searchBarListForm").addEventListener("submit", searchFromList);
            document.getElementById("getDirections").addEventListener("click", getDirectionsToBar);
            backBtn.addEventListener("click", self.scrManager.goBack);
            listWrap.addEventListener("click", getDirectionsFromList);
            initMap();
        }
        getNearestToMapCenter();
        if (window.location.hash === "#/voucher") document.getElementById("backBtn").style.display = "none";
        return this.container;
    };
}

MapPageScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/
function PrivacyPolicyScreen() {
    var self = this;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "privacy-policy-screen";
    this.name = "Privacy Policy page";
    this.templateId = "privacy-policy-template";
    this.root = false;
    //Do post container creation processing
    this.processContainer = function() {
        // document.getElementById('tile1').style.display = "none";
        // document.getElementById('tile2').style.display = "none";
        // document.getElementById('tile3').style.display = "none";
        // document.getElementById('tile4').style.display = "none";
        // document.getElementById('tile5').style.display = "none";
        // document.getElementById('tile6').style.display = "none";
        this.events.publish(this.id + "ContainerReady", this);
        ga("send", "event", "Privacy Policy", "Viewed");
        var backBtn = document.getElementById("backBtn");
        if (this.screenData.standalone) {
            backBtn.parentNode.removeChild(backBtn);
        } else {
            backBtn.addEventListener("click", self.scrManager.goBack);
        }
        return this.container;
    };
}

ThankYouScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Promotion over class

*********************/
function PromotionOverScreen() {
    var self = this;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "promotion-over-screen";
    this.name = "Promotion over";
    this.templateId = "promotion-over-template";
    function loadPrivacyPolicy(e) {
        e.preventDefault();
        self.scrManager.addScreen(PrivacyPolicyScreen);
    }
    //Do post container creation processing
    this.processContainer = function() {
        // document.getElementById('tile1').style.display = "none";
        // document.getElementById('tile2').style.display = "none";
        // document.getElementById('tile3').style.display = "none";
        // document.getElementById('tile4').style.display = "none";
        // document.getElementById('tile5').style.display = "none";
        // document.getElementById('tile6').style.display = "none";
        this.events.publish(this.id + "ContainerReady", this);
        //document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
        return this.container;
    };
}

PromotionOverScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Base screen class

*********************/
function Screen(scrManager, events, screenData, forceRoot) {
    //Screen properties
    this.id = "screenId";
    this.name = "Base screen";
    this.template = "";
    this.templateId = false;
    this.templateUrl = false;
    this.templateData = {};
    this.container = null;
    this.transition = "slideLeft";
    this.root = true;
    if (forceRoot) {
        this.forceRoot = true;
    } else {
        this.forceRoot = false;
    }
    this.templateRequest;
    this.scrManager = scrManager;
    this.events = events;
    this.screenData = screenData || {};
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        return this.container;
    };
    //Create the screen container element
    this.createContainer = function(template) {
        var scrollableArea;
        this.container = document.createElement("div");
        this.container.className = "screen " + this.id;
        this.container.style.visibility = "hidden";
        scrollableArea = document.createElement("div");
        scrollableArea.className = "scrollable";
        scrollableArea.innerHTML = template;
        this.container.appendChild(scrollableArea);
        //Add the screen to the app container
        this.scrManager.container.appendChild(this.container);
        this.processContainer();
    };
    this.populateTemplate = function() {
        return Mustache.render(this.template, this.templateData);
    };
    //Check if the screen is ready and do all required actions before the screen is displayed
    this.isReady = function() {
        if (!this.template) {
            return false;
        }
        var tplRender = this.populateTemplate();
        this.createContainer(tplRender);
        return true;
    };
    //Notify that the template is ready and check if all the requirements are met
    this.templateReady = function() {
        this.isReady();
    };
    //Process the template loaded from a URL
    this.templateUrlLoaded = function(e) {
        var target = e.target;
        if (target.readyState !== 4) {
            return;
        }
        if (target.status >= 200 && target.status < 400) {
            this.template = target.responseText;
            this.templateReady();
        }
        return;
    };
    //Load the template from the inner HTML of a DOM element
    this.loadTemplateFromDOM = function(templateId) {
        var templateContainer = document.getElementById(templateId);
        if (!templateContainer) {
            console.error('Template container with ID "' + templateId + '" not found.');
            return "";
        }
        this.template = templateContainer.innerHTML;
        this.templateReady();
        return this.template;
    };
    //Load the template from a given URL through AJAX
    this.loadTemplateFromUrl = function(templateUrl) {
        var self = this;
        this.templateRequest = new XMLHttpRequest();
        this.templateRequest.onreadystatechange = function(e) {
            self.templateUrlLoaded.call(self, e);
        };
        this.templateRequest.open("GET", templateUrl);
        this.templateRequest.send();
    };
    //Get the screen template
    this.loadTemplate = function() {
        if (this.template) {
            this.templateReady();
            return;
        }
        if (this.templateId) {
            this.loadTemplateFromDOM(this.templateId);
            return;
        }
        if (this.templateUrl) {
            this.loadTemplateFromUrl(this.templateUrl);
            return;
        }
    };
    //Destroy the screen
    this.destroy = function() {
        if (this.templateRequest) {
            this.templateRequest.abort();
        }
        if (this.container) {
            this.container.parentNode.removeChild(this.container);
            this.container = null;
        }
    };
    //Prepare the screen
    this.init = function() {
        this.loadTemplate();
    };
}

/*********************

Authors:
	Luis Rodrigues

Description:
	Start screen class

*********************/
function StartScreen() {
    var self = this, startDate = new Date(2016, 7, 18, 0, 0, 0, 0), endDate = new Date(2016, 7, 20, 12, 0, 0, 0), now = new Date(), contentLoadedCheck, cssLoaded = false, greenBackground, whiteBackground, headerBackground, progressContainer, loggedIn = false, sessionExpired = false, isAllow = false, geoCoder = new google.maps.Geocoder(), errorMessage = document.getElementById("dateErrorMessage"), errorWrapper = document.getElementById("error-overlay"), isReceivingData = false;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "start-screen";
    this.name = "Loading";
    this.templateId = "start-template";
    this.transition = false;
    // CACHE geolocation -- I suppose it's a good thing to do it here as later it takes way too much time...(on the map page)
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(callbackPosition, errorPositionCallBack, {
            timeout: 1e4
        });
    }
    function callbackPosition(position) {
        var latitude = position.coords.latitude, longitude = position.coords.longitude;
        window.UsersLat = latitude;
        window.UsersLng = longitude;
        window.UsersLatLng = [ latitude, longitude ];
        localStorage.setItem("usersLocation", JSON.stringify(UsersLatLng));
    }
    function errorPositionCallBack() {}
    function updateProgress(loaded, total) {}
    function checkLoadedAssets() {
        var loadedAssets = 1, totalAssets = 7;
        if (currentUser) {
            totalAssets = 8;
        }
        if (currentUser && loggedIn) {
            loadedAssets += 1;
        }
        //Check if Facebook SDK is loaded
        //Only needed if a user is not logged in
        if (typeof FB !== "undefined") {
            loadedAssets += 1;
        }
        //Check if Google Maps is loaded
        if (typeof google !== "undefined" && typeof google.maps !== "undefined") {
            loadedAssets += 1;
        }
        //Check if the CSS is loaded
        if (cssLoaded) {
            loadedAssets += 1;
        }
        //Check if the green background is loaded
        if (greenBackground.complete) {
            loadedAssets += 1;
        }
        //Check if the white background is loaded
        if (whiteBackground.complete) {
            loadedAssets += 1;
        }
        //Check if the header background is loaded
        if (headerBackground.complete) {
            loadedAssets += 1;
        }
        progressContainer.style.width = Math.round(loadedAssets / totalAssets * 100) + "%";
        if (loadedAssets < totalAssets) {
            return false;
        }
        clearInterval(contentLoadedCheck);
        self.routeUser();
    }
    self.routeUser = function() {
        var deepLink = window.location.hash;
        if (deepLink == "#/login") {
            //localStorage.setItem("deepLink", '#/login');
            currentUser = new Parse.User();
            return self.scrManager.addScreen(UserDetailsScreen, {
                standalone: true
            }, true);
        } else if (deepLink == "#/bars") {
            return self.scrManager.addScreen(MapPageScreen, {
                standalone: true
            }, true);
        } else if (deepLink == "#/voucher") {
            return self.scrManager.addScreen(HomePageScreen, {
                standalone: true
            }, true);
        } else {
            if (now < startDate) {
                return self.scrManager.addScreen(CommingSoonScreen, {
                    standalone: true
                }, true);
            } else if (now > endDate) {
                return self.scrManager.addScreen(PromotionOverScreen, {
                    standalone: true
                }, true);
            }
            if (loggedIn && !sessionExpired && currentUser.attributes.drinkRedeemed) {
                return self.scrManager.addScreen(ThankYouScreen);
            } else if (loggedIn && !sessionExpired) {
                return self.scrManager.addScreen(HomePageScreen);
            } else {
                currentUser = new Parse.User();
                return self.scrManager.addScreen(AgeGateScreen);
            }
        }
    };
    //Do post container creation processing
    self.processContainer = function() {
        currentUser = Parse.User.current();
        if (currentUser) {
            Parse.User.logIn(currentUser.attributes.email, currentUser.attributes.name, {
                success: function(user) {
                    currentUser = user;
                    loggedIn = true;
                    sessionExpired = false;
                },
                error: function(user, error) {
                    Parse.User.logOut({
                        success: function(user) {
                            console.log(user);
                        },
                        error: function(user, error) {
                            console.log(user, error);
                        }
                    });
                    loggedIn = true;
                    sessionExpired = true;
                    console.warn(user, error);
                }
            });
        }
        self.events.publish(self.id + "ContainerReady", self);
        progressContainer = document.getElementById("progress-container");
        progressContainer.style.width = "0%";
        getUserLocation();
        greenBackground = new Image();
        greenBackground.src = "/assets/img/backgrounds/mobile-footer-wrap-bg.png";
        whiteBackground = new Image();
        whiteBackground.src = "/assets/img/backgrounds/mobile-body-bg.jpg";
        headerBackground = new Image();
        headerBackground.src = "/assets/img/backgrounds/mobile-header-bg.png";
        self.cssRequest = new XMLHttpRequest();
        self.cssRequest.onreadystatechange = function(e) {
            self.processLoadedCSS.call(self, e);
        };
        self.cssRequest.open("GET", "/assets/css/main.css");
        self.cssRequest.send();
        contentLoadedCheck = setInterval(checkLoadedAssets, 100);
        return self.container;
    };
    self.processLoadedCSS = function(e) {
        var target = e.target;
        if (target.readyState !== 4) {
            return;
        }
        if (target.status >= 200 && target.status < 400) {
            document.getElementById("mainStylesheet").innerHTML = target.responseText;
            cssLoaded = true;
        }
        return;
    };
}

StartScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/
function ThankYouScreen() {
    Screen.apply(this, Array.prototype.slice.call(arguments));
    var subscribeSection, subscribeBtn;
    this.id = "thank-you-screen";
    this.name = "Thank you page";
    this.templateId = "thank-you-template";
    this.templateData = {
        userName: currentUser.attributes.name,
        userSubscribedNewsletter: currentUser.attributes.receiveEmails
    };
    this.subscribeNewsletter = function(e) {
        currentUser.set("receiveEmails", true);
        currentUser.save();
        signUpNewsletter();
        subscribeSection.innerHTML = '<p class="promotion-text1">Thank you!</p>';
    };
    //Do post container creation processing
    this.processContainer = function() {
        subscribeSection = document.getElementById("newsletter-signup-section");
        if (subscribeSection) {
            subscribeBtn = subscribeSection.querySelector("#subscribe-newsletter-btn");
            subscribeBtn.addEventListener("click", this.subscribeNewsletter);
        }
        this.events.publish(this.id + "ContainerReady", this);
        return this.container;
    };
}

ThankYouScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/
function UserDetailsScreen() {
    var self = this, detailsForm, fullName, email, postcode, termsAndCond, newsletterSignup, validator = new Validate(), isSubmitting = false;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "user-details-screen";
    this.name = "User details page";
    this.templateId = "user-details-template";
    function loadHomePage() {
        self.scrManager.addScreen(HomePageScreen);
    }
    function validateFields(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        var errorCount = 0, nameError = document.getElementById("nameError"), emailError = document.getElementById("emailError"), postcodeError = document.getElementById("postcodeError"), generalError = document.getElementById("generalError"), nameValidation = validator.field(fullName), emailValidation = validator.field(email), postcodeValidation = validator.field(postcode), fullNameStr = fullName.value.toLowerCase().trim(), emailStr = email.value.toLowerCase().trim();
        fullNameStr = latinize(fullNameStr);
        emailStr = latinize(emailStr);
        if (nameValidation.valid) {
            nameError.innerHTML = "";
        } else {
            errorCount = errorCount + 1;
            nameError.textContent = "Check your name.";
        }
        if (emailValidation.valid) {
            emailError.innerHTML = "";
        } else {
            errorCount = errorCount + 1;
            emailError.textContent = "Check the email format.";
        }
        if (postcodeValidation.valid) {
            postcodeError.innerHTML = "";
        }
        if (termsAndCond.checked == false) {
            errorCount = errorCount + 1;
            generalError.textContent = "Please accept Terms / Conditions.";
        } else {
            generalError.innerHTML = "";
        }
        if (errorCount == 0) {
            var updateCRM = true;
            //if (currentUser.attributes.receiveEmails != newsletterSignup.checked) {
            //	updateCRM = true;
            //}
            // save data first
            currentUser.set("username", emailStr);
            currentUser.set("password", fullNameStr);
            currentUser.set("email", emailStr);
            currentUser.set("name", fullNameStr);
            currentUser.set("postcode", postcode.value);
            currentUser.set("receiveEmails", newsletterSignup.checked);
            if (updateCRM) {
                signUpNewsletter(this.screenData.standalone);
            }
            currentUser.signUp(null, {
                success: function(user) {
                    currentUser = user;
                    welcomeNewUser();
                    loadHomePage();
                    ga("send", "event", "Details", "Submit", "submit success");
                },
                error: function(user, error) {
                    if (error.code === 202) {
                        Parse.User.logIn(emailStr, fullNameStr, {
                            success: function(user) {
                                currentUser = user;
                                if (user.attributes.drinkRedeemed) {
                                    return self.scrManager.addScreen(ThankYouScreen);
                                } else {
                                    return loadHomePage();
                                }
                            },
                            error: function(user, error) {
                                isSubmitting = false;
                                if (error.code === 101) {
                                    emailError.textContent = "The email address is already registered.";
                                } else {
                                    console.error(error);
                                }
                                ga("send", "event", "Details", "Submit", "submit fail");
                            }
                        });
                    } else {
                        ga("send", "event", "Details", "Submit", "submit fail");
                    }
                }
            });
        } else {
            ga("send", "event", "Details", "Submit", "submit fail");
            isSubmitting = false;
            return false;
        }
    }
    function limitFieldInput(e) {
        var target = e.target, maxLength = target.getAttribute("maxlength");
        if (maxLength && target.value.length >= maxLength) {
            e.preventDefault();
            return false;
        }
        return true;
    }
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        detailsForm = document.getElementById("detailsForm");
        fullName = document.getElementById("fullNameInput");
        email = document.getElementById("emailInput");
        postcode = document.getElementById("postcodeInput");
        termsAndCond = document.getElementById("checkboxOne");
        newsletterSignup = document.getElementById("checkboxTwo");
        console.log(currentUser);
        if (currentUser === null) {
            fullName.value = "";
            email.value = "";
        } else {
            fullName.value = currentUser.attributes.name;
            email.value = currentUser.attributes.email;
        }
        if (fullName.value === "undefined" && email.value === "undefined") {
            fullName.value = "";
            email.value = "";
        }
        detailsForm.addEventListener("keypress", limitFieldInput);
        detailsForm.addEventListener("submit", validateFields);
        return this.container;
    };
}

UserDetailsScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/
function VoucherPageScreen() {
    var self = this, form, validator = new Validate();
    isSubmitting = false;
    Screen.apply(this, Array.prototype.slice.call(arguments));
    this.id = "voucher-page-screen";
    this.name = "Voucher page";
    this.templateId = "enter-code-template";
    this.root = false;
    function loadThankYouPage(e) {
        e.preventDefault();
        self.scrManager.addScreen(ThankYouScreen);
    }
    function codeNotValid(e, invalidPin) {
        e.preventDefault();
        alert("The code you entered is not valid.");
    }
    function codeIsValid(barObject) {
        var relation;
        barObject.increment("drinksRedeemed");
        barObject.save();
        relation = currentUser.relation("redeemedAtBar");
        relation.add(barObject);
        currentUser.set("drinkRedeemed", true);
        currentUser.save();
        self.scrManager.addScreen(ThankYouScreen);
    }
    //Check that a bar with the code provided exists
    function redeemVoucher(code) {
        var BarsList = Parse.Object.extend("Bars"), query = new Parse.Query(BarsList);
        query.equalTo("pinNumber", code);
        query.first({
            success: function(object) {
                ga("send", "event", "Voucher", "click", "Validate");
                if (object) {
                    codeIsValid(object);
                } else {
                    codeNotValid(true);
                }
                isSubmitting = false;
            },
            error: function(error) {
                codeNotValid(true);
                isSubmitting = false;
            }
        });
    }
    //Make sure a 4 digit code is input
    function validateCode(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (isSubmitting) {
            return false;
        }
        isSubmitting = true;
        var fields = form.elements, i, code = "";
        for (i = 0; i < fields.length; i++) {
            if (fields[i].tagName.toLowerCase() === "input") {
                if (!validator.field(fields[i]).valid) {
                    return codeNotValid(e);
                } else {
                    code += fields[i].value;
                }
            }
        }
        //4 digit valid code present
        redeemVoucher(code);
    }
    //Make sure that only one digit is input into the field
    function validateFieldInput(e) {
        var key = e.keyCode, field = e.target, nextSibling = field.nextElementSibling;
        if ((e.charCode < 48 || e.charCode > 57 || field.value.length) && key !== 8 && key !== 13 && key !== 9) {
            return false;
        }
        if (key === 8) {
            return true;
        }
        if (nextSibling && nextSibling.tagName.toLowerCase() === "input") {
            setTimeout(function() {
                nextSibling.focus();
            }, 10);
        } else {
            setTimeout(function() {
                field.blur();
            }, 10);
        }
        var digit4 = document.getElementById("digit4");
        if (digit4 >= 0) {
            save = document.getElementById("save");
            save.disabled = false;
        }
    }
    function limitFieldInput(e) {
        var target = e.target, maxLength = target.getAttribute("maxlength");
        if (maxLength && target.value.length >= maxLength) {
            e.preventDefault();
            return false;
        }
        return true;
    }
    //Do post container creation processing
    this.processContainer = function() {
        this.events.publish(this.id + "ContainerReady", this);
        var backBtn = document.getElementById("backBtn");
        if (this.screenData.standalone) {
            backBtn.parentNode.removeChild(backBtn);
        }
        form = document.getElementById("enter-code-form");
        form.addEventListener("submit", validateCode);
        form.addEventListener("keypress", validateFieldInput);
        document.getElementById("backBtn").addEventListener("click", self.scrManager.goBack);
        form.elements["digit1"].focus();
        form.addEventListener("keypress", limitFieldInput);
        return this.container;
    };
}

VoucherPageScreen.prototype = new Screen();

/*********************

Authors:
	Luis Rodrigues

Description:
	Main application script

*********************/
var parseIds = {
    "127.0.0.1": {
        appId: "3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT",
        jsKey: "SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu"
    },
    "192.168.10.100": {
        appId: "3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT",
        jsKey: "SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu"
    },
    "cubanweekender.co.uk": {
        appId: "3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT",
        jsKey: "SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu"
    },
    "www.cubanweekender.co.uk": {
        appId: "3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT",
        jsKey: "SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu"
    },
    "hccw2016.parseapp.com": {
        appId: "3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT",
        jsKey: "SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu"
    }
}, parseId = {
    appId: "",
    jsKey: ""
};

// default (invalid host)                
if (!parseIds[window.location.host.replace("/", "")]) {
    console.error("Parse ID error: Host not valid (no Parse id defined).");
} else {
    parseId = parseIds[window.location.host.replace("/", "")];
}

Parse.initialize(parseId["appId"], parseId["jsKey"]);

window.getCookie = function(name) {
    var name = name;
    match = document.cookie.match(new RegExp(name + "=([^;]+)"));
    if (match) return match[1];
};

function setCookie() {
    var cssString = "margin-top: 0px; transition: all 0.2s ease-in;";
    document.getElementById("app").style.cssText = cssString;
    document.getElementById("cookieWrap").style.display = "none";
    document.cookie = "MalibuHccwCookie2016 = accepted";
}

function hideErrorWrapper() {
    var errorWrapper = document.getElementById("error-overlay");
    errorWrapper.style.display = "none";
}

function App() {
    var screenMngr;
    this.destroy = function() {
        if (screenMngr) {
            screenMngr.destroy();
        }
        window.removeEventListener("unload", this.destroy);
    };
    this.checkCookie = function() {
        var cookie = window.getCookie("MalibuHccwCookie2016");
        if (cookie == "accepted") {
            document.getElementById("cookieWrap").style.display = "none";
        } else {
            document.getElementById("cookieWrap").style.display = "block";
        }
    };
    this.init = function() {
        screenMngr = new ScreenManager();
        document.getElementById("cookie-alert").addEventListener("click", setCookie);
        document.getElementById("close-btn").addEventListener("click", hideErrorWrapper);
    };
    this.checkCookie();
    this.init();
}

function welcomeNewUser() {
    if (window.location.host !== "www.cubanweekender.co.uk") {
        return;
    }
    var formData = getUserCrmData();
    function getUserCrmData() {
        var userData = {
            email: currentUser.attributes.email
        }, keyValuePairs = [], i;
        for (i in userData) {
            if (userData.hasOwnProperty(i)) {
                keyValuePairs.push(encodeURIComponent(i) + "=" + encodeURIComponent(userData[i]));
            }
        }
        return keyValuePairs.join("&");
    }
    function emailTriggerResponse(e) {
        var target = e.target, response;
        if (target.readyState !== 4) {
            return;
        }
        if (target.status >= 200 && target.status < 400) {
            response = JSON.parse(target.responseText);
            if (response.success) {} else {
                console.error(response);
            }
        } else {
            console.error("Error submitting form.", target.responseText);
        }
    }
    var emailTriggerRequest = new XMLHttpRequest();
    emailTriggerRequest.onreadystatechange = emailTriggerResponse;
    emailTriggerRequest.open("POST", "/welcome-user", true);
    emailTriggerRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    emailTriggerRequest.send(formData);
}

function signUpNewsletter(skipDob) {
    if (window.location.host !== "www.cubanweekender.co.uk") {
        return;
    }
    var newsletterRequest, formData = getUserCrmData();
    function getUserCrmData() {
        var userData = {};
        if (skipDob) {
            userData = {
                email: currentUser.attributes.email,
                name: currentUser.attributes.name,
                dobDay: null,
                dobMonth: null,
                dobYear: null,
                postCode: currentUser.attributes.postcode || "",
                optIn: currentUser.attributes.receiveEmails ? 1 : 0
            };
        } else {
            userData = {
                email: currentUser.attributes.email,
                name: currentUser.attributes.name,
                dobDay: currentUser.attributes.birthday.getDate(),
                dobMonth: currentUser.attributes.birthday.getMonth() + 1,
                dobYear: currentUser.attributes.birthday.getFullYear(),
                postCode: currentUser.attributes.postcode || "",
                optIn: currentUser.attributes.receiveEmails ? 1 : 0
            };
        }
        var keyValuePairs = [], i;
        for (i in userData) {
            if (userData.hasOwnProperty(i)) {
                keyValuePairs.push(encodeURIComponent(i) + "=" + encodeURIComponent(userData[i]));
            }
        }
        return keyValuePairs.join("&");
    }
    function signupResponse(e) {
        var target = e.target, response;
        if (target.readyState !== 4) {
            return;
        }
        if (target.status >= 200 && target.status < 400) {
            response = JSON.parse(target.responseText);
            if (response.success) {} else {
                console.error(response);
            }
        } else {
            console.error("Error submitting form.", target.responseText);
        }
    }
    newsletterRequest = new XMLHttpRequest();
    newsletterRequest.onreadystatechange = signupResponse;
    newsletterRequest.open("POST", "/subscribe", true);
    newsletterRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    newsletterRequest.send(formData);
}

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
    // do something when device orientation changes
    var appContainer = document.getElementById(app), scrollableContainer = document.getElementsByClassName("scrollable")[0], fullHeight = window.innerHeight;
    appContainer.style.height = fullHeight;
    scrollableContainer.style.height = fullHeight;
}, false);

var currentUser, app = new App();