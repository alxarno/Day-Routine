import Vue from "vue";
import store from './store/index';
import { RegisterAPI } from "./external.api";
import MainComponent from './components/main';
// import Vuebar from 'vuebar';
// Vue.use(Vuebar);
var CreateView = function (core) {
    RegisterAPI(core);
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
        data: {
            style: {
                filter: "blur(5px)"
            }
        },
        methods: {
            blurShow: function () {
                return this.$store.state.app.popup_open;
            },
        },
    });
};
export default CreateView;
//# sourceMappingURL=view.js.map