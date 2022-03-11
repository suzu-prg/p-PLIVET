export const allVariableList = ['a', 'b', 'c', 'd', 'e'];
// 問題ごとに変数一覧の配列をもつ必要がある，配列の配列？

export const variableList = [''];

const setVariableList = (variable: string) => {
  variableList.push(variable);
};
const resetVariableList = () => {
  variableList.splice(0);
};

export { setVariableList, resetVariableList };
