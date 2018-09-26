import Vue from "vue";
const icon = require("assets/settings.svg")
require("./settings-icon.scss")

export default Vue.extend({
  template:`
    <div v-html="icon" class="settings-icon">
    </div>
  `,
  data() {
    return{
      icon: icon
    }
  },
})