const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'font',
    matcher: token => token.type === 'fontFamilies',
    transformer: token => `"${token.original.value}"`
})
