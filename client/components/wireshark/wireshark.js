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

    this.render()

    this.generateFilter()
  }

  async initIDB() {
    this.idb = await new IDB('wireshark', 3)
    await this.idb.getOrCreateStore('filters')
  }

  async selectFilter(name) {
    this.filter = { name, data: await this.getFilter(name) }
    this.render()
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
    const IPv4Header = '!(string(ip.addr) matches'
    const IPv6Header = '!(string(ipv6.addr) matches'
    const IPv4 = new Set()
    const IPv6 = new Set()

    if(!this.filter?.data) return

    for(const line of this.filter.data.split('\n')) {
      const matchedIPv4 = line
        .match(/(?<=(\(|^))((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))(?=(\)|$))/)
      const matchedIPv6 = line
        .match(/(?<=^|\()((?:[0-9a-fA-F]{1,4}:{1,2}){1,8}[0-9a-fA-F]{1,4}|(?=(?:[0-9a-fA-F]{0,4}:{1,2}){0,7}[0-9a-fA-F]{0,4})(?:(:{1,2})|^)(([0-9a-fA-F]{1,4}(:{1,2})){1,7}|(:{1,2})){1,7}(?:(:{1,2})|$))(?=$|\))/)

      let escaped

      if(!matchedIPv4 && !matchedIPv6) continue

      if(matchedIPv4?.length) {
        escaped = matchedIPv4[0]
          .replace(/(\.)/g, '\\\\$1')
        IPv4.add(escaped)
      } else if(matchedIPv6?.length) {
        escaped = matchedIPv6[0]
          .replace(/(:{1,2})/g, '\\\\$1')
        IPv6.add(escaped)
      }
    }

    this.generatedFilter = [
      IPv6.size && `${IPv6Header} "${Array.from(IPv6).join('|')}")`,
      IPv4.size && `${IPv4Header} "${Array.from(IPv4).join('|')}")`,
    ]
      .filter(i => i)
      .join(' && ')

    this.render()
  }

  copyToClip() {
    navigator.clipboard.writeText(this.generatedFilter)
  }
}