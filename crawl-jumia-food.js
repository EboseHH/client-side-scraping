const restaurants = Array.from(document.querySelectorAll("h3.name")).map(rest => ({name: rest.innerText}))
const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
const header = Object.keys(restaurants[0])
const csv = [
  header.join(','), // header row first
  ...restaurants.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')

window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(csv))
