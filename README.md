#### Sobre o Projeto
Gamelist é uma aplicação web do tipo CRUD voltada ao gerenciamento de uma biblioteca pessoal de jogos. O foco do projeto é usabilidade e experiência visual, permitindo que o usuário crie, edite e organize um inventário de jogos “zerados” por meio de cards interativos e totalmente personalizáveis.

![Demonstração do Projeto](./gifs/card-creator.gif)

Teste você mesmo: https://natanpasolini.github.io/gamelist/

---

- [Sobre o Projeto](#sobre-o-projeto)
- [Features](#features)
  - [Sistema CRUD](#sistema-crud)
  - [Persistência de Dados](#persistência-de-dados)
- [Tecnologias](#tecnologias)
- [Como editar](#como-editar)

---

#### Features

##### Sistema CRUD

* **Criação de Cards:**
  * **Informações:** As informações básicas dos cards são: Título, Ano (em que zerou), Conquistas e Horas de jogo.
  * **Imagem:** O usuário pode definir uma imagem ou gif através de link.
  * **Fundo Personalizavel:** Através de RGB, o usuário pode definir a cor do fundo de cada card.
* **Edição/remoção:** O usuário pode editar/remover qualquer card através da toolbar.

##### Persistência de Dados
* **Local Storage:** O projeto salva automaticamente suas alterações no próprio navegador.
* **Portabilidade:** Possui funcionalidade de **Exportar/Importar como .json**, permitindo que o usuário faça backup da sua lista ou a transfira entre dispositivos.

---

#### Tecnologias

| Tecnologia | Descrição |
| :---: | :--- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40"> | **HTML5**<br>Responsável pela estruturação semântica da página e organização dos templates de cards. |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40"> | **CSS3**<br>Utilizado para estilização personalizada e refinamento visual dos componentes. |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="40"> | **Tailwind CSS**<br>Framework utility-first que garante a rapidez no desenvolvimento e total responsividade da interface. |
| <img src="https://img.daisyui.com/images/daisyui/mark-rotating.svg" width="40"> | **DaisyUI**<br>Plugin de TailwindCSS utilizado para o efeito 3d dos gamecards. |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40"> | **JavaScript**<br>Lógica principal do projeto, lidando com a manipulação do DOM, edição e exclusão dinâmica dos cards. |

---

#### Como editar
1. Clone o repositório:
```bash
 git clone https://github.com/natanpasolini/gamelist
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