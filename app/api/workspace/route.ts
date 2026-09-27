import {bindings,session,json,body,sameOrigin,limit,record} from '@/lib/server';
import {validateEvidence} from '@/lib/engine';
import {validateSource} from '@/lib/source-validation';
export async function GET(req:Request){const id=session(req);try{const {results}=await bindings().DB.prepare('SELECT id,kind,payload,status,created_at AS createdAt FROM research_records WHERE workspace=? ORDER BY created_at DESC LIMIT 500').bind(id).all();return json(req,id,{records:results.map((r:any)=>({...r,payload:JSON.parse(r.payload)}))});}catch{return json(req,id,{error:'研究记录暂不可用。原始证据库仍可使用，请稍后重试。'},503);}}
export async function POST(req:Request){const id=session(req);if(!sameOrigin(req))return json(req,id,{error:'请求来源无效'},403);try{const db=bindings().DB;await limit(db,id);const b=await body(req);if(b.action==='add'){
 const custom=b.source?validateSource(b.source):null;
 const known=await db.prepare("SELECT payload FROM research_records WHERE workspace=? AND kind='source' LIMIT 400").bind(id).all<{payload:string}>();
 const ids=known.results.map(r=>JSON.parse(r.payload).id);
 const item=validateEvidence(custom?{...b.evidence,sourceId:custom.id}:b.evidence,custom?[...ids,custom.id]:ids);
 if(custom)await record(db,id,'source',custom,'pending');
 return json(req,id,{record:await record(db,id,'evidence',item,'pending')});
 }if(b.action==='review'){if(!['accepted','rejected'].includes(b.status)||typeof b.id!=='string')throw new Error('复核参数无效');const row=await db.prepare("UPDATE research_records SET status=? WHERE id=? AND workspace=? AND kind='evidence' AND status='pending' RETURNING id").bind(b.status,b.id,id).first();if(!row)return json(req,id,{error:'记录不存在或已复核'},409);await record(db,id,'audit',{recordId:b.id,decision:b.status},'recorded');return json(req,id,{ok:true});}throw new Error('未知操作');}catch(e){const message=e instanceof Error?e.message:'保存失败';return json(req,id,{error:message.includes('D1')?'云端保存失败，请保留输入后重试':message},400);}}
