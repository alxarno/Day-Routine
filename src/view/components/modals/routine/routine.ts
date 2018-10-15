import Vue from 'vue'
import Component from 'vue-class-component'




import {Action} from 'src/models/action'
import SliderComponent from './slider/slider'
import * as WithRender from './routine.html';
require('./routine.scss')

import DropdownComponent from 'src/view/default-components/dropdown/dropdown'

const nothing = require('assets/do-not-disturb-rounded-sign.svg')
const file = require('assets/file.svg')
const link = require('assets/internet.svg')

const pen =require('assets/pen.svg')
import {colors} from 'src/view/color.themes'

const {shell,dialog} = window.require('electron').remote
let actionBuffer:string;

@WithRender
@Component({
  components:{
    SliderComponent,
    DropdownComponent
  }
})
export default class RoutineComponent extends Vue {

  name:string = ""
  description:string = ""
  hours:number = 0;
  action:Action = Action.File
  actionBody:string = ""
  colors:Array<string> = Object.keys(colors)
  colorScheme:string = Object.keys(colors)[0]

  nothing:string = nothing
  file:string = file
  link:string = link  
  pen:string = pen

  colorChange(colorScheme:string){
    this.colorScheme = colorScheme;
  }

  click(index:number){
    if((index==2 || index==1) && this.action != 3){
      let l = this.actionBody;
      this.actionBody = actionBuffer;
      actionBuffer = l;
    }
    this.action = index
  }

  sliderTriger(num:number){
    this.hours = num
  }

  chooseFile(){
    let path = dialog.showOpenDialog({
      properties: ['openFile']
    });

    if(path[0].length>20){
      path = "..."+path[0].substring(path[0].length-20, path[0].length-1)
    }
    this.actionBody = path;
  }

  create(){
    this.$store.dispatch('addRoutine',{
      ID:-1,
      name:this.name,
      colorScheme: this.colorScheme,
      describe:this.description,
      hours: this.hours,
      actionBody: this.actionBody,
      actionType: this.action
    })

    this.$store.dispatch('closePopUp')
    this.$store.dispatch('closeRoutines')
  }
}