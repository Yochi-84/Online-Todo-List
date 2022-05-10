function loginCheck() {
  const email_empty = document.querySelector('#login-email').value === ''
  const password_empty = document.querySelector('#login-password').value === ''
  if(!email_empty && !password_empty) {
    window.location.href='todo.html'
  } else {
    if(email_empty) {
      document.querySelector('#login-email').classList.remove('mb-2')
      document.querySelector('#login-email-empty').classList.remove('d-none')
    }

    if(password_empty){
      document.querySelector('#login-password').classList.remove('mb-3')
      document.querySelector('#login-password-empty').classList.remove('d-none')
    }
  }
}

function registerCheck() {
  const email_empty = document.querySelector('#register-email').value === ''
  const name_empty = document.querySelector('#register-name').value === ''
  const password_empty = document.querySelector('#register-password').value === ''
  const password_check_empty = document.querySelector('#register-password-check').value === ''
  if(!email_empty && !name_empty & !password_empty && !password_check_empty) {
    window.location.href='todo.html'
  } else {
    if(email_empty) {
      document.querySelector('#register-email').classList.remove('mb-2')
      document.querySelector('#register-email-empty').classList.remove('d-none')
    }

    if(name_empty) {
      document.querySelector('#register-name').classList.remove('mb-2')
      document.querySelector('#register-name-empty').classList.remove('d-none')
    }

    if(password_empty){
      document.querySelector('#register-password').classList.remove('mb-2')
      document.querySelector('#register-password-empty').classList.remove('d-none')
    }

    if(password_check_empty){
      document.querySelector('#register-password-check').classList.remove('mb-3')
      document.querySelector('#register-password-check-empty').classList.remove('d-none')
    }
  }
}

