import React from 'react'

import * as Store from '~/Store'
import { useHandlers } from '~/Handlers'
import { defineDisplayName } from '~/Utils'

type RowProps = { entity: Store.CartEntity }

export function row({ entity }: RowProps) {
  const { id, name, price, quantity } = entity

  const { onAddProductToCart, onRemoveProductFromCart } = useHandlers()

  function handleIncrementQuantityButtonClick() {
    onAddProductToCart(id)
  }

  function handleDecrementQuantityButtonClick() {
    onRemoveProductFromCart(id)
  }

  function handleRemoveProductButtonClick() {
    onRemoveProductFromCart(id, true)
  }

  const incrementQuantityButton = (
    <button
      aria-label="Increase quantity"
      onClick={handleIncrementQuantityButtonClick}
    >
      +1
    </button>
  )
  const decrementQuantityButton = (
    <button
      aria-label="Decrease quantity"
      disabled={quantity <= 1}
      onClick={handleDecrementQuantityButtonClick}
    >
      -1
    </button>
  )
  const removeProductButton = (
    <button
      aria-label="Remove product from cart"
      onClick={handleRemoveProductButtonClick}
    >
      Remove 🗑
    </button>
  )

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>${price}</td>
      <td>${quantity * price}</td>
      <td>
        {incrementQuantityButton}
        {decrementQuantityButton}
        {removeProductButton}
      </td>
    </tr>
  )
}

row.memo = React.memo(row)

type RowsProps = { entities: ReadonlyArray<Store.CartEntity> }

export function body({ entities }: RowsProps) {
  return (
    <tbody>
      {entities.map((entity) =>
        React.createElement(row.memo, { entity, key: entity.id })
      )}
    </tbody>
  )
}

body.memo = React.memo(body)

defineDisplayName('Component.Cart.Table', { row, body })
