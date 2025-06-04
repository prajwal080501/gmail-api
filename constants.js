require('dotenv').config();

const auth = {
    type: 'OAuth2',
    user: 'prajwal.ladkat@datadynamx.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
}


const mailOptions = {    
    to: 'vaibhav.bombe@datadynamx.com',
    from: 'iamprajwalladkat@gmail.com',
    subject: 'Gmail API using Node JS',
};

module.exports = {
    auth,
    mailOptions
}