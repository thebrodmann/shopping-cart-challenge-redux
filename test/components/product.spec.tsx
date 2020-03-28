import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import * as Product from '~/components/product'

import * as Data from '../data'

describe('<Product.component />', () => {
  it('should render product image', () => {
    const { container } = render(<Product.component product={Data.Product.a} />)

    expect(container.querySelector('img')).not.toBeNull()
  })

  it('should render product image src', () => {
    const { container } = render(<Product.component product={Data.Product.a} />)

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      Data.Product.a.image
    )
  })

  it('should render product image alt', () => {
    const { container } = render(<Product.component product={Data.Product.a} />)

    expect(container.querySelector('img')).toHaveAttribute(
      'alt',
      expect.stringContaining(Data.Product.a.name)
    )
  })

  it('should render product name', () => {
    const { queryByText } = render(
      <Product.component product={Data.Product.a} />
    )

    expect(queryByText(Data.Product.a.name)).not.toBeNull()
  })

  it('should render price', () => {
    const { queryByText } = render(
      <Product.component product={Data.Product.a} />
    )

    expect(
      queryByText(`$${Data.Product.a.price}`, { exact: false })
    ).not.toBeNull()
  })

  it('should render add to cart button', () => {
    const { queryByText } = render(
      <Product.component product={Data.Product.a} />
    )

    expect(queryByText(/add to cart/i)).not.toBeNull()
  })

  describe('when click on add to cart button', () => {
    it('should call onAddToCart callback', () => {
      const handleAddToCart = jest.fn()

      const { getByText } = render(
        <Product.component
          product={Data.Product.a}
          onAddToCart={handleAddToCart}
        />
      )

      fireEvent.click(getByText(/add to cart/i))

      expect(handleAddToCart).toBeCalled()
    })

    it('should apply correct product ID to onAddToCart callback', () => {
      const handleAddToCart = jest.fn()

      const { getByText } = render(
        <Product.component
          product={Data.Product.a}
          onAddToCart={handleAddToCart}
        />
      )

      fireEvent.click(getByText(/add to cart/i))

      expect(handleAddToCart).toBeCalledWith(Data.Product.a.id)
    })
  })
})
