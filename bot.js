console.log("good day bot");

require("dotenv").config();

const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("good day master");
}

const replies = ["u gay","useless trash","absolute garbage"];

client.on("message", gotMessage);

async function gotMessage(msg) {
  // if (msg.channel.id == "779610264512888862") {
  // use cleanContent instead of content to remove tagging, this isn't foolproof however
    let tokens = msg.content.split(" ");

    if (tokens[0] === "!insult") {
      const index = Math.floor(Math.random() * replies.length);
      msg.channel.send(replies[index]);
    } else if (tokens[0] == "!cat") {
      let keywords = "cat"; 
      if (tokens.length > 1) {
        keywords = tokens.slice(1, tokens.length).join(" ");
      }
      let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
      let response = await fetch(url);
      let json = await response.json();
      const index = Math.floor(Math.random() * json.results.length);
      // Check to make sure a result exists
      let result = json.results[index]?json.results[index].url:"No gif was found with your search parameters."
      msg.channel.send(result);
      
      // Use the disableMentions option to remove any tags from the response message, this is a foolproof way to send non-tag messages
      msg.channel.send("GIF from Tenor: " + keywords, {
        disableMentions: "all"
    })
    }
}
