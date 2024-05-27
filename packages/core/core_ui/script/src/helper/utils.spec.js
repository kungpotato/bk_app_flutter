const {
    capitalize, camelize, generateSpace, createSwiftFile, createSwiftFileExtends, createStructHeader,
    createStructFooter, convertHex8ToRGBA, createAndroidComment, cleanInit
} = require("./utils");
const {
    androidComment,
    global,
    theme,
    extended,
    headerNormal,
    headerBase,
    headerBaseColor,
    headerExtend,
    initString
} = require("./mock");
require('../formatter/swift/theme/color/theme-color-extends')

describe("String manipulation", () => {
    it("Capitalize", () => {
        // Given
        const text = "hello"
        // When
        const newText = capitalize(text)
        // Then
        expect(newText).toEqual('Hello')
    })

    it("Camelize", () => {
        // Given
        const text = 'hello-world'
        // When
        const newText = camelize(text)
        // Then
        expect(newText).toEqual('helloWorld')
    })

    it("Generate spaces", () => {
        // When
        const spaces = generateSpace(2)
        // Then
        expect(spaces).toEqual('        ')
    })


    it("Android comment", () => {
        const comment = createAndroidComment({destination: 'values/aspect_ratio.xml'})

        expect(comment).toEqual(androidComment)
    })

    it("Clean orphanage init()", () => {
        const cleaned = cleanInit(initString)
        expect(cleaned).toEqual('')
    })
})

describe("Create Swift file", () => {

    it("Create Swift file: global", () => {

        const file = createSwiftFile("Bitkub", '')

        expect(file).toEqual(global)
    })

    it("Create Swift file: theme", () => {

        const file = createSwiftFile("Bitkub", '', true)

        expect(file).toEqual(theme)
    })

    it("Create Swift file extends", () => {
        const file = createSwiftFileExtends("BitkubExtend", "Bitkub", "")
        expect(file).toEqual(extended)
    })
})

describe("Struct header and footer", () => {
    it("Create Struct header: none", () => {
        const header = createStructHeader('', generateSpace(1))

        expect(header).toEqual('')
    })

    it("Create Struct header: normal", () => {
        const header = createStructHeader('primary', generateSpace(1))

        expect(header).toEqual(headerNormal)
    })

    it("Create Struct header: base", () => {
        const header = createStructHeader('base', generateSpace(1), null, true)

        expect(header).toEqual(headerBase)
    })

    it("Create Struct header: base color", () => {
        const header = createStructHeader('green', generateSpace(1), null, true, true)

        expect(header).toEqual(headerBaseColor)
    })

    it("Create Struct header: extend", () => {
        const header = createStructHeader('primary', generateSpace(1), 'Dark')

        expect(header).toEqual(headerExtend)
    })

    it("Create Struct footer: normal", () => {
        const footer = createStructFooter('hello', generateSpace(1))

        expect(footer).toEqual('    }\n\n')
    })


    it("Create Struct footer: none", () => {
        const footer = createStructFooter('', generateSpace(1))

        expect(footer).toEqual('')
    })
})

describe("Color", () => {
    it("Convert hex to RGBA", () => {
        const color = convertHex8ToRGBA('#FF0000FF')
        expect(color).toEqual({r: 255, g: 0, b: 0, a: 255})
    })
})
