import Question from './question';

export default interface Survey {
  id: number;
  text: string;
  questions: Question[];
}
