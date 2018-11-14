import Vue from 'vue'
import Component from 'vue-class-component'
import {State, Action} from 'vuex-class'
import SliderComponent from './slider/slider'
import * as WithRender from './routine.html';
require('./routine.scss')

import DropdownComponent from 'src/view/default-components/dropdown/dropdown'

const nothing = require('assets/do-not-disturb-rounded-sign.svg')
const file = require('assets/file.svg')
const link = require('assets/internet.svg')

const pen =require('assets/pen.svg')
import {colors} from 'src/view/color.themes'
import { Routine } from 'src/models/routines.routine';
import { Action as RoutineAction } from 'src/models/action';

const {dialog} = (window as any).require('electron').remote

const namespace:string = "routines"
const appNamespace:string = "app"

@WithRender
@Component({
  props:{
    routineID:Number
  },
  components:{
    SliderComponent,
    DropdownComponent
  }
})

// FIX THERE ALL
export default class RoutineComponent extends Vue {
  @State("items",{namespace}) routines:Array<Routine>

  @Action('addRoutine', { namespace }) addRoutine: any;
  @Action('deleteRoutine', { namespace }) deleteRoutine: any;
  @Action('saveRoutine', { namespace }) saveRoutine: any;
  @Action("closePopUp", {namespace:appNamespace}) closePopUp:any
  // saveRoutines

  colors:Array<string> = Object.keys(colors)
  ID:number = -1
  currentRoutine:Routine = {
    ID:-1, name:"",
    actionBody:"",
    actionType: RoutineAction.Link,
    colorScheme:Object.keys(colors)[0],
    describe:"",hours:1}

  actionBuffer:string = ""
  nothing:string = nothing
  file:string = file
  link:string = link  
  pen:string = pen

  
  currentColorIndex():number{
    return Object.keys(colors).indexOf(this.currentRoutine.colorScheme)
  }

  created(){
    if(this.$props.routineID != -1){
      this.routines.forEach((element:Routine) => {
        if(element.ID == this.$props.routineID){
          this.currentRoutine = Object.assign({}, element)
        }
      });
    }
  }

  colorChange(colorScheme:string){
    this.currentRoutine.colorScheme = colorScheme;
  }

  click(index:number){
    if((index==2 || index==1) && this.currentRoutine.actionType != 3){
      let l = this.currentRoutine.actionBody;
      this.currentRoutine.actionBody = this.actionBuffer;
      this.actionBuffer = l;
    }
    this.currentRoutine.actionType = index
  }

  sliderTriger(num:number){
    this.currentRoutine.hours = num
  }

  chooseFile(){
    let path = dialog.showOpenDialog({
      properties: ['openFile']
    });

    this.currentRoutine.actionBody = path[0];
  }

  create(){
    this.addRoutine(
      this.currentRoutine
    )
  }

  get actionBody(){
    let path =  this.currentRoutine.actionBody
    if(path.length>20){
      path = "..."+path.substring(path.length-19, path.length)
    }
    return path
  }

  deleteRoutineClick(){
    this.deleteRoutine(this.currentRoutine)
    this.closePopUp()
  }

  beforeDestroy(){
    this.saveRoutine(this.currentRoutine)
  }
}