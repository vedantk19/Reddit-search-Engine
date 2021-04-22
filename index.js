import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById("limit").value;
  const time = document.getElementById("Time").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  reddit.search(searchTerm, searchLimit, sortBy, time).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    results.forEach((post) => {
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://rdwgroup.com/wp-content/uploads/2018/10/reddit2-800x450-1.png";

      output += `<div class="card reddit">
                 <a href="http://www.reddit.com${
                   post.permalink
                 }" target="_blank"><img src="${image}" class="card-img-top" alt="..."></a>
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${truncateText(post.selftext, 100)}</p>
                  <a href="${
                    post.url
                  }" target="_blank" id="cardbtn" class="btn btn-block mt-4">Read more</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit: ${
                    post.subreddit
                  }</span>
                  <span class="badge badge-score">Score: ${post.score}  Ups: ${
        post.ups
      }</span>
                </div>
              </div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 1000);
}

function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
