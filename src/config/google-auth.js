import 'dotenv/config';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';

const auth = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'https://teste-pid-leonardo.netlify.com',
  scope: 'https://www.googleapis.com/auth/cloud-platform',
});

// const auth = new GoogleAuth({
//   clientOptions: {
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: 'https://teste-pid-leonardo.netlify.com',
//     scopes: 'https://www.googleapis.com/auth/cloud-platform',
//   },
// });

const url = auth.generateAuthUrl();

export default url;
