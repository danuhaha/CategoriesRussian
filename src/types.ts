export interface Category {
  readonly categoryTitle: string;
  readonly words: string[];
  readonly level: 1 | 2 | 3 | 4;
}

export interface Word {
  readonly word: string;
  readonly level: 1 | 2 | 3 | 4;
}

export interface GameInfo {
  readonly date: string;
  readonly categories: Category[];
}

export enum GameStatus {
  Default = 'default',
  Won = 'won',
  Lost = 'lost',
  Loading = 'loading',
  Error = 'error',
}

export enum SubmitResult {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Same = 'same',
  OneAway = 'one-away',
  Loss = 'loss',
  Win = 'win',
}

export interface CellAnimationState {
  readonly show: boolean;
  readonly index: number;
}
