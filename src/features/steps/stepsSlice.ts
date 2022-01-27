import { v4 as uuid } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { StepsState, StepStatus, StepType, Task } from './stepsTypes';

export const initialState: StepsState = {
  steps: {
    [StepType.Foundation]: { title: "Foundation", taskIds: [] },
    [StepType.Discovery]: { title: "Discovery", taskIds: [] },
    [StepType.Delivery]: { title: "Delivery", taskIds: [] },
  },
  tasks: {}
}

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Pick<Task, "stepId" | "text">>) => {
      const { stepId, text } = action.payload
      const id = uuid()
      state.tasks[id] = { id, stepId, text, done: false }
      state.steps[stepId].taskIds.push(id)
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      state.tasks[task.id] = task
    }
  }
})

export const { addTask, editTask } = stepsSlice.actions;

export const selectSteps = (state: RootState) => state.steps;
export const selectTasks = (state: RootState) => state.tasks;
export const selectStepStatus = (stepId: StepType) => (state: RootState): StepStatus | undefined => {
  const { steps, tasks } = state
  const step = steps[stepId]

  if (step === undefined) {
    return undefined
  }

  if (step.taskIds.length === 0) {
    return StepStatus.Backlog
  }

  const someTasksAreDone = step.taskIds.some((taskId) => tasks[taskId].done)
  const someTasksAreNotDone = step.taskIds.some((taskId) => !tasks[taskId].done)
  const noTaskIsDone = someTasksAreNotDone && !someTasksAreDone
  const allTasksAreDone = someTasksAreDone && !someTasksAreNotDone

  if (someTasksAreDone && someTasksAreNotDone) {
    return StepStatus.InProgress
  }

  if (allTasksAreDone) {
    if (steps[(stepId + 1) as StepType]?.taskIds.some((taskId) => tasks[taskId].done)) {
      return StepStatus.Done
    }
    return StepStatus.ToVerify
  }

  if (noTaskIsDone) {
    const prevStepStatus = selectStepStatus(stepId - 1)(state)
    if (prevStepStatus === undefined || prevStepStatus === StepStatus.ToVerify) {
      return StepStatus.Todo
    }
    return StepStatus.Backlog
  }
}

export const selectStepStatuses = (state: RootState): Record<StepType, StepStatus> => ({
  [StepType.Foundation]: selectStepStatus(StepType.Foundation)(state) as StepStatus,
  [StepType.Discovery]: selectStepStatus(StepType.Discovery)(state) as StepStatus,
  [StepType.Delivery]: selectStepStatus(StepType.Delivery)(state) as StepStatus,
})

export default stepsSlice.reducer;
