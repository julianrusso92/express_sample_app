# Files that don't need to be tested
Below is a list of files that do not need to be tested:

- src/index.ts
- src/auth/auth.router.ts
- src/auth/auth.schemas.ts
- src/quotes/quotes.router.ts
- src/quotes/quotes.schemas.ts
- src/quotes/quotes.service.ts
- src/lib/prisma.ts
- src/lib/createServer.ts

These files do not have any custom behaviors that require a unit test.

## The file doesn't have custom behavior

```
// src/quotes/quotes.router.ts
import * as QuoteController from './quotes.controller'
import { CreateQuoteSchema, DeleteQuoteSchema } from './quotes.schemas'
import { Router } from 'express'
import { validate } from 'lib/middlewares'

const router = Router()

router.get('/', QuoteController.getAllQuotes)
router.post('/', validate(CreateQuoteSchema), QuoteController.createQuote)
router.delete('/:id', validate(DeleteQuoteSchema), QuoteController.deleteQuote)

export default router
```

```
// src/auth/auth.schemas.ts
import { z } from 'zod'
export const SignupSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string()
  })
})
export type SignupSchema = z.infer<typeof SignupSchema>['body']
export const SigninSchema = SignupSchema
export type SigninSchema = SignupSchema
```

In src/quotes/quotes.router.ts, the only things actually happening are invocations of functions provided by the Express framework. There are a few custom functions (validate and QuoteController.*) in play, however those are defined in separate files and will be tested in their own context.

The second file, src/auth/auth.schemas.ts, is very similar. While this file is important to the application, there really isn't anything here to test. The code simply exports schemas defined using the external module zod.

## The functions only invokes an external module

Another scenario that is important to point out is the one in src/quotes/quotes.service.ts:

```
// src/quotes/quotes.service.ts
import prisma from 'lib/prisma'

// ...

export const deleteQuote = async (id: number) => {
  return await prisma.quote.delete({
    where: { id }
  })
}
```
This service exports two functions. Both functions wrap a Prisma Client function invocation and return the results.

As was mentioned previously in this article, there is no need to test external code. For that reason this file can be skipped.

If you take a look at the remaining files from the list above that do not need tests, you will find each one does not need tests for one of the reasons outlined here.

## What you will test

- src/auth/auth.controller.ts
- src/auth/auth.service.ts
- src/lib/middlewares.ts
- src/lib/utility-classes.ts
- src/quotes/quotes.controller.ts
- src/quotes/tags.service.ts