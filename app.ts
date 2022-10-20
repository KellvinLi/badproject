import express from 'express'
import expressSession from 'express-session'
// import path from 'path'
// import { format, } from 'date-fns'
// import jsonfile from 'jsonfile'
import { userRoutes } from './routes/userRoute'

import Knex from 'knex'
const knexConfigs = require('./knexfile')
const configMode = process.env.NODE_ENV || 'development'
const knexConfig = knexConfigs[configMode]
export const knex = Knex(knexConfig)
import dotenv from 'dotenv'

// import formidable from 'formidable'
// import fs from "fs";
// import { Request, Response } from 'express'

// import fetch from 'cross-fetch'
// import http from 'http';
// import { Server as SocketIO } from 'socket.io'}
import grant from 'grant'
import { digimonRoutes } from './routes/digimonRoute'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
	expressSession({
		secret: 'key.tecky.io',
		resave: true,
		saveUninitialized: true
	})
)

// export const sessionMiddleware = expressSession({
//     secret: "Tecky Academy ",
//     resave: true, //Auto save session
//     saveUninitialized: true,
//     // cookies: {secure : false}
// });

const grantExpress = grant.express({
	defaults: {
		origin: 'http://localhost:8080',
		transport: 'session',
		state: true
	},
	google: {
		key: process.env.GOOGLE_CLIENT_ID || '',
		secret: process.env.GOOGLE_CLIENT_SECRET || '',
		scope: ['profile', 'email'],
		callback: '/user/login/google'
	}
})

app.use(grantExpress as express.RequestHandler)

declare module 'express-session' {
	interface SessionData {
		user?: {
			name?: string
			loggedIn?: boolean
			username?: string
			useremail?: string
			powered?: string
			userId?: number
			userimage?: string
		}
	}
}

// const loggedin = (req: express.Request, res: express.Response, next: any) => {
//     if (req.session.loggedin == true) {
//         next();
//         return;
//     }
//     res.status(401).send("please Login First")
//     return
// }

app.use('/digimon', digimonRoutes)
app.use('/user', userRoutes)

app.use(express.static('uploads'))
app.use(express.static('public')) // auto to do next()
app.use(express.static('error'))

// app.use((req, res, next) => {
//     res.sendFile(path.resolve("./error/404.html"))
// })

app.listen(8080, () => {
	console.log('listening on port 8080')
})
