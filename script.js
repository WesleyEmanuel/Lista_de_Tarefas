const inputElement = document.querySelector(".new-task-input");

const addTaskButton = document.querySelector(".new-task-button");

const taskContainer = document.querySelector(".task-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputValid = validateInput();
    if(!inputValid){
        return inputElement.classList.add("error");
    }

    //Criando a div e o parágrafo
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");
    
    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;
    
    //marcando a tarefa concluída
    taskContent.addEventListener("click", () => handleClick(taskContent));

    //Criando o ícone lixeira
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    //deletando tarefa
    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    taskContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage ();
};


//Marcação da tarefa
const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks) {
        
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle('completed');
        }
    }

    updateLocalStorage ();
};


//Deleção da tarefa
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks) {

        if(task.firstChild.isSameNode(taskContent)){
            taskItemContainer.remove();
        }
    }
  
    updateLocalStorage ();
};

//Armazenando as tasks no localStorage
const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;

    const localStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return {description: content.innerText, isCompleted};
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

//Resgatando tasks do localStorage ao atualizar a página
const refreshTasks = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

    //Sair da função caso não tenha nenhuma task no localStorage
    if(!tasksFromLocalStorage) return;

    //Recriar tasks salvas no localStorage
    for(task of tasksFromLocalStorage) {

        //Criando a div e o parágrafo
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
        
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;
        if(task.isCompleted){
            taskContent.classList.add("completed");
        };
        
        //marcando a tarefa concluída
        taskContent.addEventListener("click", () => handleClick(taskContent));

        //Criando o ícone lixeira
        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash-can");

        //deletando tarefa
        deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        taskContainer.appendChild(taskItemContainer);

    }
};

refreshTasks();

addTaskButton.addEventListener("click", () => handleAddTask());
