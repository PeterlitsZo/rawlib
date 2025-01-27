/* @refresh reload */
import { render } from 'solid-js/web'
import './css-reset.scss'
import App from './App.tsx'

const root = document.getElementById('root')

render(() => <App />, root!)
