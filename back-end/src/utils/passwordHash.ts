import bcrypt from "bcrypt";

export const passwordHash = {
  create: (password: string) => {
    return bcrypt.hashSync(password, 10);
  },
  compare: (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  },
};
