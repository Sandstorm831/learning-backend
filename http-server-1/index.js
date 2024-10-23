const express = require('express')
const app = express()
const port = 3000


function calculateSum(n){
  let ans = 0;
  for (let i=0;i<=n; i++){
    ans += i;
  }
  return ans;
}


var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false
      },{
        healthy: true
      }
    ]
  }
]

app.get('/', (req, res) => {
  const n = req.query.n;
  const ans = calculateSum(n);
  res.send("Hi your answer is " + ans.toString())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})