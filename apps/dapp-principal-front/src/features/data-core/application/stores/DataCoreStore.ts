import { useZustandFunctions as zustadFunctions } from "@/shared/application/state/useZustandFunctions";
import { Get, Set } from "@/shared/application/types/stateTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDataCore } from "../../domain/entities/dataCore.entity";

enum RolesStoreProps {
  AllConfigSchematics = "allConfigSchematics",
}

interface State {
  [RolesStoreProps.AllConfigSchematics]: IDataCore | null;
}

const initialState: State = {
  [RolesStoreProps.AllConfigSchematics]: null,
};

interface StoredActions extends State {
  setConfigSchematics: (value: IDataCore) => void;
}

const { setValue } = zustadFunctions<StoredActions, State>();

export const CreateDataCoreStore = (
  set: Set<StoredActions>,
  get: Get<StoredActions>
) => ({
  ...initialState,
  setConfigSchematics: setValue<IDataCore>(RolesStoreProps.AllConfigSchematics)(
    set,
    get
  ),
});

const persistedStore = persist(CreateDataCoreStore, {
  name: "DataCoreStore",
});

export const DataCoreStore = create(persistedStore);
