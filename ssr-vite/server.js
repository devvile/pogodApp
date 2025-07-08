import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function serializeState(state) {
  return JSON.stringify(state).replace(/</g, '\\u003c')
}

async function createServer() {
  try {
    const app = express()   
    console.log('Creating Vite server...')
    
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    
    console.log('Vite server created successfully')
    
    app.use(vite.middlewares)
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl
      
      if (
        url.includes('.well-known') ||
        url.includes('favicon.ico') ||
        url.includes('manifest.json') ||
        url.startsWith('/api/') ||
        url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
      ) {
        return next()
      }
      
      console.log(`\n🔍 Processing SSR request: ${url}`)
      
      try {
        // 1. Read index.html
        const indexPath = path.resolve(__dirname, 'index.html')
        console.log(`📄 Looking for index.html at: ${indexPath}`)
        
        if (!fs.existsSync(indexPath)) {
          throw new Error(`index.html not found at ${indexPath}`)
        }
        
        let template = fs.readFileSync(indexPath, 'utf-8')
        console.log('📄 Original template length:', template.length)
        
        // 2. Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template)
        console.log('📄 After Vite transform length:', template.length)
        
        // 3. Load the server entry
        console.log('📦 Loading server entry...')
        const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
        
        console.log('🎨 Rendering app with Redux store...')
        const { html: appHtml, preloadedState } = await render(url)
        
        // 5. Create the script tag with serialized Redux state
        const serializedState = serializeState(preloadedState)
        const stateScript = `
          <script>
            console.log('🚀 State script executing...');
            window.__PRELOADED_STATE__ = ${serializedState};
            console.log('📦 Set window.__PRELOADED_STATE__:', window.__PRELOADED_STATE__);
          </script>
        `
        console.log('📜 State script to inject:')
        console.log(stateScript)
        
        // 6. Inject the app-rendered HTML into the template
        let html = template.replace(`<!--ssr-outlet-->`, appHtml)
        console.log('✅ Injected app HTML into template')
                
        // 🔍 DEBUG: Check if state script was actually injected
        if (html.includes('window.__PRELOADED_STATE__')) {
          console.log('✅ State script successfully injected into HTML')
        } else {
          console.log('❌ State script NOT found in final HTML')
        }
        
        const headMatch = html.match(/<head>[\s\S]*?<\/head>/);
        if (headMatch) {
          console.log('📄 Final <head> section:')
          console.log(headMatch[0])
        }
        
        console.log('✅ SSR rendering completed successfully\n')
        
        // 8. Send the rendered HTML back
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        console.error('❌ Error processing request:', e)
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })
    
    const port = 5173
    const server = app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`)
    })
    
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