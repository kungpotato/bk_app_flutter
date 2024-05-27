const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
    type: 'value',
    transitive: true,
    name: 'color',
    matcher: token => token.type === 'color',
    transformer: token => {
        const value = token.original.value
        if (value.includes('gradient')) {
            let cleanText = value.replace('linear-gradient(', '').replace(')', '').split(',')
            let degree = cleanText[0]
            let start = cleanText[1].split(' ')
            let end = cleanText[2].split(' ')
            let startPoint = `CGPoint(x: 0.0, y: 0.0)`
            let pointRatio = (end[2].replace('%', '') / 100).toFixed(1)
            let endPoint = degree === '90deg' ? `CGPoint(x: 0.0, y: ${pointRatio})` : `CGPoint(x: ${pointRatio}, y: 0.0)`
            return `GradientView(startColor: UIColor(hex: "${start[1]}")!, endColor: UIColor(hex: "${end[1]}")!, startPoint: ${startPoint}, endPoint: ${endPoint})`
        } else {
            return `UIColor(hex: "${value}")`
        }
    }
})
