// ===== LOADER WITH ROLE CYCLING =====
var loaderRoles = ['Java Developer', 'Web Developer', 'Problem Solver', 'DSA Enthusiast', 'Full Stack Learner'];
var loaderIdx = 0;
var loaderRoleEl = document.getElementById('loaderRole');

var loaderCycle = setInterval(function() {
    loaderIdx = (loaderIdx + 1) % loaderRoles.length;
    if (loaderRoleEl) {
        loaderRoleEl.style.opacity = '0';
        loaderRoleEl.style.transform = 'translateY(-8px)';
        setTimeout(function() {
            loaderRoleEl.textContent = loaderRoles[loaderIdx];
            loaderRoleEl.style.opacity = '1';
            loaderRoleEl.style.transform = 'translateY(0)';
        }, 200);
    }
}, 600);

setTimeout(function() {
    clearInterval(loaderCycle);
    document.getElementById('loader').classList.add('hidden');
}, 3200);

// ===== PARTICLES =====
var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');
var dots = [];
var pmouse = { x: null, y: null };

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);
document.addEventListener('mousemove', function(e) { pmouse.x = e.clientX; pmouse.y = e.clientY; });

function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.25 + 0.05;
}
Dot.prototype.update = function() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
    if (pmouse.x !== null) {
        var dx = this.x - pmouse.x, dy = this.y - pmouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) { this.x += dx * 0.01; this.y += dy * 0.01; }
    }
};
Dot.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59,130,246,' + this.opacity + ')';
    ctx.fill();
};

var dotCount = Math.min(Math.floor(window.innerWidth / 14), 80);
for (var i = 0; i < dotCount; i++) dots.push(new Dot());

function drawLines() {
    for (var a = 0; a < dots.length; a++) {
        for (var b = a + 1; b < dots.length; b++) {
            var dx = dots[a].x - dots[b].x, dy = dots[a].y - dots[b].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(59,130,246,' + (0.04 * (1 - dist / 100)) + ')';
                ctx.lineWidth = 0.4;
                ctx.moveTo(dots[a].x, dots[a].y);
                ctx.lineTo(dots[b].x, dots[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < dots.length; i++) { dots[i].update(); dots[i].draw(); }
    drawLines();
    requestAnimationFrame(animateDots);
}
animateDots();

// ===== NAV =====
var navEl = document.getElementById('nav');
window.addEventListener('scroll', function() { navEl.classList.toggle('scrolled', window.scrollY > 40); });

var menuToggle = document.getElementById('menuToggle');
var navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});
var menuLinks = document.querySelectorAll('.nav-menu a');
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function() {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
}

// Smooth scroll
var anchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
        e.preventDefault();
        var t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ===== HERO 3D =====
var hero3d = document.getElementById('hero3d');
var heroSection = document.querySelector('.hero');
if (heroSection && hero3d) {
    heroSection.addEventListener('mousemove', function(e) {
        var r = heroSection.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        hero3d.style.transform = 'rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 20) + 'deg)';
    });
    heroSection.addEventListener('mouseleave', function() {
        hero3d.style.transform = 'rotateY(0) rotateX(0)';
    });
}

// ===== TYPING =====
var roles = ['Student Developer', 'Java Enthusiast', 'Problem Solver', 'DSA Learner', 'Future Full Stack Dev'];
var rIdx = 0, cIdx = 0, isDel = false;
var roleEl = document.getElementById('heroRole');

function typeIt() {
    if (!roleEl) return;
    var word = roles[rIdx];
    cIdx = isDel ? cIdx - 1 : cIdx + 1;
    roleEl.textContent = word.substring(0, cIdx);
    var delay = isDel ? 35 : 70;
    if (!isDel && cIdx === word.length) { delay = 2000; isDel = true; }
    else if (isDel && cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
    setTimeout(typeIt, delay);
}
setTimeout(typeIt, 3500);

// ===== SCROLL REVEAL =====
function reveal() {
    var els = document.querySelectorAll('.fade-in, .fade-left, .fade-right');
    for (var i = 0; i < els.length; i++) {
        if (els[i].getBoundingClientRect().top < window.innerHeight - 80) {
            els[i].classList.add('show');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal();

// ===== SKILL BARS =====
function fillBars() {
    var bars = document.querySelectorAll('.s-bar-fill');
    for (var i = 0; i < bars.length; i++) {
        if (bars[i].getBoundingClientRect().top < window.innerHeight - 50) {
            bars[i].style.width = bars[i].getAttribute('data-width') + '%';
        }
    }
}
window.addEventListener('scroll', fillBars);

// ===== COUNTERS =====
function counters() {
    var nums = document.querySelectorAll('[data-count]');
    for (var i = 0; i < nums.length; i++) {
        var el = nums[i];
        if (el.getBoundingClientRect().top < window.innerHeight - 50 && !el.classList.contains('counted')) {
            el.classList.add('counted');
            (function(el) {
                var target = parseInt(el.getAttribute('data-count'));
                var isP = el.classList.contains('special');
                var cur = 0;
                var step = Math.max(target / 40, 1);
                var t = setInterval(function() {
                    cur += step;
                    if (cur >= target) { el.textContent = target + (isP ? '%' : '+'); clearInterval(t); }
                    else { el.textContent = Math.floor(cur) + (isP ? '%' : '+'); }
                }, 40);
            })(el);
        }
    }
}
window.addEventListener('scroll', counters);

// ===== 3D TILT =====
var tiltCards = document.querySelectorAll('.s-card, .p-card');
for (var i = 0; i < tiltCards.length; i++) {
    tiltCards[i].addEventListener('mousemove', function(e) {
        var r = this.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        var rx = (y - r.height / 2) / 16, ry = (r.width / 2 - x) / 16;
        this.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-6px)';
    });
    tiltCards[i].addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

// ===== FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size:12px"></i> Sending...';
    btn.disabled = true;
    var form = this;
    setTimeout(function() {
        btn.classList.add('sent');
        btn.innerHTML = '<i class="fas fa-check" style="font-size:12px"></i> Sent!';
        setTimeout(function() {
            btn.classList.remove('sent');
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="font-size:12px"></i>';
            btn.disabled = false;
            form.reset();
        }, 3000);
    }, 1500);
});

// ===== PARALLAX =====
window.addEventListener('scroll', function() {
    var s = window.scrollY;
    var glows = document.querySelectorAll('.hero-glow');
    for (var i = 0; i < glows.length; i++) {
        glows[i].style.transform = 'translateY(' + (s * (i + 1) * 0.03) + 'px)';
    }
});
