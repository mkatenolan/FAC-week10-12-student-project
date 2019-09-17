const planForm = document.querySelector(".second-choices__form");
const planName = document.querySelector(".second-choices__name-plan");

planForm.addEventListener("submit", e => {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };

  xhr.open("POST", "/submitmealplan", true);
  xhr.setRequestHeader("Content-Type", "x-www-form-urlencoded");
  xhr.send(JSON.stringify({ planName: planName.value }));
});

document.querySelectorAll(".recipe__select").forEach(button => {
  button.addEventListener("click", e => {
    console.log("Clicked");
    if (document.cookie.includes(button.id)) {
      let oldString = document.cookie;
      let newString = oldString.replace(`+${button.id}`, "");
      document.cookie = newString;
    } else if (document.cookie.split("+").length > 5) {
      window.alert("Please select an additional 3 recipes");
    } else {
      document.cookie = `${document.cookie}+${button.id}`;
    }
    console.log("Cookie: ", document.cookie);
  });
});

document
  .querySelector(".newplan__nav_buttons__next")
  .addEventListener("click", e => {
    if (document.cookie.split("+").length !== 5) {
      e.preventDefault();
      window.alert("Please select an additional 3 recipes");
    }
  });
