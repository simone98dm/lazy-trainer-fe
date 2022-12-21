import { baseUrl } from "~/utils";
import { notificationClient } from "~/utils/supabase";
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
    return await fetch(`${baseUrl}/api/user/info?user=${trainerId}`, {
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

export async function markNotificationsAsRead(userId: string, id: string) {
  try {
    const { data, error } = await notificationClient
      .from("notifications")
      .update({ read_at: new Date() })
      .eq("userId", userId)
      .or(`id.eq.broadcast,id.eq.${id}`);

    if (error) {
      throw error;
    }
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getConfiguration(token: string) {
  try {
    return await fetch(`${baseUrl}/api/user`, {
      method: "GET",
      headers: buildHeaders(token),
    }).then((response) => response.json());
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function saveConfiguration(token: string, data: any) {
  try {
    return await fetch(`${baseUrl}/api/user`, {
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
    return await fetch(`${baseUrl}/api/workout/complete`, {
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
    return await fetch(`${baseUrl}/api/workout/complete`, {
      method: "GET",
      headers: buildHeaders(token),
    });
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}
