import sqlite3 from 'sqlite3'
import fs from 'fs'

let database:sqlite3.Database

export default {
  async open(path:string){
    const fileExists = await new Promise(function (resolve,_) {
      fs.readFile(path, (err, data) => {
        if (!err && data) {
          resolve(true) 
        } else {
          console.log(err);
          resolve(false)
        }
      })
    })
    if (!fileExists) return 

    database = await new Promise<sqlite3.Database>(function(resolve,reject){
      const db = new sqlite3.Database(path, (err) => {  
        if (err) {
            console.error("Erro opening database " + err.message);
            reject(err);
        } else {
          resolve(db);
        }
      });
    })
  },
  async all(query:string,params:string[]=[]) {
    return await new Promise(function(resolve,reject){
      database?.all(query,params,function(err,rows){
        if(err){return reject(err);}
        resolve(rows);
      })
    })
  }
} 




