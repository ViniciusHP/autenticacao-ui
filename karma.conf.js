// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      "karma-jasmine",
      "karma-jasmine-html-reporter",
      "karma-junit-reporter",
      "karma-spec-reporter",
      "karma-coverage",
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "@angular-devkit/build-angular/plugins/karma",
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/carteira-ui"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    proxies: {
      "/oauth/refresh-token": "http://localhost:8080",
    },
  });
};
