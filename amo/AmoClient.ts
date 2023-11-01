interface AuthRequestData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri: string;
}

interface RefresTokenRequest {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
  redirect_uri: string;
}


export class AmoClient {
  baseUrl: string = "https://projectpulseonline.amocrm.ru";

  constructor(private accessToken?: string) {

  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  async baseRequest() {

    const accessToken = "Bearer " + this.accessToken;
    const headers = {"Authorization": accessToken, 'Content-Type':'application/json'};

    const options: RequestInit = {
      headers,
      method: "GET",

    }

    const jsonResponse = await fetch(`${this.baseUrl}/api/v4/leads/pipelines/7379774/statuses`, options);

    const data = await jsonResponse.json();


    console.log(data);
  }



  async auth(requestData: AuthRequestData) {

    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { 'Content-Type':'application/json' }
    }

    const jsonResponse = await fetch("https://projectpulseonline.amocrm.ru/oauth2/access_token", options);
    const { access_token, refresh_token } = await jsonResponse.json();

    return {
      access_token,
      refresh_token
    }
  }

  async getNewKeys(requestData: RefresTokenRequest) {

    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { 'Content-Type':'application/json' }
    }

    const jsonResponse = await fetch("https://projectpulseonline.amocrm.ru/oauth2/access_token", options);
    const { access_token, refresh_token } = await jsonResponse.json();

    return {
      access_token,
      refresh_token
    }
  }
}