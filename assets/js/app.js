const input = document.getElementById("input");
const select = document.getElementById("select");
const button = document.getElementById("button");
const result = document.getElementById("result");

async function getWeather(url) {
  let promise = await fetch(url);
  let response = await promise.json();
  if (promise.status == 400) {
    result.innerHTML = "Not Found!";
  }
  return response;
}

button.addEventListener("click", change);

async function change(e) {
  e.preventDefault();

  let response = await getWeather(
    "https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=" +
      `${input.value}`
  );

  if (result.innerHTML != "Not Found!") {
    if (select.value in response.current) {
      result.innerHTML = "";
      var spirt;
      if (select.value == "temp_c") {
        spirt = response.current.temp_c;
      } else {
        spirt = response.current.temp_f;
      }
      result.innerHTML += `
                <p>City: ${response.location.name}</p>
                    <p>Country:${response.location.country}</p>
                    <p>Weather forecast:${spirt}</p>
                    <p>Sky ConditionI<img src="${response.current.condition.icon}" alt="">${response.current.condition.text}</p>
                `;
    }
  }
}
