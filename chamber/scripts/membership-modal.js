// Handle timestamp for form load time
window.addEventListener("load", () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }
  });
  
  // Modal pop-up functionality
  document.addEventListener('DOMContentLoaded', function () {
    // Function to open modal
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    }
  
    // Function to close modal
    function closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    }
  
    // Add event listeners to the membership cards
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach(card => {
      card.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        openModal(modalId);
      });
    });
  
    // Close modal when clicking the close button
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function () {
        const modalId = this.closest('.modal').id;
        closeModal(modalId);
      });
    });
  
    // Close modal if user clicks outside the modal
    window.addEventListener('click', function (event) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (event.target === modal) {
          closeModal(modal.id);
        }
      });
    });
  });
  