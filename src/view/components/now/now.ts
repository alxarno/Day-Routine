import Vue from 'vue'
import Component from 'vue-class-component'

import * as WithRender from './now.html';

require('./now.scss')


@WithRender
@Component({})
export default class NowComponent extends Vue {

  message: string = 'Hello!'

  onClick (): void {
    window.alert(this.message)
  }
}