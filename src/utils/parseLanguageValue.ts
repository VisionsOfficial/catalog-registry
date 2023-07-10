export const parseLanguageValue = (input: string) => {
  if (input.startsWith("@")) return input;
  else return `@${input}`;
};

export const mapLanguageValueArray = (
  arr: { "@language": string; "@value": string }[]
) => {
  return arr.map((o) => {
    return {
      "@language": o["@language"],
      "@value": parseLanguageValue(o["@value"]),
    };
  });
};
