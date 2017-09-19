(function() {
    'use strict';
    angular
        .module('d3js', [])
        .factory('d3Service', [
            '$document', '$q', '$rootScope',
            function ($document, $q, $rootScope) {
                var deferred = $q.defer();
                function onScriptLoad() {
                    // Load client in the browser
                    $rootScope.$apply(function() { deferred.resolve(window.d3); });
                }
                // Create a script tag with d3 as the source
                // and call our onScriptLoad callback when it
                // has been loaded
                var scriptTag = $document[0].createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.async = true;
                var online = false;
                if (online) {
                    scriptTag.src = '//d3js.org/d3.v3.min.js';
                } else {
                    scriptTag.src = 'bower_components/d3/d3.min.js';
                }
                scriptTag.onreadystatechange = function () {
                    if (this.readyState === 'complete') {
                        onScriptLoad();
                    }
                };
                scriptTag.onload = onScriptLoad;

                var s = $document[0].getElementsByTagName('body')[0];
                s.appendChild(scriptTag);

                return {
                    load: function() { return deferred.promise; }
                };
            }
        ]);
})();
