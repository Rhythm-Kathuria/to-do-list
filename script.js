document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priority');
    const dueDateInput = document.getElementById('dueDate');
    const taskList = document.getElementById('taskList');
    const todoForm = document.getElementById('todoForm');

    // Load tasks from localStorage
    loadTasks();

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = {
            text: taskInput.value,
            priority: priorityInput.value,
            dueDate: dueDateInput.value
        };
        addTask(task);
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'low';
        saveTasks();
    });

    function addTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.text} (Priority: ${task.priority}, Due: ${task.dueDate})</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        // Trigger animation
        setTimeout(() => {
            taskItem.style.opacity = '1';
            taskItem.style.transform = 'translateY(0)';
        }, 10);

        // Mark task as completed
        taskItem.querySelector('.complete-btn').addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        // Delete task
        taskItem.querySelector('.delete-btn').addEventListener('click', function () {
            taskItem.style.opacity = '0';
            taskItem.style.transform = 'translateY(20px)';
            setTimeout(() => {
                taskItem.remove();
                saveTasks();
            }, 300);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const text = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) taskItem.classList.add('completed');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn">✔</button>
                    <button class="delete-btn">✖</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            // Mark task as completed
            taskItem.querySelector('.complete-btn').addEventListener('click', function () {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            // Delete task
            taskItem.querySelector('.delete-btn').addEventListener('click', function () {
                taskItem.style.opacity = '0';
                taskItem.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    taskItem.remove();
                    saveTasks();
                }, 300);
            });
        });
    }
});
