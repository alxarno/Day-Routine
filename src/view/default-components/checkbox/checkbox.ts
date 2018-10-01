import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './checkbox.html'
require('./checkbox.scss')
 
@WithRender
@Component({})
export default class CheckBox extends Vue {

  // message: string = 'Hello!'
  checked: boolean = false

  onClick (): void {
    // window.alert(this.message)
    this.checked = !this.checked
  }
}