var generator = {
    isForm: false,

    form: function () {
        if (!this.isForm) {
            var form = document.createElement('form');
            form.setAttribute('style', 'width: 800px; min-height: 400px; margin: 0 auto; border: 1px solid black');
            form.classList.add('form');
            document.body.insertBefore(form, document.body.childNodes[0]);
            this.isForm = true;
        }
    },

    title: function () {
        this.form();
        var form = document.querySelector('.form');
        var p = document.createElement('p');
        p.setAttribute('style', 'text-align: center');
        p.innerHTML = "Тест по программированию";
        form.appendChild(p);
    },

    question: function (amountLi, answer) {
        amountLi = amountLi || 3;
        answer = answer || 3;
        this.form();
        var form = document.querySelector('.form');
        var ol = document.createElement('ol');
        form.appendChild(ol);
        for (var i = 0; i < amountLi; i++) {
            var li = document.createElement('li');
            li.setAttribute('style', 'line-height: 24px;')
            li.innerHTML = "Вопрос №" + (i + 1);
            for (var j = 0; j < answer; j++) {
                var div = document.createElement('div');
                li.appendChild(div);
                var label = document.createElement('label');
                label.innerHTML = "Вариант ответа №" + (j + 1);
                div.appendChild(label);
                var checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'question' + (i + 1));
                checkbox.setAttribute('value', (j + 1));
                label.insertBefore(checkbox, label.childNodes[0]);
            }
            ol.appendChild(li);
        }
    },

    submit: function () {
        this.form();
        var form = document.querySelector('.form');
        var p = document.createElement('p');
        p.setAttribute('style', 'text-align: center;');
        form.appendChild(p);
        var submit = document.createElement('input');
        submit.setAttribute('style', 'width: 323px; background-color: #cfe2f3; height: 48px; border: 3px solid #000107;');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Проверить мои результаты');
        p.appendChild(submit);
    }
}

generator.title();
generator.question();
generator.submit();