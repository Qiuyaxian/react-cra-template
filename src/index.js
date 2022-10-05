import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
import 'element-theme-default'

const render = (Component) => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

render(App)

/* eslint-disable */
if (module.hot) {
  module.hot.accept(() => {
    render(App)
  })
}
/* eslint-enabled */

// import reportWebVitals from './reportWebVitals'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
