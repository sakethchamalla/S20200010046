const express = require("express");
const axios = require("axios");
const app = express();
// var data;
// axios.post(`http://20.244.56.144/train/register`,
// {"companyName":"Train Central","ownerName":"Saketh","rollNo":"S20200010046","ownerEmail":"saketh.ch20@iiits.in","accessCode":"jYjgQH"})
// .then((res)=>{
//      data = res;
//      console.log(res);
// })

// companyName: 'Train Central',
// clientID: '6f2bd7bf-ff42-4a67-92be-d8b9d1af3f2d',
// clientSecret: 'mxAVXYXoLapMCTJX',
// ownerName: 'Saketh',
// ownerEmail: 'saketh.ch20@iiits.in',
// rollNo: 'S20200010046'


    // token_type: 'Bearer',
    // access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTE2MjQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNmYyYmQ3YmYtZmY0Mi00YTY3LTkyYmUtZDhiOWQxYWYzZjJkIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlMyMDIwMDAxMDA0NiJ9.3ycs5rdTlCSV5WL8jsYbkPsDEF00eQewb9SHJh0KTQs',
    // expires_in: 1692191624


// axios.post(`http://20.244.56.144/train/auth`,
// {"companyName":"Train Central",
// "ownerName":"Saketh",
// "rollNo":"S20200010046",
// "ownerEmail":"saketh.ch20@iiits.in",
//  "clientID": "6f2bd7bf-ff42-4a67-92be-d8b9d1af3f2d",
//  "clientSecret": "mxAVXYXoLapMCTJX"
// })
// .then((res)=>{
//      data = res;
//      console.log(res);
// })

app.get('/trains',async(req,res)=>{

     const data = await axios.post(`http://20.244.56.144/train/auth`,
{"companyName":"Train Central",
"ownerName":"Saketh",
"rollNo":"S20200010046",
"ownerEmail":"saketh.ch20@iiits.in",
 "clientID": "6f2bd7bf-ff42-4a67-92be-d8b9d1af3f2d",
 "clientSecret": "mxAVXYXoLapMCTJX"
})

 var token = data.data.access_token;
  var trains = await axios.get(`http://20.244.56.144/train/trains`,{headers:{"authorization":`bearer ${token}`}})
  trains = trains.data;
  trains.sort((a,b)=>{
    if( a.price.sleeper < b.price.sleeper)
    return -1;
    if(a.price.sleeper > b.price.sleeper)
    return 1;
   return  (b.seatsAvailable.sleeper + b.seatsAvailable.AC)-(a.seatsAvailable.sleeper + a.seatsAvailable.AC); 
});
res.json(trains)
});

app.listen(3000,()=>{console.log("Server Listing")});