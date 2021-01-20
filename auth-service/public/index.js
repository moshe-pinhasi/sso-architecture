const API_URL = "/api"

const doLogin = (formData, ev) => {
  ev.preventDefault()
  const { email, password } = formData
  const redirect = new URLSearchParams(window.location.search).get('redirect')
  const data = JSON.stringify({
    email: email.value,
    password: password.value,
    redirect
  })

  const onSuccess = (res) => {
    if (res.error) return
    let { redirect, token } = res
    if (!redirect || redirect === 'null') redirect = '/404'
    // debugger
    window.location.replace(`${redirect}?token=${token}`)
  }

  request('POST', `/auth/login`, data, onSuccess)
}

const request = (method, route, data, onSuccess) => {

  const headers = {
    'Content-Type': 'application/json'
  }

  fetch(API_URL + route, {
    headers: headers,
    method: method,
    mode: "cors",
    body: data
  })
    .then((response) => response.json())
    .then(res => {
      onSuccess && onSuccess(res)
    })

    .catch(err => console.log(err))
}