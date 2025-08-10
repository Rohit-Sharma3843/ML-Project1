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
let curr = [], curr_max = 0, unit = "";
let val = 1;

function set_image(val) {
  let a = ["Temperature", "Wind Speed", "Cloud Cover", "Relative humidity"];
  let b = ["temperature.png", "windy.png", "cloudy.png", "humidity.png"];
  return `<img class="hourly_img" src="/images/${b[val - 1]}" alt="" />
              <span class="hourly_parameter">${a[val - 1]}</span>`;
}

async function get_data(city) {
  let location_resp = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`);
  if (!location_resp.ok) {
    today.style.cssText = "display:block;font-size: 30px; color: white; text-decoration: underline;border:none;";
    today.innerHTML = "Error in fetching location data";
    return;
  }
  let geo_data = await location_resp.json();
  if (geo_data.length === 0) {
    today.style.cssText = "display:block;font-size: 30px; color: white; text-decoration: underline;border:none;";
    today.innerHTML = "City not found";
    return;
  }

  let lat = geo_data[0].latitude;
  let long = geo_data[0].longitude;
  let weather_resp = await fetch(`/api/weather?lat=${lat}&lon=${long}`);
  if (!weather_resp.ok) {
    today.innerHTML = "Error in fetching weather data";
    return;
  }
  let data = await weather_resp.json();

  let place = geo_data[0].name;
  let state = geo_data[0].state || "";
  let country = geo_data[0].country || "";

  let temperature = data.hourly.temperature_2m;
  let cloud = data.hourly.cloud_cover;
  let wind = data.hourly.wind_speed_10m;
  let humidity = data.hourly.relative_humidity_2m;

  let temp_now = data.current.temperature_2m;
  let rel_humidity_now = data.current.relative_humidity_2m;
  let wind_speed_now_val = data.current.wind_speed_10m;
  let cloud_now_val = data.current.cloud_cover;
  let pressure = data.current.pressure_msl;

  let temp_max = data.daily.temperature_2m_max[0];
  let wind_max = data.daily.wind_speed_10m_max[0];

  let temp_today = temperature.slice(0, 24);
  let rel_humidity_today = humidity.slice(0, 24);
  let wind_speed_today = wind.slice(0, 24);
  let cloud_cover_today = cloud.slice(0, 24);

  let isday = data.current.is_day;

  today.style.display = "block";
  post_current_data(temp_now, rel_humidity_now, wind_speed_now_val, pressure, cloud_now_val, place, state, country, isday);

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
}

function post_current_data(temp, humidity, wind, pressure, cloud, place, state, country, isday) {
  loc.innerHTML = place + (state ? ", " + state : "") + ", " + country;
  temp_val_now.innerHTML = temp + "&deg;C";
  hum_val_now.innerHTML = humidity;
  w_speed_now.innerHTML = wind;
  cloud_now.innerHTML = cloud;
  pressure_now.innerHTML = pressure;
  weather.innerHTML = `<img id="weather" alt="image not available" loading="lazy" src="/images/${isday ? "day" : "night"}.png" />`;
}

function post_hourly_data(max_temp, temp, phase, unit) {
  let temp_percentages = [];
  let time = ["0000","0100","0200","0300","0400","0500","0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300"];
  for (let i = 0; i < 8; i++) {
    let val = temp[(phase - 1) * 8 + i];
    temp_percentages.push((val * 100) / max_temp);
  }
  for (let i = 0; i < 8; i++) {
    stats[i].querySelector(".time").innerHTML = time[(phase - 1) * 8 + i];
    stats[i].querySelector(".visible_bar").style.height = `${temp_percentages[i]}%`;
    stats[i].querySelector("span").innerHTML = temp[(phase - 1) * 8 + i] + unit;
  }
}

left.addEventListener("click", () => {
  if (val === 1) return;
  val -= 1;
  right.disabled = false;
  post_hourly_data(curr_max, curr, val, unit);
  if (val === 1) left.disabled = true;
});

right.addEventListener("click", () => {
  if (val === 3) return;
  val += 1;
  left.disabled = false;
  post_hourly_data(curr_max, curr, val, unit);
  if (val === 3) right.disabled = true;
});

search.addEventListener("click", async () => {
  search.innerHTML = `<img class="gif" src="/images/loading.gif" alt="" />`;
  await get_data(input.value);
  search.innerHTML = `<img class="gif" src="/images/search.gif" alt="" />`;
});
