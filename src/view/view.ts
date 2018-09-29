import Vue from "vue";
import { mapGetters } from 'vuex'
import store from './store/index'
import HeaderComponent from "./components/header/header";
import NowComponent from "./components/now/now";
import RoutinesComponent from "./components/routines/routines";
import ModalsComponent from './components/modals/modals'


var CreateView = function(){
  return new Vue({
    el: "#app",
    template: `
    <div>
      <div v-bind:style="blurShow()?style : {}">
        <HeaderComponent/>
        <NowComponent v-if="menu_active_item == 0"/>
        <RoutinesComponent v-if="menu_active_item == 1"/>
      </div>
      <ModalsComponent/>
    </div>`,
    store,
    components: {
      HeaderComponent,
      NowComponent,
      RoutinesComponent,
      ModalsComponent
    },
    data:{
      style:{
        filter: "blur(5px)"
      }
    },
  
    methods:{
      blurShow:function():boolean{
        return this.routine_settings_open || this.new_routine_open
      },
    },
    computed:{
      ...mapGetters({
        menu_active_item: 'getMenuActiveItem',
        routine_settings_open:"routineSettingsOpen",
        new_routine_open:"newRoutineOpen"
       })     
      }
});
}

export default CreateView




