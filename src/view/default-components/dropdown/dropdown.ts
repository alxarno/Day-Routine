import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './dropdown.html'
require("./dropdown.scss")
 
@WithRender
@Component({
  props:{
    items:{
      type:Object as ()=>Array<string>
    }
  }
})
export default class DropdownComponent extends Vue {
  
 
}