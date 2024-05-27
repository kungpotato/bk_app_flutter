const capitalize = (str) => {
    return str.charAt(0).toUpperCase()+str.slice(1);
}

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())

const generateSpace = (depth) => {
    return ' '.repeat(4 * depth)
}

const createSwiftFile = (className, generateData, isTheme, type = 'class') => {
    let data = `//
//  ${className}.swift
//  ${className}
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//\n\n`
    data += 'import UIKit\n\n'
    data += `public ${type} ${className} {\n`
    if(!isTheme) {
        data += `    public static let shared = ${className}()\n`
    } else {
        data += `    public static let \`default\` = ${className}()\n`
    }
    data += generateData
    data += '}'
    return data
}

const createSwiftFileExtends = (className,extend, generateData) => {
    let data = `//
//  ${className}.swift
//  ${className}
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//\n\n`
    data += 'import UIKit\n\n'
    data += `public class ${className}: ${extend} {\n`
    data += `    public static let shared = ${className}()\n`
    data += generateData
    data += '}'
    return data
}

const createStructHeader = (mark, space, extend, base, baseColor) => {
    let data = ''
    if(mark){
        mark = camelize(mark)
        if(extend){
            // data += `${space}public var ${mark} = ${capitalize(mark)}${extend}()\n`
            // data += `${space}public class ${capitalize(mark)}${extend}: ${capitalize(mark)} {\n`
        } else {
            data += `${space}public var ${mark} = ${capitalize(mark)}()\n`
            // if(baseColor) {
            //     data += `${space}public static let _${mark} = ${capitalize(mark)}()\n`
            // }
            // if(base && mark === 'base' && !baseColor){
            //     data += `${space}public static let _${mark} = ${capitalize(mark)}()\n`
            // }
            // data += `${space}public class ${capitalize(mark)} {\n`
        }
        return data
    }
    return data
}

const createStructFooter = (mark, space) => {
    let data = ''
    if(mark){
        data += `${space}}\n\n`
    }
    return data
}

const convertHex8ToRGBA = (hexCode) => {
    var hex = hexCode.replace('#', '');

    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16),
        a = parseInt(hex.substring(6,8), 16)

    return {r,g,b,a}
}

const createAndroidComment = (file) => {
    const path = file.destination.split('/')
    return `<!--
    ${path[path.length - 1]}
    
    DO NOT directly modify this file. It's generate automatically somewhere else
    
    Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
    Copyright (c) Bitkub Online co.,ltd. All rights reserved.
-->\n\n`
}

if(typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function(match, replace) {
        return this.replace(new RegExp(match, 'g'), () => replace);
    }
}

const cleanInit = (text) => {
    return text.replaceAll(/\s+override init\(\)\{\n\s+super.init\(\)\n\{\{INSTANCE\}\}\n\s+\}/,'')
}

const createDartFile = (className, generateData, fileName, isTheme, imports = true,type = 'class') => {
    let data = `//
//  ${fileName}
//  ${className}
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//\n\n`

    let extended = ''
    if(imports) {
        data += 'import \'package:flutter/material.dart\';\n'
    }

    switch (type) {
        case 'base_color':
            data += 'import \'../global/bk_global_color.g.dart\';\n'
            break;
        case 'extend_color':
            data += 'import \'../global/bk_global_color.g.dart\';\n'
            data += 'import \'bitkub_base_color.g.dart\';\n'
            extended = `extends BitkubBaseColor `
            break;
        case 'theme_border':
            data += 'import \'../global/bk_global_border.g.dart\';\n'
            break
        case 'theme_padding':
            data += 'import \'../global/bk_global_space.g.dart\';\n'
            break
        case 'theme_font':
            data += 'import \'../global/bk_global_font_weight.g.dart\';\n'
            break
    }

    data += '\n'
    data += `class ${className} ${extended}{\n`
    data += `    ${className}();\n`
    data += `    static final shared = ${className}();\n`
    data += generateData
    data += '}\n\n'

    return data
}

module.exports = {
    capitalize,
    camelize,
    generateSpace,
    createStructHeader,
    createStructFooter,
    createSwiftFile,
    createSwiftFileExtends,
    convertHex8ToRGBA,
    createAndroidComment,
    createDartFile,
    cleanInit
}
