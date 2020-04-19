# School-CI: непрерывная интеграция - ни один коммит не уйдет не собранным. 

> Версия node: v12.16.2

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

## Домашнее задание: инфраструктура

### Настройка и запуск

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

### Дополнительно

1. Все таймауты можно настроить в файлах ./constants.js и в агенте, и в билд сервере. Сейчас проверка очереди и агентов установлена на одну минуту. Для проверки это долго и не удобно, так что лучше поставить по 5 секунд;
2. По поводу лимитов на запрос очереди с сервера: изначально хотел сделать рекурсивный запрос небольшими партиями, но тогда получается, что нужно загружать все билды с сервера за ВСЕ время, что при его длительной работе неприемлемо. Принято решение ограничить лимит проверки сборки 100 шт.;
3. Безопасность: не успел настроить docker, который был бонусом, который решил бы проблемы с ограничением прав запуска команд. Буду настраивать после дедлайна. Ручную проверку команд считаю делать бессмысленным, т.к. они могут быть скрыты в коде клонируемого репозитория и проверка строки на содержание, например, `rm -Rf` или только на содержание `npm` или `yarn` не решило бы проблему.
Буду благодарен проверяющему, если поделится, как можно средствами nodejs ограничить права работы дочерних процессов (например, ограничить их только определенной директорией - в моем случае `./clone`). Передача `{cwd: './clone'}` не ограничивает право подняться выше.  

### Выполнение требований
- ***Сервер должен максимально утилизировать имеющихся агентов.***

> **Решение:** по свободным агентам запускается цикл, что не допускает простоя. Смотреть функцию `sendToBuilding` в `./server/controllers.js`;
- ***Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать между сборками.***

> **Решение:** Корректной ситуацией считаю, что сервер должен удалить неработающего агента из списка доступных агентов. Здесь отрабатывают два сценария: 
> 1. функция `sendToBuilding` просто скипает агента, если тот не ответил на отправку ему сборки;
> 2. функция `checkFreezingProcesses` (в `./server/controllers.js`) по таймеру пингует всех зарегистрированных агентов, в случае их недоступности - выкидывает из списка доступных;

- ***Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать в процессе выполнения сборки.***

> **Решение:** функция `checkFreezingProcesses` (в `./server/controllers.js`) по таймеру пингует всех зарегистрированных агентов, в случае их недоступности - выкидывает из списка доступных и изменяет статус сборки, которая была передана агенту на "Waiting", что помещает ее обратно в начало очереди;

- ***Агент должен корректно обрабатывать ситуацию, когда при старте не смог соединиться с сервером.***

> **Решение:** корректной ситуацией будет циклический повтор попытки регистрации на сервере, что реализовано;

- ***Агент должен корректно обрабатывать ситуацию, когда при отправке результатов сборки не смог соединиться с сервером.***

> **Решение:** корректной ситуацией будет циклический повтор отправки результатов, т.к. это прямая задача агента. Реализовано;

**Дополнительно:** Также, корректно было бы во всех вышеописанных случаях, уведомлять системного администратора о недоступности агента или сервера после заданного количества неуспешных попыток соединения с сервером или агентами;

### Логика приложения
#### Server
1. При запуске сервера идет запрос на получение настроек и выполняется до тех пор, пока настройки не получены, т.к. без них деятельность сервера невозможна;
2. Запускается цикл для получения очереди билдов. При получении очереди следующая итерация повторяется только тогда, когда ранее полученная очередь очищена (т.е. все сборки выполнены);
3. Регистрирует агентов и сохраняет их в отдельную очередь;
4. При наличии билдов в очереди и свободных агентов, запускает цикл для распределения билдов по свободным агентам;

#### Agent
1. При запуске идет уведомление сервера (циклическое на случай неответа). Помимо `port`, агент передает свой `host` в объекте `{id}`, что не было указано в задании. Такое решение принято для удобства и для будущего расширения - например, можно добавить в объект id верификационный токен, по которому будет идти проверка на билд сервере, нужно ли принимать от этого агента запрос и регистировать его;
2. Сборка: перед и после начала сборки запускается функция очистки директории, в которую клонируется репозиторий. Запускается два раза, на случай, если до этого агент упал во время сборки и склонированное не было удалено;
