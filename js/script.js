//Define UI Element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task');
let filter = document.querySelector('#filter_task');
let taskInput = document.querySelector('#new_task');

//define EventListener
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

// Add a Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Please add a task :");
    }else {
        let li = document.createElement('li');
        let tasks = document.createTextNode(taskInput.value + " ");
        li.appendChild(tasks);
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove a Task
function removeTask(e) {
    if(e.target.hasAttribute("href")) {
        if (confirm("Are you Shure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            //console.log(ele);
            removefromLS(ele);
        }      
    }
}

// Clear all Task
function clearTask(e) {
    if (confirm("Are you Shure?")){
        taskList.innerHTML = "";
    }
    localStorage.clear();
}

//Filter Task
function filterTask (e) {
    let text = e.target.value.toLowerCase();
        //console.log(text);
    document.querySelectorAll('li').forEach(element =>{
        let item = element.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!= -1) {
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }
    });
}

//Store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
       tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//PULL Element from local storage
function getTask() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
       tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        let tasks = document.createTextNode(task + " ");
        li.appendChild(tasks);
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);
    } )
}

// Remove from local storage
function removefromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
       tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
     let li = taskItem;
     li.removeChild(li.lastChild);

    tasks.forEach((task, index) =>{
        if (li.textContent.trim() === task) {
           tasks.splice(index,1) 
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}