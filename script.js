document.addEventListener('DOMContentLoaded', function () {
  const ageInput = document.getElementById('age');
  const yearsInput = document.getElementById('years');
  const payInput = document.getElementById('pay');
  const resultOutput = document.getElementById('result');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const rateButtons = document.querySelectorAll('.rate-btn');

  let selectedRateYear = "2025";

  // Rate year selection
  rateButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      rateButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRateYear = btn.dataset.year;
    });
  });

  // Calculate statutory redundancy pay
  calculateBtn.addEventListener('click', function () {
    const age = parseInt(ageInput.value);
    const years = parseInt(yearsInput.value);
    let pay = parseFloat(payInput.value);
    const rateYear = selectedRateYear;

    // Weekly pay caps for Great Britain
    const caps = {
      "2025": 719,
      "2026": 751
    };

    const maxWeeklyPay = caps[rateYear];
    const maxYears = 20;

    // Validate inputs
    if (isNaN(age) || isNaN(years) || isNaN(pay)) {
      resultOutput.textContent = 'Please fill in all fields correctly.';
      return;
    }

    if (age < 16 || age > 100) {
      resultOutput.textContent = 'Age must be between 16 and 100.';
      return;
    }

    if (years < 0 || years > 50) {
      resultOutput.textContent = 'Years of service must be between 0 and 50.';
      return;
    }

    if (pay < 0) {
      resultOutput.textContent = 'Weekly pay must be a positive number.';
      return;
    }

    // Apply statutory weekly pay cap
    pay = Math.min(pay, maxWeeklyPay);

    // Calculate total weeks
    const effectiveYears = Math.min(years, maxYears);
    let totalWeeks = 0;

    for (let i = 0; i < effectiveYears; i++) {
      const yearAge = age - i - 1;

      if (yearAge < 22) {
        totalWeeks += 0.5;
      } else if (yearAge < 41) {
        totalWeeks += 1;
      } else {
        totalWeeks += 1.5;
      }
    }

    // Calculate redundancy payment
    const redundancyPay = (totalWeeks * pay).toFixed(2);

    // Format display year
    const displayYear = rateYear === "2025" ? "25-26" : "26-27";

    // Disclaimer for 2025-2026
    const disclaimer = rateYear === "2025"
      ? "The stated rate will remain in effect until 05 April 2026."
      : "";

    // Display result
    resultOutput.innerHTML =
      `Statutory Redundancy Pay (GB ${displayYear}): £${redundancyPay} (${totalWeeks} weeks)` +
      (disclaimer ? `<br><em>${disclaimer}</em>` : "");
  });

  // Reset calculator
  resetBtn.addEventListener('click', function () {
    ageInput.value = '';
    yearsInput.value = '';
    payInput.value = '';
    resultOutput.textContent = '';

    rateButtons.forEach(b => b.classList.remove('active'));
    rateButtons[0].classList.add('active');

    selectedRateYear = "2025";
  });
});
