export const reqired = value => {
  if (value) return undefined;
  return 'Field reqired';
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Maxx length is ${maxLength} symbols`;
  return undefined;
}