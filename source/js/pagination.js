document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".content");
  
  // ГЛАВНОЕ ИСПРАВЛЕНИЕ: если элемента нет на странице, просто выходим из функции
  if (!content) return; 

  const itemsPerPage = 6;
  let currentPage = 0;
  const items = Array.from(content.children);

  // Функция показа страницы
  function showPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle("hidden", index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }

  // Создание кнопок пагинации
  function createPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (totalPages <= 1) return; 

    const wrapper = document.querySelector(".main-catalog__card-wrapper");
    if (!wrapper) return;

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    for (let i = 0; i < totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i + 1;
      pageButton.dataset.page = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }

    wrapper.insertBefore(paginationContainer, content.nextSibling);
  }

  // Обновление активной кнопки
  function updateActiveButtonStates() {
    const pageButtons = document.querySelectorAll(".pagination button");
    pageButtons.forEach((button, index) => {
      button.classList.toggle("active", index === currentPage);
    });
  }

  createPagination();
  showPage(currentPage);
});