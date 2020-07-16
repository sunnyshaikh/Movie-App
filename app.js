$(document).ready(function () {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios
    .get(`http://www.omdbapi.com?apikey=${API_KEY}&s=` + searchText)
    .then((response) => {
      let movies = response.data.Search;
      let output = "";
      $.each(movies, function (index, movie) {
        output += `
				<div class="col-md-6 col-lg-4 col-sm-6">
					<div class="well text-center bg-light px-3 py-4 my-2">
						<img src="${movie.Poster}">
						<h5>${movie.Title}</h5>
						<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
					</div>
				</div> 
			`;
      });
      $("#resultsCount").text(movies.length + " results found");
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
