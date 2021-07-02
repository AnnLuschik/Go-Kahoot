export const getFilteredTests = (input, arr) => {
  return arr.filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()));
};

export const getPages = (pages) => {
  const arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }
  return arr;
};
  