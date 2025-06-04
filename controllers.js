const { createConfig } = require('./utils');
const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants');
const { google } = require('googleapis');
const axios = require('axios'); // Add this import

require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
    try {
        console.log('Sending mail...');
        const accessToken = await oAuth2Client.getAccessToken();
        let token = accessToken.token;

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...CONSTANTS.auth,
                accessToken: token,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            ...CONSTANTS.mailOptions,
            text: 'This is a test mail using Gmail API'
        };

        const result = await transport.sendMail(mailOptions);
        console.log('Email sent: ', result);
        res.json({ success: true, result }); // Use res.json instead of res.send
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config); // Use axios instead of fetch
        res.json(response.data);
    }
    catch (error) { // Fixed variable name from 'err' to 'error'
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getMails(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config); // Use axios instead of fetch
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getDrafts(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config); // Use axios instead of fetch
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function readMail(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config); // Use axios instead of fetch
        
        res.json(response.data); // Remove unnecessary variable assignment
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    getUser,
    getMails,
    getDrafts,
    readMail,
    sendMail
};
