const authSection = document.getElementById("auth-section");
const dashboardView = document.getElementById("dashboard-view");
const tasksInput = document.getElementById("task-input");
const tasksPriority = document.getElementById("task-priority");
const buttonaddtask = document.getElementById("btn-add-task");
const tasksContainer = document.getElementById("tasks-container");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginbtn = document.getElementById("btn-login-action");
const btnlogout=document.getElementById("btn-logout");
const btntask=document.getElementById("btn-tasks");

// ================= UI =================
function showLogin() {
    authSection.classList.remove("hidden");
    dashboardView.classList.add("hidden");
}

function showDashboard() {
    authSection.classList.add("hidden");
    dashboardView.classList.remove("hidden");
}

// ================= AUTH FETCH HELPER =================
function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });
}

// ================= LOAD TASKS =================
async function loadtasks() {
    try {
        const response = await authFetch("/api/tasks");
        const data = await response.json();

        tasksContainer.innerHTML = "";

        data.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.className = `task-item priority-${task.priority}`;

            const info = document.createElement("div");
            info.className = "task-info";

            const text = document.createElement("p");
            text.textContent = task.text;

            const small = document.createElement("small");
            small.textContent = `Priority: ${task.priority}`;

            info.append(text, small);

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const btn = document.createElement("button");
            btn.className = "btn-delete";
            btn.textContent = "Done";

            btn.onclick = async () => {
                if (!confirm("Did you finish this task?")) return;

                await authFetch(`/api/tasks/${task.id}`, {
                    method: "DELETE"
                });

                loadtasks();
            };

            actions.appendChild(btn);
            taskItem.append(info, actions);
            tasksContainer.appendChild(taskItem);
        });
    } catch (err) {
        console.error("Error loading tasks", err);
    }
}

// ================= ADD TASK =================
buttonaddtask.addEventListener("click", async () => {
    const text = tasksInput.value;
    const priority = tasksPriority.value;

    if (!text) return alert("Enter task");

    await authFetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ text, priority })
    });

    tasksInput.value = "";
    loadtasks();
});

// ================= LOGIN =================
loginbtn.addEventListener("click", async () => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("token", data.token);
        showDashboard();
        loadtasks();
    } else {
        alert("Invalid credentials");
    }
});

//===================logout==================

btnlogout.addEventListener("click", async () => {
  localStorage.removeItem("token");
  showLogin();
});


// ================= AUTO LOGIN =================
const token = localStorage.getItem("token");
if (token) {
    showDashboard();
    loadtasks();
} else {
    showLogin();
}

btntask.addEventListener('click',async()=>{
    alert("tasks working")
})

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

// What authFetch actually is

// A helper function that automatically attaches JWT to requests