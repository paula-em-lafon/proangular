angular.module("sportsStore")
.constant("dataUrl", "http://localhost:5500/products")
.constant("orderUrl", "http://localhost:5500/orders")
.controller("sportsStoreCtrl", function($scope, $http, $location, 
    dataUrl, orderUrl, cart) {
    $scope.data = {};

    $http.get(dataUrl)
    .then(
        function(data) {
            $scope.data.products = data.data;
        },
        function(error) {
            $scope.data.error = error;
        }
    )

    $scope.sendOrder = function (shippingDetails) {
        var order = angular.copy(shippingDetails);
        order.products = cart.getProducts();
        $http.post(orderUrl, order)
            .then(function(data){
                $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                },
                function (error) {
                    $scope.data.orderError = error; 
                }
            )
            .finally(function () {
                $location.path("/complete");
            });

    }
});