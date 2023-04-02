# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## Avaliação

### RF-002 - Permitir que o usuário realize login

O teste consiste em verificar se o usuário pode fazer login no sistema de diferentes formas:

- Por registro no app.
- Pela conta do google.
- Pela conta do facebook.

Primariamente o app deve ser aberto na tela de login:

![Tela 1.0 - Login por conta no App](img/login_tests_01.jpg)

Devemos prencher o usuário e senha respectivamente com as seguintes informações de teste, como demonstrado na imagem: usuario@gmail.com e 123456.

![Tela 1.1 - Login por conta no App](img/login_tests_02.jpg)

Apos pressionar o botão login, o usuário será redirecionado para a tela principal de testes.

![Tela 1.2 - Resultado login](img/login_tests_03.jpg)

Agora iremos realizar o teste login pela conta no google, primeiramente o botão do google deve ser pressionado:

![Tela 1.3 - Login por conta no Google](img/login_tests_04.jpg)

Apos confirmar a senha, o usuário será redirecionado para a tela principal de testes:

![Tela 1.4 - Resultado login](img/login_tests_03.jpg)

E por fim iremos realizar o teste login pela conta no facebook, primeiramente o botão do facebook deve ser pressionado:

![Tela 1.3 - Login por conta no Facebook](img/login_tests_05.jpg)

Apos confirmar a senha, o usuário será redirecionado para a tela principal de testes:

![Tela 1.4 - Resultado login](img/login_tests_03.jpg)
