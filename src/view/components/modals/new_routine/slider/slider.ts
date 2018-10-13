import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './slider.html'
require('./slider.scss')

@WithRender 
@Component({
  props:{
    max:Number,
    now: Number,
    triggered:Function
  }
})
export default class SliderComponent extends Vue {

  dragging:boolean = false
  x:number = 0
  current:number = 0
  // MINIMAL_STEP = 
  margin:number = 0;

  startDrag() {
    this.dragging = true;
  }

  doDrag(event:MouseEvent){
    if (this.dragging) {
      let avgX =  event.clientX - this.x
      this.margin+=avgX
      // 3 is just index of speed
      let minmargin = ((<HTMLElement>(this.$refs.slider_element_ref)).offsetWidth/this.$props.max)-3
      if(this.margin>=minmargin && this.current<this.$props.max){
        this.current++
        this.margin = 0
        this.$props.triggered(this.current)
      }else if(this.margin<=-1*minmargin && this.current>1){
        this.current--
        this.margin = 0
        this.$props.triggered(this.current)
      }
    }
    this.x = event.clientX;
  }

  stopDrag(){
    this.dragging = false;
  }

  mounted(){
    this.current = this.$props.now
    document.addEventListener("mousemove", this.doDrag)
    window.addEventListener('mouseup', this.stopDrag);
  }

}