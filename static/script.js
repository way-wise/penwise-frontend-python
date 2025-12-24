// ===================================
// MOBILE MENU - Simple and Reliable
// ===================================
// Helper function to find element with retry
function findElementWithRetry(id, maxRetries = 10, delay = 50) {
	let element = document.getElementById(id);
	if (element) return element;
	
	// Try querySelector as backup
	element = document.querySelector('#' + id);
	if (element) return element;
	
	// If still not found and we have retries, wait and try again
	if (maxRetries > 0) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const found = findElementWithRetry(id, maxRetries - 1, delay);
				resolve(found);
			}, delay);
		});
	}
	
	return null;
}

// Global functions for inline handlers
function openMobileMenu() {
	// Try to find elements immediately - use multiple methods
	let menu = document.getElementById('mobileMenu');
	if (!menu) menu = document.querySelector('#mobileMenu');
	if (!menu) menu = document.querySelector('[id="mobileMenu"]');
	
	let overlay = document.getElementById('mobileMenuOverlay');
	if (!overlay) overlay = document.querySelector('#mobileMenuOverlay');
	if (!overlay) overlay = document.querySelector('[id="mobileMenuOverlay"]');
	
	// If still not found, the element doesn't exist - fail silently
	if (!menu) {
		return;
	}
	
	// Show menu
	menu.classList.remove('translate-x-full');
	menu.style.display = 'block';
	menu.style.visibility = 'visible';
	
	// Show overlay
	if (overlay) {
		overlay.classList.remove('hidden');
		overlay.style.display = 'block';
		overlay.style.opacity = '1';
		overlay.style.pointerEvents = 'auto';
		overlay.style.visibility = 'visible';
	}
	
	// Prevent body scroll
	document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
	let menu = document.getElementById('mobileMenu') || document.querySelector('#mobileMenu');
	let overlay = document.getElementById('mobileMenuOverlay') || document.querySelector('#mobileMenuOverlay');
	
	if (!menu) return;
	
	// Hide menu
	menu.classList.add('translate-x-full');
	
	// Hide overlay
	if (overlay) {
		overlay.classList.add('hidden');
		overlay.style.display = 'none';
		overlay.style.opacity = '0';
		overlay.style.pointerEvents = 'none';
	}
	
	// Restore body scroll
	document.body.style.overflow = '';
}

// Create mobile menu if it doesn't exist
function createMobileMenuIfMissing() {
	let mobileMenu = document.getElementById('mobileMenu');
	let mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
	
	if (!mobileMenu || !mobileMenuOverlay) {
		// Create overlay
		if (!mobileMenuOverlay) {
			mobileMenuOverlay = document.createElement('div');
			mobileMenuOverlay.id = 'mobileMenuOverlay';
			mobileMenuOverlay.className = 'fixed inset-0 bg-black/50 z-[55] hidden opacity-0 transition-opacity duration-300 lg:hidden';
			mobileMenuOverlay.style.cssText = 'display: none; visibility: visible;';
			document.body.appendChild(mobileMenuOverlay);
		}
		
		// Create menu
		if (!mobileMenu) {
			mobileMenu = document.createElement('div');
			mobileMenu.id = 'mobileMenu';
			mobileMenu.className = 'fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl transform translate-x-full transition-transform duration-300 lg:hidden';
			mobileMenu.style.cssText = 'display: block; visibility: visible;';
			
			mobileMenu.innerHTML = `
				<div class="flex flex-col h-full">
					<div class="flex items-center justify-between p-6 border-b border-gray-200">
						<a href="/" class="flex items-center gap-2 text-xl font-bold text-black">
							<span>Penwise</span>
						</a>
						<button id="closeMenuBtn" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 text-3xl text-gray-700">&times;</button>
					</div>
					<nav class="flex-1 overflow-y-auto p-6">
						<div class="flex flex-col gap-2">
							<a href="/howitworks" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								How It Works
							</a>
							<a href="/pricing" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								Pricing
							</a>
							<a href="/why-penwise" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								Why Penwise
							</a>
							<a href="/affiliates" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								Affiliates
							</a>
							<a href="/faq" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								FAQ
							</a>
							<a href="/blog" class="mobile-nav-link flex items-center gap-3 p-4 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
								<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
								Blog
							</a>
						</div>
					</nav>
					<div class="p-6 border-t border-gray-200 space-y-3">
						<a href="/login" class="flex justify-center items-center w-full px-6 py-3.5 font-semibold text-gray-900 border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">Log In</a>
						<a href="/register" class="flex justify-center items-center w-full px-6 py-3.5 font-semibold bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full hover:shadow-lg transition-all duration-300">Get Started</a>
					</div>
				</div>
			`;
			
			document.body.appendChild(mobileMenu);
		}
		
		console.log('Mobile menu created dynamically');
	}
}

