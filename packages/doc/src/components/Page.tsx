import { JSXElement } from 'solid-js';
import styles from './Page.module.scss';
import clsx from 'clsx';

export type PageNo = 1 | 2 | 3;

interface PageProps {
  text: JSXElement;
  preview: JSXElement;
  active: PageNo;
  setActive: (active: PageNo) => void;
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
          <button
            class={clsx(styles.NavButton, props.active === 3 && styles.Active)}
            onClick={() => props.setActive(3)}
          >
            03
          </button>
        </div>
        <div class={styles.Content}>{props.text}</div>
      </div>
      <div class={styles.Preview}>{props.preview}</div>
      <div class={styles.BadScreen}>
        <p>The screen is<br/>too small<br/>to display.</p>
      </div>
    </div>
  )
}