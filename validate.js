function validateForm(e) {
    e.preventDefault()
    console.log('run');
    var name = document.forms["myForm"]["name"].value;
    var lastName = document.forms["myForm"]["last-name"].value;
    var mobile = document.forms["myForm"]["mobile"].value;
    var email = document.forms["myForm"]["email"].value;
    var pass = document.forms["myForm"]["psw"].value;
    var confirmPass = document.forms["myForm"]["psw-confirm"].value;

    if (validateData(name, lastName, mobile, email, pass, confirmPass, true)) {
        addRow({ "name": name, "last_name": lastName, "mobile": mobile, "email": email, "pass": pass });
    }
}

function validateData(name, lastName, mobile, email, pass, confirmPass, reset) {
    var nameRegex = /^[A-Za-z ]+$/;
    var passRegex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;


    if (!nameRegex.test(name)) {
        alert("Enter valid First Name");
        if (reset){document.forms["myForm"]["name"].value = "";}
        return false;
    }


    if (!nameRegex.test(lastName)) {
        alert("Enter valid Last Name");
        if (reset){document.forms["myForm"]["last-name"].value = "";}
        return false;
    }


    if (isNaN(mobile) || mobile.length != 10) {
        alert("Enter valid Mobile No");
        if (reset){document.forms["myForm"]["mobile"].value = "";}
        return false;
    }

    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        alert("Enter valid Email");
        if (reset){document.forms["myForm"]["email"].value = "";}
        return false;
    }

    if (reset){
        for (let index = 0; index < rows.length; index++) {
            if (rows[index]["email"] == email){
                alert("Email already exists");
                document.forms["myForm"]["email"].value = "";
                return false;
            }
        }
    }

    if (pass.length < 6) {
        alert("Password must be atleast 6 characters long");
        if (reset){
            document.forms["myForm"]["psw"].value = "";
            document.forms["myForm"]["psw-confirm"].value = "";
        }
        return false;
    }

    if (!passRegex.test(pass)) {
        alert("Password should contain atleast one number and one special character");
        if (reset){
            document.forms["myForm"]["psw"].value = "";
            document.forms["myForm"]["psw-confirm"].value = "";
        }
        return false;
    }

    if (pass != confirmPass) {
        alert("Password doesn't match");
        if (reset){
            document.forms["myForm"]["psw"].value = "";
            document.forms["myForm"]["psw-confirm"].value = "";
        }
        return false;
    }

    if (reset){
        document.forms["myForm"]["email"].value = "";
        document.forms["myForm"]["mobile"].value = "";
        document.forms["myForm"]["name"].value = "";
        document.forms["myForm"]["last-name"].value = "";
        document.forms["myForm"]["psw"].value = "";
        document.forms["myForm"]["psw-confirm"].value = "";
    }

    return true;
}


var rows = localStorage.getItem("rows") || [];

window.onload = function() {

    if (rows.length > 0) {
        rows = JSON.parse(localStorage.getItem("rows"));
        var table = document.getElementById("table");

        for (let index = 0; index < rows.length; index++) {
            const indexItem = rows[index]
            table.insertRow(index + 1).outerHTML = "<tr id='row" + index + "'><td id='name" + index + "'>" + indexItem['name'] + "</td><td id='last_name" + index + "'>" + indexItem['last_name'] + "</td><td id='mobile" + index + "'>" + indexItem['mobile'] + "</td><td id='email" + index + "'>" + indexItem['email'] + "</td><td id='pass" + index + "'>" + indexItem['pass'] + "</td><td><input type='button' id='edit_button" + index + "' value='Edit' class='edit' onclick='editRow(" + index + ")'> <input type='button' id='save_button" + index + "' value='Save' class='save' onclick='saveRow(\"" + index + "\",\"" + indexItem['email'] + "\")'> <input type='button' id='delete_button" + index + "' value='Delete' class='delete' onclick='deleteRow(\"" + index + "\",\"" + indexItem['email'] + "\")'></td></tr>";

            document.getElementById("edit_button" + index).style.display = "block";
            document.getElementById("save_button" + index).style.display = "none";
        }
    }
};

