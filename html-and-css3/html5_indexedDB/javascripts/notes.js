/*global $*/

//database reference
var db = null;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//handling DB connection
var connecToDB = function(){
  var version = 1;

  //Request to open a DB. The browser returns and object that fires onsuccess or onerror callback, depending if it is successful or not
  var req = window.indexedDB.open("awesomenotes", version);

  //Fires when the schema version number changes. It's used to create the DB structure when it hasn't been created before
  //onupgradeneeded DOES NOT work on Chrome
  req.onupgradeneeded = function(e){
    console.log("onupgradeneeded fired");
    db = e.target.result;
    db.createObjectStore("notes", {keyPath: "id", autoIncrement: true});
  };

  //Fires when open is success
  req.onsuccess = function(e){
    db = e.target.result;
    fetchNotes();
    console.log("Database is connected...");
  };

  //Fires when there is an error opening the DB
  req.onerror = function(e) {
    console.error(e.debug[1].message);
  };

};

var fetchNotes = function(){
  var keyRange, req, result, store, transaction;
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");

  keyRange = IDBKeyRange.lowerBound(0);
  req = store.openCursor(keyRange);

  req.onsuccess = function(e){
    result = e.target.result;
    if(result) {
      addToNotesList(result.key, result.value);
      result.continue(); //gets the next record and onsuccess callback is invoked again until there are no more records
    }
  };

  req.onerror = function(e){
    console.error("Unable to fectch records");
    console.error(e.debug[1].message);
  };
};

var addToNotesList = function(key, data){
  var item = $("<li>");
  var notes = $("#notes");

  item.attr("data-id", key);
  item.html(data.title);
  notes.append(item);
};

//Handling the click in the notes list. Watch for click in the list and determine wich one has been clicked
$("#notes").click(function(e){
  var element = $(e.target);
  if(element.is('li')){
    getNote(element.attr("data-id"));
  }
});

var getNote = function(id){
  var req, store, transaction;
  id = parseInt(id);

  transaction = db.transaction(["notes"]);
  store = transaction.objectStore("notes");

  req = store.get(id);

  req.onsuccess = function(e){
    showNote(req.result);
  };

  req.onerror = function(e){
    console.error("Unable to fectch record " + id);
    console.error(e.debug[1].message);
  };
};

var showNote = function(data){
  var note = $("#note");
  var title = $("#title");

  title.val(data.title);
  title.attr("data-id", data.id);
  note.val(data.note);
  $("#delete_btn").show();
};

$("#new_btn").click(function(e){
  newNote();
});

var newNote = function(){
  var note = $("#note");
  var title = $("#title");

  $("#delete_btn").hide();
  title.removeAttr("data-id");
  title.val("");
  note.val("");
};

$("#save_btn").click(function(e){
  var id, note, title;

  e.preventDefault();
  note = $("#note");
  title = $("#title");
  id = title.attr("data-id");

  if(id){
    updateNote(id, title.val(), note.val());
  } else {
    insertNote(title.val(), note.val());
  }
});

var insertNote = function(title, note){
  var data, key;

  data = {
    "title": title,
    "note": note
  };

  var transaction = db.transaction(["notes"], "readwrite");
  var store = transaction.objectStore("notes");
  var req = store.put(data);

  req.onsuccess = function(e){
    key = req.result;
    addToNotesList(key, data);
    newNote();
  };
};

var updateNote = function(id, title, note){
  id = parseInt(id);

  var data = {
    "title": title,
    "note": note,
    "id": id
  };

  var transaction = db.transaction(["notes"], "readwrite");
  var store = transaction.objectStore("notes");
  var req = store.put(data);

  req.onsuccess = function(e){
    $("#notes>li[data-id=" + id + "]").html(title);
  };
};

$("#delete_btn").click(function(e){
  var title = $("#title");
  e.preventDefault();
  deleteNote(title.attr("data-id"));
});

var deleteNote = function(id){
  var req, store, transaction;
  id = parseInt(id);

  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  req = store.delete(id);

  req.onsuccess = function(e){
    $("#notes>li[data-id=" + id + "]").remove();
    newNote();
  };
};

$("#delete_all_btn").click(function(e){
  clearNotes();
});

var clearNotes = function(){
  var req, store, transaction;

  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  req = store.clear();

  req.onsuccess = function(e){
    $("#notes").empty();
  };

  req.onerror = function(e){
    console.error("Unable to clear notes");
    console.error(e.debug[1].message);
  };
};

connecToDB();
newNote();
console.log("App started...");
