import Vue from 'vue'
import Component from 'vue-class-component'
import {State} from 'vuex-class'
import * as WithRender from './dead_zones.html'
import DeadZoneComponent from './dead_zone/dead_zone'
import NewButton from 'src/view/default-components/new_button/new_button'
require('./dead_zones.scss')

const searchIcon = require("assets/search.svg")

@WithRender
@Component({
  components:{
    DeadZoneComponent,
    NewButton
  }
})
export default class DeadZones extends Vue {
  @State(state => state.dead_zones.items) deadZonesItems:any
  @State(state => state.dead_zones.currentItem) currentItem:any
  searchIcon:string = searchIcon

  mounted(){
    console.log(this.$store.state.dead_zones.items)
  }

  change(index:number){
    if(index == this.currentItem){
      this.$store.dispatch('SetCurrentItem', {number:-1})
    }else{
      this.$store.dispatch('SetCurrentItem', {number:index})
    }
  }

  newDeadZone():void{
    
  }
}