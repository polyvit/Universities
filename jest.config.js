module.exports = {
  clearMocks: true, // mocks = данные-заглушки
  collectCoverageFrom: ["src/**/*.js"], // откуда собирать инфу для отчета о покрытии
  coverageDirectory: "coverage", // где будет храниться отчет о покрытии
  moduleFileExtensions: ["js"], // какие файлы тестируем
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"], // где могут находиться тесты
  testPathIgnorePatterns: ["\\\\node_modules\\\\"], // где тесты искать не надо
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  // verbose: false, // не хотим видеть отчет о тестах
};
