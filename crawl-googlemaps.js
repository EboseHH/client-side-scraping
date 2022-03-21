const AREA_CACHE_CODE = 113;

let locations;
let restaurants = [];

// This selector targets the element that holds name of restaurant (or place)
locations = document.getElementsByClassName(
  "MVVflb-haAclf V0h1Ob-haAclf-d6wfac MVVflb-haAclf-uxVfW-hSRGPd"
);
Array.from(locations).forEach((location) => {
  restaurants.push({ name: location.getAttribute("aria-label") });
});

// This selector targets the element that holds address of restaurant (or place)
locations = Array.from(document.querySelectorAll(".CUwbzc-content.gm2-body-2"))
              .map((location) => location.querySelector('.ZY2y6b-RWgCYc > .ZY2y6b-RWgCYc'));

// Multiple elements per restaurant are selected, but only the last one contains the address.
// A little messy. Can definitely be cleaned up.
let i = 0;
locations.forEach((location) => {
  address = location.querySelectorAll('span[jstcache="' + AREA_CACHE_CODE + '"]');
  arrayAdd = Array.from(address);
  arrayAdd.reverse();
  restaurants[i].address = arrayAdd[0].innerText;
  i++;
});


// Download scraped info into a CSV
const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
const header = Object.keys(restaurants[0])
const csv = [
  header.join(','), // header row first
  ...restaurants.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')

window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(csv))
