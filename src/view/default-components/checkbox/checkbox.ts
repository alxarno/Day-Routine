import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './checkbox.html'
require('./checkbox.scss')
 
@WithRender
@Component({
  props:{
    callback:Function,
    state:Boolean
  }
})
export default class CheckBox extends Vue {

  // message: string = 'Hello!'
  checked: boolean = (this as any).state

  onClick (): void {
    // window.alert(this.message)
    this.checked = !this.checked
    this.$props.callback(this.checked)
  }
}