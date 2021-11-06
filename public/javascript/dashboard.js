
const dashboard=document.getElementById('dashboard');
fetch('http://localhost:3000/active/dashboarddata')
   .then(res=>res.json())
   .then(resp=>{
       dashboard.innerHTML=JSON.stringify(resp);
   })