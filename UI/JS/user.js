const createAccount = document.querySelector('.create-account');
const userProfile = document.querySelector('.user-profile');
const userTransactionHistory = document.querySelector('.transaction');
const adminChangeStatus= document.querySelector('.change-status');
const adminCreateUserAccount= document.querySelector('.user-account');
const adminViewAllAccounts= document.querySelector('.all-bank-accounts');
const adminViewAccountRecord= document.querySelector('.user-account-record');
const adminDeleteAccount= document.querySelector('.delete-account');
const staffCreditAcccountPage = document.querySelector('.credit-account');

document.addEventListener('click', (e) => {
    if (e.target.className === 'create-account-page') {
        createAccount.style.display = 'block';
        userProfile.style.display = 'none';
        userTransactionHistory.style.display = 'none';
    }
    if (e.target.className === 'user-transaction-history-page') {
        userTransactionHistory.style.display = 'block';
        userProfile.style.display = 'none';
        createAccount.style.display = 'none';
    }
    if (e.target.className === 'admin-create-user-account') {
        adminCreateUserAccount.style.display = 'block';
        adminChangeStatus.style.display = 'none';
        adminViewAllAccounts.style.display = 'none';
        adminViewAccountRecord.style.display = 'none';
    }
    if (e.target.className === 'change-account-status') {
        adminChangeStatus.style.display = 'block';
        adminCreateUserAccount.style.display = 'none';
        adminViewAllAccounts.style.display = 'none';
        adminViewAccountRecord.style.display = 'none';
        adminDeleteAccount.style.display='none';
    }
    if (e.target.className === 'admin-all-accounts') {
        adminViewAllAccounts.style.display = 'block';
        adminChangeStatus.style.display = 'none';
        adminCreateUserAccount.style.display = 'none';
        adminViewAccountRecord.style.display = 'none';
        adminDeleteAccount.style.display='none';
    }
    if (e.target.className === 'each-menu' || e.target.className === 'view-record' ) {
        adminViewAccountRecord.style.display = 'block';
        adminViewAllAccounts.style.display = 'none';
        adminChangeStatus.style.display = 'none';
        adminCreateUserAccount.style.display = 'none';
        adminDeleteAccount.style.display='none';
    }
    if (e.target.className === 'admin-delete-account') {
        adminDeleteAccount.style.display='block';
        adminViewAllAccounts.style.display = 'none';
        adminChangeStatus.style.display = 'none';
        adminCreateUserAccount.style.display = 'none';
        adminViewAccountRecord.style.display = 'none';
    }
    if (e.target.className === 'staff-credit-account') {
        staffCreditAcccountPage.style.display='block';
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


