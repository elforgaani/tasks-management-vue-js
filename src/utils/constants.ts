import type { Status } from "@/types/status";

export const STATUS_VALUES: Record<Lowercase<Status>, Status> = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};
