(function() {
  angular.module("project").service("Projects", [
    "projectListValue",
    function(projectListValue) {
      var self = this;
      this.fetch = function() {
        return projectListValue;
      };
    }
  ]);
})();
