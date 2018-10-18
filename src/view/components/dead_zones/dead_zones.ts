import Vue from 'vue'
import Component from 'vue-class-component'
import {State, Action} from 'vuex-class'
import * as WithRender from './dead_zones.html'
import DeadZoneComponent from './dead_zone/dead_zone'
import NewButton from 'src/view/default-components/new_button/new_button'
require('./dead_zones.scss')

const searchIcon = require("assets/search.svg")
const namespace:string = "deadZones"

@WithRender
@Component({
  components:{
    DeadZoneComponent,
    NewButton
  }
})
export default class DeadZones extends Vue {
  @State("items",{namespace}) deadZonesItems:any
  @State("currentItem", {namespace}) currentItem:any

  @Action('setCurrentItem', { namespace }) setCurrentItem: any;
  // @Action('setMenuItem', { namespace }) setMenuItem: any;


  searchIcon:string = searchIcon
  searchRequest:string = "" 



  change(index:number){
    if(index == this.currentItem){
      this.setCurrentItem(-1)
    }else{
      this.setCurrentItem(index)
    }
  }

  newDeadZone():void{
    
  }
}