import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './close.html'
const icon = require("assets/close.svg")
require('./close.scss')

 
@WithRender
@Component({
})
export default class CloseButton extends Vue {

  icon:string=icon
  
  click(){
    this.$store.dispatch("closePopUps")
  }
}