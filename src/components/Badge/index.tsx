import React, { PropsWithChildren } from 'react';
import styles from './Badge.module.css';

interface Props {
  size: number
}

export function Badge({ children, size }: PropsWithChildren<Props>) {
  return (
    <div className={styles.container} style={{ width: size, height: size, borderRadius: size / 2 }}>
      {children}
    </div>
  );
}
