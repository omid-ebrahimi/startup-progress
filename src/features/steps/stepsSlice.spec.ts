import stepsReducer, {addTask, StepType, StepsState, initialState, editTask} from './stepsSlice';

describe('steps reducer', () => {
  const state: StepsState = {
    steps: {
      [StepType.Foundation]: { title: "Foundation", tasks: ["xyz"] },
      [StepType.Discovery]: { title: "Discovery", tasks: [] },
      [StepType.Delivery]: { title: "Delivery", tasks: [] },
    },
    tasks: {
      "xyz": {
          id: "xyz",
          stepId: StepType.Foundation,
          text: "sample task description",
          done: false
        }
    }
  };

  it('should handle initial state', () => {
    expect(stepsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const actual = stepsReducer(state, addTask({ text: "A new task", stepId: StepType.Discovery }));

    expect(actual.steps[StepType.Discovery].tasks.length).toEqual(1);
    expect(Object.keys(actual.tasks).length).toEqual(2);
  });

  it('should handle editTask', () => {
    const updatedTask = { id: "xyz", text: "updated text", stepId: StepType.Foundation, done: true }

    const actual = stepsReducer(state, editTask(updatedTask));

    expect(actual.tasks["xyz"].text).toEqual(updatedTask.text);
    expect(actual.tasks["xyz"].done).toEqual(updatedTask.done);
  });
});
