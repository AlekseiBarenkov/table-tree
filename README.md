# Table Tree

**Table Tree** — это веб-приложение для работы с иерархическими таблицами, где каждая строка может иметь дочерние строки. Приложение позволяет создавать, редактировать и удалять строки, а также визуально отображать связи между родительскими и дочерними строками с помощью соединительных линий. Данные синхронизируются с сервером, а изменения автоматически применяются к локальному состоянию.

## Функциональность

- **Иерархическая таблица:**  
  Строки отображаются в виде дерева с отступами для вложенных элементов.

- **CRUD-операции:**

  - **Создание:** Добавление новой строки-потомка через иконку создания (➕). Новая строка создаётся с уникальным временным идентификатором и сразу переводится в режим редактирования.
  - **Редактирование:** Двойной клик по строке переводит её в режим редактирования. После внесения изменений и нажатия клавиши `Enter` данные сохраняются, отправляются на сервер, а локальное состояние обновляется на основе полученного ответа.
  - **Удаление:** При наведении на строку появляется иконка удаления (🗑️). Если строка является единственной (например, создана по причине отсутствия данных), её удаление заблокировано.

- **Соединительные линии:**  
  В таблице реализована отрисовка вертикальных и горизонтальных линий, соединяющих родительские и дочерние строки.

- **Уведомления:**  
  Приложение использует [react-hot-toast](https://react-hot-toast.com/) для отображения статуса загрузки, успеха и ошибок при выполнении запросов к API.

- **Синхронизация с сервером:**  
  При выполнении запросов `createRow`, `updateRow` и `deleteRow` сервер возвращает обновлённые данные (поле `changed: Row[]`), которые автоматически применяются к состоянию приложения через Zustand.

## Технологии

- **React** – библиотека для создания пользовательских интерфейсов.
- **TypeScript** – строгая типизация для повышения надёжности кода.
- **Vite** – современный сборщик и сервер разработки.
- **Zustand** – легковесное хранилище для управления состоянием.
- **Immer (через zustand/middleware/immer)** – иммутабельное обновление вложенных структур.
- **SASS** – стилизация с использованием индентифицированного синтаксиса по методологии БЭМ.
- **Axios** – HTTP-клиент для работы с API.
- **react-hot-toast** – уведомления о статусе запросов.

## Установка и запуск

### Предварительные требования

- [Node.js](https://nodejs.org/) (рекомендуется версия 14 или выше)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)

### Шаги установки

1. **Клонируйте репозиторий и перейдите в папку проекта:**

   ```bash
   git clone https://github.com/AlekseiBarenkov/table-tree.git
   cd table-tree
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   # или
   yarn install
   ```

3. **Настройте переменные окружения:**

   Создайте файл `.env` в корне проекта и добавьте:

   ```env
   VITE_E_ID=YOUR_FIXED_ENTITY_ID
   ```

   где `YOUR_FIXED_ENTITY_ID` — уникальный идентификатор сущности, полученный с сервера.

4. **Запустите проект в режиме разработки:**

   ```bash
   npm run dev
   # или
   yarn dev
   ```

5. **Соберите проект для продакшена:**

   ```bash
   npm run build
   # или
   yarn build
   ```

## Использование

- **Создание строки:**  
  Нажмите на иконку создания (📄) рядом с родительской строкой для добавления новой строки-потомка. Новая строка создаётся с уникальным временным идентификатором и автоматически переводится в режим редактирования.

- **Редактирование строки:**  
  Дважды кликните по строке для её редактирования. После внесения изменений нажмите `Enter` для сохранения. Если данные изменились, выполняется запрос к API, и локальное состояние обновляется на основе полученного ответа.

- **Удаление строки:**  
  При наведении на строку появляется иконка удаления (🗑️). Если строка является единственной (например, создана по причине отсутствия данных), её удаление заблокировано.

- **Уведомления:**  
  Приложение использует [react-hot-toast](https://react-hot-toast.com/) для информирования о статусе запросов к серверу (загрузка, успех, ошибка).

## Кодстайл и соглашения

- **Типизация:**  
  Приложение написано на TypeScript с использованием строгой типизации для всех компонентов, утилит и хуков.

- **Стилизация:**  
  Стили оформлены на SASS с использованием методологии БЭМ.

- **Структура проекта:**  
  Проект организован по функциональному признаку с разделением компонентов, утилит, типов и хуков для удобства поддержки и масштабирования.
