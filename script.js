document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    function switchTab(targetId) {
        // Update Buttons
        tabs.forEach(tab => {
            if (tab.dataset.tab === targetId) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        // Update Panels
        panels.forEach(panel => {
            if (panel.id === targetId) {
                panel.hidden = false;
                // Add fade-in animation class if desired
                panel.classList.add('fade-in');
            } else {
                panel.hidden = true;
                panel.classList.remove('fade-in');
            }
        });
    }

    // Event Listeners
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            switchTab(targetId);
        });
    });

    // Handle initial state (if hash is present or default to first tab)
    const initialTab = 'overview';
    switchTab(initialTab);
});
