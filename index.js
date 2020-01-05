var genhtml = require('./generateHTML');
var gs = require('github-scraper');
var pdfcrowd = require("pdfcrowd");


const readline = require('readline');
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// const gsAsync = util.promisify(gs)
// const readFileAsync = util.promisify(fs.readFile);
// const convertFactory = require('electron-html-to');
// answers=[];

// let location = "";
let googleURL = "https://www.google.com/maps/place/";


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username?"
    }
  ]);
}



// async function getgithub(username){
//  try{ 
//    let getgit={};
//    console.log("getgithub usernmane =" + username);
//    const { data } = await axios.get('https://api.github.com/users/' + username);
//     //  console.log(data); 
//     // console.log("getgithub 1 answers: " + answers);
//      console.log(data.name)
//     // console.log(data.blog);
//     //  console.log(data.location);
//     //  console.log(data.url);
//     getgit.name = data.name;
//     console.log("getgithub getgit.name = " + getgit.name);

//     console.log("getgithub  after:" + getgit);
//     return getgit;

//  }catch(err){
//    console.log(err);
//  }


//  }



function writeToFile(fileName, data) {


}

// async function convertToPDF(htmlString){
//   var conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF
//   });

//   conversion({ html: htmlString }, function(err, result) {
//     if (err) {
//       return console.error(err);
//     }

//     console.log(result.numberOfPages);
//     console.log(result.logs);
//     result.stream.pipe(fs.createWriteStream('converted.pdf'));
//     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
//   });
//  }




async function convertHTMLtoPDF() {
  console.log("converttoPDF")
  // create the API client instance
  var client = new pdfcrowd.HtmlToPdfClient("juliebear", "65890a6935adfa80e9775690b00301b2");

  // run the conversion and write the result to a file
  client.convertFileToFile(
    "index.html",
    "devprofile2.pdf",
    function (err, fileName) {
      if (err) return console.error("Pdfcrowd Error: " + err);
      console.log("Success: the file was created " + fileName);
    });
}



async function init() {
  console.log("init")
  try {
    // let answers = await promptUser();
    let answers = await promptUser();
    console.log(answers);



    var username = answers.github;
    console.log(username);
    const { data } = await axios.get('https://api.github.com/users/' + username);

    // get the # github stars by using github scraper
      var url = '/'+username // a random username
      await gs(url, function(err, data2) {
       console.log(data2.stars); // or what ever you want to do with the data
       answers.stars = data2.stars;
       console.log(answers.stars);
     })

    // console.log(data);
    
    answers.name = data.name;
    answers.blog = data.blog;
    answers.location =data.location;
    answers.giturl = data.html_url;

    answers.followers = data.followers;
    answers.following = data.following;
    answers.numrepos = data.public_repos;
    answers.picurl = data.avatar_url;
    answers.company = data.company;
    answers.locurl = googleURL + answers.location;


    console.log(answers);
  //   answers.push({
  //     name: data.name,
  //     blog: data.blog,
  //     location: data.location,
  //     giturl: data.html_url,
  //     followers: data.followers,
  //     following: data.public_repos,
  //     picurl: data.avatar_url,
  //     company: data.company,
  //     locurl:  googleURL + answers2.location
  // });



    // const {data2} = await axios.get('https://api.github.com/users/${username}/starred');
    // console.log(JSON.stringify(data2));

    const htmlString = genhtml.generateHTML(answers);

    writeFileAsync("index.html", htmlString, "utf-8");

    console.log("Successfully wrote to index.html");
    setTimeout(convertHTMLtoPDF, 3000)
    // convertHTMLtoPDF();
    // nodeHTMLtoPDF()

  } catch (err) {
    console.log(err);
  }


}



init();



