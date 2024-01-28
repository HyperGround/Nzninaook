pmodule.exports = {
    prefix: "&",
    welcomeChannel: "1192515563809935480",
    slashCommands: true,
    colors: {
        main: [0, 110, 255],
        error: [231, 76, 60]
    },
    botstatus: {
        enabled: true,
        status: "online",
        activity_type: "WATCHING",
        activity_text: "Commands Slash / :  prefix &",
        activity_url: "https://twitch.tv/sixur_405" 
    },
    inviteRewards: false,
    rewards: [
        {
            invitesNeeded: 5,
            roleID: "1194623169500295310"
        }, //(DONT USE THIS SYSTEM AS DISCORD DOES NOT ALLOWS IT NOW.)
        {
            invitesNeeded: 10,
            roleID: "1194623453484028004"
        }
    ],
    welcomeMessage: "╭ ・ ⌬ ・{member} joined.
●▬▬▬▬▬▬▬▬๑۩✰۩๑▬▬▬▬▬▬▬▬●
✰・Invited by **{inviter}**
✰・They have now **{invites}** invites
●▬▬▬▬▬▬▬▬๑۩✰۩๑▬▬▬▬▬▬▬▬●
╰ ・ ⌬ ・BOT STATION COMMUNITY ", // Use {inviter} for who invited the member, {member} for the member, {code} for the invite used, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
    leaveMessage: "{member} left the server. They were invited by **${inviter}** (who has ${invites} invites).", // Use {inviter} for who invited the member, {member} for the member, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
}