import { google } from 'googleapis'
import express from 'express'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH2_REDIRECT_URL
)

export const googleSignUp = async (
  req: express.Request,
  res: express.Response
) => {
  console.log('google login query: ', req.query)
  if (req.query?.code && typeof req.query.code === 'string') {
    const authCode = req.query.code

    const { tokens } = await oauth2Client.getToken(authCode)
    // TO-DO : store token in database
    console.log('generated token: ', tokens)
    // const userProfile = await getUserProfile(accessToken)
    oauth2Client.setCredentials(tokens)
  }
  res.status(200)
  res.send('access token received')
}

// client click the button -> server send the auth Url -> client go to that url
// google redirect to server with auth code -> server gets auth code -> server gen token with auth code
// server stores access token -> server returns token

async function getUserProfile(accesssToken: string) {
  const { data } = await google.people('v1').people.get({
    access_token: accesssToken,
    resourceName: 'people/me',
    personFields: 'names,emailAddresses,photos',
  })

  console.log('user data received: ', data)
}
