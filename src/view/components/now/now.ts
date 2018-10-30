import Vue from 'vue'
import Component from 'vue-class-component'
import {State, Action} from 'vuex-class'
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





const namespace: string = 'schedule';
@WithRender
@Component({
  components: { TaskComponent}
})
export default class NowComponent extends Vue {

  @State(state => state.schedule.items) tasks:any
  // @Staet(dbWasChange => )
  @Action('loadSchedule', { namespace }) loadSchedule: any;


  time: string[] = GetTimes()
  currentTime: string = GetCurrentTime()
  currentTimeMarginTop: number = GetCurrentTimeMarginTop()
  // tasks: Array<NowTask|null> = GetNowTasks()

  mounted (){
    this.loadSchedule()
    var elem: any= this.$refs.now__body
    elem.scrollTop = GetScrollTop()
  }



}