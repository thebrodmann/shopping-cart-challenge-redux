import React from 'react'
import * as Redux from 'redux'

import * as Store from '~/Store'

export type Handlers = Readonly<{
  onFetchProducts(): void
  onAddProductToCart(productId: Store.ProductId): void
  onRemoveProductFromCart(productId: Store.ProductId, absolute?: boolean): void
  onClearCart(): void
}>

export type PropsWithHandlers<T, K extends keyof Handlers> = T &
  Pick<Handlers, K>

const handlers = {
  onFetchProducts: Store.fetchProducts,
  onAddProductToCart: Store.addProductToCart,
  onRemoveProductFromCart: Store.removeProductFromCart,
  onClearCart: Store.clearCart,
}

export function mkHandlers(store: Redux.Store) {
  return Redux.bindActionCreators(handlers, store.dispatch)
}

const context = React.createContext(<Handlers>{})

export const provider = context.Provider

export function useHandlers() {
  return React.useContext(context)
}
