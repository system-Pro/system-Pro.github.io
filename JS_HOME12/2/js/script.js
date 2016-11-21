$(function () {

    var html = $('#template').html();
    var student = [
        {
            name: 'Ivanov Ivan',
            age: '27', 
            phone: '066'
        },
        {
            name: 'Sergeev Sergey',
            age: '22',
            phone: '063'
        },
        {
            name: 'Andreev Andrey',
            age: '25',
            phone: '067'
        }
    ];

    var group = tmpl(html, {
        data: student
    });

    $('body').append(group);
});