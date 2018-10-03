import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './circle.html'
import {Times} from '../interfaces'
import {TimeHalf} from '../interfaces'
require('./circle.scss')




@WithRender
@Component({
  props:{
    time:String,
  }
})
export default class Circle extends Vue {
  rotate:number = 0

}