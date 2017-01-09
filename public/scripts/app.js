/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
    .module('tunely', [])
    .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController($http) {
    var vm = this;
    vm.newAlbum = {};
    vm.newAlbum = {
        name: 'Viva Hate',
        artistName: 'Morrissey'
    };
    vm.deleteAlbum = function(album) {
        $http({
            method: 'DELETE',
            url: '/api/albums/' + album._id
        }).then(function successCallback(json) {
            var index = vm.albums.indexOf(album);
            console.log("index is: " + index);
            vm.albums.splice(index, 1)
        }, function errorCallback(response) {
            console.log('There was an error deleting the data', response);
        });
    }
    vm.editAlbum = function(album){
      console.log('edit album online', album);
      $http({
        method: 'PUT',
        url: '/api/albums/' + album._id,
        data: album
      }).then(function successDelete(deletedAlbum){
        var index = vm.albums.indexOf(album);
        vm.albums.splice(index, 1, deletedAlbum.data);
      }, function errorCallback(err){
        console.log('err')
      });
    }
    $http({
        method: 'GET',
        url: '/api/albums'
    }).then(function successCallback(response) {
        vm.albums = response.data;
    }, function errorCallback(response) {
        console.log('There was an error getting the data', response);
    });

    vm.createAlbum = function() {
        $http({
            method: 'POST',
            url: '/api/albums',
            data: vm.newAlbum,
        }).then(function successCallback(response) {
            vm.albums.push(response.data);
        }, function errorCallback(response) {
            console.log('There was an error posting the data', response);
        });
    }
}
