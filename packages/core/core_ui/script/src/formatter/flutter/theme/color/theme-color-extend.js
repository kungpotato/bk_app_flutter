
const StyleDictionary = require("style-dictionary");
const {capitalize, generateSpace, createStructHeader, createStructFooter, createSwiftFile, camelize, createDartFile} = require("../../../../helper/utils");
const {GLOBAL} = require("../../../../../config");

const generateClassData = (json, className) => {
    let inner = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            if(!key.toLowerCase().includes('hover')) {
                let name =  ''
                // name += camelize(key === 'default' ? 'defaults' : key)
                const fields = json[key].path.slice(3).map(x=>capitalize(camelize(x)))
                name += fields.map((x,i) => i === 0 ? x.toLowerCase() : x  ).join('')
                if (key !== 'gradient') {
                    if (json[key].original.value.includes('bk.global')) {
                        let path = json[key].original.value.replace('bk.global', 'BKGlobal').replace('{', '').replace('}', '').split('.')
                        path = path.map((p, index) => camelize((isFinite(p) ? path[index - 1] : '')) + camelize(p))

                        let instance = `${path.shift()}${capitalize(camelize(path.shift()))}.shared`

                        if(path[0] === 'transparent') {
                            path = [path[0],...path.slice(2,path.length)]
                        }

                        instance += `.${path.join('.')}`
                        inner += `    @override\n`
                        inner += `    get ${name} => ${instance};\n`
                    } else if (json[key].original.value.includes('bk.')) {

                        inner += `    @override\n`
                        inner += `    get ${name} => const Color(${createColor(json[key].value)});\n`
                    } else {
                        if (json[key].original.value === 'transparent') {
                            inner += `    @override\n`
                            inner += `    get ${name} => Colors.transparent;\n`
                        }
                    }
                }
            }
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
            data += `class BKDark${className} extends BK${className} {\n`
            data += `    BKDark${className}();\n`
            data += `    static final shared = BKDark${className}();\n\n`
            data += inner
            data += '}\n\n'
        }
    })
    return data
}

const createColor = (hex) => {
    let data = hex.replace('#','')
    if(data.length < 8) {
        data = 'FF' + data
    }
    data = '0x' + data
    return data.toUpperCase()
}
const generateData = (json, mark, className, depth = 0) => {
    let data = ''

    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            data += `    @override\n`
            data += `    get ${camelize(key)} => const Color(${createColor(json[key].value)});\n`
        } else {
            data += `    @override\n`
            data += `    get ${camelize(key)} => BKDark${capitalize(camelize(key))}.shared;\n`
        }
    })
    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/theme-extend',
    formatter: ({dictionary, platform, options, file}) => {
        const color = dictionary.tokens.bk.color
        const generatedData = generateData(color, '', file.className)
        let data = createDartFile(file.className, generatedData, file.destination, true, true, 'extend_color')
        data += generateClasses(color, file.className)
        return data
    }
})


