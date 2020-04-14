const assert = require('assert');
const {expect} = require('chai');

describe('Страница /settings', function () {
  it('Отображается правильный title', function () {
    return this.browser
      .url('/')
      .getTitle()
      .then((value) => {
        assert.equal(value, 'School CI');
      });
  });

  it('Если настроек нет - отображается Home', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      // ...
      .then((exist) => {
        assert.ok(exist, 'Переадресация не прошла')
      });
  });

  it('Заголовок содержит ссылку на главную страницу /', function () {
    return this.browser
      .url('/')
      .waitForVisible('.Page')
      .$('#title_link')
      .getAttribute('href')
      .then((value) => {
        assert.equal(value, 'http://localhost:3000/')
      });
  });

  it('Если настройки есть - отображается History', function () {
    return this.browser
      .url('/history')
      // ...
      .then((value) => {
        assert.ok(value, 'Не задизейблена')
      });
  });

  it('Input \'Github repository\' в фокусе', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      // ...
      .then((value) => {
        assert.ok(value, 'Инпут в фокусе')
      });
  });

  it('Кнопка настроек в хэдэре ведет на страницу настроек', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      // ...
      .then((value) => {
        expect(value).to.include('Button_text_hidden')
      });
  });

  it('Кнопка настроек в элементе Land ведет на страницу настроек', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      // ...
      .then((value) => {
        assert.ok(value, 'Span отображается')
      });
  });

})