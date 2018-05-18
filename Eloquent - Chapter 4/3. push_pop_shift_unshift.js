//start my To Do List
var toDoList = [];

//function to push tasks
function rememberTo(task){
  toDoList.push(task);
}

//push tasks on time
rememberTo("study JavaScript");
rememberTo("walk 30'");
rememberTo("do presentation");
rememberTo("take dayoff");

console.log(toDoList)

//start next task and remove it from array
function whatIsNext() {
  return toDoList.shift();
}
console.log(whatIsNext());
console.log(toDoList);

//function that adds urgent tasks on the front of the list
function urgentlyRememberTo(task) {
  toDoList.unshift(task);
}
urgentlyRememberTo("feed the dog")
console.log(toDoList)


//function that removes tasks of low priority from the bottom
function ignoreBottomTask(){
  toDoList.pop();
}
ignoreBottomTask();
console.log(toDoList)
