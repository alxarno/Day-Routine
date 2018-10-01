import Vue from 'vue'
import Component from 'vue-class-component'

import TaskComponent from './task/task'

import * as WithRender from './now.html';

import {
  GetTimes,
  GetScrollTop,
  GetCurrentTime,
  GetCurrentTimeMarginTop,
  GetNowTasks
} from './now-methods'

import {NowTask} from 'src/models/now.tasks'

require('./now.scss')






@WithRender
@Component({
  components: { TaskComponent}
})
export default class NowComponent extends Vue {

  time: string[] = GetTimes()
  currentTime: string = GetCurrentTime()
  currentTimeMarginTop: number = GetCurrentTimeMarginTop()
  tasks: Array<NowTask|null> = GetNowTasks()

  mounted (){
    var elem: any= this.$refs.now__body
    elem.scrollTop = GetScrollTop()
  }

}