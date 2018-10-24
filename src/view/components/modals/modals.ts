import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './modals.html';
import CloseButton from './elements/close/close'
import SettingsComponent from './settings/settings'
import RoutineComponent from './routine/routine'
import RoutineSettingsComponent from './routine_settings/routine_settings'
import { State,Action } from 'vuex-class';

require("./modals.scss")

const routineNamespace:string = "routines"
const appNamespace:string = "app"

@WithRender
@Component({
  components:{
    SettingsComponent,
    RoutineComponent,
    RoutineSettingsComponent,
    CloseButton
  }
})
export default class  extends Vue {
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