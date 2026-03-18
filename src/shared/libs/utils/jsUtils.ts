export function yieldToMain() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
