// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Mobile Menu Toggle
	const mobileMenuBtn = document.getElementById("mobileMenuBtn");
	const mobileMenu = document.getElementById("mobileMenu");
	const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
	const closeMenuBtn = document.getElementById("closeMenuBtn");
	const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

	// Check if elements exist
	if (!mobileMenuBtn || !mobileMenu || !closeMenuBtn) {
		console.error("Mobile menu elements not found!");
		return;
	}

	function openMobileMenu() {
		mobileMenu.classList.remove("translate-x-full");
		if (mobileMenuOverlay) {
			// Handle both hidden class and opacity-based overlays
			mobileMenuOverlay.classList.remove("hidden");
			mobileMenuOverlay.classList.remove("opacity-0", "pointer-events-none");
			mobileMenuOverlay.classList.add("opacity-100");
			mobileMenuOverlay.style.pointerEvents = "auto";
		}
		document.body.style.overflow = "hidden";
	}

	function closeMobileMenu() {
		mobileMenu.classList.add("translate-x-full");
		if (mobileMenuOverlay) {
			// Handle both hidden class and opacity-based overlays
			mobileMenuOverlay.classList.add("hidden");
			mobileMenuOverlay.classList.add("opacity-0", "pointer-events-none");
			mobileMenuOverlay.classList.remove("opacity-100");
			mobileMenuOverlay.style.pointerEvents = "none";
		}
		document.body.style.overflow = "";
	}

	mobileMenuBtn.addEventListener("click", openMobileMenu);
	closeMenuBtn.addEventListener("click", closeMobileMenu);

	// Close mobile menu when clicking on links
	mobileNavLinks.forEach((link) => {
		link.addEventListener("click", closeMobileMenu);
	});

	// Close mobile menu when clicking on overlay
	if (mobileMenuOverlay) {
		mobileMenuOverlay.addEventListener("click", closeMobileMenu);
	}

	// Counter Animation Function
	function animateCounter(element) {
		const target = parseInt(element.getAttribute("data-count"));
		const suffix = element.getAttribute("data-suffix") || "";
		const duration = 2000; // 2 seconds
		const increment = target / (duration / 16); // 60 fps
		let current = 0;

		const updateCounter = () => {
			current += increment;
			if (current < target) {
				element.textContent = Math.floor(current) + suffix;
				requestAnimationFrame(updateCounter);
			} else {
				element.textContent = target + suffix;
			}
		};

		updateCounter();
	}

	// Intersection Observer for Counter Animation
	const counters = document.querySelectorAll(".counter-value");
	const counterObserverOptions = {
		threshold: 0.5,
		rootMargin: "0px",
	};

	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
				entry.target.classList.add("counted");
				animateCounter(entry.target);
			}
		});
	}, counterObserverOptions);

	counters.forEach((counter) => {
		counterObserver.observe(counter);
	});
});

// Navbar scroll effect with shadow
const navbar = document.querySelector("nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;

	if (currentScroll > 50) {
		navbar.classList.add("shadow-md");
	} else {
		navbar.classList.remove("shadow-md");
	}

	lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.15,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("opacity-0", "translate-y-8");
			entry.target.classList.add("opacity-100", "translate-y-0");
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
	".stat-item, section#features > div > div"
);
animatedElements.forEach((el) => observer.observe(el));

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		const href = this.getAttribute("href");
		if (href === "#" || href.length <= 1) return;

		e.preventDefault();

		const target = document.querySelector(href);
		if (target) {
			const offsetTop = target.offsetTop - 80;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
	});
});

// Add ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", function (e) {
		const ripple = document.createElement("span");
		const rect = this.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;

		this.style.position = "relative";
		this.style.overflow = "hidden";
		this.appendChild(ripple);

		setTimeout(() => ripple.remove(), 600);
	});
});

// Add ripple animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fade-in 0.8s ease-out;
    }
    
    .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out 0.2s both;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(
	"%c🚀 Penwise - Write Smarter, Faster, and Better",
	"font-size: 20px; font-weight: bold; color: #000;"
);
console.log(
	"%cBuilt with ❤️ using Tailwind CSS",
	"font-size: 14px; color: #666;"
);
