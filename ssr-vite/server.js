import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  try {
    const app = express()
    
    console.log('Creating Vite server...')
    
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    
    console.log('Vite server created successfully')
    
    // Use vite's connect instance as middleware
    app.use(vite.middlewares)
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl
      
      console.log(`Processing request: ${url}`)
      
      try {
        // 1. Read index.html
        const indexPath = path.resolve(__dirname, 'index.html')
        console.log(`Looking for index.html at: ${indexPath}`)
        
        if (!fs.existsSync(indexPath)) {
          throw new Error(`index.html not found at ${indexPath}`)
        }
        
        let template = fs.readFileSync(indexPath, 'utf-8')
        
        // 2. Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template)
        
        // 3. Load the server entry
        console.log('Loading server entry...')
        const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
        
        // 4. render the app HTML
        const appHtml = await render(url)
        
        // 5. Inject the app-rendered HTML into the template
        const html = template.replace(`<!--ssr-outlet-->`, appHtml)
        
        // 6. Send the rendered HTML back
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        console.error('Error processing request:', e)
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })
    
    const port = 5173
    const server = app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`)
    })
    
    // Handle server errors
    server.on('error', (err) => {
      console.error('Server error:', err)
      process.exit(1)
    })
    
  } catch (error) {
    console.error('Failed to create server:', error)
    process.exit(1)
  }
}

createServer().catch(err => {
  console.error('Unhandled error during server creation:', err)
  process.exit(1)
})