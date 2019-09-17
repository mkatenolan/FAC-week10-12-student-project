const emailForm = document.querySelector(".unique-meal-plan__form");
const emailButton = document.querySelector(".unique-meal-plan__form__email");
const emailInput = document.querySelector(".email-input-field");

// emailButton.preventDefault();
// emailForm.preventDefault();

 emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  }

  xhr.open("POST", "/sendEmail", true);
  xhr.setRequestHeader("Content-Type", "x-www-form-urlencoded");
  xhr.send(JSON.stringify({email: emailInput.value}));
});



// emailButton.addEventListener('click', (e) => {
//   e.preventDefault()
//   console.log('refresh success');
// })

const cookieHandler = id => {
  document.cookie.includes(`recipe${id}=true`)
    ? (document.cookie = `${id}=false`)
    : (document.cookie = `${id}=true`);
};
