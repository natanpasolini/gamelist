# 🎮 Gamecards

![GitHub repo size](https://img.shields.io/badge/beta-4.1.0-blue?style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/natanpasolini/gamecards?style=for-the-badge)

![Demonstração do Projeto](./gifs/card-creator.gif)
> [!NOTE]
> Gamecards é uma aplicação web do tipo CRUD voltada ao gerenciamento de uma biblioteca pessoal de jogos. O foco do projeto é usabilidade e experiência visual, permitindo que o usuário crie, edite e organize um inventário de jogos “zerados” por meio de cards interativos e personalizáveis.

## Tecnologias

- [![JS][JS]][JS-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
- [![Figma][Figma]][Figma-url]

## Features

- **Sistema CRUD:** Os gamecards são criados, editados e removidos pelo usuário.
- **Personalização:** Cada gamecard tem sua própria cor de fundo e imagem definidas pelo usuário.
- **Filtragem:** O usuário pode filtrar por ano e/ou nota para encontrar jogos em sua lista.
- **Local Storage:** Os gamecards ficam salvos no navegador.
- **Portabilidade:** Os dados podem ser exportados/importados como **.json**.
- **Responsividade:** O app se adapta a telas menores utilizando o TailwindCSS.

## Roadmap
O projeto ainda está em desenvolvimento e tem as seguintes melhorias planejadas:

- [ ] Novo guia de usuário;
- [x] Busca de imagem de jogo através da API da steam;
- [ ] Presets para o seletor de cor (criados pelo usuário);
  - [ ] Importar/Exportar presets.

e mais...

## Como usar

Se você quiser editar o código:

1. Clone o repositório:
```bash
 git clone https://github.com/natanpasolini/gamecards
```

1. Instale as dependências:

```bash
 npm install
```

3. Inicie o ambiente de desenvolvimento:
```bash
 npm run dev
```

4. Para visualizar, utilize uma extensão de Live Server no VScode.

---

<p align="center">Desenvolvido por Natan Pasolini</p>
<div align="center">
  <a href="mailto:natanpasoliniob@gmail.com">
    <img alt="LinkedIn" title="Email" src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/natan-pasolini">
    <img alt="LinkedIn" title="Meu LinkedIn" src="https://custom-icon-badges.demolab.com/badge/LinkedIn-1155ba?style=for-the-badge&logo=in&logoColor=white"/>
  </a>
</div>


<!-- Tecnologias -->
[JS]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JS-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://tailwindcss.com/
