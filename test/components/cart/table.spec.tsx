import React from 'react'
import { fireEvent } from '@testing-library/react'

import * as Store from '~/store'
import * as Table from '~/components/cart/table'
import { mkCartEntity } from '~/store/root'

import * as Data from '../../data'
import { render, mkTestHandlers } from '../../utils'

describe('Component.Cart.Table.row', () => {
  it('should render product name', () => {
    const handlers = mkTestHandlers()

    const { queryByText } = render(
      <Table.row entity={mkCartEntity(Data.Product.a)(2)} {...handlers} />,
      'tbody'
    )

    const element = queryByText(Data.Product.a.name, { exact: false })

    expect(element).not.toBeNull()
  })

  it('should render product quantity', () => {
    const handlers = mkTestHandlers()

    const { queryByText } = render(
      <Table.row entity={mkCartEntity(Data.Product.a)(3)} {...handlers} />,
      'tbody'
    )

    expect(queryByText('3')).not.toBeNull()
  })

  it('should render product price', () => {
    const handlers = mkTestHandlers()

    const { queryByText } = render(
      <Table.row entity={mkCartEntity(Data.Product.a)(3)} {...handlers} />,
      'tbody'
    )

    const element = queryByText(`$${Data.Product.a.price}`, { exact: false })

    expect(element).not.toBeNull()
  })

  it('should render total price', () => {
    const handlers = mkTestHandlers()

    const { queryByText } = render(
      <Table.row entity={mkCartEntity(Data.Product.b)(5)} {...handlers} />,
      'tbody'
    )

    const element = queryByText(`$${Data.Product.b.price * 5}`, {
      exact: false,
    })

    expect(element).not.toBeNull()
  })

  describe('when quantity is one', () => {
    it('should disable decrease quantity button', () => {
      const handlers = mkTestHandlers({})

      const { queryByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.a)(1)} {...handlers} />,
        'tbody'
      )

      expect(queryByLabelText(/decrease quantity/i)).toBeDisabled()
    })
  })

  describe('when click on increment quantity button', () => {
    it('should call onAddProductToCart callback', () => {
      const handlers = mkTestHandlers({
        onAddProductToCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.a)(1)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/increase quantity/i))

      expect(handlers.onAddProductToCart).toBeCalled()
    })

    it('should apply correct product ID to onAddProductToCart callback', () => {
      const handlers = mkTestHandlers({
        onAddProductToCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.b)(1)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/increase quantity/i))

      expect(handlers.onAddProductToCart).toBeCalledWith(Data.Product.b.id)
    })
  })

  describe('when click on decrement quantity button', () => {
    it('should call onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.a)(2)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/decrease quantity/i))

      expect(handlers.onRemoveProductFromCart).toBeCalled()
    })

    it('should apply correct product ID to onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.b)(2)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/decrease quantity/i))

      expect(handlers.onRemoveProductFromCart).toBeCalledWith(Data.Product.b.id)
    })
  })

  describe('when click on remove from the cart button', () => {
    it('should call onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.a)(1)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/remove product/i))

      expect(handlers.onRemoveProductFromCart).toBeCalled()
    })

    it('should apply correct product ID to onRemoveProductFromCart callback', () => {
      const handlers = mkTestHandlers({
        onRemoveProductFromCart: jest.fn(),
      })

      const { getByLabelText } = render(
        <Table.row entity={mkCartEntity(Data.Product.b)(1)} {...handlers} />,
        'tbody'
      )

      fireEvent.click(getByLabelText(/remove product/i))

      expect(handlers.onRemoveProductFromCart).toBeCalledWith(
        Data.Product.b.id,
        true
      )
    })
  })
})

describe('Component.Cart.Table.body', () => {
  const handlers = mkTestHandlers()

  describe('when cart is empty', () => {
    it('should not render any product', () => {
      const entities: ReadonlyArray<Store.CartEntity> = []

      const { container } = render(
        <Table.body entities={entities} {...handlers} />,
        'table'
      )

      const tbody = container.querySelector('tbody')!

      expect(tbody.childNodes.length).toBe(0)
    })
  })

  describe('when cart has product(s)', () => {
    it('should render products', () => {
      const entities = [mkCartEntity(Data.Product.a)(2)]

      const { container } = render(
        <Table.body entities={entities} {...handlers} />,
        'table'
      )

      const tbody = container.querySelector('tbody')!

      expect(tbody.childNodes.length).toBe(1)
    })
  })
})