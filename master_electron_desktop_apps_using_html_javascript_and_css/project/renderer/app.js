/* global $ */
const {ipcRenderer} = require('electron');

//Show modal
$('.open-add-modal').click(() => $('#add-modal').addClass('is-active'));
$('.close-add-modal').click(() => $('#add-modal').removeClass('is-active'));

//Handle add modal submission
//Send the url
$('#add-button').click(() => {
  let newItemURL = $('#item-input').val();
  //console.log(newItemURL);
  if (newItemURL){
    ipcRenderer.send('new-item', newItemURL);
    //Disable input element UI
    $('#item-input').prop('disabled',true);
    $('#add-button').addClass('is-loading');
    $('.close-add-modal').addClass('is-disabled');
  }


});
//Listen for the answer
ipcRenderer.on('new-item-success', (e, item) => {
  console.log(item);

  //Reset modal and close it
  $('#add-modal').removeClass('is-active');
  $('#item-input').prop('disabled',false).val('');
  $('#add-button').removeClass('is-loading');
  $('.close-add-modal').removeClass('is-disabled');
});

// simulate add clic on enter
$('#item-input').keyup((e) => e.key === 'Enter' ? $('#add-button').click() : null);
