import * as React from 'react';

// export type AnswerContextType = {
//   answered: boolean;
//   toggleAnswered: (state: boolean) => void;
// };

export type AnswerContextType = {
  answered: boolean;
  toggleAnswered: () => void;
};

export const ResourceContext = React.createContext<AnswerContextType>({
  answered: true,
  toggleAnswered: () => {},
});
