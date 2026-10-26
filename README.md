# Help Desk — Front

Interface web do sistema de chamados. Usuários abrem e acompanham tickets e
conversam com o suporte pelo chat de cada ticket, que atualiza em tempo real.

A API (Node + Express + Socket.io) está em [help-desk-api](https://github.com/Miguelbbezerra/help-desk-api).

**Stack:** React 18 · Material UI · React Router · Socket.io client

## Telas

- **Login**, com rota privada: sem token válido, volta para o login.
- **Pedidos (tickets):** listagem com busca e filtro por status e categoria, abertura
  e edição de chamado.
- **Chat do ticket:** mensagens em tempo real via Socket.io.
- **Notificações:** aviso quando um ticket é criado ou atualizado e quando chega
  mensagem nova. Dá para marcar como lida.
- **Configurações** (só admin): cadastro de usuários, categorias e status.

O que cada usuário vê depende do nível: `admin` acessa as configurações e todos os
tickets, e `comum` vê os próprios.

## Estrutura

```
src/
├── pages/          # login, home, pedidos, chat, categorias, status, usuarios, configuracoes
├── components/     # filtros, listagem, modais (criar/editar/excluir), notificação
├── config/         # rotas, rota privada, contexto do usuário, header com o token
├── layout/         # menu lateral (drawer)
└── styles/
```

## Rodando

Precisa da [API](https://github.com/Miguelbbezerra/help-desk-api) rodando em
`http://localhost:5000`.

```bash
npm install
npm start        # abre em http://localhost:3000
```

## Pontos conhecidos para melhorar

- A URL da API (`http://localhost:5000`) está repetida em vários componentes.
  Deveria vir de uma variável de ambiente (`REACT_APP_API_URL`) e de um cliente HTTP
  único.
- A API aceita anexos de imagem nos tickets, mas a tela ainda não tem o upload.
- A página `testeChat.js` sobrou dos testes de Socket.io e pode sair.
- Não há testes de componente.
