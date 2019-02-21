'use strict';

angular.module('projetotcc', ['ngRoute', 'ModuloEscalonamento', 'ModuloAvaliacao'])

.controller('HomeController', function($rootScope, $scope, $location){
  $scope.home = "Bem vindo ao Simulador de Algoritmos de Escalonamento de Processos";
})

      .config(function($routeProvider){
      $routeProvider
        .when('/dashboard', {
          templateUrl: 'escalonamentos/index.html',
          controller: 'IndexController'
        })
        .when('/criar-exercicios', {
          templateUrl: 'escalonamentos/criar_exercicios.html',
          controller: 'CriarExerciciosController'
        })
        .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'LoginController'
        })
        .when('/formulario', {
          templateUrl: 'login/formulario.html',
          controller: 'LoginController'
        })
        .when('/perfil', {
          templateUrl: 'usuario/perfil.html',
          controller: 'LoginController'
        })
        .when('/exercicios-cadastrados', {
          templateUrl: 'escalonamentos/exercicios_prontos.html',
          controller: 'ExerciciosCadastradosController'
        })
        .when('/analise-exercicios', {
          templateUrl: 'avaliacao/analise_exercicios.html',
          controller: 'AnalisarExercicioController'
        })
        .when('/resolucao', {
          templateUrl: 'avaliacao/resolucao.html',
          controller: 'ResolucaoController'
        })
        .when('/sobre', {
          templateUrl: 'escalonamentos/sobre.html',
          controller: 'IndexController'
        })
        .otherwise({
          redirectTo: '/dashboard'
        });
    });
