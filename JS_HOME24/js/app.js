requirejs.config({
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery.min'
    }
});

require(
    [
        'model',
        'view',
        'controller',
        'jquery'
    ],
    function(Model, View, Controller, $) {
        var firstToDoList = ['Learn JavaScript', 'Learn ES6', 'Learn Angular'];
        var model = new Model(firstToDoList);
        var view = new View(model);
        var controller = new Controller(model, view);
    }
);
