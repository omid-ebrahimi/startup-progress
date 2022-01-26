import { v4 as uuid } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

export enum StepType {
  Foundation,
  Discovery,
  Delivery
}

export interface Task {
  id: string
  stepId: StepType
  text: string
  done: boolean
}

interface Step {
  title: keyof typeof StepType
  tasks: Task["id"][]
}

export interface StepsState {
  steps: Record<StepType, Step>
  tasks: Record<Task["id"], Task>
}

export const initialState: StepsState = {
  steps: {
    [StepType.Foundation]: { title: "Foundation", tasks: [] },
    [StepType.Discovery]: { title: "Discovery", tasks: [] },
    [StepType.Delivery]: { title: "Delivery", tasks: [] },
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
      state.steps[stepId].tasks.push(id)
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

export default stepsSlice.reducer;
