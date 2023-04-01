##  Plano de teste de usabilidade
### Processo

O método de avaliação escolhido para testar a usabilidade do sistema foi o System Usability Scale (SUS), que foi proposto por John Brooke em 1986. Trata-se de um questionário com 10 questões em escala Likert aplicado após o usuário usar o sistema ou conhecer como ele funciona . Ele possui um método de cálculo da pontuação de forma normalizada. Entre suas vantagens está o fato de ser cientificamente apurado e não ser longo. 
<br>
Para a execução dos testes será montado um ambiente com o protótipo Agenda Serviço que será disponibilizado publicamente. Após a confirmação de um agendamento através do aplicativo, o usuário será convidado a responder o questionário.
<br>

##  System Usability Scale (SUS)
O questionário será aplicado aos usuário através da ferramente `Google Forms`, como apresentado nas imagens a seguir:
<br><br>

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/1.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/2.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/3.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/4.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/5.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/6.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/7.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/8.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/9.png" width="500">
<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e3-proj-mov-t5-agenda-servico/blob/50b47045a93fcccc992350474aa10c81b286c363/docs/img/testeuser/10.png" width="500">


### Cálculo da Pontuação
Primeiro faz-se a conversão:
- `Para itens ímpares (1, 3, 5, 7, 9)`: subtraia 1 da pontuação que o usuário respondeu.
- `Para itens pares(2 , 4, 6, 8, 10)`:  subtraia a resposta do usuário de 5.

<br>

Por fim, some todos os valores das 10 respostas convertidas e multiplique por 2.5. Essa é a pontuação final, que pode ir de 0 a 100.

### Apuração dos resultados

O cáculo acima se refera ao procedimento para as respostas de 1 usuário participante da avaliação. Idealmente, deve-se fazer isso para mais de um usuário e fazer a média do valor final. O valor de referência para análise do resultado final é `68 pontos`, que é um valor obtido como típico em avaliação com mais de 400 produtos. Um resultado final abaixo de 50 é um sinal de que problemas de usabilidade podem levar ao insucesso do sistema.
