import React from 'react';
import styles from './CheckBox.module.css';

interface Props {
  checked: boolean,
  onChange: (checked: boolean) => void
}

export function CheckBox({ checked, onChange }: Props) {
  const toggle = () => onChange(!checked)
  return (
    <div className={styles.container} onClick={toggle}>
      {checked && <strong>✓</strong>}
    </div>
  );
}
