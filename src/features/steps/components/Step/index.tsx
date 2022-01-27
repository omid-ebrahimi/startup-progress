import React, { useState } from 'react';

import { Badge } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { StepStatus, StepType } from '../../stepsTypes';
import { addTask, selectSteps, selectTasks } from '../../stepsSlice';
import { Task } from './Task';
import styles from './Step.module.css';

interface Props {
  stepId: StepType
  status: StepStatus
}

export function Step({ stepId, status }: Props) {
  const steps = useAppSelector(selectSteps)
  const tasks = useAppSelector(selectTasks)
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()

  function onAddTask() {
    dispatch(addTask({stepId, text}))
    setText("")
  }

  const isDone = status === StepStatus.Done
  const isToVerify = status === StepStatus.ToVerify
  const locked = status === StepStatus.Backlog || status === StepStatus.Done

  return (
    <div>
      <div className={styles.titleContainer}>
        <Badge size={40}>{stepId + 1}</Badge>
        <h1 className={styles.title}>{steps[stepId].title}</h1>
        {(isToVerify || isDone) && <strong className={styles.doneMark}>&nbsp;&nbsp; ✓</strong>}
      </div>
      <div>
        {steps[stepId].taskIds.map((taskId) => (
          <Task key={taskId} task={tasks[taskId]} locked={locked} />
        ))}
        <div className={styles.newTaskContainer}>
          <input disabled={isDone} className={styles.newTaskInput} type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button disabled={isDone} onClick={onAddTask}>+</button>
        </div>
      </div>
    </div>
  );
}
