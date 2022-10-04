import { createStore, combineReducers } from 'redux'
// import modules from './modules'
const modules = require.context('./modules', true, /reducer\.js$/)

const storeModules = {}
modules.keys().forEach((mockItem) => {
  const moduleName = mockItem.match(/\.\/(\w+)\/reducer\.js$/i)
  if (moduleName && moduleName[1]) {
    storeModules[moduleName[1]] = modules(mockItem).default || modules(mockItem)
  }
})

const reducer = combineReducers(storeModules, 'storeModules')

export default createStore(reducer)
