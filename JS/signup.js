const userLogin = document.getElementById('user-login-btn');
const userRole = document.getElementById('user-role');

let role;
userRole.onchange = function changeRole() {
  role = document.getElementById('user-role').value;
};


function gotoUserPage() {
  if (role === 'customer') {
    userLogin.formAction = 'user.html';
  } else if (role === 'staff') {
    userLogin.formAction = 'staff.html';
  } else if (role === 'admin') {
    userLogin.formAction = 'admin.html';
  }
}


userLogin.onclick = function userPage() {
  gotoUserPage();
};

let myIndex = 0;


function carousel() {
  let i;
  const x = document.getElementsByClassName('my-image');
  for (i = 0; i < x.length; i += 1) {
    x[i].style.display = 'none';
  }
  myIndex += 1;
  if (myIndex > x.length) { myIndex = 1; }
  x[myIndex - 1].style.display = 'block';
  setTimeout(carousel, 7000); // Change image every 2 seconds
}

carousel();

/* eslint-disable no-unused-vars */
function showHide(mydesiredPage, mycurrentPage) {
  const desiredPage = document.getElementById(mydesiredPage);
  const currentPage = document.getElementById(mycurrentPage);
  desiredPage.style.display = 'block';
  currentPage.style.display = 'none';
}

/* eslint-disable no-unused-vars */
