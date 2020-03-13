const saveSettings = document.getElementById('saveSettings');
const settingsForm = document.getElementById('settingsForm');

const sendForm = (formData) => {
  fetch('/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => {
    console.log(response);
  }).catch(error => console.error(error))
}

settingsForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let formData = new FormData(settingsForm)
  formData = Object.fromEntries(formData)
  console.log(formData);
  sendForm(formData)
})


