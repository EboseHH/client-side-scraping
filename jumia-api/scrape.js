const ObjectsToCsv = require('objects-to-csv');

fetch(
  "https://api.food.jumia.com.ng/api/v6/vendors?&brand=jumiafood&hid=foodjumiacomng&tracking_id=a65dfe6ccf3c4f41a3e5d0b41196636a&language_id=1&chain_id=&city_id=&include=&serialize_null=false",
  {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,fr;q=0.8",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-fp-api-key": "HTML5",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://food.jumia.com.ng/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  }
)
  .then((response) => response.json())
  .then((data) => {
    const restIds = data.data.items.map((item) => item.code);
    Promise.all(
      restIds.map((id) =>
        fetch(
          `https://api.food.jumia.com.ng/api/v6/vendors/${id}?brand=jumiafood&hid=foodjumiacomng&tracking_id=a9ede26be6f540818bb7b118db5c1010&language_id=1&include=payment_types,discounts,cuisines,food_characteristics,payment_types,metadata,schedules,menus,menu_categories&serialize_null=false`,
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,fr;q=0.8",
              "sec-ch-ua":
                '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": '"Android"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-fp-api-key": "HTML5",
              "x-requested-with": "XMLHttpRequest",
              Referer: "https://food.jumia.com.ng/",
              "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
          }
        ).then((resp) => resp.json())
      )
    ).then(async (restaurants) => {
      const data = restaurants.map((restaurant) => ({
        name: restaurant.data.name,
        address: restaurant.data.address,
      }))
      const csv = new ObjectsToCsv(data);
      // Save to file:
      await csv.toDisk('./restaurants-vi.csv');
    });
  });
