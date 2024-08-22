import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        // environment: customEnvironment,
        environmentMatchGlobs: [
            ['./src/http/controllers/**', './src/vitest-environments/prisma.ts']
        ],
        dir: "src"
    }
})