let news = [];
let url;
let menus = document.querySelectorAll(".menus button");
console.log("menus", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let serchButton = document.getElementById("search-button");

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "IdK0gOCehLGzFjjcsbAeVTZP22L99ENbRHU60JYC6HA",
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("결과없음");
      }
      news = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("에러는", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=2"
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=2&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size"
        src="${item.media}"
      />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>
      ${item.summary}
      </p>
      <div>
      ${item.rights} * ${item.published_date}
      </div>
    </div>
  </div>`;
    })
    .join("");
  console.log(newsHTML);
  document.getElementById("news-board").innerHTML = newsHTML;
};
const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
serchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
