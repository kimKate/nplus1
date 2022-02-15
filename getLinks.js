const puppeteer = require("puppeteer");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("dates.json", "utf-8"));
const dates = data["0"];
const data = {
  links: [],
};

function main() {
  data.links = searchByDate(dates);

  fs.appendFile("links.json", JSON.stringify(data), "utf8", function (error) {
    if (error) throw error;
    console.log("complete");
  });

  process.exit();
}

main();

async function searchByDate(dates) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const articleSelector = ".col > .item > a";
  let data = Array;

  for (let i = 0; i < dates.length; i++) {
    const searchUrl = `https://nplus1.ru/news/${dates[i]}`;

    try {
      await page.goto(searchUrl);
      await page.waitForSelector(articleSelector, { timeout: 5000 });

      const links = await page.$$eval(articleSelector, (articleLinks) =>
        articleLinks.map((link) => link.href)
      );
      
      for (let link of links.values()) {
        data.push(link);
      }
    } catch (error) {
      console.log(
        `failed to find article on the page: ${searchUrl} with the error ${error}`
      );
    }
  }

  await browser.close();
  return data;
}
