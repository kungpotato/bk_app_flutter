module.exports = {
    collectCoverageFrom: ['**/*.js'],
    coverageDirectory: 'coverage',

    coveragePathIgnorePatterns: [
        '/node_modules/',
        '.spec.js',
        '<rootDir>/coverage/',
        '<rootDir>/jest.config.js',
        '<rootDir>/config.js',
        '<rootDir>/dark.js',
        '<rootDir>/default.js',
        '<rootDir>/global.js',
        '<rootDir>/index.js',
        '<rootDir>/src/filters/',
        '<rootDir>/src/formatter/',
        '<rootDir>/src/transformer',
        'mock.js'
    ],
    moduleDirectories: ['node_modules','src'],
    moduleFileExtension: ['js','json','node'],
    testPathIgnorePatterns: ['/node_modules/'],
}
