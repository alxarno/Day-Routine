import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './week.html'
require('./week.scss')
 
@WithRender
@Component({
  props:{
    disabled_days: Array
  }
})
export default class WeekComponent extends Vue {
  days:Array<string> = ["M", "T", "W", "T","F", "S","S"]
  // diactivate:Array<number> = [0,3]
  
  private isDiactivate(index:number){
    if(this.$props.disabled_days.indexOf(index) != -1) return false;
    return true
  }

  getClass(index: number):string{
    let result = 'dead_zone_editor_week_day'
    if(!this.isDiactivate(index)){
      result+=" diactivate"
    }
    return result
  }

  click(index:number){
    if(!this.isDiactivate(index)){
      this.$props.disabled_days.splice(this.$props.disabled_days.indexOf(index), 1)
    }else{
      this.$props.disabled_days.push(index)
    }
  }


}