// 1. Select DOM elements
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('btn-add-task');
const tasksContainer = document.getElementById('tasks-container');

// 2. Add Event Listener
addTaskBtn.addEventListener('click', function() {
    const text = taskInput.value;
    const priority = prioritySelect.value;

    if (text === "") {
        alert("Please write a task!");
        return;
    }

    // 3. Send data to Backend (POST)
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Tell server we are sending JSON
        },
        body: JSON.stringify({ text: text, priority: priority })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        // We will add code here later to show the task on screen!
        alert("Task saved to server!");
        taskInput.value = ""; // Clear input
    })
    .catch(error => console.error('Error:', error));
});