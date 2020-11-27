/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "f2ee3a4ba3d60f00652cb1d048a6642b&units=metric";
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// 94040&appid=f2ee3a4ba3d60f00652cb1d048a6642b
// async GET function
const getWeather = async (baseURL, zipCode, apiKey) => {
  console.log(`${baseURL}${zipCode}${apiKey}`);
  const res = await fetch(`${baseURL}${zipCode}&appid=${apiKey}`);
  const data = await res.json();
  return data;
};

//  async POST function
const postLocation = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    console.log(res);
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log("error here", err);
  }
};

// async Updating element in the page
const updatePage = async () => {
  const req = await fetch("/recent");
  try {
    const displayRecent = await req.json();
    // console.log(displayRecent.temp);
    document.getElementById("date").innerHTML = displayRecent.date;
    document.getElementById("temp").innerHTML = displayRecent.temp;
    document.getElementById("content").innerHTML = displayRecent.userResponse;
  } catch (err) {
    console.log(err);
  }
};

generate.addEventListener("click", () => {
  let zipCode = document.getElementById("zip").value;
  getWeather(baseURL, zipCode, apiKey).then(function(data) {
    postLocation("/add", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: document.getElementById("feelings").value
    }).then(updatePage());
  });
});
