import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './settings.html'

import MenuComponent from './menu/menu'
import DeadZones from './dead_zones/dead_zones'

require('./settings.scss')
 
@WithRender
@Component({
  components:{
    MenuComponent,
    DeadZones
  }
})
export default class SettingsComponent extends Vue {

  get menuActiveItem() :number{
    return this.$store.state.settings.menu_active_item
  }

}