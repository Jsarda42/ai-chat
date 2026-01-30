// aiV2/utils/isAboutSelf.ts
export function isAboutSelf(input: string) {
  const text = input.toLowerCase();

  return (
    text.includes("tell me about yourself") ||
    text.includes("who are you") ||
    text.includes("how do you work")
  );
}
