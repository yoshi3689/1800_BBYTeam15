// carly's code
const showDetails = () => {
  let params = new URL(window.location.href);
  let id = params.searchParams.get("id");
  let collection = params.searchParams.get("collection");
  console.log(params);
  console.log(collection);
  console.log(id);


  db.collection(collection).doc(id).get().then(tip => {
    // console.log(tip.data());
    // const tip = doc.data();
      const name = tip.data().name;
      const categories = tip.data().categories;
      const type = tip.data().type;
      const time = tip.data().time;
      const image = tip.data().image;
      const description = tip.data().description;
      console.log(document.getElementById("tipImg"))

      // the below has to be double quotes
    document.getElementById("tipImg").src = ("src", "/" + image);
    console.log(document.getElementById("tipImg"))
    document.getElementById("tipDetails").innerHTML = description;
    document.getElementById("tipName").innerHTML = name;
    document.getElementById("tipTIme").innerHTML = time;
    document.getElementById("tipType").innerHTML = type;
  })  
}

showDetails();
