

const tasksInput=document.getElementById("task-input");
const tasksPriority=document.getElementById("task-priority");
const buttonaddtask=document.getElementById("btn-add-task");
const tasksContainer=document.getElementById("tasks-container");


async function loadtasks() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();

        tasksContainer.innerHTML = '';

        data.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item priority-${task.priority}`;

            const info = document.createElement('div');
            info.className = 'task-info';

            const text = document.createElement('p');
            text.textContent = task.text;

            const small = document.createElement('small');
            small.textContent = `Priority: ${task.priority}`;

            info.append(text, small);

            const actions = document.createElement('div');
            actions.className = 'task-actions';


            const btn = document.createElement('button');
            btn.className = 'btn-delete';
            btn.textContent = 'Done';

            btn.onclick = async function() {
                if (!confirm("Did you finish this task?")) return;

                try {
                    await fetch(`/api/tasks/${task.id}`, { 
                        method: 'DELETE' 
                    });
                    loadtasks();
                    
                } catch (error) {
                    console.error("Error deleting:", error);
                }
            };

            actions.appendChild(btn);

            taskItem.append(info, actions);//parent thats why append
            tasksContainer.appendChild(taskItem);
        });

    } catch (error) {
        console.error("error fetching tasks", error);
    }
}


 
buttonaddtask.addEventListener('click', async function () {
     const text=tasksInput.value;
   const priority=tasksPriority.value;
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, priority })
        });

        const data = await response.json();
        console.log("Success:", data);
        alert("Task saved!");
        loadtasks();


    } catch (error) {
        console.error("Error:", error);
    }
});

loadtasks();


// buttonaddtask.addEventListener('click', async function () {
//     const text=tasksInput.value;
//     const priority=tasksPriority.value;
//     try {
//         const response = await axios.post('/api/tasks', {
//             text,
//             priority
//         });

//         console.log("Success:", response.data);
//         alert("Task saved!");

//     } catch (error) {
//         console.error("Error:", error);
//     }
// });

//how dom works 
//first tell that what to create like div p or other tag with the hellp of the document.createelement("div") like this way
//then  fill them with the values like div.className="box"; with textContent="hello"
//at last appendChild(div);
//just think of html and write the js like this
//<div class="task-item">
//   <div class="task-info">
//     <p>Task text</p>
//     <small>Priority: High</small>
//   </div>

//   <div class="task-actions">
//     <button>Done</button>
//   </div>
// </div>

//create fill attach

// data.forEach(task=>{
//     const taskItem=document.createElement("div");
//     taskItem.className=`task-item priority-${task.priority}`;
//     const info=document.createElement('div');
//     info.className='task-info';
//     const text=document.createElement('p');
//     text.textContent=task.text
//     const small= document.createElement('small');
//     small.textContent=`Priority:${task.priority}`;
//     info.appendChild(text,small);
//     const action=document.createElement('div');
//     action.className='task-actions';
//     const btn=document.createElement('button');
//     btn.className='btn-delete';
//     btn.textContent="done";
//     action.appendChild(btn);
//     action.append(info,action);//parent
//     tasksContainer.appendChild(taskItem);//child of tasksContainer
// })
