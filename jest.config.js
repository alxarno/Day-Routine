module.exports = {
  "verbose": false,
  "silent": false,
  "testEnvironment": "node",
  "setupFiles":["<rootDir>/jest.setup.js"],
  "modulePaths": [
    "<rootDir>"
  ],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "diagnostics": false
    }
  },
  "testMatch": [
    "<rootDir>/**/*.test.tsx",
    "<rootDir>/**/*.test.ts"
  ]
}