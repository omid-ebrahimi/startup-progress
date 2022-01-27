import React from 'react';
import { editTask } from '../../../stepsSlice';
import { Task as TaskType } from '../../../types';
import { useAppDispatch } from "../../../../../app/hooks";
import { CheckBox } from '../../../../../components/CheckBox';
import styles from './Task.module.css';

interface Props {
  task: TaskType
  locked: boolean
}

export function Task({ task, locked }: Props) {
  const { text, done } = task
  const dispatch = useAppDispatch()

  return (
    <div className={styles.container}>
      <CheckBox disabled={locked} checked={done} onChange={(done) => dispatch(editTask({ ...task, done }))} />
      <strong className={styles.text}>{text}</strong>
    </div>
  );
}
