const StyleDictionary = require("style-dictionary");
const {createSwiftFile, generateSpace, createStructHeader, createStructFooter, camelize, capitalize, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final ${camelize(key)} = "${json[key].value.split('').map(c => c === ' ' ? '':c).join('')}";\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/font-family',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global['font-family'], '', 1)
        return createDartFile(file.className, generatedData,file.destination,false,false)
    }
})
