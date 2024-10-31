import { useZustandFunctions as zustadFunctions } from "@/shared/application/state/useZustandFunctions";
import { Get, Set } from "@/shared/application/types/stateTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IRoleBase } from "../../domain/entities/Roles";

enum RolesStoreProps {
  AllRoles = "allRoles",
}

interface State {
  [RolesStoreProps.AllRoles]: IRoleBase[] | null;
}

const initialState: State = {
  [RolesStoreProps.AllRoles]: null,
};

interface StoredActions extends State {
  setRoles: (value: IRoleBase[]) => void;
}

const { setValue } = zustadFunctions<StoredActions, State>();

export const CreateRolesStore = (
  set: Set<StoredActions>,
  get: Get<StoredActions>
) => ({
  ...initialState,
  setRoles: setValue<IRoleBase[]>(RolesStoreProps.AllRoles)(set, get),
});

const persistedStore = persist(CreateRolesStore, {
  name: "RolesStore",
});

export const RolesStore = create(persistedStore);
