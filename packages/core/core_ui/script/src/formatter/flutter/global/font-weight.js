const StyleDictionary = require("style-dictionary");
const {createSwiftFile, generateSpace, createStructHeader, createStructFooter, camelize, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final ${camelize(key)} = FontWeight.w${json[key].value};\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/font-weight',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global['font-weight'], '', 1)
        return createDartFile(file.className, generatedData,file.destination,false)
    }
})
