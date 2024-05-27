const StyleDictionary = require("style-dictionary");
const {createSwiftFile, generateSpace, createStructHeader, createStructFooter, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final sizing${key} = ${json[key].value.replace('px','')};\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/sizing',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global.sizing)
        return createDartFile(file.className, generatedData, file.destination,false,false)
    }
})
