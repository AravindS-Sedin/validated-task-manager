// State Management
let tasks = [];

// DOM Elements
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const prioritySelect = document.getElementById('task-priority');
const descInput = document.getElementById('task-description');
const submitBtn = document.getElementById('submit-btn');
const titleError = document.getElementById('title-error');
const taskList = document.getElementById('task-list');
const taskCountLabel = document.getElementById('task-count');

// Priority Mapping for Sorting
const priorityMap = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    validateForm();
});

// --- Validation Logic ---

const validateForm = () => {
    const title = titleInput.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Requirement: Min 3 characters
    if (title.length > 0 && title.length < 3) {
        errorMessage = "Title must be at least 3 characters.";
        isValid = false;
    } 
    // Requirement: Uniqueness
    else if (tasks.some(task => task.title.toLowerCase() === title.toLowerCase())) {
        errorMessage = "A task with this title already exists.";
        isValid = false;
    }

    // Update UI
    if (errorMessage) {
        titleError.textContent = errorMessage;
        titleError.classList.add('visible');
        titleInput.classList.add('invalid');
    } else {
        titleError.classList.remove('visible');
        titleError.textContent = "";
        titleInput.classList.remove('invalid');
    }

    // Submit button state: only clickable if valid and not empty
    submitBtn.disabled = !isValid || title.length === 0;
};

titleInput.addEventListener('input', validateForm);

// --- Task Operations ---

const createTask = (e) => {
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        title: titleInput.value.trim(),
        priority: prioritySelect.value,
        description: descInput.value.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    // Reset Form
    taskForm.reset();
    validateForm();
};

taskForm.addEventListener('submit', createTask);

// --- Sorting & Rendering ---

const sortTasks = () => {
    return [...tasks].sort((a, b) => {
        // Primary Sort: Priority (High > Medium > Low)
        const pA = priorityMap[a.priority] || 0;
        const pB = priorityMap[b.priority] || 0;
        
        if (pA !== pB) return pB - pA;

        // Secondary Sort: Created Time (Newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
};

const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
};

const renderTasks = () => {
    const sortedTasks = sortTasks();
    taskCountLabel.textContent = `${sortedTasks.length} Task${sortedTasks.length !== 1 ? 's' : ''}`;

    if (sortedTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📂</div>
                <p>No tasks yet.</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = sortedTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-info">
                <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
                <h3 class="task-title">${task.title}</h3>
            </div>
            <div class="task-actions">
                <button class="action-btn btn-complete">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="action-btn btn-delete">Delete</button>
            </div>
            <div class="task-details">
                <p class="task-meta">Created: ${formatDate(task.createdAt)}</p>
                <p class="task-desc">${task.description ? task.description : 'No description provided.'}</p>
            </div>
        </div>
    `).join('');
};

// --- Event Delegation ---

taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const id = parseInt(taskItem.getAttribute('data-id'));

    if (e.target.closest('.btn-complete')) {
        toggleComplete(id);
    } else if (e.target.closest('.btn-delete')) {
        deleteTask(id);
    } else {
        taskItem.classList.toggle('expanded');
    }
});

const toggleComplete = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
};

const deleteTask = (id) => {
    // Add deletion animation class if needed, but for vanilla simple works
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

// --- Storage ---

const saveTasks = () => {
    localStorage.setItem('taskOrbit_data', JSON.stringify(tasks));
};

const loadTasks = () => {
    const stored = localStorage.getItem('taskOrbit_data');
    if (stored) {
        try {
            tasks = JSON.parse(stored);
            renderTasks();
        } catch (e) {
            console.error("Failed to load tasks", e);
            tasks = [];
        }
    }
};
