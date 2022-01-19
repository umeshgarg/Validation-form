function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var lastName = document.forms["myForm"]["last-name"].value;
    var mobile = document.forms["myForm"]["mobile"].value;
    var email = document.forms["myForm"]["email"].value;
    var pass = document.forms["myForm"]["psw"].value;
    var confirmPass = document.forms["myForm"]["psw-confirm"].value;
    var nameRegex = /^[A-Za-z ]+$/;
    var passRegex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

    if (!nameRegex.test(name)) {
        alert("Enter valid First Name");
        return false;
    }

    if (!nameRegex.test(lastName)) {
        alert("Enter valid Last Name");
        return false;
    }

    if (isNaN(mobile) || mobile.length != 10) {
        alert("Enter valid Mobile No");
        return false;
    }

    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        alert("Enter valid Email");
        return false;
    }

    if (pass.length < 6) {
        alert("Password must be atleast 6 characters long");
        return false;
    }

    if (!passRegex.test(pass)) {
        alert("Password should contain atleast one number and one special character");
        return false;
    }

    if (pass != confirmPass) {
        alert("Password doesn't match");
        return false;
    }
    document.write("First Name: " + name + "<br>Last Name: " + lastName + "<br>Mobile: " + mobile + "<br>Email: " + email + "<br>Password: " + pass);
    return true;
}