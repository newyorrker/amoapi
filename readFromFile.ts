export const getValue = async (key: string): Promise<string | undefined> => {
  const filename = ".keys"; // Имя вашего файла
  try {
    const data = await Deno.readTextFile(filename);
    const lines = data.split("\n");
    for (const line of lines) {
      const [lineKey, lineValue] = line.split("=");
      if (lineKey.trim() === key) {
        return lineValue.trim();
      }
    }
  } catch (error) {
    console.error(`Произошла ошибка при чтении файла: ${error}`);
  }

  return undefined;
}