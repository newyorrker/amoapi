export const saveTokens = async (accessToken: string, refreshToken: string) => {
  const text = `ACCESS_TOKEN=${accessToken}\nREFRESH_TOKEN=${refreshToken}`;

  try {
    await Deno.writeTextFile(".keys", text);
    console.log("Файл .env успешно создан и записан.");
  } catch (error) {
    console.error(`Произошла ошибка при создании или записи файла: ${error}`);
  }
}