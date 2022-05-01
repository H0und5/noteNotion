// calling the required packages

const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var jsonParser = bodyParser.json();


// setting up the app server

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = 'localhost';


// setting up the notion client

const notion = new Client({ auth: "secret_kr9svqWW9Lztx650P9vjkyNovLGLQRJScE5nfjPDmwi"})

const databaseId = "c41d9cc8eda94bb5af421943133bdd9e";

// POST request
// POST name, email, and a note
// Functionality: Make a database entry in a Notion page with the databaseId above.
// localhost:4000/submitFormToNotion
app.post('/submitFormToNotion', jsonParser, async (req, res) => {
  // req.body
  
  /*{
    name:
    email: 
    note:
  }
  */

  const name = req.body.name;
  const email = req.body.email;
  const note = req.body.note;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        },
        "Email": {
          rich_text: [
            {
              text: {
                content: email
              }
            }
          ]
        },
        "Note": {
          rich_text: [
            {
              text: {
                content: note
              }
            }
          ]
        }
      }
    })
    console.log(response);
    console.log("SUCCESS")
  } catch(error) {
    console.log(error, 'some shit went wrong');
  }

})


app.listen(PORT, HOST, () => {
  console.log('Starting proxy at ' + HOST + ":" + PORT);
})