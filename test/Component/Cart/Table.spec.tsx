import React from 'react'
import { fireEvent } from '@testing-library/react'

import * as Store from '~/Store'
import * as Handlers from '~/Handlers'
import * as Table from '~/Component/Cart/Table'
import { mkCartEntity } from '~/Store/Root'

import * as Data from '~/Test/Data'
import { render, mkTestHandlers } from '~/Test/Utils'

function renderTableRow(
  product: Store.Product,
  quantity: number,
  handlers = mkTestHandlers()
) {
  return render(
    <Handlers.provider value={handlers}>
      <Table.row entity={mkCartEntity(product)(quantity)} />
    </Handlers.provider>,
    'tbody'
  )
}

describe('Component.Cart.Table.row', () => {
  it('should render product name', () => {
    const { queryByText } = renderTableRow(Data.Product.a, 2)

    const element = queryByText(Data.Product.a.name, { exact: false })

    expect(element).not.toBeNull()
  })

  it('should render product quantity', () => {
    const { queryByText } = renderTableRow(Data.Product.a, 3)

    expect(queryByText('3')).not.toBeNull()
  })

  it('should render product price', () => {
    const { queryByText } = renderTableRow(Data.Product.a, 3)

    const element = queryByText(`$${Data.Product.a.price}`, { exact: false })

    expect(element).not.toBeNull()
  })

  it('should render total price', () => {
    const { queryByText } = renderTableRow(Data.Product.b, 5)

    const element = queryByText(`$${Data.Product.b.price * 5}`, {
      exact: false,
    })

    expect(element).not.toBeNull()
  })

  describe('when quantity is one', () => {
    it('should disable decrease quantity button', () => {
      const { queryByLabelText } = renderTableRow(Data.Product.a, 1)

      expect(queryByLabelText(/decrease quantity/i)).toBeDisabled()
    })
  })

  describe('when click on increment quantity button', () => {
    it('should call onAddProductToCart callback', () => {
      const handlers = mkTestHandlers({
        onAddProductToCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.a, 1, handlers)

      fireEvent.click(getByLabelText(/increase quantity/i))

      expect(handlers.onAddProductToCart).toBeCalled()
    })

    it('should apply correct product ID to onAddProductToCart callback', () => {
      const handlers = mkTestHandlers({
        onAddProductToCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.b, 1, handlers)

      fireEvent.click(getByLabelText(/increase quantity/i))

      expect(handlers.onAddProductToCart).toBeCalledWith(Data.Product.b.id)
    })
  })

  describe('when click on decrement quantity button', () => {
    it('should call onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.a, 2, handlers)

      fireEvent.click(getByLabelText(/decrease quantity/i))

      expect(handlers.onRemoveProductFromCart).toBeCalled()
    })

    it('should apply correct product ID to onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.b, 2, handlers)

      fireEvent.click(getByLabelText(/decrease quantity/i))

      expect(handlers.onRemoveProductFromCart).toBeCalledWith(Data.Product.b.id)
    })
  })

  describe('when click on remove from the cart button', () => {
    it('should call onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.a, 1, handlers)

      fireEvent.click(getByLabelText(/remove product/i))

      expect(handlers.onRemoveProductFromCart).toBeCalled()
    })

    it('should apply correct product ID to onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = renderTableRow(Data.Product.b, 1, handlers)

      fireEvent.click(getByLabelText(/remove product/i))

      expect(handlers.onRemoveProductFromCart).toBeCalledWith(
        Data.Product.b.id,
        true
      )
    })
  })
})

function renderTableBody(entities: ReadonlyArray<Store.CartEntity> = []) {
  return render(<Table.body entities={entities} />, 'table')
}

describe('Component.Cart.Table.body', () => {
  describe('when cart is empty', () => {
    it('should not render any product', () => {
      const { container } = renderTableBody()

      const tbody = container.querySelector('tbody')!

      expect(tbody.childNodes.length).toBe(0)
    })
  })

  describe('when cart has product(s)', () => {
    it('should render products', () => {
      const entities = [mkCartEntity(Data.Product.a)(2)]

      const { container } = renderTableBody(entities)

      const tbody = container.querySelector('tbody')!

      expect(tbody.childNodes.length).toBe(1)
    })
  })
})
