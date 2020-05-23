const assert = require('assert');
const {expect} = require('chai');

describe('Страница /history', function () {
  it('Отображается правильный title', function () {
    return this.browser
      .url('/history')
      .getTitle()
      .then((value) => {
        assert.equal(value, 'School CI');
      });
  });

  it('По клику на кнопку Rebuild открывается модальное окно', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .click('#run_build')
      .waitForVisible('.Modal')
      .then((exist) => {
        assert.ok(exist, 'Модальное окно не открылось')
      });
  });

  it('Заголовок содержит ссылку на страницу /history', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .$('#title_link')
      .getAttribute('href')
      .then((value) => {
        assert.equal(value, 'http://localhost:3000/history')
      });
  });

  it('Во время загрузки страницы кнопка "Run Build" задизейблена', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Button')
      .$('#run_build')
      .getAttribute('disabled')
      .then((value) => {
        assert.ok(value, 'Не задизейблена')
      });
  });

  it('Кнопка настроек ведет на страницу настроек (/settings)', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .click('#settings_header')
      .waitForVisible('.Form')
      .then((value) => {
        assert.ok(value, 'Переход не осуществился')
      });
  });

  it('Кнопка настроек имеет класс .Button_text_hidden', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .$('#settings_header')
      .getAttribute('class')
      .then((value) => {
        expect(value).to.include('Button_text_hidden')
      });
  });

  it('Присутствует кнопка \'Show more\'', function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .isExisting('#show_more')
      .then((value) => {
        assert.ok(value, 'Кнопка не найдена')
      });
  });

  it('При клике на первый тикет идет переадресация на страницу ./details', async function () {
    return this.browser
      .url('/history')
      .waitForVisible('.Page')
      .$('.TicketList')
      .click('.Ticket')
      .pause(3000)
      .waitForVisible('.Ticket_show_details')
      .then((value) => {
        assert.ok(value, 'Страница открыта')
      });
  });
})