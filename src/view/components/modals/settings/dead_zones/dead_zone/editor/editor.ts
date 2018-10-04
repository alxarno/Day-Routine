import Vue from 'vue'
import Component from 'vue-class-component'
import {DeadZone} from 'src/models/dead_zone'
import {Times} from './interfaces'
import {TimeHalf} from './interfaces'

import CircleComponent from './circle/circle'
import SwitchComponent from './switch-time-zone/switch'

import * as WithRender from './editor.html'
require('./editor.scss')

const cursor = require('assets/navigation.svg')
 
@WithRender
@Component({
  components:{
    CircleComponent,
    SwitchComponent
  },
  props:{
    zone: {
      type: Object as () => DeadZone
    },
    time:{
      type: Object as () => Times
    }
  }
})
export default class Editor extends Vue {

  startTimeZone:TimeHalf = TimeHalf.AM
  doneTimeZone:TimeHalf = TimeHalf.AM
  cursor:string = cursor

  computed(){
    this.startTimeZone = this.timeHalf(this.$props.zone.start)
    this.doneTimeZone = this.timeHalf(this.$props.zone.done)
  }

  triggeredRight(hour:number){
    if(this.doneTimeZone == TimeHalf.PM){
      hour+=12
    }
    this.$props.zone.done = hour
  }

  trigerredLeft(hour:number){
    if(this.startTimeZone == TimeHalf.PM){
      hour+=12
    }
    this.$props.zone.start = hour
  }

  changeZoneStart(){
    if(this.$props.zone.start >=12){
      this.$props.zone.start-=12
      this.startTimeZone = TimeHalf.AM
    }else{
      this.$props.zone.start+=12 
      this.startTimeZone = TimeHalf.PM
    }
    // console.log("Start")
  }

  changeZoneEnd(){
    if(this.$props.zone.done >=12){
      this.$props.zone.done-=12
      this.doneTimeZone = TimeHalf.AM
    }else{
      this.$props.zone.done+=12 
      this.doneTimeZone = TimeHalf.PM
    }
   
  }

  timeHalf(time:number):TimeHalf{
    if(time>=12){
      return TimeHalf.PM
    }else{
      return TimeHalf.AM
    }
  }
  
}