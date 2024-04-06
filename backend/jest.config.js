module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ],
  moduleNameMapper: {
    "@DataSource": "<rootDir>/src/database/DataSource.ts",
    "@Repository/(.*)": "<rootDir>/src/database/repositories/$1",
    "@Model/(.*)": "<rootDir>/src/database/models/$1",
    "@Server": "<rootDir>/src/api/server.ts",
    "@MainRouter": "<rootDir>/src/api/routes/index.ts",
    "@Route/(.*)": "<rootDir>/src/api/routes/$1",
    "@Interface/(.*)": "<rootDir>/src/interfaces/$1",
    "@Controller/(.*)": "<rootDir>/src/api/controllers/$1",
  }
};

process.env = Object.assign(process.env, {
  POSTGRES_DB: "giladb_test",
  POSTGRES_DB_PORT: 5433
});