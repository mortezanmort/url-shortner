const generateRandomSlug = (length: number): string => {
  const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug: string = "";
  for (let i: number = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
};

export { generateRandomSlug };
