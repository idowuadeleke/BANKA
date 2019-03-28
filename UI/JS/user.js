const createAccount = document.querySelector('.create-account');
const userProfile = document.querySelector('.user-profile');

document.addEventListener('click', (e) => {
    if (e.target.className === 'create-account-page') {
        createAccount.style.display = 'block';
        userProfile.style.display = 'none';
    }
})



// Add active class to the current button (highlight it)
var header = document.getElementById("menu");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active-link");
  current[0].className = current[0].className.replace(" active-link", "");
  this.className += " active-link";
  });
}


