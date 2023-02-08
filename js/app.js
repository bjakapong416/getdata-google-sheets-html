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
    message('Loading...');

    getGSheetObject(endpoint1)
    .then((res) => {
        scores = res.rows.map(m => {
            const arr = m.c.map(n => n.v);
            return new ScoreCard('', arr[0], arr[1], arr[2], arr[3])
        });

        message(JSON.stringify(scores));
    })
    .catch((error) => {
        message('something is not working');
        console.error(error);
    })
}

function message(text) {
    document.getElementById('message').innerHTML = text;
}