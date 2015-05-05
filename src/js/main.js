(function(){

//logic for make the modal window for signing up appear
var signUp = $('.js-sign-up');
var modal = $('.modal--signup');
var overlay = $('.overlay');

signUp.on('click', function(e){
	e.preventDefault();

	modal.addClass('open');
});

overlay.on('click', function(e){
	if (modal.hasClass('open')) {
		modal.removeClass('open');
	}
});

//logic for handling a signup

var signUpForm = $('.js-signup-form');

signUpForm.on('submit', function(e){
	e.preventDefault();
	
	var username = $('.js-form-username').val();
	var email= $('.js-form-email').val();
	var password = $('.js-form-password').val();
	var firstname = $('.js-form-firstname').val();
	var lastname = $('.js-form-lastname').val();

	var data = {
		username: username,
		firstName: firstname,
		lastName: lastname,
		email: email,
		password: password
	}

	var formdata = JSON.stringify(data);

	ajax.post('http://localhost:3000/api/mangement/v1/user', formdata, function(status, res){
		var data = JSON.parse(res);
		console.log(status);
		console.log(data.message);
	});
});



})();