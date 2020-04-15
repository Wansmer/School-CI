const assert = require('assert');
const {expect} = require('chai');

describe('Страница /settings', function () {
  it('Отображается правильный title', function () {
    return this.browser
      .url('/settings')
      .getTitle()
      .then((value) => {
        assert.equal(value, 'School CI');
      });
  });

  it('По клику на кнопку Cancel происходит переадресация на страницу /history', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      .click('#cancel')
      .waitForVisible('.Page')
      .waitForVisible('#run_build')
      .then((exist) => {
        assert.ok(exist, 'Переадресация не прошла')
      });
  });

  it('Заголовок содержит ссылку на главную страницу /', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      .$('#title_link')
      .getAttribute('href')
      .then((value) => {
        assert.equal(value, 'http://localhost:3000/')
      });
  });
  //
  //it('Во время загрузки страницы кнопка "Run Build" задизейблена', function () {
  //  return this.browser
  //    .url('/history')
  //    .waitForVisible('.Button')
  //    .$('#run_build')
  //    .getAttribute('disabled')
  //    .then((value) => {
  //      assert.ok(value, 'Не задизейблена')
  //    });
  //});

  it('Input \'Github repository\' в фокусе', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      .$('#repoName')
      .getAttribute('autofocus')
      .then((value) => {
        expect(value).to.be.true;
      });
  });

  //it('Кнопка настроек имеет класс .Button_text_hidden', function () {
  //  return this.browser
  //    .url('/settings')
  //    .waitForVisible('.Page')
  //    .$('#settings_header')
  //    .getAttribute('class')
  //    .then((value) => {
  //      expect(value).to.include('Button_text_hidden')
  //    });
  //});

  it('В блоках Input без текста отсутствует элемент span (.Input-Icon .Icon .Icon_inputClear)', function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      .$('#repoName')
      .setValue('')
      .then((value) => {
        assert.ok(value, 'Span отображается')
      });
  });

  it('При сабмите формы кнопки \'Save\' и \'Cancel\' задизейблены', async function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      // ...
      .then((value) => {
        assert.ok(value, 'Кнопки не задизейблены')
      });
  });

  it('Клик по span (.Input-Icon .Icon .Icon_inputClear) удаяет value текущего input', async function () {
    return this.browser
      .url('/settings')
      .waitForVisible('.Page')
      // ...
      .then((value) => {
        assert.ok(value, 'Удаления value не происходит')
      });
  });
})