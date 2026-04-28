declare module "cors" {
  import { RequestHandler } from "express";

  interface CorsOptions {
    origin?: boolean | string | RegExp | Array<boolean | string | RegExp>;
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
