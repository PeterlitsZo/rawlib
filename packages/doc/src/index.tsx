/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App.tsx';

import '@wooorm/starry-night/style/both.css';
import './css-reset.scss';

const root = document.getElementById('root');

render(() => <App />, root!);
