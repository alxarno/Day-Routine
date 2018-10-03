import Vue from 'vue'
import Component from 'vue-class-component'
import {DeadZone} from 'src/models/dead_zone'
import {Times} from './interfaces'
import {TimeHalf} from './interfaces'

import CircleComponent from './circle/circle'

import * as WithRender from './editor.html'
require('./editor.scss')
 
@WithRender
@Component({
  components:{
    CircleComponent
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

  get startTheme():TimeHalf{
    if(this.$props.zone.start>=12){
      return TimeHalf.PM
    }else{
      return TimeHalf.AM
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