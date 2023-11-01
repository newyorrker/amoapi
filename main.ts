import { AmoClient } from "./amo/AmoClient.ts";
import { getAccessToken, getRefreshToken, saveTokens } from "./tokens/index.ts";


const SECRET_KEY = "YCs39UKtDtmNOs6iDMdBgN8Aifafy5k5asqmsw3VklShtCOHqG31esgA92PqGsrH";
const INTEGRATION_ID = "bb2df59f-ea58-4057-8690-fb725d0c4b33";
const AUTH_CODE = "def5020040c4d5f8d32012bd9e0dee29a1e85a4e9f53febece4f5468a11078a07f7ea6da89a68430a49847a7087b4a0d03c07960f79b89843ca54ebfbd9ab6284efabf646ba9164a7430deedb081564d79f5b71ed84a0e9ad6471b8b3b1f347bb8e943d4dd2a908578f843d4ffc1353bcd0a4ca5fe8ed60848e9e0d3ecb5e1db741b986b8ea0d405673462b8c2b8ac09354b84df2effcb0dfac77f4d6f88e398d126adb70a5a741a18dfabd8fdedffea3b14c1dbaf6de698b06546fab237660588ab7a17ce81ab802c90537d47b5ce8e1ecbe863a579b29260db66219b6fe8b67d8edad1d85e662eb5ebe6ccc7a1908f9f053ec24c00eb748af239cd0253fa4369b12c0da659b2ad3481500ea7d862bcb90401c528101a2d841b73dd26fa4095d4d52c6d37a9384dbc89e9b1ba1ef2030cdb319278e3383ee6b8eb095544abc4864b2d517a0c6f9d11b68a22ede7aed473ee0f5104189a716a874ed963a691ddeb32aa505fc71a25392b9791cd25ab7a1b89591ef24ddf53c25f5b2299c6fd2f47c0f1efe92ea4e37b7f3f04f300091766e783c45c061daf60578cd9499d995f145e20b727c828fcbb9b3c9c8d846f983b73f845b7a8342e0c3636df034861f3d38a75ba250d34e715569d0bea6b3abacff59f7314feb8b6923953eae6fe71ee77871ab1b0d1284c8776ae1b7ed1179b32be10034946"
const SUBDOMAIN = "https://astro-test-1910.netlify.app/";
// const ACCESS_TOKEN="";
// const REFRESH_TOKEN="";

const data = {
  client_id: INTEGRATION_ID,
  client_secret: SECRET_KEY,
  grant_type: "authorization_code",
  code: AUTH_CODE,
  redirect_uri: SUBDOMAIN
}

const isExpired = (toke: string) => {

}

const refreshToken = await getRefreshToken();
const accessToken = await getAccessToken();

const amoClient = new AmoClient(accessToken);


//первичная авторизация
if(!refreshToken && !accessToken) {
  try {
    const {access_token, refresh_token} = await amoClient.auth(data);

    saveTokens(access_token, refresh_token);
  }
  catch(e) {
    console.error(e);
  }
}

const refreshAccessToken = async (refreshToken?: string | null) => {

  if(!refreshToken) {
    throw new Error("refreshToken must be set");
  }

  const refreshData = {
    client_id: INTEGRATION_ID,
    client_secret: SECRET_KEY,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    redirect_uri: SUBDOMAIN
  }

  const {access_token, refresh_token} = await amoClient.getNewKeys(refreshData);

  saveTokens(access_token, refresh_token);
}

// refreshAccessToken()

amoClient.baseRequest()

// refreshAccessToken(refreshToken);