import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './data.html'
require('./data.scss')

@WithRender 
@Component({})
export default class DataComponent extends Vue {

  
}