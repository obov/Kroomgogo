import { JoinForm, LoginForm, OptionCreator } from "./types";

export const cls = (...classes: (string | undefined | boolean)[]) =>
  classes
    .filter((className) => className && typeof className === "string")
    .join(" ");

export const cycler = (cycle: number) => (num: number) =>
  ((num % cycle) + cycle) % cycle;

export const attachComma = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const optionCreator: OptionCreator =
  (option) =>
  (customOpts = {}) => {
    const [name, opts] = option;
    return [name, { ...opts, ...customOpts }];
  };

export const regOptLogin = {
  email: optionCreator<LoginForm>([
    "email",
    {
      required: "email이 입력되지 않았습니다.",
      pattern: {
        value:
          /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
        message: "email 형식을 확인해주세요",
      },
    },
  ]),
  password: optionCreator<LoginForm>([
    "password",
    {
      required: "비밀번호를 입력해주세요",
      pattern: {
        value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/i,
        message: "영문, 숫자, 특수문자를 조합해서 입력해주세요.",
      },
      minLength: {
        value: 8,
        message: "비밀번호는 최소 8자 이상 입력해 주세요",
      },
      maxLength: {
        value: 16,
        message: "비밀번호는 최대 16자 까지만 입력해 주세요",
      },
    },
  ]),
};
export const regOptJoin = {
  ...regOptLogin,
  size: optionCreator<JoinForm>(["size", {}]),
  age: [
    optionCreator<JoinForm>(["age.0", {}]),
    optionCreator<JoinForm>(["age.1", {}]),
    optionCreator<JoinForm>(["age.2", {}]),
  ],
  notification: [
    optionCreator<JoinForm>(["notification.0", {}]),
    optionCreator<JoinForm>(["notification.1", {}]),
  ],
};
export const colorDice = () => {
  const color = () =>
    Math.floor((0.7 + 0.3 * Math.random()) * 256).toString(16);
  return "#" + color() + color() + color();
};
