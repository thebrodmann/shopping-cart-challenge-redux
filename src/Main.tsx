import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import * as App from '~/App'
import * as Store from '~/Store'
import * as Handlers from '~/Handlers'
import { mkStore } from '~/Store'
import { mkHandlers } from '~/Handlers'
import { defaultEnvironment } from '~/Environment'

const rootElement = document.getElementById('root')

function main() {
  const store = mkStore(defaultEnvironment)
  const handlers = mkHandlers(store)

  Store.rehydrate(store)

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Handlers.provider value={handlers}>
          <React.StrictMode>
            <App.component />
          </React.StrictMode>
        </Handlers.provider>
      </BrowserRouter>
    </Provider>,
    rootElement
  )
}

main()
