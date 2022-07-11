const nodemailer = require('nodemailer');
const { google } = require('googleapis');
import dotenv from 'dotenv';
dotenv.config();


// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function passMail(userMailID) {
    console.log("inside passmail id---->>>>",userMailID)
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.userID,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.userID,
      to: userMailID,
      subject: 'user regs things',
      text: 'Hello from gmail to user registration',
      html:`<h1>Hello,<br><br>Click on given link to for user registrattion!</h1><br><h1>Link:><a href="http://localhost:7000/}">click here</a></h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;

  } catch (error) {
    return error;
  }
}

// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));