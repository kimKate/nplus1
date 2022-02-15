const puppeteer = require("puppeteer");
const fs = require("fs");

const links = JSON.parse(fs.readFileSync("links.json", "utf8"));

function main() {
  getData(links);
}

main();

async function getData(data) {
  const browser = await puppeteer.launch();
  const titleSelector = ".col > #article > .hero > div > h1";
  const dindexSelector = ".meta > .tables > .table > a > .difficult-value";
  //иногда нет автора
  const authorSelector = "#article > div.body.js-mediator-article > a > i";
  const a = "#article > div.body.js-mediator-article > p:last-child > a > i";
  const v = '#article > div.body.js-mediator-article > p:last-child > i > a'

    const page = await browser.newPage();
    await page.setViewport({ width: 717, height: 796 });
    for (let link of data.links) {
        try {
      await page.goto(link);
      const title = await page.$eval(titleSelector, (title) => title.innerHTML);
      const dindex = await page.$eval(
        dindexSelector,
        (index) => index.innerHTML
      );
      const author = await page.$eval(
        authorSelector,
        (author) => author.innerHTML
      );
      console.log(title, dindex, author);
    }
  catch (error) {
    console.log(`${error} on ${link}`);
  }

}
process.exit();

}