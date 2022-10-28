// Напиши функцию logItems(array), которая получает массив и использует цикл for, который для каждого элемента массива будет выводить в консоль сообщение в формате [номер элемента] - [значение элемента].
//
//     Нумерация должна начинаться с 1. К примеру для первого элемента массива ['Mango', 'Poly', 'Ajax'] с индексом 0 будет выведено '1 - Mango', а для индекса 2 выведет '3 - Ajax'.

// const logItems = function (array) {
//     for (let i = 0; i < array.length; i++) {
//         console.log(i+1 + ' -', array[i]);
//     }
// }
//
// logItems(['Mango', 'Poly', 'Ajax', 'Lux', 'Jay', 'Kong']);

//
// Напиши скрипт подсчета стоимости гравировки украшений. Для этого создай функцию calculateEngravingPrice(message, pricePerWord) принимающую строку (в строке будут только слова и пробелы) и цену гравировки одного слова, и возвращающую цену гравировки всех слов в строке.

// const calculateEngravingPrice = function (message, pricePerWord) {
//     let totalPrice = message.split(" ").length * pricePerWord
//
//     return totalPrice
// }
//
// console.log(
//     calculateEngravingPrice('Donec orci lectus aliquam est magnis', 40)
// );


// Напиши фукцнию findLongestWord(string), которая принимает параметром произвольную строку (в строке будут только слова и пробелы) и возвращает самое длинное слово в этой строке.

// const findLongestWord = function(string) {
//     let arrStr = string.split(' ');
//     let wordLength = 0;
//     let longestWord;
//
//     for (let i = 0; i < arrStr.length; i += 1) {
//         wordLength = arrStr[1].length;
//
//         if (arrStr[i].length > wordLength) {
//             longestWord = arrStr[i];
//
//             return longestWord;
//         }
//
//     }
// }
// console.log(findLongestWord('Google do a roll'));


// Напиши функцию formatString(string) которая принимает строку и форматирует ее если необходимо.
//
//     Если длина строки не превышает 40 символов, функция возвращает ее в исходном виде.
//     Если длина больше 40 символов, то функция обрезает строку до 40-ка символов и добавляет в конец строки троеточие '...', после чего возвращает укороченную версию.
//
//     const formatString = function (string) {
//     for (let i = 0; i < string.length; i++) {
//         if(string.length > 40) {
//             return string.slice(0, 40) + "..."
//         }
//         return string
//     }
// }
//
// console.log(formatString('hello world!hello world!hello world!hello world!hello world!hello world!'));


// Напиши функцию checkForSpam(message), принимающую 1 параметр message - строку. Функция проверяет ее на содержание слов spam и sale. Если нашли зарещенное слово то функция возвращает true, если запрещенных слов нет функция возвращает false. Слова в строке могут быть в произвольном регистре.
//
//     const checkForSpam = function (message) {
//     let result = message.toLowerCase().includes('spam') || message.toLowerCase().includes('sale');
//
//     return result
// }
//
// console.log(checkForSpam('Latest technology news')); // false
//
// console.log(checkForSpam('JavaScript weekly newsletter')); // false
//
// console.log(checkForSpam('Get best sale offers now!')); // true
//
// console.log(checkForSpam('[SPAM] How to earn fast money?')); // true
