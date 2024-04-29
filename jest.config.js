module.exports = {
  moduleNameMapper: {
    "^@vue/test-utils": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js", // Mapea el módulo de test-utils a la versión compilada
    "^@/(.*)$": "<rootDir>/src/$1", // Asegúrate de que <rootDir> apunte a la raíz de tu proyecto
    "\\.(webp|jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$": "<rootDir>/tests/__mocks__/fileMock.js", // Mapea archivos de imagen y fuentes a un archivo mock
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  '^.+\\.[tj]sx?$': 'babel-jest',
  "\\.(webp|jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$": "<rootDir>/tests/__mocks__/fileMock.js", // Mapea archivos de imagen y fuentes a un archivo mock
  },
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pug$",
  //   "\\.css$",
  //   "\\.sass$",
  //   "\\.scss$",
  //   "\\.less$",
  //   "\\.styl$",
  //   "\\.jpg$",
  //   "\\.jpeg$",
  //   "\\.png$",
  //   "\\.gif$",
  //   "\\.svg$",
  //   "\\.webp$",
  //   "\\.bmp$",
  //   "\\.tiff$",
  //   "\\.wav$",
  //   "\\.mp3$",
  //   "\\.mpeg$",
  //   "\\.midi$",
  //   "\\.webm$",
  //   "\\.mp4$",
  //   "\\.mov$",
  //   "\\.mkv$",
  //   "\\.avi$",
  //   "\\.ttf$",
  //   "\\.eot$",
  //   "\\.woff$",
  //   "\\.woff2$",
  //   "\\.otf$",
  //   "\\.ico$",
  //   "\\.pdf$",
  //   "\\.txt$",
  //   "\\.csv$",
  //   "\\.xls$",
  //   "\\.xlsx$",
  //   "\\.json$"
  // ], // Ignora transformaciones en node_modules
  testMatch: [
    '**/tests/**/*.spec.{js,jsx,ts,tsx}',
    '**/__tests__/*.{js,jsx,ts,tsx}'
  ],
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}", // Recolecta cobertura de estos archivos
    "!src/main.js", // Excluye archivos específicos
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
};
