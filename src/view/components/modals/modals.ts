import Vue from 'vue'
import Component from 'vue-class-component'
import RoutineSettings from './routine_settings/routine_settings'
import NewRoutine from './new_routine/new_routine'
import * as WithRender from './modals.html';
import CloseButton from './elements/close/close'
import SettingsComponent from './settings/settings'


require("./modals.scss")
@WithRender
@Component({
  components:{
    RoutineSettings,
    NewRoutine,
    CloseButton,
    SettingsComponent
  }
})
export default class  extends Vue {

  
}