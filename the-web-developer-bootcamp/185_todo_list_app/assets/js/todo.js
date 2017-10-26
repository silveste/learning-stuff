/* global $ */

// Check in/off todos by clicking
$('ul').on('click', '.todo', function(){
  $(this).toggleClass('task-off');
});

// Delete todo by clicing trash
$('ul').on('click', '.trash-btn', function(event){
  $(this).parent().fadeOut( 500, function(){
    $(this).remove();
  });
  event.stopPropagation();
});

// Create todo by entering text
$('input[type="text"]').keypress(function(e){
  if(e.which === 13){
    // get the text from the input box
    var text = $(this).val();
    $(this).val('');
    // get the html from template-1 and clone it
    var $list = $('#template-1').children().clone();
    // Append text and html in the list
    $list.append(text);
    $list.appendTo('ul');
  }
});

// Show/hide input box when click plus button
$('#hide-btn').click(function(){
  $('input[type="text"]').fadeToggle();
});
