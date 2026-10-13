// Fade in elements on scroll
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.fi').forEach(function(el) {
  observer.observe(el);
});


// Pill nav active state on scroll
const sections = [
  ['home', 0],
  ['expertise', 1],
  ['projects', 2],
  ['contact', 3]
];

const navLinks = document.querySelectorAll('.pill-nav a');

window.addEventListener('scroll', function() {
  const y = window.scrollY + 130;

  sections.forEach(function(pair) {
    const id = pair[0];
    const index = pair[1];
    const el = document.getElementById(id);

    if (el && el.offsetTop <= y) {
      navLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      if (navLinks[index]) {
        navLinks[index].classList.add('active');
      }
    }
  });
});


// Music player
const tracks = [
  {
    audio: document.getElementById('audio0'),
    eq: document.getElementById('eq0'),
    name: 'Kanye West - ALL THE LOVE (feat. Andre Troutman)'
  },
  {
    audio: document.getElementById('audio1'),
    eq: document.getElementById('eq1'),
    name: 'Empire Cast - Why Not (From EmpireShowcase Version)'
  },
  {
    audio: document.getElementById('audio2'),
    eq: document.getElementById('eq2'),
    name: 'Nicki Minaj - Moment 4 Life'
  }
];

const playBtn    = document.getElementById('playBtn');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');
const nowPlaying = document.getElementById('nowPlaying');
const trackRows  = document.querySelectorAll('.track-row');

let current = 0;
let isPlaying = false;

function stopAll() {
  tracks.forEach(function(track, i) {
    track.audio.pause();
    track.audio.currentTime = 0;
    track.eq.style.display = 'none';
  });
}

function playTrack(index) {
  stopAll();
  current = index;

  var track = tracks[current];

  if (track.audio.src && track.audio.src !== window.location.href) {
    track.audio.play().catch(function() {});
  }

  track.eq.style.display = 'flex';
  nowPlaying.textContent = track.name;
  isPlaying = true;

  playBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/></svg>';

  track.audio.onended = function() {
    if (current < tracks.length - 1) {
      playTrack(current + 1);
    } else {
      pausePlayer();
    }
  };
}

function pausePlayer() {
  tracks[current].audio.pause();
  tracks[current].eq.style.display = 'none';
  isPlaying = false;
  playBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>';
}

playBtn.addEventListener('click', function() {
  if (isPlaying) {
    pausePlayer();
  } else {
    playTrack(current);
  }
});

prevBtn.addEventListener('click', function() {
  var prev = current > 0 ? current - 1 : tracks.length - 1;
  playTrack(prev);
});

nextBtn.addEventListener('click', function() {
  var next = current < tracks.length - 1 ? current + 1 : 0;
  playTrack(next);
});

trackRows.forEach(function(row) {
  row.addEventListener('click', function() {
    playTrack(parseInt(row.dataset.index));
  });
});
