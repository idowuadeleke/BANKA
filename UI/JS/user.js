const createAccount = document.querySelector('.create-account');
const userProfile = document.querySelector('.user-profile');
const userTransactionHistory = document.querySelector('.transaction');
const adminChangeStatus = document.querySelector('.change-status');
const staffChangeStatus = document.querySelector('.change-status-staff');
const adminCreateUserAccount = document.querySelector('.user-account');
const adminViewAllAccounts = document.querySelector('.all-bank-accounts');
const adminViewAccountRecord = document.querySelector('.user-account-record');
const adminDeleteAccount = document.querySelector('.delete-account');
const staffCreditAcccountPage = document.querySelector('.credit-account');
const staffDebitAcccountPage = document.querySelector('.debit-account');
const staffViewAllAccounts = document.querySelector('.staff-all-bank-accounts');
const staffViewAccountRecord = document.querySelector('.user-account-record-staffpage');
const staffDeleteAccount = document.querySelector('.staff-delete-account');
const debitModal = document.getElementById('debit-modal');
const creditModal = document.getElementById('credit-modal');
const staffDeleteModal = document.getElementById('staff-delete-modal');
const adminDeleteModal = document.getElementById('admin-delete-modal');
const adminDeactivateModal = document.getElementById('admin-deactivate-modal');
const adminActivateModal = document.getElementById('admin-activate-modal');
const staffDeactivateModal = document.getElementById('staff-deactivate-modal');
const staffActivateModal = document.getElementById('staff-activate-modal');
const bankAccountModal = document.getElementById('create-bankaccount-modal');
const createLoginUserModal = document.getElementById('create-user-modal');
const userResetPasswordModal = document.getElementById('user-resetpass-modal');
const staffResetPasswordModal = document.getElementById('staff-resetpass-modal');
const adminResetPasswordModal = document.getElementById('admin-resetpass-modal');
const creditSucessModal = document.getElementById('credit-success-modal');
const debitSucessModal = document.getElementById('debit-success-modal');
const deleteSucessModal = document.getElementById('delete-success-modal');
const adminDeleteSucess = document.getElementById('delete-success-modal-admin');
const adminDeactivateSucess = document.getElementById('deactivate-success-modal');
const adminActivateSucess = document.getElementById('activate-success-modal');
const staffDeactivateSucess = document.getElementById('staff-deactivate-success-modal');
const staffActivateSucess = document.getElementById('staff-activate-success-modal');
// modal.style.display = "block";

