(function() {
  angular
    .module("project")
    .controller("EditProjectController", function(
      $location,
      $routeParams,
      projects
    ) {
      var editProject = this;
      var projectId = $routeParams.projectId,
        projectIndex;

      editProject.projects = projects;
      // projectIndex = editProject.projects.$indexFor(projectId);
      // editProject.project = editProject.projects[projectIndex];

      angular.forEach(editProject.projects, function(project, index) {
        if (project.id === Number(projectId)) {
          editProject.project = project;
        } else {
          editProject.project = {};
        }
      });

      editProject.destroy = function() {
        editProject.projects.$remove(editProject.project).then(function(data) {
          $location.path("/");
        });
      };

      editProject.save = function() {
        editProject.project.id = Math.round(Math.random() * 1000);
        editProject.projects.push(editProject.project);
        $location.path("/");
      };
    });
})();
