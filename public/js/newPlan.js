document.cookie = 'recipes='
document.querySelectorAll('.btn__newplan-select').forEach(button => {

  button.addEventListener('click', (e) => {
    if (document.cookie.includes(button.id)) {
      let oldString = document.cookie;
      let newString = oldString.replace(`+${button.id}`, "");
      document.cookie = newString;
      button.value = "Select";
      button.setAttribute("style", "background-color: #F26157;");
    }
    else if (document.cookie.split('+').length > 2) {
        window.alert("Please select two recipes only");
    } else {
      document.cookie = `${document.cookie}+${button.id}`;
      button.value = "Undo";
      button.setAttribute("style", "background-color: white; color: #F26157;");
    }
    console.log('Cookie: ', document.cookie);
  })
});

document.querySelector('.btn__next__new-plan').addEventListener('click', (e) => {
  if (document.cookie.split('+').length !== 3) {
    e.preventDefault();
    window.alert("Please select two recipes");
  }
});
