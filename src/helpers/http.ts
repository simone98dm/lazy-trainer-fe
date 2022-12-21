import { baseUrl } from "~/utils";
import log from "./logger";

const buildHeaders = (token: string) => ({
  authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

interface RequestOptions {
  timeout?: number;
  method: any;
  headers?: any;
  body?: any;
}

async function fetchWithTimeout(url: string, options: RequestOptions) {
  const { timeout = 10000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

export async function sendToTrainer(token: string, body: any) {
  try {
    await fetchWithTimeout(`${baseUrl}/api/trainer/save`, {
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
    return await fetchWithTimeout(`${baseUrl}/api/trainer`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function signIn(username: string, password: string) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/auth/sign`, {
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
    return await fetchWithTimeout(`${baseUrl}/api/auth/sign`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function userInfo(token: string, trainerId: string) {
  try {
    return await fetchWithTimeout(
      `${baseUrl}/api/user/info?user=${trainerId}`,
      {
        method: "GET",
        headers: buildHeaders(token),
      }
    ).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getGroups(token: string, userId: string) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/group`, {
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
    return await fetchWithTimeout(`${baseUrl}/api/user/trainer`, {
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
    return await fetchWithTimeout(`${baseUrl}/api/trainer/change`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify({ activityId }),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getConfiguration(token: string) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/user`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function saveConfiguration(token: string, data: any) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/user`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(data),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function completeSession(token: string, data: any) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/workout/complete`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(data),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getUserStats(token: string) {
  try {
    return await fetchWithTimeout(`${baseUrl}/api/workout/complete`, {
      method: "GET",
      headers: buildHeaders(token),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}
