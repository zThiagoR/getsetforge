function getClassPropertiesJS(text: string): Array<{ name: string, type?: string }> {
  const properties: Array<{ name: string, type?: string }> = [];
  const jsDocPropertyRegex = /\*\*\s*\n\s*\*\s*@type\s*{\s*(\w+)\s*}\s*\n\s*\*\/\s*this\.(\w+)/g;
  const propertyRegex = /this\.(\w+)\s*=\s*/g;
  let match;

  while ((match = jsDocPropertyRegex.exec(text))) {
    properties.push({ name: match[2], type: match[1].trim() });
  }

  if (properties.length === 0) {
    while ((match = propertyRegex.exec(text))) {
      properties.push({ name: match[1] });
    }
  }
  
  return properties;
}

function getClassPropertiesTS(text: string): Array<{ name: string, type: string }> {
  const properties: Array<{ name: string, type: string }> = [];
  const propertyRegex = /private\s+(\w+)\s*:\s*(\w+)\s*;/g;
  let match;

  while ((match = propertyRegex.exec(text))) {
    properties.push({ name: match[1], type: match[2] });
  }

  return properties;
}

export {
  getClassPropertiesJS,
  getClassPropertiesTS
};