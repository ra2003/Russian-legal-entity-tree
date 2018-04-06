# Построение дерева связей юридических лиц России

Иногда полезно/интересно знать связи между организациями, чтобы сложить до конца своё мнение о потенциальном партнере/конкуренте. 
**Программа умеет:**
- [x] Строить деревья связей юридических лиц
- [x] Открывать rusprofile.ru -- страницу выбранного юридического лица
- [x] Перестраивать дерево от выбранного корня
- [ ] [Независима от модулей node.js. Может располагаться на сайте ](#Почему-сие-чудо-именно-настольное)

## Используются данные сайта http://www.rusprofile.ru/

Спасибо им за хорошо структурированную информацию

## Установка и использование

1. Скачать и распаковать zip
2. Запускать файлом Start.vbs
3. Найти необходимую организацию через сайт http://www.rusprofile.ru/
4. Вставить ссылку на организацию в программу
![Screenshot](/screenshot.jpg)

## Используются данные, находящиеся в открытом доступе:

**П. 1 ст. 6 Федерального закона от 08.08.2001 № 129-ФЗ «О государственной регистрации юридических лиц и индивидуальных предпринимателей»:**
* Содержащиеся в государственных реестрах сведения и документы являются открытыми и общедоступными, за исключением сведений, доступ к которым ограничен в соответствии с абзацем вторым настоящего пункта.
* Сведения о номере, о дате выдачи и об органе, выдавшем документ, удостоверяющий личность физического лица, содержащиеся в государственных реестрах, могут быть предоставлены исключительно органам государственной власти, иным государственным органам, судам, органам государственных внебюджетных фондов в случаях и в порядке, которые установлены Правительством Российской Федерации. Данное ограничение не применяется при предоставлении содержащих указанные сведения копий учредительных документов юридических лиц, а также сведений о месте жительства индивидуальных предпринимателей, которые предоставляются в порядке, установленном пунктом 5 настоящей статьи.

## Почему сие чудо именно настольное?

И действительно. Программе незачем обращаться к файловой системе и устройствам. Она просто парсит сайт и удобно выводит результаты. Но изначально задача ставилась (не мной) сделать настольную.
В будущем, если будет время, планирую вернуться к ней и доработать.