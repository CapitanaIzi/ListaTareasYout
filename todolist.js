class TodoList {
    constructor() {
        this.lists = [];
        this.currentListIndex = 0;
    } 
    addList(listName) {
        const newList = {
            name: listName,
            tasks: []
        };
        this.lists.push(newList);
        this.saveListsToLocalStorage();
        this.renderListSelector();
    }
    setCurrentList(index) {
        this.currentListIndex = index;
        this.renderTasks();
    }

    addTask(taskText) {
        const task = {
            text: taskText,
        };
        this.lists[this.currentListIndex].tasks.push(task);
        this.saveListsToLocalStorage();
        this.renderTasks();
    }

    editTask(index,newText){
       
        this.lists[this.currentListIndex][index].text=newText;
        this.saveListsToLocalStorage();
        this.renderTasks();
        
    }

    deleteTask(index){
        this.lists[this.currentListIndex].tasks.splice(index,1);
        this.saveListsToLocalStorage();
        this.renderTasks();
    }
    editList(index, newName) {
        if (newName.trim() !== "") {
            this.lists[index].name = newName;
            this.saveListsToLocalStorage();
            this.renderListSelector();
        }
    }

    deleteList(index) {
        this.lists.splice(index, 1);
        this.currentListIndex = 0; // Reset to the first list
        this.saveListsToLocalStorage();
        this.renderListSelector();
        this.renderTasks();
    }

    saveListsToLocalStorage() {
        localStorage.setItem("lists", JSON.stringify(this.lists));
    }
    loadListsFromLocalStorage() {
        const storedLists = JSON.parse(localStorage.getItem("lists"));
        if (storedLists) {
            this.lists = storedLists;
        }
        this.renderListSelector();
        this.renderTasks();
    }
    renderListSelector() {
        const listSelector = document.getElementById("listSelector");
        listSelector.innerHTML = ""; 
        this.lists.forEach((list, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = list.name;
            listSelector.appendChild(option);
        });
        listSelector.value = this.currentListIndex;
    }
    renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        this.lists[this.currentListIndex].tasks.forEach((task, index) => {
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