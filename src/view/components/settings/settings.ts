import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './settings.html'
 
@WithRender
@Component({
})
export default class  extends Vue {

  message: string = 'Hello!'

  onClick (): void {
    window.alert(this.message)
  }
}