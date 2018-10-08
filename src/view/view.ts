import Vue from "vue";
import { mapGetters } from 'vuex'
import store from './store/index'
import HeaderComponent from "./components/header/header";
import NowComponent from "./components/now/now";
import RoutinesComponent from "./components/routines/routines";
import DeadZonesComponent from "./components/dead_zones/dead_zones"
import ModalsComponent from './components/modals/modals'

import Vuebar from 'vuebar';

Vue.use(Vuebar);


var CreateView = function(){
  return new Vue({
    el: "#app",
    template: `
    <div>
      <div v-bind:style="blurShow()?style : {}">
        <HeaderComponent/>
        <NowComponent v-if="this.$store.state.app.menu_active_item == 0"/>
        <RoutinesComponent v-if="this.$store.state.app.menu_active_item == 1"/>
        <DeadZonesComponent v-if="this.$store.state.app.menu_active_item == 2"/>
      </div>
      <ModalsComponent/>
    </div>`,
    store,
    components: {
      HeaderComponent,
      NowComponent,
      RoutinesComponent,
      ModalsComponent,
      DeadZonesComponent
    },
    data:{
      style:{
        filter: "blur(5px)"
      }
    },
  
    methods:{
      blurShow:function():boolean{
        return this.$store.state.app.popup_open
      },
    },
});
}

export default CreateView




