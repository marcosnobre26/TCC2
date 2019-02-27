'use strict'

angular.module('ModuloEscalonamento', ['angular-growl','angularUtils.directives.dirPagination'])
  .controller('IndexController', function($rootScope,$scope,$http) {

    $scope.inserirExerciciosBDnoSession = function(dataBancoDados) {
        if(dataBancoDados.length <= 0) {
            console.log("Vazio");
        } else {
            var dtBanco = dataBancoDados;
            var arrayExercicios = [];
            var objeto = {        
            addElem: function addElem(elem) {
                [].push.call(this, elem);
            }
            };
            for(var i = 0; i < dtBanco.length; i++){
                objeto.addElem(dtBanco[i]['processos']);
            }
            for(var k = 0; k < objeto.length; k++){
                arrayExercicios.push(JSON.parse(objeto[k]));
            }
        return arrayExercicios;
        }
    };

    $scope.textoSobre = "Esse projeto é um fruto construído durante o Trabalho de Conclusão do Curso de Sistemas de Informação (I e II), no CEULP/ULBRA, em 2017. Em sua primeira versão, esse sistema apresenta basicamente os exercícios referentes aos quatro algoritmos básicos de escalonamento de processos (FIFO, SFJ, Prioridades e Round-Robin), bem como ao final de cada exercício, a sua resposta correta. Este sistema deve como orientador, o professor Fabiano Fagundes, e como coorientadora, a professora Madianita Bogo Marioti, ambos professores do CEULP/ULBRA. Caso tenha dúvida ou queira saber mais sobre esse sistema, entre em contato comigo!!! Logo abaixo, seguem os meus contatos.";

    $rootScope.updateDateExercise = function() {
        //var tempoInicial = performance.now();
        $http.post('backend/consultas/listFIFO.php')
        .then(function(data){
           var exerciciosFIFO = [];
           exerciciosFIFO = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosFIFO);
           sessionStorage.setItem("ArrayExerciseFIFO0001", arrayString);       
        });
        $http.post('backend/consultas/listSJF.php')
        .then(function(data){
           var exerciciosSJF = [];
           exerciciosSJF = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosSJF);
           sessionStorage.setItem("ArrayExerciseSJF0002", arrayString);       
        });
        $http.post('backend/consultas/listPrioridade.php')
        .then(function(data){
           var exerciciosPrioridade = [];
           exerciciosPrioridade = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosPrioridade);
           sessionStorage.setItem("ArrayExercisePrioridade0003", arrayString);       
        });
        $http.post('backend/consultas/listRoundRobin.php')
        .then(function(data) {
           var exerciciosRoundRobin = [];
           exerciciosRoundRobin = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosRoundRobin);
           sessionStorage.setItem("ArrayExerciseRoundRobin0004", arrayString);       
        });
        //var tempoFinal = performance.now() - tempoInicial;
        //console.log("Consultando do DB do SQL:");
        //console.log(tempoFinal);
    };

    $rootScope.pageTitle = 'Dashboard - Página Inicial';
    $scope.messageHeader = "Exercícios sobre os algoritmos de escalonamento de processos";
    $scope.messageApoio = "Vamos iniciar o processo de aprendizagem dos quatros algoritmos de escalonamento de processos através de exercícios e resoluções!";
    $rootScope.updateDateExercise();
})
  .controller('CriarExerciciosController', function($rootScope, $scope, $http, $routeParams) {
    $rootScope.pageTitle = 'Criar Exercícios - Sistema Web';
    $scope.message = "Página de Exercício";
    $scope.processosSistemaIndex = [];
    $scope.processosApresentacao = [];
    $scope.algoritmoEscolhido = [];
    $scope.ultimoValordeMomentoTransicaoCPU = 0;
    $scope.nomeAlgo = " ";
    $scope.primeiroProcessoCadastrado = true;
    $scope.erroEncontrado = false;
    $scope.logsErrosView = [];
    $scope.MSGErroShow = false;
    $scope.invalidaOperacaoCriarExercicio = false;

    $scope.inserirExerciciosBDnoSession = function(dataBancoDados) {
        if(dataBancoDados.length <= 0) {
            console.log("Vazio");
        } else {
            var dtBanco = dataBancoDados;
            var arrayExercicios = [];
            var objeto = {        
            addElem: function addElem(elem) {
                [].push.call(this, elem);
            }
            };
            for(var i = 0; i < dtBanco.length; i++){
                objeto.addElem(dtBanco[i]['processos']);
            }
            for(var k = 0; k < objeto.length; k++){
                arrayExercicios.push(JSON.parse(objeto[k]));
            }
        return arrayExercicios;
        }
    };

    $scope.updateDateExercise = function() {
        //var tempoInicial = performance.now();
        /*$http.post('backend/consultas/listFIFO.php')
        .success(function(data){
           var exerciciosFIFO = [];
           exerciciosFIFO = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosFIFO);
           sessionStorage.setItem("ArrayExerciseFIFO0001", arrayString);       
        });
        $http.post('backend/consultas/listSJF.php')
        .success(function(data){
           var exerciciosSJF = [];
           exerciciosSJF = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosSJF);
           sessionStorage.setItem("ArrayExerciseSJF0002", arrayString);       
        });
        $http.post('backend/consultas/listPrioridade.php')
        .success(function(data){
           var exerciciosPrioridade = [];
           exerciciosPrioridade = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosPrioridade);
           sessionStorage.setItem("ArrayExercisePrioridade0003", arrayString);       
        });
        $http.post('backend/consultas/listRoundRobin.php')
        .success(function(data){
           var exerciciosRoundRobin = [];
           exerciciosRoundRobin = $scope.inserirExerciciosBDnoSession(data);
           var arrayString = JSON.stringify(exerciciosRoundRobin);
           sessionStorage.setItem("ArrayExerciseRoundRobin0004", arrayString);       
        });
        //var tempoFinal = performance.now() - tempoInicial;
        console.log("Consultando do DB do SQL:");
        //console.log(tempoFinal);*/
    };

    $scope.tratamentodeDadosEntradaProcessos = function ($processoEntrada) {
    var processo = $processoEntrada;
    $scope.logsErrosView = [];
    $scope.erroEncontrado = false;
    var logErros = [{nomeErro: ' ', descricaoErro: ' '}];
    if($scope.primeiroProcessoCadastrado) {
        $scope.primeiroProcessoCadastrado = false;
        if(isNaN(processo.momentoTransicaoSistema) || parseInt(processo.momentoTransicaoSistema) != 0)
        {
            $scope.primeiroProcessoCadastrado = true;
            $scope.erroEncontrado = true;
            $scope.logsErrosView['nomeErro'] = "Erro ao cadastrar o primeiro processo!";
            $scope.logsErrosView['erroMomentoTransicao'] = "O Momento de Transição (MT) do primeiro processo da tabela inicial deve iniciar com o valor 0.";
            $scope.logsErrosView['Verificar'] = "Por favor, verifique os dados novamente!";
        } else {
            $scope.ultimoValordeMomentoTransicaoCPU = processo.momentoTransicaoSistema;
            $scope.primeiroProcessoCadastrado = false;
        }
    } else if(!$scope.primeiroProcessoCadastrado) {
        if((isNaN(processo.momentoTransicaoSistema)) || (parseInt(processo.momentoTransicaoSistema) <= $scope.ultimoValordeMomentoTransicaoCPU)) {
            $scope.erroEncontrado = true;
            $scope.logsErrosView['nomeErro'] = "Erro ao cadastrar processo!";
            $scope.logsErrosView['erroMomentoTransicao'] = "O Momento de Transição (MT) do processo atual deve ser maior que o processo anterior.";
            $scope.logsErrosView['Verificar'] = "Por favor, verifique os dados novamente!";
        } else {
            $scope.ultimoValordeMomentoTransicaoCPU = processo.momentoTransicaoSistema;
            $scope.erroEncontrado = false;
        }
    }
    if($scope.nomeAlgoritmoView.nome != 'Prioridade') {
        processo.prioridadeSistema = 0;
    } 
    if (processo.prioridadeSistema == null)
        {
            processo.prioridadeSistema = 0;
    }
    if($scope.erroEncontrado) {
        $scope.erroEncontrado = true;
        return null;
    } else {
        $scope.erroEncontrado = false;
        //$scope.ultimoValordeMomentoTransicaoCPU = parseInt(processo.momentoTransicaoSistema);
        return processo;
    }
        
    };


    $scope.adicionarProcessos = function(processo) {
        var processosTratados = $scope.tratamentodeDadosEntradaProcessos(processo);
            if(!$scope.erroEncontrado) {              
                $scope.processosSistemaIndex.push(angular.copy(processosTratados));
                var arrayString = JSON.stringify($scope.processosSistemaIndex);
                sessionStorage.setItem("processosIniciais", arrayString);
                var dados = sessionStorage.getItem("processosIniciais");
                var json = JSON.parse(dados);
                $scope.processosApresentacao = json;
                
                delete $scope.processo;
            } else {
                $scope.MSGErroShow = true;
            }
    };

    $scope.atualizarBanco = function() {
        $scope.updateDateExercise();
    };

    $scope.inserirExercicio = function() {
        if(!$scope.primeiroProcessoCadastrado) {
            var dados = sessionStorage.getItem("processosIniciais");
            var listaProcessos = dados;
            var nomeAlgoritmo = $scope.algoritmoEscolhido.nome;
                $http.post('backend/insercoes/insertExercicio.php',{'processos': listaProcessos, 'algoritmo': nomeAlgoritmo})
                .success(function(){
                    $scope.msg="Dados salvo com sucesso!!!";
                });            
                $scope.atualizarBanco();
                $scope.guardado = true;
        } else {
            $scope.msg="Por favor, insere um processo para salvar exercício!!!";
            $scope.guardado = true;
        }            
    };

    $scope.algoritmosEscalonamento = [
        {nome: 'FIFO', descricao: 'O FIFO é um algoritmo mais simples. A retirada dos processos da final de aptos consiste na ordem de chegada. É um algoritmo não-preemptivo.'},
        {nome: 'SJF', descricao: 'SJF'},
        {nome: 'Prioridade', descricao: 'Prioridade'},
        {nome: 'Round-Robin', descricao: 'Round-Robin'}
    ];
    $scope.trocarAlgoritmo = function() {       
        $scope.algoritmoEscolhido = $scope.nomeAlgoritmoView;
    };

    $scope.finalizarInsercao = function () {
    if(!$scope.primeiroProcessoCadastrado) {
            if($scope.algoritmoEscolhido.nome == 'Round-Robin') {
                if($scope.quantumView == null) {
                    $scope.quantumView = 2;
                }
                $scope.algoritmoEscolhido['quantum'] = $scope.quantumView;
                var arrayString = JSON.stringify($scope.algoritmoEscolhido);
                sessionStorage.setItem("avaliarAlgoritmo", arrayString);
            } else {
            var arrayString = JSON.stringify($scope.algoritmoEscolhido);
            sessionStorage.setItem("avaliarAlgoritmo", arrayString);
            }
    } else {
        $scope.invalidaOperacaoCriarExercicio = true;
        $scope.cadastrarProcessos = "Por favor! Cadastrar pelo menos um processo para responder e analisar o exercício. Obrigado"
        $scope.alertaNaoProcesso = true; //um alerta para o usuário
    }
    };
  })
  .controller('ExerciciosCadastradosController', function($rootScope,$scope,$http){
    $rootScope.pageTitle = 'Exercícios Cadastrados - Sistema Web';
    $scope.algoritmoCadastrado = {};
    $scope.message = "Página de Exercício";
    $scope.nomeAlgoritmo = "Selecionar um algoritmo";
    $scope.algoritmoSelecionadoProntos = [];
    $scope.ExercicioSistema = [];
    $scope.HashExercicios = [];
    $scope.algoritmoListadeExerciciosAtual = [];
    $scope.novoArray = false;
    $scope.algoritmoAtual = [];
    $scope.novaConexaoPagina = true; //configurar a página ao carregar, para sempre estabelecer o primeiro algorimto de escalonamento: FIFO
    //buscando os exercícios do session storage dos quatros algoritmos
    //var tempoInicial = performance.now();
    
    var dados = sessionStorage.getItem("ArrayExerciseFIFO0001"); //algoritmo FIFO
    var json = JSON.parse(dados);
    $scope.processosBancoFIFO = json;

    var dados = sessionStorage.getItem("ArrayExerciseSJF0002"); //algoritmo SJF
    var json = JSON.parse(dados);
    $scope.processosBancoSJF = json;

    var dados = sessionStorage.getItem("ArrayExercisePrioridade0003"); //algoritmo Prioridade
    var json = JSON.parse(dados);
    $scope.processosBancoPrioridade = json;

    var dados = sessionStorage.getItem("ArrayExerciseRoundRobin0004"); //algoritmo Round-Robin
    var json = JSON.parse(dados);
    $scope.processosBancoRoundRobin = json;
    //var tempoFinal = performance.now() - tempoInicial;
    //console.log("Consultando do DB do navegador:");
    //console.log(tempoFinal);

    $scope.IndiceExercicios = function(algoritmoEscolhido) {
        var hash = [];
        var cont = 0;
        for(var i = 0; i < algoritmoEscolhido.length; i++){
            var quantidadeProcessos = algoritmoEscolhido[i].length;
            cont++;
            hash.push({indice: i, exercicio: "Exercício " + cont, quantidadeProcessosLista: quantidadeProcessos});
        }
        $scope.HashExercicios = hash;
        $scope.arrayIndice = {indice: 0, exercicio: "Exercício " + 1}; //depois apagar isso
    };

    $scope.trocarArrayExercicio = function(indice, listaExerciciosAtual) {//vou ter que passar o array de exer do algoritmo
        if($scope.novoArray) {
            var exerciciosAtual = listaExerciciosAtual;
            var indiceView = indice.indice;
            exerciciosAtual.forEach(function(exerciciosAtual, index) {
                if(index == indiceView){
                    $scope.ExercicioSistema = exerciciosAtual;
                }
            });
        }
    };

    $scope.trocarExercicio = function($indice) {
        var arrayInd = $indice;
        var listaAtualExercicio = $scope.algoritmoListadeExerciciosAtual;
        $scope.trocarArrayExercicio(arrayInd, listaAtualExercicio);
    };
   
    $scope.algoritmosProcessos = [
        {nome: 'FIFO', descricao: 'First-In First-Out (FIFO)'},
        {nome: 'SJF', descricao: 'Shortest Job First (SJF)'},
        {nome: 'Prioridade', descricao: 'Prioridade'},
        {nome: 'Round-Robin', descricao: 'Round Robin'}
    ];

    $scope.limparDados = function() {
        $scope.HashExercicios = [];
        $scope.algoritmoListadeExerciciosAtual = [];
        $scope.novoArray = true;
    };

    $scope.visualizarAtividade = function($indice) {
        $scope.trocarExercicio($indice);
        $scope.exercicioAtual = $indice.exercicio; //apresenta o nome do exercício no MODAL
    };

    $scope.responderNaVisualizacaoModal = function(){ 
        $scope.finalizarEscolha();
    };

    $scope.responderExercicio = function($indice) {
        $scope.trocarExercicio($indice);
        $scope.finalizarEscolha();
    };

    $scope.procurarAlgoritmoAtual = function($nomeAlgoritmo) {
        var listaAlgoritmos = $scope.algoritmosProcessos;
        var algoritmoAtual = [];
        for(var i = 0; i < listaAlgoritmos.length; i++){
            if(listaAlgoritmos[i].nome == $nomeAlgoritmo){              
                algoritmoAtual = listaAlgoritmos[i];
            }
        }
          return algoritmoAtual;
    };

    $scope.trocarAlgoritmoExercicios = function($nomeAlgoritmo){
        var tempoInicial = performance.now();
        $scope.limparDados();
        var algoritmoEscalonamentoSession = [];
        if(!$scope.novaConexaoPagina) {
            $scope.algoritmoAtual = $scope.procurarAlgoritmoAtual($nomeAlgoritmo);
            if($nomeAlgoritmo == "FIFO") {
                algoritmoEscalonamentoSession = $scope.processosBancoFIFO;
            } else if($nomeAlgoritmo == "SJF") {
                algoritmoEscalonamentoSession = $scope.processosBancoSJF;
            } else if($nomeAlgoritmo == "Prioridade") {
                algoritmoEscalonamentoSession = $scope.processosBancoPrioridade;
            } else if($nomeAlgoritmo == "Round-Robin") {
                algoritmoEscalonamentoSession = $scope.processosBancoRoundRobin;
            }
        }
        $scope.algoritmoListadeExerciciosAtual = algoritmoEscalonamentoSession;
        $scope.IndiceExercicios(algoritmoEscalonamentoSession);
        var tempoFinal = performance.now() - tempoInicial;
        console.log("Tempo Final:");
        console.log(tempoFinal);
    };

    $scope.novaConexao = function(){
        $scope.limparDados();
        var algoritmoEscalonamentoSession = [];    
        $scope.novaConexaoPagina = false;
        algoritmoEscalonamentoSession = $scope.processosBancoFIFO;
        $scope.algoritmoAtual = $scope.algoritmosProcessos[0];        
        $scope.algoritmoListadeExerciciosAtual = algoritmoEscalonamentoSession;
        $scope.IndiceExercicios(algoritmoEscalonamentoSession);
    };

    $scope.finalizarEscolha = function() {
        if($scope.algoritmoAtual.nome == 'Round-Robin') {
            if($scope.quantumView == null) {
                $scope.quantumView = 5;
            }
            console.log($scope.quantumView);
            $scope.algoritmoAtual['quantum'] = $scope.quantumView;
            var arrayString = JSON.stringify($scope.algoritmoAtual);
            sessionStorage.setItem("avaliarAlgoritmo", arrayString);
        } else {            
            var arrayString = JSON.stringify($scope.algoritmoAtual);
            sessionStorage.setItem("avaliarAlgoritmo", arrayString);
        }

        var arrayString = JSON.stringify($scope.ExercicioSistema);
        sessionStorage.setItem("processosIniciais", arrayString);
    };
    $scope.updateAlgoritmo(); //sempre que carregar a página
    $scope.novaConexao();
  });