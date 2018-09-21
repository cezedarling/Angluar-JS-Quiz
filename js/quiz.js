(function(){

	var app = angular.module('myQuiz',[]);
	
// 	app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sce){
	app.controller('QuizController', function($scope,$http,$sce){
		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswer = 0;
		$scope.percentage = 0;
		
		$http({
			method : "GET",
			url : "quiz_data_test.json"
			}).then(function(quizData) {
			$scope.myQuestions = quizData.data.quiz;
			$scope.totalQuestions = $scope.myQuestions.length;
// 			console.log(quizData);
		});
		
		// CUSTOM FUNCTION
		$scope.selectAnswer = function(qIndex,aIndex) {
			// console.log(qIndex + 'and' + aIndex);
			var questionState = $scope.myQuestions[qIndex].questionState;
			
			if ( questionState != 'answered' ) {
				$scope.myQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct;
				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;
				
				if ( aIndex === correctAnswer ) {
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				} else {
					$scope.myQuestions[qIndex].correctness = 'incorrect';
				}
				$scope.myQuestions[qIndex].questionState = 'answered';
			}
// 			JUST IN CASE YOU HAVE REMAINDERS
			$scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
// 			$scope.percentage = ($scope.score / $scope.totalQuestions)*100;
		}
		
		$scope.isSelected = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		}
		$scope.isCorrect = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		}
		
		$scope.selectContinue = function() {
			return $scope.activeQuestion += 1;
		}
		
		$scope.createShareLinks = function(percentage) {
			var url = 'https://cezedarling.com';
			var emailLink = '<a href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored a '+percentage+'% on this quiz about Saturn. Try to beat my score at '+url+'" class="btn email">Email a Friend</a>';
			var twitterLink = '<a href="https://twitter.com/share?text=I scored a '+percentage+' percent on this quiz about Saturn. Try to beat my score at&amp;hashtags=SaturnQuiz&amp;url='+url+'" class="btn tweet" target="_blank">Tweet your score</a>';
			var newMarkup = emailLink + twitterLink;
			return $sce.trustAsHtml(newMarkup);
		}
	
	});
	
})();