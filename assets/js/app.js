


particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 0.1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#000000",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }
);

// Automate Age Calculation
function updateAge() {
  const dob = new Date("2002-09-05"); // UPDATE THIS WITH YOUR BIRTHDAY (YYYY-MM-DD)
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);
  const age = Math.abs(age_dt.getUTCFullYear() - 1970);
  const ageElement = document.getElementById('dynamic-age');
  if (ageElement) {
    ageElement.innerText = age;
  }
}
updateAge();

// Birthday Celebration Logic
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  // Month is 0-indexed (0=Jan, 8=Sept)
  // Checking for September 5th

  // Logic set to trigger only on September 5th
  const isBirthday = today.getMonth() === 8 && today.getDate() === 5;

  if (isBirthday) {
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    console.log("Happy Birthday! Celebration mode active.");

    // Show Overlay
    const overlay = document.getElementById('birthday-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }
});

// Disable context menu on images
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Calendar Modal Logic
const logo = document.querySelector('.logo');
const calendarModal = document.getElementById('calendar-modal');
const closeCalendar = document.querySelector('.close-calendar');
const calendarContent = document.getElementById('calendar-content');

if (logo && calendarModal) {
  logo.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior if any
    if (calendarModal.style.display === 'none' || calendarModal.style.display === '') {
      generateCalendar();
      calendarModal.style.display = 'flex';
    } else {
      calendarModal.style.display = 'none';
    }
  });
}

if (closeCalendar) {
  closeCalendar.addEventListener('click', function () {
    calendarModal.style.display = 'none';
  });
}

// Close calendar when clicking outside
window.addEventListener('click', function (e) {
  if (e.target == calendarModal) {
    calendarModal.style.display = 'none';
  }
});

function generateCalendar() {
  const year = new Date().getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let html = '';

  months.forEach((month, index) => {
    html += `<div class="calendar-month"><h3>${month}</h3><div class="calendar-grid">`;

    // Month Header (S M T W T F S)
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    days.forEach(day => html += `<div class="calendar-day-header">${day}</div>`);

    const firstDay = new Date(year, index, 1).getDay();
    const daysInMonth = new Date(year, index + 1, 0).getDate();

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      html += `<div></div>`;
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      let className = 'calendar-day';
      // Highlight Sept 5 (Month index 8)
      if (index === 8 && d === 5) {
        className += ' birthday';
      }
      html += `<div class="${className}">${d}</div>`;
    }

    html += `</div></div>`;
  });

  calendarContent.innerHTML = html;
}