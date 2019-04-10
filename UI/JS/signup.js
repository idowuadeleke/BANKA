const userLogin = document.getElementById('user-login-btn');
const userRole = document.getElementById('user-role');

let role;
userRole.onchange = function () {
  role = document.getElementById('user-role').value;
};


userLogin.onclick = function (e) {
  gotoUserPage();
};

function gotoUserPage() {
  if (role == 'customer') {
    userLogin.formAction = 'user.html';
  } else if (role == 'staff') {
    userLogin.formAction = 'staff.html';
  } else if (role == 'admin') {
    userLogin.formAction = 'admin.html';
  }
}

let myIndex = 0;
carousel();

function carousel() {
  let i;
  const x = document.getElementsByClassName('my-image');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  myIndex++;
  if (myIndex > x.length) { myIndex = 1; }
  x[myIndex - 1].style.display = 'block';
  setTimeout(carousel, 7000); // Change image every 2 seconds
}

function showHide(desiredPage, currentPage) {
  var desiredPage = document.getElementById(desiredPage);
  var currentPage = document.getElementById(currentPage);
  desiredPage.style.display = 'block';
  currentPage.style.display = 'none';
}

function myFunction() {
  let input; let filter; let table; let tr; let td; let i; let
    txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTable');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
