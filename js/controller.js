'use strict'; angular.module('microscope')
    .controller('LedController', ['$scope', '$http', function($scope, $http){
	$scope.stat = {value: 0};	
	$scope.blueval = 100;
	$scope.greenval = 500;
	$scope.focusMode = 'FINE';

	var but1 = document.getElementById('but1');
	var but2 = document.getElementById('but2');
	var but3 = document.getElementById('but3');
	var but4 = document.getElementById('but4');
	var but5 = document.getElementById('but5');
	var text1 = document.getElementById('text1');
	var text2 = document.getElementById('text2');
	var lv = document.getElementById('live-video');
	var sv = document.getElementById('stop-video');
	var startvc = document.getElementById('startvc');
	var stopvc = document.getElementById('stopvc');
	var start_movie = document.getElementById('start_movie');
	var stop_movie = document.getElementById('stop_movie');
	//var movie_start_butt = document.getElementById('movie_start_butt');
	//var movie_stop_butt = document.getElementById('movie_stop_butt');

	$scope.initial = function(){
		but3.disabled = true;
		but5.disabled = true;
		text1.disabled = true;
		text2.disabled = true;
		movie_start_butt.disabled = true;
		movie_text1.disabled = true;
	};

	$scope.initial();

	$scope.captureImage = function(){
		console.log("Image captured");
		$http.post('/api/capture');
	};

	$scope.liveVideo = function(status){
		$scope.stat.status = status;
		$http.post('/api/liveVideo', $scope.stat).then(
		function successCallback(response){
			if(status){
				document.getElementById('live-video').style.display = "none";
				document.getElementById('stop-video').style.display = "";
				document.getElementById('but3').disabled = false;
				document.getElementById('but5').disabled = false;
				document.getElementById('text1').disabled = false;
				document.getElementById('text2').disabled = false;
				movie_start_butt.disabled = false;
				movie_text1.disabled = false;
			}
			else{
				document.getElementById('live-video').style.display = "";
				document.getElementById('stop-video').style.display = "none";
				document.getElementById('but3').disabled = true;
				document.getElementById('but5').disabled = true;
				document.getElementById('text1').disabled = true;
				document.getElementById('text2').disabled = true;
				movie_start_butt.disabled = true;
                                movie_text1.disabled = true1;

			}

		},
		function errorCallback(response){
			if(status){
				document.getElementById('live-video').style.display = "none";
				document.getElementById('stop-video').style.display = "";
			}
			else{
				document.getElementById('live-video').style.display = "";
				document.getElementById('stop-video').style.display = "none";
			}
		});
	};

	$scope.captureVideo = function(status){
		$scope.stat.capStatus = status;
		$scope.stat.interval = $scope.interval;
		$scope.stat.repeat = $scope.repeat;
		$scope.stat.intensity = document.getElementById('slider').value;
		if((typeof($scope.interval) == typeof(2)) && (typeof($scope.repeat) == typeof(2))){
			$http.post('/api/captureVideo', $scope.stat).then(
			function successCallback(response){
				if(status){
					document.getElementById("startvc").style.display = "none";
					document.getElementById("stopvc").style.display = "";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
					document.getElementById('but1').disabled = true;
					document.getElementById('but5').disabled = true;
				}
				else{
					console.log("came in satus false");
					document.getElementById("startvc").style.display = "";
					document.getElementById("stopvc").style.display = "none";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
					document.getElementById('but1').disabled = false;
					document.getElementById('but5').disabled = true;
					document.getElementById('text1').disabled = true;
					document.getElementById('text2').disabled = true;
					document.getElementById('but3').disabled = true;
				}
			},
			function errorCallback(response){
				if(status){
					document.getElementById("startvc").style.display = "none";
					document.getElementById("stopvc").style.display = "";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
				}
				else{
					document.getElementById("startvc").style.display = "";
					document.getElementById("stopvc").style.display = "none";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
				}
			});
		}
		else{
			alert("Enter correct values");
		}
	};

	/* --------------------------------------------------------------------------------------------- */
	// Movie start and stop code

	$scope.movie = function(status){
		$scope.stat.status = status;
		$scope.stat.interval = $scope.movie_minutes;
		if((typeof($scope.movie_minutes) == typeof(2)) && ($scope.movie_minutes >= .1 && $scope.movie_minutes <= 2)){
			$http.post('/api/movie', $scope.stat).then(
			function successCallback(response){
				if(status){
					start_movie.style.display = "none";
					stop_movie.style.display = "";
					// document.getElementById("startvc").style.display = "none";
					// document.getElementById("stopvc").style.display = "";
					// document.getElementById('live-video').style.display = "";
					// document.getElementById('stop-video').style.display = "none";
					// document.getElementById('but1').disabled = true;
					// document.getElementById('but5').disabled = true;
				}
				else{
					start_movie.style.display = "";
					stop_movie.style.display = "none";
					// document.getElementById("startvc").style.display = "";
					// document.getElementById("stopvc").style.display = "none";
					// document.getElementById('live-video').style.display = "";
					// document.getElementById('stop-video').style.display = "none";
					// document.getElementById('but1').disabled = false;
					// document.getElementById('but5').disabled = true;
					// document.getElementById('text1').disabled = true;
					// document.getElementById('text2').disabled = true;
					// document.getElementById('but3').disabled = true;
				}
			},
			function errorCallback(response){
				if(status){
					document.getElementById("startvc").style.display = "none";
					document.getElementById("stopvc").style.display = "";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
				}
				else{
					document.getElementById("startvc").style.display = "";
					document.getElementById("stopvc").style.display = "none";
					document.getElementById('live-video').style.display = "";
					document.getElementById('stop-video').style.display = "none";
				}
			});
		}
		else{
			alert("Enter correct values");
		}
	};

	/* --------------------------------------------------------------------------------------------- */

	$scope.downloadImages = function(){
        var win = window.open("http://192.168.1.4/#/images", 'myTab');  
//		var win = window.open('/api/downloadImages','','width=, height=, resizable=no');
//                win.resizeTo(0,0);
//                win.moveTo(0,window.screen.availHeight+10);
//	};
//
//	$scope.downloadTimeLapse = function(){
//		var win = window.open('/api/downloadTimeLapse','','width=, height=, resizable=no');
//		win.resizeTo(0,0);
//		win.moveTo(0,window.screen.availHeight+10);
	};

	$scope.changeFocus = function(){
		console.log("Getting here");
		if($scope.focusMode == 'FINE'){
			document.getElementById('focus-fine').style.backgroundImage = "none";
			document.getElementById('focus-course').style.display = "";
			$scope.focusMode = 'COURSE'; 
		}
		else if($scope.focusMode == 'COURSE'){
			document.getElementById('focus-fine').style.display = "";
            		document.getElementById('focus-course').style.display = "none";
			$scope.focusMode = 'FINE';
		}
	};

    }])

	.controller('ImageController', ['$scope', '$http', '$window', function($scope, $http, $window){
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			$http.get('/api/getImages').then(
				function successCall(response){
					$scope.filenames = response.data;
				},
				function errorCall(response){
				}
			);
		});

		$scope.add_remove_files = {};
		$scope.select_text = "Select all";
		var d = new Date();
		$scope.current_date = d.toDateString();

		$scope.change_select_text = function(){
			if($scope.select_text === "Select all"){
				$scope.add_remove_files = {};
				$scope.filenames.forEach(function(filename){
					var id = filename.substring(0, filename.indexOf('.'))
					var element = document.getElementById(id);
					element.classList.add("img-selected-border");
					$scope.add_remove_files[id] = id;
				});
				$scope.select_text = "Unselect all";
			}
			else{
				$scope.add_remove_files = {};
				$scope.filenames.forEach(function(filename){
					var id = filename.substring(0, filename.indexOf('.'))
					var element = document.getElementById(id);
					element.classList.remove("img-selected-border");
				});
				$scope.select_text = "Select all";
			}
		}

		$scope.select_deselect = function(filename){
			var id = filename.substring(0, filename.indexOf('.'))
			var element = document.getElementById(id);
			if(element.classList.contains("img-selected-border")){
				element.classList.remove("img-selected-border");
				delete $scope.add_remove_files[id];
			}
			else{
				element.classList.add("img-selected-border");
				$scope.add_remove_files[id] = id;
			}
		};

		$scope.download_images = function(){
			console.log(Object.keys($scope.add_remove_files));
			if(Object.keys($scope.add_remove_files).length != 0){
				$http.post('/api/downloadImages', Object.keys($scope.add_remove_files))
					.success(function(data){
						console.log("got back");
						var win = $window.open('/api/imageZip','','width=, height=, resizable=no');
						//win.resizeTo(0,0);
						//win.moveTo(0,window.screen.availHeight+10);
					})
			}
			else{
				alert("Please select an image");
			}
		};

		$scope.delete_images = function(){
			if(Object.keys($scope.add_remove_files).length != 0){
				$http.post('/api/deleteImages', Object.keys($scope.add_remove_files))
					.success(function(data){
						console.log("deleted the images");
						$window.location.reload();
					})
			}
			else{
				alert("Please select an image");
			}
		};

	}]);
