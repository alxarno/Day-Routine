import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './settings-icon.html';
import {Action, State} from 'vuex-class'

require("./settings-icon.scss")
const icon = require("assets/settings.svg")


const namespace:string = "app"

@WithRender
@Component({})
export default class SettingsIcon extends Vue {
  @Action('settingsOpenChange', { namespace }) settingsOpen: any;

  icon: string = icon

  change (): void {
    this.settingsOpen();
    // this.$store.dispatch("openPopUp")
    // this.$store.dispatch('settingsOpenChange')
  }
}