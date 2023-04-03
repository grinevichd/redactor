export const hashtagsFounder = (text: string): string[] | null => {
  const regex = /#[\p{L}\p{M}0-9_]+/gu;
  return text.match(regex);
};
