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

export interface Step {
  title: keyof typeof StepType
  taskIds: string[]
}

export type Steps = Record<StepType, Step>

export type Tasks = Record<string, Task>

export interface StepsState {
  steps: Steps
  tasks: Tasks
}

export enum StepStatus {
  Backlog,
  Todo,
  InProgress,
  ToVerify,
  Done
}
