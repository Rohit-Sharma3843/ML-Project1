let isday;
let dates_api;
let daily_temp_max_api;
let daily_temp_min_api;
let daily_sunset_api;
let daily_sunrise_api;
let input = document.querySelector("#city");
let weather = document.querySelector("#weather_img");
let stat_head = document.querySelector("#stat");
let search = document.querySelector("#search_button");
let loc = document.querySelector("#search_val");
let temp_val_now = document.querySelector("#curr_temp");
let hum_val_now = document.querySelector("#hum_val");
let main_stat = document.querySelector("#main_stats");
let w_speed_now = document.querySelector("#w_speed_val");
let cloud_now = document.querySelector("#cloud_val");
let pressure_now = document.querySelector("#pressure_now");
let stat1 = document.querySelector("#stat1");
let stat2 = document.querySelector("#stat2");
let stat3 = document.querySelector("#stat3");
let stat4 = document.querySelector("#stat4");
let stat5 = document.querySelector("#stat5");
let stat6 = document.querySelector("#stat6");
let stat7 = document.querySelector("#stat7");
let today = document.querySelector("#today");
let stat8 = document.querySelector("#stat8");
let left = document.querySelector("#prev");
let right = document.querySelector("#next");
let temp_hourly = document.querySelector("#hourly_temp");
let humidity_hourly = document.querySelector("#hourly_humidity");
let cloud_hourly = document.querySelector("#hourly_c_cover");
let wind_hourly = document.querySelector("#hourly_w_speed");
let stats = [stat1, stat2, stat3, stat4, stat5, stat6, stat7, stat8];
let daily_temp_max = document.querySelectorAll(".max_temp");
let daily_temp_min = document.querySelectorAll(".min_temp");
let daily_sunrise = document.querySelectorAll(".sunrise");
let daily_sunset = document.querySelectorAll(".sunset");
let daily_dates = document.querySelectorAll(".date");
let hist = document.querySelector("#history");
let hist_class = document.querySelector(".history");
let city_name = document.querySelector(".history_city_name");
let seven_day = document.querySelector("#get7");
let day7_stats = document.querySelector("#daily");
let curr_loc = document.querySelector("#curr_loc");
let geo_loc = 0;
let curr = [],
  curr_max = 0,
  unit = "";
let val = 1;
seven_day.addEventListener("click", () => {
  day7_stats.style.display = "block";
});
async function coordinates() {
  search.style.display = "none";
  curr_loc.innerHTML = `<div id="curr_div">
              <p>Searching..</p>
              <img id="cur_loc_img" src="/images/loading.gif" alt="" />
            </div>`;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          let longitude = position.coords.longitude;
          let latitude = position.coords.latitude;
          console.log(longitude + "  " + latitude);

          let res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          let data = await res.json();
          geo_loc = 1;
          get_data("xyz", 1, latitude, longitude, data.display_name);
          geo_loc = 0;
          curr_loc.innerHTML = `<div id="curr_div">
              <p>Use my current location</p>
              <img id="cur_loc_img" src="/images/cur_loc.gif" alt="" />
            </div>`;
          search.style.display = "block";
        } catch (err) {
          console.error("Fetch error:", err);
        }
      },
      (error) => {
        console.log("Geolocation error:", error.message);
      }
    );
  }
}

