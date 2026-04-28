declare module "cors" {
  import { RequestHandler } from "express";

  type CorsOrigin =
    | boolean
    | string
    | RegExp
    | Array<boolean | string | RegExp>
    | ((origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => void);

  interface CorsOptions {
    origin?: CorsOrigin;
    credentials?: boolean;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    maxAge?: number;
    optionsSuccessStatus?: number;
  }

  function cors(options?: CorsOptions): RequestHandler;

  export default cors;
}
