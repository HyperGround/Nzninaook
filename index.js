const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { readdir, stat } = require('fs');
const { prefix } = require('./config');
const { Team } = require('discord.js');
const { join } = require('path');
const Sequelize = require('sequelize');
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Please connect me into a hosting website to enable 24/7'));
let listener = app.listen(PORT, () => console.log('Your app is currently listening on port: ' + listener.address().port));
let client = new AkairoClient({partials: ['GUILD_MEMBER']});
client.config = require('./config')
client.tools = require('./functions')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '.data/db.sqlite',
    logging: false
});
const invites = sequelize.define('invite', {
    discordUser: Sequelize.STRING,
    inviter: Sequelize.STRING,
    invites: Sequelize.NUMBER,
    guildID: Sequelize.STRING
});
invites.sync();
client.invites = invites;
const guildInvites = new Map();
client.guildInvites = guildInvites;
client.sequelize = sequelize
const slashCommandList = [];
client.slashCommandList = slashCommandList;
let commandHandler = new CommandHandler(client, {
    directory: './commands/',
    allowMention: true,
    prefix: prefix,
    argumentDefaults: {
        prompt: {
            timeout: 'Time ran out, command has been cancelled.',
            ended: 'Too many retries, command has been cancelled.',
            cancel: 'Command has been cancelled.',
            retries: 1,
            time: 30000
        }
    },
    commandUtil: true
});
readdir(join(__dirname, './types/'), async (err, files) => {
    if(err) return console.log(chalk.red('An error occured when checking the types folder for types to load: ' + err));
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let typeFile = require(join(__dirname, 'types', file));
        commandHandler.resolver.addType(file.split('.')[0], async (message, phrase) => typeFile(message, phrase, client))
    });
});
client.handler = commandHandler;
let listenerHandler = new ListenerHandler(client, {
    directory: './listeners/'
});
commandHandler.useListenerHandler(listenerHandler);
listenerHandler.setEmitters({
    commandHandler: commandHandler,
    ws: client.ws
});
listenerHandler.loadAll();
commandHandler.loadAll();
async function registerSlashCommands(dir) {
    readdir(join(__dirname, dir), async (err, files) => {
        if(err){
            return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
        };
        files.forEach(async (file) => {
            stat(join(__dirname, dir, file), (err, stat) => {
                if(err) return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
                if(stat.isDirectory()) {
                    registerSlashCommands(join(dir, file));
                } else {
                    if(!file.endsWith('.js')) return;
                    let commandFile = require(join(__dirname, dir, file));
                    slashCommandList.push({
                        run: commandFile.slashCommand,
                        name: file.split('.')[0]
                    });
                };
            });
        });
    });
};
registerSlashCommands('./commands/');
client.login("MTE2NDE5NjkzODI2MzA0MDA2MQ.GLUFDD._kNrocwhQSfKzuiUUe5tRdDgqoCGS7K11BQzOQ");
client.fetchApplication().then((application) => {
    let owners = application.owner;
    if(owners instanceof Team) {owners = owners.members.map(user => user.id)} else {owners = owners.id};
    client.ownerID = owners;
});
