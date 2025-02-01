import { JSXElement } from 'solid-js';
import styles from './Page.module.scss';

interface PageProps {
  text: JSXElement;
  preview: JSXElement;
}

export function Page(props: PageProps) {
  return (
    <div class={styles.Page}>
      <div class={styles.Text}>{props.text}</div>
      <div class={styles.Preview}>{props.preview}</div>
    </div>
  )
}