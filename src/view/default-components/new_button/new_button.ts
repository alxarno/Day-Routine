import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './new_button.html'
require('./new_button.scss')
const addIcon = require("assets/add.svg")

@WithRender
@Component({
  props:{
    click:Function
  }
})
export default class ButtonComponent extends Vue {
  addIcon:string = addIcon
  

  onclick():void{
    this.$props.click()
  }
}