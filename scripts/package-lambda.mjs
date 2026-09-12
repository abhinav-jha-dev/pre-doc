import {execFileSync} from 'node:child_process';
import {rmSync} from 'node:fs';
rmSync('dist-lambda/predoc-lambda.zip',{force:true});
execFileSync('zip',['-q','predoc-lambda.zip','index.mjs'],{cwd:'dist-lambda',stdio:'inherit'});
console.log('Created dist-lambda/predoc-lambda.zip');
