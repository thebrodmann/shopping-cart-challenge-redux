import * as Redux from 'redux'

import * as Store from '~/store'

export type Handlers = {
  onFetchProducts(): void
  onAddProductToCart(productId: Store.ProductId): void
  onRemoveProductFromCart(productId: Store.ProductId, absolute?: boolean): void
  onClearCart(): void
}

const handlers = {
  onFetchProducts: Store.fetchProducts.next,
  onAddProductToCart: Store.addProductToCart,
  onRemoveProductFromCart: Store.removeProductFromCart,
  onClearCart: Store.clearCart,
}

export function createHandlers(store: Redux.Store) {
  return Redux.bindActionCreators(handlers, store.dispatch)
}
