import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './circle.html'
import {Times} from '../interfaces'
import {TimeHalf} from '../interfaces'
require('./circle.scss')



@WithRender
@Component({
  props:{
    time:String,
    startPos: Number,
    triggered:Function,
    timeCurrent: Number
  }
})
export default class CircleComponent extends Vue {
  dragging:boolean = false
  MINIMAL_STEP = 70
  x:number = 0
  y:number = 0
  margin:number = 0
  // currentHour: number = 0

  startDrag() {
    this.dragging = true;
  }
  stopDrag() {
    this.dragging = false;
  }
  doDrag(event:MouseEvent) {
    // console.log("Drag")
    if (this.dragging) {
      let avgX =  event.clientX - this.x
      this.margin+=(avgX/this.MINIMAL_STEP)
      this.$props.triggered(this.curentHourNow)
    }
    this.x = event.clientX;
    this.y = event.clientY;
  }

  get rotate(){
    return Math.floor(this.margin)*30-6
  }

  created(){
    let  currTime = this.$props.timeCurrent
    this.margin = this.$props.startPos
    if(currTime>=12){currTime-=12}
    this.margin-=currTime
  }

  get curentHourNow(){
    let start =  this.$props.startPos
    let lastTime = this.$props.timeCurrent
    let margin = Math.floor(this.margin)
    let newMargin = (margin-start)*-1

    if(newMargin>12 || newMargin<-12){
      newMargin = newMargin%12
    }
   
    if(newMargin<0) newMargin=12+newMargin
    if(newMargin==12)newMargin=0

    if(lastTime>11){
      newMargin+=12
    }

    return newMargin
  }




  mounted(){
    document.addEventListener("mousemove", this.doDrag)
    window.addEventListener('mouseup', this.stopDrag);
  }

  beforeDestroy(){
    console.log("Destoyed Circle")
  }
}