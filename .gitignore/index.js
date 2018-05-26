const Discord = require('discord.js');
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

const adapter = new FileSync("database.json")
const db = low(adapter);


var bot = new Discord.Client();
var prefix = ("/");
var nombot = ("Paco");
var randnum = 0

db.defaults({ histoires: [], xp: []})
    .write()

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: "No Fap Challenge", type: 0 } });
    console.log("Bot Ready !");
});

bot.login("NDM2MTkyNjk4NjY4NTQ4MDk2.Ddh4qg.nIBVQWriDW0hQnsHyzIQkj93H9A");

bot.on("message", message => {

    var msgauthor = message.author.id;

    if (message.author.bot) return;

    if (!db.get('xp').find({ user: msgauthor }).value()) {

        db.get('xp').push({ user: msgauthor, xp: 1 }).write();
    } else {
        var userxpdb = db.get('xp').filter({ user: msgauthor }).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        db.get("xp").find({ user: msgauthor }).assign({ user: msgauthor, xp: userxp[1] += 1 }).write();



    }
    if (!message.content.startsWith(prefix)) return; 
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {

        case "newstory":
            var value = message.content.substr(10);
            var author = message.author.id;
            var number = db.get("histoires").map("id").value();
            message.reply("Ajout de l'histoire a la base de données")
            db.get("histoires")
                .push({ story_value: value, story_author: author })
                .write();

            break;


    }


    if (message.content === prefix + "alaide") {
        var help_embed = new Discord.RichEmbed()
            .setColor("#F000C8")
            .addField("Comment parler a " + nombot + " :", "   - /alaide :           Affiche les commandes du bot ! \n- /humeur :        Humeur du bot\n - ping :        pong\n - /newstory :        Ajoute une histoire à la base de donnée" )
            message.channel.sendEmbed(help_embed);
    }

    if (message.content === prefix + "humeur") {
        random();
        if (randnum == 1) {
            message.reply("Je vais bien");
        }

        if (randnum == 2) {
            message.reply("jsp");
        }

        if (randnum == 3) {
            message.reply("Ba oui pourquoi ?");
        }
    }
    if (message.content === prefix + "xpstat") {
        var xp = db.get("xp").filter({ user: msgauthor }).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#01FF3E')
            .setTitle(`Nombre d'XP de ${message.author.username}`)
            .setDescription("Tiens je te donne ton nombre d'XP !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({ embed: xp_embed });
    }



    });

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min + 1) + min);

}
