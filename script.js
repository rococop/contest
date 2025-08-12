// script.js
document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let totalScore = 0;
  const formData = new FormData(this);

  for (let value of formData.values()) {
    totalScore += parseInt(value, 10);
  }

  let resultMessage = "";
  if (totalScore <= 20) {
    resultMessage = "정보 무방비형(0~20점) : 정보에 무비판적으로 노출될 가능성이 높습니다. 빠르게 리터러시 훈련이 필요합니다";
  } else if (totalScore <= 30) {
    resultMessage = "AI맹신 위험형(21~30점) : AI와 미디어 정보에 대한 비판적 인식이 부족하며, 리터러시 훈련이 시급합니다";
  } else if (totalScore <= 40) {
    resultMessage = "무심코 수용형(31~40점) : 정보를 수동적으로 받아들일 수 있어 검증하는 습관을 기를 필요가 있습니다";
  } else if (totalScore <= 50) {
    resultMessage = "주의 깊은 감별자(41~50점) : 기본적인 정보 감별력과 사고력은 뛰어나지만, 편향성 감지나 습관화에 조금 더 노력 할 필요가 있어요";
  } else {
    resultMessage = "탐색형 리터러시 고수(51~60점) : 정보를 다각도로 분석하고 비판적으로 사고할 수 있는 우수한 리터러시 역량 보유자입니다";
  }

  document.getElementById("resultBox").textContent =
    `총점: ${totalScore}점 — ${resultMessage}`;
});

