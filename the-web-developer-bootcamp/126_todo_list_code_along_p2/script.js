var todos = [];
var answer;

do {
  answer = prompt("Please insert a command:");

  if (answer === "list" ){
    listElements(todos, "List of TODOS:");
  }
  else if (answer === "new"){
    addElement();
  }
  else if(answer === "delete"){
    deleteElement();
  }
  else if (answer !== "quit"){
    console.log("Invalid command");
  }
}
while (answer !== "quit");

console.log("The program has finished, please reload the page");

function listElements(list, message){
  //console.clear();
  console.log("**********");
  if (message){
    console.log(message);
  }
  list.forEach(function(todo, i){
    console.log(i + 1 + ": " + todo); //Avoid 0 as can be tricky in if statements
  });
  console.log("**********");
}

function addElement(){
  console.clear();
  var element = prompt("Write your next Todo");
  todos.push(element);
  console.log(element + " has been added");
}

function deleteElement(){
  console.clear();
  listElements(todos, "List of TODOS:");
  var index;
  index = prompt("Which item would you like to delete?, Please write the number");
  index = Number(index);
  if (!index || index < 1 || index > todos.length ){
    console.log("You entered an invalid value");
    return;
  }
  var removed = todos.splice(index - 1, 1);
  listElements(removed, "The following item has been removed:");
}
