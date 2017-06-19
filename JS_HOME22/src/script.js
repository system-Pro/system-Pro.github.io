;
$(function () {
    'use strict';
    let testQuestionEn = [
        {
            titleText: 'Test knowledge of the material',
            submitText: 'To check my results',
            dialogTitle: 'Your result',
            dialogText: 'Close',
            length: 4
        },
        {
            question: 'Question №1',
            answers: [
                { answerText: 'Answer №1', isTrue: true },
                { answerText: 'Answer №2', isTrue: false },
                { answerText: 'Answer №3', isTrue: false },
                { answerText: 'Answer №4', isTrue: false }
            ]
        },
        {
            question: 'Question №2',
            answers: [
                { answerText: 'Answer №1', isTrue: false },
                { answerText: 'Answer №2', isTrue: true },
                { answerText: 'Answer №3', isTrue: false },
                { answerText: 'Answer №4', isTrue: false }
            ]
        },
        {
            question: 'Question №3',
            answers: [
                { answerText: 'Answer №1', isTrue: false },
                { answerText: 'Answer №2', isTrue: false },
                { answerText: 'Answer №3', isTrue: true },
                { answerText: 'Answer №4', isTrue: false }
            ]
        },
         {
             question: 'Question №4',
             answers: [
                 { answerText: 'Answer №1', isTrue: false },
                 { answerText: 'Answer №2', isTrue: false },
                 { answerText: 'Answer №3', isTrue: false },
                 { answerText: 'Answer №4', isTrue: true }
             ]
         }
    ];
    let testQuestionRu = [
        {
            titleText: 'Тест по знанию материала',
            submitText: 'Проверить мои результаты',
            dialogTitle: 'Твой результат',
            dialogText: 'Закрыть',
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

    //LOCAL STORAGE
    localStorage.setItem('testQuestionEn', JSON.stringify(testQuestionEn));
    localStorage.setItem('testQuestionRu', JSON.stringify(testQuestionRu));

    let objTest = JSON.parse(localStorage.getItem('testQuestionEn'));
    let objTestRu = JSON.parse(localStorage.getItem('testQuestionRu'));

    let test = $('#test').html();
    let result = tmpl(test, {
        data: testQuestionEn
    });
    let $body = $('body');
    $body.append(result);

    //LOCALE
    $('.en').addClass('disabled');
    $('.ru').one('click', changeRu);

    //MODAL
    //let $overlay = $('.overlay');
    //let $modal = $('.modal');
    //let $resultModal = $modal.find('p');
    //let $closeModal = $modal.find(':button');

    //THE BUTTON HANDLER
    $('.test__submit').on('click', checkResult);

    function checkResult(e) {
        e.preventDefault();
        let check = $('input:checked');
        let len = check.length;
        let correctAnswer = 0;                   //правильных ответов
        let questionCount = objTest.length - 1; //всего вопросов
        let percentOfCorrect = 0;               //в % соотношении
        for (let i = 0; i < len; i++) {
            let name = $(check[i]).attr('name');
            let val = $(check[i]).attr('value') - 1;
            if (objTest[name].answers[val].isTrue) {
                correctAnswer++;
            }
        }
        percentOfCorrect = correctAnswer * 100 / questionCount;
        //console.log(percentOfCorrect);
        $('.modal > p').text(percentOfCorrect + "%");
        $('input[type="checkbox"]').prop('checked', false);
        showModal();
    }

    //MODAL
    function showModal() {
        $('.overlay').show();
        $('.modal').show();
        $('.modal > :button').one('click', hideModal);
    }

    function hideModal() {
        $('.overlay').hide();
        $('.modal').hide();
    }

    //LOCALE
    function changeEn(e) {
        e.preventDefault();
        $('.test__submit').unbind();
        $('.test__form').remove();

        result = tmpl(test, {
            data: testQuestionEn
        });
        $body.append(result);

        $('.en').addClass('disabled');
        $('.ru').one('click', changeRu);
        $('.test__submit').on('click', checkResult);
    }
    function changeRu(e) {
        e.preventDefault();
        $('.test__submit').unbind();
        $('.test__form').remove();

        result = tmpl(test, {
            data: testQuestionRu
        });
        $body.append(result);

        $('.ru').addClass('disabled');
        $('.en').one('click', changeEn);
        $('.test__submit').on('click', checkResult);
    }

    //ONLY ONE CHECKBOX
    $('input[type="checkbox"]').on('change', function () {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });
});
