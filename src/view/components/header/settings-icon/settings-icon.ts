import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './settings-icon.html';

require("./settings-icon.scss")
const icon = require("assets/settings.svg")


@WithRender
@Component({})
export default class SettingsIcon extends Vue {

  icon: string = icon

  change (): void {
    this.$store.dispatch('settingsOpenChange')
  }
}