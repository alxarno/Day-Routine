import Vue from 'vue'
import Component from 'vue-class-component'

import {colors, Color} from 'src/view/color.themes'

import {Routine} from 'src/models/routines.routine'

import * as WithRender from './routine.html';
const icon = require("assets/controls.svg")
require('./routine.scss')

@WithRender
@Component({
  props:{
    routine:{
      type: Object as () => Routine
    }
  }
})
export default class RoutineComponent extends Vue {
  
  curentColor: Color = colors.default
  settingsIcon: string = icon

  created():void{
    if(colors.hasOwnProperty(this.$props.routine.colorScheme))
      this.curentColor = colors[this.$props.routine.colorScheme]
  }

  settings():void{
    this.$store.dispatch("openPopUp")
    this.$store.dispatch("currentRoutineChange", {number: this.$props.routine.id})
    this.$store.dispatch('routineSettingsWindow')
  }
}