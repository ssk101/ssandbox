import { Attribute, Define, Template, Styles } from '@steelskysoftware/facade-client'
import { wait } from '@steelskysoftware/facade-toolbox'
import { routes } from '../../index.js'
import template from './index.pug'
import css from './index.styl'
import '@steelskysoftware/facade-client/src/components/button/button.js'

@Define('ss')
@Template(template)
@Styles(css)
export default class Index extends HTMLElement {
  created() {
    this.routes = routes
  }
}