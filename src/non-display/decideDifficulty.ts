import {
  resetVariableList,
  setVariableList,
  allVariableList,
} from './variableList';

const decideDifficulty = (difficulty: number) => {
  resetVariableList();
  const list = [...allVariableList];
  for (let i = 0; i < difficulty; ++i) {
    const r = Math.floor(Math.random() * list.length);
    setVariableList(list[r]);
    list.splice(r, 1);
  }
};
export default decideDifficulty;
