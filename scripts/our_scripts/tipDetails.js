const showDetails = () => {
  let params = new URL(window.location.href);
  let id = params.searchParams.get("id");
  let collection = params.searchParams.get("collection");

  let message = "Collection is: " + collection;
  message += "Document id is:  " + id;
  // adding the fetched text into the element specified below
  document.getElementById("tipDetails").innerHTML = message;
}

showDetails();