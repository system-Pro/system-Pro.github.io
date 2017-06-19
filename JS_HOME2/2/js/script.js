var names = [];
names.length = 5;

for (var i = 0; i < names.length; i++) {
    names[i] = prompt('Введите ' + (i + 1) + ' имя:');
}
console.log(names);

var zapros = prompt('==Вход== Ваше имя:');
var flag = false;
for (var i = 0; i < names.length; i++) {
    if (names[i] == zapros) {
        flag = true;
        break;
    }
}

console.log(zapros);
if (flag) {
    alert(zapros + ", вы успешно вошли");
} else {
    alert('Ошибка входа!')
}