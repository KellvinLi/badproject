import express from 'express'
// import { Knex } from "Knex";
// import { Server as SocketIO } from 'socket.io'
// import UserService from '../services/userService'
// import UserController from '../controllers/userController'
// import { Request } from 'express'
// import crypto from 'crypto';
// import { checkPassword, hashPassword } from "../untils/bcypt";
// import { client } from "../untils/DB";
// import { form } from "../untils/formidable";
import UserController from '../controllers/userController'
// import userService from "../services/userService";

export const userRoutes = express.Router()

let userController = new UserController()

// let userController = new UserController(userService);

// export function initialize(client:Knex,io:SocketIO){

// 	const userService = new UserService(client);
// 	const userController = new UserController(userService,io);

// 	userRoutes.get('/', userController.getUsers)
// 	userRoutes.post('/register', userController.register)
// 	userRoutes.get('/liked-memo/:userId', userController.likedMemos)
// 	userRoutes.post('/login', userController.login)
// 	userRoutes.get('/login/google', userController.loginGoogle)
// 	userRoutes.get('/logout', userController.logout)
// 	userRoutes.get('/me', userController.me)
// }

//攪 Google login
userRoutes.get('/login/google', userController.loginGoogle)

// async function loginGoogle(req: Request, res: Response) {
//     try {
//         const accessToken = req.session?.['grant'].response.access_token;
//         // 如果google in 成功，就會拎到 一個 access token
//         // access token 係用黎換番google 既 user profile
//         const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
//             // fetch google API, 拎 user profile
//             method: "get",
//             headers: {
//                 "Authorization": `Bearer ${accessToken}`
//             }
//         });
//         const GoogleFile = await fetchRes.json();
//         const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [GoogleFile.email])).rows;
//         let user = users[0];
//         // get random 32 bit string
//         // 如果 user 不存在，馬上 create 一個
//         if (!user) {
//             const randomString = crypto.randomBytes(32).toString("hex");
//             let googleHashPassword = await hashPassword(randomString)
//             // Create the user when the user does not exist
//             user = (await client.query(`INSERT INTO users (username,useremail,password,userimage)
//                 VALUES ($1,$2,$3,$4) RETURNING *`,
//                 [GoogleFile.name, GoogleFile.email, googleHashPassword, GoogleFile.picture])).rows[0]
//         }
//         console.log(user);

//         req.session.user = {}
//         req.session.user.loggedIn = true
//         req.session.user.username = user.username
//         req.session.user.userId = user.id
//         req.session.user.useremail = user.useremail
//         console.log(user.id);
//         console.log(req.session.user.loggedIn);
//         console.log(req.session.user.name);
//         res.redirect('/')
//         req.session.save()
//     } catch (error) {
//         console.log(error)
//         // res.redirect('/index.html?error=google login fail')
//         res.status(401).json({ message: "Register Unsuccessful" })
//     }
// }

// register function
// export function registerPromise(req: Request) {
//     return new Promise<any>((resolve, reject) => {
//         form.parse(req, async (err: any, fields: any, files: Files) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve({ fields, files })
//         });
//     });
// }

userRoutes.post('/register', userController.register)
//     try {
//         let { fields, files } = await registerPromise(req);

//         const username = fields.username
//         const useremail = fields.useremail
//         const password = fields.password
//         const checkPassword = fields.checkPassword
//         let userImage;
//         let userImageResult;

//         if (Object.keys(files).length > 0) {
//             userImage = Array.isArray(files.userimage) ? files.userimage[0] : files.userimage;
//             userImageResult = userImage.newFilename;
//         }

//         console.log("username: ", username);
//         console.log("useremail:", useremail);
//         console.log("password: ", password);
//         console.log("userimage: ", userImageResult);

//         if (!username || !useremail || !password) {
//             res.status(401).json({ message: "Incorrect email or password" });
//             return;
//         }
//         if (password !== checkPassword) {
//             res.status(400).json({
//                 message: 'password check failed'
//             })
//             return
//         }

//         let hashedPassword = await hashPassword(password)
//         console.log(hashedPassword)
//         await client.query(`INSERT INTO users (username,useremail,password,userimage)
//         VALUES ($1,$2,$3,$4) RETURNING id`,
//             [username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null, false])

//         res.json({ message: 'User created' })
//     } catch (err) {
//         console.log(err);
//         res.status(401).json({ message: "Register Unsuccessful" });
//     }

// })

//login  function

userRoutes.post('/login', userController.login)
//     try {

//         const username = req.body.username
//         const password = req.body.password
//         console.log(username)

//         if (!username || !password) {
//             res.status(401).json({ message: "Incorrect username or password" });
//             return;
//         }

//         let login_result = (await client.query(
//             'SELECT * from users where username = ($1)', [username])).rows;
//         console.log(login_result[0]);
//         let user = login_result[0];
//         console.log(user);

//         if (!user || Object.keys(user).length === 0) {
//             res.status(401).json({ message: "Incorrect email or password" });
//             return
//         }
//         console.log(password);

//         let match = await checkPassword(password, user.password);
//         console.log(match)
//         console.log(password);
//         if (!match) {
//             res.status(401).redirect('/login.html?error=Incorrect+Username')
//             return
//         }
//         console.log(password);

//         req.session.user = {}
//         req.session.user.loggedIn = true
//         req.session.user.username = user.username
//         req.session.user.userId = user.id
//         req.session.user.useremail = user.useremail
//         console.log(user.id);
//         console.log(req.session.user.loggedIn);
//         console.log(req.session.user.name);
//         req.session.save();
//         res.status(200).json({ message: 'Success login' })

//     } catch (err) {
//         res.status(500).json({ message: "Internal Server error" });
//         console.log(err);
//         return
//     }

// })

//Logout function
userRoutes.post('/logout', userController.logout)
//     req.session.destroy(() => {
//         console.log("user logged out");
//     })
//     res.json({
//         message: "Success Logout"
//     })
// })

userRoutes.get('/getme', userController.getme)
//     if (!req.session["user"]) {
//         res.status(403).json({
//             message: "403 forbidden you are getting denied access. ",
//         });
//     } else {
//         res.json({
//             message: "Success retrieve user",
//             data: {
//                 user: req.session["user"] ? req.session["user"] : null,
//             },
//         });
//     }
// });

//拎 user info
userRoutes.get('/user_info', userController.userInfo)
