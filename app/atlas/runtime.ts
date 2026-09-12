declare const __PREDOC_BASE__: string;
declare const __PREDOC_STATIC__: boolean;
export const staticSite=typeof __PREDOC_STATIC__!=='undefined'&&__PREDOC_STATIC__;
export function assetUrl(path:string){const base=typeof __PREDOC_BASE__==='undefined'?'/':__PREDOC_BASE__;return base+path.replace(/^\//,'');}

declare const __PREDOC_API_URL__:string;
export const hostedApi=typeof __PREDOC_API_URL__!=='undefined'?__PREDOC_API_URL__:'';
