const {
    generateSpace,
    createStructHeader,
    camelize,
    createStructFooter,
    createSwiftFile, createDartFile
} = require("../../../helper/utils");
const StyleDictionary = require("style-dictionary");
const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final ${camelize(key)} = ${json[key].value.replace('px','').replace('*',' * ')};\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/blur',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global.blur, '', 1)
        return createDartFile(file.className, generatedData, file.destination, false,false)
    }
})
