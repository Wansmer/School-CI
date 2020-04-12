module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome' // this browser should be installed on your OS
      },
      pageLoadTimeout: 10000
    }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'tests/hermione/hermione-html-report'
    }
  }
};