const StyleDictionary = require("style-dictionary");
const {capitalize, generateSpace, createStructHeader, createStructFooter, createSwiftFile, createDartFile} = require("../../../helper/utils");

const generateData = (json) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final ${json[key].path.slice(3).join('')} = ${Number(json[key].value.replace('px','')).toFixed(2)};\n`
        } else {
            data += generateData(json[key])
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/border',
    formatter: ({dictionary, platform, options, file}) => {
        const borderRadius = dictionary.tokens.bk.global.border
        const generatedData = generateData(borderRadius, '')
        return createDartFile(file.className, generatedData,file.destination, false, false)
    }
})
