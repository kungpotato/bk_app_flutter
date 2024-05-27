require('./src/formatter/flutter/theme/color/theme-color')
require('./src/formatter/flutter/theme/dimensions/theme-border')
require('./src/formatter/flutter/theme/dimensions/theme-padding')
require('./src/formatter/flutter/theme/font/theme-font')

require('./src/filters/file-path')


const StyleDictionary = require('style-dictionary').extend({
    source: ['token/global.json', 'token/app-default.json', 'token/app_component.json'],
    platforms: {
        flutter: {
            transformGroup: 'flutter',
            buildPath: '../lib/tokens/',
            files: [
                {
                    destination: "theme/bitkub_base_color.g.dart",
                    format: "flutter/theme",
                    className: "BitkubBaseColor",
                    filter: 'isDefault'
                },
                {
                    destination: "theme/bitkub_border.g.dart",
                    format: "flutter/theme-border",
                    className: "BitkubBorder",
                    filter: 'isDefault'
                },
                {
                    destination: "theme/bitkub_padding.g.dart",
                    format: "flutter/theme-padding",
                    className: "BitkubPadding",
                    filter: 'isDefault'
                },
                {
                    destination: "theme/bitkub_font.g.dart",
                    format: "flutter/theme-font",
                    className: "BitkubFont",
                    filter: 'isDefault'
                },
            ]
        }
    }
})


StyleDictionary.buildAllPlatforms()
