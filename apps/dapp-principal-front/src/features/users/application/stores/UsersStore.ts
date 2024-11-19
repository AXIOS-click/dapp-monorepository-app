import { useZustandFunctions as zustadFunctions } from "@/shared/application/state/useZustandFunctions";
import { Get, Set } from "@/shared/application/types/stateTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserBase } from "../../domain/entities/User";

enum UserStoreProps {
  AllUsers = "allUsers",
}

interface State {
  [UserStoreProps.AllUsers]: IUserBase[] | null;
}

const initialState: State = {
  [UserStoreProps.AllUsers]: [],
};

interface StoredActions extends State {
  setUsers: (value: IUserBase[]) => void;
}

const { setValue } = zustadFunctions<StoredActions, State>();

export const CreateUsersStore = (
  set: Set<StoredActions>,
  get: Get<StoredActions>
) => ({
  ...initialState,
  setUsers: setValue<IUserBase[]>(UserStoreProps.AllUsers)(set, get),
});

const persistedStore = persist(CreateUsersStore, {
  name: "UsersStore",
});

export const UsersStore = create(persistedStore);
