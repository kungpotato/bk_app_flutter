const StyleDictionary = require("style-dictionary");
const {createSwiftFile, generateSpace, createStructHeader, createStructFooter, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final space${key} = ${json[key].value.replace('px','')}.0;\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/space',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global.space)
        return createDartFile(file.className, generatedData,file.destination,false,false)
    }
})
