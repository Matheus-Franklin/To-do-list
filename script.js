document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');

  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach(task => addTaskToDOM(task.text, task.complete));
  };

  const addTaskToDOM = (taskText, complete = false) => {
      const taskItem = document.createElement('li');
      taskItem.className = `task-item${complete ? ' complete' : ''}`;
      taskItem.innerHTML = `
          <span>${taskText}</span>
          <button class="complete-task">✔</button>
          <button class="delete-task">✖</button>
      `;
      taskList.appendChild(taskItem);

      taskItem.querySelector('.complete-task').addEventListener('click', () => {
          taskItem.classList.toggle('complete');
          saveTasks();
      });

      taskItem.querySelector('.delete-task').addEventListener('click', () => {
          taskList.removeChild(taskItem);
          saveTasks();
      });
  };

  const saveTasks = () => {
      const tasks = [];
      taskList.querySelectorAll('.task-item').forEach(taskItem => {
          tasks.push({
              text: taskItem.querySelector('span').innerText,
              complete: taskItem.classList.contains('complete')
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
          addTaskToDOM(taskText);
          taskInput.value = '';
          saveTasks();
      }
  });

  loadTasks();
});
