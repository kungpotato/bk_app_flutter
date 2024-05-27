const StyleDictionary = require("style-dictionary")
const {capitalize, generateSpace, createStructHeader, createStructFooter, createSwiftFile, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final height${key} = ${Number(json[key].value.replace('px','')).toFixed(2)};\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/line-height',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global['line-height'])
        return createDartFile(file.className, generatedData,file.destination,false,false)
    }
})
