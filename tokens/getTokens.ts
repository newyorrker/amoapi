import { getValue } from "../readFromFile.ts";

export const getAccessToken = async () => {
  return await getValue("ACCESS_TOKEN");
}

export const getRefreshToken = async () => {
  return await getValue("REFRESH_TOKEN");
}