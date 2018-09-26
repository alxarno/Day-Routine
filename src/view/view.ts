import Vue from "vue";
import { mapGetters } from 'vuex'
import store from './store/index'
import HeaderComponent from "./components/header/header";
import NowComponent from "./components/now/now";
import RoutinesComponent from "./components/routines/routines";

var CreateView = function(){
  return new Vue({
    el: "#app",
    template: `
    <div>
      <HeaderComponent />
      <NowComponent v-if="menu_active_item == 0"/>
      <RoutinesComponent v-if="menu_active_item == 1"/>
    </div>`,
    store,
    components: {
      HeaderComponent,
      NowComponent,
      RoutinesComponent
    },
    computed:{
      ...mapGetters({
        menu_active_item: 'getMenuActiveItem'
      })
    }
});
}

export default CreateView




