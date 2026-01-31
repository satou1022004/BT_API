const API_URL = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filteredProducts = [];
let currentPage = 1;
let pageSize = 10;
let sortNameAsc = true;
let sortPriceAsc = true;

/* ✅ GET ALL */
async function getAll() {
  const res = await fetch(API_URL);
  products = await res.json();
  filteredProducts = [...products];
  renderTable();
  renderPagination();
}

getAll();

/* Render table */
function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filteredProducts.slice(start, end);

  pageData.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td><img src="${p.images[0]}" /></td>
        <td>${p.title}</td>
        <td>${p.price}</td>
      </tr>
    `;
  });
}

/* Pagination */
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button onclick="goToPage(${i})">${i}</button>
    `;
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

/* Change page size */
function changePageSize() {
  pageSize = +document.getElementById("pageSize").value;
  currentPage = 1;
  renderTable();
  renderPagination();
}

/* Search by title (onChange) */
document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderTable();
  renderPagination();
});

/* Sort by name */
function sortByName() {
  filteredProducts.sort((a, b) =>
    sortNameAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );
  sortNameAsc = !sortNameAsc;
  renderTable();
}

/* Sort by price */
function sortByPrice() {
  filteredProducts.sort((a, b) =>
    sortPriceAsc ? a.price - b.price : b.price - a.price
  );
  sortPriceAsc = !sortPriceAsc;
  renderTable();
}
