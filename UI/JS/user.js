const createAccount = document.querySelector('.create-account');
const userProfile = document.querySelector('.user-profile');
const userTransactionHistory = document.querySelector('.transaction');
const adminChangeStatus= document.querySelector('.change-status');
const adminCreateUserAccount= document.querySelector('.user-account');
const adminViewAllAccounts= document.querySelector('.all-bank-accounts');


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
    }
    if (e.target.className === 'change-account-status') {
        adminChangeStatus.style.display = 'block';
        adminCreateUserAccount.style.display = 'none';
        adminViewAllAccounts.style.display = 'none';
    }
    if (e.target.className === 'admin-all-accounts') {
        adminViewAllAccounts.style.display = 'block';
        adminChangeStatus.style.display = 'none';
        adminCreateUserAccount.style.display = 'none';
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