function set_image(val) {
  let a = ["Temperature", "Wind Speed", "Cloud Cover", "Relative humidity"];
  let b = ["temperature.png", "windy.png", "cloudy.png", "humidity.png"];
  return `<img class="hourly_img" src="/images/${b[val - 1]}" alt="" />
              <span class="hourly_parameter">${a[val - 1]}</span>`;
}
async function get_data(city, geo_loc = 0, p1 = 0, p2 = 0, p3 = "") {
  let api_key, url1, location_resp, geo_data, lat, long, state, place;
  if (geo_loc != 1) {
    api_key = "qfEk0OLTMnlHukAbhFlBVA==4uyJ2jKdsdoMQXpv";
    url1 = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    location_resp = await fetch(url1, {
      method: "GET",
      headers: {
        "X-Api-Key": api_key,
        "Content-Type": "application/json",
      },
    });
    if (!location_resp.ok) {
      today.style.cssText =
        "display:block;font-size: 30px; color: white; text-decoration: underline;border:none;";
      today.innerHTML = "Error in fetching data";
      return;
    }
    geo_data = await location_resp.json();
    console.log(geo_data.length);
    if (geo_data.length == 0) {
      today.style.cssText =
        "display:block;font-size: 30px; color: white; text-decoration: underline;border:none;";
      today.innerHTML = "Error in fetching data";
      return;
    }
    console.log(geo_data);
    lat = geo_data[0].latitude;
    long = geo_data[0].longitude;
    place = geo_data[0].name;
    state = geo_data[0].state;
    country = geo_data[0].country;
  } else {
    lat = p1;
    long = p2;
    place = p3;
    state = "";
    country = "";
  }
  let url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,wind_speed_10m_max&hourly=relative_humidity_2m,wind_speed_10m,temperature_2m,cloud_cover&current=is_day,pressure_msl,temperature_2m,wind_speed_10m,cloud_cover,relative_humidity_2m&daily=sunrise,sunset,temperature_2m_min,temperature_2m_max,weather_code&timezone=auto`;
  let weather_resp = await fetch(url2);
  if (!weather_resp.ok) {
    today.innerHTML = "Error in fetching data";
  }
  let data = await weather_resp.json();
  console.log(data);
  let temperature = data.hourly.temperature_2m;
  let cloud = data.hourly.cloud_cover;
  let wind = data.hourly.wind_speed_10m;
  let humidity = data.hourly.relative_humidity_2m;
  let temp_now = data.current.temperature_2m;
  let rel_humidity_now = data.current.relative_humidity_2m;
  let wind_speed_now = data.current.wind_speed_10m;
  let cloud_now = data.current.cloud_cover;
  let pressure = data.current.pressure_msl;
  let temp_max = data.daily.temperature_2m_max[0];
  let temp_min = data.daily.temperature_2m_min[0];
  let wind_max = data.daily.wind_speed_10m_max[0];
  let temp_today = [];
  let rel_humidity_today = [];
  let wind_speed_today = [];
  let cloud_cover_today = [];
  isday = data.current.is_day;
  dates_api = data.daily.time;
  daily_temp_max_api = data.daily.temperature_2m_max;
  daily_temp_min_api = data.daily.temperature_2m_min;
  daily_sunset_api = data.daily.sunset;
  daily_sunrise_api = data.daily.sunrise;
  for (let i = 0; i < 24; i++) {
    temp_today.push(temperature[i]);
    rel_humidity_today.push(humidity[i]);
    wind_speed_today.push(wind[i]);
    cloud_cover_today.push(cloud[i]);
  }
  today.style.display = "block";
  post_current_data(
    temp_now,
    rel_humidity_now,
    wind_speed_now,
    pressure,
    cloud_now,
    place,
    state,
    country,
    isday
  );
  left.disabled = true;
  temp_hourly.addEventListener("click", () => {
    val = 1;
    main_stat.style.display = "block";
    post_hourly_data(temp_max, temp_today, val, "&deg;C");
    stat_head.innerHTML = set_image(val);
    curr = temp_today;
    curr_max = temp_max;
    unit = "&deg;C";
    left.disabled = true;
    right.disabled = false;
  });
  humidity_hourly.addEventListener("click", () => {
    val = 1;
    main_stat.style.display = "block";
    post_hourly_data(100, rel_humidity_today, val, "%");
    stat_head.innerHTML = set_image(4);
    curr = rel_humidity_today;
    curr_max = 100;
    unit = "%";
    left.disabled = true;
    right.disabled = false;
  });
  wind_hourly.addEventListener("click", () => {
    val = 1;
    main_stat.style.display = "block";
    post_hourly_data(wind_max, wind_speed_today, val, "km/h");
    stat_head.innerHTML = set_image(2);
    curr = wind_speed_today;
    curr_max = wind_max;
    unit = "km/h";
    left.disabled = true;
    right.disabled = false;
  });
  cloud_hourly.addEventListener("click", () => {
    val = 1;
    stat_head.innerHTML = set_image(3);
    main_stat.style.display = "block";
    post_hourly_data(100, cloud_cover_today, val, "%");
    curr = cloud_cover_today;
    curr_max = 100;
    unit = "%";
    left.disabled = true;
    right.disabled = false;
  });
  let value = {
    loc: place,
    st: state,
    nation: country,
    temp: temp_now,
  };
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == place && geo_loc == 0) {
      localStorage.setItem(place, JSON.stringify(value));
      return;
    }
  }
  if (geo_loc == 0) {
    localStorage.setItem(place, JSON.stringify(value));
  }
}
function post_current_data(
  temp,
  humidity,
  wind,
  pressure,
  cloud,
  place,
  state,
  country,
  isday
) {
  loc.innerHTML = place + ", " + state + ", " + country;
  temp_val_now.innerHTML = temp + "&deg;C";
  hum_val_now.innerHTML = humidity;
  w_speed_now.innerHTML = wind;
  cloud_now.innerHTML = cloud;
  pressure_now.innerHTML = pressure;
  if (isday) {
    weather.innerHTML = `<img
            id="weather"
            alt="image not available"
            loading="lazy"
            src="/images/day.png"
          />`;
  } else {
    weather.innerHTML = `<img
            id="weather"
            alt="image not available"
            loading="lazy"
            src="/images/night.png"
          />`;
  }
  for (let i = 0; i < 7; i++) {
    daily_dates[i].innerHTML = dates_api[i];
    daily_temp_max[i].innerHTML = daily_temp_max_api[i] + "&deg;C";
    daily_temp_min[i].innerHTML = daily_temp_min_api[i] + "&deg;C";
    daily_sunrise[i].innerHTML = daily_sunrise_api[i].substring(11) + " hrs";
    daily_sunset[i].innerHTML = daily_sunset_api[i].substring(11) + " hrs";
  }
}
function post_hourly_data(max_temp, temp, phase, unit) {
  let temp_percentages = [];
  let time = [
    "0000",
    "0100",
    "0200",
    "0300",
    "0400",
    "0500",
    "0600",
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
    "2100",
    "2200",
    "2300",
  ];
  for (let i = 0; i < 8; i++) {
    let val = temp[(phase - 1) * 8 + i];
    temp_percentages.push((val * 100) / max_temp);
  }
  for (let i = 0; i < 8; i++) {
    stats[i].querySelector(".time").innerHTML = time[(phase - 1) * 8 + i];
    stats[i].querySelector(
      ".visible_bar"
    ).style.height = `${temp_percentages[i]}%`;
    stats[i].querySelector("span").innerHTML = temp[(phase - 1) * 8 + i] + unit;
  }
}
left.addEventListener("click", () => {
  if (val == 1) {
    return;
  }
  val -= 1;
  right.disabled = false;
  post_hourly_data(curr_max, curr, val, unit);
  if (val == 1) {
    left.disabled = true;
  }
});
right.addEventListener("click", () => {
  if (val == 3) {
    return;
  }
  val += 1;
  left.disabled = false;
  post_hourly_data(curr_max, curr, val, unit);
  if (val == 3) {
    right.disabled = true;
  }
});
input.addEventListener("input", () => {
  storage = [];
  for (let i = 0; i < localStorage.length; i++) {
    let k = localStorage.key(i);
    storage.push(JSON.parse(localStorage.getItem(k)));
  }
  storage = storage.filter((x) =>
    x.loc.toLowerCase().includes(input.value.toLowerCase())
  );
  hist.innerHTML = "";
  for (let i = 0; i < storage.length && i < 5; i++) {
    hist.innerHTML += `<div id="item${
      i + 1
    }" class="history"><div class="history_city">
    <img class="history_img" src="/images/location.png" alt="" />
    <p class="history_city_name"><span class="ct">${
      storage[i].loc || ""
    }</span>, ${storage[i].st || ""}, ${storage[i].nation || ""}</p>
    </div>
    <div class="history_temp">
    <img class="history_img" src="/images/temperature.png" alt="" />
    <p class="history_city_temp">${
      storage[i].temp !== undefined ? storage[i].temp : ""
    }&deg;C</p>
    </div></div>`;
  }
});
hist.addEventListener("mousedown", (e) => {
  const item =
    (e.target && e.target.closest && e.target.closest(".history")) ||
    findHistoryElem(e.target);
  if (!item) return;

  const city =
    item.dataset.loc || item.querySelector(".ct")?.textContent?.trim();
  if (!city) return;
  input.value = city;
  hist.innerHTML = "";
});
document.addEventListener("click", (e) => {
  if (!hist.contains(e.target) && e.target !== input) {
    hist.innerHTML = "";
  }
});

input.addEventListener("blur", () => {
  hist.innerHTML = "";
});
curr_loc.addEventListener("click", async () => {
  await coordinates();
});
search.addEventListener("click", async () => {
  search.innerHTML = `<img class="gif" src="/images/loading.gif" alt="" />`;
  await get_data(input.value);
  search.innerHTML = `<img class="gif" src="/images/search.gif" alt="" />`;
});
