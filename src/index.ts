
import { NextMiddleware, NextResponse } from "next/server"

import { Middleware, NextRequestWithParams } from './types'
import { parse, findMiddleware, addParams, getParamsDescriptor } from "./utils";

export type { Middleware, NextMiddlewareWithParams, NextRequestWithParams } from './types'

export function handlePaths(middlewares: Middleware[]): NextMiddleware {
  return async function(req, ev) {
    const { path, domain } = parse(req)
    const middleware = findMiddleware(middlewares, { path, domain })

    if (middleware) {

      // if the middleware handler is a function 
      // we suppose it is a NextMiddleware or NextMiddlewareWithParams
      if (middleware.handler instanceof Function) {

        if (middleware.matcher) {
          // if is a path middleware
          // add params to the request
          const requestWithParams = addParams(req, middleware.matcher, path);

          return middleware.handler(requestWithParams, ev)
        }

        Object.defineProperty(req, 'params', getParamsDescriptor({}))

        return middleware.handler(req as NextRequestWithParams, ev)
      }

      // if the handler is an array of middlewares 
      // then use recursion to handle them
      return handlePaths(middleware.handler)(req, ev)
    }

    // if no middleware is found then continue the response pipe
    return NextResponse.next()
  }
}

