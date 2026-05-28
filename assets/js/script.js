'use strict';

const toggleActive = (element) => element.classList.toggle('active');

const initSidebar = () => {
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  if (!sidebar || !sidebarBtn) return;

  sidebarBtn.addEventListener('click', () => toggleActive(sidebar));
};

const initTestimonialsModal = () => {
  const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const overlay = document.querySelector('[data-overlay]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  const hasModal =
    testimonialsItems.length &&
    modalContainer &&
    modalCloseBtn &&
    overlay &&
    modalImg &&
    modalTitle &&
    modalText;

  if (!hasModal) return;

  const toggleModal = () => {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  testimonialsItems.forEach((item) => {
    item.addEventListener('click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      const title = item.querySelector('[data-testimonials-title]');
      const text = item.querySelector('[data-testimonials-text]');

      if (!avatar || !title || !text) return;

      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
      modalTitle.textContent = title.textContent;
      modalText.textContent = text.textContent;

      toggleModal();
    });
  });

  modalCloseBtn.addEventListener('click', toggleModal);
  overlay.addEventListener('click', toggleModal);
};

const initProjectFilters = () => {
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  if (!filterItems.length) return;

  const filterProjects = (selectedValue) => {
    filterItems.forEach((item) => {
      const shouldShow =
        selectedValue === 'all' || selectedValue === item.dataset.category;

      item.classList.toggle('active', shouldShow);
    });
  };

  if (select && selectItems.length && selectValue) {
    select.addEventListener('click', () => toggleActive(select));

    selectItems.forEach((item) => {
      item.addEventListener('click', () => {
        const selectedValue = item.textContent.trim().toLowerCase();

        selectValue.textContent = item.textContent.trim();
        select.classList.remove('active');
        filterProjects(selectedValue);
      });
    });
  }

  if (!filterButtons.length) return;

  let activeFilterButton = document.querySelector('[data-filter-btn].active') || filterButtons[0];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedValue = button.textContent.trim().toLowerCase();

      if (selectValue) {
        selectValue.textContent = button.textContent.trim();
      }

      filterProjects(selectedValue);
      activeFilterButton.classList.remove('active');
      button.classList.add('active');
      activeFilterButton = button;
    });
  });
};

const initContactForm = () => {
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  if (!form || !formInputs.length || !formBtn) return;

  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      formBtn.disabled = !form.checkValidity();
    });
  });
};

const initPageNavigation = () => {
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  if (!navigationLinks.length || !pages.length) return;

  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetPage = link.textContent.trim().toLowerCase();

      pages.forEach((page) => {
        page.classList.toggle('active', page.dataset.page === targetPage);
      });

      navigationLinks.forEach((navigationLink) => {
        navigationLink.classList.toggle('active', navigationLink === link);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTestimonialsModal();
  initProjectFilters();
  initContactForm();
  initPageNavigation();
});
