import {
  storeInLocalStorage,
  retrieveFromLocalStorage,
  deleteFromLocalStorage,
} from "@/lib/localStorage";
import {
  PasswordStepData,
  TenantStepData,
  UserStepData,
} from "../_validations/signup-validation";

const STORAGE_KEY = "signup-data";

export interface SignUpDraft {
  user?: UserStepData;
  password?: PasswordStepData;
  tenant?: TenantStepData;
}

// type SignUpDraft = Partial<UserStepData & PasswordStepData & TenantStepData>;

export const SignUpStorage = {
  save: (data: SignUpDraft) => {
    const prev = SignUpStorage.get() || {};
    storeInLocalStorage(STORAGE_KEY, { ...prev, ...data });
  },
  get: (): SignUpDraft | null => retrieveFromLocalStorage(STORAGE_KEY),
  clear: () => deleteFromLocalStorage(STORAGE_KEY),
};
