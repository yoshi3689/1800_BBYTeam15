// displays the details of a tip clicked on the previous page
const showDetails = () => {
  let params = new URL(window.location.href);
  let id = params.searchParams.get("id");
  let collection = params.searchParams.get("collection");

  db.collection(collection).doc(id).get().then(tip => {
      const name = tip.data().name;
      const type = tip.data().type;
      const time = tip.data().time;
      const image = tip.data().image;
      const description = tip.data().description;
      console.log(document.getElementById("tipImg"))

    document.getElementById("tipImg").src = ("src", "/" + image);
    console.log(document.getElementById("tipImg"))
    document.getElementById("tipDetails").innerHTML = description;
    document.getElementById("tipName").innerHTML = name;
    document.getElementById("tipTIme").innerHTML = time;
    document.getElementById("tipType").innerHTML = type;
  })  
}

showDetails();