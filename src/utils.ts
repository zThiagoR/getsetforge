function generateIndentation(level: number, tabSize: number, useTabs: boolean): string {
  return useTabs ? '\t'.repeat(level) : ' '.repeat(level * tabSize);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  generateIndentation,
  capitalize
};