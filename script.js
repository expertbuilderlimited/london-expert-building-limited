// NAV: toggle mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

/* --- Reviews data --- 
   Key = filename (exact, e.g. "photo1.jpg", "video2.mp4")
   Each entry is an array of review objects { reviewer, rating (4 or 5), comment }
*/
const reviewsData = {
  "photo1.jpg": [
    { reviewer: "Liam Carter", rating: 5, comment: "Stunning composition and perfect lighting — absolutely thrilled with the final result." },
    { reviewer: "Olivia Reed", rating: 5, comment: "Exceptional attention to detail. The colours are beautifully rendered." }
  ],
  "photo2.jpg": [
    { reviewer: "Maya Thompson", rating: 5, comment: "A wonderfully evocative piece. The mood is captured perfectly." }
  ],
  "photo3.jpg": [
    { reviewer: "Ethan Brooks", rating: 4, comment: "Very impressive — a small tweak in contrast would make it flawless." },
    { reviewer: "Sofia Lane", rating: 5, comment: "Beautifully shot and edited. Would happily work with you again." }
  ],
  "photo4.jpg": [
    { reviewer: "Noah Patel", rating: 5, comment: "Amazing composition. This exceeded our expectations on every level." }
  ],
  "photo5.jpg": [
    { reviewer: "Ava Morgan", rating: 4, comment: "Great aesthetic and professionalism. Minor color adjustments suggested." }
  ],
  "photo6.jpg": [
    { reviewer: "Lucas Grant", rating: 5, comment: "Superb attention to texture and light — one of my favourites." },
    { reviewer: "Chloe Ford", rating: 5, comment: "Highly recommended: creative, punctual and the outcome is top quality." }
  ],
  "photo7.jpg": [
    { reviewer: "Harper Cole", rating: 4, comment: "Very strong concept and clean execution. A small crop would improve balance." }
  ],
  "photo8.jpg": [
    { reviewer: "Mason King", rating: 5, comment: "Absolutely beautiful — professional and communicative throughout." }
  ],
  "video1.mp4": [
    { reviewer: "Isabella Shaw", rating: 5, comment: "Cinematic and polished — the narrative and pacing are excellent." }
  ],
  "video2.mp4": [
    { reviewer: "James Ortiz", rating: 5, comment: "Outstanding direction and color grading — very impactful." },
    { reviewer: "Lily Park", rating: 4, comment: "Great footage; would increase audio clarity for broadcast." }
  ],
  "video3.mp4": [
    { reviewer: "Daniel Perez", rating: 5, comment: "A beautifully constructed story with crisp visuals." }
  ],
  "video4.mp4": [
    { reviewer: "Emma Wright", rating: 4, comment: "Strong editing choices — slight tempo adjustment recommended." }
  ]
};

/* ----------------------- IMAGE LIGHTBOX ----------------------- */
function openLightbox(src, key) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const reviewsPanel = document.getElementById('reviews-panel');

  img.src = src;
  lb.style.display = 'flex';

  // Render reviews for the given key
  renderReviewsForKey(reviewsPanel, key);
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const reviewsPanel = document.getElementById('reviews-panel');

  img.src = '';
  reviewsPanel.innerHTML = '';
  lb.style.display = 'none';
}

/* ----------------------- VIDEO LIGHTBOX ----------------------- */
function openVideoLightbox(src, key) {
  const lb = document.getElementById('videoLightbox');
  const vid = document.getElementById('lightbox-video');
  const reviewsPanel = document.getElementById('reviews-panel-video');

  // If key wasn't provided, derive the filename from the src
  if (!key && typeof src === 'string') {
    key = src.split('/').pop();
  }

  vid.src = src;
  vid.currentTime = 0;
  lb.style.display = 'flex';

  // play after tiny delay
  setTimeout(() => { try { vid.play(); } catch(e) {} }, 100);

  // Render reviews for the given key
  renderReviewsForKey(reviewsPanel, key);
}
function closeVideoLightbox() {
  const lb = document.getElementById('videoLightbox');
  const vid = document.getElementById('lightbox-video');
  const reviewsPanel = document.getElementById('reviews-panel-video');

  try { vid.pause(); } catch(e) {}
  vid.src = '';
  reviewsPanel.innerHTML = '';
  lb.style.display = 'none';
}

/* ----------------------- RENDERING REVIEWS ----------------------- */
function renderReviewsForKey(container, key) {
  container.innerHTML = ''; // clear

  // if we still don't have a key, show 'no reviews' text
  if (!key) {
    container.innerHTML = '<div class="no-reviews">No reviews available for this project.</div>';
    return;
  }

  const reviews = reviewsData[key];
  if (!reviews || reviews.length === 0) {
    container.innerHTML = '<div class="no-reviews">No reviews available for this project.</div>';
    return;
  }

  // Title
  const title = document.createElement('div');
  title.className = 'reviews-title';
  title.style.fontWeight = '700';
  title.style.marginBottom = '0.6rem';
  title.textContent = 'Client Reviews';
  container.appendChild(title);

  // Each review
  reviews.forEach(r => {
    const rev = document.createElement('div');
    rev.className = 'review';

    const name = document.createElement('div');
    name.className = 'reviewer';
    name.textContent = r.reviewer;
    rev.appendChild(name);

    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.innerHTML = renderStars(r.rating);
    rev.appendChild(rating);

    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.textContent = r.comment;
    rev.appendChild(comment);

    container.appendChild(rev);
  });
}

// returns stars HTML; filled (gold) stars for rating and dim for remainder
function renderStars(rating) {
  let out = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      out += '<span class="star">★</span>';
    } else {
      out += '<span class="star dim">★</span>';
    }
  }
  return out;
}

/* CONTACT FORM HANDLER (mailto fallback) */
function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById('c_name').value.trim();
  const email = document.getElementById('c_email').value.trim();
  const message = document.getElementById('c_message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const to = 'expertbuilder999uk@gmail.com';
  const subject = encodeURIComponent(`Website message from ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));

  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
}
