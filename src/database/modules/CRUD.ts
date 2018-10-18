import {IDB} from '../interfaces'

import {ICRUD} from '../../interfaces/storageKernel'

import {Request} from './lib'

export class Crud implements ICRUD{
  private tableName:string
  private DB:IDB

  constructor(tableName: string, DBConnection:IDB){
    this.tableName = tableName
    this.DB = DBConnection
  }

  private getFields(data:{[key:string]:any}):Array<string>{
    let fields:Array<string> = []
    for(let field in data){
      fields.push(field)
    }

    return fields
  }

  async Get(){
    let arg:{[key:string]:any} = {id:-1}
    for (var i = 0; i < arguments.length; i++) {
      arg = arguments[i]
    }

    let requestString = ""
    let requestData = []

    if(arg.id !=-1){
      let fields:Array<string> = this.getFields(arg)

      let valueTemplates:Array<any> = fields.map((val)=>{return val+" = ?"})
      let valuesTemplatesString:string = valueTemplates.join("AND")

      requestData = fields.map((val)=>arg[val])

      requestString = "SELECT * FROM "+this.tableName+" WHERE "+valuesTemplatesString
    }else{
      requestString = "SELECT * FROM "+this.tableName
    }
    // console.log("===================")
    // console.log(requestString)
    // console.log("===================")
    let promise = Request(
      requestString,
      requestData,this.DB)

    let data = await promise

    return data.rows
  }

  async Insert(data:{[key:string]:any}):Promise<number>{
    let fields:Array<string> = this.getFields(data)
    fields.splice(fields.indexOf("ID"), 1);
   

    let values:Array<any> = fields.map((val)=>data[val])
    let questionMarks:Array<any> = fields.map(()=>'?')


    let querryString = `INSERT INTO `+this.tableName+
    ` (`+fields.toString()+`) VALUES (`+questionMarks.toString()+`)`
    // console.log("++++++++++++++++++")
    // console.log(querryString)
    // console.log("++++++++++++++++++")
    
    let promise = Request(
      querryString,
      values,
      this.DB)
    
    let somedata = await promise
    return somedata.insertId
  }


  async Update(data:{[key:string]:any}){
    if(!data.hasOwnProperty('ID')){
      throw "Argument haven't ID property"
    }

    let fields:Array<string> = this.getFields(data)

    fields.splice(fields.indexOf('ID'),1)

    let valueTemplates:Array<any> = fields.map((val)=>{return val+" = ?"})
    let valuesTemplatesString:string = valueTemplates.join(",")

    let querryString = `UPDATE `+this.tableName+` SET `+
      valuesTemplatesString+` WHERE ID=?`
    

    let valuesArray =  fields.map((val)=>data[val])
    valuesArray =  [...valuesArray, data['ID']]

    // console.log(querryString)
    // console.log(valuesArray)

    let promise = Request(
      querryString,
      valuesArray,
      this.DB)

    await promise
  }

  async Delete(){
    let arg:{[key:string]:any} = {id:-1}
    for (var i = 0; i < arguments.length; i++) {
      arg = arguments[i]
    }

    let fields:Array<string> = this.getFields(arg)

    let questionMarks:Array<any> = fields.map(()=>'?') 

    let valueTemplates:Array<any> = fields.map((val)=>{return val+" = ?"})
    let valuesTemplatesString:string = valueTemplates.join("AND")

    let valuesArray =  fields.map((val)=>arg[val])

    let requestString = "DELETE FROM "+this.tableName+" WHERE "+valuesTemplatesString
    let promise = Request(
      requestString,
      valuesArray,this.DB)

    await promise
  }

}