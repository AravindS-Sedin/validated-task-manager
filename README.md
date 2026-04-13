# TaskOrbit | Advanced Task Manager

TaskOrbit is a premium, real-time validated task manager built with **Vanilla JavaScript**. It focuses on a fluid user experience with robust validation, efficient DOM handling via event delegation, and persistent storage.

![TaskOrbit Preview](https://img.shields.io/badge/UI-Glassmorphism-blueviolet?style=for-the-badge)
![JS](https://img.shields.io/badge/JS-Vanilla-yellow?style=for-the-badge)

## ✨ Features

### 1. Real-time Validation
- **Automatic Checks**: Validates task title length (minimum 3 characters) and title uniqueness as you type.
- **Instant Feedback**: Errors are displayed immediately at the field level, and the submit button toggles based on the current form validity.

### 2. Multi-level Sorting Logic
Tasks are intelligently organized using a two-tier sorting system:
1. **Primary Sort**: Priority level (**High** > **Medium** > **Low**).
2. **Secondary Sort**: Creation Time (**Newest first** within the same priority group).

### 3. Advanced Event Delegation
- The application uses a single event listener on the parent task container to handle deletions and completion toggles for all child elements, ensuring optimal performance even with many tasks.

### 4. Data Persistence
- Integration with **LocalStorage** ensures that your tasks are saved on every change and automatically restored when you refresh the page.

### 5. Premium Aesthetics
- **Glassmorphism Design**: A sleek, modern interface with interactive hover effects and vibrant gradients.
- **Priority Badging**: Distinct visual indicators for different priority levels to help you focus on what matters most.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Advanced styling with CSS variables, Glassmorphism, and responsive layouts.
- **Vanilla JavaScript**: Core logic for state management, validation, and DOM manipulation.

## 🚀 Getting Started

No installation is required. Simply open the `index.html` file in any modern web browser.

```bash
# Clone the repository
git clone <repository-url>

# Open the folder
cd "validated task manager"

# Open in browser
# (Or use a local server like 'Live Server' in VS Code)
```

## 📂 File Structure

- `index.html`: The application structure and form layout.
- `style.css`: The "TaskOrbit" design system and animations.
- `script.js`: Core logic, state handling, and LocalStorage integration.
