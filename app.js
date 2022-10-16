const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //get tasks on dom loading
    addEventListener('DOMContentLoaded',getAllTasks)

    //add task event
    form.addEventListener('submit',addTask);

    //remove task event
    taskList.addEventListener('click',removeTask);

    //clear task event
    clearBtn.addEventListener('click',clearTasks);

    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

//Add task
function addTask(e){
    if(taskInput.value.trim() === ''){
        alert('add task');
        return;
    }
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
   
    //create link element for deleting task
    const link = document.createElement('a');
    //add class
    link.className='delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    
    //append link to li
    li.appendChild(link);
    //append ui to ul
    taskList.appendChild(li);

    //add task to local storage
    addTaskToLocalStorage(taskInput.value);

    taskInput.value='';
  //  console.log(taskInput.value);
    e.preventDefault();
}

//Remove task
function removeTask(e){
    let index;
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){e.target.parentElement.parentElement.remove();} 
        else{
            return;
        }   
    }
    removeFromLS(e.target.parentElement.parentElement);
    e.preventDefault();
}

//Clear Tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task=>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}

//add task to local storage
function addTaskToLocalStorage(task){
   // console.log(task);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//get all tasks from local storage(ls) on dom loading 
function getAllTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task=>{
         //create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        //create link element for deleting task
        const link = document.createElement('a');
        //add class
        link.className='delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        
        //append link to li
        li.appendChild(link);
        //append ui to ul
        taskList.appendChild(li);

    });
}

//remove task from ls
function removeFromLS(taskItem){
  //  console.log(task.textContent);
  let tasks;
  if(localStorage.getItem('tasks')===null){
      tasks = [];
  }
  else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  for (const [index, task] of tasks.entries()) {
    if(taskItem.textContent === task){
          tasks.splice(index, 1);
          break;
        }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks));

}