const initString = ` override init(){
    super.init()
{{INSTANCE}}
 }`


const global = `//
//  Bitkub.swift
//  Bitkub
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//

import UIKit

public class Bitkub {
    public static let shared = Bitkub()
}`

const theme = `//
//  Bitkub.swift
//  Bitkub
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//

import UIKit

public class Bitkub {
    public static let \`default\` = Bitkub()
}`

const extended = `//
//  BitkubExtend.swift
//  BitkubExtend
//
//  DO NOT directly modify this file. It's generate automatically somewhere else
//
//  Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
//  Copyright (c) Bitkub Online co.,ltd. All rights reserved.
//

import UIKit

public class BitkubExtend: Bitkub {
    public static let shared = BitkubExtend()
}`

const headerNormal = `    public var primary = Primary()
    public class Primary {
`

const headerExtend = `    public class PrimaryDark: Primary {
`

const headerBase = `    public var base = Base()
    public static let _base = Base()
    public class Base {
`

const headerBaseColor = `    public var green = Green()
    public static let _green = Green()
    public class Green {
`

const androidComment = `<!--
    aspect_ratio.xml
    
    DO NOT directly modify this file. It's generate automatically somewhere else
    
    Generated by ai.nattapol on ${new Date().toLocaleDateString("th-TH")} BE.
    Copyright (c) Bitkub Online co.,ltd. All rights reserved.
-->

`

module.exports ={
    androidComment,
    initString,
    headerBaseColor,
    headerBase,
    theme,
    headerExtend,
    extended,
    global,
    headerNormal
}
