import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './circle.html'
import {Times} from '../interfaces'
import {TimeHalf} from '../interfaces'
require('./circle.scss')


const onec = 50
let lastExec = (new Date).getTime()
function Stoper(){
  if( ((new Date).getTime() - lastExec)<=10){
    lastExec = (new Date).getTime()
    return false
  }else{
    lastExec = (new Date).getTime()
    return true
  }
}

@WithRender
@Component({
  props:{
    time:String,
  }
})
export default class CircleComponent extends Vue {
  dragging:boolean = false
  x:number = 0
  y:number = 0
  start:number = 2
  margin:number = 2
  currentHour: number = 0

  startDrag() {
    this.dragging = true;
  }
  stopDrag() {
    console.log("Stop")
    this.dragging = false;
  }
  doDrag(event:MouseEvent) {
    if (this.dragging) {
      let avgX =  event.clientX - this.x
    
      this.margin+=(avgX/70)
    }
    this.x = event.clientX;
    this.y = event.clientY;
  }

  get rotate(){
    return Math.floor(this.margin)*30
  }

  get curentHourNow(){
    return Math.abs((Math.floor(this.margin)-this.start)%12)
  }
  

  mounted(){
    document.addEventListener("mousemove", function(event) {
      this.doDrag(event)
    }.bind(this));
    window.addEventListener('mouseup', this.stopDrag);
  }

  beforeDestroy(){
    console.log("Destoyed Circle")
  }
}