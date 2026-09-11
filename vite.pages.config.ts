import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
export default defineConfig({root:root+'pages',base:'/pre-doc/',publicDir:root+'public',plugins:[react()],resolve:{alias:{'@':root,'next/dynamic':root+'pages/dynamic.tsx'}},define:{__PREDOC_BASE__:JSON.stringify('/pre-doc/'),__PREDOC_STATIC__:'true'},build:{outDir:root+'dist-pages',emptyOutDir:true}});
