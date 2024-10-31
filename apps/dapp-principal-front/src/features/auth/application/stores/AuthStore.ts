import { IUserBase } from "@/features/users/domain/entities/User";
import { useZustandFunctions as zustadFunctions } from "@/shared/application/state/useZustandFunctions";
import { Get, Set } from "@/shared/application/types/stateTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

enum AuthStoreProps {
  UserSession = "userSession",
  SignedUser = "signedUser",
  TokenSession = "tokenSession",
}

interface State {
  [AuthStoreProps.UserSession]: IUserBase | null;
  [AuthStoreProps.SignedUser]: boolean;
  [AuthStoreProps.TokenSession]: string;
}

const initialState: State = {
  [AuthStoreProps.UserSession]: null,
  [AuthStoreProps.SignedUser]: false,
  [AuthStoreProps.TokenSession]: "",
};

interface StoredActions extends State {
  setUserSession: (value: Partial<IUserBase>) => void;
  toggleSignedUser: () => void;
  logout: () => void;
  setTokenSession: (value: string) => void;
}

const { setValue, toggleValue } = zustadFunctions<StoredActions, State>();

export const CreateAuthStore = (
  set: Set<StoredActions>,
  get: Get<StoredActions>
) => ({
  ...initialState,
  setUserSession: setValue<Partial<IUserBase>>(AuthStoreProps.UserSession)(
    set,
    get
  ),
  toggleSignedUser: toggleValue(AuthStoreProps.SignedUser)(set, get),
  logout: () => {
    set({ [AuthStoreProps.UserSession]: null });
    set({ [AuthStoreProps.SignedUser]: false });
    set({ [AuthStoreProps.TokenSession]: "" });
  },
  setTokenSession: setValue<string>(AuthStoreProps.TokenSession)(set, get),
});

const persistedStore = persist(CreateAuthStore, {
  name: "AuthStore",
});

export const AuthStore = create(persistedStore);
