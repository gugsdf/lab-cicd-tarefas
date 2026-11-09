import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { addTask, toggleTask, removeTask } from '../src/tasks.js';
test('adiciona uma tarefa removendo espaços sem alterar a lista original', () => {
  const original = [];
  assert.deepEqual(addTask(original, '  Estudar CI/CD  ', '1'), [{id:'1',title:'Estudar CI/CD',done:false}]);
  assert.deepEqual(original, []);
});
test('rejeita tarefa vazia', () => assert.throws(() => addTask([], '   ', '1'), /Digite/));
test('rejeita tarefa acima do limite', () => assert.throws(() => addTask([], 'a'.repeat(121), '1'), /120/));
test('aceita o limite de 120 caracteres', () => assert.equal(addTask([], 'a'.repeat(120), '1')[0].title.length,120));
test('conclui e reabre uma tarefa sem alterar as demais', () => {
  const original = [{id:'1',title:'Teste',done:false},{id:'2',title:'Deploy',done:false}];
  const updated = toggleTask(original,'1');
  assert.equal(updated[0].done,true);
  assert.equal(updated[1].done,false);
  assert.equal(original[0].done,false);
  assert.equal(toggleTask(updated,'1')[0].done,false);
});
test('remove apenas a tarefa escolhida', () => {
  const tasks = [{id:'1',title:'A',done:false},{id:'2',title:'B',done:true}];
  assert.deepEqual(removeTask(tasks,'1'),[tasks[1]]);
  assert.equal(tasks.length,2);
});
test('um identificador inexistente preserva as tarefas', () => {
  const tasks = [{id:'1',title:'A',done:false}];
  assert.deepEqual(toggleTask(tasks,'x'),tasks);
  assert.deepEqual(removeTask(tasks,'x'),tasks);
});
test('página referencia arquivos locais compatíveis com subdiretório do Pages', () => {
  const html = readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/lang="pt-BR"/);
  assert.match(html,/href="\.\/style.css"/);
  assert.match(html,/src="\.\/src\/app.js"/);
});
