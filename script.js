document.addEventListener("DOMContentLoaded", function () {
    // Define DOM elements
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const icon = document.querySelector(".menu-toggle i");
    const navLinks = document.querySelectorAll(".nav-link");
    const reservationForm = document.getElementById('reservationForm');

    if (menuToggle && menu && icon) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");

            if (menu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                document.body.classList.remove("no-scroll");
            }
        });
    }
    if (navLinks && menu && icon) {
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (menu.classList.contains("active")) {
                    menu.classList.remove("active");
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                    document.body.classList.remove("no-scroll");
                }
            });
        });
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert("Thank you! Your table has been reserved. We look forward to serving you.");
            this.reset();
        });
    }
});




const API_KEY = "AIzaSyD3UsXgp2Rj-UYGFKQ-eIAd0GF0M5HydbI"; 
const FOLDER_ID = "1e55or3BL_1TJb-aDla2w4cZhUbFSNzpH"; 

const gallery = document.getElementById("gallery");

// Google Drive API endpoint
const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
  `'${FOLDER_ID}' in parents and trashed = false`
)}&key=${API_KEY}&fields=files(id,name,mimeType)`;

// Load Gallery
async function loadGallery() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!gallery) {
      console.error("Gallery element not found.");
      return;
    }

    gallery.innerHTML = ""; // clear old items

    if (!data.files || data.files.length === 0) {
      gallery.innerHTML = "<p>No images found in this folder.</p>";
      return;
    }

    data.files.forEach(file => {
      if (file.mimeType && file.mimeType.startsWith("image/")) {
        const item = document.createElement("div");
        item.classList.add("gallery-item");

        // ✅ Always use uc?id=FILE_ID to embed properly
        const img = document.createElement("img");
        img.src = `https://drive.google.com/uc?id=${file.id}`;
        img.alt = file.name;

        const caption = document.createElement("div");
        caption.classList.add("gallery-caption");
        caption.innerText = file.name.replace(/\.[^/.]+$/, ""); // remove extension

        item.appendChild(img);
        item.appendChild(caption);

        // Lightbox event
        item.addEventListener("click", () =>
          openLightbox(img.src, caption.innerText)
        );

        gallery.appendChild(item);
      }
    });
  } catch (error) {
    console.error("Error loading gallery:", error);
    if (gallery) {
      gallery.innerHTML = "<p>⚠️ Failed to load images.</p>";
    }
  }
}

// Lightbox Functions
function openLightbox(src, caption) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  lightbox.style.display = "flex";
  lightboxImg.src = src;
  lightboxCaption.innerText = caption;
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

// Load images on page load
loadGallery();
