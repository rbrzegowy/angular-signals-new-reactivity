import { Component, computed, effect, EventEmitter, inject, Input, input, model, Output, signal } from '@angular/core'
import { EurRate } from '../../shared/eur-rate'
import { HttpClient } from '@angular/common/http'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'

type Cart = any
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  promoCoins = signal(1)
  promoCoinsDiscount = computed(() => {
    console.log('Zmienił się stan monet')
    this.promoCoins() > 10
      ? 'Zyskujesz 10% rabatu'
      : 'Jeszcze trochę brakuje!'
  })
  promoCoinsLogger = effect(() => {
    if (this.promoCoins() > 100) {
      console.log('Ojj, chyba cheat!')
      this.promoCoins.set(0)
    }
  }, { allowSignalWrites: true })

  addPromoCoins() {
    this.promoCoins.update(coins => coins + 1)
    this.promoCoins.update(coins => coins + 1)
    this.promoCoins.update(coins => coins + 1)
  }

  readonly shoppingCart = signal<Cart | null>(null)

  setCart(cart: Cart) {
    const newCart = { ...cart } as const
    this.shoppingCart.set(cart)
  }
  letdDoSomethingCool() {
    const cart1 = this.shoppingCart()
    const cart2 = this.shoppingCart()
    cart1.totalToPay = 1000 // nie uda się


    // już nie możemy:)
    // this.shoppingCart = signal(cart1)
  }

  totalToPayInEur = computed(() => {
    return this.shoppingCart().totalToPay / EurRate
  })


  changeTotal() {
    this.shoppingCart.update(cart => {
      return {
        ...cart,
        totalToPay: +cart.totalToPay++ + 100
      }
    })
  }

  onCheckout() {
    throw new Error('Method not implemented.')
  }
}
