const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '19UJUyZFxAE8qqru0dECtKjrvCp1HFadbPaqhbEa6ePQ';
const query1 = `/gviz/tq?`;
const endpoint1 = `${url}${ssid}${query1}`;

class ScoreCard {

    sScore = 0;
    fScore = 0;
    pScore = 0;

    constructor(empNo, empName, sScore, fScore, pScore) {
      this.empNo = empNo;
      this.empName = empName;
      this.sScore = sScore;
      this.fScore = fScore;
      this.sScore = sScore;
    }
    get totalScore() {
        return this.sScore + this.fScore + this.pScore;
    }
  }
let scores = [];

async function getGSheetObject(url = ''){
    const response = await fetch(url);
    const data = await response.text();
    const indexStart = data.indexOf("({")
    const indexEnd = data.lastIndexOf("})");
    const dataString = data.substring(0, indexEnd+1).substring(indexStart+1);
    const dataObject = JSON.parse(dataString);
    return dataObject.table;
}

async function fetchScores() {
    return await getGSheetObject(endpoint1)
    .then((res) => {
        scores = res.rows.map(m => {
            const arr = m.c.map(n => n.v);
            return new ScoreCard('019712', 'name', arr[1], arr[2], arr[3])
        });
    })
    .catch((error) => {
        alert('something is not working');
        console.error(error);
    })
}

function getScoreCardByEmpNo(empNo) {
    return scores.find(m => m.empNo === empNo);
}

function getHighScoreCards(ranking) {
    return scores.sort((a, b) => {
        if(a.totalScore > b.totalScore) {
            return -1;
        }
        else if (a.totalScore < b.totalScore){
            return 1;
        }
        else {
            return a.empName < b.empName ? -1 : 1;
        }
    })
    .slice(0, ranking);
}

function getLatestTime() {
    const item = scores.sort((a,b) => {
        return a.name < b.name ? -1 : 1;
    })
    .shift();

    return item?.empNo;
}