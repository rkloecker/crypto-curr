const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

// URL der API
const API_URL =
  // "https://cors-anywhere.herokuapp.com/...";
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

document.getElementById("results").addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target);
  // console.log(e.target.dataset);
  const currname = e.target.dataset.currname;
  console.log(currname);
  showResult(API_URL, null, null, currname);
});

searchForm.addEventListener("submit", (e) => {
  // Get limit
  const searchLimit = document.getElementById("limit").value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input

  if (searchTerm == "") {
    // Show message
    showResult(API_URL, searchLimit);
  } else {
    showResult(API_URL, 100, searchTerm.toLowerCase());
  }
  // Clear field
  searchInput.value = "";

  e.preventDefault();
});

function showResult(url, limit = 100, search, cname) {
  document.getElementById("results").innerHTML = "loading...";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (cname) showDetail(data, cname);
      else show(data, limit, search);
    })
    .catch((error) => console.log(error));
}

function show(data, limit, search) {
  console.log(data, limit, search);
  let output = '<div class="row">';

  if (search) {
    data = data.filter((el) => el.name.toLowerCase().includes(search));
  } else data = data.slice(0, limit);

  data.forEach((post) => {
    output += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card mb-2">
     
      <div  class="card-body">
        <h5 class="card-title"><a data-tooltip="Show Details" data-currname="${
          post.id
        }">${post.name}</a></h5>
        <h4><span class="badge badge-info">Rank: ${
          post.market_cap_rank
        }</span></h4>
       
        <hr>
        <h4><span class="badge badge-sec">Price USD: ${post.current_price.toFixed(
          2
        )}</span></h4> 
        <h4><span class="badge badge-info">24 change: ${post.price_change_24h.toFixed(
          2
        )}</span></h4>
        <h4><span class="badge badge-sec">24h % change: ${post.price_change_percentage_24h.toFixed(
          2
        )}</span></h4>     
        
      </div>
    </div>
    </div>
      `;
  });
  output += "</div>";
  document.getElementById("results").innerHTML = output;
}

function showDetail(data, cname) {
  console.log(data, cname);
  const post = data.find((el) => el.id == cname);
  let output = "";

  /* ath: 64805
ath_change_percentage: -38.576
ath_date: "2021-04-14T11:54:46.763Z"
atl: 67.81
atl_change_percentage: 58602.61315
atl_date: "2013-07-06T00:00:00.000Z"
circulating_supply: 18735531
current_price: 39885
fully_diluted_valuation: 835918754027
high_24h: 41117
id: "bitcoin"
image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
last_updated: "2021-06-15T12:01:36.944Z"
low_24h: 39182
market_cap: 745780082359
market_cap_change_24h: 9140915980
market_cap_change_percentage_24h: 1.24089
market_cap_rank: 1
max_supply: 21000000
name: "Bitcoin"
price_change_24h: 598.65
price_change_percentage_24h: 1.52382
roi: null
symbol: "btc"
total_supply: 21000000
total_volume: 43164370255 */

  output += `
   
      <div class="card mb-2">
     
      <div  class="card-body">
        <h3 class="card-title"><a data-currname="${post.id}">${
    post.name
  }</a></h3>
        <img src="${post.image}">
        <h2><span class="badge badge-info">Rank: ${
          post.market_cap_rank
        }</span></h2>
       
        <hr>
        <h2><span class="badge badge-sec">Price USD: ${post.current_price.toFixed(
          2
        )}</span></h2>
        <h2><span class="badge badge-info">24 change: ${post.price_change_24h.toFixed(
          2
        )}</span></h2>
        <h2><span class="badge badge-sec">24h % change: ${post.price_change_percentage_24h.toFixed(
          2
        )}</span></h2>
        <h2><span class="badge badge-info">low/high 24h: ${post.low_24h.toFixed(
          2
        )} - ${post.high_24h.toFixed(2)}</span></h2>    
        
      </div>
    </div>
   
      `;

  document.getElementById("results").innerHTML = output;
}
