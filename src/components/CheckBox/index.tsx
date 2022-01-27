import React from 'react';
import styles from './CheckBox.module.css';

interface Props {
  checked: boolean,
  disabled: boolean
  onChange: (checked: boolean) => void
}

export function CheckBox({ checked, onChange, disabled }: Props) {
  const toggle = () => !disabled && onChange(!checked)
  const backgroundColor = disabled ? "lightgray" : "blueviolet"
  return (
    <div className={styles.container} style={{ backgroundColor }} onClick={toggle}>
      {checked && <strong>✓</strong>}
    </div>
  );
}
