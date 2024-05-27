require('./src/formatter/flutter/theme/color/theme-color-extend')
require('./src/filters/file-path')

const StyleDictionary = require('style-dictionary').extend({
    source: ['token/global.json','token/app_dark.json'],
    platforms:{
        flutter: {
            transformGroup: "flutter",
            buildPath: "../lib/tokens/",
            files: [
                {
                    destination: "theme/bitkub_dark_color.g.dart",
                    format: "flutter/theme-extend",
                    className: "BitkubDarkColor",
                    filter: 'isDark'
                }
            ]
        }
    }
})


StyleDictionary.buildAllPlatforms()
