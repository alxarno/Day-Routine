import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './modals.html';
import CloseButton from './elements/close/close'
import SettingsComponent from './settings/settings'
import NewRoutineComponent from './new_routine/new_routine'
import RoutineSettingsComponent from './routine_settings/routine_settings'


require("./modals.scss")
@WithRender
@Component({
  components:{
    SettingsComponent,
    NewRoutineComponent,
    RoutineSettingsComponent,
    CloseButton
  }
})
export default class  extends Vue {

    close(){
      this.$store.dispatch("closePopUp")
    }
}