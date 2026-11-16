/* ==========================================================================
   Lavend/r Academic Editions - Main Interaction Script
   Controller for Page Navigation, Annotations, AI Synthesis, and Gated Progression
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // State Management & DOM Elements
    // ==========================================
    let currentPage = 1;
    const totalPages = 4;

    const stepIndicator = document.getElementById('step-indicator');
    
    // Navigation Buttons
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const prevButtons = document.querySelectorAll('.btn-prev');

    // ==========================================
    // Helper Functions: Button State Controllers
    // ==========================================
    function unlockButton(btn) {
        if (!btn) return;
        btn.disabled = false;
        btn.classList.remove('bg-morandi-300', 'cursor-not-allowed');
        btn.classList.add('bg-morandi-700', 'hover:bg-morandi-900');
    }

    function lockButton(btn) {
        if (!btn) return;
        btn.disabled = true;
        btn.classList.remove('bg-morandi-700', 'hover:bg-morandi-900');
        btn.classList.add('bg-morandi-300', 'cursor-not-allowed');
    }

    // ==========================================
    // Page Navigation Controller
    // ==========================================
    function navigateToPage(targetPage) {
        for (let i = 1; i <= totalPages; i++) {
            const page = document.getElementById(`page-${i}`);
            if (page) page.classList.add('hidden');
        }

        const targetElement = document.getElementById(`page-${targetPage}`);
        if (targetElement) {
            targetElement.classList.remove('hidden');
            currentPage = targetPage;
        }

        const romanNumerals = ['I', 'II', 'III', 'IV'];
        if (stepIndicator) {
            stepIndicator.textContent = `Phase ${romanNumerals[currentPage - 1]} of IV`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btnNext1) btnNext1.addEventListener('click', () => navigateToPage(2));
    if (btnNext2) btnNext2.addEventListener('click', () => navigateToPage(3));
    if (btnNext3) btnNext3.addEventListener('click', () => navigateToPage(4));

    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentPage > 1) navigateToPage(currentPage - 1);
        });
    });

    // ==========================================
    // Module 01: Gen Z Slang Decoder Logic
    // ==========================================
    const decoderOptions = document.querySelectorAll('.decoder-option');
    const decoderFeedback = document.getElementById('decoder-feedback');
    const feedbackBadge = document.getElementById('feedback-badge');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');

    let hasAnsweredDecoder = false;

    if (decoderOptions.length > 0) {
        decoderOptions.forEach(option => {
            option.addEventListener('click', () => {
                if (hasAnsweredDecoder) return;
                hasAnsweredDecoder = true;

                const isCorrect = option.getAttribute('data-correct') === 'true';

                decoderOptions.forEach(opt => {
                    opt.classList.add('opacity-60', 'pointer-events-none');
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.remove('opacity-60');
                        opt.classList.add('border-morandi-500', 'bg-morandi-50');
                    }
                });

                if (isCorrect) {
                    feedbackBadge.textContent = "Achievement Unlocked";
                    feedbackBadge.className = "px-3 py-1 rounded text-xs font-serif uppercase tracking-wider font-semibold bg-morandi-700 text-white";
                    feedbackTitle.textContent = "Gen Z Lexicon Decoder: Certified";
                    feedbackDesc.textContent = "Spot on! 'Cooked' (performed exceptionally well) combined with 'rizz' (charisma) creates a brand-new idiomatic layer that literal dictionaries cannot capture.";
                } else {
                    feedbackBadge.textContent = "Diagnostic Alert";
                    feedbackBadge.className = "px-3 py-1 rounded text-xs font-serif uppercase tracking-wider font-semibold bg-morandi-300 text-morandi-900";
                    feedbackTitle.textContent = "Severe Generational Translation Error Detected";
                    feedbackDesc.textContent = "Not quite! Relying on literal translation fails because contemporary slang relies on rapid metaphor and subcultural shifts (The correct choice was B).";
                }

                if (decoderFeedback) decoderFeedback.classList.remove('hidden');
                
                unlockButton(btnNext1);
            });
        });
    }

    // ==========================================
    // Module 02: Linguistic Case Studies Logic
    // ==========================================
    // 1. Matching Drill Verification
    const btnCheckMatch = document.getElementById('btn-check-match');
    const matchSelects = document.querySelectorAll('.match-select');
    const matchFeedback = document.getElementById('match-feedback');

    if (btnCheckMatch) {
        btnCheckMatch.addEventListener('click', () => {
            let allCorrect = true;
            const correctAnswers = { "1": "B", "2": "A", "3": "C" };

            matchSelects.forEach(select => {
                const target = select.getAttribute('data-target');
                if (select.value !== correctAnswers[target]) {
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                matchFeedback.textContent = "✨ Excellent! All semantic drifts correctly matched.";
                matchFeedback.className = "text-xs font-serif italic text-morandi-700 font-semibold";
            } else {
                matchFeedback.textContent = "⚠️ Some matches are inaccurate. Review etymological shifts above.";
                matchFeedback.className = "text-xs font-serif italic text-amber-700";
            }
        });
    }

    // 2. Mastery Quiz Evaluation & Page 3 Unlock
    const btnSubmitQuiz = document.getElementById('btn-submit-quiz');
    const quizItems = document.querySelectorAll('.quiz-item');

    if (btnSubmitQuiz) {
        btnSubmitQuiz.addEventListener('click', () => {
            let answeredAll = true;
            let score = 0;

            quizItems.forEach(item => {
                const qNum = item.getAttribute('data-question');
                const correctAnswer = item.getAttribute('data-answer');
                const selected = item.querySelector(`input[name="q${qNum}"]:checked`);
                const feedbackEl = item.querySelector('.quiz-feedback');

                if (!selected) {
                    answeredAll = false;
                } else {
                    feedbackEl.classList.remove('hidden');
                    if (selected.value === correctAnswer) {
                        score++;
                        feedbackEl.textContent = "✓ Correct. Your diagnostic analysis is accurate.";
                        feedbackEl.className = "quiz-feedback text-xs italic mt-2 p-3 rounded bg-morandi-50 text-morandi-900 border border-morandi-300";
                    } else {
                        feedbackEl.textContent = "✗ Incorrect. Review the core linguistic mechanism for this case.";
                        feedbackEl.className = "quiz-feedback text-xs italic mt-2 p-3 rounded bg-amber-50 text-amber-900 border border-amber-200";
                    }
                }
            });

            if (!answeredAll) {
                alert("Please complete all quiz questions before submitting.");
                return;
            }

            unlockButton(btnNext2);
            setTimeout(() => {
                alert(`Quiz Submitted! You scored ${score} / 3. Proceed to Module 03 is now unlocked.`);
            }, 100);
        });
    }

    // ==========================================
    // Module 03: Pillars Manual Acknowledgement Logic
    // ==========================================
    const pillarCheckbox = document.getElementById('pillar-acknowledgement');
    
    if (pillarCheckbox && btnNext3) {
        pillarCheckbox.addEventListener('change', () => {
            if (pillarCheckbox.checked) {
                unlockButton(btnNext3);
            } else {
                lockButton(btnNext3);
            }
        });
    }

    // ==========================================
    // Module 04: REAL AI Editorial Synthesis Logic
    // ==========================================
    const btnGenerateAI = document.getElementById('btn-generate-ai');
    const aiOutputArea = document.getElementById('ai-output-area');
    const aiLoadingOverlay = document.getElementById('ai-loading-overlay');
    const aiStatus = document.getElementById('ai-status');

    // 綁定你部署的 GAS Web App URL
    const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbztuc0sIQUJwqLxi8O-Q9auqf34oGOnrOAe94nz_p7VJhPXGdh8Nf6IG_EoxYwqXqta/exec";

    // 避免重複點擊的狀態鎖
    let isGenerating = false;

    if (btnGenerateAI) {
        btnGenerateAI.addEventListener('click', async () => {
            if (isGenerating) return;
            
            const step2 = document.getElementById('draft-step2').value.trim();
            const step3 = document.getElementById('draft-step3').value.trim();
            const step4 = document.getElementById('draft-step4').value.trim();
            const step5 = document.getElementById('draft-step5').value.trim();

            if (!step2 && !step3 && !step4 && !step5) {
                alert("Please jot down at least a few keywords in the framework before generating.");
                return;
            }

            isGenerating = true;
            btnGenerateAI.classList.add('opacity-50', 'cursor-not-allowed');
            
            aiLoadingOverlay.classList.remove('hidden');
            aiStatus.textContent = "AI is analyzing and synthesizing...";
            aiOutputArea.innerHTML = ""; 

            try {
                // 發送請求 (不設定 Content-Type 標頭以避開嚴格的 CORS OPTIONS 預檢阻擋，內容以 JSON 字串傳遞即可)
                const response = await fetch(GAS_WEB_APP_URL, {
                    method: "POST",
                    body: JSON.stringify({ step2, step3, step4, step5 })
                });

                const result = await response.json();

                if (result.success) {
                    aiLoadingOverlay.classList.add('hidden');
                    aiStatus.textContent = "Editorial Review Complete";
                    aiStatus.classList.replace('text-morandi-300', 'text-morandi-900');

                    // 輸出 AI 生成的內容 (打字機特效版)
                    const finalHTML = `
                        <div class="mb-6 p-5 bg-morandi-50 rounded-xl border border-morandi-100 shadow-sm" style="animation: fadeInPanel 0.5s ease-out forwards;">
                            <h4 class="text-sm font-bold text-morandi-900 mb-2 flex items-center gap-2">✨ AI Editorial Feedback</h4>
                            <p class="text-xs text-morandi-700 leading-relaxed">Your draft has been analyzed. Grammar was corrected, and professional transitions were dynamically synthesized to ensure a TED-style academic delivery.</p>
                        </div>
                        <div class="border-t border-morandi-100 pt-6">
                            <h4 class="text-sm font-bold text-morandi-900 mb-4 tracking-wide uppercase">🎙️ Your Polished Script</h4>
                            <div id="typewriter-script" class="space-y-4 text-sm text-morandi-700 leading-loose"></div>
                        </div>
                        <style>
                            @keyframes fadeInPanel { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                        </style>
                    `;
                    
                    aiOutputArea.innerHTML = finalHTML;
                    
                    const typewriterTarget = document.getElementById('typewriter-script');
                    typewriterTarget.innerHTML = ""; // 確保目標為空
                    
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = result.text; // 填入 AI 真實回傳的內容
                    const textNodes = Array.from(tempDiv.childNodes);
                    
                    // 打字機特效：逐段顯示
                    textNodes.forEach((node, index) => {
                        setTimeout(() => {
                            typewriterTarget.appendChild(node);
                        }, index * 300);
                    });

                } else {
                    throw new Error(result.error || "Unknown server error.");
                }

            } catch (error) {
                console.error("AI Generation Error: ", error);
                aiLoadingOverlay.classList.add('hidden');
                aiStatus.textContent = "Generation Error";
                aiOutputArea.innerHTML = `
                    <div class="p-4 bg-red-50 rounded-xl border border-red-200">
                        <p class="text-red-600 text-sm font-semibold">⚠️ Connection Failed</p>
                        <p class="text-red-500 text-xs mt-1">Failed to connect to the AI editorial server. Please check your internet connection or the GAS deployment log.</p>
                        <p class="text-red-400 text-[10px] mt-2 italic">Error Log: ${error.message}</p>
                    </div>`;
            } finally {
                // 解除按鈕鎖定
                isGenerating = false;
                btnGenerateAI.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    console.log("Lavend/r Academic Framework initialized successfully with full GAS/AI integration.");
});
