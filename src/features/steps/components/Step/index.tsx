import React, { useState } from 'react';

import { Badge } from '../../../../components';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {addTask, selectSteps, selectTasks, StepType} from '../../stepsSlice';
import { Task } from './Task';
import styles from './Step.module.css';

interface Props {
  stepId: StepType
}

export function Step({ stepId }: Props) {
  const steps = useAppSelector(selectSteps)
  const tasks = useAppSelector(selectTasks)
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()

  function onAddTask() {
    dispatch(addTask({stepId, text}))
    setText("")
  }

  return (
    <div>
      <div className={styles.titleContainer}>
        <Badge size={40}>{stepId + 1}</Badge>
        <h1 className={styles.title}>{steps[stepId].title}</h1>
      </div>
      <div>
        {steps[stepId].tasks.map((taskId) => <Task task={tasks[taskId]} />)}
        <div className={styles.newTaskContainer}>
          <input className={styles.newTaskInput} type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={onAddTask}>+</button>
        </div>
      </div>
    </div>
  );
}
