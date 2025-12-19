// 메인 애플리케이션 로직
// 전역 상태 관리
let currentChallenge = 'text'; // 'text'만 사용
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentReflectionIndex = 0;
let challengeData = null;
let reflectionData = null;
let correctAnswers = 0; // 정답 개수 추적
let totalQuestions = 0; // 전체 문제 개수
let userReasons = []; // 사용자가 제시한 근거 저장
let currentCaseIndex = 0; // 현재 사례 분석 인덱스
let caseScore = 0; // 사례 분석 점수
let caseBadges = []; // 사례 분석 배지

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

// 이미지 챌린지 제거됨

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

// 이미지 챌린지 제거됨

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

// 근거 입력 모달 표시
function showReasonModal(choice, callback) {
    const modal = document.getElementById('reason-modal');
    const reasonInput = document.getElementById('reason-input');
    const submitReasonBtn = document.getElementById('submit-reason-btn');
    
    // 현재 질문 가져오기
    const levelKey = `level${currentLevel}`;
    const questions = challengeData[levelKey];
    const currentQuestion = questions[currentQuestionIndex];
    
    // 질문 내용에 맞는 placeholder 생성
    let placeholder = '';
    if (currentQuestion) {
        const questionText = currentQuestion.text;
        
        // Level 2 질문별 맞춤 placeholder
        if (currentLevel === 2) {
            if (questionText.includes('작품이라고 올리는 것')) {
                // 질문 4: AI 작품 저작권
                if (choice === 'true') {
                    placeholder = '예: AI가 만든 결과물은 원본 데이터의 저작권 문제와 윤리적 문제가 발생할 수 있어서 진실로 판단했습니다.';
                } else {
                    placeholder = '예: AI가 만든 결과물도 창작물이므로 문제가 없다고 생각해서 거짓으로 판단했습니다.';
                }
            } else if (questionText.includes('추천하는 정보를 그대로 믿어도')) {
                // 질문 5: AI 정보 신뢰
                if (choice === 'false') {
                    placeholder = '예: AI가 제공하는 정보는 학습 데이터의 편향이나 오류가 포함될 수 있어서 거짓으로 판단했습니다.';
                } else {
                    placeholder = '예: AI는 정확한 정보를 제공하므로 믿어도 된다고 생각해서 진실로 판단했습니다.';
                }
            } else if (questionText.includes('감정을 분석해주는 앱은 반드시 안전하다')) {
                // 질문 6: AI 개인정보
                if (choice === 'false') {
                    placeholder = '예: 얼굴 인식과 감정 분석은 개인정보가 포함되어 개인정보 보호 문제가 발생할 수 있어서 거짓으로 판단했습니다.';
                } else {
                    placeholder = '예: AI 앱은 모두 안전하게 설계되어 있어서 진실로 판단했습니다.';
                }
            } else {
                // 기본 placeholder
                if (choice === 'true') {
                    placeholder = '예: 이 문장의 내용이 논리적으로 타당하고 사실에 부합해서 진실로 판단했습니다.';
                } else {
                    placeholder = '예: 이 문장에 논리적 모순이나 사실과 다른 내용이 있어서 거짓으로 판단했습니다.';
                }
            }
        } else {
            // Level 3 기본 placeholder
            if (choice === 'true') {
                placeholder = '예: 이 주장은 AI의 사회적 영향과 책임에 대해 정확히 설명하고 있어서 진실로 판단했습니다.';
            } else {
                placeholder = '예: 이 주장은 AI의 역할과 한계에 대한 오해가 포함되어 있어서 거짓으로 판단했습니다.';
            }
        }
    } else {
        // 기본 placeholder
        placeholder = '예: 이 문장의 논리적 일관성, 출처, 사실 여부 등을 고려하여 판단했습니다.';
    }
    
    reasonInput.value = '';
    reasonInput.placeholder = placeholder;
    modal.classList.add('active');
    
    // 제출 버튼 이벤트 리스너 (기존 리스너 제거 후 새로 추가)
    const newSubmitBtn = submitReasonBtn.cloneNode(true);
    submitReasonBtn.parentNode.replaceChild(newSubmitBtn, submitReasonBtn);
    
    newSubmitBtn.onclick = () => {
        const reason = reasonInput.value.trim();
        if (reason.length < 10) {
            alert('최소 10자 이상의 근거를 입력해주세요.');
            return;
        }
        
        // 근거 저장
        const reasonData = {
            questionId: currentQuestionIndex,
            level: currentLevel,
            choice: choice,
            reason: reason
        };
        userReasons.push(reasonData);
        
        modal.classList.remove('active');
        callback(choice);
    };
}