document.addEventListener('click', (e) => {
  if (e.target.className === 'create-account-page' || e.target.className === 'fa fa-certificate') {
    createAccount.style.display = 'block';
    userProfile.style.display = 'none';
    userTransactionHistory.style.display = 'none';
  }
  if (e.target.className === 'user-profile-page' || e.target.className === 'fa fa-user') {
    userProfile.style.display = 'block';
    userTransactionHistory.style.display = 'none';
    createAccount.style.display = 'none';
  }
  if (e.target.className === 'user-transaction-history-page' || e.target.className === 'fa fa-chart-line') {
    userTransactionHistory.style.display = 'block';
    userProfile.style.display = 'none';
    createAccount.style.display = 'none';
  }
  if (e.target.className === 'admin-create-user-account' || e.target.className === 'fa fa-users-cog') {
    adminCreateUserAccount.style.display = 'block';
    adminChangeStatus.style.display = 'none';
    adminViewAllAccounts.style.display = 'none';
    adminViewAccountRecord.style.display = 'none';
  }
  if (e.target.className === 'change-account-status' || e.target.className === 'admin fa fa-certificate') {
    adminChangeStatus.style.display = 'block';
    adminCreateUserAccount.style.display = 'none';
    adminViewAllAccounts.style.display = 'none';
    adminViewAccountRecord.style.display = 'none';
    adminDeleteAccount.style.display = 'none';
  }
  if (e.target.className === 'each-menu' || e.target.className === 'view-record') {
    adminViewAllAccounts.style.display = 'none';
    adminChangeStatus.style.display = 'none';
    adminCreateUserAccount.style.display = 'none';
    adminViewAccountRecord.style.display = 'block';
    adminDeleteAccount.style.display = 'none';
  }
  if (e.target.className === 'admin-all-accounts' || e.target.className === 'fa fa-gem') {
    adminViewAllAccounts.style.display = 'block';
    adminChangeStatus.style.display = 'none';
    adminCreateUserAccount.style.display = 'none';
    adminViewAccountRecord.style.display = 'none';
    adminDeleteAccount.style.display = 'none';
  }
  if (e.target.className === 'admin-delete-account' || e.target.className === 'fa fa-cut') {
    adminDeleteAccount.style.display = 'block';
    adminViewAllAccounts.style.display = 'none';
    adminChangeStatus.style.display = 'none';
    adminCreateUserAccount.style.display = 'none';
    adminViewAccountRecord.style.display = 'none';
  }
  if (e.target.className === 'staff-credit-account' || e.target.className === 'fa fa-plus-square') {
    staffCreditAcccountPage.style.display = 'block';
    staffDebitAcccountPage.style.display = 'none';
    staffViewAllAccounts.style.display = 'none';
    staffViewAccountRecord.style.display = 'none';
    staffDeleteAccount.style.display = 'none';
    staffChangeStatus.style.display = 'none';
  }
  if (e.target.className === 'staff-debit-account' || e.target.className === 'fa fa-minus-square') {
    staffDebitAcccountPage.style.display = 'block';
    staffCreditAcccountPage.style.display = 'none';
    staffViewAllAccounts.style.display = 'none';
    staffDeleteAccount.style.display = 'none';
    staffChangeStatus.style.display = 'none';
  }
  if (e.target.className === 'staff-all-accounts' || e.target.className === 'staff fa fa-gem') {
    staffViewAllAccounts.style.display = 'block';
    staffDebitAcccountPage.style.display = 'none';
    staffCreditAcccountPage.style.display = 'none';
    staffViewAccountRecord.style.display = 'none';
    staffDeleteAccount.style.display = 'none';
    staffChangeStatus.style.display = 'none';
  }
  if (e.target.className === 'staff-change-status' || e.target.className === 'staff fa fa-certificate') {
    staffChangeStatus.style.display = 'block'
    staffViewAllAccounts.style.display = 'none';
    staffDebitAcccountPage.style.display = 'none';
    staffCreditAcccountPage.style.display = 'none';
    staffViewAccountRecord.style.display = 'none';
    staffDeleteAccount.style.display = 'none';
  }
  if (e.target.className === 'staff-view-record') {
    staffViewAccountRecord.style.display = 'block';
    staffViewAllAccounts.style.display = 'none';
    staffDebitAcccountPage.style.display = 'none';
    staffCreditAcccountPage.style.display = 'none';
    staffDeleteAccount.style.display = 'none';
    staffChangeStatus.style.display = 'none';
  }
  if (e.target.className === 'staff-delete-accountpage' || e.target.className === 'staff fa fa-cut') {
    staffDeleteAccount.style.display = 'block';
    staffViewAccountRecord.style.display = 'none';
    staffViewAllAccounts.style.display = 'none';
    staffDebitAcccountPage.style.display = 'none';
    staffCreditAcccountPage.style.display = 'none';
    staffChangeStatus.style.display = 'none';
  }
  if (e.target.className === 'menu-link' || e.target.className === 'fa fa-bars') {
    document.getElementById('menu').classList.toggle('reduce-sidebar');
  }
  if (e.target.className === 'submit-account debit-button') {
    debitModal.style.display = 'block';
  }
  if (e.target.className === 'close') {
    debitModal.style.display = 'none';
    creditModal.style.display = 'none';
    staffDeleteModal.style.display = 'none';
    staffResetPasswordModal.style.display = 'none';
    creditSucessModal.style.display = 'none';
    debitSucessModal.style.display = 'none';
    deleteSucessModal.style.display = 'none';
    staffDeactivateModal.style.display = 'none';
    staffActivateModal.style.display = 'none';
    staffActivateSucess.style.display = 'none';
    staffDeactivateSucess.style.display = 'none';
    
  }
  if (e.target.className === 'admin-close') {
    adminDeleteModal.style.display = 'none';
    adminDeactivateModal.style.display = 'none';
    adminActivateModal.style.display = 'none';
    createLoginUserModal.style.display = 'none';
    adminResetPasswordModal.style.display = 'none';
    adminDeleteSucess.style.display = 'none';
    adminDeactivateSucess.style.display = 'none';
    adminActivateSucess.style.display = 'none';
  }
  if (e.target.className === 'submit-account admin-modal-button') {
    adminDeleteModal.style.display = 'none';
    adminDeactivateModal.style.display = 'none';
    adminActivateModal.style.display = 'none';
    createLoginUserModal.style.display = 'none';
    adminResetPasswordModal.style.display = 'none';
    adminDeleteSucess.style.display = 'none';
    adminDeactivateSucess.style.display = 'none';
    adminActivateSucess.style.display = 'none';
  }
  if (e.target.className === 'submit-account modal-button') {
    debitModal.style.display = 'none';
    creditModal.style.display = 'none';
    staffDeleteModal.style.display = 'none';
    staffResetPasswordModal.style.display = 'none';
    creditSucessModal.style.display = 'none';
    debitSucessModal.style.display = 'none';
    deleteSucessModal.style.display = 'none';
    staffDeactivateModal.style.display = 'none';
    staffActivateModal.style.display = 'none';
    staffActivateSucess.style.display = 'none';
    staffDeactivateSucess.style.display = 'none';
  }
  if (e.target.className === 'submit-account credit-button') {
    creditModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account staff-delete-button' || e.target.className === 'staff-delete-record' || e.target.className === 'change-user-status submit-account staff-delete-button') {
    staffDeleteModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account admin-delete-button' || e.target.className === 'delete-record' || e.target.className === 'change-user-status submit-account admin-delete-button') {
    adminDeleteModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account deactivate-button' || e.target.className === 'change-user-status submit-account deactivate-button') {
    adminDeactivateModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account staff-activate-button' || e.target.className === 'change-user-status submit-account staff-activate-button') {
    staffActivateModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account staff-deactivate-button' || e.target.className === 'change-user-status submit-account staff-deactivate-button') {
    staffDeactivateModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account activate-button' || e.target.className === 'change-user-status submit-account activate-button') {
    adminActivateModal.style.display = 'block';
  }
  if (e.target.className === 'submit-account create-bank-account') {
    bankAccountModal.style.display = 'block';
  }
  if (e.target.className === 'bank-account-close') {
    bankAccountModal.style.display = 'none';
    userResetPasswordModal.style.display = 'none';
  }
  if (e.target.className === 'submit-account account-modal-button') {
    bankAccountModal.style.display = 'none';
    userResetPasswordModal.style.display = 'none';
  }
  if (e.target.className === 'submit-account create-user-button') {
    createLoginUserModal.style.display = 'block';
    adminDeleteModal.style.display = 'none';
    adminDeactivateModal.style.display = 'none';
    adminActivateModal.style.display = 'none';
  }
  if (e.target.className === 'user-reset-password') {
    userResetPasswordModal.style.display = 'block';
  }
  if (e.target.className === 'staff-reset-password') {
    staffResetPasswordModal.style.display = 'block';
  }
  if (e.target.className === 'admin-reset-password') {
    adminResetPasswordModal.style.display = 'block';
  }
  if (e.target.id === 'debit-success') {
    debitSucessModal.style.display = 'block';
  }
  if (e.target.id === 'credit-success') {
    creditSucessModal.style.display = 'block';
  }
  if (e.target.id === 'delete-success') {
    deleteSucessModal.style.display = 'block';
  }
  if (e.target.id === 'admin-delete-success') {
    adminDeleteSucess.style.display = 'block';

  }
  if (e.target.id === 'admin-deactivate-success') {
    adminDeactivateSucess.style.display = 'block';
  }
  if (e.target.id === 'admin-activate-success') {
    adminActivateSucess.style.display = 'block';
  }
  if (e.target.id === 'deactivate-success') {
    staffDeactivateSucess.style.display = 'block';
  }
  if (e.target.id === 'activate-success') {
    staffActivateSucess.style.display = 'block';
  }
});
