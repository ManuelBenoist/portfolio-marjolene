/**
 * Composable for fetching JSON content from /public/content/
 * Works correctly during both SSR/SSG prerender and client-side navigation
 */

export function useContent<T>(filename: string) {
  return useAsyncData<T>(
    `content-${filename}`,
    async () => {
      // During prerendering, we need to read the file from the filesystem
      if (import.meta.server) {
        const { readFile } = await import('node:fs/promises')
        const { resolve } = await import('node:path')
        
        try {
          // Read from the public directory
          const filePath = resolve(process.cwd(), 'public', 'content', filename)
          const content = await readFile(filePath, 'utf-8')
          return JSON.parse(content) as T
        } catch (error) {
          // Fallback to fetch if file read fails
          return $fetch<T>(`/content/${filename}`)
        }
      }
      
      // Client-side: use regular fetch
      return $fetch<T>(`/content/${filename}`)
    },
    {
      // Ensure data is transferred from server to client
      transform: (data) => data,
    }
  )
}
