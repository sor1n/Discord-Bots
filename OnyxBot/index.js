const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();

const eventPerk = './assets/background_event.png';
const ultraRarePerk = './assets/background_ultraRare.png';
const veryRarePerk = './assets/background_veryRare.png';
const rarePerk = './assets/background_rare.png';
const uncommonPerk = './assets/background_uncommon.png';
const commonPerk = './assets/background_common.png';
const rift = './assets/background_rift.png';

var version = "0.0.0";

client.once('ready', () => {
	console.log('Bot is up and running succesfully');
});
/* 
	Event <:bgE:507186913556299779> Characters
	Ultra Rare <:bgUR:497463579537178624> Perks
	Very Rare <:bgVR:497463579608481792> Mechanics
	Rare <:bgR:497463578975010816> Maps
	Uncommon <:bgU:497463579839168513> Cosmetics
	Common <:bgC:497463579415412737> General
	Common <:bgRi:717047880636170300> Rift

	Categories: Perks, Maps, Mechanics, Cosmetics, Characters, General
*/

client.on('message', async message => {
	if(message.channel.name.startsWith(`dbd-suggestion-box`) && !message.author.bot)
	{
		var image = "";
		var suggestionID = "";

		const embeded = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL);
		message.attachments.forEach(a => {
	    	image = a.url;
		});

		if(image != null)
		{
			embeded.setImage(image);
		}

		if(message.content.startsWith(`<:bgE:507186913556299779>`) && message.content.length > 26)
		{
			suggestionID = "CH" + message.id;
			embeded.setTitle("Character Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgE:507186913556299779>',''))
				.setColor([242, 156, 14])
				.setThumbnail('attachment://background_event.png');
			message.channel.send({files: [eventPerk], embed:embeded});
		}
		else if(message.content.startsWith(`<:bgUR:497463579537178624>`) && message.content.length > 26)
		{
			suggestionID = "PE" + message.id;
			embeded.setTitle("Perk Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgUR:497463579537178624>',''))
				.setColor([193, 15, 66])
				.setThumbnail('attachment://background_ultraRare.png');
			message.channel.send({files: [ultraRarePerk], embed:embeded});
		}
		else if(message.content.startsWith(`<:bgVR:497463579608481792>`) && message.content.length > 26)
		{
			suggestionID = "ME" + message.id;
			embeded.setTitle("Mechanic Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgVR:497463579608481792>',''))
				.setColor([109, 2, 129])
				.setThumbnail('attachment://background_veryRare.png');
			message.channel.send({files: [veryRarePerk], embed:embeded});
		} 
		else if(message.content.startsWith(`<:bgR:497463578975010816>`) && message.content.length > 26)
		{
			suggestionID = "MA" + message.id;
			embeded.setTitle("Map Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgR:497463578975010816>',''))
				.setColor([6, 117, 6])
				.setThumbnail('attachment://background_rare.png');
			message.channel.send({files: [rarePerk], embed:embeded});
		} 
		else if(message.content.startsWith(`<:bgU:497463579839168513>`) && message.content.length > 26)
		{
			suggestionID = "CO" + message.id;
			embeded.setTitle("Cosmetic Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgU:497463579839168513>',''))
				.setColor([201, 170, 0])
				.setThumbnail('attachment://background_uncommon.png');
			message.channel.send({files: [uncommonPerk], embed:embeded});
		}  
		else if(message.content.startsWith(`<:bgC:497463579415412737>`) && message.content.length > 26)
		{
			suggestionID = "GE" + message.id;
			embeded.setTitle("General Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgC:497463579415412737>',''))
				.setColor([97, 67, 48])
				.setThumbnail('attachment://background_common.png');
			message.channel.send({files: [commonPerk], embed:embeded});
		}  
		else if(message.content.startsWith(`<:bgRi:717047880636170300>`) && message.content.length > 26)
		{
			suggestionID = "RI" + message.id;
			embeded.setTitle("Rift Suggestion - " + suggestionID)
	  			.setDescription(message.content.replace('<:bgRi:717047880636170300>',''))
				.setColor([0, 0, 250])
				.setThumbnail('attachment://background_rift.png');
			message.channel.send({files: [rift], embed:embeded});
		}  	

		if(message.content.toLowerCase().startsWith(`!edit`))
		{
			const messageContent = message.content.split(" ");

			message.channel.messages.fetch({ limit: 100 })
				.then(mess => 
				{
					var foundMessage = false;
					for(let [key, e] of mess)
					{ 
						if(e.embeds && !foundMessage)
						{
							const currentEmbed = e.embeds[0];
							if(currentEmbed && currentEmbed.author && currentEmbed.title.toLowerCase().includes(messageContent[1].toLowerCase()) && currentEmbed.author.name.includes(message.author.username))
							{
								var image = "";
								message.attachments.forEach(a => {
							    	image = a.url;
								});
								const descr = message.content.replace(messageContent[0],"").replace(messageContent[1],"");
								const newEmbed = new Discord.MessageEmbed(currentEmbed).setDescription(descr);

								if(image != null)
								{
									newEmbed.setImage(image);
								}

								if(currentEmbed.thumbnail.url.includes("background_event"))
								{
									newEmbed.setThumbnail('attachment://background_event.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_ultraRare"))
								{
									newEmbed.setThumbnail('attachment://background_ultraRare.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_veryRare"))
								{
									newEmbed.setThumbnail('attachment://background_veryRare.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_rare"))
								{
									newEmbed.setThumbnail('attachment://background_rare.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_uncommon"))
								{
									newEmbed.setThumbnail('attachment://background_uncommon.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_common"))
								{
									newEmbed.setThumbnail('attachment://background_common.png');
								}
								else if(currentEmbed.thumbnail.url.includes("background_rift"))
								{
									newEmbed.setThumbnail('attachment://background_rift.png');
								}
								e.edit(newEmbed);
								foundMessage = true;
							}
						}
					}
				});
		}

		// console.log(message.author.username + ": " + message.content);
		message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Error while trying to post the message: " + message.content + "\n" + err));
	}
	else if(message.channel.name.includes(`suggestion-discussion`) && !message.author.bot)
	{	
		if(message.content.toLowerCase().startsWith(`!get`))
		{
			const messageContent = message.content.toLowerCase().split(" ");

			client.channels.fetch('488354845833560084').then(channel => 
			{
				channel.messages.fetch({ limit: 100 })
					.then(mess => 
					{
						var foundMessage = false;
						for(let [key, em] of mess)
						{ 
							if(em.embeds && !foundMessage)
							{
								const currentEmbed = em.embeds[0];
								if(currentEmbed && currentEmbed.title.toLowerCase().includes(messageContent[1]))
								{
									const newEmbed = new Discord.MessageEmbed(currentEmbed);

									if(currentEmbed.thumbnail.url.includes("background_event"))
									{
										newEmbed.setThumbnail('attachment://background_event.png');
										message.channel.send({files: [eventPerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_ultraRare"))
									{
										newEmbed.setThumbnail('attachment://background_ultraRare.png');
										message.channel.send({files: [ultraRarePerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_veryRare"))
									{
										newEmbed.setThumbnail('attachment://background_veryRare.png');
										message.channel.send({files: [veryRarePerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_rare"))
									{
										newEmbed.setThumbnail('attachment://background_rare.png');
										message.channel.send({files: [rarePerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_uncommon"))
									{
										newEmbed.setThumbnail('attachment://background_uncommon.png');
										message.channel.send({files: [uncommonPerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_common"))
									{
										newEmbed.setThumbnail('attachment://background_common.png');
										message.channel.send({files: [commonPerk], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
									else if(currentEmbed.thumbnail.url.includes("background_rift"))
									{
										newEmbed.setThumbnail('attachment://background_rift.png');
										message.channel.send({files: [rift], embed:newEmbed});
										foundMessage = true;
										message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Could not delete message: " + err));
									}
								}
							}
						}
					})
					.catch(console.error);
			});
		}
	}
	else if(message.channel.name.startsWith(`bugs-list`) && !message.author.bot)
	{
		const embeded = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL);

		if(message.content.toLowerCase().startsWith(`!report`))
		{
			var image = "";
			const messageContent = message.content.split(" ");
			const title = message.content.match(/\[([^)]+)\]/);

			message.attachments.forEach(a => {
		    	image = a.url;
			});

			if(title != null)
			{
				embeded.setTitle("Bug Report - " + title[1])
		  			.setDescription(message.content.replace("!report ", "").replace(title[0], ""))
					.setColor([0, 0, 250]);
			}
			else
			{
				embeded.setTitle("Bug Report - " + version)
		  			.setDescription(message.content.replace("!report ", ""))
					.setColor([0, 0, 250]);
			}

			if(image != "")
			{
				message.channel.send({embed:embeded});
				message.channel.send({files:[{attachment: image}]});
			}
			else
			{
				message.channel.send({embed:embeded});	
			}

		}
		// console.log(message.author.username + ": " + message.content);
		message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Error while trying to post the message: " + message.content + "\n" + err));
	}
	else if(message.content.toLowerCase().startsWith(`!version`) && message.member.hasPermission('VIEW_AUDIT_LOG'))
	{
		const messageContent = message.content.split(" ");
		version = messageContent[1];
		message.delete({ timeout: 1000, reason: 'It had to be done.' }).catch(err => console.log("Error while trying to post the message: " + message.content + "\n" + err));
	}
})

client.login(token);