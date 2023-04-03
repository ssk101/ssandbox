import {
  Attribute,
  Define,
  Template,
  Styles,
} from '@steelskysoftware/facade-client'
import { wait } from '@steelskysoftware/facade-toolbox'
import { IDB } from '@steelskysoftware/facade-client/src/lib/idb.js'
import template from './wireshark.pug'
import componentCSS from './wireshark.styl'
import '@steelskysoftware/facade-client/src/components/button/button.js'
import '@steelskysoftware/facade-client/src/components/select/select.js'

@Define('ss')
@Template(template)
@Styles([componentCSS])
export default class Wireshark extends HTMLElement {
  created() {
    this.filter = {}
    this.filters = []
    this.generatedFilter = ''
  }

  async connected() {
    await this.initIDB()
    this.filters = (await this.getFilters()) || []

    if(this.filters.length) {
      const name = this.filters[0]
      this.filter = {
        name,
        data: await this.getFilter(name),
      }
    }

    this.generateFilter()
  }

  async initIDB() {
    this.idb = await new IDB('wireshark', 3)
    await this.idb.getOrCreateStore('filters')
  }

  async selectFilter(name) {
    this.filter = await this.getFilter(name)
    this.generateFilter()
  }

  async getFilters() {
    return this.idb.getAllKeys('filters')
  }

  async getFilter(name) {
    return this.idb.get('filters', name)
  }

  async updateFilter() {
    this.generateFilter()
    return this.idb.set('filters', this.filter.name, this.filter.data)
  }

  generateFilter() {
    const header = '!((string(eth.dst) && string(ip.dst) && string(ip.src) && string(ipv6.dst) && string(ipv6.src)) matches'
    const ipv4Header = '!(string(ip.addr) matches'
    const ipv6Header = '!(string(ipv6.addr) matches'
    const ipv4 = new Set()
    const ipv6 = new Set()

    for(const line of this.filter.data.split('\n')) {
      const replaced = line.replace(/(\.|:)/g, '\\\\$1').trim()

      if(!replaced) continue

      if(replaced.includes(':')) {
        ipv6.add(replaced)
      } else {
        ipv4.add(replaced)
      }
    }

    this.generatedFilter = [
      ipv6.size && `${ipv6Header} "${Array.from(ipv6).join('|')}")`,
      ipv4.size && `${ipv4Header} "${Array.from(ipv4).join('|')}")`,
    ]
      .filter(i => i)
      .join(' && ')

    this.render()
  }

  copyToClip() {
    navigator.clipboard.writeText(this.generatedFilter)
  }
}