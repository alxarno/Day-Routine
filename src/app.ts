import Vue from "vue";
import Vuex from 'vuex'
import store from './store/index'
import HeaderComponent from "./components/header/header";



let UI = new Vue({
    el: "#app",
    template: `
    <div>
      <header-component />
    </div>`,
    store,
    data: {
        name: "World"
    },
    components: {
      HeaderComponent
  }
});