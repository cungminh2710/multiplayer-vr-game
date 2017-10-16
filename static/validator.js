
$( document ).ready( function () {
    $( "#register" ).validate( {
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
            email: "Please enter a valid email address",
        },
        submitHandler: function (form) {
            var formData = $(form).serialize();
            console.log(formData);

            $.ajax({
              method: "post",
              url: "/api/register",
              data: formData,
              dataType: "json",
              success: function(data) {
                $("#messages").html("Your registration was successful!");
                var response = data;
                console.log(data);
              },
              error: function(data) {
                $("#messages").html("Registration failed.");
                var response = data;
                console.log(response);
              }
            });

            return false;
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
        }
    } );

} );
