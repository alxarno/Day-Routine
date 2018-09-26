import Vue from "vue";
import { mapGetters } from 'vuex'
import menu from 'src/components/cons'

import SettingsComponent from './settings/settings'
require("./header.scss")
const logo = require("assets/logo.svg")



export default Vue.extend({
  template: `
      <div class="header">
          <div v-html="logo" class="app-logo"></div>

          <div class="header-separator"></div>

          <div class="header-menu-wrapper">

            <div class="header-menu-items">

            <div v-for="item in menu"
                 v-on:click="change(item.number)"
                 v-bind:class="[menu_active_item == item.number ?
                    'header-menu-item-active':'header-menu-item']">
                {{item.name}}
              </div>
            </div>

            <div class="header-menu-slider"
                v-bind:style="{ left: menu_active_item*70 + 10*menu_active_item  + 'px' }"
            ></div>

          </div>
          <SettingsComponent></SettingsComponent>

      </div>
  `,
  data() {
    return{
      logo: logo,
      menu: menu
    }
  },
  methods: {
    change:function(number:number){
      this.$store.dispatch('setMenuItem', {number})
    }
  },
  computed:{
    ...mapGetters({
      menu_active_item: 'getMenuActiveItem'
    })
  },
  components:{
    SettingsComponent
  }
});
