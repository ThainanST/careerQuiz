const questions = [
  {
    text: "Em um projeto de engenharia, o que mais te empolga?",
    options: {
      A: "Montar e programar placas com sensores.",
      B: "Fazer simulações para controlar robôs ou sistemas.",
      C: "Calcular a eficiência de transformadores e linhas de transmissão.",
      D: "Entender como sinais de dados viajam por antenas e redes."
    }
  },
  {
    text: "Qual dessas atividades parece mais divertida para você?",
    options: {
      A: "Criar um circuito com LEDs que piscam em sequência.",
      B: "Controlar o equilíbrio de um braço robótico.",
      C: "Calcular o consumo elétrico de uma cidade.",
      D: "Criar uma rede de comunicação entre dispositivos."
    }
  },
  {
    text: "Qual dessas frases combina mais com seu jeito de pensar?",
    options: {
      A: "Pequenos componentes podem fazer coisas incríveis.",
      B: "Gosto de prever o comportamento de sistemas.",
      C: "Quanto mais energia, maior o desafio!",
      D: "Comunicar à distância é mágico e fascinante."
    }
  },
  {
    text: "Se você fosse construir algo, seria...",
    options: {
      A: "Um gadget com sensores e microcontrolador.",
      B: "Um sistema autônomo com controle de feedback.",
      C: "Um sistema de geração e distribuição de energia.",
      D: "Uma rede sem fio entre dispositivos inteligentes."
    }
  },
  {
    text: "Qual dessas situações te daria mais orgulho?",
    options: {
      A: "Ver um circuito seu funcionando perfeitamente.",
      B: "Fazer um sistema controlar variáveis sozinho.",
      C: "Garantir que a energia chegue sem falhas a muitos lugares.",
      D: "Ajudar a criar uma internet mais rápida e estável."
    }
  }
];

const profiles = {
  A: {
    title: "Eletrônica",
    icon: "assets/img/electronics.svg",
    description: "Gosta de circuitos, sensores e dispositivos inteligentes. Provavelmente se daria bem em projetos com Arduino, automação residencial, robótica e microcontroladores."
  },
  B: {
    title: "Controle",
    icon: "assets/img/control.svg",
    description: "Você gosta de sistemas que pensam sozinhos e se ajustam automaticamente. Provavelmente se daria bem programando controladores automáticos, sistemas embarcados ou robôs autônomos."
  },
  C: {
    title: "Potência",
    icon: "assets/img/power.svg",
    description: "Energia em grande escala é com você! Se interessa por como usinas geram eletricidade, como ela é distribuída até nossas casas e como tornar esse processo mais eficiente."
  },
  D: {
    title: "Telecomunicações",
    icon: "assets/img/telecom.svg",
    description: "Você se interessa por como os dados viajam pelo ar, cabos ou fibras ópticas. Gosta de entender como funciona a internet, o Wi-Fi, o 5G, e como conectar tudo com eficiência."
  }
};

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
