angular.module("templates").run(["$templateCache",function($templateCache){$templateCache.put("/plugins/openid-auth/openid-auth.html",'\n<div tg-github-login-button="tg-github-login-button"><a href="" title="Enter with your github account" class="button button-auth"><img src="/plugins/github-auth/images/openid.png" alt="" width="19px" height="16px"/><span>Sign in with {{openid_name}}</span></a></div>')}]),function(){var GithubLoginButtonDirective,module;GithubLoginButtonDirective=function($window,$params,$location,$config,$events,$confirm,$auth,$navUrls,$loader){var link;return link=function($scope,$el,$attrs){var AUTH_URL,loginOnError,loginOnSuccess,loginWithOpenIDAccount,redirectURL;return AUTH_URL=$config.get("openidAuth",null),$scope.openid_name=$config.get("openidName","openid-connect"),loginOnSuccess=function(response){var nextUrl;return nextUrl=$params.next&&$params.next!==$navUrls.resolve("login")?$params.next:$navUrls.resolve("home"),$events.setupConnection(),$location.search("next",null),$location.search("token",null),$location.search("state",null),$location.search("code",null),$location.path(nextUrl)},redirectURL=function(){return $location.absUrl().split("?")[0]},loginOnError=function(response){return $location.search("state",null),$location.search("code",null),$loader.pageLoaded(),response.data._error_message?$confirm.notify("light-error",response.data._error_message):$confirm.notify("light-error","Our Oompa Loompas have not been able to get you credentials from Openid.")},loginWithOpenIDAccount=function(){var code,data,token,type;if(type=$params.state,code=$params.code,token=$params.token,console.log(type,code,$params),code)return $loader.start(!0),data={code:code,url:redirectURL()},$auth.login(data,"openid").then(loginOnSuccess,loginOnError)},loginWithOpenIDAccount(),$el.on("click",".button-auth",function(event){var redirectToUri,url;return console.log(redirectURL()),redirectToUri=redirectURL(),url=AUTH_URL+"?redirect_uri="+redirectToUri+"&client_id=taiga&response_type=code",window.location.href=url}),$scope.$on("$destroy",function(){return $el.off()})},{link:link,restrict:"EA",template:""}},module=angular.module("taigaContrib.openidAuth",[]),module.directive("tgGithubLoginButton",["$window","$routeParams","$tgLocation","$tgConfig","$tgEvents","$tgConfirm","$tgAuth","$tgNavUrls","tgLoader",GithubLoginButtonDirective])}.call(this);