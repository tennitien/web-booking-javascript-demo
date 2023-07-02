'use strict';
// Select element
const previousBtn = document.getElementById('btn-prev');
const pageNumEl = document.getElementById('page-num');
const nextBtn = document.getElementById('btn-next');

const paginationEl = document.querySelector('.pagination');
const newContainer = document.getElementById('news-container');

//////////////////////////////////////////
let page = 1;
///////////////////////////////////////////
// If the user is not logged in : hidden pagination
paginationEl.style.display = 'none';
// After LOGIN
if (currentUser) {
  getData(page);
}
///////////////////////////////////////////
// Get data from API
async function getData(page) {
  try {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=${apiKey}`
    );
    console.log(response);
    let data = await response.json();
    console.log(data);

    // Check error
    if (data.code === 'corsNotAllowed')
      newContainer.innerHTML = 'Vui lòng dùng Localhost';
    if (data.status === 'error') throw new Error(data.message);

    // Display result
    if (data.totalResults) renderNews(data);
    else {
      newContainer.innerHTML =
        '<h6>Không tìm thấy. Bạn có thể vào Settting thay đổi Category</h6>';
      paginationEl.style.display = 'none'; //hidden pagination
    }
  } catch (err) {
    console.log(`Error 😭: ${err.message}`);
  }
}
///////////////////////////////////////////
// Function used to display information
function renderNews(data) {
  // Check page number for PREVIOUS BUTTON : hide or show
  if (page === 1) previousBtn.style.display = 'none';
  else previousBtn.removeAttribute('style');

  // Check page number with max__page for NEXT BUTTON : hide or show
  let maxPage = Math.ceil(data.totalResults / currentUser.pageSize);
  if (page === maxPage) nextBtn.style.display = 'none';
  else nextBtn.removeAttribute('style');

  // Display API
  let html = '';
  data.articles.forEach(art => {
    html += `
  <div class="card flex-row flex-wrap">
  <div class="card" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${
          art.urlToImage ? art.urlToImage : '../img/picture-not-available.jpg'
        }" class="card-img"  alt="" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${art.title}</h5>
          <p class="card-text">${art.description ? art.description : ''}</p>
          <a
            href="${art.url}"
            class="btn btn-primary"
            target="_blank"
            >View</a
          >
        </div>
      </div>
    </div>
  </div>
</div>
    `;
  });
  // Show pagination
  paginationEl.removeAttribute('style');
  // The current page number is updated
  pageNumEl.textContent = page;
  newContainer.innerHTML = html;
}
//////////////////////////////////////////
// Event click BUTTON "Previous" hoặc "Next"
previousBtn.addEventListener('click', function () {
  page--;
  getData(page);
});
nextBtn.addEventListener('click', function () {
  page++;
  getData(page);
});
