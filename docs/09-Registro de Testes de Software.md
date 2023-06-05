# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## Avaliação

### RF-001 - Usuário efetuar o cadastramento da conta

<img src="./img/testeRF001/Teste cadastro.png" width="1000px">

### RF-002 - Permitir que o usuário realize login

O teste consiste em verificar se o usuário pode fazer login no sistema de diferentes formas:

- Por registro no app.
- Pela conta do google.
- Pela conta do facebook.

Primariamente o app deve ser aberto na tela de login:

![Tela 1.0 - Login por conta no App](img/login_tests_1.jpg)

Devemos prencher o usuário e senha respectivamente com as seguintes informações de teste, como demonstrado na imagem: usuario@gmail.com e 123456.

![Tela 1.1 - Login por conta no App](img/login_tests_2.jpg)

Apos pressionar o botão login, o usuário será redirecionado para a tela principal de testes.

![Tela 1.2 - Resultado login](img/login_tests_3.jpg)

Agora iremos realizar o teste login pela conta no google, primeiramente o botão do google deve ser pressionado:

![Tela 1.3 - Login por conta no Google](img/login_tests_4.jpg)

Apos confirmar a senha, o usuário será redirecionado para a tela principal de testes:

![Tela 1.4 - Resultado login](img/login_tests_3.jpg)

E por fim iremos realizar o teste login pela conta no facebook, primeiramente o botão do facebook deve ser pressionado:

![Tela 1.3 - Login por conta no Facebook](img/login_tests_5.jpg)

Apos confirmar a senha, o usuário será redirecionado para a tela principal de testes:

![Tela 1.4 - Resultado login](img/login_tests_3.jpg)

### RF-003 - Permitir que o usuário visualize sua agenda com compromissos marcados atualizada

O teste consiste em verificar na pagina principal se o usuário pode visualizar seus serviçõs agendados:

Conforme podemos perceber na imagem abaixo, os serviços agendados foram exibidos corretamente:

![Tela 1.5 - Pagina principal com compromissos](img/home-servicos-agendados.png)

### RF-005 - Permitir que qualquer usuário cancele um serviço que ele proprio agendou ou ira realizar

O teste consiste em verificar se é possivel cancelar um serviço agendado:

Conforme podemos perceber na imagem abaixo, o serviço esta devidamente agendado:

![Tela 1.6 - Pagina principal com compromissos](img/home-cancelamento-1.png)

Apos clicar no icone correspondente ao cancelamento, é possivel verificar que o sistema exibe uma mensagem de confirmação:

![Tela 1.7 - Pagina principal com compromissos](img/home-cancelamento-2.png)

Apos a confirmação é possivel verificar que o serviço já esta cancelado:

![Tela 1.8 - Pagina principal com compromissos](img/home-cancelamento-3.png)

### RF-006 - Notificar todos os tipos de usuário sobre um serviço marcado

O teste consiste em verificar se o usuário é notificado apos fazer um agendamento:

Conforme podemos perceber na imagem abaixo, um agendamento está sendo realizado:

![Tela 1.9 - Pagina principal com compromissos](img/agendamento-1.png)

Após a confirmação é possivel ver a notificação:

![Tela 1.12 - Pagina principal com compromissos](img/agendamento-2.png)

### RF-007 - Permitir que usuários do tipo cliente e empresa troquem mensagens entre si

O teste consiste em verificar se o usuário consegue encaminhar uma mensagem ao prestador de serviço:

Conforme podemos perceber na imagem abaixo, este recurso esta funcional:

![Tela 1.9 - Pagina principal com compromissos](img/chat.jpeg)

### RF-008 - O usuário do tipo empresa irá cadastrar um horário de intervalo entre serviços

<img src="./img/testeRF008/Teste intervalo 1.png" width="1000px">

<img src="./img/testeRF008/Teste intervalo 2.png" width="1000px">

### RF-009 - Usuário irá criar um novo serviço, edita-lo e deletar esse serviço.

<img src="./img/testeRF009/Teste serviços 1.png" width="1000px">

<img src="./img/testeRF009/Teste serviços 1.png" width="1000px">

<img src="./img/testeRF009/Teste serviços 3.png" width="1000px">

### RF-009 - Exibir o perfil do usuário e alterar informações.

O teste consiste em verificar se o sistema vai recuperar as informações do usuário no banco de dados e disponibiliza-las na interface de forma satisfatoria.

- O usuário deve estar logado para realização do teste.
- O usuário deve clicar no link de redirecionamento para acessar a página de perfil.
- As informações exceto o e-mail poderão ser alteradas através da página de perfil clicando no botão de salvar informações. 
- O usuário poderá trocar sua senha pelo aplicativo
- O usuário poderá enviar mensagem de suporte

O sistema deve apresentar as informações de perfil de forma clara para o usuário cliente:

![Tela de Perfil do Cliente ](img/perfil-cliente.png)

O sistema deve apresentar as informações de perfil do usuário profissional:

![Tela de Perfil do Profissional ](img/perfil-profissional.png)

O sistema deve apresentar tela de configurações:

![Tela de Configurações](img/telaconfig.png)

- Senha alterada.<br>
![Tela de Senha](img/telasenha.png)
![Tela Senha Alterada](img/mudarsenha.png)

- Senha errada com erro.<br>
 ![Tela de Erro Senha](img/telaconfigsenhaerrada.png)

O sistema deve ter local para pedir suporte com o aplicatio:

![Tela de Pedir Suporte](img/telaconfigsupport.png)
![Tela Pedido Suporte Enviado](img/telaconfigsupport2.png)
- Database com solicitação.<br>
![Tela DataBase Pedido](img/supoortdatabase.png)

O sistema deve ter local para sair do aplicatio:

![Tela de Pedir Suporte](img/telaconfigsair.png)

### RF-010 - O usuário do tipo empresa irá cadastrar o local onde o serviço será realizado

<img src="./img/testeRF010/Teste local serviço 1.png" width="1000px">

<img src="./img/testeRF010/Teste local serviço 2.png" width="1000px">

<img src="./img/testeRF010/Teste local serviço 3.png" width="1000px">

### RF-018 - O usuário do tipo empresa deve selecionar os dias em que seus serviços serão prestados

<img src="./img/testeRF018/Teste horario 1.png" width="1000px">

<img src="./img/testeRF018/Teste horario 2.png" width="1000px">


