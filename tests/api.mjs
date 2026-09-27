import assert from 'node:assert/strict';import {writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:5174';let cookie='';const results=[];
async function call(path,body,extra={}){const r=await fetch(base+path,{method:body?'POST':'GET',headers:{...(cookie?{cookie}:{}),'content-type':'application/json',...extra},...(body?{body:JSON.stringify(body)}:{})});if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];return {status:r.status,data:r.headers.get('content-type')?.includes('json')?await r.json():await r.text()};}
async function test(name,fn){try{await fn();results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:e.message});}}
await test('匿名工作区创建与读取',async()=>{const r=await call('/api/workspace');assert.equal(r.status,200);assert(cookie.startsWith('optic_workspace='));});
await test('无 API 演示问答',async()=>{const r=await call('/api/research',{question:'中际旭创 AI 收入',mode:'demo'});assert.equal(r.status,200);assert(r.data.answer.limits.join('').includes('未单列'));});
await test('未配置模型明确回退',async()=>{const r=await call('/api/research',{question:'资本开支传导',mode:'live'});assert.equal(r.status,200);assert(r.data.notice.includes('未配置'));});
const evidence={companyId:'innolight',sourceId:'S01',level:'revenue',summary:'测试记录：模块收入不等于 AI 专属收入',locator:'PDF 第26页',period:'2024年度'};
await test('缺少定位的证据拒绝',async()=>assert.equal((await call('/api/workspace',{action:'add',evidence:{...evidence,locator:''}})).status,400));
let recordId;
await test('新增证据进入待复核',async()=>{const r=await call('/api/workspace',{action:'add',evidence});assert.equal(r.status,200);assert.equal(r.data.record.status,'pending');recordId=r.data.record.id;});
await test('采纳后持久读取并留痕',async()=>{assert.equal((await call('/api/workspace',{action:'review',id:recordId,status:'accepted'})).status,200);const r=await call('/api/workspace');assert(r.data.records.some(x=>x.id===recordId&&x.status==='accepted'));assert(r.data.records.some(x=>x.kind==='audit'&&x.payload.recordId===recordId));});
await test('重复复核冲突',async()=>assert.equal((await call('/api/workspace',{action:'review',id:recordId,status:'accepted'})).status,409));
await test('工作区隔离',async()=>{const saved=cookie;cookie='';const r=await call('/api/workspace');assert(!r.data.records.some(x=>x.id===recordId));cookie=saved;});
await test('跨域修改拒绝',async()=>assert.equal((await call('/api/workspace',{action:'add'},{origin:'https://evil.example'})).status,403));
await test('未知来源检查拒绝',async()=>assert.equal((await call('/api/check',{sourceId:'http://127.0.0.1'})).status,400));
await test('新官方来源与证据保存',async()=>{const r=await call('/api/workspace',{action:'add',source:{url:'https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory',title:'测试：2026 官方进展资料',date:'2026-05-31',period:'2026-05-31',locator:'Spectrum-X 段落',summary:'测试：产品生产阶段不等同于披露收入'},evidence:{...evidence,companyId:'nvidia',level:'product'}});assert.equal(r.status,200);assert(r.data.record.payload.sourceId.startsWith('U'));});
await writeFile('docs/api-test-results.json',JSON.stringify({at:new Date().toISOString(),base,results},null,2));results.forEach(r=>console.log(r.status+' '+r.name));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;

