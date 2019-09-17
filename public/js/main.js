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

document.cookie = 'recipes='
document.querySelectorAll('.recipe__select').forEach(button => {
  button.addEventListener('click', (e) => {
    if (document.cookie.includes(button.id)) {
      let oldString = document.cookie;
      let newString = oldString.replace(`+${button.id}`, "");
      document.cookie = newString;
    }
    else if (document.cookie.split('+').length > 2) {
        window.alert("Please select two recipes only");
    } else {
      document.cookie = `${document.cookie}+${button.id}`
    }
    console.log('Cookie: ', document.cookie);
  })
})
