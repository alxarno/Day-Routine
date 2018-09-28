import Vue from 'vue'
import Component from 'vue-class-component'

import {NowTask} from 'src/models/now.tasks'

import {colors, Color} from 'src/view/color.themes'

import * as WithRender from './task.html';
require('./task.scss')
 
interface wrapperStyleInterface{
  borderLeft:string;
  height: string;
  background: string;
  "--box-shadow-color": string;
}

@WithRender
@Component({
  props: {
    task: Object
  }
})
export default class Task extends Vue {

  activeTask: number = 9
  curentColor: Color = colors.default
  describe: string = ""
  taskStart: string = "00:00"
  taskDone: string = "00:00"
  wrapperStyle:wrapperStyleInterface =  {
    borderLeft: '3px solid ',
    height: '94px',
    background: "#ffffff",
    "--box-shadow-color": "#ffffff"
  }
  currentActiveTask:boolean = false

  

  
  created() {
    if(this.$props.task){ 
      // Change color scheme and style
      let d = new Date();
      let n = d.getHours();
      if((this.$props.task.start<=n) && (this.$props.task.start+this.$props.task.hours>n)){
        this.currentActiveTask = true
      }

      if(colors.hasOwnProperty(this.$props.task.color)){
        this.curentColor = colors[this.$props.task.color]
       
        if(this.currentActiveTask){
          this.wrapperStyle.borderLeft = "none"
          this.wrapperStyle.background = this.curentColor.active_color
          this.wrapperStyle["--box-shadow-color"] = this.curentColor.average_color
        }else{
          this.wrapperStyle.background = this.curentColor.passiv_color
          this.wrapperStyle.borderLeft += this.curentColor.active_color
        }
        this.wrapperStyle.height = String(
            this.$props.task.hours*94+
            this.$props.task.hours * (this.$props.task.hours>1?7:0)
          )+"px"
      }
      // Short describe
      let lettersPerHour = 60
      if(this.$props.task.describe.length>=
        this.$props.task.hours*lettersPerHour){
          this.describe = this.$props.task.describe.substring(0,
            lettersPerHour*this.$props.task.hours) +'...'
      }else{
        this.describe = this.$props.task.describe
      }
      // Calculate start and done time
      this.taskStart = String(this.$props.task.start)+":00"
      this.taskDone = String(this.$props.task.start+this.$props.task.hours)+":00"

      if(this.$props.task.start<10) this.taskStart="0"+this.taskStart
      if(this.$props.task.start+this.$props.task.hours<10) this.taskDone="0"+this.taskDone

      // Current Active Task?
     

    }

   
    console.log(this.$props.task)
  }

  mounted (){
    // console.log(this.$props.task)
  }
}