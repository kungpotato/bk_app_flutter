require('./src/formatter/flutter/global/color')
require('./src/formatter/flutter/global/aspect-ratio')
require('./src/formatter/flutter/global/blur')
require('./src/formatter/flutter/global/border')
require('./src/formatter/flutter/global/font-family')
require('./src/formatter/flutter/global/font-size')
require('./src/formatter/flutter/global/font-weight')
require('./src/formatter/flutter/global/letter-spacing')
require('./src/formatter/flutter/global/line-height')
require('./src/formatter/flutter/global/opacity')
// require('./src/formatter/flutter/global/sizing')
require('./src/formatter/flutter/global/space')

require('./src/filters/file-path')


const StyleDictionary = require('style-dictionary').extend({
    source: ['token/*.json'],
    platforms:{
        flutter: {
            transformGroup: "flutter",
            buildPath: "../lib/tokens/",
            files: [
                {
                    destination: "global/bk_global_color.g.dart",
                    className: "BKGlobalColor",
                    format: "flutter/color",
                    filter: "isGlobal"
                },
                {
                    destination: 'global/bk_global_aspect_ratio.g.dart',
                    className: 'BKGlobalAspectRatio',
                    format: 'flutter/aspect-ratio',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_blur.g.dart',
                    className: 'BKGlobalBlur',
                    format: 'flutter/blur',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_border.g.dart',
                    className: 'BKGlobalBorder',
                    format: 'flutter/border',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_font_family.g.dart',
                    className: 'BKGlobalFontFamily',
                    format: 'flutter/font-family',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_font_size.g.dart',
                    className: 'BKGlobalFontSize',
                    format: 'flutter/font-size',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_font_weight.g.dart',
                    className: 'BKGlobalFontWeight',
                    format: 'flutter/font-weight',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_letter_spacing.g.dart',
                    className: 'BKGlobalLetterSpacing',
                    format: 'flutter/letter-spacing',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_line_height.g.dart',
                    className: 'BKGlobalLineHeight',
                    format: 'flutter/line-height',
                    filter: 'isGlobal'
                },
                {
                    destination: 'global/bk_global_opacity.g.dart',
                    className: 'BKGlobalOpacity',
                    format: 'flutter/opacity',
                    filter: 'isGlobal'
                },
                // {
                //     destination: 'global/bk_global_sizing.g.dart',
                //     className: 'BKGlobalSizing',
                //     format: 'flutter/sizing',
                //     filter: 'isGlobal'
                // },
                 {
                     destination: 'global/bk_global_space.g.dart',
                     className: 'BKGlobalSpace',
                     format: 'flutter/space',
                     filter: 'isGlobal'
                },
            ]
        }
    }
})


StyleDictionary.buildAllPlatforms()
