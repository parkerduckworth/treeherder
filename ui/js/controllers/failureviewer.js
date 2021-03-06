failureViewerApp.controller('FailureViewerCtrl', [
    '$q', '$location', '$rootScope', '$scope', '$window',
    'thUrl', 'thNotify', 'ThClassifiedFailuresModel',
    function FailureViewer(
        $q, $location, $rootScope, $scope, $window,
        thUrl, thNotify, ThClassifiedFailuresModel) {

        $rootScope.urlBasePath = $location.absUrl().split('failureviewer')[0];

        var query_string = $location.search();

        if (query_string.classified_failure_id) {
            $scope.classifiedFailureId = query_string.classified_failure_id;
        } else {
            thNotify.send("No classified_failure_id specified", "danger", { sticky: true });
        }
        $scope.init = function () {
            if ($scope.classifiedFailureId) {
                $scope.isLoading = true;

                var loadClassification = ThClassifiedFailuresModel.get(
                    $scope.classifiedFailureId)
                        .then(function (cf) {
                            $scope.classification = cf;
                        });

                var loadMatches = ThClassifiedFailuresModel.get_matches(
                    $scope.classifiedFailureId)
                        .then(function (data) {
                            $scope.cfList = data.data.results;
                        });

                $q.all([loadClassification, loadMatches])
                    .finally(function () {
                        $scope.isLoading = false;
                    });
            }
        };

        // if someone changes the id on the url, reload the page to get the
        // new data.
        $rootScope.$on('$locationChangeSuccess', function () {
            if ($scope.classifiedFailureId !== $location.search().classified_failure_id) {
                $window.location.reload();
            }
        });

        $scope.getBugUrl = thUrl.getBugUrl;
    }
]);
