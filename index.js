const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  // URL der API

  const URL =
    // "https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/";
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  // Get limit
  const searchLimit = document.getElementById("limit").value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input

  if (searchTerm == "") {
    // Show message
    showResult(URL, searchLimit);
  } else {
    showResult(URL, 100, searchTerm.toLowerCase());
  }
  // Clear field
  searchInput.value = "";

  e.preventDefault();
});

function showResult(url, limit = 100, search) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => show(data, limit, search));
}

function show(data, limit, search) {
  console.log(data, limit, search);
  let output = '<div class="row">';

  if (search) {
    data = data.filter((el) => el.name.toLowerCase().includes(search));
  } else data = data.slice(0, limit);

  data.forEach((post) => {
    output += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="card mb-2">
     
      <div class="card-body">
        <h5 class="card-title">${post.name}</h5>
        <span class="badge badge-info">Rank: ${post.market_cap_rank}</span>
       
        <hr>
        <span class="badge badge-secondary">Price USD: ${post.current_price}</span> 
        <span class="badge badge-success">24 change: ${post.price_change_24h}</span>
        <span class="badge badge-warning">24h % change: ${post.price_change_percentage_24h}</span>      
        
      </div>
    </div>
    </div>
      `;
  });
  output += "</div>";
  document.getElementById("results").innerHTML = output;
}
