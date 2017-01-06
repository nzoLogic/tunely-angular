/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
    .module('tunely', [])
    .controller('AlbumsIndexController', AlbumsIndexController);
// ^ the first argument is a string naming the controller,
// the second argument is a function that defines the capacities
// of the controller.
AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController($http) {
    var vm = this;
    vm.newAlbum = {};
    vm.newAlbum = {
      artistName: vm.artistName,
      name: vm.name,
      releaseDate: vm.releaseDate,
      genres: [ vm.genre ]
    };
    vm.albums = [];
    $http({
        method: 'GET',
        url: '/api/albums'
    }).then(successAlbums, handleError);

    vm.createAlbum = function(){
      console.log(vm.newAlbum);
      $http({
              method: 'POST',
              url: '/api/albums',
              data: vm.newAlbum
          })
      .then(successPost, handleError);
    }
    function successPost(res){
      console.log(res);
      vm.albums.push(res.data)
    }

    function successAlbums(res) {
      console.log(res)
        vm.albums = res.data;
    }

    function handleError(err) {
        console.log('errr');
    }

}
