import Vue from 'vue'
import Component from 'vue-class-component'
import SettingsComponent from './settings-icon/settings-icon'
import {Action, State} from 'vuex-class'

import * as WithRender from './header.html';
import menu from 'src/view/components/cons'
const logo = require("assets/logo.svg")

require("./header.scss")

const namespace:string = "app"
@WithRender
@Component({
  components: { SettingsComponent}
})
export default class Header extends Vue {
  @Action('setMenuItem', { namespace }) setMenuItem: any;
  @State('menu_active_item', {namespace}) menuActiveItem: any;

  logo: string = logo
  menu:any =  menu


  // get menuActiveItem() :number{
  //   return this.$store.state.app.menu_active_item
  // }
  
  // computed:any = {
  //   ...mapGetters({
  //     menu_active_item: 'getMenuActiveItem'
  //   })
  // }

  change (number:number): void {
    this.setMenuItem(number)
    // this.$store.dispatch('setMenuItem', {number})
  }
}