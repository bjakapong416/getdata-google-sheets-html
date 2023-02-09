$(function(){
    let url = document.URL;
    let params = (new URL(url)).searchParams;
    let empNo = params.get('empno');

    if (typeof empNo === 'string' && empNo !== ''){
        fetchScores()
        .then(function (){

            // Ranking Scores
            const ranking = 5;
            const highScoreCards = getHighScoreCards(ranking);
            setHighScoreCards(highScoreCards);

            // Latest Time
            const latestTime = getLatestTime();
            const now = new Date()
            .toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }) 
            + ' '+new Date().toLocaleTimeString();
            setLatestTime(now);

            // Personal Score
            const myScoreCard = getScoreCardByEmpNo(empNo);
            if (myScoreCard === undefined) {
                returnToLogin();
            }
            else {
                setScoreByScoreCard(myScoreCard);
            }
        })
    }
    else {
        alert('empno is required');
        returnToLogin();
    }
});

function setEmpName(empName) {
    const innerHTML = typeof empName === 'string' && empName !== '' ? 'คุณ ' + empName : 'ไม่ทราบจริง ๆ';
    document.getElementById('empName').innerHTML = innerHTML;
}

function setScore(id, score = null) {
    const innerHTML = typeof score === 'number' ? score : '??';
    document.getElementById(id).innerHTML = innerHTML;
}

function setScoreByScoreCard(scoreCard) {
    const { empName, sScore, fScore, pScore, totalScore } = scoreCard;
    console.log(empName, sScore, fScore, pScore, totalScore )
    setEmpName(empName);
    setScore('sScore', sScore);
    setScore('fScore', fScore);
    setScore('pScore', pScore);
    setScore('totalScore', totalScore);
}

function setHighScoreCards(scoreCards) {
    let text = '';
    scoreCards.forEach((scoreCard, index) => {
        const {empName, totalScore} = scoreCard;
        text += `
        <div class="col-12 d-flex justify-content-between ${index < 3 ? 'text-danger' : ''}">
            <span>${empName}</span>
            <span>${totalScore}</span>
        </div>`
    })

    document.getElementById('highScoreCards').innerHTML = text;
}

function setLatestTime(latestTime) {
    document.getElementById('latestTime').innerHTML = latestTime;
}

function returnToLogin() {
    // window.location = 'login.html';
}