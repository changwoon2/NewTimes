let news = [];
const getLatestNews = async () => {
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport"
  );
  let header = new Headers({
    "x-api-key": "JAm2I1oiVB6iSJmVkLtMxmnAtCC5MNRCj_v_e1Clw9M",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
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

getLatestNews();
