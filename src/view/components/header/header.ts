import Vue from 'vue'
import Component from 'vue-class-component'
import SettingsComponent from './settings-icon/settings-icon'

import {Action, State} from 'vuex-class'
import * as WithRender from './header.html';
import menu from 'src/view/components/cons'

require("./header.scss")

const namespace:string = "app"
@WithRender
@Component({
  components: { SettingsComponent}
})
export default class Header extends Vue {
  @Action('setMenuItem', { namespace }) setMenuItem: any;
  @State('menu_active_item', {namespace}) menuActiveItem: any;

  menu:any =  menu

  change (number:number): void {
    this.setMenuItem(number)
  }
}