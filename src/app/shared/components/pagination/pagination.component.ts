import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>()

  itemsPerPage = input(5)
  items = input(0)

  currentPage = signal(1)

  @Input({ alias: 'currentPage' })
  protected set _currentPage(newPageNumber: number) {
    this.setPage(newPageNumber)
  }

  pages = computed(() => {
    const qtdPages = Math.ceil(this.items() / this.itemsPerPage())
    console.log(qtdPages)
    return qtdPages === 0 ? 1 : qtdPages
  })

  pagesToClick = 5

  pagesAround = 1

  // get options() {
  //   let options: any[] = [this.currentPage()]

  //   let nextPage = 0
  //   for (let increaseBy = 1; increaseBy <= this.pagesAround; increaseBy++) {
  //     nextPage = this.currentPage() + increaseBy
  //     if (nextPage > this.pages()) break
  //     options.push(nextPage)
  //   }

  //   if (nextPage < this.pages()) options.push('...', this.pages())

  //   for (let decreaseBy = 1; decreaseBy <= this.pagesAround; decreaseBy++) {
  //     nextPage = this.currentPage() - decreaseBy
  //     if (nextPage < 1) break
  //     options.unshift(nextPage)
  //   }

  //   console.log(nextPage)
  //   if (this.currentPage() > (1 + this.pagesAround)) options.unshift(1, '...')

  //   return options
  // }



  // options = computed(() => {
  //   let options: any[] = []

  //   let start = -Math.floor(this.pagesToClick / 2)
  //   let goUntil = this.pagesToClick

  //   let nextPage = 0
  //   for (let i = 0; i < goUntil; i++, start++) {
  //     nextPage = this.currentPage() + start

  //     if (nextPage > this.pages()) {
  //       nextPage = options[0] - 1
  //       if (nextPage < 1) break

  //       options.unshift(nextPage)
  //       continue
  //     }

  //     if (nextPage < 1) {
  //       goUntil++
  //       continue
  //     }

  //     options.push(nextPage)
  //   }
  //   const lastElement = options[options.length - 1]
  //   console.log("lastElement", lastElement)
  //   if (lastElement < this.pages()) options.push('...', this.pages())
  //   if (options[0] > 1) options.unshift(1, '...')

  //   return options
  // })

  options = computed(() => {
    const maxOptions = 9
    let options: any[] = [1]

    if (this.currentPage() > maxOptions - Math.floor(maxOptions / 2)) options.push("...")

    const insertIn = options.length

    if (this.currentPage() + 3 < this.pages()) options.push("...", this.pages())

    let otherPages: any[] = this.currentPage() === 1 ? [] : [this.currentPage()]

    for (
      let [previousPage, nextPage, iterations] = [this.currentPage() - 1, this.currentPage() + 1, 1];
      iterations < maxOptions && (options.length + otherPages.length) < maxOptions;
      previousPage--, nextPage++, iterations++
    ) {

      if (previousPage > 1) otherPages.unshift(previousPage)
      const currentOptionsLength = (options.length + otherPages.length)

      if (nextPage < this.pages() && currentOptionsLength < maxOptions) otherPages.push(nextPage)
    }

    options.splice(insertIn, 0, ...otherPages)

    return options
  })


  // logger = effect(() => console.log(this.options()))


  increasePageNumber(increment: number) {
    this.currentPage.update(currentPage => {
      let newCurrentPage = currentPage + increment

      if (newCurrentPage < 1) newCurrentPage = 1
      if (newCurrentPage > this.pages()) newCurrentPage = this.pages()

      return newCurrentPage
    })

    this.pageChange.emit(this.currentPage())
  }

  setPage(newPageNumber: number) {
    if (Number.isNaN(Number(newPageNumber))) return
    this.currentPage.set(newPageNumber)
  }
}
