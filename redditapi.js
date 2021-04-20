export default {
  search: function (searchTerm, searchLimit, sortBy, time) {
    return fetch(
      `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}&t=${time}`
    )
      .then((res) => res.json())
      .then((data) => data.data.children.map((data) => data.data))
      .catch((err) => console.log(err));
  },
};
