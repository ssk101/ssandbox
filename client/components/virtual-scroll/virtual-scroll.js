import { FacadeComponent, Attribute, Define, Template, Styles } from '@steelskysoftware/facade-client'
import { create, h } from 'virtual-dom'
import css from './virtual-scroll.styl'

class VirtualScrollWidget {
  type = 'Widget';

  constructor(list) {
    this.list = list
  }

  init() {
    console.log(1, this.list.assignedElements()?.[0]?.children)
    return this.list
  }

  update(prev, node) {
    console.log(2, { prev, node }, this.list.assignedElements(), this.list.assignedNodes())
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
export default class VirtualScroll extends FacadeComponent {
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