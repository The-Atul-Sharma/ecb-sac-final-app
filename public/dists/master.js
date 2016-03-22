!function(){var app=angular.module("sac",["ui.router","clubInfo","auth0","angular-storage","angular-jwt","edit_event","ngSanitize"]);app.config(function(authProvider){authProvider.init({domain:"rail.auth0.com",clientID:"BR7dnfQB0ExcbUlb9wnL0IXgWUqkPqaF",loginState:"home"})}),app.run(function(auth){auth.hookEvents()}),app.run(function($rootScope,auth,store,jwtHelper,$location){$rootScope.$on("$locationChangeStart",function(){var token=store.get("token");token&&(jwtHelper.isTokenExpired(token)?$location.path("/"):auth.isAuthenticated||auth.authenticate(store.get("profile"),token))})}),app.controller("LoginCtrl",["$scope","$http","auth","store","$location",function($scope,$http,auth,store,$location){$scope.login=function(){auth.signin({},function(profile,token){store.set("profile",profile),store.set("token",token),$location.path("/")},function(){})},$scope.logout=function(){auth.signout(),store.remove("profile"),store.remove("token")},$scope.auth=auth}]),app.controller("UserInfoCtrl",["$scope","auth",function($scope,auth){$scope.auth=auth}]);societies=[{name:"Sci-Tech Society"},{name:"Sports and Games Society"},{name:"Arts &Literary Society"},{name:"Vocational Society"},{name:"Student & Social Welfare"}],app.controller("HeaderCtrl",["$scope",function($scope){}]),app.controller("HomeCtrl",["$scope",function($scope){$scope.societies=societies}]),app.controller("GalleryCtrl",["$scope",function($scope){$scope.pupu=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/office.jpg"]}]),app.controller("EventCtrl",["$scope","$http","$stateParams",function($scope,$http,$stateParams){$http.get("/"+$stateParams.id).success(function(data){$scope.event=data})}]),app.factory("All_clubs",[function(){var o={Society:"Technical Society,ECB",descriptions:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non		proident, sunt in culpa qui officia deserunt mollit anim id es laborum.",clubs:["Robotics","tech club","Electro Parichaya"],img:"t.jpg",inforamtions:"Here is some more information about this product that is only revealed once clicked on.",club_images:"robot.jpg,t.jpg,image.jpg"};return o}]),app.controller("Allclubs",["$scope","All_clubs",function($scope,All_clubs){$scope.firstname=All_clubs.Society,$scope.des=All_clubs.descriptions,$scope.club=All_clubs.clubs,$scope.image=All_clubs.img,$scope.information=All_clubs.inforamtions,$scope.club_imag=All_clubs.club_images}]),app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider,$httpProvider,authProvider){$stateProvider.state("home",{url:"/home",templateUrl:"./templetes/home.html",controller:"HomeCtrl"}).state("gallery",{url:"/gallery",templateUrl:"./templetes/gallery.html",controller:"GalleryCtrl"}).state("club_info",{url:"/{society_id}/{club_id}",templateUrl:"./templetes/club_info.html",controller:"ClubInfoController"}).state("edit_event",{url:"/edit_event",templateUrl:"./templetes/edit-event.html",controller:"editEventCtrl",data:{requiresLogin:!0}}).state("event",{url:"/clubs/event/{id}",templateUrl:"./templetes/event.html",controller:"EventCtrl"}).state("all_club",{url:"/all_club",templateUrl:"./templetes/Allclubs.html",controller:"Allclubs"}),$urlRouterProvider.otherwise("home")}])}();