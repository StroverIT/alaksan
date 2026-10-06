import type { FoamType } from "@prisma/client";

export type TConfiguratorFormProps = {
  foamTypes: FoamType[];
  embedded?: boolean;
};

export type TConfiguratorStep = 1 | 2 | 3 | 4;
