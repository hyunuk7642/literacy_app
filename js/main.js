// 메인 애플리케이션 로직
// 전역 상태 관리
let currentChallenge = null; // 'image' 또는 'text'
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentReflectionIndex = 0;
let challengeData = null;
let reflectionData = null;
let correctAnswers = 0; // 정답 개수 추적
let totalQuestions = 0; // 전체 문제 개수

// 화면 전환 함수
function showScreen(screenId) {
    // 모든 화면 숨기기
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // 선택된 화면 보이기
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// 이미지 챌린지 시작
function startImageChallenge() {
    currentChallenge = 'image';
    currentLevel = 1;
    currentQuestionIndex = 0;
    correctAnswers = 0; // 정답 개수 초기화
    challengeData = imageChallengeData;
    reflectionData = reflectionQuestions.image;
    
    // 전체 문제 개수 계산
    totalQuestions = 0;
    for (let level = 1; level <= 3; level++) {
        const levelKey = `level${level}`;
        if (challengeData[levelKey]) {
            totalQuestions += challengeData[levelKey].length;
        }
    }
    
    showScreen('image-challenge-screen');
    loadImageChallenge();
}

// 텍스트 챌린지 시작
function startTextChallenge() {
    currentChallenge = 'text';
    currentLevel = 1;
    currentQuestionIndex = 0;
    correctAnswers = 0; // 정답 개수 초기화
    challengeData = textChallengeData;
    reflectionData = reflectionQuestions.text;
    
    // 전체 문제 개수 계산
    totalQuestions = 0;
    for (let level = 1; level <= 3; level++) {
        const levelKey = `level${level}`;
        if (challengeData[levelKey]) {
            totalQuestions += challengeData[levelKey].length;
        }
    }
    
    showScreen('text-challenge-screen');
    loadTextChallenge();
}

// 이미지 챌린지 로드
function loadImageChallenge() {
    const levelKey = `level${currentLevel}`;
    const questions = challengeData[levelKey];
    
    if (!questions || currentQuestionIndex >= questions.length) {
        // 다음 레벨로 이동
        if (currentLevel < 3) {
            currentLevel++;
            currentQuestionIndex = 0;
            loadImageChallenge();
            return;
        } else {
            // 모든 레벨 완료 - 결과 화면으로 이동
            showChallengeResult();
            return;
        }
    }
    
    const question = questions[currentQuestionIndex];
    
    // UI 업데이트
    document.getElementById('image-level').textContent = `Level ${currentLevel}`;
    document.getElementById('challenge-image').src = question.image;
    document.getElementById('challenge-image').alt = '챌린지 이미지';
    
    // 힌트 섹션 표시 (Level 2부터)
    const hintSection = document.getElementById('image-hint-section');
    if (currentLevel >= 2) {
        hintSection.style.display = 'block';
        document.getElementById('image-hint-text').textContent = '';
    } else {
        hintSection.style.display = 'none';
    }
    
    // 피드백 오버레이 숨기기
    document.getElementById('image-feedback-overlay').classList.remove('active');
    
    // 선택 버튼 초기화
    const choiceButtons = document.querySelectorAll('#image-challenge-screen .choice-btn');
    choiceButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
}

// 텍스트 챌린지 로드
function loadTextChallenge() {
    const levelKey = `level${currentLevel}`;
    const questions = challengeData[levelKey];
    
    if (!questions || currentQuestionIndex >= questions.length) {
        // 다음 레벨로 이동
        if (currentLevel < 3) {
            currentLevel++;
            currentQuestionIndex = 0;
            loadTextChallenge();
            return;
        } else {
            // 모든 레벨 완료 - 결과 화면으로 이동
            showChallengeResult();
            return;
        }
    }
    
    const question = questions[currentQuestionIndex];
    
    // UI 업데이트
    document.getElementById('text-level').textContent = `Level ${currentLevel}`;
    document.getElementById('challenge-text').textContent = question.text;
    
    // 힌트 섹션 표시 (Level 2부터)
    const hintSection = document.getElementById('text-hint-section');
    if (currentLevel >= 2) {
        hintSection.style.display = 'block';
        document.getElementById('text-hint-text').textContent = '';
    } else {
        hintSection.style.display = 'none';
    }
    
    // 피드백 오버레이 숨기기
    document.getElementById('text-feedback-overlay').classList.remove('active');
    
    // 선택 버튼 초기화
    const choiceButtons = document.querySelectorAll('#text-challenge-screen .choice-btn');
    choiceButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
}

// 선택 처리
function selectChoice(choice) {
    const levelKey = `level${currentLevel}`;
    const questions = challengeData[levelKey];
    const question = questions[currentQuestionIndex];
    
    const isCorrect = choice === question.answer;
    
    // 정답 개수 업데이트
    if (isCorrect) {
        correctAnswers++;
    }
    
    // 버튼 스타일 업데이트
    const choiceButtons = document.querySelectorAll(`#${currentChallenge}-challenge-screen .choice-btn`);
    choiceButtons.forEach(btn => {
        btn.disabled = true;
        if (currentChallenge === 'text') {
            // 텍스트 챌린지: true/false 처리
            if (btn.classList.contains('ai-btn') && choice === 'false') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (btn.classList.contains('real-btn') && choice === 'true') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        } else {
            // 이미지 챌린지: ai/real 처리
            if (btn.classList.contains('ai-btn') && choice === 'ai') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (btn.classList.contains('real-btn') && choice === 'real') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        }
    });
    
    // 피드백 표시
    showFeedback(question, isCorrect);
}

// 피드백 표시
function showFeedback(question, isCorrect) {
    const feedbackOverlay = document.getElementById(`${currentChallenge}-feedback-overlay`);
    const feedbackTitle = document.getElementById(`feedback-title${currentChallenge === 'text' ? '-text' : ''}`);
    const feedbackText = document.getElementById(`feedback-text${currentChallenge === 'text' ? '-content' : ''}`);
    const highlightedElement = document.getElementById(`highlighted-${currentChallenge}`);
    
    feedbackTitle.textContent = isCorrect ? '정답입니다!' : '틀렸습니다!';
    feedbackText.textContent = question.feedback.text;
    
    // 하이라이트 표시
    if (currentChallenge === 'image') {
        highlightedElement.innerHTML = `<img src="${question.image}" alt="하이라이트된 이미지" style="width: 100%; border-radius: 10px;">`;
    } else {
        highlightedElement.innerHTML = `<p style="font-style: italic; color: #e53e3e;">${question.feedback.highlight}</p>`;
    }
    
    feedbackOverlay.classList.add('active');
}

// 다음 이미지 챌린지
function nextImageChallenge() {
    currentQuestionIndex++;
    loadImageChallenge();
}

// 다음 텍스트 챌린지
function nextTextChallenge() {
    currentQuestionIndex++;
    loadTextChallenge();
}

// 힌트 표시
function showImageHint() {
    const hintText = document.getElementById('image-hint-text');
    const levelHints = hints.image[`level${currentLevel}`];
    const questionIndex = currentQuestionIndex % levelHints.length;
    hintText.textContent = levelHints[questionIndex];
}

function showTextHint() {
    const hintText = document.getElementById('text-hint-text');
    // 현재 문제의 구체적인 힌트 사용
    const currentQuestion = textChallengeData[`level${currentLevel}`][currentQuestionIndex];
    hintText.textContent = currentQuestion.hint;
}

// 챌린지 결과 표시
function showChallengeResult() {
    // 결과 화면으로 이동
    showScreen('challenge-result-screen');
    
    // 점수 표시
    document.getElementById('score-number').textContent = correctAnswers;
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // 점수에 따른 메시지 설정
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const scoreMessage = document.getElementById('score-message');
    const resultDescription = document.getElementById('result-description');
    
    if (scorePercentage >= 80) {
        scoreMessage.textContent = '훌륭합니다!';
        scoreMessage.className = 'score-message score-excellent';
        resultDescription.textContent = 'AI와 실제 콘텐츠를 구별하는 능력이 뛰어납니다. 비판적 사고를 잘 활용하고 있네요!';
    } else if (scorePercentage >= 60) {
        scoreMessage.textContent = '잘했습니다!';
        scoreMessage.className = 'score-message score-good';
        resultDescription.textContent = '대부분의 경우를 정확히 구별했습니다. 조금 더 세심한 관찰이 필요할 것 같아요.';
    } else if (scorePercentage >= 40) {
        scoreMessage.textContent = '노력이 필요해요';
        scoreMessage.className = 'score-message score-fair';
        resultDescription.textContent = '일부는 맞췄지만 더 많은 연습이 필요합니다. 힌트를 활용해서 다시 도전해보세요!';
    } else {
        scoreMessage.textContent = '더 연습해보세요';
        scoreMessage.className = 'score-message score-poor';
        resultDescription.textContent = 'AI와 실제 콘텐츠를 구별하는 것이 생각보다 어렵죠? 성찰 질문을 통해 더 자세히 알아보세요.';
    }
}

// 성찰 질문으로 이동
function goToReflection() {
    showScreen('reflection-screen');
    loadReflectionQuestion();
}

// 성찰 질문 로드
function loadReflectionQuestion() {
    if (currentReflectionIndex >= reflectionData.length) {
        // 모든 성찰 질문 완료 - 완료 화면으로 이동
        showScreen('completion-screen');
        setupCompletionScreen();
        return;
    }
    
    const question = reflectionData[currentReflectionIndex];
    
    // UI 업데이트
    document.getElementById('question-number').textContent = currentReflectionIndex + 1;
    document.getElementById('reflection-question').textContent = question.question;
    
    // 답안 옵션 생성
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectReflectionAnswer(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // 피드백 및 다음 버튼 초기화
    document.getElementById('question-feedback').textContent = '';
    document.getElementById('question-feedback').classList.remove('show');
    document.getElementById('next-question-btn').disabled = true;
    document.getElementById('next-question-btn').textContent = 
        currentReflectionIndex === reflectionData.length - 1 ? '결과 보기' : '다음 질문';
}

// 성찰 질문 답안 선택
function selectReflectionAnswer(selectedIndex) {
    const question = reflectionData[currentReflectionIndex];
    const options = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('question-feedback');
    const nextBtn = document.getElementById('next-question-btn');
    
    if (selectedIndex === question.correct) {
        // 정답 - 모든 옵션 비활성화하고 정답 표시
        options.forEach(option => {
            option.onclick = null;
        });
        options[selectedIndex].classList.add('correct');
        feedback.textContent = '정답입니다!';
        feedback.classList.add('show');
        nextBtn.disabled = false;
    } else {
        // 오답 - 선택한 옵션을 비활성화하고 다른 옵션들은 계속 선택 가능하게 유지
        options[selectedIndex].classList.add('incorrect');
        options[selectedIndex].onclick = null; // 선택한 오답 옵션 비활성화
        feedback.textContent = '정답이 아니에요. 다시 한번 생각해볼까요?';
        feedback.classList.add('show');
        
        // 다른 옵션들은 여전히 선택 가능
        options.forEach((option, index) => {
            if (index !== selectedIndex && !option.classList.contains('incorrect')) {
                option.onclick = () => selectReflectionAnswer(index);
            }
        });
    }
}

// 다음 성찰 질문
function nextQuestion() {
    currentReflectionIndex++;
    loadReflectionQuestion();
}

// 완료 화면 설정
function setupCompletionScreen() {
    const otherChallengeBtn = document.getElementById('other-challenge-btn');
    
    if (currentChallenge === 'image') {
        otherChallengeBtn.textContent = '텍스트 챌린지 알아보기';
    } else {
        otherChallengeBtn.textContent = '이미지 챌린지 알아보기';
    }
}

// 홈으로 이동
function goHome() {
    // 상태 초기화
    currentChallenge = null;
    currentLevel = 1;
    currentQuestionIndex = 0;
    currentReflectionIndex = 0;
    correctAnswers = 0;
    totalQuestions = 0;
    challengeData = null;
    reflectionData = null;
    
    showScreen('home-screen');
}

// 다른 챌린지로 이동
function goToOtherChallenge() {
    goHome();
    
    // 다른 챌린지 시작
    if (currentChallenge === 'image' || currentChallenge === null) {
        setTimeout(() => startTextChallenge(), 100);
    } else {
        setTimeout(() => startImageChallenge(), 100);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 기본적으로 홈 화면 표시
    showScreen('home-screen');
    
    // 이미지 로드 실패 시 대체 이미지 설정
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOazleWKoOi9veWbvueJhzwvdGV4dD48L3N2Zz4=';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });
});
