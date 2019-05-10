/* global $ */
var addCardclickHandler = function () {
  window.currentCardIndex = window.currentCardIndex || 0;
  $('#addcard').click(function(event){
    event.preventDefault();

    var card = $('<div></div>')
      .attr('id', 'card' + window.currentCardIndex++)
      .attr('class', 'card')
      .attr('draggable', true);

    var editor = $('<div></div>')
      .attr('contenteditable', true)
      .attr('class', 'editor');

    card.append(editor);
    card.appendTo($('#cards'));
  });
};

var createDragAndDropEvents = function(){
  var cards = $('#cards');

  cards.on('dragstart', '.card', function(e){
    e.originalEvent.dataTransfer.setData('text', this.id);
  });
  cards.on('dragover', '.card', function(e){
    e.preventDefault(); //Prevents dragover event
    return false;
  });

  cards.on('drop', '.card', function(e){
    //Event fires on the card where the box is dropped
    var id = e.originalEvent.dataTransfer.getData('text');
    var originalcard = $('#' + id);
    originalcard.insertAfter(this);
    return false;
  });
};

addCardclickHandler();
createDragAndDropEvents();
