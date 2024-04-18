export const isValidURL = (urlString: string): boolean => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
export const ServerURL = "http://localhost:8000";
