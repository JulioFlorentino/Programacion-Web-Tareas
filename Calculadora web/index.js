
const display = document.getElementById("display");

//funtion for add numbers to the display
function appendToDisplay(input) {
    display.value += input;
}

//functions for delete a number in the display
function Delete(input) {
    display.value = display.value.slice(0, -1);
}


//function for clear the display
function clearDisplay() {
    display.value = "";
}


//function for show the dataStore data in a table
function ShowHistory() {
    const history = JSON.parse(localStorage.getItem('History')) || []; //call the data from localStorage
    const table = document.getElementById("historyTable"); //get the table by id
    table.innerHTML = '';


    //increment the numbers of rows 
    history.forEach((item, index) => {

        const row = document.createElement('tr'); //create a new row
        row.innerHTML = `
            <td>${item.operation}</td>
            <td>${item.result}</td>
        `;
        table.appendChild(row); //add the new row with the data of locaStorage
    });

}


//function for save the data of the calculator
function SaveHistory(operation, result) {
    let history = JSON.parse(localStorage.getItem('History')) || []; //call the data
    history.push({operation, result}); //add the new data to localStorage
    localStorage.setItem('History', JSON.stringify(history)); //save the new history updated
}


//function for calculate and save the data.
function calculate() {
    try {
        const operation = display.value;
        const result = eval(operation);
        display.value = result;
        localStorage.setItem('Ans', result);
        SaveHistory(operation, result);
        ShowHistory();
    } 
    catch(error) {
        display.value = "Error";
    }
    
}

//function for load the last operation's result
function loadlast() {
    const lastR = localStorage.getItem('Ans')
    const Ans = lastR;
    
    if(lastR) {
        display.value += Ans;
    } 
}

function deleteData() {
    localStorage.removeItem('History');
    localStorage.removeItem('Ans');
    document.getElementById("historyTable").innerHTML = '';
}

//load the data when the page start
window.onload = function() {
    ShowHistory();
}


