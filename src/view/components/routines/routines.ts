import Vue from 'vue'
import Component from 'vue-class-component'
import {Action, State} from 'vuex-class'
import RoutineComponent from './routine/routine'

import {Routine} from 'src/models/routines.routine'

import * as WithRender from './routines.html';

import NewButton from 'src/view/default-components/new_button/new_button'

require("./routines.scss")

const searchIcon = require("assets/search.svg")
const addIcon = require("assets/add.svg")

const namespace:string = 'routines'
@WithRender 
@Component({
  components:{
    RoutineComponent,
    NewButton
  }
})
export default class RoutinesComponent extends Vue {
  @State(state => state.routines.items) routines:Array<Routine | null>

  @Action('newRoutineWindow', { namespace }) newRoutineWindow: any;
  @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;
  @Action('loadRoutines', { namespace }) loadRoutines: any;

  searchRequest:string = "" 

  searchIcon:string = searchIcon
  addIcon:string = addIcon

  mounted():void{
    this.loadRoutines()
  }

  newRoutine (): void {
    this.newRoutineWindow()
  }
  
  closeSettings():void{
    this.routineSettingsWindow()
  }

}