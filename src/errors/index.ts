import { genericErrorHandler } from "./generic";
import { notFoundHandler } from "./not-found";

export const errorHandlers = [notFoundHandler, genericErrorHandler];