const puppeteer = require("puppeteer");
const fs = require("fs");

function main() {
  const startDay = "2015-09-21";
  const endDate = "2015-09-30";
  const searchDates = getDates(startDay, endDate);
  const links = getLinks(searchDates)
  
}

main();

function getDates(s, e) {
  const start = new Date(s);
  const end = new Date(e);
  let dates = [];
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(
      new Date(date)
        .toISOString()
        .slice(0, 10)
        .replace("-", "/")
        .replace("-", "/")
    );
  }
  return dates;
}


async function getLinks(dates) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const articleSelector = ".col > .item > a";
    let data = [];

    for (let date of dates) {
        const searchUrl = `https://nplus1.ru/news/${date}`;

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