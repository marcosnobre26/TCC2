'use strict'

angular.module('ModuloAvaliacao', [])
  .controller('AnalisarExercicioController', function($rootScope,$scope,$http){
    $rootScope.pageTitle = 'Análise dos Exercícios - Ambiente Web';
    $scope.message = "Processo de Análise do Algoritmo";

    $scope.setandoProcessos = function($arrayInicial)
    {
        for(var i = 0; i < $arrayInicial.length; i++) {
            $scope.dataProcessosUser.push({id: i + 1, nomeProcesso: $arrayInicial[i].processoSistema,
            tempoEspera: 0, tempoTotal: 0})
        }
    };
    
    var dados = sessionStorage.getItem("processosIniciais"); //setando os valores iniciais da tabela fornecidas pelo usuário
    var json = JSON.parse(dados);

    var nomeAlgoritmo = sessionStorage.getItem("avaliarAlgoritmo");
    var nmAlgoritmo = JSON.parse(nomeAlgoritmo);
    $scope.algoritmoSelecionado = nmAlgoritmo;

    $scope.processosSistema = [];
    $scope.dataProcessosUser = [];
    $scope.processosSistema = json; //adicionando no array dos valores iniciais

    $scope.setandoProcessos($scope.processosSistema);

    $scope.dadosUsuarios = angular.copy($scope.dataProcessosUser);
    $scope.enabledEdit = [];
    
    $scope.converterProcessosUsuario = function($arrayUsuario) {
      var arraySub = [];
      for(var i=0; i<$arrayUsuario.length; i++) {
        var tempTotal = parseInt($arrayUsuario[i].tempoTotal);
        var tempEspera = parseInt($arrayUsuario[i].tempoEspera);
        arraySub.push({nomeProcesso: $arrayUsuario[i].nomeProcesso, 
          tempoTotal: tempTotal, tempoEspera: tempEspera});
      }
      return arraySub;
  };

  $scope.finalizarAnalise = function() {
      $scope.dadosUsuarios = $scope.converterProcessosUsuario($scope.dadosUsuarios);
      var arrayString = JSON.stringify($scope.dadosUsuarios);
      sessionStorage.setItem("respostasUsuarios", arrayString);
  };
  })
  .controller('ResolucaoController', function($rootScope,$scope,$http){
    $rootScope.pageTitle = 'Resolução - Ambiente Web';
    $scope.message = "Resolução de Exercício";

    $scope.avaliarAlgoritmoFinal = function ($algoritmo, $algoritmoSelect) {
        if($algoritmoSelect.nome == 'FIFO')
        {
            var avaliadoFIFO = [];
            avaliadoFIFO = $scope.avaliarFIFO($algoritmo);            
            return avaliadoFIFO;
        } else if($algoritmoSelect.nome == 'SJF') {            
            var avaliado = $scope.algoritmoSJF($algoritmo);
            return avaliado;
        } else if($algoritmoSelect.nome == 'Prioridade') {
            var avaliado = $scope.algoritmoPrioridades($algoritmo);
            //$scope.ajustarPrioridadeNaoPreemtivo($algoritmo);
            return avaliado;
        } else if($algoritmoSelect.nome == "Round-Robin"); {
            var quantum = $algoritmoSelect.quantum;
            var avaliado = [];
            avaliado = $scope.ajustarRoundRobin($algoritmo, quantum);
            return avaliado;
        }
    };

    $scope.avaliarFIFO = function($algoritmoFIFO) {
        var algoritmoAvaliado = [];
        var linhaTempo = 0;
        var tempoOcioso = 0;
            for(var i=0; i < $algoritmoFIFO.length; i++) {
                if(i != 0) {
                    tempoOcioso = $algoritmoFIFO[i].momentoTransicaoResolucao - linhaTempo;
                }      
                linhaTempo += $algoritmoFIFO[i].proximoCicloResolucao;                      
                var momentoInicial = 0;
                var momentoFinal = 0;
                var tempoTotal = 0;
                var tempoEspera = 0;            
                momentoInicial = $algoritmoFIFO[i].momentoTransicaoResolucao;
                momentoFinal = linhaTempo;
                if(tempoOcioso > 0) {
                    momentoFinal += tempoOcioso;
                    linhaTempo += tempoOcioso;
                }
                tempoTotal = momentoFinal - momentoInicial;
                tempoEspera = tempoTotal - $algoritmoFIFO[i].proximoCicloResolucao;
                algoritmoAvaliado.push({Processo : $algoritmoFIFO[i].processoResolucao, TempoEspera : tempoEspera, TempoTotal : tempoTotal});
            }
        return algoritmoAvaliado;
    };   

    $scope.ordenarSJF = function($filaAptos, $posicao) {
        var processoAtual = $posicao + 1;
        for(var i = processoAtual; i < $filaAptos.length; i++) {
            for(var j = processoAtual; j <= $filaAptos.length-2; j++) {
                if($filaAptos[j].proximoCicloSJF > $filaAptos[j+1].proximoCicloSJF) {
                    var valorTemporario = $filaAptos[j];
                    $filaAptos[j] = $filaAptos[j+1];
                    $filaAptos[j+1] = valorTemporario;
                }
            }
        }
    };

    $scope.calcularSJF = function($listaAlterada, $algoritmoInicialSJF) {
        var avaliadoSJF = [];
        for(var i = 0; i < $algoritmoInicialSJF.length; i++) {
            for(var j = 0; j < $listaAlterada.length; j++) {
                if($algoritmoInicialSJF[i].processoResolucao == $listaAlterada[j].nmProc) {
                    var temTotal = $listaAlterada[j].MFproc - $algoritmoInicialSJF[i].momentoTransicaoResolucao;
                    var temEspera = temTotal - $algoritmoInicialSJF[i].proximoCicloResolucao;
                    avaliadoSJF.push({Processo : $algoritmoInicialSJF[i].processoResolucao, TempoEspera : temEspera, TempoTotal : temTotal});
                    break;
                }
            }
        }
        return avaliadoSJF;
    };

    $scope.algoritmoSJF = function($algoritmoSJF) {
        var linhadoTempo = 0;
        var filaAptos = [];
        var processosEmEspera = [];
        var avaliarAlgoritmo = [];
        var algoritmoFinalizado = [];
        var encontrarNovoProcesso = true;
        var encerrarAlgoritmo = false;
        for(var i = 0; i < $algoritmoSJF.length; i++) {
            linhadoTempo += $algoritmoSJF[i].proximoCicloResolucao;
            linhadoTempo += $algoritmoSJF[i].momentoTransicaoResolucao;
            processosEmEspera.push(
                {processoSJF: $algoritmoSJF[i].processoResolucao, proximoCicloSJF: $algoritmoSJF[i].proximoCicloResolucao,
                    momentoTransicaoSJF: $algoritmoSJF[i].momentoTransicaoResolucao}
            );
        }
        filaAptos.push(processosEmEspera[0]);
        for(var linha = 1; linha <= linhadoTempo; linha++) {
            for(var i = 0; i < filaAptos.length; i++) {
                if(filaAptos[i].proximoCicloSJF > 0) {
                    filaAptos[i].proximoCicloSJF = filaAptos[i].proximoCicloSJF - 1;
                        if(filaAptos[i].proximoCicloSJF == 0) {
                            avaliarAlgoritmo.push(
                                {nmProc: filaAptos[i].processoSJF, MIproc: filaAptos[i].momentoTransicaoSJF,
                                    MFproc: linha}
                            );
                            if(i == processosEmEspera.length - 1) {
                                encerrarAlgoritmo = true;
                                break;
                            }
                        }
                            for(var j = 1; j < processosEmEspera.length; j++) {
                                if(processosEmEspera[j].momentoTransicaoSJF == linha) {
                                    filaAptos.push(processosEmEspera[j]);
                                    $scope.ordenarSJF(filaAptos, i);
                                    break;
                                }
                            }
                    encontrarNovoProcesso = false;
                    break;
                }
            }
            if(encerrarAlgoritmo) {
                break;
            }
            if(encontrarNovoProcesso) {
                for(var j = 1; j < processosEmEspera.length; j++) {
                    if(processosEmEspera[j].momentoTransicaoSJF == linha) {
                        filaAptos.push(processosEmEspera[i]);
                        break;
                    }
                }
            } else {
                encontrarNovoProcesso = true;
            }            
        }
      algoritmoFinalizado = $scope.calcularSJF(avaliarAlgoritmo, $algoritmoSJF);
      return algoritmoFinalizado;
    };
    
    $scope.ordenarPrioridade = function($algoritmoPri) { //algoritmo de prioridade
        var filaAptos = [];
        var filaAptos = $algoritmoPri;
        var valorAutal;
              
        for(var j=0; j<filaAptos.length; j++) {
            for(var i=0; i <= filaAptos.length - 2; i++) {               
                if(filaAptos[i].prioridadeResolucao > filaAptos[i + 1].prioridadeResolucao)
                    {                     
                        valorAutal = filaAptos[i];
                        filaAptos[i] = filaAptos[i + 1];
                        filaAptos[i + 1] = valorAutal;
                               
                    }  
                    else
                    {
                        valorAutal = filaAptos[i];
                        filaAptos[i] = valorAutal;                                         
                    }                
            }
        }      
    };

    $scope.organizarPrioridade = function($algoritmoPrioridade, $algoritmoSistema) {
        var avaliadoPrioridade = [];
        for(var i=0; i<$algoritmoSistema.length; i++) {
            for(var j=0; j<$algoritmoPrioridade.length; j++) {
                if($algoritmoSistema[i].processoResolucao == $algoritmoPrioridade[j].nmProc) {                   
                    var temTotal = 0;
                    var temEspera = 0;
                    temTotal = $algoritmoPrioridade[j].MFproc - $algoritmoSistema[i].momentoTransicaoResolucao;
                    temEspera = temTotal - $algoritmoSistema[i].proximoCicloResolucao;
                    avaliadoPrioridade.push({Processo : $algoritmoSistema[i].processoResolucao, TempoEspera : temEspera, TempoTotal : temTotal});
                }
            }
        }
    avaliadoPrioridade.sort($scope.ordenarABC);
    return avaliadoPrioridade;
    };

    $scope.algoritmoPrioridades = function($processoPrioridade) { //algoritmo de prioridade
        var arrayProcess = [];
        var filaAptos = [];        
        var linhadoTempoTotal = 0;
        var arrayPrioridade = [];
        var prioridadeAvaliado = [];
        for(var i=0; i<$processoPrioridade.length; i++)
        {
            arrayProcess.push({processoResolucao: $processoPrioridade[i].processoResolucao, 
                proximoCicloResolucao: $processoPrioridade[i].proximoCicloResolucao, 
                momentoTransicaoResolucao: $processoPrioridade[i].momentoTransicaoResolucao, 
                prioridadeResolucao: $processoPrioridade[i].prioridadeResolucao});
        } 
      
        for(var i=0; i<arrayProcess.length; i++) {
            linhadoTempoTotal += arrayProcess[i].proximoCicloResolucao;
            linhadoTempoTotal += arrayProcess[i].momentoTransicaoResolucao;
        }
        console.log("arrayProcess");
        console.log(arrayProcess);

        var contadorParada = false;
        var processsoAdicionado = false;
        var tamanhoArray = $processoPrioridade.length;
        var contadorTempoOcioso = 0;
        var ultimoProcesso = false;
        var tempoOcioso = 0;
        var PCAtualMaiorZero = false;
        var processoAtualZero = false;
        var validoQuanto = "Nao";

    filaAptos.push(arrayProcess[0]);
        for(var linha=1; linha<linhadoTempoTotal+1; linha++) { //linha do tempo: o i significa o tempo em um em um (1 em 1):: para valor final da linha, coloca mais um (+1)
            //console.log("Linha do Tempo Real:" + " " + linha);
            for(var j=0; j <= filaAptos.length; j++) {
                if(j < tamanhoArray) {
                    processoAtualZero = false;
                    //console.log(j);
                    //console.log(filaAptos[j].processoResolucao);
                    if(filaAptos[j].proximoCicloResolucao > 0) {
                        PCAtualMaiorZero = true;
                        //console.log("tirando");
                        filaAptos[j].proximoCicloResolucao = filaAptos[j].proximoCicloResolucao - 1;
                        //console.log("PC:" + " " + filaAptos[j].proximoCicloResolucao);
                        if(filaAptos[j].proximoCicloResolucao == 0) {
                            //console.log("removendo:" + " " + filaAptos[j].processoResolucao);
                            var tempoFinalReal = linha;
                            console.log("tempo real:" + " " + tempoFinalReal);
                            arrayPrioridade.push({nmProc: filaAptos[j].processoResolucao, MIproc: filaAptos[j].momentoTransicaoResolucao,
                                MFproc: tempoFinalReal});
                         }
                    } else {
                        //console.log("processo atual é zero");
                        PCAtualMaiorZero = false;                       
                        if(j == filaAptos.length - 1) {
                            //console.log("unico processo no momento");
                            ultimoProcesso = true;
                            var contultimoProcesso = j;
                            contultimoProcesso++;
                                if(contultimoProcesso == tamanhoArray) {
                                   // console.log("bora");
                                    contadorParada = true;
                                    break;
                                }
                        } else { //console.log(filaAptos.length); 
                        }
                        processoAtualZero = true;
                    }
                    if((PCAtualMaiorZero) || (ultimoProcesso)) {
                        //console.log("entrou for 1");
                        ultimoProcesso = false;
                        PCAtualMaiorZero = false;
                        for(var k = 0; k<arrayProcess.length; k++) {
                            if(arrayProcess[k].momentoTransicaoResolucao == linha) {
                                //console.log("novo processo");
                                filaAptos.push(arrayProcess[k]);
                                processsoAdicionado = true;
                                $scope.ordenarPrioridade(filaAptos);
                                contadorTempoOcioso = 0;
                                break;
                            } else {
                                contadorTempoOcioso++;
                            }
                        }
                        if(!processoAtualZero) {
                            //console.log("finaliza no processo atual");
                            contadorTempoOcioso = 0;
                            break;
                        }
                        if(processsoAdicionado) {
                            //console.log("if de novo");
                            processsoAdicionado = false;
                            contadorTempoOcioso = 0;
                            break;
                        }
                        if((contadorTempoOcioso == arrayProcess.length) && (processoAtualZero)) {
                            //console.log("não encontrou nada");                         
                            contadorTempoOcioso = 0;                            
                                if(j == filaAptos.length - 1) {
                                    validoQuanto = "Sim";
                                    //console.log("valida");
                                    break;
                                } else {
                                    //console.log("não entrou em validar tempo ocioso");
                                }                                                 
                        }
                    } else { //console.log("passando direto"); 
                }
                }
       }
       if(validoQuanto == "Sim") {
            validoQuanto = "Nao";
            tempoOcioso++;
            //console.log("tempo ocioso:" + " " + tempoOcioso);
       }     
       if(contadorParada) {
        console.log("terminar");
            break;
        }
    }
    console.log(arrayPrioridade);
    prioridadeAvaliado = $scope.organizarPrioridade(arrayPrioridade, $processoPrioridade);
    return prioridadeAvaliado;
    };


    $scope.organizarRoundRobin = function($algoritmoRoundRobin, $algoritmoSistema) {
        var avaliadoRoundRobin = [];
        for(var i=0; i<$algoritmoSistema.length; i++) {
            for(var j=0; j<$algoritmoRoundRobin.length; j++) {
                if($algoritmoSistema[i].processoAvaliado == $algoritmoRoundRobin[j].processoResolucao) {                   
                    var temTotal = 0;
                    var temEspera = 0;
                    temTotal = $algoritmoSistema[i].momentoFinalRound - $algoritmoRoundRobin[j].momentoTransicaoResolucao;
                    temEspera = temTotal - $algoritmoRoundRobin[j].proximoCicloResolucao;
                    avaliadoRoundRobin.push({Processo : $algoritmoSistema[i].processoAvaliado, TempoEspera : temEspera, TempoTotal : temTotal});
                }
            }
        }
        avaliadoRoundRobin.sort($scope.ordenarABC);
        return avaliadoRoundRobin;
    };

    $scope.ajustarRoundRobin = function($algoritmoRound, $quantum) { 
        var arrayInicialRound = []; //reavaliar
        var algoritmoAvaliado = [];
        var filaAptos = [];
        var algoritmoRobinFinal = [];
        var quantumRound = $quantum;
        var controladorQuantum = 0;
        var contadorMomentoFinal = 0;
        var linhaTempo = 0;
        var valorAutal;
        var contadorParada = 0;
        var pararAlgoritmo = false;              
        for(var i = 0; i < $algoritmoRound.length; i++)
        {
            linhaTempo += $algoritmoRound[i].proximoCicloResolucao;
            linhaTempo += $algoritmoRound[i].momentoTransicaoResolucao;
            arrayInicialRound.push({processoRound: $algoritmoRound[i].processoResolucao,
            proximoCicloRound: $algoritmoRound[i].proximoCicloResolucao,
            momentoTransicaoRound: $algoritmoRound[i].momentoTransicaoResolucao});
        }
        filaAptos.push(arrayInicialRound[0]);
        for(var tempo = 1; tempo < linhaTempo; tempo++) {
            for(var j = 0; j < filaAptos.length; j++) {
                if(filaAptos[j].proximoCicloRound > 0) {
                    if(controladorQuantum < quantumRound) {
                        controladorQuantum++;
                        filaAptos[j].proximoCicloRound = filaAptos[j].proximoCicloRound - 1;
                        if(filaAptos[j].proximoCicloRound == 0) {
                            contadorParada++;
                            algoritmoAvaliado.push({processoAvaliado: filaAptos[j].processoRound,
                            momentoFinalRound: tempo});
                            controladorQuantum = 0;
                            filaAptos.shift();
                            if(contadorParada == arrayInicialRound.length) {
                                pararAlgoritmo = true;
                            } 
                            break;
                        } else {
                            var quantumPrevisto = controladorQuantum;
                            if(quantumPrevisto == quantumRound) {
                                valorAutal = filaAptos[j];                              
                                filaAptos.shift();                         
                                filaAptos.push(valorAutal);
                                controladorQuantum = 0;
                                break;
                            } else { break; }
                        }
                    }
                }
            }
            for(var p = 0; p < arrayInicialRound.length; p++) {
                if(arrayInicialRound[p].momentoTransicaoRound == tempo) {
                    filaAptos.push(arrayInicialRound[p]);
                    break;
                }
            }
            if(pararAlgoritmo) {
                break;
            }            
        }
        algoritmoRobinFinal = $scope.organizarRoundRobin($algoritmoRound, algoritmoAvaliado);
        return algoritmoRobinFinal;
    };

    $scope.ordenarABC = function($a, $b) {
        return $a.Processo > $b.Processo;
    };

    $scope.ordenarOrdem = function($a, $b) {
        return $a.momentoTransicaoSistema > $b.momentoTransicaoSistema;
    };

    $scope.ordenarPrioridadeNaoPreemtivo = function($algoritmoPrioridadeNaoPr) {
        var algoritmoAvaliado = [];
        var linhaTempo = 0;
        var tempoOcioso = 0;
        console.log($algoritmoPrioridadeNaoPr);     
            for(var i=0; i < $algoritmoPrioridadeNaoPr.length; i++) {
                if(i != 0) {
                    tempoOcioso = $algoritmoPrioridadeNaoPr[i].momentoTransicaoResolucao - linhaTempo;
                    console.log(tempoOcioso);
                }      
                linhaTempo += $algoritmoPrioridadeNaoPr[i].proximoCicloResolucao;                      
                var momentoInicial = 0;
                var momentoFinal = 0;
                var tempoTotal = 0;
                var tempoEspera = 0;            
                momentoInicial = $algoritmoPrioridadeNaoPr[i].momentoTransicaoResolucao;
                momentoFinal = linhaTempo;
                if(tempoOcioso > 0) {
                    momentoFinal += tempoOcioso;
                    linhaTempo += tempoOcioso;
                }
                tempoTotal = momentoFinal - momentoInicial;
                tempoEspera = tempoTotal - $algoritmoPrioridadeNaoPr[i].proximoCicloResolucao;
                algoritmoAvaliado.push({Processo : $algoritmoPrioridadeNaoPr[i].processoResolucao, TempoEspera : tempoEspera, TempoTotal : tempoTotal});
            }
        return algoritmoAvaliado;
    };

    $scope.ajustarPrioridadeNaoPreemtivo = function($algoritmoPrioridadeNaoPr) {
        var filaAptos = [];
        var filaAptos = $algoritmoPrioridadeNaoPr;     
        var listaAptosAvaliacao = [];
        var arrayRespostasSJF = [];
        var valorAutal;
        var tempoTemporario = 0;
        listaAptosAvaliacao.push($algoritmoPrioridadeNaoPr[0]);        
        for(var j=1; j < filaAptos.length; j++) {
            for(var i=1; i <= filaAptos.length - 2; i++) {
                if(filaAptos[i].prioridadeResolucao > filaAptos[i + 1].prioridadeResolucao) {                               
                        if(filaAptos[i + 1].momentoTransicaoResolucao <= filaAptos[0].proximoCicloResolucao) {                                                    
                               valorAutal = filaAptos[i];
                               filaAptos[i] = filaAptos[i + 1];
                               filaAptos[i + 1] = valorAutal;                           
                            }
                            else {                          
                                valorAutal = filaAptos[i];
                                filaAptos[i] = valorAutal;                               
                            }                                        
                    }                        
            }
        }
        for(var i=1; i<filaAptos.length; i++)
            {
                listaAptosAvaliacao.push($algoritmoPrioridadeNaoPr[i]);
            }
        //arrayRespostasSJF = $scope.avaliarSJF(listaAptosAvaliacao);
        console.log(listaAptosAvaliacao);
        //arrayRespostasSJF.sort($scope.ordenarABC);
        //return arrayRespostasSJF;
    };

    $scope.converterRespostasUsuarios = function($arrayRespostas) { //converter os valores numéricos das respostas do usuário
        var arrayRespostas = [];
        for(var i=0; i<$arrayRespostas.length;i++){
            var tempoTotal = parseInt($arrayRespostas[i].tempoTotal);
            var tempoEspera = parseInt($arrayRespostas[i].tempoEspera);
            arrayRespostas.push({ProcessoResposta: $arrayRespostas[i].nomeProcesso, TempoEsperaResposta: tempoEspera,
            tempoTotalResposta: tempoTotal});
        }
        return arrayRespostas;
    };
    
    $scope.converterProcessosSistema = function($arraySistema) { //testado
        var arraySub = [];
        for(var i=0; i<$arraySistema.length; i++) {
            var proximoCiclo = parseInt($arraySistema[i].proximoCicloSistema);
            var momentoTransicao = parseInt($arraySistema[i].momentoTransicaoSistema);
            var prioridade = parseInt($arraySistema[i].prioridadeSistema);
            arraySub.push({processoResolucao: $arraySistema[i].processoSistema, 
            proximoCicloResolucao: proximoCiclo, momentoTransicaoResolucao: momentoTransicao, 
            prioridadeResolucao: prioridade});
        }
        return arraySub;
    };

    $scope.resultadoAnalise = function($processosSistema, $processosUsuario) { //testado
        var contadorAcertos = 0;
        var totalValores = 0;
        var totalProcessos = $processosSistema.length;
        var mediaTempTotalSist = 0;
        var mediaTemEsperaSis = 0;
        var mediaTempTotalUser = 0;
        var mediaTemEsperaUser = 0;          
        for(var i=0; i<$processosSistema.length; i++) {
            mediaTempTotalSist = mediaTempTotalSist + $processosSistema[i].TempoTotal;
            mediaTemEsperaSis = mediaTemEsperaSis + $processosSistema[i].TempoEspera;
            for(var j=0; j<$processosUsuario.length; j++) {
                mediaTempTotalUser = mediaTempTotalUser + $processosUsuario[j].tempoTotalResposta;
                mediaTemEsperaUser = mediaTemEsperaUser + $processosUsuario[j].TempoEsperaResposta;
                if($processosSistema[i].Processo == $processosUsuario[j].ProcessoResposta) {
                    if($processosSistema[i].TempoTotal == $processosUsuario[j].tempoTotalResposta){
                        contadorAcertos++;
                    }
                    if($processosSistema[i].TempoEspera == $processosUsuario[j].TempoEsperaResposta){
                        contadorAcertos++;
                    }
                    totalValores += 2;
                }
            }
        }
        $scope.mediaTempoTotalSistema = mediaTempTotalSist/totalProcessos;
        $scope.mediaTempoEsperaSistema = mediaTemEsperaSis/totalProcessos;
        $scope.mediaTempoTotalUsuario = mediaTempTotalUser/totalProcessos;
        $scope.mediaTempoEsperaUsuario = mediaTemEsperaUser/totalProcessos;
        contadorAcertos = (contadorAcertos * 100)/totalValores;
        return contadorAcertos;
    };

    var dadosRespostas = sessionStorage.getItem("respostasUsuarios");  
    var json = JSON.parse(dadosRespostas);  
    $scope.respostasUsuarioFinal = $scope.converterRespostasUsuarios(json);    
        
    var algoritmo = sessionStorage.getItem("processosIniciais");  
    var dtAlgoritmo = JSON.parse(algoritmo);
    $scope.processosSistema = dtAlgoritmo;
    $scope.dadosAlgoritmo = $scope.converterProcessosSistema(dtAlgoritmo);

    var nomeAlgoritmo = sessionStorage.getItem("avaliarAlgoritmo");
    var nmAlgoritmo = JSON.parse(nomeAlgoritmo);
    $scope.algoritmoSelecionado = nmAlgoritmo;

    $scope.respostaSistemaFinal = $scope.avaliarAlgoritmoFinal($scope.dadosAlgoritmo, $scope.algoritmoSelecionado);
    $scope.resultadoPessoal = $scope.resultadoAnalise($scope.respostaSistemaFinal, $scope.respostasUsuarioFinal);
  });