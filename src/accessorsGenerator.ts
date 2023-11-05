import { generateIndentation, capitalize } from './utils';

export function generateAccessors(
  properties: Array<{ name: string, type?: string }>,
  isTypescript: boolean,
  tabSize: number,
  useTabs: boolean
): string {
  return properties.map(({ name, type }) => {
    const methodName = capitalize(name);

    const getterJsDoc = type && !isTypescript
      ? `${generateIndentation(1, tabSize, useTabs)}/**\n${generateIndentation(1, tabSize, useTabs)} * Gets the ${name} property.\n${generateIndentation(1, tabSize, useTabs)} * @returns {${type}}\n${generateIndentation(1, tabSize, useTabs)} */`
      : '';

    const setterJsDoc = type && !isTypescript
      ? `${generateIndentation(1, tabSize, useTabs)}/**\n${generateIndentation(1, tabSize, useTabs)} * Sets the ${name} property.\n${generateIndentation(1, tabSize, useTabs)} * @param {${type}} newValue - The new value to set.\n${generateIndentation(1, tabSize, useTabs)} */`
      : '';

    const getter = [
      getterJsDoc,
      `${generateIndentation(1, tabSize, useTabs)}get${methodName}()${isTypescript && type ? `: ${type}` : ''} {`,
      `${generateIndentation(2, tabSize, useTabs)}return this.${name};`,
      `${generateIndentation(1, tabSize, useTabs)}}`
    ].filter(line => line !== '').join('\n');

    const setter = [
      setterJsDoc,
      `${generateIndentation(1, tabSize, useTabs)}set${methodName}(new${methodName}${isTypescript && type ? `: ${type}` : ''}) {`,
      `${generateIndentation(2, tabSize, useTabs)}this.${name} = new${methodName};`,
      `${generateIndentation(1, tabSize, useTabs)}}`
    ].filter(line => line !== '').join('\n');;

    return `${getter}\n\n${setter}`;
  }).join('\n\n');
}