$(document).ready(function() {
	var host = window.document.location.host.replace(/:.*/, "");
	var isProduction = host.indexOf("minhcung") !== -1;
	var url = !isProduction
		? "ws://" + host + (location.port ? ":" + location.port : "")
		: "wss://minhcung.me/lovr";
	var client = new Colyseus.Client(url);
	$(document).on("click", "#trigger", function() {
		$("#msgModal").modal("hide");
		$('.nav-tabs a[href="#login-form"]').tab("show");
	});

	$("#login-form").submit(function() {
		var loginData = $("#login").serialize();
		loginData += "&sessionId=" + client.id;
		console.log(loginData);

		$.ajax({
			method: "post",
			url: "/api/login",
			data: loginData,
			dataType: "json",
			success: function(response) {
				console.log(response);
				window.location = response.redirect;
			},
			error: function(response) {
				console.log(response);
				$("#msgHeader").html(response.responseJSON.message);
				$("#msgPrompt").html(
					'<button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>'
				);
				$("#msgModal").modal("show");
			}
		});
		return false;
	});

	$("#register").validate({
		rules: {
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#pwd"
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password"
			},
			email: "Please enter a valid email address"
		},
		submitHandler: function(form) {
			var regisData = $(form).serialize();
			var success =
				"<p>Your registration has been completed. Click the button below to login.</p>";
			success +=
				'<button type="button" class="btn btn-success" id="trigger">To Login</button>';
			var fail =
				"<p>Account registration failed. Username may already been taken.</p>";
			fail +=
				'<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';

			$.ajax({
				method: "post",
				url: "/api/register",
				data: regisData,
				dataType: "json",
				success: function(response) {
					console.log(response);
					$("#msgHeader").html(response.message);
					$("#msgPrompt").html(success);
					$("#msgModal").modal("toggle");
				},
				error: function(response) {
					$("#msgHeader").html(response.responseJSON.message);
					$("#msgPrompt").html(fail);
					$("#msgModal").modal("toggle");
					console.log(response);
				}
			});

			return false;
		},
		errorElement: "em",
		errorPlacement: function(error, element) {
			// Add the `help-block` class to the error element
			error.addClass("help-block");

			if (element.prop("type") === "checkbox") {
				error.insertAfter(element.parent("label"));
			} else {
				error.insertAfter(element);
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element)
				.parents(".col-sm-5")
				.addClass("has-error")
				.removeClass("has-success");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element)
				.parents(".col-sm-5")
				.addClass("has-success")
				.removeClass("has-error");
		}
	});
});
