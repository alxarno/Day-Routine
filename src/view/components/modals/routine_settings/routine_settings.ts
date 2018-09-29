import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './routine_settings.html';
import { mapGetters } from 'vuex'

@WithRender
@Component({
  components:{
  }
})
export default class RoutineSettingsComponent extends Vue {

  message: string = 'Hello!'

  onClick (): void {
    window.alert(this.message)
  }
}