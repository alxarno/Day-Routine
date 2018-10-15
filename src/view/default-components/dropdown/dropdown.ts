import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './dropdown.html'
require("./dropdown.scss")
 
@WithRender
@Component({
  props:{
    items:Array,
    currentItem:Number,
    callback:Function
  }
})
export default class DropdownComponent extends Vue {
  current:any = this.currentItem;

  click(i:number){
    this.current = i;
    this.$props.callback(this.$props.items[i])
  }
}