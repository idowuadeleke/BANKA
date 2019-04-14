
// Add active class to the current button (highlight it)
const header = document.getElementById('menu');
const btns = header.getElementsByClassName('btn');
for (let i = 0; i < btns.length; i += 1) {
  btns[i].addEventListener('click', function activeClass() {
    const current = document.getElementsByClassName('active-link');
    current[0].className = current[0].className.replace(' active-link', '');
    this.className += ' active-link';
  });
}

/* eslint-disable no-unused-vars */
function myFunction() {
  let td; let i; let txtValue;
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('myTable');
  const tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i += 1) {
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
/* eslint-disable no-unused-vars */

window.onclick = (e) => {
  if (e.target === debitModal) {
    debitModal.style.display = 'none';
  }
  if (e.target === creditModal) {
    creditModal.style.display = 'none';
  }
  if (e.target === creditModal) {
    creditModal.style.display = 'none';
  }
  if (e.target === staffDeleteModal) {
    staffDeleteModal.style.display = 'none';
  }
  if (e.target === adminDeleteModal) {
    adminDeleteModal.style.display = 'none';
  }
  if (e.target === adminDeactivateModal) {
    adminDeactivateModal.style.display = 'none';
  }
  if (e.target === adminActivateModal) {
    adminActivateModal.style.display = 'none';
  }
  if (e.target === bankAccountModal) {
    bankAccountModal.style.display = 'none';
  }
  if (e.target === userResetPasswordModal) {
    userResetPasswordModal.style.display = 'none';
  }
  if (e.target === staffResetPasswordModal) {
    staffResetPasswordModal.style.display = 'none';
  }
  if (e.target === adminResetPasswordModal) {
    adminResetPasswordModal.style.display = 'none';
  }
};
