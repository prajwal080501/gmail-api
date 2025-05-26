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
    to: 'praju.ladkat@gmail.com',
    from: 'prajwal.ladkat@datadynamx.com',
    subject: 'Gmail API using Node JS',
};

module.exports = {
    auth,
    mailOptions
}