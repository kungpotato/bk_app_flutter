const StyleDictionary = require("style-dictionary");
const {createSwiftFile, generateSpace, createStructHeader, convertHex8ToRGBA, createStructFooter, capitalize,
    createDartFile
} = require("../../../helper/utils");

const generateData = (json, mark = '', depth = 0) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    final space${capitalize(key)} = ${json[key].value.replace('px','').split('*').reduce((a,b)=>a*b,1)};\n`
        } else {
            data += generateData(json[key], key, depth + 1)
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/letter-spacing',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.global['letter-spacing'], '', 1)
        return createDartFile(file.className, generatedData,file.destination,false,false)
    }
})
