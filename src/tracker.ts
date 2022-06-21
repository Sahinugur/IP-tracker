import * as L from 'leaflet'; 
import { IPv4 } from "ip-num/IPNumber";
//DOM Elements
const enteredIp = <HTMLInputElement>document.getElementById("enteredIp");
const searchBtn = <HTMLButtonElement>document.getElementById("searchBtn");

const updatedIp = <HTMLSpanElement>document.getElementById("updatedIp");
const updatedLocation = <HTMLSpanElement>document.getElementById("updatedLocation");
const updatedTimezone = <HTMLSpanElement>document.getElementById("updatedTimezone");
const updatedISP = <HTMLSpanElement>document.getElementById("updatedISP");

/* Leaflet.js map and tiles*/
const map = L.map("mapID").setView([51.505, -0.09], 4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

/* fetching data from ip-api */

async function getData(ipNumber:any) {
  let ipv4 = new IPv4(ipNumber)
  let api_url = `http://ip-api.com/json/${ipv4}`;
  const response = await fetch(api_url);
  const data = await response.json();
  const { lat, lon, city, country, timezone, isp, query, zip } = data;

  if (data.status === "success") {
    marker.setLatLng([lat, lon]);

    updatedLocation.textContent = `${country} ${city} ${zip}`;
    updatedIp.textContent = query;
    updatedTimezone.textContent = timezone;
    updatedISP.textContent = isp;
  } else if (data.status === "fail") {
    alert("invalid query! Please enter a valid IP adress");
  }
}

//trigger the function whwn user click

searchBtn.addEventListener("click", (e:Event) => {
  e.preventDefault();
  
  
  if (enteredIp.valueAsNumber !== null) {
    return getData(enteredIp.value);
  } else {
    alert("The Ip address you entered not valid");
  }
});





module.exports = getData;
