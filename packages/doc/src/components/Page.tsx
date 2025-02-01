import { JSXElement } from 'solid-js';
import styles from './Page.module.scss';
import clsx from 'clsx';

interface PageProps {
  text: JSXElement;
  preview: JSXElement;
  active: 1 | 2;
  setActive: (active: 1 | 2) => void;
}

export function Page(props: PageProps) {
  return (
    <div class={styles.Page}>
      <div class={styles.Text}>
        <div class={styles.Nav}>
          <button
            class={clsx(styles.NavButton, props.active === 1 && styles.Active)}
            onClick={() => props.setActive(1)}
          >
            01
          </button>
          <button
            class={clsx(styles.NavButton, props.active === 2 && styles.Active)}
            onClick={() => props.setActive(2)}
          >
            02
          </button>
        </div>
        <div class={styles.Content}>{props.text}</div>
      </div>
      <div class={styles.Preview}>{props.preview}</div>
    </div>
  )
}