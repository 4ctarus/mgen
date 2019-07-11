export default interface Task {
  id: number;
  type: TaskType | number;
  progress: number;
  value?: {};
  medic?: {
    total: number,
    actual: number
  };
}

export interface TimeTask {
  [index: string]: Task[];
}

export enum TaskType {
  'SF12'= 13,
  'DN4'= 14,
  'HAD'= 15,
  'ECPA'= 16,
  'SF36'= 17
}
