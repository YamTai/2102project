'use strict';
 
angular.module('core').controller('HomeController', ['$scope', 'Authentication',
'usersService', '$mdSidenav', '$mdBottomSheet', '$log',
    function($scope, Authentication, usersService, $mdSidenav, $mdBottomSheet, $log) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        
 
        /**
         * Main Controller for the Angular Material Starter App
         * @param $scope
         * @param $mdSidenav
         * @param avatarsService
         * @constructor
         */ 
 
        // Load all registered users
 
        usersService
            .loadAll()
            .then( function( users ) {
                self.users    = [].concat(users);
                self.selected = users[0];
            });
 
        // *********************************
        // Internal methods
        // *********************************
 
        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
 
        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser ( user ) {
            self.selected = angular.isNumber(user) ? $scope.users[user] : user;
            self.toggleList();
        }

        /**
         * Show the bottom sheet
         */
        function share($event) {
            var user = self.selected;
 
            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function UserSheetController( $mdBottomSheet ) {
                this.user = user;
                this.items = [
                    { name: 'Phone'       , icon: 'phone'       },
                    { name: 'Twitter'     , icon: 'twitter'     },
                    { name: 'Google+'     , icon: 'google_plus' },
                    { name: 'Hangout'     , icon: 'hangouts'    }
                ];
                this.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
 
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'modules/core/views/contactsheet.client.view.html',
                controller: [ '$mdBottomSheet', UserSheetController],
                controllerAs: 'vm',
                bindToController : true,
                targetEvent: $event
            }).then(function(clickedItem) {
                $log.debug( clickedItem.name + ' clicked!');
            });
 
 
        }


        /*map*/


        
 
        var self = this;
 
        self.selected     = null;
        self.users        = [ ];
        self.selectUser   = selectUser;
        self.toggleList   = toggleUsersList;
        self.share        = share;
<<<<<<< HEAD
        self.pages = [
=======
        self.menuItems = [
>>>>>>> YamTai/master
                        {name: 'Home', url: 'home.html'},
                        {name: 'Book', url: 'book.html'},
                        {name: 'Overview', url: 'overview.html'},
                        {name: 'Booking history', url: 'booking_history.html'},
<<<<<<< HEAD
                        {name: 'Shop', url: 'shop.html'},
                        {name: 'Cart', url: 'cart.html'},
                        {name: 'logout', url: 'logout.html'}
                    ];
        self.currentPage = self.pages[0];
=======
                        {name: 'Shop', url: '#!/shoppings'},
                        {name: 'Cart', url: 'cart.html'},
                        {name: 'logout', url: 'logout.html'}
                    ];
        self.pages = [
                        {name: '', url: '#.html'}
                    ];
        self.currentPage = self.menuItems[0];
>>>>>>> YamTai/master
 
    }
]);