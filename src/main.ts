import { createApp } from './createApp';
import './style.css';

const appElement = document.querySelector<HTMLDivElement>('#app');

if (appElement == null) throw new Error('App element is null');

createApp(true).renderTo(appElement);
