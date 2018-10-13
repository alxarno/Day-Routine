import Vue from 'vue'
import Component from 'vue-class-component'

import {Action} from 'src/models/action'
import SliderComponent from './slider/slider'
import * as WithRender from './new_routine.html';
require('./new_routine.scss')

import DropdownComponent from 'src/view/default-components/dropdown/dropdown'

const nothing = require('assets/do-not-disturb-rounded-sign.svg')
const file = require('assets/file.svg')
const link = require('assets/internet.svg')


@WithRender
@Component({
  components:{
    SliderComponent,
    DropdownComponent
  }
})
export default class NewRoutineComponent extends Vue {

  name:string = ""
  description:string = ""
  hours:number = 0;
  action:Action = Action.Link

  nothing:string = nothing
  file:string = file
  link:string = link  

  click(index:number){
    // console.log("ABC")
    this.action = index
  }

  sliderTriger(num:number){
    // console.log(num)
    this.hours = num
  }
}