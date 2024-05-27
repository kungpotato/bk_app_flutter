const StyleDictionary = require("style-dictionary");
StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'multiply',
    matcher: token => token.value.includes('*'),
    transformer: token => token.original.value.replace('*', ' * ')
})


StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'divide',
    matcher: token => token.value.includes('/'),
    transformer: token => token.original.value.replace('/',' / ')
})
