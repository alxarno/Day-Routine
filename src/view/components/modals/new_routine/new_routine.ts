import Vue from 'vue'
import Component from 'vue-class-component'

import SliderComponent from './slider/slider'
import * as WithRender from './new_routine.html';
require('./new_routine.scss')


@WithRender
@Component({
  components:{
    SliderComponent
  }
})
export default class NewRoutineComponent extends Vue {

  name:string = ""
  description:string = ""
  hours:number = 0;

  
}