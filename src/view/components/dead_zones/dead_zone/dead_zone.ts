import Vue from 'vue'
import Component from 'vue-class-component'
import {State} from 'vuex-class'
import * as WithRender from './dead_zone.html'
import CheckBox from 'src/view/default-components/checkbox/checkbox'
import EditorComponent from './editor/editor'
import {TimeFormat} from './dead_zone.methods'
import {DeadZone} from 'src/models/dead_zone'

require('./dead_zone.scss') 

@WithRender
@Component({
  components:{
    CheckBox,
    EditorComponent
  },  
  props:{
    zone: {
      type: Object as () => DeadZone
    },
    active:Boolean,
    changeActive:Function,
    currentIndex:Number
  }
})
export default class DeadZoneComponent extends Vue {
  

  get time(){
    return TimeFormat(this.$props.zone.start, this.$props.zone.done)
  }

  isDiactivate(index:number){
    if(this.$props.zone.disabled_days.indexOf(index) != -1) return false;
    return true
  }

  click(){
    this.$props.changeActive(this.$props.currentIndex)
  }
  // computed(){
  //   return{
  //     formated () {
  //       let res = 
  //     }
  //  }
  // }
}