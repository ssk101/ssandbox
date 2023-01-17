import { FacadeComponent, Define, Template, Styles } from '@steelskysoftware/facade-client'
import { wait, chunk, randomChars, randomInt } from '@steelskysoftware/facade-toolbox'
import { ce } from '../../utils.js'
import '../virtual-scroll/virtual-scroll.js'
import template from './list-test.pug'
import css from './list-test.styl'

const LIMIT = 20

@Define('ss')
@Template(template)
@Styles(css)
export default class ListTest extends FacadeComponent {
  created() {
    this.page = 0
    this.rows = []
    this.allRows = [...Array(1000).keys()]
    this.chunks = chunk(this.allRows, LIMIT)
  }

  connected() {
    this.content = this.shadowRoot.querySelector("#content")
    this.table = this.shadowRoot.querySelector("#list")
    this.debug = this.shadowRoot.querySelector("#debug")

    this.makeChunks()
  }

  async makeChunks() {
    const startChunk = this.page ? this.page - 1 : this.page
    this.rows = this.chunks.slice(startChunk, startChunk + 2).flat()
    await this.render()
    this.tableRows = this.shadowRoot.querySelectorAll('#list tr')

    for(const row of Array.from(this.tableRows)) {
      // let observableNextRow

      // if(rowIndex === (this.page * CHUNK_LEN) + (CHUNK_LEN - 1)) {
      //   observableNextRow = rowIndex
      //   row.setAttribute('data-observable-row', true)
      // }

      // if(observableNextRow) {
      //   // console.log(observableNextRow)
      //   const observer = new IntersectionObserver(
      //     (entries) => {
      //       if(entries[0].intersectionRatio === 1) {
      //         row.setAttribute('data-visible', true)
      //         this.page = (rowIndex + 1) / CHUNK_LEN
      //         console.log('page', this.page)
      //         this.makeChunks()
      //       } else {
      //         row.removeAttribute('data-visible')
      //       }

      //       this.render()
      //     },
      //     { threshold: 1.0, rootMargin: "0px", root: this.content }
      //   )

      //   observer.observe(row)
      // }
    }
  }

  toggleSelected(rowIndex) {
    this.table.querySelector(`[data-row-index=${rowIndex}]`)
      .classList.toggle('selected')
  }

  get randomChars() {
    return randomChars
  }

  get randomInt() {
    return randomInt
  }

  get limit() {
    return LIMIT
  }
}