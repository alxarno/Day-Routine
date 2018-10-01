import Vue from 'vue'
import Component from 'vue-class-component'
import {State} from 'vuex-class'
import * as WuthRender from './dead_zones.html'
import DeadZoneComponent from './dead_zone/dead_zone'

const icon = require("assets/add.svg")
require('./dead_zones.scss')

@WuthRender
@Component({
  components:{
    DeadZoneComponent
  }
})
export default class DeadZones extends Vue {
  @State(state => state.settings.deadZones.items) deadZonesItems:any
  icon:string = icon

  mounted(){
    console.log(this.$store.state.settings.deadZones.items)
  }
  
}