// Extracted from romantic-letter-complete.html
// Elements
const body = document.body;
const greetingScreen = document.getElementById("greetingScreen");
const buttonContainer = document.getElementById("buttonContainer");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const main = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const closeBtn = document.getElementById("closeBtn");
const starsContainer = document.getElementById("stars");
const moon = document.getElementById("moon");
const cloud = document.getElementById("cloud");

let opened = false;
let noButtonClicks = 0;

// Create stars
for (let i = 0; i < 150; i++) {
	const star = document.createElement('div');
	star.className = 'star';
	star.style.left = Math.random() * 100 + '%';
	star.style.top = Math.random() * 100 + '%';
	star.style.animationDelay = Math.random() * 3 + 's';
	star.style.opacity = Math.random() * 0.5 + 0.2;
	starsContainer.appendChild(star);
}

// Button "Mau baca" clicked
btnYes.addEventListener("click", function() {
	greetingScreen.classList.add("hide");
  
	setTimeout(() => {
		envelopeWrapper.classList.add("show");
	}, 800);
});

// Function to move button to random position
function moveButtonAway() {
	noButtonClicks++;
  
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const buttonRect = btnNo.getBoundingClientRect();
  
	// Use larger margin on mobile for better UX
	const isMobile = windowWidth <= 768;
	const margin = isMobile ? 20 : 50;
  
	// Generate random position anywhere on screen with margin
	const maxX = windowWidth - buttonRect.width - margin * 2;
	const maxY = windowHeight - buttonRect.height - margin * 2;
  
	const randomX = Math.random() * maxX + margin;
	const randomY = Math.random() * maxY + margin;
  
	// Make button fixed position to move anywhere
	btnNo.style.position = 'fixed';
	btnNo.style.left = randomX + 'px';
	btnNo.style.top = randomY + 'px';
	btnNo.style.transform = 'none'; // Reset any transforms
  
	// Change text after several attempts
	if (noButtonClicks === 3) {
		btnNo.textContent = "Yakin ga mau?";
	} else if (noButtonClicks === 5) {
		btnNo.textContent = "Ayolahh~";
	} else if (noButtonClicks === 7) {
		btnNo.textContent = "Pleasee 🥺";
	} else if (noButtonClicks === 10) {
		btnNo.textContent = "Klik yang pink!";
	} else if (noButtonClicks > 12) {
		btnNo.textContent = "Udah deh, nyerah! 😭";
	}
}

// Button "Buka aja" - runs away when hovered or touched
btnNo.addEventListener("mouseenter", function(e) {
	if (window.innerWidth > 768) { // Only on desktop
		moveButtonAway();
	}
});

btnNo.addEventListener("touchstart", function(e) {
	e.preventDefault();
	moveButtonAway();
});

btnNo.addEventListener("click", function(e) {
	e.preventDefault();
	moveButtonAway();
});

// Create sparkles
function createSparkles(x, y) {
	for (let i = 0; i < 15; i++) {
		const sparkle = document.createElement('div');
		sparkle.className = 'sparkle';
		sparkle.style.left = x + 'px';
		sparkle.style.top = y + 'px';
    
		const angle = (Math.PI * 2 * i) / 15;
		const distance = 50 + Math.random() * 50;
		const tx = Math.cos(angle) * distance;
		const ty = Math.sin(angle) * distance;
    
		sparkle.style.setProperty('--tx', tx + 'px');
		sparkle.style.setProperty('--ty', ty + 'px');
    
		document.body.appendChild(sparkle);
    
		setTimeout(() => sparkle.remove(), 1000);
	}
}

// Open envelope
envelopeWrapper.addEventListener("click", function(e) {
	if (opened) return;
	opened = true;

	// Create sparkles at click position
	const rect = envelopeWrapper.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	createSparkles(x, y);

	// Add clicked class
	envelopeWrapper.classList.add("clicked");
  
	// Try to play music
	music.play().catch(() => {});

	// Transform background to sky after envelope starts flying
	setTimeout(() => {
		body.classList.add('sky-mode');
		starsContainer.classList.add('show');
		moon.classList.add('show');
		cloud.classList.add('show');
	}, 800);

	// Show main content
	setTimeout(() => {
		main.classList.add("show");
	}, 2000);
});

// Close button
closeBtn.addEventListener("click", function(e) {
	e.stopPropagation();
  
	main.classList.remove("show");
  
	setTimeout(() => {
		// Hide sky elements
		body.classList.remove('sky-mode');
		starsContainer.classList.remove('show');
		moon.classList.remove('show');
		cloud.classList.remove('show');
    
		// Reset envelope
		envelopeWrapper.classList.remove("clicked");
		envelopeWrapper.classList.remove("show");
    
		// Show greeting screen again
		greetingScreen.classList.remove("hide");
    
		// Reset button position and text
		btnNo.style.position = 'absolute';
		btnNo.style.left = '';
		btnNo.style.top = '';
		btnNo.textContent = 'Buka aja';
		noButtonClicks = 0;
    
		opened = false;
	}, 600);
});

