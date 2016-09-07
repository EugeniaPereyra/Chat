angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
  $scope.persona={};
  $scope.persona.nombre;

  $scope.Guardar=function(persona){
    var dato=JSON.stringify(persona);
    $state.go("tab.chats", { nombre:dato});
  }
})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $stateParams) {

  $scope.misMensajes=[];
  var variableFirebase = new Firebase('https://chat1-24820.firebaseio.com/');

  variableFirebase.on('child_added', function (snapshot) {

    $timeout(function(){
    var message = snapshot.val();
    var fecha = new Date(message.fechaDeIngreso);
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    message.fechaDeIngreso=hora+":"+minutos;
    $scope.misMensajes.push(message);
    console.log($scope.misMensajes);
    });

  });


  $scope.chats = Chats.all();
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  var nombre=JSON.parse($stateParams.nombre);
  $scope.persona={};
  $scope.persona.nombre=nombre.nombre;

  $scope.Enviar = function(persona) {
      var name = persona.nombre;
      var text = persona.mensaje;
      var fecha = Firebase.ServerValue.TIMESTAMP;
      variableFirebase.push({usuario:name, mensaje:text, fechaDeIngreso:fecha});
      persona.mensaje="";
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
