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
  
  // Gallery image paths by service type
  const galleryImages = {
    'home': [
      '/assets/images/home/IMG_7983.JPG',
      '/assets/images/home/IMG_7984.JPG',
      '/assets/images/home/IMG_7985.JPG',
      '/assets/images/home/IMG_7986.JPG',
      '/assets/images/home/IMG_7987.JPG',
      '/assets/images/home/IMG_7988.JPG',
      '/assets/images/home/IMG_7989.JPG'
    ],
    // Add more galleries as they become available
    'ремонтни-дейности': [],
    'басейни-и-spa-комплекси': [],
    'довършителни-дейности': [],
    'овк-вик-и-ел-инсталации': [],
    'архитектурно-проектиране': []
  };
  
  // Service title mapping
  const serviceTitles = {
    'home': 'Жилищно строителство',
    'ремонтни-дейности': 'Ремонтни дейности',
    'басейни-и-spa-комплекси': 'Басейни и Spa комплекси',
    'довършителни-дейности': 'Довършителни дейности',
    'овк-вик-и-ел-инсталации': 'ОВК, ВиК и ел. инсталации',
    'архитектурно-проектиране': 'Архитектурно проектиране'
  };
  
  // Open gallery when clicking on a service card
  document.querySelectorAll('.service-card .view-gallery-btn').forEach(button => {
    button.addEventListener('click', function() {
      const serviceCard = this.closest('.service-card');
      const galleryType = serviceCard.dataset.gallery;
      const images = galleryImages[galleryType] || [];
      const title = serviceTitles[galleryType] || 'Галерия';
      
      if (images.length === 0) {
        alert('В момента няма налични изображения в тази галерия.');
        return;
      }
      
      // Set gallery title
      galleryTitle.textContent = title;
      
      // Clear thumbnails
      galleryThumbnails.innerHTML = '';
      
      // Add thumbnails
      images.forEach((imagePath, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '');
        thumbnail.innerHTML = `<img src="${imagePath}" alt="${title} - Изображение ${index + 1}">`;
        thumbnail.addEventListener('click', () => {
          document.querySelectorAll('.gallery-thumbnail').forEach(thumb => thumb.classList.remove('active'));
          thumbnail.classList.add('active');
          galleryMainImage.src = imagePath;
          galleryMainImage.alt = `${title} - Изображение ${index + 1}`;
        });
        galleryThumbnails.appendChild(thumbnail);
      });
      
      // Set main image
      galleryMainImage.src = images[0];
      galleryMainImage.alt = `${title} - Изображение 1`;
      
      // Show modal
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
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