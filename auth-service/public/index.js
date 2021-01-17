// const API_URL = "http://localhost:3000";
const API_URL = "/api"

// const loginBtn = document.querySelector("#loginBtn");
// const signupBtn = document.querySelector("#signupBtn");
// const logoutBtn = document.querySelector("#logoutBtn");
const listBtn = document.querySelector("#listBtn");
const findBtn = document.querySelector("#findBtn");



let ACCESS_TOKEN = undefined;

// loginBtn.addEventListener("click", (event) => {
//   event.preventDefault()
//   loginBoxElm.classList.remove("hide");
//   findAccountBoxElm.classList.add("hide");
//   signupBoxElm.classList.add("hide");
// });

// signupBtn.addEventListener("click", (event) => {
//   event.preventDefault()
//   signupBoxElm.classList.remove("hide");
//   findAccountBoxElm.classList.add("hide");
//   loginBoxElm.classList.add("hide");
// });

const doLogin = (formData, ev) => {
  ev.preventDefault()
  const {email, password} = formData
  

  const data = JSON.stringify({
    email: email.value, 
    password: password.value
  })

  const onSuccess = (res) => {
    if (res.error) return
    ACCESS_TOKEN = res.token
    const {referer,token} = res
        window.location.replace(`http://${referer}?token=${token}`)
  }

  const referer = window.location.search
  request('POST', `/auth/login${referer}`, data, onSuccess)
}

const doSignup = (formData, ev) => {
  ev.preventDefault()
  const {email, password, username} = formData

  const data = JSON.stringify({
    email: email.value, 
    password: password.value, 

  })

  const onSuccess = (res) => {
    if (res.error) return

    ACCESS_TOKEN = res.token
    loginBtn.classList.add("hide");
    signupBtn.classList.add("hide");
    logoutBtn.classList.remove("hide");
    listBtn.classList.remove("hide");
    findBtn.classList.remove("hide");
  }
  request('POST', '/auth/signup', data, onSuccess)
}

const findAccount = (formData, ev) => {
  ev.preventDefault()
  const {id} = formData

  request('GET', '/account/' + id.value)
}

const request = (method, route, data, onSuccess) => {

  const headers = {
    'Content-Type': 'application/json'
  }
	if (ACCESS_TOKEN) {
		headers['Authorization'] = ACCESS_TOKEN
	}

  fetch(API_URL + route, {
    headers: headers,
    method: method,
    mode: "cors",
    body: data
  })
  .then((response) => response.json())
  .then(res => {
    // previewElm.innerHTML = JSON.stringify(res, undefined, 2)
    onSuccess && onSuccess(res)
  })
  .catch(err => console.log(err))
//   .catch((error) => previewElm.innerHTML = JSON.stringify(error, undefined, 2))
}