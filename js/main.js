/* ==========================================================================
   Lavend/r Academic Editions - Main Interaction Script
   Controller for Page Navigation, Annotations, and Gated Progression
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // State Management & DOM Elements
    // ==========================================
    let currentPage = 1;
    const totalPages = 4;

    const stepIndicator = document.getElementById('step-indicator');
    
    // Navigation Buttons (宣告一次即可)
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
            // Using setTimeout so the alert doesn't block the UI rendering immediately
            setTimeout(() => {
                alert(`Quiz Submitted! You scored ${score} / 3. Proceed to Module 03 is now unlocked.`);
            }, 100);
        });
    }

    // ==========================================
    // Module 03: Pillars Manual Acknowledgement Logic
    // ==========================================
    const pillarCheckbox = document.getElementById('pillar-acknowledgement');
    
    // (已移除重複宣告的 const btnNext3 = document.getElementById('btn-next-3');)

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
    // Module 04: AI Editorial Synthesis Logic
    // ==========================================
    const btnGenerateAI = document.getElementById('btn-generate-ai');
    const aiOutputArea = document.getElementById('ai-output-area');
    const aiLoadingOverlay = document.getElementById('ai-loading-overlay');
    const aiStatus = document.getElementById('ai-status');

    if (btnGenerateAI) {
        btnGenerateAI.addEventListener('click', () => {
            // 1. Collect user drafts
            const step2 = document.getElementById('draft-step2').value.trim();
            const step3 = document.getElementById('draft-step3').value.trim();
            const step4 = document.getElementById('draft-step4').value.trim();
            const step5 = document.getElementById('draft-step5').value.trim();

            // Check if at least some content is provided
            if (!step2 && !step3 && !step4 && !step5) {
                alert("Please jot down at least a few keywords in the framework before generating.");
                return;
            }

            // 2. Trigger Loading UI
            aiLoadingOverlay.classList.remove('hidden');
            aiStatus.textContent = "Processing...";
            aiOutputArea.innerHTML = ""; // Clear previous content

            // 3. Simulate AI API Call (Network Delay)
            setTimeout(() => {
                
                // 完全替換邏輯：如果有填寫就用學生的，沒填寫才用預設的
                const finalStep2 = step2 || "Language isn't just a static dictionary printed decades ago; it is a living, breathing system.";
                const finalStep3 = step3 || "Think of English like a massive open-source software project. We are all developers, constantly patching bugs and releasing new vocabulary updates.";
                const finalStep4 = step4 || "But have you ever wondered who actually approves these updates? Is it just random chaos?";
                const finalStep5 = step5 || "Today, we are going to decode the four foundational pillars of word formation. Let's dive in and see how we reinvent English every single day.";

                // Mock Polished Script (Clean Synthesis)
                const polishedScript = `
                    <p>Imagine this. You show your friend a brand-new, expensive pair of sneakers, and their first reaction is: <em>'Whoa, bro, that’s sick.'</em> Or you’re playing a game, someone is acting weird, and you just say: <em>'You’re acting sus.'</em></p>
                    <p>If you translate these literally, it makes zero sense. But we all know exactly what they mean. ${finalStep2}</p>
                    <p>${finalStep3}</p>
                    <p>${finalStep4}</p>
                    <p>The truth is, there are invisible, highly structured equations behind every new slang term. ${finalStep5}</p>
                `;

                // 4. Remove Loading UI & Start Typewriter Effect
                aiLoadingOverlay.classList.add('hidden');
                aiStatus.textContent = "Polished & Finalized";
                aiStatus.classList.replace('text-morandi-300', 'text-morandi-700');

                // Typewriter Animation
                let i = 0;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = polishedScript;
                const textNodes = Array.from(tempDiv.childNodes);
                
                aiOutputArea.innerHTML = "";
                
                textNodes.forEach((node, index) => {
                    setTimeout(() => {
                        aiOutputArea.appendChild(node);
                    }, index * 400); // Reveal one paragraph every 400ms
                });

            }, 2500); // 2.5 seconds simulated delay
        });
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

    console.log("Lavend/r Academic Framework initialized successfully with optimized Quiz & Match logic.");
});
