// ------------------------------
// Fetch KPI Data from Backend
// ------------------------------

fetch("http://localhost:5000/api/dashboard")
.then(response => response.json())
.then(data => {

    document.getElementById("sales").innerHTML =
        "₹ " + Number(data.total_sales).toLocaleString();

    document.getElementById("orders").innerHTML =
        data.total_orders;

    document.getElementById("average").innerHTML =
        "₹ " + Number(data.average_sales).toFixed(2);

})
.catch(error => {

    console.log(error);

});


// ------------------------------
// Line Chart
// ------------------------------

const lineChart = new Chart(

document.getElementById("lineChart"),

{

type: "line",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"
],

datasets:[{

label:"Sales",

data:[
65000,
80000,
55000,
92000,
71000,
96000
],

borderColor:"#0d6efd",

backgroundColor:"rgba(13,110,253,0.2)",

fill:true,

tension:0.4

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

}

}

});


// ------------------------------
// Pie Chart
// ------------------------------

const pieChart = new Chart(

document.getElementById("pieChart"),

{

type:"pie",

data:{

labels:[

"Electronics",

"Fashion",

"Accessories"

],

datasets:[{

data:[

75,

15,

10

],

backgroundColor:[

"#0d6efd",

"#198754",

"#ffc107"

]

}]

},

options:{

responsive:true

}

});


// ------------------------------
// Recent Orders Table
// ------------------------------

const orders = [

{
id:1,
product:"Laptop",
category:"Electronics",
amount:65000
},

{
id:2,
product:"Mobile",
category:"Electronics",
amount:30000
},

{
id:3,
product:"Shoes",
category:"Fashion",
amount:2500
},

{
id:4,
product:"Watch",
category:"Accessories",
amount:5000
},

{
id:5,
product:"Camera",
category:"Electronics",
amount:45000
}

];

const table = document.getElementById("tableBody");

table.innerHTML = "";

orders.forEach(order=>{

table.innerHTML += `

<tr>

<td>${order.id}</td>

<td>${order.product}</td>

<td>${order.category}</td>

<td>₹ ${order.amount.toLocaleString()}</td>

</tr>

`;

});
