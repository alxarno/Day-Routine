import Vue from 'vue'
import Component from 'vue-class-component'

import * as WithRender from './now.html';

import {
  GetTimes,
  GetScrollTop,
  GetCurrentTime,
  GetCurrentTimeMarginTop
} from './now-methods'

require('./now.scss')






@WithRender
@Component({})
export default class NowComponent extends Vue {

  time: string[] = GetTimes()
  currentTime: string = GetCurrentTime()
  currentTimeMarginTop: number = GetCurrentTimeMarginTop()

  mounted (){
    var elem: any= this.$refs.now__body
    elem.scrollTop = GetScrollTop()
    // document.getElementById("now-body").offsetTop = '25px'
    // this.$nextTick(function () {
    //     console.log("Hello")
    // })
  }

}