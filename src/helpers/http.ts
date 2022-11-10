import { baseUrl } from "~/utils";
import log from "./logger";

const buildHeaders = (token: string) => ({
  authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export async function sendToTrainer(token: string, body: any) {
  try {
    await fetch(`${baseUrl}/api/trainer/save`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getPlan(token: string) {
  try {
    return await fetch(`${baseUrl}/api/trainer`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function signIn(username: string, password: string) {
  try {
    return await fetch(`${baseUrl}/api/auth/sign`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function verifyUser(token: string) {
  try {
    return await fetch(`${baseUrl}/api/auth/sign`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function userInfo(token: string, trainerId: string) {
  try {
    return await fetch(`${baseUrl}/api/user?user=${trainerId}`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getGroups(token: string, userId: string) {
  try {
    return await fetch(`${baseUrl}/api/group`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify({ id: userId }),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getUserActivities(token: string, id: string) {
  try {
    return await fetch(`${baseUrl}/api/user/trainer`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify({ id }),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function requestActivityChange(token: string, activityId: string) {
  try {
    return await fetch(`${baseUrl}/api/trainer/change`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify({ activityId }),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}
