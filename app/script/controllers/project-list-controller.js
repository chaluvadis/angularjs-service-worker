(function() {
  angular
    .module("project")
    .controller("ProjectListController", function(projects) {
      var projectList = this;
      projectList.projects = projects;
    });
})();
