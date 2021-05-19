export type FieldValidatorType = (value: string) => string | undefined

export const reqired: FieldValidatorType = (value) => {
  if (value) return undefined;
  return 'Field reqired';
};

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
  if (value.length > maxLength) return `Maxx length is ${maxLength} symbols`;
  return undefined;
};