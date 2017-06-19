alert('Возводим указанное число в указанную степень');
var number = parseInt(prompt('Введите целое число'));
var stepen = parseInt(prompt('Введите степень'));
var result = number;
if (stepen == 0) {
    result = 1;
} else {
    for (var i = 1; i < stepen; i++) {
        result *= number;
    }
}
console.log("number = " + number);
console.log("stepen = " + stepen);
console.log("result = " + result);