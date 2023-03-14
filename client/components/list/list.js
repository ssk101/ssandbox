import { Attribute, Define, Template, Styles } from '@steelskysoftware/facade-client'
import { wait } from '@steelskysoftware/facade-toolbox'
import { routes } from '../../index.js'
import template from './list.pug'
import css from './list.styl'
import '@steelskysoftware/facade-client/src/components/button/button.js'

@Define('ss')
@Template(template)
@Styles(css)
@Attribute('test', String)
export default class List extends HTMLElement {
  created() {
    this.routes = routes
  }

  connected() {

  }
}