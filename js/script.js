let currentQuestion = 0;
let answers = [];

function startTest() {
  document.getElementById("intro").classList.remove("active");
  document.getElementById("question").classList.add("active");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionNumber").innerText = currentQuestion + 1;
  document.getElementById("questionText").innerText = q.text;
  const form = document.getElementById("optionsForm");
  form.innerHTML = "";
  const shuffledOptions = Object.entries(q.options).sort(() => Math.random() - 0.5);

  shuffledOptions.forEach(([key, value]) => {
    const id = `option-${key}`;
    form.innerHTML += `
      <label><input type="radio" name="option" value="${key}" onchange="highlightOption(this)"><span>${value}</span></label>
    `;
  });

  updateDots();
}

function highlightOption(input) {
  document.querySelectorAll("input[name='option'] + span").forEach(span => {
    span.style.backgroundColor = "#eee";
    span.style.color = "black";
  });
  input.nextElementSibling.style.backgroundColor = "#004466";
  input.nextElementSibling.style.color = "white";
}

function nextQuestion() {
  const selected = document.querySelector("input[name='option']:checked");
  if (!selected) return;
  answers[currentQuestion] = selected.value;
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion === 0) {
    document.getElementById("question").classList.remove("active");
    document.getElementById("intro").classList.add("active");
  } else {
    currentQuestion--;
    showQuestion();
  }
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentQuestion);
  });
}

function showResult() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(ans => counts[ans]++);
  const maxKey = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
  const profile = profiles[maxKey];

  document.getElementById("resultTitle").innerText = profile.title;
  document.getElementById("resultDescription").innerText = profile.description;
  document.getElementById("resultIcon").src = profile.icon;

  document.getElementById("question").classList.remove("active");
  document.getElementById("result").classList.add("active");
}

function restartTest() {
  currentQuestion = 0;
  answers = [];
  document.getElementById("result").classList.remove("active");
  document.getElementById("intro").classList.add("active");
}
