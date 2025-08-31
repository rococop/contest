나의 말:
const questions = [
  { topic: "정보 판별력", text: "뉴스나 정보를 볼 때 출처를 꼭 확인한다." },
  { topic: "정보 판별력", text: "AI가 제공한 정보를 그냥 믿지 않고 확인한다." },
  { topic: "정보 판별력", text: "SNS에서 본 정보가 진짜인지 확인한다." },

  { topic: "편향 감지력", text: "정치/사회 뉴스에서 편향적인 표현을 찾아낼 수 있다." },
  { topic: "편향 감지력", text: "여러 언론사의 뉴스를 비교해본 적이 있다." },
  { topic: "편향 감지력", text: "광고에 숨겨진 메시지를 비판적으로 본다." },

  { topic: "비판적 사고력", text: "뉴스 내용이 사실인지 아닌지를 의심해본다." },
  { topic: "비판적 사고력", text: "다른 사람의 의견을 비판적으로 분석한다." },
  { topic: "비판적 사고력", text: "정보의 신뢰성을 따질 때 다양한 요소를 고려한다." },

  { topic: "검증 습관", text: "정보를 접한 후 검색이나 재확인을 자주 한다." },
  { topic: "검증 습관", text: "AI가 추천한 콘텐츠가 나에게 왜 나왔는지 생각한다." },
  { topic: "검증 습관", text: "가짜뉴스와 진짜뉴스를 구별하는 기준을 알고있다." }
];

let currentIndex = 0;
let answers = new Array(questions.length).fill(null);

const questionBox = document.getElementById("questionBox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("resultBox");

function renderQuestion(index) {
  const q = questions[index];
  questionBox.innerHTML = 
    <h2>[${q.topic}]</h2>
    <p>${q.text}</p>
    <div>
      ${[1,2,3,4,5].map(v => 
        <label>
          <input type="radio" name="q${index}" value="${v}" 
          ${answers[index] == v ? "checked" : ""}>
          ${v}점
        </label>
      ).join("<br>")}
    </div>
  ;

  prevBtn.style.display = index > 0 ? "inline-block" : "none";
  nextBtn.style.display = index < questions.length - 1 ? "inline-block" : "none";
  submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer() {
  const selected = document.querySelector(input[name="q${currentIndex}"]:checked);
  if (selected) {
    answers[currentIndex] = parseInt(selected.value);
  }
}

prevBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

document.getElementById("quizForm").addEventListener("submit", (e) => {
  e.preventDefault();
  saveAnswer();

  const totalScore = answers.reduce((a,b) => a + (b || 0), 0);
  let message = "";

  if (totalScore <= 20) message = "정보 무방비형(0~20점) : 정보에 무비판적으로 노출될 가능성이 높습니다. 빠르게 리터러시 훈련이 필요합니다";
  else if (totalScore <= 30) message = "AI맹신 위험형(21~30점) : AI와 미디어 정보에 대한 비판적 인식이 부족하며, 리터러시 훈련이 시급합니다";
  else if (totalScore <= 40) message = "무심코 수용형(31~40점) : 정보를 수동적으로 받아들일 수 있어 검증하는 습관을 기를 필요가 있습니다";
  else if (totalScore <= 50) message = "주의 깊은 감별자(41~50점) : 기본적인 정보 감별력과 사고력은 뛰어나지만, 편향성 감지나 습관화에 조금 더 노력 할 필요가 있어요";
  else message = "탐색형 리터러시 고수(51~60점) : 정보를 다각도로 분석하고 비판적으로 사고할 수 있는 우수한 리터러시 역량 보유자입니다";

  resultBox.innerText = 총점: ${totalScore}점 — ${message};
});
