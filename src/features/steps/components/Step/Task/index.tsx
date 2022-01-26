import React from 'react';
import {editTask, Task as TaskType } from '../../../stepsSlice';
import { CheckBox } from '../../../../../components/CheckBox';
import styles from './Task.module.css';
import {useAppDispatch} from "../../../../../app/hooks";

interface Props {
  task: TaskType
}

export function Task({ task }: Props) {
  const { text, done } = task
  const dispatch = useAppDispatch()

  return (
    <div className={styles.container}>
      <CheckBox checked={done} onChange={(done) => dispatch(editTask({ ...task, done }))} />
      <strong className={styles.text}>{text}</strong>
    </div>
  );
}
