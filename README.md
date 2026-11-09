# Lab CI CD Tarefas

Aplicação estática de tarefas com HTML, CSS e JavaScript. Permite adicionar, concluir, reabrir e excluir tarefas. Os dados ficam no localStorage do próprio navegador.

Projeto criado com apoio de IA durante o laboratório em 9 de novembro de 2026.

## Desenvolvimento

Requer Node.js 24. Não há dependências externas para instalar.

```sh
npm run check
npm test
npm run build
```

Sirva a pasta `dist` com um servidor HTTP estático. Não abra o HTML diretamente pelo protocolo file, porque a aplicação utiliza módulos JavaScript.

## Pipeline

Arquivo: `.github/workflows/ci-cd.yml`.

Push em main e pull requests para main executam verificação de sintaxe, oito testes e build. Somente um push em main com CI aprovada publica o artefato no GitHub Pages. Pull requests não publicam. A execução manual valida a CI sem fazer deploy.

Em Settings > Pages, selecione GitHub Actions como origem. GitHub Pages é adequado porque o projeto não utiliza backend, banco de dados ou segredos de servidor. O job deploy depende da CI por `needs: ci`.

## Limites

As tarefas são locais ao navegador e não sincronizam entre dispositivos. Os testes automatizados verificam regras e referências da página; a interação visual deve ser conferida também no navegador.

## Validação de pull requests

A CI de um pull request deve passar sem executar o deployment. A publicação fica restrita aos pushes em main.

