import Vue from 'vue'
import Component from 'vue-class-component'

import RoutineComponent from './routine/routine'

import {Routine} from 'src/models/routines.routine'
import {GetRoutines} from './routines.methods'

import * as WithRender from './routines.html';

import NewButton from 'src/view/default-components/new_button/new_button'


require("./routines.scss")
const searchIcon = require("assets/search.svg")
const addIcon = require("assets/add.svg")

@WithRender 
@Component({
  components:{
    RoutineComponent,
    NewButton
  }
})
export default class RoutinesComponent extends Vue {
  searchIcon:string = searchIcon
  addIcon:string = addIcon

  routines:Array<Routine> = GetRoutines()

  newRoutine (): void {
    this.$store.dispatch("openPopUp")
    this.$store.dispatch('newRoutineWindow')
  }
  
  
  closeSettings():void{
    this.$store.dispatch("openPopUp")
    this.$store.dispatch('routineSettingsWindow')
  }

}