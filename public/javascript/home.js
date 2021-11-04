console.log('hello from js')
const test=document.getElementById('test');
fetch('localhost:3000/active/plans')
   .then(res=>res.json())
   .then(plans=>{
       test.innerHTML=plans;
   })