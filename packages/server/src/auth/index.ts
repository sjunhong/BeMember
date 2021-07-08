import express from 'express'
import { googleSignUp } from './google-signup'

const authRouter = express.Router()

authRouter.post('/google/check')
authRouter.post('/google/signin')
authRouter.get('/google/signup', googleSignUp)

export default authRouter
