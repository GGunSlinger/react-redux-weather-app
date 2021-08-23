import { Intent, IToastProps, Position, Toaster } from "@blueprintjs/core";

interface IToastError extends Omit<IToastProps, "message"> {
  error?: string;
  message?: string;
}

const AppToaster = () => {
  const Toast = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
  });

  return {
    error: ({ error, message, ...args }: IToastError) => {
      return Toast.show({
        message: error ? error : message,
        intent: Intent.DANGER,
        ...args,
      });
    },
  };
};

export default AppToaster();
