const StyleDictionary = require("style-dictionary");
const {generateSpace, createStructHeader, createStructFooter, createSwiftFile, camelize, capitalize, createDartFile} = require("../../../../helper/utils");

const generateClassData = (json, className) => {
    let inner = ''
    Object.keys(json).forEach(key => {
        if(json[key].isSource){
            let name = isFinite(key) ? mark : ''
            let path = json[key].path.slice(3).map(x=> capitalize(camelize(x)))
            path[0] = path[0].toLowerCase()
            name += path.join('')

            const val = json[key].original.value

            if (val.includes('bk.global')) {
                let path = val
                    .replace('bk.global', 'BKGlobal')
                    .replace('{', '').replace('}', '').split('.')
                path = path.map((p, index) => (isFinite(p) ? path[index - 1] : '') + p)

                let instance = `${path.shift()}${capitalize(camelize(path.shift()))}.shared.${path.slice(1).join('.')}`

                inner += `    final ${name} = ${instance};\n`
            } else if (val.includes('bk.')) {
                let path = val
                    .replace('bk', 'BKGlobal')
                    .replace('{', '').replace('}', '').split('.')
                path = path.map((p, index) => (isFinite(p) ? path[index - 1] : '') + p)
                let instance = `${className}._${path[2]}.${path[3]}.${path[4].toUpperCase()}`

                inner += `    final ${name} = ${instance};\n`
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
            data += `class BK${className} {\n`
            data += `    BK${className}();\n`
            data += `    static final shared = BK${className}();\n\n`
            data += inner
            data += '}\n\n'
        }
    })
    return data
}
const generateData = (json, mark, className,depth = 0) => {
    let space = generateSpace(depth)
    let data = createStructHeader(mark, space, null, true)
    Object.keys(json).forEach(key => {
        if (json[key].isSource) {


        } else {
            data += `    final ${camelize(key)} = BK${capitalize(camelize(key))}.shared;\n`
        }
    })

    return data
}

StyleDictionary.registerFormat({
    name: 'flutter/theme-border',
    formatter: ({dictionary, platform, options, file}) => {
        let generatedData = generateData(dictionary.tokens.bk.border, '',file.className, 1)
        let data = createDartFile(file.className, generatedData, file.destination,true, false, 'theme_border')
        data += generateClasses(dictionary.tokens.bk.border, file.className)
        return data
    }
})
