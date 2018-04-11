angular
  .module("project", ["ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    var resolveProjects = {
      projects: function (Projects) {
        return Projects.fetch();
      }
    };
    $locationProvider.html5Mode(true)
    $routeProvider
      .when("/", {
        controller: "ProjectListController as projectList",
        templateUrl: "./app/views/list.html",
        resolve: resolveProjects
      })
      .when("/edit/:projectId", {
        controller: "EditProjectController as editProject",
        templateUrl: "./app/views/detail.html",
        resolve: resolveProjects
      })
      .when("/new", {
        controller: "NewProjectController as editProject",
        templateUrl: "./app/views/detail.html",
        resolve: resolveProjects
      })
      .otherwise({
        redirectTo: "/"
      });
  });