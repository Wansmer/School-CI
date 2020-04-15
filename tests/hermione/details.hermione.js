const assert = require('assert');
const {expect} = require('chai');

describe('Страница /build/:buildId', function () {
  const idExample = 'f40fa4ea-9007-4b5a-9a0b-c7c10ffad34a';
  const settings = '123123123';

  it('Отображается правильный title', function () {
    console.log('ВЫВОД ПРОПСОВ', this.props);
    return this.browser
      .url(`/build/${idExample}`)
      .pause(3000)
      .getTitle()
      .then((value) => {
        assert.equal(value, 'School CI');
      });
  });

  it('Клик по заголовку страницы переадресует на адрес \'/history\'', function () {
    return this.browser
      .url(`/build/${idExample}`)
      .waitForVisible('.Page')
      .$('#title_link')
      .getAttribute('href')
      .then((value) => {
        assert.equal(value, 'http://localhost:3000/history')
      });
  });

  it('Во время загрузку кнопка \'Rebuild\' задизейблена', function () {
    return this.browser
      .url(`/build/${idExample}`)
      .waitForVisible('.Header')
      .$('#rebuild')
      .getAttribute('disabled')
      .then((value) => {
        assert.ok(value, 'Не задизейблена')
      });
  });

  it('Кнопка настроек ведет на страницу настроек (/settings);', function () {
    return this.browser
      .url(`/build/${idExample}`)
      .waitForVisible('.Page')
      .click('#settings_header')
      .waitForVisible('.Form')
      .then((value) => {
        assert.ok(value, 'Переход не осуществился')
      });
  });

  it('Блок с классом .Ticket имеет класс .Ticket_show_details', function () {
    return this.browser
      .url(`/build/${idExample}`)
      .waitForVisible('.Page')
      .$('#settings_header')
      .getAttribute('class')
      .then((value) => {
        expect(value).to.include('Button_text_hidden')
      });
  });

  it('После нажатия, кнопка \'Rebuild \' дизейблится и осуществляется переход' +
    ' на страницу новой сборки', function () {
    return this.browser
      .url(`/build/${idExample}`)
      .waitForVisible('.Page')
      .$('.TicketList')
      .click('.Ticket')
      .pause(3000)
      .waitForVisible('.Ticket_show_details')
      .then((value) => {
        assert.ok(value, 'Страница открыта')
      });
  });
});