/* global $ */
module.exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || [];

//Save to local storage
module.exports.saveItems = () => {
  localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems));
};

module.exports.selectItem = (event) => {
  $('.read-item').removeClass('is-active');
  $(event.currentTarget).addClass('is-active');

};

//Select next/prev item
module.exports.changeItem = (where) => {
  //get the active item
  let activeItem = $('.read-item.is-active');
  let newActive = activeItem;
  //Get the next active item
  switch (where) {
  case 'up':
    newActive = activeItem.prev('.read-item');
    break;
  case 'down':
    newActive = activeItem.next('.read-item');
    break;
  }

  if(newActive.length) {
    activeItem.removeClass('is-active');
    newActive.addClass('is-active');
  }
};

//Window function - delete item by id
window.deleteItem = (i= null) => {

  //Set i to active element if is not pased as argument
  i = i || $('.react-item.is-active').index() -1;
  //Remove from DOM
  $('.read-item').eq(i).remove(); //in JQuery eq method refers to the array of elements selected therefore index is 0 based
  //remove from toreadItems array
  this.toReadItems = this.toReadItems.filter((item, index) => i !== index);
  // Update local localStorage
  this.saveItems();
  //select other item or show empty message if empty
  if(this.toReadItems.length) {
    //Select the previous item or new first if i is the first
    let index = (i === 0)? 0 : i-1;
    //Assign active class to the item
    $('.read-item').eq(index).addClass('is-active');

  //If no item show no items message
  } else {
    $('#no-items').show();
  }
};

//Open in Browser
window.openInBrowser = () => {
  if (!this.toReadItems.length) return;

  //Get selected items
  let targetItem = $('.read-item.is-active');
  require('electron').shell.openExternal(targetItem.data('url'));
};

//Open item for reading
window.openItem = () => {
  //check if there are saveItems
  if(!this.toReadItems.length) return;

  //Because the listener is for double click the first click will select the element
  //so that we know that the element selected is allways active
  let targetItem = $('.read-item.is-active');

  //get item's content url (encoded to pass along the url that opens the reader window)
  let contentURL = encodeURIComponent(targetItem.data('url'));

  //get item index to pass to proxy window
  let itemIndex = targetItem.index() - 1;

  //Reader Window url
  let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`;

  //Open item in new proxy BrowserWindow which it will load the url into a secure webview
  let readerWin = window.open(readerWinURL, targetItem.data('title'));
};
//Create new item
module.exports.addItem = (item) => {
  //Hide no items message
  $('#no-items').hide();

  // New item HTML
  let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 cloumn">${item.title}</h2>
                  </a>`;
  // Append to read-Listen
  $('#read-list').append(itemHTML);

  //Event listener to show when the element is selected
  $('.read-item').off('click, dblclick').on('click', this.selectItem).on('dblclick', window.openItem);

  //trigger click event to make the new element active
  $('.read-item').last().trigger('click');
};
