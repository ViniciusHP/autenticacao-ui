<h1 align="center">
  Autenticação UI
</h1>

<h4 align="center">Status: ✔ Concluído</h4>

<div align="center">
  <img src="assets/Tela login.png" alt="Tela de login do projeto" width="686">
</div>

---

<p align="center">
 <a href="#user-content-sobre-o-projeto">Sobre o projeto</a> |
 <a href="#user-content-executando-o-projeto">Executando o projeto</a> |
 <a href="#user-content-telas-do-projeto">Telas do projeto</a> |
 <a href="#user-content-tecnologias">Tecnologias</a>
</p>

---

## **Sobre o projeto**

Front-end desenvolvido em Angular para consumo da API desenvolvida em Spring Boot para autenticação e cadastro de usuários. Repositório da API: https://github.com/ViniciusHP/autenticacao-api

## **Executando o projeto**

### Pré-requisitos

- NodeJS ( versão utilizada: 16.15.1 )
- Npm ( versão utilizada: 8.11.0 )
- Angular CLI ( versão utilizada: 15.0.4 )

### Instruções adicionais

Por padrão, a aplicação vai buscar os dados em nosso back-end no endereço `http://localhost:8080`. Para alterá-lo, modifique a propriedade `apiUrl` do arquivo `src/environments/environment.ts`.

### Instruções de execução do projeto

```bash
# Na pasta raíz do projeto, instale as dependências
$ npm install

# Execute o projeto em modo de desenvolvimento
$ npm start
# ou
$ ng serve

# O servidor de desenvolvimento será iniciado na porta 4200
# Para acessar o projeto, navegue para http://localhost:4200

# Para alterar a porta do servidor de desenvolvimento utilize a opção --port seguida do número da porta
$ ng serve --port 8000
```

### Instruções de execução de testes

```bash
# Para rodar os testes do Chrome e no Firefox simultaneamente
$ npm run test-common

# Para gerar relatório de coverage dos testes
$ npm run test-coverage

# Para rodar os testes e gerar relatório XML
$ npm run test-ci
```

## **Telas do projeto**

### Login

A tela de acesso ao sistema.

<div align="center">
  <img src="assets/Tela login.png" alt="Tela de login do projeto desktop" width="686">
  <img src="assets/Tela login mobile.png" alt="Tela de login do projeto mobile" height="343">
</div>

### Home

A tela inicial ao se autenticar no sistema.

<div align="center">
  <img src="assets/Tela home.png" alt="Tela home do projeto desktop" width="686">
  <img src="assets/Tela home mobile.png" alt="Tela home do projeto mobile" height="343">
</div>

### Cadastro de usuário

Tela específica para cadastro de novos usuários.

<div align="center">
  <img src="assets/Tela cadastro de usuário.png" alt="Tela cadastro de usuário desktop" width="686">
  <img src="assets/Tela cadastro de usuário mobile.png" alt="Tela cadastro de usuário mobile" height="343">
</div>

### Recuperação de senha

Tela para solicitação de recuperação de senha do usuário.

<div align="center">
  <img src="assets/Tela recuperação de senha.png" alt="Tela recuperação de senha desktop" width="686">
  <img src="assets/Tela recuperação de senha mobile.png" alt="Tela recuperação de senha mobile" height="343">
</div>

### Redefinição de senha

Tela para efetivar a recuperação de senha do usuário.

<div align="center">
  <img src="assets/Tela redefinir senha.png" alt="Tela redefinição de senha desktop" width="686">
  <img src="assets/Tela redefinir senha mobile.png" alt="Tela redefinição de senha mobile" height="343">
</div>

### Página não encontrada

Tela exibida quando ocorrer uma navegação em uma rota desconhecida.

<div align="center">
  <img src="assets/Tela página não encontrada.png" alt="Tela de página não encontrada desktop" width="686">
  <img src="assets/Tela página não encontrada mobile.png" alt="Tela de página não encontrada mobile" height="343">
</div>

## **Tecnologias**

Este projeto foi construído com as seguintes ferramentas/tecnologias:

- **[Angular](https://angular.io/)**
- **[PrimeFlex](https://primefaces.org/primeng/showcase/#/primeflex)**
- **[PrimeNG](https://www.primefaces.org/primeng/)**
- **[ngx-translate](http://www.ngx-translate.com/)**
