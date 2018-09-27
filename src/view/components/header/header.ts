import Vue from 'vue'
import Component from 'vue-class-component'
import SettingsComponent from './settings-icon/settings-icon'
import { mapGetters } from 'vuex'

import * as WithRender from './header.html';
import menu from 'src/view/components/cons'
const logo = require("assets/logo.svg")

require("./header.scss")

@WithRender
@Component({
  components: { SettingsComponent}
})
export default class Header extends Vue {

  logo: string = logo
  menu:any =  menu


  get menuActiveItem() :number{
    return this.$store.state.menu_active_item
  }
  
  computed:any = {
    ...mapGetters({
      menu_active_item: 'getMenuActiveItem'
    })
  }

  change (number:number): void {
    this.$store.dispatch('setMenuItem', {number})
  }
}