$("a.popup").click(function(event){
  event.preventDefault();
  var
  link = this,
  href = link.getAttribute('href'),
  height = link.getAttribute('data-height'),// We can use dataset: link.dataset.height
  width = link.getAttribute('data-width');// We can use dataset: link.dataset.width

  //NOTE: dataset variables are converted to camel case: data-what-ever-is-here => dataset.whatEverIsHere

  window.open(href,"popup","height=" + height + ",width=" + width + "");
});
