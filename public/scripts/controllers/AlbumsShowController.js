angular.module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

  AlbumsShowController.$inject = ['$routeParams', '$http'];
  function AlbumsShowController($routeParams, $http){
    var vm = this;
    vm.album;
    console.log($routeParams);
    $http({
      method: 'GET',
      url: '/api/albums/' + $routeParams.id // how can we get the id? (hint: check console log from above)
    }).then(function successCallback(json) {
      vm.album = json.data;
      console.log(vm.album);
    });
  }
