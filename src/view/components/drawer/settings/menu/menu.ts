import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './menu.html'
import { mapGetters } from 'vuex'
require('./menu.scss')

@WithRender
@Component({})
export default class Menu extends Vue {
  names:Array<string> = ["Data"]

  computed:any = {
    ...mapGetters({
      activeItem: 'menu_active_item'
    })
  }

  get menuActiveItem() :number{
    return this.$store.state.settings.menu_active_item
  }

  click(index:number):void{
    console.log(index)
    this.$store.dispatch('setSettingsMenuItem', {number:index})
  }
}