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
});

document.querySelector('.newplan__nav_buttons__next').addEventListener('click', (e) => {
  if (document.cookie.split('+').length !== 3) { 
    e.preventDefault();
    window.alert("Please select two recipes");
  }
});