const emailButton = document.querySelector(".unique-meal-plan__form");

emailButton.preventDefault();

const cookieHandler = id => {
  document.cookie.includes(`recipe${id}=true`)
    ? (document.cookie = `${id}=false`)
    : (document.cookie = `${id}=true`);
};
