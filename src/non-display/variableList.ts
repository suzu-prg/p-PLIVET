export const allVariableList = ['a', 'b', 'c', 'd', 'e'];

export const variableList = [''];

const setVariableList = (variable: string) => {
  variableList.push(variable);
};
const resetVariableList = () => {
  variableList.splice(0);
};

export { setVariableList, resetVariableList };
