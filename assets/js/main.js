document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Mobile menu toggle
  const navTrigger = document.querySelector('.nav-trigger');
  if (navTrigger) {
    navTrigger.addEventListener('change', function() {
      document.body.classList.toggle('nav-open', this.checked);
    });
  }
  
  // Form validation
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      this.querySelectorAll('input, textarea').forEach(field => {
        if (field.required && !field.value.trim()) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (valid) {
        alert('Благодарим ви за вашето съобщение! Ще се свържем с вас възможно най-скоро.');
        this.reset();
      }
    });
  }
  
  // Gallery modal functionality
  const galleryModal = document.getElementById('gallery-modal');
  const galleryTitle = document.getElementById('gallery-title');
  const galleryMainImage = document.getElementById('gallery-main-image');
  const galleryThumbnails = document.getElementById('gallery-thumbnails');
  const closeGallery = document.querySelector('.close-gallery');
  
  // Gallery data is now loaded from services.yml through data-attributes
  
  // Gallery pagination settings
  const THUMBNAILS_PER_PAGE = 12;
  
  // Open gallery when clicking on a service card
  document.querySelectorAll('.service-card .view-gallery-btn').forEach(button => {
    button.addEventListener('click', function() {
      const serviceCard = this.closest('.service-card');
      const title = serviceCard.dataset.title || 'Галерия';
      
      // Get images from data attribute
      // Handle both array objects and JSON strings
      let images = [];
      try {
        const imagesData = serviceCard.dataset.images;
        if (imagesData) {
          // Check if it's already an array or needs parsing
          if (Array.isArray(imagesData)) {
            images = imagesData;
          } else {
            // Try to parse as JSON, but if it fails, split by commas
            try {
              images = JSON.parse(imagesData);
            } catch (e) {
              // Handle the case where JSON parsing fails
              console.log("JSON parsing failed, using string directly:", e);
              // Remove brackets and quotes, then split by commas
              const strippedData = imagesData.replace(/^\[|\]$/g, '').replace(/"/g, '');
              if (strippedData) {
                images = strippedData.split(',');
              }
            }
          }
        }
      } catch (error) {
        console.error("Error processing gallery images:", error);
      }
      
      if (images.length === 0) {
        alert('В момента няма налични изображения в тази галерия.');
        return;
      }
      
      // Set gallery title
      galleryTitle.textContent = title;
      
      // Clear thumbnails
      galleryThumbnails.innerHTML = '';
      
      // Show first page of thumbnails and create pagination if needed
      renderGalleryPage(images, title, 0);
      
      // Set loading state
      galleryMainImage.classList.add('loading');
      
      // Set main image with load event
      galleryMainImage.alt = `${title} - Изображение 1`;
      
      // Create new image to preload
      const preloadImg = new Image();
      preloadImg.onload = function() {
        galleryMainImage.src = images[0];
        galleryMainImage.classList.remove('loading');
      };
      preloadImg.onerror = function() {
        console.error("Error loading image:", images[0]);
        galleryMainImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="300" height="200"%3E%3Crect width="1" height="1" fill="%23333"/%3E%3Ctext x="0.5" y="0.5" font-family="Arial" font-size="0.1" fill="white" text-anchor="middle" alignment-baseline="middle"%3EИзображението не е налично%3C/text%3E%3C/svg%3E';
        galleryMainImage.classList.remove('loading');
      };
      preloadImg.src = images[0];
      
      // Show modal
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Render a specific page of gallery thumbnails
  function renderGalleryPage(images, title, pageIndex) {
    // Clear existing thumbnails
    galleryThumbnails.innerHTML = '';
    
    // Calculate page boundaries
    const startIndex = pageIndex * THUMBNAILS_PER_PAGE;
    const endIndex = Math.min(startIndex + THUMBNAILS_PER_PAGE, images.length);
    const totalPages = Math.ceil(images.length / THUMBNAILS_PER_PAGE);
    
    // Add thumbnails for current page
    for(let i = startIndex; i < endIndex; i++) {
      const imagePath = images[i];
      const thumbnail = document.createElement('div');
      thumbnail.className = 'gallery-thumbnail' + (i === 0 ? ' active' : '');
      
      // Create lazy-loaded image (only loads when in viewport)
      thumbnail.innerHTML = `<img data-src="${imagePath}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" alt="${title} - Изображение ${i + 1}" loading="lazy">`;
      
      // Handle image click (selecting different image)
      thumbnail.addEventListener('click', () => {
        document.querySelectorAll('.gallery-thumbnail').forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
        
        // Show loading state
        galleryMainImage.classList.add('loading');
        
        // Load new image
        const img = new Image();
        img.onload = function() {
          galleryMainImage.src = imagePath;
          galleryMainImage.alt = `${title} - Изображение ${i + 1}`;
          galleryMainImage.classList.remove('loading');
        };
        img.onerror = function() {
          console.error("Error loading image:", imagePath);
          galleryMainImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="300" height="200"%3E%3Crect width="1" height="1" fill="%23333"/%3E%3Ctext x="0.5" y="0.5" font-family="Arial" font-size="0.1" fill="white" text-anchor="middle" alignment-baseline="middle"%3EИзображението не е налично%3C/text%3E%3C/svg%3E';
          galleryMainImage.classList.remove('loading');
        };
        img.src = imagePath;
      });
      
      galleryThumbnails.appendChild(thumbnail);
    }
    
    // Add pagination controls if there are multiple pages
    if (totalPages > 1) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'gallery-pagination';
      
      // Create pagination HTML
      let paginationHTML = '';
      
      // Previous button
      paginationHTML += `<button class="pagination-prev" ${pageIndex === 0 ? 'disabled' : ''}>&laquo;</button>`;
      
      // Page numbers
      for (let i = 0; i < totalPages; i++) {
        paginationHTML += `<button class="pagination-num ${i === pageIndex ? 'active' : ''}">${i + 1}</button>`;
      }
      
      // Next button
      paginationHTML += `<button class="pagination-next" ${pageIndex === totalPages - 1 ? 'disabled' : ''}>&raquo;</button>`;
      
      paginationContainer.innerHTML = paginationHTML;
      galleryThumbnails.appendChild(paginationContainer);
      
      // Add event listeners for pagination
      paginationContainer.querySelectorAll('.pagination-num').forEach((btn, idx) => {
        btn.addEventListener('click', () => renderGalleryPage(images, title, idx));
      });
      
      paginationContainer.querySelector('.pagination-prev').addEventListener('click', () => {
        if (pageIndex > 0) renderGalleryPage(images, title, pageIndex - 1);
      });
      
      paginationContainer.querySelector('.pagination-next').addEventListener('click', () => {
        if (pageIndex < totalPages - 1) renderGalleryPage(images, title, pageIndex + 1);
      });
    }
    
    // Initialize lazy loading after rendering thumbnails
    initLazyLoading();
  }
  
  // Initialize lazy loading for thumbnail images
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    console.log("Initializing lazy loading for", lazyImages.length, "images");
    
    // Use Intersection Observer API if available
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Make sure the data-src attribute exists and is valid
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              console.log("Lazy loaded image:", img.alt);
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          imageObserver.observe(img);
        }
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }
  }
  
  // Close gallery modal
  if (closeGallery) {
    closeGallery.addEventListener('click', function() {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close gallery when clicking outside of content
  galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close gallery with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});