define(
  'controller',
  [
    'model',
    'view',
    'jquery'
  ],
  function(){
    function Controller (model, view) {
      var self = this;
      view.elements.addBtn.on('click', addItem);
      view.elements.listContainer.on('click', '.edit', editItem);
      view.elements.listContainer.on('click', '.item-delete', removeItem);

      function addItem(){
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
      }

      function editItem(){
        var textEdit = $(this).prev().text();
        var textNew = prompt('Edit Text', textEdit);
        if(textNew && textNew !== textEdit){
          model.editItem(textEdit, textNew);
          view.renderList(model.data);
        }
      }

      function removeItem(){
        var item = $(this).attr('data-value');
        model.removeItem(item);
        view.renderList(model.data);
      }
    }
    return Controller;
  }
);
