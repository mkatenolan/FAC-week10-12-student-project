const emailForm = document.querySelector(".form__unique-meal-plan");
const emailButton = document.querySelector(".unique-meal-plan__form__email");
const emailInput = document.querySelector(".email-input-field");
const url = window.location.href;

emailForm.addEventListener("submit", e => {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };

  xhr.open("POST", "/sendEmail", true);
  xhr.setRequestHeader("Content-Type", "x-www-form-urlencoded");
  xhr.send(JSON.stringify({ email: emailInput.value, url }));
});
