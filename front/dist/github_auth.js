// Generated by CoffeeScript 1.9.1
(function() {
  var AUTH_URL, GithubLoginButtonDirective, githubAuthInfo, module;

  this.taigaContribPlugins = this.taigaContribPlugins || [];

  githubAuthInfo = {
    slug: "github-auth",
    name: "Github Auth",
    type: "auth",
    module: "taigaContrib.githubAuth",
    template: "contrib/github_auth"
  };

  this.taigaContribPlugins.push(githubAuthInfo);

  module = angular.module('taigaContrib.githubAuth', []);

  AUTH_URL = "https://github.com/login/oauth/authorize";

  GithubLoginButtonDirective = function($window, $params, $location, $config, $events, $confirm, $auth, $navUrls, $loader) {
    var link;
    link = function($scope, $el, $attrs) {
      var clientId, loginOnError, loginOnSuccess, loginWithGitHubAccount;
      clientId = $config.get("gitHubClientId", null);
      loginOnSuccess = function(response) {
        var nextUrl;
        if ($params.next && $params.next !== $navUrls.resolve("login")) {
          nextUrl = $params.next;
        } else {
          nextUrl = $navUrls.resolve("home");
        }
        $events.setupConnection();
        $location.search("next", null);
        $location.search("token", null);
        $location.search("state", null);
        $location.search("code", null);
        return $location.path(nextUrl);
      };
      loginOnError = function(response) {
        $location.search("state", null);
        $location.search("code", null);
        $loader.pageLoaded();
        if (response.data.error_message) {
          return $confirm.notify("light-error", response.data.error_message);
        } else {
          return $confirm.notify("light-error", "Our Oompa Loompas have not been able to get you credentials from GitHub.");
        }
      };
      loginWithGitHubAccount = function() {
        var code, data, token, type;
        type = $params.state;
        code = $params.code;
        token = $params.token;
        if (!(type === "github" && code)) {
          return;
        }
        $loader.start();
        data = {
          code: code,
          token: token
        };
        return $auth.login(data, type).then(loginOnSuccess, loginOnError);
      };
      loginWithGitHubAccount();
      $el.on("click", ".button-auth", function(event) {
        var redirectToUri, url;
        redirectToUri = $location.absUrl();
        url = AUTH_URL + "?client_id=" + clientId + "&redirect_uri=" + redirectToUri + "&state=github&scope=user:email";
        return $window.location.href = url;
      });
      return $scope.$on("$destroy", function() {
        return $el.off();
      });
    };
    return {
      link: link,
      restrict: "EA",
      template: ""
    };
  };

  module.directive("tgGithubLoginButton", ["$window", '$routeParams', "$tgLocation", "$tgConfig", "$tgEvents", "$tgConfirm", "$tgAuth", "$tgNavUrls", "tgLoader", GithubLoginButtonDirective]);

  module.run([
    '$templateCache', function($templateCache) {
      return $templateCache.put('contrib/github_auth', '<div tg-github-login-button="tg-github-login-button"><a href="" title="Enter with your github account" class="button button-auth"><img src="/images/contrib/github-logo.png"/><span>Login with Github</span></a></div>');
    }
  ]);

}).call(this);