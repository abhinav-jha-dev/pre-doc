import {defineConfig} from 'vite';
export default defineConfig({publicDir:false,ssr:{noExternal:true},build:{ssr:'deployment/lambda/handler.ts',outDir:'dist-lambda',emptyOutDir:true,target:'node22',minify:false,rollupOptions:{output:{entryFileNames:'index.mjs'}}}});
