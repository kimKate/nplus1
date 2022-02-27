const puppeteer = require("puppeteer");
const fs = require("fs");
const links = JSON.parse(fs.readFileSync("links.json", "utf8"));

function main() {
  getData(links)
  .then((data) => {
    try {
      fs.truncate('data2015.json', 0, function(){console.log('cleared data2015.json')})    
      fs.appendFile("data2015.json", JSON.stringify(data), "utf8", function (error) {
        if (error) throw error;
        console.log("complete");
      });
         } catch(error) {console.log(error)}
   
  })
}

main();

async function getData(file) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let pages = []
  let parsed = 0
  rubric = '#article > div.meta > div > p:nth-child(1) > a'
  sel_0 = '.content a > i'
  title = '#article h1'
  dindex = '.difficult-value'
  sel_1 = '.content i > a'
  sel_2 = 'p:last-child > i'
  sel_3 = '.js-mediator-article > a'
  sel_4 = 'p:last-child > i > a'
  sel_5 =  '.js-mediator-article > i'

  const data = {
    articleData: []
  }
  
  for (let link of file.links) {
    let obj = {}

    try {
      await page.goto(link, {waitUntil: 'load', timeout: 10000});

      const title = await page.$eval('#article h1', (title) => title.innerHTML);
      const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
      const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
      const author = await page.$eval(' .content a > i', (author) => author.innerHTML);

      obj.title = title
      obj.dindex = dindex
      obj.author = author
      obj.rubric = rubric
      obj.link = link
      obj.selector = '.content a > i'

      data.articleData.push(obj)
      console.log(parsed++)
    } catch (error) {
      try {
        const title = await page.$eval('#article h1', (title) => title.innerHTML);
        const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
        const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
        const author = await page.$eval(' .content i > a', (author) => author.innerHTML);

        obj.title = title
        obj.dindex = dindex
        obj.author = author
        obj.rubric = rubric
        obj.link = link
        obj.selector = '.content i > a'
        data.articleData.push(obj)

        console.log(parsed++)
      } catch (error) {
        try {
          const title = await page.$eval('#article h1', (title) => title.innerHTML);
          const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
          const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
          const author = await page.$eval('p:last-child > i', (author) => author.innerHTML);

          obj.title = title
          obj.dindex = dindex
          obj.author = author
          obj.rubric = rubric
          obj.link = link
          obj.selector = 'p:last-child > i'

          data.articleData.push(obj)
          console.log(parsed++)
        } catch (error) { 
          try {
            const title = await page.$eval('#article h1', (title) => title.innerHTML);
            const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
            const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
            const author = await page.$eval('.js-mediator-article > a', (author) => author.innerHTML);    
            
            obj.title = title
            obj.dindex = dindex
            obj.author = author
            obj.rubric = rubric
            obj.link = link
            obj.selector = '.js-mediator-article > a'

            data.articleData.push(obj)
            console.log(parsed++)
          } catch(error) {
            try {
              const title = await page.$eval('#article h1', (title) => title.innerHTML);
              const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
              const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
              const author = await page.$eval('p:last-child > i > a', (author) => author.innerHTML);

              obj.title = title
              obj.dindex = dindex
              obj.author = author
              obj.rubric = rubric
              obj.link = link
              obj.selector = 'p:last-child > i > a'

              data.articleData.push(obj)
              console.log(parsed++)
            } catch( error) {
               try {
                const title = await page.$eval('#article h1', (title) => title.innerHTML);
                const dindex = await page.$eval('.difficult-value', (index) => index.innerHTML);
                const rubric = await page.$eval('#article > div.meta > div > p:nth-child(1) > a', (rubric) => rubric.innerHTML)
                const author = await page.$eval('.js-mediator-article > i', (author) => author.innerHTML);

                obj.title = title
                obj.dindex = dindex
                obj.author = author
                obj.rubric = rubric
                obj.link = link
                obj.selector = '.js-mediator-article > i'

                data.articleData.push(obj)

                console.log(parsed++)
               } catch(error) {
                pages.push(link) 
              }              
            }
          }
        }
      }
    }

  }
  console.log(pages.length)
  console.log(parsed)


  
  return data
}

// 141 1199 
// 331
// 2193
