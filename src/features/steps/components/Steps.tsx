import React from 'react';

import { StepType } from '../stepsSlice';
import { Step } from './Step';
import styles from './Steps.module.css';

export function Steps() {
  return (
    <div className={styles.container}>
      <h1>My Startup Progress</h1>
      <Step stepId={StepType.Foundation} />
      <Step stepId={StepType.Discovery} />
      <Step stepId={StepType.Delivery} />
    </div>
  );
}
