import {
  useSnackbar,
  OptionsObject,
  SnackbarKey,
  VariantType,
  ProviderContext,
} from "notistack";
import { appError } from "../core/util";

type Constructor<T = {}> = new (...args: any[]) => T;

export interface ProviderContextImpl {
  Success(message: string, option?: OptionsObject, key?: SnackbarKey);
  Info(message: string, option?: OptionsObject, key?: SnackbarKey);
  Error(message: string, option?: OptionsObject, key?: SnackbarKey);
  AppError(error: any, addtionalInfo?: any);
  Warning(message: string, option?: OptionsObject, key?: SnackbarKey);
}

export function useToast(): ProviderContextImpl {
  const toast = useSnackbar();
  return new SnackbarExtended(toast);
}

class SnackbarExtended implements ProviderContextImpl {
  constructor(context: ProviderContext) {
    this.context = context;
  }
  context: ProviderContext;
  Success(
    message: string,
    option?: OptionsObject | undefined,
    key?: string | number | undefined
  ) {
    this.Toast(message, "success", option, key);
  }
  Info(
    message: string,
    option?: OptionsObject | undefined,
    key?: string | number | undefined
  ) {
    this.Toast(message, "info", option, key);
  }
  Error(
    message: string,
    option?: OptionsObject | undefined,
    key?: string | number | undefined
  ) {
    this.Toast(message, "error", option, key);
  }
  AppError(error: any, addtionalInfo?: any) {
    if (error instanceof appError) {
      this.Toast(error.message, "error");
      console.error(error.message, error);
      return;
    }

    if (error.response) {
      const { code, message } = error.response.data;
      if (code && message) {
        this.Toast(`${code}:${message}`, "error");
        return;
      }
    }
    const message =
      "予期せぬ例外が発生しました。システム管理者までお問い合わせください。";
    console.error(message, { addtionalInfo, error });
    this.Toast(message, "error");
  }
  Warning(
    message: string,
    option?: OptionsObject | undefined,
    key?: string | number | undefined
  ) {
    this.Toast(message, "warning", option, key);
  }
  Toast(
    message: string,
    variant: VariantType,
    option?: OptionsObject,
    key?: SnackbarKey
  ) {
    option = option ?? {};

    if (!option.variant) {
      option.variant = variant;
    }
    if (!option.anchorOrigin) {
      option.anchorOrigin = { vertical: "top", horizontal: "center" };
    }

    // option.autoHideDuration = null;//トーストの表示秒数（デフォルトは5000秒、nullで開いたまま）

    option.style = { whiteSpace: "pre-line" };

    const { enqueueSnackbar, closeSnackbar } = this.context;
    message = message.replace(/Error:/g, "");
    enqueueSnackbar(message, {
      ...option,
      SnackbarProps: {
        onClick: () => {
          if (key) {
            closeSnackbar(key);
          } else {
            closeSnackbar();
          }
        },
      },
    });
    if (key) {
      closeSnackbar(key);
    }
  }
}
