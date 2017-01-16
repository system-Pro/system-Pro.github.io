var app = {
        percent : function(correctAnswer, questionCount){
            return correctAnswer * 100 / questionCount;
        }
    };


try{
    module.exports = app;
}
catch(e){

}
