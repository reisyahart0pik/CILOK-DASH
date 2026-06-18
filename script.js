const filterButtons = document.querySelectorAll(".tab-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // hapus active lama
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // kasih active baru
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.type === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});
function showGallery(type){

  const items =
  document.querySelectorAll('.gallery-item');

  items.forEach(item => {

    if(item.dataset.type === type){
      item.style.display = "block";
    }else{
      item.style.display = "none";
    }

  });

}
// ====================================
// RATING
// ====================================
(function() {
  let selected = 0;
  const reviews = [];
  const labels = ['','Jelek 😞','Kurang 😐','Lumayan 🙂','Bagus 😊','Keren banget! 🤩'];
  const stars = document.querySelectorAll('.star');

  stars.forEach(s => {
    s.addEventListener('mouseover', () => highlightStars(+s.dataset.val));
    s.addEventListener('mouseout',  () => highlightStars(selected));
    s.addEventListener('click', () => {
      selected = +s.dataset.val;
      highlightStars(selected);
      document.getElementById('starLabel').textContent = labels[selected];
    });
  });

  function highlightStars(n) {
    stars.forEach(s => {
      const v = +s.dataset.val;
      s.classList.toggle('active', v <= n);
    });
  }

  document.getElementById('submitRating').addEventListener('click', () => {
    const name    = document.getElementById('nameInput').value.trim();
    const comment = document.getElementById('commentInput').value.trim();
    const err     = document.getElementById('errMsg');

    if (!selected)  { err.textContent = 'Pilih bintang dulu ya! ⭐'; return; }
    if (!name)      { err.textContent = 'Nama tidak boleh kosong.';   return; }
    if (!comment)   { err.textContent = 'Komentar tidak boleh kosong.'; return; }
    err.textContent = '';

    reviews.unshift({ name, comment, stars: selected });

    document.getElementById('nameInput').value    = '';
    document.getElementById('commentInput').value = '';
    selected = 0;
    highlightStars(0);
    document.getElementById('starLabel').textContent = '';

    renderReviews();
  });

  function renderReviews() {
    const avg = reviews.reduce((a, r) => a + r.stars, 0) / reviews.length;
    const rounded = Math.round(avg * 10) / 10;

    document.getElementById('ratingSummary').style.display = 'block';
    document.getElementById('avgScore').textContent  = rounded.toFixed(1);
    document.getElementById('avgStars').textContent  = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
    document.getElementById('totalCount').textContent = reviews.length + ' ulasan';

    document.getElementById('reviewList').innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-top">
          <span class="review-name">${r.name}</span>
          <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
        </div>
        <p class="review-comment">${r.comment}</p>
      </div>
    `).join('');
  }
})();