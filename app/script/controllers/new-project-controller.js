(function() {
  angular
    .module("project")
    .controller("NewProjectController", function($location, projects) {
      var editProject = this;
      editProject.projects = projects;
      editProject.save = function() {
        editProject.project.id = Math.round(Math.random() * 1000);
        editProject.projects.push(editProject.project);
        $location.path("/");
      };
    });
})();
