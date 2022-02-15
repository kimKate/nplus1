const fs = require("fs");
// started posting 2015-03-02
// with author 2015-09-21
const start = "2015-09-21";
const end = "2015-09-30";
const data = {
  dates: [],
};

function main() {
  data.dates = getDates(start, end);

  fs.writeFile("dates.json", JSON.stringify(dates), "utf8", function (error) {
    if (error) throw error;
    console.log("complete");
  });
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
