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

    let promise = Request(
      requestString,
      requestData,this.DB)

    let data = await promise

    return data.rows
  }

  async Insert(data:{[key:string]:any}){
    let fields:Array<string> = this.getFields(data)
   

    let values:Array<any> = fields.map((val)=>data[val])
    let questionMarks:Array<any> = fields.map(()=>'?')


    let querryString = `INSERT INTO `+this.tableName+
    ` (`+fields.toString()+`) VALUES (`+questionMarks.toString()+`)`
    
    let promise = Request(
      querryString,
      values,
      this.DB)

    await promise
  }

  Update(){
    
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