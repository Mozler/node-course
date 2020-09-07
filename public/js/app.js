const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const msgOne = document.getElementById("messageOne");
const msgTwo = document.getElementById("messageTwo");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchLocation.value.length > 0) {
    msgOne.textContent = "loading...";
    msgTwo.textContent = "";
    fetch("/weather?address=" + searchLocation.value).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.temperature;
        }
      });
    });
    searchLocation.value = "";
  } else {
    msgOne.textContent = "Please provide an address";
    msgTwo.textContent = "";
  }
});
