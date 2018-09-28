import Vue from 'vue'
import Component from 'vue-class-component'

import RoutineComponent from './routine/routine'

import {Routine} from 'src/models/routines.routine'
import {GetRoutines} from './routines.methods'

import * as WithRender from './routines.html';


require("./routines.scss")
const searchIcon = require("assets/search.svg")
const addIcon = require("assets/add.svg")

@WithRender 
@Component({
  components:{
    RoutineComponent
  }
})
export default class RoutinesComponent extends Vue {
  searchIcon:string = searchIcon
  addIcon:string = addIcon

  routines:Array<Routine> = GetRoutines()

  newRoutine (): void {
    this.$store.dispatch('newRoutineWindow')
  }
  
  closeSettings():void{
    this.$store.dispatch('routineSettingsWindow')
  }

}