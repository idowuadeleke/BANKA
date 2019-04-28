

const feedbackContainerLogin = document.querySelector('.feedback-message-login');
const feedbackContainerLogin2 = document.querySelector('.feedback-message-login2');
const feedbackContainerLogin3 = document.querySelector('.feedback-message-login3');
const feedbackContainer = document.querySelector('.feedback_container');
const feedbackContainer2 = document.querySelector('.feedback_container2');
const feedbackContainer3 = document.querySelector('.feedback_container3');
const feedbackContainer4 = document.querySelector('.feedback_container4');
const feedbackContainer5 = document.querySelector('.feedback_container5');
const feedbackContainer6 = document.querySelector('.feedback_container6');

const displayFeedback = (responseData) => {
  let listItem = '';

  if (responseData.status === 400 && typeof responseData.error !== 'string') {
    listItem += "<li class='feedback-list-item'>please try again</li>";
  } else if (responseData.status === 200 || responseData.status === 201) {
    listItem += '<li class=\'feedback-list-item\'>Success</li>';
  } else {
    listItem += `<li class='feedback-list-item'>${responseData.error}</li>`;
  }

  return listItem;
};

const signUp = (e) => {
  e.preventDefault();
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('password2').value;

  const url = 'https://bankaapplication.herokuapp.com/api/v1/auth/signup';
  feedbackContainer.innerHTML = '';
  feedbackContainer2.innerHTML = '';
  feedbackContainer3.innerHTML = '';
  feedbackContainer4.innerHTML = '';
  feedbackContainer5.innerHTML = '';
  feedbackContainer6.innerHTML = '';
  feedbackContainerLogin.innerHTML = '';
  feedbackContainerLogin2.innerHTML = '';
  feedbackContainerLogin3.innerHTML = '';


  if ((confirmPassword !== password)) {
    feedbackContainer6.innerHTML = 'comfirm password does not match password';
    feedbackContainer6.style.color = 'red';
  } else {
    feedbackContainer6.innerHTML = '';
    // User input data object
    const formData = {
      firstname,
      lastname,
      email,
      password,
      type: 'client',
    };

    console.log(formData);
    // Make a post request to sign up endpoint
    fetch(
      url,

      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )
      .then(res => res.json())
      .then((body) => {
        console.log(body);
        if (body.status === 201) {
          // store user data in browser local storage
          const userData = JSON.stringify({
            id: body.data.id,
            username: body.data.username,
            token: body.data.token,
          });
          localStorage.setItem('user', userData);
          window.scrollTo(0, 0);

          // redirect user to dashboard after 2 seconds
          window.location.href = 'user.html';
        } else {
          feedbackContainer.innerHTML = displayFeedback(body);
          window.scrollTo(0, 0);
        }
        Object.keys(body.errors).forEach((element) => {
          Object.keys(formData).forEach((key) => {
            if (element === key) {
              const returnedError = body.errors[element];
              document.querySelector(`#${element}`).nextElementSibling.style.color = 'red';
              document.querySelector(`#${element}`).nextElementSibling.innerHTML = returnedError;
              console.log(body.errors[element]);

              console.log(element);
              console.log(key);
            }
          });
        });
      });
  }
};

// Get sign up button
const signupbtn = document.getElementById('create');

// bind click event to sign up button
signupbtn.addEventListener('click', signUp);


const signIn = (e) => {
  e.preventDefault();
  const userEmail = document.getElementById('sign-in-email').value;
  const userPassword = document.getElementById('sign-in-password').value;
  feedbackContainer.innerHTML = '';
  feedbackContainer2.innerHTML = '';
  feedbackContainer3.innerHTML = '';
  feedbackContainer4.innerHTML = '';
  feedbackContainer5.innerHTML = '';
  feedbackContainer6.innerHTML = '';
  feedbackContainerLogin.innerHTML = '';
  feedbackContainerLogin2.innerHTML = '';
  feedbackContainerLogin3.innerHTML = '';

  const url = 'https://bankaapplication.herokuapp.com/api/v1/auth/signin';

  const formData = {
    email: userEmail,
    password: userPassword,
  };
  console.log(formData);
  // make post request to sign in route
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((body) => {
      console.log(body);

      // check for success status
      if (body.status === 200) {
        // store user data in browser local storage
        const userData = JSON.stringify({
          username: body.data[0].firstName,
          token: body.data[0].token,
        });
        localStorage.setItem('user', userData);
        window.scrollTo(0, 0);
        if (body.data[0].type === 'client') {
          window.location.href = 'user.html';
        } else if ((body.data[0].type === 'staff') && (body.data[0].isAdmin === false)) {
          window.location.href = 'staff.html';
        } else if ((body.data[0].type === 'staff') && (body.data[0].isAdmin === true)) {
          window.location.href = 'admin.html';
        }
      } else {
        feedbackContainerLogin.innerHTML = displayFeedback(body);
        feedbackContainerLogin.classList.add('feedback-message-error');
        window.scrollTo(0, 0);

        Object.keys(body.errors).forEach((element) => {
          Object.keys(formData).forEach((key) => {
            if (element === key) {
              const returnedError = body.errors[element];
              document.querySelector(`#sign-in-${element}`).nextElementSibling.style.color = 'red';
              document.querySelector(`#sign-in-${element}`).nextElementSibling.innerHTML = returnedError;
            }
          });
        });
      }
    })
    .catch(err => err);
};

const signInBtn = document.getElementById('user-login-btn');

// bind click event to sign in button
signInBtn.addEventListener('click', signIn);
