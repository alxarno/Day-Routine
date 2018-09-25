// src/index.ts

import Vue from "vue";
import HeaderComponent from "./components/header/header";

let UI = new Vue({
    el: "#app",
    template: `
    <div>
      <header-component />
    </div>`,
    data: {
        name: "World"
    },
    components: {
      HeaderComponent
  }
});