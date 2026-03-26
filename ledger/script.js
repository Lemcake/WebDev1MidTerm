let balance = 0;

function addTransaction(){
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if(desc === "" || isNaN(amount)){
        alert("Por favor completa todos los campos");
        return;
    }

    let table = document.getElementById("ledgerTable");
    let row = table.insertRow();

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerText = desc;
    cell2.innerText = type === "income" ? "Ingreso" : "Gasto";
    cell3.innerText = amount;

    if(type === "income"){
        balance += amount;
        cell3.classList.add("income");
    }else{
        balance -= amount;
        cell3.classList.add("expense");
    }

    document.getElementById("balance").innerText = balance;

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}