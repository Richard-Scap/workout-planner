var q=0;

var create = {

};

var tools = {
	
	quickDescripMouseovers: function () {		
		var createOff = document.getElementById('createOff');
		var createOn = document.getElementById('createOn');
		createOff.addEventListener('mouseover', function () {
			createOff.style.display = "none";
			createOn.style.display = "inline-block";	
		});
		createOn.addEventListener('mouseout', function () {
			createOn.style.display = "none";
			createOff.style.display = "inline-block";
		});
		var searchOff = document.getElementById('searchOff');
		var searchOn = document.getElementById('searchOn');
		searchOff.addEventListener('mouseover', function () {
			searchOff.style.display = "none";
			searchOn.style.display = "inline-block";	
		});
		searchOn.addEventListener('mouseout', function () {
			searchOn.style.display = "none";
			searchOff.style.display = "inline-block";
		});
		var saveOff = document.getElementById('saveOff');
		var saveOn = document.getElementById('saveOn');
		saveOff.addEventListener('mouseover', function () {
			saveOff.style.display = "none";
			saveOn.style.display = "inline-block";	
		});
		saveOn.addEventListener('mouseout', function () {
			saveOn.style.display = "none";
			saveOff.style.display = "inline-block";
		});
		var shareOff = document.getElementById('shareOff');
		var shareOn = document.getElementById('shareOn');
		shareOff.addEventListener('mouseover', function () {
			shareOff.style.display = "none";
			shareOn.style.display = "inline-block";	
		});
		shareOn.addEventListener('mouseout', function () {
			shareOn.style.display = "none";
			shareOff.style.display = "inline-block";
		});
		var runOff = document.getElementById('runOff');
		var runOn = document.getElementById('runOn');
		runOff.addEventListener('mouseover', function () {
			runOff.style.display = "none";
			runOn.style.display = "inline-block";	
		});
		runOn.addEventListener('mouseout', function () {
			runOn.style.display = "none";
			runOff.style.display = "inline-block";
		});
		var profitOff = document.getElementById('profitOff');
		var profitOn = document.getElementById('profitOn');
		profitOff.addEventListener('mouseover', function () {
			profitOff.style.display = "none";
			profitOn.style.display = "inline-block";	
		});
		profitOn.addEventListener('mouseout', function () {
			profitOn.style.display = "none";
			profitOff.style.display = "inline-block";
		});
	},

	loginMouse: function () {
		var login = document.getElementById('login');
		login.addEventListener('mouseover', function () {
			login.style.color = "rgb(56, 147, 174)";
			login.style.cursor = "pointer";
		});
		login.addEventListener('mouseout', function () {
			login.style.color = "white";
		});
	},
};
tools.quickDescripMouseovers();
tools.loginMouse();