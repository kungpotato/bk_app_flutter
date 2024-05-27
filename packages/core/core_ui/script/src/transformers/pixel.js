const StyleDictionary = require("style-dictionary");
StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'pixel',
    matcher: token => {
        const pixel = /([0-9]{1,4})px|([0-9]{1,4}?\.[0-9]{1,4})px/
        return pixel.exec(token.value)
    },
    transformer: token => {
        return Number(token.original.value.replace('px','')).toFixed(1)
    }
})
