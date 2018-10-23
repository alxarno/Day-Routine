import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './data.html'
import {Action} from 'vuex-class'
require('./data.scss')

const namespace:string = "settings"
@WithRender 
@Component({})
export default class DataComponent extends Vue {
  @Action('exportData', { namespace }) exportData: any;

  exportClick(){
    this.exportData()
  }
  
}