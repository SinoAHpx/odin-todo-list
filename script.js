let currentPeriod = 'today';
const tasks = {
    'today': [],
    'tomorrow': [],
    'this-week': [],
    'next-week': [],
    'this-month': []
};

function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (task) {
        tasks[currentPeriod].push({
            text: task,
            completed: false
        });
        input.value = '';
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[currentPeriod][index].completed = !tasks[currentPeriod][index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks[currentPeriod].splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks[currentPeriod].forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">×</button>
        `;
        taskList.appendChild(li);
    });
}

function switchPeriod(period) {
    currentPeriod = period;
    document.querySelectorAll('.time-periods a').forEach(a => {
        a.classList.remove('active');
    });
    document.querySelector(`[data-period="${period}"]`).classList.add('active');
    renderTasks();
}

// Add event listener for Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add event listeners for time period switching
document.querySelectorAll('.time-periods a').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        switchPeriod(this.dataset.period);
    });
});

// Initial render
renderTasks();