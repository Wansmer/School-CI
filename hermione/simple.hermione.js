const assert = require('assert');

describe('Наличие блока .content', function () {
  it('должен появиться на странице', function () {
    return this.browser
      .url('/')
      .isExisting('.Content')
      .then((exist) => {
        assert.ok(exist, 'Не загружено...');
      })
  })
})