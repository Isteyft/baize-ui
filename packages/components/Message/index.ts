import Message from "./methods";
import { withInstallFunction } from "@baize-ui/utils";

export const BaizeMessage = withInstallFunction(Message, "$message");

export * from "./types";
