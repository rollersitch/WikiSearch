$(document).ready(function() {
	

	$("#search-btn").on("click", function(event) {
		event.preventDefault();
		var $query = $("#search-text").val();
		fetchWiki($query);
	});


	










});

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function cleanQuery(string) {
	if(string !== "") {
  		return String(string).replace(/[&<>"'\/]/g, function (s) {
    													return entityMap[s];
  													});
  	}
  	else return null;
}




function fetchWiki(query) {
	// body...
	var cleanedQuery = cleanQuery(query);
	$.get("http://en.wikipedia.org/w/api.php?action=opensearch&search=" + 
			encodeURIComponent(cleanedQuery) +
			"&limit=10&namespace=0&format=json",
			function(response) {
				console.log(response);
				$("#articles-section").html("");
				var titles = response[1];
				var articles = response[2];
				for(var i = 0 ; i < 10; i++) {
					var newSection = $("<div><h1>" + titles[i] + "</h1><p>" + articles[i] + "</p></div>");
					$("#articles-section").append(newSection);
				}
			}, "jsonp");

}