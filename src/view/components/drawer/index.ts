import Vue from 'vue'
import Component from 'vue-class-component'

import {Action, State} from 'vuex-class'
import * as WithRender from './drawer.html';

require("./drawer.scss")


const routineNamespace:string = "routines"
const appNamespace:string = "app"

@WithRender
@Component({
  components: { }
})
export default class Drawer extends Vue {
  @State("routine_settings_open", {namespace:routineNamespace}) routineSettingsOpen:any
  @State("current_routine", {namespace:routineNamespace}) currentRoutine:any
  @State("new_routine_open", {namespace:routineNamespace}) newRoutineOpen:any

  @Action("closePopUp", {namespace:appNamespace}) closePopUp:any

  @State("settings_open", {namespace:appNamespace}) settingsOpen:any
  @State("popup_open", {namespace:appNamespace}) popupOpen:any
   

  close(){
    this.closePopUp()
  }

}