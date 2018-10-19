import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './close.html'
import { Action} from 'vuex-class';
const icon = require("assets/close.svg")
require('./close.scss')

 
const namespace:string = "app"
@WithRender
@Component({
})
export default class CloseButton extends Vue {
  @Action('closePopUp', { namespace }) closePopUp: any;
  
  icon:string=icon
  
  click(){
    this.closePopUp()
    // this.$store.dispatch("closePopUp")
  }
}