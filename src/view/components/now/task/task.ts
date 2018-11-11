import Vue from 'vue'
import Component from 'vue-class-component'

import {NowTask} from 'src/models/now.tasks'

import {colors, Color} from 'src/view/color.themes'

import {CheckCurrentTask,
        ComputeWrapperStyle,
        ShortDescribe,
        StartAndDone} from './task.methods'
import {WrapperStyleInterface} from './task.interfaces'

import * as WithRender from './task.html';
require('./task.scss')
 


@WithRender
@Component({
  props: {
    task: {
      type: Object as () => NowTask
    }
  }
})
export default class Task extends Vue {

  activeTask: number = 9
  curentColor: Color = colors.default
  describe: string = ""
  taskStart: string = "00:00"
  taskDone: string = "00:00"
  wrapperStyle:WrapperStyleInterface =  {
    borderLeft: '3px solid ',
    height: '94px',
    background: "#ffffff",
    "--box-shadow-color": "#ffffff"
  }
  currentActiveTask:boolean = false

  

  
  created() {
    if(this.$props.task){ 
      // Change color scheme and style
      this.currentActiveTask = CheckCurrentTask(this.$props.task.start, this.$props.task.hours)

      if(colors.hasOwnProperty(this.$props.task.color)){
        this.curentColor = colors[this.$props.task.color]
      
      }else{
        this.curentColor = colors["default"]
      }
      this.wrapperStyle = ComputeWrapperStyle(this.curentColor,this.$props.task.hours,
        this.currentActiveTask, this.wrapperStyle)

      // Short describe
      this.describe = ShortDescribe(this.$props.task.describe, this.$props.task.hours)

      // Calculate start and done time
      let times = StartAndDone(this.$props.task.start, this.$props.task.hours)
      this.taskStart = times.taskStart
      this.taskDone = times.taskDone

    }

   
  }

  mounted (){
    // console.log(this.$props.task)
  }
}