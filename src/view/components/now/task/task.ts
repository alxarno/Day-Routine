import Vue from 'vue'
import Component from 'vue-class-component'

import {NowTask} from 'src/models/now.tasks'

import * as WithRender from './task.html';
require('./task.scss')
 
@WithRender
@Component({
  props: {
    task: Object
  }
})
export default class Task extends Vue {

  activeTask: number = 9
  mounted (){
    console.log(this.$props.task)
  }
}