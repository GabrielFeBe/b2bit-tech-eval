import { AppRouterContext, AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


// took me a while to find a way to mock a router in a test, but I found this solution in a github issue
// https://github.com/cypress-io/cypress/discussions/22715


const createRouter = (params: Partial<AppRouterInstance>) => ({
  back: cy.spy().as('back'),
  forward: cy.spy().as('forward'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  replace: cy.spy().as('replace'),
  refresh: cy.spy().as('refresh'),
  ...params,
})

interface MockNextRouterProps extends Partial<AppRouterInstance> {
  children: React.ReactNode
}

const MockNextRouter = ({ children, ...props }: MockNextRouterProps) => {
  const router = createRouter(props as AppRouterInstance)

  return (
      <AppRouterContext.Provider value={router}>
          {children}
      </AppRouterContext.Provider>
  )
}

export default MockNextRouter