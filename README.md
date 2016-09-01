Workout log
===========

Você deve implementar um workout log utilizando HTML 5, CSS 3 (preferencialmente usando SASS) e Javascript (bem estruturado e modularizado).

**O workout log deve ter as seguintes features:**

 - Um local para inserir itens de workout.
 - Uma tabela com os itens.
 - Um botão para remover o item.
 - Um contador com o total de horas exercitadas.


Abaixo segue o link do mock da tela:
https://www.evernote.com/shard/s6/sh/6db363ef-f8c1-4d8f-b619-b87889953cdc/ea1c6f7ebbc930e95f8012687fea9be6

Favor, seguir o mockup.

Você deve implementar o workout log de acordo com o mock, mas lembre-se que isto é apenas um mock e nós estamos aberto a novas ideias sobre como deveria ser o funcionamento.

**Requerimentos**

 - Você deve usar HTML 5 e frameworks modernos como AngularJS, BackboneJS or React.
 - Você pode usar Coffeescript ou ES6 transpilers. 
 - EVITE utilizar Twitter Bootstrap ou Zurb Foundation. Se você quer reusabilidade, escolha Bourbon/Neat/Refills ou (bom frameworks similares). 
 - O design é importante mas a UX é mais importante (Validações, controles de usuários, navegações e etc).     
 - Você pode nos surpreender, mas nunca esqueça as 4 principais funcionalidades.  
 - Você não precisa de um backend, podendo somente implementar no browser usando memória ou local storage.
 - Você deve utilizar o git.
 - Você deve criar um repositório privado no Bitbucket ou Github. 
 - Testes são bem vindos (fazem a diferença).


----------

Desenvolvimento
---------------

Para o desenvolvimento do Workout log, foi utilizado HTML5, SASS, ACSSET e React.

**Informações:**

 - O [ACSSET](https://github.com/mxczpiscioneri/acsset) é um framework CSS baseado em helpers, desenvolvido por mim.
 - Foi criado uma página de login (estático) para demonstrar o controle de usuários.
 - Para acessar o sistema utilize o e-mail "mxczpiscioner@gmail.com" e a senha "123456".
 - As atividades disponibilizadas foram baseadas nas atividades do [Google Fit](https://www.google.com/fit/).
 - Os dados estão sendo salvos em local storage.
 - Foi adicionado uma validação na data para permitir inserir no máximo 1 ano antes ou 1 ano depois da data atual.
 - Foi adicionado ordenações na tabela de atividades.
 - Foi adicionado o total de atividades realizadas.
***
**Chamada:**

    http://localhost/workout/login.html
***
**Observações**:

 - É necessário usar um servidor para rodar os arquivos, pode ser local.
 - Infelizmente não consegui implementar o teste unitário, por falta de tempo para o estudo do mesmo com React.
***

**Sugestões não implementadas:**

 - Inserir filtros e busca para as atividades cadastradas.
 - Criar relatórios gerais, por data e por atividades.