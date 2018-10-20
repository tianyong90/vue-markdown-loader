"use strict";
exports.__esModule = true;
var markdown_it_container_1 = require("markdown-it-container");
exports["default"] = (function (md) {
    var _a, _b;
    (_a = (_b = md.use.apply(md, createContainer('tip', 'TIP'))).use.apply(_b, createContainer('warning', 'WARNING'))).use.apply(_a, createContainer('danger', 'WARNING')).use(markdown_it_container_1["default"], 'v-pre', {
        render: function (tokens, idx) {
            return tokens[idx].nesting === 1 ? "<div v-pre>\n" : "</div>\n";
        }
    });
});
function createContainer(klass, defaultTitle) {
    return [
        markdown_it_container_1["default"],
        klass,
        {
            render: function (tokens, idx) {
                var token = tokens[idx];
                var info = token.info
                    .trim()
                    .slice(klass.length)
                    .trim();
                if (token.nesting === 1) {
                    return "<div class=\"" + klass + " custom-block\"><p class=\"custom-block-title\"></p>\n";
                }
                else {
                    return "</div>\n";
                }
            }
        },
    ];
}
