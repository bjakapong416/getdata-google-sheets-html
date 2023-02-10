const url = "https://docs.google.com/spreadsheets/d/";
const ssid = "19UJUyZFxAE8qqru0dECtKjrvCp1HFadbPaqhbEa6ePQ";
const query1 = `/gviz/tq?`;
const endpoint1 = `${url}${ssid}${query1}`;

class ScoreCard {
  sScore = 0;
  fScore = 0;
  pScore = 0;

  constructor(empNo, empName, sScore, fScore, pScore) {
    this.empNo = !!empNo ? "" + empNo + "" : "";
    this.empName = !!empName ? empName : "";
    this.sScore = typeof sScore === "number" ? sScore : 0;
    this.fScore = typeof fScore === "number" ? fScore : 0;
    this.pScore = typeof pScore === "number" ? pScore : 0;
  }
  get totalScore() {
    return this.sScore + this.fScore + this.pScore;
  }
}
let scores = [];

async function getGSheetObject(url = "") {
  const response = await fetch(url);
  const data = await response.text();
  const indexStart = data.indexOf("({");
  const indexEnd = data.lastIndexOf("})");
  const dataString = data.substring(0, indexEnd + 1).substring(indexStart + 1);
  const dataObject = JSON.parse(dataString);
  return dataObject.table;
}

async function fetchScores() {
  return await getGSheetObject(endpoint1)
    .then((res) => {
      scores = res.rows
        .map((m, index) => {
          if (index > 0) {
            const arr = m.c.map((n) => n?.v);
            return new ScoreCard(
              arr[0],
              arr[1],
              arr[arr.length - 3],
              arr[arr.length - 2],
              arr[arr.length - 1]
            );
          }
        })
        .filter((m) => !!m);
    })
    .catch((error) => {
      alert("something is not working");
      console.error(error);
    });
}

function getScoreCardByEmpNo(empNo) {
  return scores.find((m) => m.empNo === empNo);
}

function getHighScoreCards(ranking) {
  return scores
    .filter((m) => m.totalScore > 0)
    .sort((a, b) => {
      if (a.totalScore > b.totalScore) {
        return -1;
      } else if (a.totalScore < b.totalScore) {
        return 1;
      } else {
        return a.empName < b.empName ? -1 : 1;
      }
    })
    .slice(0, ranking);
}
