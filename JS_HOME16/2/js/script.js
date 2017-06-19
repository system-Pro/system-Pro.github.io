;
$(function () {
    'use strict';

    function Human(name, age, gender, height, weight) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
    }
    Human.prototype.show = function () {
        console.log('name: ' + this.name);
        console.log('age: ' + this.age);
        console.log('gender: ' + this.gender);
        console.log('height: ' + this.height);
        console.log('weight: ' + this.weight);
    }

    function Worker(name, age, gender, height, weight, jobAddr, salary) {
        this.jobAddr = jobAddr;
        this.salary = salary;
        Human.apply(this, arguments);
    }
    Worker.prototype = Object.create(Human.prototype);
    Worker.prototype.constructor = Worker;
    Worker.prototype.show = function () {
        Human.prototype.show.apply(this);
        console.log('jobAddr: ' + this.jobAddr);
        console.log('salary: ' + this.salary);
    };
    Worker.prototype.work = function () {
        console.log('Work work!');
    }

    function Student(name, age, gender, height, weight, stydyPlace, scholarship) {
        this.stydyPlace = stydyPlace;
        this.scholarship = scholarship;
        Human.apply(this, arguments);
    }
    Student.prototype = Object.create(Human.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.show = function () {
        Human.prototype.show.apply(this);
        console.log('stydyPlace: ' + this.stydyPlace);
        console.log('scholarship: ' + this.scholarship);
    };
    Student.prototype.learn = function () {
        console.log('Learn learn!');
    }

    var wor = new Worker('Worker', 27, 'male', 190, 70, 'Verbitskogo', 500);
    wor.show();
    wor.work();
    console.log(' ');

    var stu = new Student('Student', 20, 'male', 180, 60, 'street', 100);
    stu.show();
    stu.learn();
});