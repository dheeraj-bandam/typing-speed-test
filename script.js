let startTime, endTime;

const targetText = document.getElementById("targetText").innerText;
const inputBox = document.getElementById("userInput");
const startBtn = document.getElementById("startBtn");
const timeTakenEl = document.getElementById("timeTaken");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

startBtn.addEventListener("click", () => {
  inputBox.disabled = false;
  inputBox.value = "";
  inputBox.focus();
  startTime = new Date().getTime();
  
  startBtn.disabled = true;

  inputBox.addEventListener("input", () => {
    if (inputBox.value.length >= targetText.length) {
      endTime = new Date().getTime();
      calculateResults();
      inputBox.disabled = true;
      startBtn.disabled = false;
    }
  });
});

function calculateResults() {
  const timeTaken = (endTime - startTime) / 1000;
  const userInput = inputBox.value;

  let correctChars = 0;
  for (let i = 0; i < targetText.length; i++) {
    if (userInput[i] === targetText[i]) {
      correctChars++;
    }
  }

  const words = userInput.length / 5;
  const wpm = Math.round(words / (timeTaken / 60));
  const accuracy = ((correctChars / targetText.length) * 100).toFixed(2);

  timeTakenEl.textContent = timeTaken.toFixed(2);
  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = accuracy;
}
