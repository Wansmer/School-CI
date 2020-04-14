# School-CI: непрерывная интеграция - ни один коммит не уйдет не собранным. 

> Версия node: v13.11.0

> README.md описаний домашних заданий находится в ветке домашнего задания. 

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
```json
SECRET_KEY = 'Bearer YOUR_SECRET_KEY'
NODE_TLS_REJECT_UNAUTHORIZED = '0'
```

4. Убедиться, что файл сохранен, а значение SECRET_KEY начинается с Bearer<пробел>;
5. Перейти к запуску проекта.

## Запуск проекта: 
1. В командной строке перейти в директорию проекта и запустить команды последовательно: 
  - Предварительная установка пакетов:
```bash
% npm i
``` 
  - Установка пакетов в поддиректориях `./client` и `./server`:
```bash
% npm run postinstall
```
  - Запуск серверов (client - порт 3000, server - порт 3001):
```bash
% npm run start
```
2. ...
3. PROFIT! Проект запущен и автоматически открылся в вашем браузере по адресу [http://localhost:3000](http://localhost:3000).