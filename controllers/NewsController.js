var request = require("request");
var cheerio = require("cheerio");
var CONSTS = require("../config/const");

class NewsController {
  async getAllNews(req, res) {
    try {
      // call api to get news here
      request(CONSTS.VN_EXPRESS_URL, function (err, response, body) {
        if (err) {
          console.log(err);
        } else {
          let $ = cheerio.load(body);
          let hotNews = $(body)
            .find("article.item-news.full-thumb.article-topstory")
            .map(function (i, el) {
              // this === el
              return {
                title: $(this).children(".title-news").children("a").text(),
                url: $(this).children(".title-news").children("a").attr("href"),
                image: $(this)
                  .children(".thumb-art")
                  .children("a")
                  .children("picture")
                  .children("img")
                  .attr("src"),
                description: $(this)
                  .children(".description")
                  .children("a")
                  .text(),
                extendDescription: $(this)
                  .children(".extend-lead.description")
                  .children("a")
                  .text(),
                timePublic: $(this)
                  .children(".meta-news")
                  .children(".time-public")
                  .children()
                  .text(),
              };
            })
            .get();
          let news = $(body)
            .find("article.item-news.item-news-common")
            .map(function (i, el) {
              // this === el
              return {
                title: $(this).children(".title-news").children("a").text(),
                url: $(this).children(".title-news").children("a").attr("href"),
                image: $(this)
                  .children(".thumb-art")
                  .children("a")
                  .children("picture")
                  .children("img")
                  .attr("src"),
                description: $(this)
                  .children(".description")
                  .children("a")
                  .text(),
              };
            })
            .get();
          // response the result data
          res.send({ data: { hotNews, news } });
        }
      });
    } catch (error) {
      res.send({ error });
    }
  }

  async getNew(req, res) {
    try {
      const { url } = req.body;
      // call api to get news here
      request(url, function (err, response, body) {
        if (err) {
          console.log(err);
        } else {
          let $ = cheerio.load(body);
          let newsByUrl = {
            titleDetail: $(body).find("h1.title-detail").text(),
            timePublic: $(body)
              .find(".header-content")
              .children("span.date")
              .text(),
            description: $(body).find("p.description").text(),
            fckDetail: $(body)
              .find(".fck_detail")
              .children()
              .map(function (i, el) {
                // this == el
                if ($(this).has(".Normal")) {
                  return $(this).text();
                } else {
                  // get image
                  return {
                    image: $(el)
                      .children("fig-picture")
                      .children("picture")
                      .children("img")
                      .attr("src"),
                    caption: $(el).children("figcaption").children("p"),
                    photographer: $(el)
                      .children("figcaption")
                      .children("p")
                      .children("em")
                      .text(),
                  };
                }
              })
              .get(),
          };
          // response the result data
          res.send({ data: { news: newsByUrl } });
        }
      });
    } catch (error) {
      res.send({ error });
    }
  }
}

module.exports = new NewsController();
