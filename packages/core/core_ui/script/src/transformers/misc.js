const {camelize, capitalize} = require("../helper/utils");
const StyleDictionary = require("style-dictionary");
StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'misc',
    matcher: token => {
        token.name = camelize(token.path.map((path, index) => index === 0 ? path : capitalize(path)).join(''))
        if (token.type === 'textCase' ||
            token.type === 'textDecoration' ||
            token.type === 'boxShadow' ||
            token.type === 'fontStyle'
        ) {
            token.value = `"${token.value}"`
        }


    },
    transformer: token => token
})
