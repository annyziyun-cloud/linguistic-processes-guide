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
    const annotationTriggers = document.querySelectorAll('.annotation-trigger');
    const annotationBox = document.getElementById('annotation-box');
    const annotationText = document.getElementById('annotation-text');

    // Navigation Buttons
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const prevButtons = document.querySelectorAll('.btn-prev');

    // 1. Module 1: Annotation Trigger Logic
    annotationTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const note = trigger.getAttribute('data-note');
            annotationText.textContent = note;
            annotationBox.classList.remove('hidden');
            
            // Subtle highlight effect on active trigger
            annotationTriggers.forEach(t => t.classList.remove('text-morandi-500'));
            trigger.classList.add('text-morandi-500');
        });
    });

    // 2. Page Navigation Controller
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
        stepIndicator.textContent = `Phase ${romanNumerals[currentPage - 1]} of IV`;

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Event Listeners for Next Buttons
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
