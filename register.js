document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault(); 


    var button = document.getElementById("btn")
    var name = document.getElementById("name")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var age = document.getElementById("age")
    var genderRadios = document.querySelectorAll('input[name="gender"]');

   
         if (name.value == "" || email.value =="" || password.value =="" || age.value == ""
             || !genderRadios.genderSelected) {
            alert("All field is required.");
            return;
        }
       
        if(name.value.length < 6){
            alert("Name must be longer than 5 character")
            return;
        }
        
        if (!email.value.includes("@") || !email.value.includes(".")) {
            alert("Enter a valid email (must contain '@' and '.').");
            return;
        }

        if (password.value.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const ageValue = parseInt(age);
        if (isNaN(ageValue) || ageValue < 13 || ageValue > 120) {
            alert("Age must be a number between 13 and 120.");
            return
        }
        
        
        let genderSelected = false;
            for (let radio of genderRadios) {
                if (radio.checked) {
                    genderSelected = true;
                    break;
                }
            }

  alert("Registration Success")
});
