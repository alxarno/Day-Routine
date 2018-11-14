import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './data.html'
import {Action} from 'vuex-class'
require('./data.scss')

const namespace:string = "settings"

const rotuineNamespace:string = "routines"
const deadZoneNamespace:string = "deadZones"
const scheduleNamespace: string = 'schedule';

@WithRender 
@Component({})
export default class DataComponent extends Vue {
  @Action('exportData', { namespace }) exportData: any;
  @Action('importData', { namespace }) importData: any;
  @Action('clearAll', {namespace}) clearData:any;

  // Need update all data, for fast update
  @Action('loadDeadZones', { namespace:deadZoneNamespace }) loadDeadZones: any;
  @Action('loadRoutines', { namespace:rotuineNamespace }) loadRoutines: any;
  @Action('loadSchedule', { namespace:scheduleNamespace }) loadSchedule: any;
  

  exportClick(){
    this.exportData()
  }

  importClick(){
    this.importData()
  }

  beforeDestroy(){
    this.loadDeadZones()
    this.loadRoutines()
    this.loadSchedule()
  }

  deleteClick(){
    this.clearData()
  }
  
}