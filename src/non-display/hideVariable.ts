import { variableList } from './variableList';

const hideVariable = (name: string) => {
  for (let v of variableList) {
    if (name === v) {
      return true;
    }
  }
  return false;
};
export default hideVariable;
