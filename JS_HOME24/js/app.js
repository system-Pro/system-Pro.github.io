// requirejs.config({
//     paths: {
//         'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery'
//         // 'auth': 'node_modules/jquery/dist/jquery.min.js'
//     },
//     shim: {
//         'jquery': {
//             exports: 'jQuery'
//         }
//     }
// });

require(
    [
        'Model',
        'View',
        'Controller'
    ],
    function (Model, View, Controller) {
        // console.log("$", $);
        // console.log("module1", module1);
        // console.log("module2", someMethod);
        // module1.sayHello();
        // module2.someMethod();
        // var firstToDoList = ['leart javascript', 'learn html', 'make coffe'];
        // console.log(Model);
        // console.log(View);
        // console.log(Controller);
        // var model = new Model.Model(firstToDoList);
        // var view = new View.View(model);
        // var controller = new Controller.Controller(model, view);
    }
);
