import React from 'react'
import './App.css'
import * as queryString from 'query-string'
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH2_REDIRECT_URL,
  scope: scopes.join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
})

const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
console.log(process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID)

function App() {
  return <a href={oauth2Url}>google login</a>
}

export default App
