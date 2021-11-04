const backButton = document.querySelector('#backButton');

const backOnePage = () => {
  console.log(`you are on ${window.location}`);
  window.history.back();
}

backButton.addEventListener('click', backOnePage)