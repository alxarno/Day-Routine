import Vue from 'vue'
import Component from 'vue-class-component'
import {State, Action} from 'vuex-class';


import HeaderComponent from "./header";
import NowComponent from "./now/now";
import RoutinesComponent from "./routines";
import DeadZonesComponent from "./dead_zones/dead_zones"
import ModalsComponent from './modals'
import DrawerComponent from './drawer'

import * as WithRender from './main.html';

const namespace:string = 'app'

@WithRender 
@Component({
  components:{
    HeaderComponent,
    NowComponent,
    RoutinesComponent,
    DrawerComponent,
    DeadZonesComponent
  }
})
export default class MainComponent extends Vue {
  @State('menu_active_item', {namespace}) menuActiveItem: any;
  @State('popup_open', {namespace}) popup_open: any;
  @Action("closePopUp", {namespace}) private closePopUp: any;
  private clickEnable = false;

  style = {
    filter: "blur(5px)"
  }

  // @Action('newRoutineWindow', { namespace }) newRoutineWindow: any;
  // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;



}