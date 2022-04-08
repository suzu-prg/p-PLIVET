import * as React from 'react';

type AnswerContextType = {
  answered: boolean;
  toggleAnswered: (state: boolean) => void;
};

export const ResourceContext = React.createContext<AnswerContextType>({
  answered: true,
  toggleAnswered: () => {},
});
