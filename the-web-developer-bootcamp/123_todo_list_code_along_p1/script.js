console.log("Connected");

var todos = [];
var answer;

do {
  answer = prompt("Please insert a command:");

  if (answer === "list" ){
    console.log(todos);
  }
  else if (answer === "new"){
    todos.push(prompt("Write your next Todo"));
  }
  else if (answer !== "quit"){
    console.log("Invalid command");
  }
}
while (answer !== "quit");
