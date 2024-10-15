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
            completed: false 
        };
        this.lists[this.currentListIndex].tasks.push(task);
        this.saveListsToLocalStorage();
        this.renderTasks();
    }

    editTask(index,newText){
       
        this.lists[this.currentListIndex].tasks[index].text = newText;
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
        taskList.innerHTML = ""; // Limpiar la lista de tareas antes de renderizar
    
        // Asegúrate de que haya listas y tareas
        if (!this.lists[this.currentListIndex] || !this.lists[this.currentListIndex].tasks) {
            return;
        }
    
        this.lists[this.currentListIndex].tasks.forEach((task, index) => {
            const listItem = this.createTaskItem(task, index);
            taskList.appendChild(listItem);
        });
    }
    
    // Crear un ítem de la tarea (listItem)
    createTaskItem(task, index) {
        const listItem = document.createElement("li");
    
        const checkbox = this.createCheckbox(task, listItem);
        const taskText = this.createTaskText(task);
        const editButton = this.createEditButton(index, task);
        const deleteButton = this.createDeleteButton(index);
    
        // Añadir elementos al listItem
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
    
        // Aplicar la clase "completed" si la tarea está marcada
        if (task.completed) {
            listItem.classList.add("completed");
        }
    
        return listItem;
    }
    
    // Crear el checkbox
    createCheckbox(task, listItem) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
    
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            listItem.classList.toggle("completed", task.completed); // Toggle clase 'completed'
            this.saveListsToLocalStorage(); // Guardar cambios en localStorage
        });
    
        return checkbox;
    }
    
    // Crear el texto de la tarea
    createTaskText(task) {
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        return taskText;
    }
    
    // Crear el botón de edición
    createEditButton(index, task) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
    
        editButton.onclick = () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null) {
                this.editTask(index, newText);
            }
        };
    
        return editButton;
    }
    
    // Crear el botón de eliminación
    createDeleteButton(index) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
    
        deleteButton.onclick = () => {
            this.deleteTask(index); // Llamar método deleteTask
        };
    
        return deleteButton;
    }
    
}    