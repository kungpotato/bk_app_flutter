const StyleDictionary = require("style-dictionary");
const {
    capitalize,
    generateSpace,
    createStructHeader,
    createStructFooter,
    createSwiftFile,
    camelize, createDartFile
} = require("../../../../helper/utils");

const generateClassData = (json, className) => {
    let inner = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
                let fontFamilyPath = json[key].value.rawFamily.split(' ').join('')
                let fontName = `"${fontFamilyPath}{0}"`

                switch (Number(json[key].value.rawWeight)){
                    case 300:
                        fontName = fontName.replace('{0}','-Regular')
                        break
                    case 500:
                        fontName = fontName.replace('{0}','-Medium')
                        break
                    case 600:
                        fontName = fontName.replace('{0}','-SemiBold')
                        break
                }

                let fontSizePath = json[key].value.rawSize.replace('px','').split('*').reduce((a,b) => a*b,1)
                let fontSizeInstance = fontSizePath


                let fontWeightInstance = ''
                if(json[key].value.weight) {
                    let fontWeightPath = json[key].value.weight
                        .replace('bk.global', 'BKGlobal')
                        .replace('{', '').replace('}', '').split('.')
                    fontWeightPath = fontWeightPath.map((p, index) => (isFinite(p) ? fontWeightPath[index - 1] : '') + p)

                    fontWeightInstance = `${fontWeightPath.shift()}${capitalize(camelize(fontWeightPath.shift()))}.shared.${fontWeightPath.join('.')}`
                } else {
                    fontWeightInstance = 'FontWeight.w300'
                }

                let field = json[key].path.slice(3).map(x=>capitalize(camelize(x)))
                field[0] = field[0].toLowerCase()
                inner += `   final ${field.join('')} = ${!json[key].value.weight ? 'const' : ''} TextStyle(fontFamily: ${fontName}, fontSize: ${fontSizeInstance}, fontWeight: ${fontWeightInstance});\n`
        } else {
            inner += generateClassData(json[key],className)
        }
    })
    return inner
}
const generateClasses = (json, baseClass) => {
    let data = ''
    Object.keys(json).forEach(key => {
        if(!json[key].isSource) {
            const inner = generateClassData(json[key], baseClass)
            const className = capitalize(camelize(key))
            data += `class BK${className}Font {\n`
            data += `    BK${className}Font();\n`
            data += `    static final shared = BK${className}Font();\n\n`
            data += inner
            data += '}\n\n'
        }
    })
    return data
}
const generateData = (json, mark, className, depth = 0) => {
    let space = generateSpace(depth)
    let data = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){

        } else {
            data += `    final ${camelize(key)} = BK${capitalize(camelize(key))}Font.shared;\n`
        }
    })
    return data
}

const mergeData = (family, weight, size) => {
    Object.keys(family).forEach(key => {
        if (family[key].isSource) {
            family[key].value = {
                family: family[key].original.value,
                rawFamily: family[key].value,
                size: size[key].original.value,
                rawSize: size[key].value,
                weight: weight && weight[key] ? weight[key].original.value : null,
                rawWeight: weight && weight[key] ? weight[key].value : 300,
            }
        } else {
            mergeData(family[key], weight ? weight[key] : null, size[key])
        }
    })
}

StyleDictionary.registerFormat({
    name: 'flutter/theme-font',
    formatter: ({dictionary, platform, options, file}) => {
        const family = dictionary.tokens.bk['font-family']
        const weight = dictionary.tokens.bk['font-weight']
        const size = dictionary.tokens.bk['font-size']
        mergeData(family, weight, size)
        const generatedData = generateData(family, '', file.className)
        let data = createDartFile(file.className, generatedData, file.destination,true, true, 'theme_font')
        data += generateClasses(family, file.className)
        return data
    }
})


