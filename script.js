document.addEventListener('DOMContentLoaded', function () {

  alert('JavaScript is working');

  const calculateBtn = document.getElementById('calculateBtn');
  const resultOutput = document.getElementById('result');

  calculateBtn.addEventListener('click', function () {
    resultOutput.textContent = 'The Calculate button is working!';
  });

});
