import { User} from '../types/user'
import { pool } from '../lib/dbConnection'

export class UserModel{
    async save(user:User):Promise<Boolean> {
        try{
            const sql= `insert into users(username,password) values(?,?);`
            await pool.query(
                sql,
                [user.username,user.password]
            )
            return true
        }catch(err){
            console.log(err)
            return false;
        }
    } 
    async exists(username:string): Promise<Boolean> {
        try{
            const sql= `select count(*) as count from users;`
            const [rows]:any = await pool.query(sql)
            return  rows[0].count>0
        }catch(err){
            console.log(err)
        }
        return false
    }
    async login(username:string):Promise<User|null>{
        try{
            const sql:string= `select * from users where username = ?`
            const [rows]:any=await pool.query(
                sql,
                [username]
            )
            if(rows[0]){
                return rows[0] as User;
            }
            return null
        }catch(err){
            throw err
        }
        return null;
    }
}

