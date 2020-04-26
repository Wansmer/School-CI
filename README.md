# School-CI: непрерывная интеграция - ни один коммит не уйдет не собранным. 

> Версия node: v12.16.2
> На typescript переведены `./client` и `./serverFront`, согласно заданию. Так что установку `./server` и `./agent` можно пропустить, если нет задачи проводить реальную сборку.

## Начало работы:
1. Клонировать репозиторий с проектом;
2. В командной строке перейти в директорию проекта и переключится на ветку задания, которая была написана в тикете:
```bash
% git checkout NAME_OF_BRANCH
```

## Предварительная настройка: 
1. Перейти в поддиректорию `./server`;
2. Создать файл `.env` в корне поддиректории;
3. Добавить в файл следующий текст:
```txt
SECRET_KEY = 'Bearer YOUR_SECRET_KEY'
NODE_TLS_REJECT_UNAUTHORIZED = '0'
```

4. Убедиться, что файл сохранен, а значение SECRET_KEY начинается с Bearer<пробел>;
5. Перейти к запуску проекта.

## Запуск проекта (react + serverFront): 
1. В командной строке перейти в директорию проекта и запустить команды последовательно: 
  - Предварительная установка пакетов:
```bash
% npm i
``` 
  - Установка пакетов в поддиректориях `./client` и `./serverFront`:
```bash
% npm run postinstall
```
  - Запуск серверов (client - порт 3000, server - порт 3001):
```bash
% npm run start
```
2. ...
3. PROFIT! Проект запущен и автоматически открылся в вашем браузере по адресу [http://localhost:3000](http://localhost:3000).

### Приложение BuildServer `./server`;
1. Перейти в директорию, создать файл `./server-conf.js` и поместить в него следующий текст и добавить свой токен (без Bearer) и изменить `port`, если это необходимо:

```js
{
  "port": 8080,
  "apiBaseUrl": "https://hw.shri.yandex/api/",
  "apiToken": "SET_YOUR_TOKEN_HERE"
}
```

2. Установить зависимости: 
```bash
% npm ci
```

3. Запустить сервер:
```bash
% npm start
```

### Приложение(я) Agent `./agent`.
1. Установить зависимости: 
```bash
% npm ci
```

2. В случае необходимости, изменить поля в файле настроек `./agent-conf.js` на актуальные: 

```js
{
  "port": 8081,
  "serverHost": "localhost",
  "serverPort": 8080
}
```

3. Запустить сервер:
```bash
% npm start
```

4. Для создания дополнительных агентов нужно сделать копии деректории `./agent` и присвоить им уникальные имена (пример):
```asp
./agent
./agent_smit
./agent_007
./agent_SHIELD
./agent_ancl
```

5. В каждом `./agent-conf.js` в поле `port` присвоить свой  уникальный незанятый порт: 
```js
// agent_smit
{
  "port": 8081,
  "serverHost": "localhost",
  "serverPort": 8080
}
// agent_007
{
  "port": 8082,
  "serverHost": "localhost",
  "serverPort": 8080
}
```

6. Повторить шаги с 1 до 3 для каждого агента. 

## Домашнее задание: типизация

Запуск осуществляется согласно инструкции выше, дополнительных шагов делать не требуется. 

### Отчет:

> Трудоёмкость перевода проекта на TypeScript. Самые сложные моменты в работе.

С переводом на typescript серверной части проблем не возникло. 
Перевод React на typescript - путь, полный мучений и лишений. 

> Какие в процессе перевода были найдены ошибки.

**Server**: убрал лишнее `extended: false` в body-parser;

**React**: при переводе реакта на typescript выявились моменты, которые на данном этапе больше усложняют понимание логики и увеличивают кодовую базу. Скорее всего проблема в том, как я изначально это написал, так что планы устроить жесткий рефакторинг. Много вопросов возникло по определению типов event в обработчиках (поэтому использовано так много any) и как правильно передавать аттрибуты элементов. Прописывать все возможные кажется абсолютно излишним, а делать заглушки вроде `[key: string]: any` - аннигилирует всю пользу ts.  

> Решили ли вы вливать данный PR, или предпочитаете работать с JavaScript? Почему?

Буду делать PR и продолжать на TypeScript, т.к. понимаю его пользу в долгосрочной перспективе.
