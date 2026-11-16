/* ==========================================================================
   Lavend/r Academic Editions - Main Interaction Script
   Controller for Page Navigation, Annotations, and Gated Progression
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // State Management
    let currentPage = 1;
    const totalPages = 4;

    // DOM Elements
    const stepIndicator = document.getElementById('step-indicator');

    // Navigation Buttons
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const prevButtons = document.querySelectorAll('.btn-prev');

    // ==========================================
    // Module 01: Gen Z Slang Decoder Logic
    // ==========================================
    const decoderOptions = document.querySelectorAll('.decoder-option');
    const decoderFeedback = document.getElementById('decoder-feedback');
    const feedbackBadge = document.getElementById('feedback-badge');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');

    let hasAnswered = false;

    if (decoderOptions.length > 0) {
        decoderOptions.forEach(option => {
            option.addEventListener('click', () => {
                if (hasAnswered) return; // Lock after first selection
                hasAnswered = true;

                const isCorrect = option.getAttribute('data-correct') === 'true';

                // Style options
                decoderOptions.forEach(opt => {
                    opt.classList.add('opacity-60', 'pointer-events-none');
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.remove('opacity-60');
                        opt.classList.add('border-morandi-500', 'bg-morandi-50');
                    }
                });

                // Populate feedback
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

                // Reveal feedback card
                if (decoderFeedback) {
                    decoderFeedback.classList.remove('hidden');
                }

                // Unlock Next Button
                if (btnNext1) {
                    btnNext1.disabled = false;
                    btnNext1.classList.remove('bg-morandi-300', 'cursor-not-allowed');
                    btnNext1.classList.add('bg-morandi-700', 'hover:bg-morandi-900');
                }
            });
        });
    }

    // ==========================================
    // Page Navigation Controller
    // ==========================================
    function navigateToPage(targetPage) {
        // Hide all pages
        for (let i = 1; i <= totalPages; i++) {
            const page = document.getElementById(`page-${i}`);
            if (page) {
                page.classList.add('hidden');
            }
        }

        // Show target page
        const targetElement = document.getElementById(`page-${targetPage}`);
        if (targetElement) {
            targetElement.classList.remove('hidden');
            currentPage = targetPage;
        }

        // Update Header Step Indicator
        const romanNumerals = ['I', 'II', 'III', 'IV'];
        if (stepIndicator) {
            stepIndicator.textContent = `Phase ${romanNumerals[currentPage - 1]} of IV`;
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event Listeners for Next Buttons
    if (btnNext1) {
        btnNext1.addEventListener('click', () => navigateToPage(2));
    }
    if (btnNext2) {
        btnNext2.addEventListener('click', () => navigateToPage(3));
    }
    if (btnNext3) {
        btnNext3.addEventListener('click', () => navigateToPage(4));
    }

    // Event Listeners for Previous Buttons
    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentPage > 1) {
                navigateToPage(currentPage - 1);
            }
        });
    });

    console.log("Lavend/r Academic Framework initialized successfully.");
});
