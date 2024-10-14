const todoList = new TodoList();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText.length > 0) {
        todoList.addTask(taskText);
        taskInput.value = "";
        todoList.renderTasks();

    }
}
function addList() {
    const listInput = document.getElementById("listInput");
    const listName = listInput.value.trim();
    if (listName.length > 0) {
        todoList.addList(listName);
        listInput.value = "";
    }
}

document.getElementById("addButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
document.getElementById("addListButton").addEventListener("click", addList);
    document.getElementById("listInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
       addList();
    }

});
document.addEventListener("DOMContentLoaded", () => {
    todoList.loadListsFromLocalStorage();
});
document.getElementById("editListButton").addEventListener("click", () => {
    const listSelector = document.getElementById("listSelector");
    const selectedIndex = listSelector.value;
    const newName = prompt("Editar nombre de la lista:", todoList.lists[selectedIndex].name);
    if (newName !== null) {
        todoList.editList(selectedIndex, newName);
    }
});
document.getElementById("deleteListButton").addEventListener("click", () => {
    const listSelector = document.getElementById("listSelector");
    const selectedIndex = listSelector.value;
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta lista?");
    if (confirmDelete) {
        todoList.deleteList(selectedIndex);
    }
});
document.getElementById("listSelector").addEventListener("change", (event) => {
    const selectedIndex = event.target.value;
    todoList.setCurrentList(selectedIndex);
});


