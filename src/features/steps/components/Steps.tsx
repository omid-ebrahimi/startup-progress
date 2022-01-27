import React from 'react';

import { useAppSelector } from '../../../app/hooks';
import { StepStatus, StepType } from '../stepsTypes';
import { selectStepStatuses } from '../stepsSlice';
import Fact from './Fact';
import { Step } from './Step';
import styles from './Steps.module.css';

export function Steps() {
  const statuses = useAppSelector(selectStepStatuses)
  const isStartupDone = statuses[StepType.Delivery] === StepStatus.ToVerify
  return (
    <div className={styles.container}>
      <h1>My Startup Progress</h1>
      <Step stepId={StepType.Foundation} status={statuses[StepType.Foundation]} />
      <Step stepId={StepType.Discovery} status={statuses[StepType.Discovery]} />
      <Step stepId={StepType.Delivery} status={statuses[StepType.Delivery]} />
      {isStartupDone && <Fact />}
    </div>
  );
}