// 선택 처리 (근거 제시 포함)
function selectChoice(choice) {
    // Level 2 이상에서는 근거를 요구
    if (currentLevel >= 2) {
        showReasonModal(choice, (selectedChoice) => {
            processChoice(selectedChoice);
        });
    } else {
        processChoice(choice);
    }
}

// 선택 처리 로직
function processChoice(choice) {
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
            // 텍스트 챌린지: true/false 처리
        if (btn.classList.contains('truth-btn') && choice === 'true') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (btn.classList.contains('false-btn') && choice === 'false') {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    // 피드백 표시 (근거 포함)
    showFeedback(question, isCorrect);
}

// 피드백 표시 (근거 포함)
function showFeedback(question, isCorrect) {
    const feedbackOverlay = document.getElementById(`${currentChallenge}-feedback-overlay`);
    const feedbackTitle = document.getElementById('feedback-title-text');
    const feedbackText = document.getElementById('feedback-text-content');
    const highlightedElement = document.getElementById('highlighted-text');
    
    feedbackTitle.textContent = isCorrect ? '정답입니다!' : '틀렸습니다!';
    feedbackText.textContent = question.feedback.text;
    
    // 근거 표시 (Level 2 이상)
    let reasonDisplay = '';
    if (currentLevel >= 2 && userReasons.length > 0) {
        const lastReason = userReasons[userReasons.length - 1];
        if (lastReason.questionId === currentQuestionIndex && lastReason.level === currentLevel) {
            reasonDisplay = `<div class="user-reason-display">
                <h4>당신의 판단 근거:</h4>
                <p class="reason-text">"${lastReason.reason}"</p>
                ${isCorrect ? '<p class="reason-feedback positive">좋은 관찰이었습니다! 구체적인 근거를 제시하는 것은 비판적 사고의 핵심입니다.</p>' : 
                  '<p class="reason-feedback neutral">근거를 제시한 것은 좋습니다. 하지만 더 세밀한 관찰이 필요했을 것 같아요.</p>'}
            </div>`;
        }
    }
    
    // 하이라이트 표시 (정답/오답에 따라 클래스 추가)
    highlightedElement.className = 'highlighted-text';
    if (isCorrect) {
        highlightedElement.classList.add('correct');
    } else {
        highlightedElement.classList.add('incorrect');
    }
    highlightedElement.innerHTML = `<p>${question.feedback.highlight}</p>${reasonDisplay}`;
    
    feedbackOverlay.classList.add('active');
}

// 다음 텍스트 챌린지
function nextTextChallenge() {
    currentQuestionIndex++;
    loadTextChallenge();
}

// 힌트 표시
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

// 성찰 질문 완료 후 홈으로 이동
function goToAdvancedLearning() {
    goHome();
}

// 성찰 질문으로 이동
function goToReflection() {
    currentReflectionIndex = 0;
    showScreen('reflection-screen');
    loadReflectionQuestion();
}

// 성찰 질문 완료 후 처리
function completeReflection() {
    goToAdvancedLearning();
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
        currentReflectionIndex === reflectionData.length - 1 ? '심화 학습으로' : '다음 질문';
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
    if (otherChallengeBtn) {
        otherChallengeBtn.textContent = '다른 활동 알아보기';
    }
}

// 홈으로 이동
function goHome() {
    // 상태 초기화
    currentChallenge = 'text';
    currentLevel = 1;
    currentQuestionIndex = 0;
    currentReflectionIndex = 0;
    correctAnswers = 0;
    totalQuestions = 0;
    challengeData = null;
    reflectionData = null;
    userReasons = [];
    currentCaseIndex = 0;
    caseScore = 0;
    caseBadges = [];
    
    showScreen('home-screen');
}

// 챌린지에서 뒤로가기
function goBackFromChallenge() {
    // 진행 중인 챌린지 중단하고 홈으로
    if (confirm('진행 중인 챌린지를 중단하고 홈으로 돌아가시겠습니까?')) {
    goHome();
    }
}

// 다른 챌린지로 이동 (제거됨 - 이미지 챌린지 없음)

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

// 학습 모달 창 관련 함수들
function showLearningModal(type) {
    const modal = document.getElementById('learning-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (type === 'literacy') {
        modalTitle.textContent = 'AI 리터러시란';
        modalContent.innerHTML = `
            <p>AI 리터러시는 단순히 인공지능을 '잘 사용하는 기술'이 아니라,<br>
            AI가 어떻게 만들어지고, 어떻게 판단하며, 우리 사회에 어떤 영향을 미치는지를 이해하고<br>
            그 결과를 비판적으로 바라볼 수 있는 능력이에요.</p>
            
            <p><strong>AI 리터러시를 갖춘 사람은 다음과 같은 질문을 스스로 던질 수 있습니다.</strong></p>
            
            <ul>
                <li>"이 결과는 어떻게 만들어진 걸까?"</li>
                <li>"누가, 어떤 데이터를 이용해 훈련시켰을까?"</li>
                <li>"이 기술은 모두에게 공평할까, 아니면 누군가에게 불리할까?"</li>
            </ul>
            
            <p>이처럼 AI 리터러시는 기술을 단순히 '활용'하는 수준을 넘어,<br>
            기술을 올바르게 판단하고 책임 있게 사용하는 힘을 기르는 것입니다.</p>
        `;
    } else if (type === 'attitude') {
        modalTitle.textContent = '인공지능을 다루는 올바른 자세';
        modalContent.innerHTML = `
            <p>인공지능은 우리를 대신해 판단할 수도 있고, 정보를 만들어낼 수도 있습니다.<br>
            그럴수록 우리는 AI의 판단을 그대로 믿기보다, 스스로 점검하고 검증하는 자세가 필요해요.<br>
            AI가 틀릴 수도 있고, 누군가가 그 결과를 악의적으로 이용할 수도 있기 때문이죠.</p>
            
            <p>그래서 우리는 AI를 <strong>'비판적으로 신뢰하는 태도'</strong>를 가져야 합니다.<br>
            즉, 무조건 의심하거나 무조건 믿는 것이 아니라,<br>
            AI가 보여주는 결과의 근거를 이해하고, 그 한계를 인식하면서 사용하는 것입니다.</p>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeLearningModal() {
    const modal = document.getElementById('learning-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 스크롤 복원
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', function(event) {
    const modal = document.getElementById('learning-modal');
    if (event.target === modal) {
        closeLearningModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLearningModal();
        const reasonModal = document.getElementById('reason-modal');
        if (reasonModal && reasonModal.classList.contains('active')) {
            reasonModal.classList.remove('active');
        }
    }
});

// ========== 사례 분석 모듈 ==========

// 사례 분석 시작
function startCaseStudy() {
    currentCaseIndex = 0;
    caseScore = 0;
    caseBadges = [];
    showScreen('case-study-screen');
    
    // DOM이 준비될 때까지 확인
    const checkAndLoad = () => {
        const caseTitle = document.getElementById('case-title');
        if (caseTitle) {
            loadCaseStudy();
            // loadCaseStudy 후에 게이미피케이션 업데이트
            requestAnimationFrame(() => {
                updateCaseGamification();
            });
        } else {
            // DOM이 아직 준비되지 않았으면 다시 시도
            setTimeout(checkAndLoad, 50);
        }
    };
    
    // 즉시 시도
    checkAndLoad();
}

// 사례 분석 게이미피케이션 업데이트
function updateCaseGamification() {
    const cases = caseStudyData.deepfake.cases;
    const totalCases = cases.length;
    const progress = (currentCaseIndex / totalCases) * 100;
    
    // DOM 요소 확인
    const progressPercentage = document.getElementById('case-progress-percentage');
    const progressBar = document.getElementById('case-progress-bar');
    const scoreElement = document.getElementById('case-score');
    
    if (progressPercentage) {
        progressPercentage.textContent = Math.round(progress) + '%';
    }
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    if (scoreElement) {
        scoreElement.textContent = caseScore;
    }
    
    // 배지 체크 (무한 루프 방지)
    if (document.getElementById('case-badge-display')) {
        checkCaseBadges();
    }
}

// 사례 분석 배지 체크
function checkCaseBadges() {
    const cases = caseStudyData.deepfake.cases;
    const badgeDisplay = document.getElementById('case-badge-display');
    badgeDisplay.innerHTML = '';
    
    // 첫 사례 완료 배지
    if (currentCaseIndex >= 1 && !caseBadges.includes('first')) {
        caseBadges.push('first');
        caseScore += 50; // 보너스 점수
        addBadge(badgeDisplay, '🎯', '첫 사례 완료!', '첫 번째 사례를 완료했습니다.');
    }
    
    // 모든 질문 답변 확인 배지
    const currentCase = cases[currentCaseIndex];
    if (currentCase && document.querySelectorAll('.case-answer[style*="block"]').length === currentCase.questions.length) {
        if (!caseBadges.includes('all-answers')) {
            caseBadges.push('all-answers');
            caseScore += 30;
            addBadge(badgeDisplay, '📚', '모든 답변 확인!', '모든 질문의 답변을 확인했습니다.');
        }
    }
    
    // 완벽 완료 배지
    if (currentCaseIndex >= cases.length) {
        if (!caseBadges.includes('perfect')) {
            caseBadges.push('perfect');
            caseScore += 100;
            addBadge(badgeDisplay, '🏆', '완벽 완료!', '모든 사례를 완료했습니다!');
        }
    }
    
    // 무한 루프 방지: updateCaseGamification은 호출하지 않음
    // 점수만 업데이트
    const scoreElement = document.getElementById('case-score');
    if (scoreElement) {
        scoreElement.textContent = caseScore;
    }
}

// 배지 추가 함수
function addBadge(container, emoji, title, description) {
    const badge = document.createElement('div');
    badge.className = 'badge-item';
    badge.innerHTML = `
        <span class="badge-emoji">${emoji}</span>
        <div class="badge-content">
            <div class="badge-title">${title}</div>
            <div class="badge-description">${description}</div>
        </div>
    `;
    container.appendChild(badge);
    
    // 애니메이션 효과
    badge.style.animation = 'badgePop 0.5s ease-out';
    setTimeout(() => {
        badge.style.animation = '';
    }, 500);
}

// 사례 분석 로드
function loadCaseStudy() {
    // caseStudyData 확인
    if (!caseStudyData || !caseStudyData.deepfake || !caseStudyData.deepfake.cases) {
        console.error('사례 분석 데이터를 찾을 수 없습니다.');
        alert('사례 분석 데이터를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    const cases = caseStudyData.deepfake.cases;
    
    if (currentCaseIndex >= cases.length) {
        // 모든 사례 완료 - 완료 화면으로
        showScreen('completion-screen');
        setupCompletionScreen();
        return;
    }
    
    const caseItem = cases[currentCaseIndex];
    
    if (!caseItem) {
        console.error('사례 데이터를 찾을 수 없습니다.');
        return;
    }
    
    // UI 업데이트 - DOM 요소 확인
    const caseTitle = document.getElementById('case-title');
    const caseContent = document.getElementById('case-content');
    const caseNumber = document.getElementById('case-number');
    const questionsContainer = document.getElementById('case-questions');
    
    if (!caseTitle || !caseContent || !caseNumber || !questionsContainer) {
        console.error('필요한 DOM 요소를 찾을 수 없습니다.');
        console.log('case-title:', caseTitle, 'case-content:', caseContent, 'case-number:', caseNumber, 'case-questions:', questionsContainer);
        return;
    }
    
    // 데이터 확인 및 디버깅
    console.log('사례 데이터:', caseItem);
    console.log('제목:', caseItem.title);
    console.log('내용:', caseItem.content);
    
    caseTitle.textContent = caseItem.title || '제목 없음';
    caseContent.textContent = caseItem.content || '내용 없음';
    caseNumber.textContent = `${currentCaseIndex + 1} / ${cases.length}`;
    
    // 질문 컨테이너 초기화
    questionsContainer.innerHTML = '';
    
    // 질문들 표시
    if (caseItem.questions && caseItem.questions.length > 0) {
        caseItem.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'case-question-item';
        questionDiv.innerHTML = `
            <h4>질문 ${index + 1}: ${q.question}</h4>
            <div class="case-answer" id="case-answer-${index}" style="display: none;">
                <p><strong>답변:</strong> ${q.answer}</p>
            </div>
            <button class="show-answer-btn" onclick="toggleCaseAnswer(${index})">모범 답안</button>
        `;
        questionsContainer.appendChild(questionDiv);
        });
    } else {
        console.warn('질문 데이터가 없습니다.');
    }
    
    // 성찰 문구 표시
    const reflectionDiv = document.getElementById('case-reflection');
    if (reflectionDiv) {
        reflectionDiv.innerHTML = `
            <div class="reflection-box">
                <h4>💭 생각해보기</h4>
                <p>${caseItem.reflection}</p>
            </div>
        `;
        reflectionDiv.style.display = 'block';
    }
    
    // 다음 버튼 업데이트
    const nextBtn = document.getElementById('next-case-btn');
    if (nextBtn) {
        nextBtn.textContent = currentCaseIndex === cases.length - 1 ? '완료하기' : '다음 사례';
        nextBtn.onclick = nextCase;
    }
    
    // 게이미피케이션 업데이트
    updateCaseGamification();
}

// 사례 답변 토글
function toggleCaseAnswer(index) {
    const answerDiv = document.getElementById(`case-answer-${index}`);
    const btn = event.target;
    
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
        answerDiv.style.display = 'block';
        btn.textContent = '답변 숨기기';
        // 답변 확인 시 점수 추가
        if (!caseBadges.includes(`answer-${currentCaseIndex}-${index}`)) {
            caseBadges.push(`answer-${currentCaseIndex}-${index}`);
            caseScore += 10;
            updateCaseGamification();
        }
    } else {
        answerDiv.style.display = 'none';
        btn.textContent = '모범 답안';
    }
    
    // 배지 체크
    checkCaseBadges();
}

// 다음 사례
function nextCase() {
    // 현재 사례 완료 점수 추가
    caseScore += 100;
    currentCaseIndex++;
    loadCaseStudy();
    // loadCaseStudy 후에 게이미피케이션 업데이트
    setTimeout(() => {
        updateCaseGamification();
    }, 50);
}

// 홈 화면에서 사례 분석 시작
function startCaseStudyFromHome() {
    userReasons = [];
    currentCaseIndex = 0;
    startCaseStudy();
}
