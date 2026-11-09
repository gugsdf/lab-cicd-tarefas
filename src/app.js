import { addTask, toggleTask, removeTask } from './tasks.js';
const key = 'lab-cicd-tarefas-v1';
let tasks = [];
try {
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  if (Array.isArray(saved)) tasks = saved.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.done === 'boolean');
} catch { tasks = []; }
const list = document.querySelector('#tasks');
const feedback = document.querySelector('#feedback');
function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => { tasks = toggleTask(tasks, task.id); save(); });
    const title = document.createElement('span');
    title.textContent = task.title;
    if (task.done) title.className = 'done';
    label.append(checkbox, title);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Excluir';
    button.className = 'remove';
    button.setAttribute('aria-label', `Excluir ${task.title}`);
    button.addEventListener('click', () => { tasks = removeTask(tasks, task.id); save(); });
    item.append(label, button);
    list.append(item);
  }
  document.querySelector('#counter').textContent = `${tasks.filter(t => !t.done).length} pendente(s) · ${tasks.filter(t => t.done).length} concluída(s)`;
  document.querySelector('#empty').hidden = tasks.length > 0;
}
function save() {
  try { localStorage.setItem(key, JSON.stringify(tasks)); feedback.textContent = ''; }
  catch { feedback.textContent = 'Não foi possível salvar neste navegador.'; }
  render();
}
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const field = document.querySelector('#title');
  try { tasks = addTask(tasks, field.value, crypto.randomUUID()); field.value = ''; save(); field.focus(); }
  catch (error) { feedback.textContent = error.message; }
});
render();
