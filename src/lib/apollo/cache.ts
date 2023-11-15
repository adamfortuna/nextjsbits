import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr"
import { createFragmentRegistry } from "@apollo/client/cache"
import fragments from "@/queries/fragments"

const cache = new NextSSRInMemoryCache({
  fragments: createFragmentRegistry(fragments),
});

export default cache;
