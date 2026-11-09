import { mkdir, copyFile, rm } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(new URL('src/',output), { recursive: true });
for (const file of ['index.html','style.css','src/app.js','src/tasks.js']) {
  await copyFile(new URL(file,root),new URL(file,output));
}
console.log('Build concluído: dist contém somente os arquivos públicos.');
