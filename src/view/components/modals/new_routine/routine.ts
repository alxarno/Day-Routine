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
  actionBody:string = "math.pdf"

  nothing:string = nothing
  file:string = file
  link:string = link  
  pen:string = pen

  click(index:number){
    // console.log("ABC")
    this.action = index
  }

  sliderTriger(num:number){
    // console.log(num)
    this.hours = num
  }
}