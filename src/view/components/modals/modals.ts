import Vue from 'vue'
import Component from 'vue-class-component'
import RoutineSettings from './routine_settings/routine_settings'
import NewRoutine from './new_routine/new_routine'
import * as WithRender from './modals.html';
import CloseButton from './elements/close/close'


require("./modals.scss")
@WithRender
@Component({
  components:{
    RoutineSettings,
    NewRoutine,
    CloseButton
  }
})
export default class  extends Vue {

  getShow():boolean{
    return this.$store.state.routine_settings_open ||
    this.$store.state.new_routine_open
  }
}