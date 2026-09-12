import {lazy,Suspense,ComponentType} from 'react';
export default function dynamic<P extends object>(loader:()=>Promise<{default:ComponentType<P>}>,options:{ssr?:boolean;loading?:ComponentType}={}){const Component=lazy(loader),Loading=options.loading;return function Dynamic(props:P){return <Suspense fallback={Loading?<Loading/>:null}><Component {...props}/></Suspense>;};}
