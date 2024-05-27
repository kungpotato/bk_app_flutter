const StyleDictionary = require("style-dictionary");
const {createSwiftFile, createDartFile} = require("../../../helper/utils");
const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource) {
            data += `    final ${key} = ${json[key].value};\n`
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/aspect-ratio',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global['aspect-ratio'])
        return createDartFile(file.className, generatedData, file.destination, false,  false)
    }
})