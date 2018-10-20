"use strict";
var _this = this;
exports.__esModule = true;
var hash_sum_1 = require("hash-sum");
var lru_cache_1 = require("lru-cache");
var highlight_js_1 = require("highlight.js");
// markdown-it and plugins
var markdown_it_1 = require("markdown-it");
var markdown_it_emoji_1 = require("markdown-it-emoji");
var markdown_it_anchor_1 = require("markdown-it-anchor");
var markdown_it_table_of_contents_1 = require("markdown-it-table-of-contents");
var containers_1 = require("./containers");
var md = markdown_it_1["default"]({
    html: true,
    highlight: function (str, lang) {
        if (lang && highlight_js_1["default"].getLanguage(lang)) {
            try {
                return ('<pre class="hljs"><code>' +
                    highlight_js_1["default"].highlight(lang, str, true).value +
                    '</code></pre>');
            }
            catch (__) { }
        }
        return ('<pre v-pre class="hljs"><code>' +
            md.utils.escapeHtml(str) +
            '</code></pre>');
    }
})
    .use(markdown_it_emoji_1["default"])
    .use(markdown_it_anchor_1["default"], {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
})
    .use(markdown_it_table_of_contents_1["default"], {
    includeLevel: [2, 3]
})
    .use(containers_1["default"]);
var cache = lru_cache_1["default"]({ max: 1000 });
exports["default"] = (function (src) {
    var isProd = process.env.NODE_ENV === 'production';
    var file = _this.resourcePath;
    var key = hash_sum_1["default"](file + src);
    var cached = cache.get(key);
    if (cached && (isProd || /\?vue/.test(_this.resourceQuery))) {
        return cached;
    }
    var html = md.render(src);
    var res = "<template>\n" + ("<div class=\"content\">" + html + "</div>\n") + "</template>\n";
    cache.set(key, res);
    return res;
});