function addRow(data) {
    var table = document.getElementById("table");
    table.insertRow(rows.length + 1).outerHTML = "<tr id='row" + rows.length + "'><td id='name" + rows.length + "'>" + data['name'] + "</td><td id='last_name" + rows.length + "'>" + data['last_name'] + "</td><td id='mobile" + rows.length + "'>" + data['mobile'] + "</td><td id='email" + rows.length + "'>" + data['email'] + "</td><td id='pass" + rows.length + "'>" + data['pass'] + "</td><td><input type='button' id='edit_button" + rows.length + "' value='Edit' class='edit' onclick='editRow(" + rows.length + ")'> <input type='button' id='save_button" + rows.length + "' value='Save' class='save' onclick='saveRow(\"" + rows.length + "\",\"" + data['email'] + "\")'> <input type='button' id='delete_button" + rows.length + "' value='Delete' class='delete' onclick='deleteRow(\"" + rows.length + "\",\"" + data['email'] + "\")'></td></tr>";
    document.getElementById("edit_button" + rows.length).style.display = "block";
    document.getElementById("save_button" + rows.length).style.display = "none";
    rows.push(data);
    localStorage.setItem('rows', JSON.stringify(rows))
}

function editRow(index) {

    document.getElementById("edit_button" + index).style.display = "none";
    document.getElementById("save_button" + index).style.display = "block";

    var name = document.getElementById("name" + index);
    var last_name = document.getElementById("last_name" + index);
    var mobile = document.getElementById("mobile" + index);
    // var email = document.getElementById("email" + index);
    var pass = document.getElementById("pass" + index);

    var name_data = name.innerHTML;
    var last_name_data = last_name.innerHTML;
    var mobile_data = mobile.innerHTML;
    // var email_data = email.innerHTML;
    var pass_data = pass.innerHTML;

    name.innerHTML = "<input type='text' id='name_text" + index + "' value='" + name_data + "'>";
    last_name.innerHTML = "<input type='text' id='last_name_text" + index + "' value='" + last_name_data + "'>";
    mobile.innerHTML = "<input type='text' id='mobile_text" + index + "' value='" + mobile_data + "'>";
    // email.innerHTML = "<input type='text' id='email_text" + index + "' value='" + email_data + "'>";
    pass.innerHTML = "<input type='text' id='pass_text" + index + "' value='" + pass_data + "'>";

}

function deleteRow(index, email) {

    document.getElementById("row" + index + "").outerHTML = "";

    rows = rows.filter(item => (item["email"] != email))

    localStorage.setItem('rows', JSON.stringify(rows))
}

function saveRow(index, email) {
    var name_val = document.getElementById("name_text" + index).value;
    var last_name_val = document.getElementById("last_name_text" + index).value;
    var mobile_val = document.getElementById("mobile_text" + index).value;
    //  var email_val = document.getElementById("email_text" + index).value;
    var pass_val = document.getElementById("pass_text" + index).value;


    if (validateData(name_val, last_name_val, mobile_val, email, pass_val, pass_val, false)) {
        document.getElementById("name" + index).innerHTML = name_val;
        document.getElementById("last_name" + index).innerHTML = last_name_val;
        document.getElementById("mobile" + index).innerHTML = mobile_val;
        // document.getElementById("email" + index).innerHTML = email_val;
        document.getElementById("pass" + index).innerHTML = pass_val;

        document.getElementById("edit_button" + index).style.display = "block";
        document.getElementById("save_button" + index).style.display = "none";

        objIndex = rows.findIndex((item => (item["email"] == email)));

        rows[objIndex]["name"] = name_val;
        rows[objIndex]["last_name"] = last_name_val;
        rows[objIndex]["mobile"] = mobile_val;
        // rows[objIndex]["email"] = email_val;
        rows[objIndex]["pass"] = pass_val;

        localStorage.setItem('rows', JSON.stringify(rows))
    }
}