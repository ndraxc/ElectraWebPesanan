// Fungsi untuk menyimpan bookmark
function saveBookmark(cardId) {
    const bookmarkedCards = JSON.parse(localStorage.getItem('bookmarkedCards')) || [];
    if (!bookmarkedCards.includes(cardId)) {
      bookmarkedCards.push(cardId);
      localStorage.setItem('bookmarkedCards', JSON.stringify(bookmarkedCards));
      alert('Card bookmarked!');
    }
  }
  
  // Fungsi untuk menghapus bookmark
  function removeBookmark(cardId) {
    const bookmarkedCards = JSON.parse(localStorage.getItem('bookmarkedCards')) || [];
    const updatedCards = bookmarkedCards.filter(id => id !== cardId);
    localStorage.setItem('bookmarkedCards', JSON.stringify(updatedCards));
    alert('Card removed from bookmark!');
  }
  
  // Fungsi untuk menampilkan bookmarked cards di halaman bookmark
  function displayBookmarkedCards() {
    const bookmarkedCards = JSON.parse(localStorage.getItem('bookmarkedCards')) || [];
    const container = document.getElementById('bookmark-container');
    container.innerHTML = ''; // Bersihkan container
  
    bookmarkedCards.forEach(cardId => {
      const card = document.querySelector(`[data-id="${cardId}"]`).closest('.product-card');
      if (card) {
        const clonedCard = card.cloneNode(true);
        const button = clonedCard.querySelector('.bookmark-btn');
        button.textContent = 'Remove Bookmark';
        button.onclick = () => {
          removeBookmark(cardId);
          displayBookmarkedCards();
        };
        container.appendChild(clonedCard);
      }
    });
  }
  
  // Event Listener untuk Bookmark Button
  document.addEventListener('click', function (e) {
    if (e.target.closest('.bookmark-btn')) {
      const button = e.target.closest('.bookmark-btn');
      const cardId = button.getAttribute('data-id');
      if (!button.classList.contains('bookmarked')) {
        saveBookmark(cardId);
        button.classList.add('bookmarked');
        button.title = 'Remove Bookmark';
      } else {
        removeBookmark(cardId);
        button.classList.remove('bookmarked');
        button.title = 'Bookmark';
      }
    }
  });
  
  // Muat ulang state bookmark saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    const bookmarkedCards = JSON.parse(localStorage.getItem('bookmarkedCards')) || [];
    bookmarkedCards.forEach(cardId => {
      const button = document.querySelector(`.bookmark-btn[data-id="${cardId}"]`);
      if (button) {
        button.classList.add('bookmarked');
        button.title = 'Remove Bookmark';
      }
    });
  });
  