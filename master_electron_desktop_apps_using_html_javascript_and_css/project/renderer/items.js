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

//Open item for reading
module.exports.openItem = (e) => {
  //check if there are saveItems
  if(!this.toReadItems.length) return;

  //Because the listener is for double click the first click will select the element
  //so that we know that the element selected is allways active
  let targetItem = $('.read-item.is-active');

  //get item's content url (encoded to pass along the url that opens the reader window)
  let contentURL = encodeURIComponent(targetItem.data('url'));

  //Reader Window url
  let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`;

  //Open item in new proxy BrowserWindow which it will load the url into a secure webview
  let readerWin = window.open(readerWinURL, targetItem.data('title'));
};
//Create new item
module.exports.addItem = (item) => {
  //Hide no items message
  $('#no-items').hide();

  //If item is the first one make it active
  let active = this.toReadItems[0] === item ? 'is-active' : '';
  // New item HTML
  let itemHTML = `<a class="panel-block read-item ${active}" data-url="${item.url}" data-title="${item.title}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 cloumn">${item.title}</h2>
                  </a>`;
  // Append to read-Listen
  $('#read-list').append(itemHTML);

  //Event listener to show whe the element is selected
  $('.read-item').off('click, dblclick').on('click', this.selectItem).on('dblclick', this.openItem);
};
