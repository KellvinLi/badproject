import { Request, Response } from 'express';
import Knex from 'knex';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import {seed} from '../seeds/create-users-memos'
import  SocketIO  from 'socket.io'
import * as hash from "../hash";
const knexConfigs = require("../knexfile");
const knexConfig = knexConfigs["test"];
const knex = Knex(knexConfig);

beforeAll(async ()=>{
    await seed(knex);
})
describe("UerControllerIntergration",()=>{
    let service: UserService;
    let controller: UserController;
    let io: SocketIO.Server;
    let req: Request;
    let res: Response;

    let resSpy:jest.SpyInstance;
    let getUserSpy: jest.SpyInstance;
    let checkPasswordSpy: jest.SpyInstance;
    let hashModuleCalledCount:number;
    beforeAll(async ()=>{
        hashModuleCalledCount=0
    })
    
    beforeEach(function(){
        
        io=createSocketIO()
        req=createRequest()
        res=createResponse()
        service = new UserService(knex);
        controller = new UserController(service,io);
        
        resSpy = jest.spyOn(res,'json');
        getUserSpy=jest.spyOn(service,'getUser');
        checkPasswordSpy=jest.spyOn(hash,"checkPassword")
    })
    it("getUsers",async ()=>{
        const serverSpy = jest.spyOn(service,'getUsers');
        await controller.getUsers(req,res);
        expect(serverSpy).toBeCalledTimes(1)
        const users=await service.getUsers();
        expect(resSpy).toBeCalledWith(users);
    });
    it("login without password",async ()=>{
        req=createRequest({username:"",password:""})
        await controller.login(req,res);
        expect(getUserSpy).toBeCalledTimes(0)
        expect(res.status).toBeCalledWith(400)
        expect(res.status(400).json).toBeCalledWith({
            message: 'Invalid username or password'
        });
    });
    it("login invalid username",async ()=>{
        req=createRequest({username:"gordon",password:"tecky"})
        await controller.login(req,res);
        expect(getUserSpy).toBeCalledTimes(1)
        expect(checkPasswordSpy).toBeCalledTimes(0)
        expect(res.status).toBeCalledWith(400)
        expect(res.status(400).json).toBeCalledWith({
            message: 'Invalid username or password'
        });
    });
    it("login invalid password",async ()=>{
        req=createRequest({username:"gordon@tecky.io",password:"1234"})
        await controller.login(req,res);
        expect(getUserSpy).toBeCalledTimes(1)
        expect(checkPasswordSpy).toBeCalledTimes(++hashModuleCalledCount)
        expect(res.status).toBeCalledWith(400)
        expect(res.status(400).json).toBeCalledWith({
            message: 'Invalid username or password'
        });
    });
    it("login valid password",async ()=>{
        req=createRequest( {username:"gordon@tecky.io",password:"tecky"})
        await controller.login(req,res);
        expect(getUserSpy).toBeCalledTimes(1)
        expect(checkPasswordSpy).toBeCalledTimes(++hashModuleCalledCount)
        expect(res.status).toBeCalledWith(200)
        expect(res.status(200).json).toBeCalledWith({message: "Success login",
        user:{username:"gordon@tecky.io"}});
    });


    
})

afterAll(async()=>{
    await knex.destroy()
})
function createSocketIO(){
    const emit = jest.fn((event,msg)=>null)
    return {
        to: jest.fn(()=>({emit}))
    } as any as SocketIO.Server
}

function createRequest(body={username:"gordon@tecky.io",password:"tecky"}){
    return  {
        session:{},
        body:body
    }as any as Request
}


function createResponse(){
    const json=jest.fn((code)=>null)
    return {
        status:jest.fn((e)=>({json})),
        json: jest.fn((e)=>null)
    } as any as Response
}