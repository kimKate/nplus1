const puppeteer = require("puppeteer");
const fs = require("fs");
const links = JSON.parse(fs.readFileSync("links.json", "utf8"));

function main() {
  getData(links);
}

main();

async function getData(data) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let pages = []

  for (let link of data.links) {
    try {
      await page.goto(link);
      const title = await page.$eval('#article h1', (title) => title.innerHTML);
      const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
      const author = await page.$eval(' .content a > i', (author) => author.innerHTML);
      console.log(author, link, ' .content a > i');
    } catch (error) {
      try {
        const title = await page.$eval('#article h1', (title) => title.innerHTML);
        const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
        const author = await page.$eval(' .content i > a', (author) => author.innerHTML);
        console.log(author, link, '.content i > a');
      } catch (error) {
          console.log(`${error} on ${link}`);
          pages.push(link)
      }
    }
  }
  console.log(pages)
  process.exit();
}