// Initialize mobile menu event listeners (backup to inline handlers)
function initMobileMenuListeners() {
	// First, create menu if missing
	createMobileMenuIfMissing();
	
	const mobileMenuBtn = document.getElementById('mobileMenuBtn');
	const closeMenuBtn = document.getElementById('closeMenuBtn');
	const mobileMenu = document.getElementById('mobileMenu');
	const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
	
	// Debug: Check if elements exist
	console.log('Mobile menu elements check:', {
		btn: !!mobileMenuBtn,
		menu: !!mobileMenu,
		overlay: !!mobileMenuOverlay,
		closeBtn: !!closeMenuBtn
	});
	
	// Add event listeners if elements exist
	if (mobileMenuBtn) {
		// Remove any existing listeners by cloning
		const newBtn = mobileMenuBtn.cloneNode(true);
		mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
		newBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			openMobileMenu();
		});
	}
	
	if (closeMenuBtn) {
		closeMenuBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeMobileMenu();
		});
	}
	
	// Close on overlay click
	if (mobileMenuOverlay) {
		mobileMenuOverlay.addEventListener('click', closeMobileMenu);
	}
	
	// Close when clicking nav links
	mobileNavLinks.forEach(link => {
		link.addEventListener('click', closeMobileMenu);
	});
	
	// Close on ESC key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			const menu = document.getElementById('mobileMenu');
			if (menu && !menu.classList.contains('translate-x-full')) {
				closeMobileMenu();
			}
		}
	});
}

// Try to initialize immediately and on DOM ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(initMobileMenuListeners, 100);
	});
} else {
	setTimeout(initMobileMenuListeners, 100);
}

// ===================================
// COUNTER ANIMATION
// ===================================
document.addEventListener("DOMContentLoaded", function () {
	function animateCounter(element) {
		const target = parseInt(element.getAttribute("data-count"));
		const suffix = element.getAttribute("data-suffix") || "";
		const duration = 2000;
		const increment = target / (duration / 16);
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

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
	const navbar = document.querySelector("nav");
	if (!navbar) return;
	
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
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
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

	const animatedElements = document.querySelectorAll(
		".stat-item, section#features > div > div"
	);
	animatedElements.forEach((el) => observer.observe(el));
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===================================
// ADD CSS ANIMATIONS
// ===================================
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

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log(
	"%c🚀 Penwise - Write Smarter, Faster, and Better",
	"font-size: 20px; font-weight: bold; color: #000;"
);
console.log(
	"%cBuilt with ❤️ using Tailwind CSS",
	"font-size: 14px; color: #666;"
);

// Dashboard sidebar active menu highlighting
function highlightActiveDashboardMenu() {
	const currentPath = window.location.pathname;
	const menuItems = document.querySelectorAll('#dashboardSidebar nav a');
	
	menuItems.forEach(item => {
		const href = item.getAttribute('href');
		if (href && (currentPath === href || currentPath.startsWith(href + '/'))) {
			item.classList.add('bg-black', 'text-white');
			item.classList.remove('text-gray-700', 'hover:bg-gray-100');
		}
	});
}

// Dashboard mobile menu toggle
function initDashboardMobileMenu() {
	const sidebar = document.getElementById('dashboardSidebar');
	const overlay = document.getElementById('dashboardSidebarOverlay');
	const menuBtn = document.getElementById('dashboardMobileMenuBtn');
	const closeBtn = document.getElementById('sidebarClose');
	const sidebarToggle = document.getElementById('sidebarToggle');
	
	if (!sidebar) {
		console.log('Dashboard sidebar not found');
		return;
	}
	
	function openSidebar() {
		if (sidebar) {
			sidebar.classList.remove('-translate-x-full');
			if (overlay) {
				overlay.classList.remove('hidden');
			}
			document.body.style.overflow = 'hidden';
		}
	}
	
	function closeSidebar() {
		if (sidebar) {
			sidebar.classList.add('-translate-x-full');
			if (overlay) {
				overlay.classList.add('hidden');
			}
			document.body.style.overflow = '';
		}
	}
	
	function toggleSidebar() {
		if (sidebar.classList.contains('-translate-x-full')) {
			openSidebar();
		} else {
			closeSidebar();
		}
	}
	
	// Mobile menu button
	if (menuBtn) {
		menuBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			openSidebar();
		});
	}
	
	// Close button
	if (closeBtn) {
		closeBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeSidebar();
		});
	}
	
	// Desktop sidebar toggle
	if (sidebarToggle) {
		sidebarToggle.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			// Toggle sidebar on desktop (you can customize this behavior)
			toggleSidebar();
		});
	}
	
	// Overlay click to close
	if (overlay) {
		overlay.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeSidebar();
		});
	}
	
	// Close sidebar when clicking on nav links (mobile)
	const navLinks = sidebar.querySelectorAll('nav a');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (window.innerWidth < 1024) {
				closeSidebar();
			}
		});
	});
	
	// Close sidebar on escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && sidebar && !sidebar.classList.contains('-translate-x-full')) {
			closeSidebar();
		}
	});
}

// Initialize dashboard functionality
function initDashboard() {
	highlightActiveDashboardMenu();
	initDashboardMobileMenu();
}

// Initialize dashboard menu highlighting when DOM is ready
function waitForDashboardElements() {
	const sidebar = document.getElementById('dashboardSidebar');
	if (sidebar) {
		initDashboard();
		return true;
	}
	return false;
}

// Try multiple times to ensure elements are loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		if (!waitForDashboardElements()) {
			// Retry after a short delay
			setTimeout(function() {
				if (!waitForDashboardElements()) {
					setTimeout(waitForDashboardElements, 200);
				}
			}, 100);
		}
	});
} else {
	// DOM already loaded
	if (!waitForDashboardElements()) {
		// Retry after a short delay
		setTimeout(function() {
			if (!waitForDashboardElements()) {
				setTimeout(waitForDashboardElements, 200);
			}
		}, 100);
	}
}
