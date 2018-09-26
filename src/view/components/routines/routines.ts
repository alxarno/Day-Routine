import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './routines.html';


@WithRender 
@Component({
})
export default class RoutinesComponent extends Vue {

  message: string = 'Hello!'

  onClick (): void {
    window.alert(this.message)
  }
}