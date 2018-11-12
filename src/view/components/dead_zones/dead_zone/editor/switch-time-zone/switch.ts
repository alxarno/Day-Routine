import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './switch.html'
require('./switch.scss') 

@WithRender
@Component({
  props:{
    timeZone: String,
    changeZone: Function
  }
})
export default class SwitchComponent extends Vue {

  click(){
    this.$props.changeZone()
  }
 
}