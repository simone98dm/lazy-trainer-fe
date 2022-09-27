export async function sendToTrainer(token: string, body: any) {
  await fetch("/api/trainer/save", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    console.log(response);
  });
}

export async function getPlan(token: string) {
  return await fetch("/api/trainer", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

export async function signIn(username: string, password: string) {
  return await fetch("/api/auth/sign", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
}

export async function verifyUser(token: string) {
  return await fetch("/api/auth/sign", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

export async function userInfo(token: string, trainerId: string) {
  return await fetch(`/api/user?user=${trainerId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

export async function getGroups(token: string, userId: string) {
  return await fetch(`/api/group`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: userId }),
  }).then((response) => response.json());
}

export async function getUserActivities(token: string, id: string) {
  return await fetch("/api/user/trainer", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  }).then((response) => response.json());
}
