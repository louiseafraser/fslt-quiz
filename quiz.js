window.quizData = {
  intro: {
    title: "Find Your Ideal Role at Fife Sports & Leisure Trust",
    description: "Answer these quick questions to discover which role best matches your strengths, interests and working style."
  },
  questions: [
    {id:"Q1", text:"When working with people, what feels most like you?", options:[
      {label:"Welcoming customers, handling bookings and enquiries.", roles:["RE"]},
      {label:"Supervising activities and keeping facility users safe.", roles:["LA"]},
      {label:"Teaching lessons, coaching or leading skills sessions.", roles:["SI","GI","GY"]},
      {label:"Keeping spaces clean, safe and well‑maintained.", roles:["CL"]}
    ]},
    {id:"Q2", text:"Which type of tasks do you most enjoy?", options:[
      {label:"Admin, IT, booking systems and customer enquiries.", roles:["RE"]},
      {label:"Poolside or activity supervision, moving equipment, patrolling.", roles:["LA"]},
      {label:"Planning and delivering classes or coached sessions.", roles:["SI","GI","GY"]},
      {label:"Cleaning and maintaining high facility standards.", roles:["CL"]}
    ]},
    {id:"Q3", text:"Your ideal working environment:", options:[
      {label:"Busy reception area with lots of customer contact.", roles:["RE"]},
      {label:"Poolside or activity areas with varied physical tasks.", roles:["LA"]},
      {label:"Teaching pool, gym studio or sports hall.", roles:["SI","GI","GY"]},
      {label:"Independent work across different cleaning zones.", roles:["CL"]}
    ]},
    {id:"Q4", text:"How confident are you with admin and IT?", options:[
      {label:"Very confident — bookings, databases and accurate records.", roles:["RE"]},
      {label:"Moderately confident — can assist when needed.", roles:["LA"]},
      {label:"Prefer practical, hands-on work.", roles:["CL","SI","GI","GY"]}
    ]},
    {id:"Q5", text:"Responding to safety‑critical situations:", options:[
      {label:"Confident with training, including emergencies.", roles:["LA"]},
      {label:"Confident ensuring lesson‑based safety.", roles:["SI","GI","GY"]},
      {label:"Prefer non‑emergency duties.", roles:["RE","CL"]}
    ]}
  ],
  resultsHeading: "Your Best Match",
  results: {
    LA: {title:"Leisure Attendant – The Guardian", description:"You enjoy active work, supervising users and maintaining safety."},
    RE: {title:"Receptionist – The Organiser", description:"You excel at customer service, organisation and multitasking."},
    CL: {title:"Cleaner – The Supporter", description:"You take pride in maintaining a clean and safe environment."},
    SI: {title:"Swimming Instructor – The Motivator", description:"You inspire learning and support swimmers of all ages."},
    GI: {title:"Gymnastics Instructor – The Builder", description:"You build skills through structured, progressive coaching."},
    GY: {title:"Gym Instructor – The Coach", description:"You motivate people to reach their fitness goals with tailored programmes."}
  },
  training: {
    SI:"Recommended: UKCC Level 2 Aquatics, First Aid, Child Protection.",
    GI:"Recommended: Level 2 Gymnastics Coaching, First Aid, CPD.",
    GY:"Recommended: Level 2 Gym Instructor, Exercise to Music, First Aid."
  }
};

let currentQuestion = 0;
let scores = {LA:0, RE:0, CL:0, SI:0, GI:0, GY:0};

const contentDiv = document.getElementById('content');
const progressFill = document.getElementById('progress-fill');

function updateProgress() {
  const percent = (currentQuestion / quizData.questions.length) * 100;
  progressFill.style.width = percent + '%';
}

function renderIntro() {
  progressFill.style.width = '0%';
  contentDiv.innerHTML = `
    <div class="fade-in">
      <h1>${quizData.intro.title}</h1>
      <p>${quizData.intro.description}</p>
      <div id='next-btn' onclick='renderQuestion()'>Start Quiz</div>
    </div>
  `;
}

function renderQuestion() {
  updateProgress();
  const q = quizData.questions[currentQuestion];
  if(!q) return showResults();
  let html = `<div class="fade-in"><h2>${q.text}</h2>`;
  q.options.forEach((o, i) => {
    html += `<div class='button' onclick='selectAnswer(${i}, this)'>${o.label}</div>`;
  });
  html += `</div>`;
  contentDiv.innerHTML = html;
}

function selectAnswer(i, btn) {
  // Animate button flash
  btn.style.background = "#f7ba2a";
  btn.style.color = "#000";
  setTimeout(() => {
    btn.style.background = "#2ea2c9";
    btn.style.color = "#fff";
  }, 300);

  const q = quizData.questions[currentQuestion];
  q.options[i].roles.forEach(r => scores[r]++);
  currentQuestion++;
  setTimeout(renderQuestion, 350); // small delay for animation
}

function showResults() {
  progressFill.style.width = '100%';
  const topScore = Math.max(...Object.values(scores));
  const bestRoles = Object.keys(scores).filter(r => scores[r] === topScore);
  let html = `<div class="fade-in"><h1>${quizData.resultsHeading}</h1>`;
  
  bestRoles.forEach(role => {
    const r = quizData.results[role];
    html += `<div class='result-card'><h2>${r.title}</h2><p>${r.description}</p></div>`;
  });

  html += `<h2>Optional Next Steps</h2>`;
  bestRoles.forEach(role => {
    if(quizData.training[role]) {
      html += `<p><strong>${quizData.results[role].title}:</strong> ${quizData.training[role]}</p>`;
    }
  });

  html += `<div id='next-btn' onclick='restartQuiz()'>Start Again</div></div>`;
  contentDiv.innerHTML = html;
}

function restartQuiz() {
  currentQuestion = 0;
  scores = {LA:0, RE:0, CL:0, SI:0, GI:0, GY:0};
  renderIntro();
}

renderIntro();
