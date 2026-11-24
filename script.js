// JUNI WEBSITE CUSTOMISATION
// Edit the questions, options, correct answers and hints below.
// For the photo gallery, place your own images in assets/photos/ using the filenames shown in index.html.

const puzzleQuestions = [
  { question: "In our world, what does 1 + 1 equal?", options: ["2", "3", "11"], answer: "3", hint: "Our maths has its own rules." },
  { question: "What's the best thing about an inside joke?", options: ["Only we understand it", "It needs explaining", "It's serious business"], answer: "Only we understand it", hint: "It's a little piece of our world." },
  { question: "What should we collect more of?", options: ["Little memories", "Unread messages", "Arguments"], answer: "Little memories", hint: "The good little things." },
  { question: "What makes an ordinary conversation special?", options: ["The person on the other side", "Perfect grammar", "A maths textbook"], answer: "The person on the other side", hint: "It's not really about the words." },
  { question: "What's one thing I want you to know?", options: ["Your feelings matter", "You must always be okay", "You have to forgive quickly"], answer: "Your feelings matter", hint: "The answer should make you feel heard." }
];

let currentQuestion = 0;
let selectedAnswer = "";

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextQuestion");
const progressEl = document.getElementById("qProgress");
const countEl = document.getElementById("qCount");

function renderQuestion() {
  const q = puzzleQuestions[currentQuestion];
  selectedAnswer = "";
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  countEl.textContent = `QUESTION ${currentQuestion + 1} OF ${puzzleQuestions.length}`;
  progressEl.style.width = `${(currentQuestion / puzzleQuestions.length) * 100}%`;
  nextBtn.disabled = true;
  nextBtn.style.opacity = ".45";
  nextBtn.textContent = "That's my answer";
  q.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = option;
    button.addEventListener("click", () => {
      selectedAnswer = option;
      document.querySelectorAll(".choice").forEach(el => el.classList.remove("selected"));
      button.classList.add("selected");
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
      feedbackEl.textContent = "";
    });
    choicesEl.appendChild(button);
  });
}

nextBtn.addEventListener("click", () => {
  if (!selectedAnswer) return;
  const q = puzzleQuestions[currentQuestion];
  if (selectedAnswer.trim().toLowerCase() !== q.answer.trim().toLowerCase()) {
    feedbackEl.textContent = `Not quite. ${q.hint} Try again ♥`;
    return;
  }
  currentQuestion++;
  if (currentQuestion < puzzleQuestions.length) {
    renderQuestion();
    feedbackEl.textContent = "You got it. ♥";
  } else {
    countEl.textContent = "YOU DID IT";
    progressEl.style.width = "100%";
    questionEl.textContent = "You still remember our little world. ♥";
    choicesEl.innerHTML = '<p class="sub">There is a little letter waiting for you below.</p>';
    feedbackEl.textContent = "Puzzle complete. Go on, there's one more thing.";
    nextBtn.textContent = "Find my letter ↓";
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.onclick = () => document.getElementById("letterButton").scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

renderQuestion();

function equationAnswer(value) {
  const reply = document.getElementById("equationReply");
  if (value === 3) {
    reply.textContent = "Correct. Our maths, our rules. Some things only make sense to us. ♥";
  } else {
    reply.textContent = "Not in this universe. Try the answer only we would give. :)";
  }
}

document.getElementById("heart").addEventListener("click", function () {
  this.classList.toggle("loved");
  document.getElementById("heartText").textContent = this.classList.contains("loved")
    ? "A little brighter. Just like the good parts of us. ♥"
    : "Tap the heart. It gets a little brighter.";
});

document.getElementById("letterButton").addEventListener("click", function () {
  const letter = document.getElementById("letter");
  letter.classList.toggle("hidden");
  this.textContent = letter.classList.contains("hidden") ? "Open your letter ♥" : "Close your letter";
  if (!letter.classList.contains("hidden")) letter.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Apple-inspired scroll reveals, with reduced-motion support.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
