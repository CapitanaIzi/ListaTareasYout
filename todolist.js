class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText) {
        const task = {
            text: taskText,
        };
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    editTask(index,newText){
       
        this.tasks[index].text=newText;
        this.saveTasksToLocalStorage();
        this.renderTasks();
        
    }

    deleteTask(index){
        this.tasks.splice(index,1);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        this.tasks = JSON.parse(storedTasks) || [];
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        this.tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                    <span>${task.text}</span>
                    <span>
                        <button class="edit-button" onClick="todoList.editTask(${index}, prompt('Edit task:', '${task.text}'))" >Edit</button>
                        <button class="delete-button" onClick="todoList.deleteTask(${index})" >Delete</button>
                    </span>
                `;
            taskList.appendChild(listItem);
        });
    }  
}    