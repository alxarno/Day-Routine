import Vue from "vue";
import { mapGetters } from 'vuex'
import store from './store/index'
import { ICore } from "src/interfaces/core";
import { RegisterAPI } from "./external.api";
import MainComponent from './components/main'

// import Vuebar from 'vuebar';

// Vue.use(Vuebar);


var CreateView = function(core:ICore){
  RegisterAPI(core)
  return new Vue({
    el: "#app",
    template: `
    <div>
      <MainComponent/>
    </div>`,
    store,
    components: {
      MainComponent
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




