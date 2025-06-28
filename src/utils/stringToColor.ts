/**
 * Генерирует цвет на основе строки (используется для аватаров)
 * @param string - Входная строка для генерации цвета
 * @returns HEX-код цвета в формате #rrggbb
 */
export function stringToColor(string: string): string {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
