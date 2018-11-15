import Vue from 'vue'
import Component from 'vue-class-component'
import * as WithRender from './menu.html'
import {Action, State} from 'vuex-class'
require('./menu.scss')

const namespace: string = "settings";
@WithRender
@Component({})
export default class Menu extends Vue {
  @State('menu_active_item', {namespace}) private menuActiveItem: any;
  @Action('setSettingsMenuItem', { namespace }) private setSettingsMenuItem: any;
  private names: string[] = ["Data"];
  private sliderPropers: any = {
    left: "0px",
    width: "0px",
  };

  private sliderRender(): void {
    const currentItem: string = this.names[this.menuActiveItem] + this.menuActiveItem;
    const currentRef: HTMLElement = ((this.$refs[currentItem] as Vue[])[0] as HTMLElement);
    this.sliderPropers = {
      left: currentRef.offsetLeft + "px",
      width: currentRef.offsetWidth + "px",
    };
  }

  private mounted(): void {
    this.sliderRender();
  }

  private click(index: number): void {
    // this.$store.dispatch('setSettingsMenuItem', {number:index})
    this.setSettingsMenuItem(index);
    this.sliderRender();
  }
}