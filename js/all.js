function loginCheck() {
  const email_empty = document.querySelector('#login-email').value === ''
  const password_empty = document.querySelector('#login-password').value === ''
  if(!email_empty && !password_empty) {
    fetch(`https://todo-json-00824.herokuapp.com/users?email=${document.querySelector('#login-email').value}&password=${document.querySelector('#login-password').value}`,{
      method: "GET",
      redirect: 'follow'
    })
    .then(res => res.json())
    .then(result=> Object.keys(result).length > 0 ? window.location.href=`todo.html?id=${result[0].id}&name=${result[0].name}` : alert("帳號密碼錯誤!"))
    .catch(err => console.log(err))
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
    const data = {
      "email": document.querySelector('#register-email').value,
      "name": document.querySelector('#register-name').value,
      "password": document.querySelector('#register-password').value
    }
    fetch('https://todo-json-00824.herokuapp.com/users',{
      method: "POST",
      redirect: 'follow',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result=> window.location.href='index.html')
    .catch(err => console.log(err))
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

