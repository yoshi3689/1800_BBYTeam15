const backButton = document.querySelector('#backButton');

// redirects the user to the previous page.
const backOnePage = () => {
  console.log(`you are on ${window.location}`);
  window.history.back();
}

backButton.addEventListener('click', backOnePage)