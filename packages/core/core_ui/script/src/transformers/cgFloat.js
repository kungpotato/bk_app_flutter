const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
    type: 'name',
    transitive: true,
    name:'CGFloat',
    matcher: token => ['borderRadius', 'borderWidth', 'blur', 'lineHeights', 'spacing','fontSizes',].includes(token.type),
    transformer: token => token.name + ': CGFloat'
})

