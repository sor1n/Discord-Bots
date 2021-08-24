const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const cheerio = require("cheerio");
const request = require("request");

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot is up and running succesfully');
});

client.on('message', message => {
	if(message.content.startsWith("!find") && !message.author.bot)
	{
		var messageContent = message.content.split(" ");
		var searchTerm = "";
		for(let id in messageContent)
		{
			if(!messageContent[id].includes("!") && !messageContent[id].includes("-"))
			{
				searchTerm += messageContent[id]+"+";
			}
		}
		searchTerm = searchTerm.substring(0, searchTerm.length - 1);
		let url = "https://deadbydaylight.gamepedia.com/index.php?search="+searchTerm+"&title=Special:Search&profile=default&fulltext=1";

		try
		{
			request(url, function(err, resp, body){
				if(!err && resp.statusCode == 200)
				{
					var search = cheerio.load(body);
														
					var firstResult = search('a', '.mw-search-result-heading')[0].attribs.href;
					var newURL = "https://deadbydaylight.gamepedia.com" + firstResult;	

					try
					{
						request(newURL, function(nErr, nResp, nBody){
							if(!nErr && nResp.statusCode == 200)
							{
								var pageContent = cheerio.load(nBody);
								pageContent("br").replaceWith("\n");
								
								var info = pageContent('td', '.wikitable');
								var name = pageContent('.firstHeading').text();
								var image = pageContent('img', '.image')[0].attribs.src;

								const embed = new Discord.RichEmbed().setAuthor(name, '')
										.setThumbnail(image)
							  			.setDescription(pageContent(info[3]).text());

							  	if(message.content.includes("-det"))
							  	{
									embed.addField('Tier I', pageContent(info[0]).text() + "**" + pageContent(info[4]).text() + "**", true)
										.addField('Tier II', pageContent(info[1]).text() + "**" + pageContent(info[5]).text() + "**", true)
										.addField('Tier III', pageContent(info[2]).text() + "**" + pageContent(info[6]).text() + "**", true);
								}

								//console.log(pageContent('img', '.image')[0].attribs.src);
								
								message.channel.send({embed});
							}

						});
					}
					catch(error){
						console.error(error);
					}
				}
			});
		}
		catch(error){
			console.error(error);
		}
	}
});

client.login(token);