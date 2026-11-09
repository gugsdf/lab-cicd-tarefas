export function addTask(tasks, text, id) {
  const title = text.trim();
  if (!title) throw new Error('Digite uma tarefa.');
  if (title.length > 120) throw new Error('Use até 120 caracteres.');
  return [...tasks, { id, title, done: false }];
}
export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
}
export function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}
