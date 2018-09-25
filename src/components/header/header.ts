import Vue from "vue";
import { mapState } from 'vuex'
require("./header.scss")
const logo = require("assets/logo.svg")


export default Vue.extend({
  template: `
      <div class="header">
          <div v-html="logo" class="app-logo"></div>
          <div class="header-separator"></div>
          <div class="header-menu-wrapper">
            <div class="header-menu-items">
              <div v-bind:class="[menu_active_item == 0 ?
                                 'header-menu-item-active':'header-menu-item']">
                Now
              </div>
              <div v-bind:class="[menu_active_item == 1 ?
                      'header-menu-item-active':'header-menu-item']">
                Routines
              </div>
            </div>
            <div class="header-menu-slider"></div>
          </div>
      </div>
  `,
  data() {
    return{
      logo: logo
    }
  },
  computed: mapState([
    'menu_active_item'
  ])
});