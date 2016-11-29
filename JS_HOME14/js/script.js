;
$(function () {
    'use strict';
    var testQuestion = [
        {
            titleText: 'Тест по знанию материала',
            submitText: 'Проверить мои результаты', 
            length: 4   //количество ответов в вопросе
        },
        {
            question: 'Вопрос №1',
            answers: [
                { answerText: 'Вариант ответа №1', isTrue: true },
                { answerText: 'Вариант ответа №2', isTrue: false },
                { answerText: 'Вариант ответа №3', isTrue: false },
                { answerText: 'Вариант ответа №4', isTrue: false }
            ]
        },
        {
            question: 'Вопрос №2',
            answers: [
                { answerText: 'Вариант ответа №1', isTrue: false },
                { answerText: 'Вариант ответа №2', isTrue: true },
                { answerText: 'Вариант ответа №3', isTrue: false },
                { answerText: 'Вариант ответа №4', isTrue: false }
            ]
        },
        {
            question: 'Вопрос №3',
            answers: [
                { answerText: 'Вариант ответа №1', isTrue: false },
                { answerText: 'Вариант ответа №2', isTrue: false },
                { answerText: 'Вариант ответа №3', isTrue: true },
                { answerText: 'Вариант ответа №4', isTrue: false }
            ]
        },
         {
             question: 'Вопрос №4',
             answers: [
                 { answerText: 'Вариант ответа №1', isTrue: false },
                 { answerText: 'Вариант ответа №2', isTrue: false },
                 { answerText: 'Вариант ответа №3', isTrue: false },
                 { answerText: 'Вариант ответа №4', isTrue: true }
             ]
         }
    ];
    localStorage.setItem('testQuestion', JSON.stringify(testQuestion));
    var objTest = JSON.parse(localStorage.getItem('testQuestion'));
    var test = $('#test').html();
    var result = tmpl(test, {
        data: testQuestion
    });
    var $body = $('body');
    $body.append(result);
    var $overlay = $('.overlay');
    var $modal = $('.modal');
    var $resultModal = $modal.find('p');
    var $closeModal = $modal.find(':button');
    //THE BUTTON HANDLER

    $('.test__submit').on('click', function (e) {
        var test = $('.test__form');
        e.preventDefault();
        var check = $('input:checked');
        var len = check.length;
        var correctAnswer = 0;                   //правильных ответов
        var questionCount = objTest.length - 1; //всего вопросов
        var percentOfCorrect = 0;               //в % соотношении
        for (var i = 0; i < len; i++) {
            var name = $(check[i]).attr('name');
            var val = $(check[i]).attr('value')-1;
            if (objTest[name].answers[val].isTrue) {
                correctAnswer++;
            }
        }
        percentOfCorrect = correctAnswer * 100 / questionCount;
        //console.log(percentOfCorrect);
        $resultModal.text(percentOfCorrect + "%");
        $('input[type="checkbox"]').prop('checked', false);
        showModal();
    });

    //MODAL
    function showModal() {
        $overlay.show();
        $modal.show();
        $closeModal.one('click', hideModal);
    }

    function hideModal() {
        $overlay.hide();
        $modal.hide();
    }
    

    //ONLY ONE CHECKBOX
    $('input[type="checkbox"]').on('change', function () {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });
});