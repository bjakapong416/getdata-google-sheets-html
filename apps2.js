const output = document.querySelector('.output');
const btn = document.querySelector('button');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '<document id>>';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=Sheet6';
 
btn.addEventListener('click',getData);
 
function getData(){
    let url1 = `${url}${ssid}${q1}&${q2}&${q3}`;
    output.innerHTML = '';
    fetch(url1)
    .then(res => res.text())
    .then(data => {
        const json = JSON.parse(data.substr(47).slice(0,-2));
        console.log(json.table);
        const headings = makeCell(output,'','heading');
        json.table.cols.forEach((col)=>{
            const el = makeCell(headings,col.label,'box');
        })
        json.table.rows.forEach((row)=>{
            //console.log(row);
            const div = makeCell(output,'','row');
            row.c.forEach((cell)=>{
                const ele1 = makeCell(div,`${cell.v}`,'box');
            })
        })
 
    })
}
 
function makeCell(parent,html,classAdd){
    const ele = document.createElement('div');
    parent.append(ele);
    ele.innerHTML = html;
    ele.classList.add(classAdd);
    return ele;
}