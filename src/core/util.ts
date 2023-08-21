export class util {
  public static throwAppError(message: string) {
    throw new appError(message);
  }
}

export class appError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function sleep(msec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, msec);
  });
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
