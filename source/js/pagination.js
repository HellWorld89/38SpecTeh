document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".content"); // сам список <ul>
  const itemsPerPage = 6;
  let currentPage = 0;
  const items = Array.from(content.children); // все дочерние <li>

  // Функция показа страницы
  function showPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle("hidden", index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }

  // Создание кнопок пагинации и вставка их ПОСЛЕ списка
  function createPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (totalPages <= 1) return; // если страница одна – пагинация не нужна

    // Ищем родительский контейнер, куда будем вставлять пагинацию
    const wrapper = document.querySelector(".main-catalog__card-wrapper");
    if (!wrapper) return;

    // Создаём контейнер для пагинации
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    // Создаём кнопки
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

    // Вставляем пагинацию после списка (.content)
    wrapper.insertBefore(paginationContainer, content.nextSibling);
    // Или можно использовать wrapper.appendChild(paginationContainer),
    // но тогда она окажется после всего, что есть в wrapper,
    // а мы хотим сразу после списка – insertBefore безопаснее.
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
