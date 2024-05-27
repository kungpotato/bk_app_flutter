const StyleDictionary = require("style-dictionary");
const {GLOBAL, APP_DEFAULT, APP_COMPONENT, APP_DARK} = require("../../config");

StyleDictionary.registerFilter({
    name: 'isGlobal',
    matcher: function(token) {
        return token.filePath === GLOBAL;
    }
})

StyleDictionary.registerFilter({
    name: 'isDefault',
    matcher: function(token) {
        return token.filePath === APP_DEFAULT || token.filePath === APP_COMPONENT;
    }
})

StyleDictionary.registerFilter({
    name: 'isComponent',
    matcher: function(token) {
        return token.filePath === APP_COMPONENT;
    }
})

StyleDictionary.registerFilter({
    name: 'isDark',
    matcher: function(token) {
        return token.filePath === APP_DARK;
    }
})
