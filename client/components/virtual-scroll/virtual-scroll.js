import { Attribute, Define, Template, Styles } from '@steelskysoftware/facade-client'
import { create, h } from 'virtual-dom'
import css from './virtual-scroll.styl'

function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    return arr.slice(i * size, i * size + size)
  })
}


function makeChunks(items) {
  return chunk(items)
}

class VirtualScrollWidget {
  type = 'Widget';

  constructor(slotted) {
    // Cache this stuff because it runs on each render due to MO
    this.slotted = slotted
    this.container = slotted.assignedElements()?.[0]
    this.items = this.container?.querySelectorAll('[virtual-item]')
    // this.chunks = makeChunks(this.items)
    // console.log(this.slotted, this.container, this.items)

    if(!this.totalHeight) {
      this.totalHeight = Array.from(this.items || []).reduce((acc, item) => {
        acc += item.clientHeight
        return acc
      }, 0)
    }

    console.log(this.totalHeight)
  }

  init() {
    // console.log(1, this.items.assignedElements()?.[0]?.children)
    return this.slotted
  }

  update(prev, node) {
    // console.log(2, { prev, node }, this.items.assignedElements(), this.items.assignedNodes())
    return this.init()
  }

  destroy() {

  }
}

@Define('ss')
@Template(function() {
  return [new VirtualScrollWidget(this.getSlot() || create(h('slot')))]
})
@Styles(css)
export default class VirtualScroll extends HTMLElement {
  created() {
    const observer = new MutationObserver(() => {
      this.render()
    })

    observer.observe(this, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  connected() {
    this.render()
  }

  getSlot() {
    return this.shadowRoot.querySelector('slot')
  }
}