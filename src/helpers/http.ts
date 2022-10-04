import { baseUrl } from "~/utils";

export async function sendToTrainer(token: string, body: any) {
  await fetch(`${baseUrl}/api/trainer/save`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function getPlan(token: string) {
  return await fetch(`${baseUrl}/api/trainer`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export async function signIn(username: string, password: string) {
  return await fetch(`${baseUrl}/api/auth/sign`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
}

export async function verifyUser(token: string) {
  return await fetch(`${baseUrl}/api/auth/sign`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

export async function userInfo(token: string, trainerId: string) {
  return await fetch(`${baseUrl}/api/user?user=${trainerId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export async function getGroups(token: string, userId: string) {
  return await fetch(`${baseUrl}/api/group`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userId }),
  }).then((response) => response.json());
}

export async function getUserActivities(token: string, id: string) {
  return await fetch(`${baseUrl}/api/user/trainer`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((response) => response.json());
}

export async function requestActivityChange(token: string, activityId: string) {
  return await fetch(`${baseUrl}/api/trainer/change`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ activityId }),
  });
}
