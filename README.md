# SHRI-2020 | Домашнее задание "Адаптивная верстка"

Статические файлы [здесь](./dist/ "да, здесь").
**ЗА,** чтобы мою работу разобрали при обсуждении результатов дз.

## Ответы на вопросы: 
### Правильное использование БЭМ-сущностей**
**Какие части макета являются одним и тем же блоком?**
*Блоками являются те части макета, которые одинаковы/похожи по функционалу, по смыслу, по поведению и повторяются/могут повторяться вне контекста текущего положения без потери смысла.*

**Какие стили относятся к блокам, а какие к элементам и модификаторам?**
**Ответ:**  
Блоки - *все стили, которые описывают **внутреннее** состояние/поведение/внешний вид и **не воздействуют** на положение компонента в пространстве*;  

Модификаторы - *все стили, которые придают дополнительное состояние/поведение/внешний вид блоку или элементу блока, и **только** в случае применения модификатора **на элементе** блока, стили модификатора могут влиять на его положение в пространстве родительского блока*;  

Элементы - *стили элемента отвечают за положение этого элемента/примиксованного блока в пространстве родительского блока*;

**Где нужно использовать каскады и почему?**  

*В рамках БЭМ каскады используются только внутри блока/элемента для переопределения состояния/поведения/внешнего вида элемента **этого** блока/элемента. Такое использование обеспечивает предсказуемость поведения и облегчают навигацию по коду. Еще каскады используются для переопределения базовых стилей.  

Применять каскады с одного на другие блоки недопустимо: можно получить неожиданный (читать - неприятно неожиданный) результат и сложности в поиске места переопределения.*

### Консистентность
**Какие видите базовые и семантические константы?**  

*В рамках текущего макета можно выделить следующие семантические константы: несколько основных повторяющихся цветов на бэкграунд, текст, смысловые значения и бордеры, несколько кеглей и line-height шрифта, 2 версии толщины бордера, 2 версии тени, 2 версии скругления и несколько повторяющихся размеров отступов элементов.

К базовым константам можно отнести основной шрифт, самые часто встречающиеся кегль, начертание и высоту строки;*

**Какие видите закономерности в интерфейсе?**  

* Подавляющее большинство отступов, ширин и высот в данном макете кратны 2, что берем за шаг сетки;
* Компоновка элементов по смыслу;
* Контраст элементов;
* Визуальное сообщение о действии элементов (однозначность);
* Повторяющиеся выравнивания элементов (однообразность);
* Повторяющиеся элементы;
* На элементах, связанных с действием пользователя, предусмотрено ожидаемое поведение;

### адаптивность
**Где видите вариативность данных и как это обрабатываете?**  

Вариативность данных видна в компонентах, которые обладают одной функциональность, но разным внешнем видом. При этом их поведение схоже настолько, что их можно назвать блоком. 
Примеры на макете: 
1. Кнопка. Вариации: кнопка-контрол, Кнопка-призыв к действию, кнопка с иконкой, кнопка с иконкой без текста, маленькая кнопка, большая кнопка;
2. Ссылка. Ссылка в футере (блок-ссылка, компонент ссылка-футера), ссылка с иконкой (блок-ссылка, компонент блока ticket). Их всех можно обобщить в один блок по размеру текста, line-height и letter-spacing. Так же есть ссылки, которые кардинально отличаются от вышеописанных и не являются блоком-ссылкой, хотя функциональность ссылочная (например title в header);

**Какие видите особенности, связанные с размером экрана?**  

* Чем меньше экран, тем меньше остается воздуха, что компенсируется увеличением вертикальных отступов между элементами дизайна;
* Перестроение линейно-расположенных элементов в вертикальное отображение для удобства "считывания";
* Изменение размеров определенных элементов (как в большую, так и в меньшую стороны), которые либо не вписываются в маленькие экраны, либо портят композицию и невыгодно выбиваются по контрастности размеров;

**Что еще повлияло на вашу вёрстку?**  

1. Обратил внимание, что предоставленный макет не требует верстки по колонкам (все основные элементы горизонтально сужаются без вертикального перестроения), поэтому не использовал колоночную верстку;
2. Footer всегда прилеплен к низу страницы, если его естественным образом не отодвигает контент, т.е. минимальная высота экрана - вся доступная высота;
3. Заголовки и кнопки в строке в Header на десктопе предполагают вертикальное выравнивание по центру. В мобильной версии выравнивание по верхнему краю, для нормального отображения длинных заголовков.
4. Длинные заголовки предполагают перенос не только по пробелам, но и с разрывом слов. (Повторить пример заголовка на макете не удалось, т.к. даже при word-wrap перенос осуществляется по символу '-')

## Обоснованные решения
1. Line-height в заголовках экранов start и history имеют значения 28px и 30px соответственно. В мобильной версии данных различий нет. Принял решение делать только 28px для экономии кода. Визуально это не отличимо, а практической логики это не несет;
2. Ссылки и копирайт в футере на десктопе имеют одинаковое все, кроме line-height и letter-spacing. Привел к равенству line-height, чтобы сделать паддинги по сетке и уйти от паддинга, не кратного двум. Визуально и функционально изменение ни на что не влияет;
3. Не использовал rgba и opacity по причине возможного непредсказуемого поведения (например, если добавить темную тему). Точно заданный цвет более предсказуем;
4. Сделал 3 брейкпоинта: 856px - момент, когда добавляются паддинги к Container и растягивается Log; 414px - максимальное мобильное отображение; 768px - вертикальный вид Ipad - при данной ширине "просилось" перестроение блока Ticket;
5. Сделал информацию о ветке, коммите, коммитере и мета-информацию ссылками, т.к. они по всем параметрам похожи на блока Link. Предполагаю, что нажатие на них должно либо показывать доп.информацию, либо осуществлять фильтрацию по значению;

## Необоснованное решение
1. Использовал только svg, но добавлял их через бэкграунд. Не уверен, что это правильно, т.к. теряется возможность управления svg через стили. Но, с другой стороны, минимизирует html и все иконки в ссылках, кнопках и в номере тикета отображаются только благодаря классу с названием иконки и не требуется дополнительный тег;

## Инструменты:
1. Чистый html;
2. PostCss - возможность вложенности для краткости написания, автопрефиксер, сортировка медиа-запросов.
