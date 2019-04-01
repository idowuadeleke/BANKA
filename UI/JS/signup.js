const userLogin = document.getElementById("user-login-btn");
const userRole = document.getElementById("user-role");

var role;
userRole.onchange = function() {
  role = document.getElementById("user-role").value;
};


userLogin.onclick = function(e) {
    gotoUserPage();
  };
  
function gotoUserPage() {
  if (role == "customer") {
    userLogin.formAction = "user.html";
  } else if (role == "staff") {
    userLogin.formAction = "staff.html";
  } else if (role == "admin") {
    userLogin.formAction = "admin.html";
  }
}

var myIndex = 0;
carousel();

function carousel() {
var i;
var x = document.getElementsByClassName("my-image");
for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
}
myIndex++;
if (myIndex > x.length) {myIndex = 1}    
x[myIndex-1].style.display = "block";  
setTimeout(carousel, 7000); // Change image every 2 seconds
}

function showHide(desiredPage,currentPage) {
    var desiredPage = document.getElementById(desiredPage);
    var currentPage= document.getElementById(currentPage);
    desiredPage.style.display = 'block';
    currentPage.style.display = 'none';
   
}