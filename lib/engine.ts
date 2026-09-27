import { companies, sources, comparisons, events, sourceById, levels, type EvidenceLevel } from './research-data';
export function scenario(capex:number,exposure:number,elasticity:number,price:number,cost:number,material:number,baseMargin=34.65){
  const inputs=[capex,exposure,elasticity,price,cost,material,baseMargin];
  if(inputs.some(v=>!Number.isFinite(v)) || exposure<0 || exposure>100 || material<0 || material>100 || baseMargin<0 || baseMargin>100 || price<=-100 || capex<=-100 || elasticity<0) throw new Error('情景参数超出有效范围');
  const volume=1+capex/100*exposure/100*elasticity;
  const revenue=volume*(1+price/100)*100;
  const cogs=volume*(1-baseMargin/100)*(1+cost/100*material/100)*100;
  const margin=(revenue-cogs)/revenue*100;
  return {volume:(volume-1)*100,revenue,revenueChange:revenue-100,margin,marginChange:margin-baseMargin,grossProfit:revenue-cogs,baseProfit:baseMargin};
}
export type ResearchAnswer={title:string;summary:string;facts:string[];inferences:string[];limits:string[];sources:string[];mode:string};
export function research(question:string):ResearchAnswer{
 const q=question.trim();
 if(/买入|卖出|目标价|涨停|内幕|荐股|翻倍|保证收益|必涨/.test(q)) return {title:'将交易问题转为可核验的研究问题',summary:'本产品不生成个性化交易指令、目标价或收益保证。可以查询业务证据、可比边界和事件传导。',facts:[],inferences:[],limits:['没有行情、估值模型和个人风险资料，不能据此给出交易建议。'],sources:[],mode:'规则检索 · 演示'};
 if(/资本|capex|Alphabet|谷歌|传导|需求/i.test(q)){ const e=events[0];return {title:e.title,summary:e.fact,facts:['该数值是 2025 Q2 电话会时点的全年资本开支指引，不是最终实际值。'],inferences:['网络采购占比上升且客户份额保持时，高速光模块订单可能受益。','出货结构、价格和良率共同影响毛利；库存先行扩张可能占用现金。'],limits:[e.boundary],sources:['S10','S01','S02'],mode:'规则检索 · 演示'};}
 if(/可比|比较|对比/i.test(q)){ const c=/天孚/i.test(q)?comparisons[2]:/新易盛|Coherent/i.test(q)?comparisons[1]:comparisons[0];return {title:c.title,summary:c.reason,facts:c.rows.map(r=>`${r[0]}：${r[1]} / ${r[2]}`),inferences:[c.verdict],limits:['未统一汇率、财年及会计调整，禁止把原币金额直接排名。'],sources:c.sources,mode:'规则检索 · 演示'};}
 if(/CPO|硅光|光源|替代/i.test(q)) return {title:'CPO 关系要落实到具体产品和时点',summary:'官方合作名单能支持合作关系，不能证明合同金额或已形成收入。',facts:[events[1].fact],inferences:['光源、光引擎和封装的价值分配可能改变；成熟度、良率和可靠性影响采用速度。'],limits:[events[1].boundary,'当前历史资料不证明最新量产状态。'],sources:['S09','S07'],mode:'规则检索 · 演示'};
 const c=companies.find(c=>q.includes(c.name)||q.toLowerCase().includes(c.ticker.toLowerCase()));
 if(c) return {title:`${c.name}的业务关系`,summary:c.business,facts:[`证据状态：${levels[c.level].name}`,...(c.metric?[`${c.metric.period} · ${c.metric.label} ${c.metric.value.toFixed(2)} ${c.metric.unit}`]:[])],inferences:['公司归属按具体产品与功能判断，不能只依赖概念板块标签。'],limits:[c.limit],sources:c.sources,mode:'规则检索 · 演示'};
 return {title:'当前证据库不足以直接回答',summary:'请指定公司、跨市场比较、CPO 或资本开支传导。系统不会为未覆盖问题补造结论。',facts:[],inferences:[],limits:['覆盖 10 家公司与 2024–2025 历史公开材料，并非全市场实时检索。'],sources:[],mode:'规则检索 · 演示'};
}
export type EvidenceInput={companyId:string;sourceId:string;level:EvidenceLevel;summary:string;locator:string;period:string};
export function validateEvidence(x:unknown,extraSourceIds:string[]=[]):EvidenceInput {
 const v=x as EvidenceInput;
 if(!v || !companies.some(c=>c.id===v.companyId) || !(sources.some(s=>s.id===v.sourceId)||extraSourceIds.includes(v.sourceId)) || !Object.hasOwn(levels,v.level)) throw new Error('公司、来源或证据等级无效');
 if(typeof v.summary!=='string'||v.summary.trim().length<8||v.summary.length>1200) throw new Error('证据摘要需为 8–1200 字符');
 if(typeof v.locator!=='string'||v.locator.trim().length<2||v.locator.length>200) throw new Error('请填写原文页码或章节（2–200 字符）');
 if(typeof v.period!=='string'||v.period.trim().length<4||v.period.length>80) throw new Error('请填写报告期或证据时点');
 return {companyId:v.companyId,sourceId:v.sourceId,level:v.level,summary:v.summary.trim(),locator:v.locator.trim(),period:v.period.trim()};
}
export function modelContext(question:string){return JSON.stringify({question,dataAsOf:'2025-08-31',companies,sources:sources.map(s=>({id:s.id,title:s.title,summary:s.summary,url:s.url})),comparisons,events});}
export function validateModelAnswer(value:unknown):ResearchAnswer {
 const v=value as ResearchAnswer;
 if(!v || typeof v.title!=='string'||typeof v.summary!=='string'|| !['facts','inferences','limits','sources'].every(k=>Array.isArray((v as any)[k]) && (v as any)[k].every((s:unknown)=>typeof s==='string'))) throw new Error('模型返回结构无效');
 if(v.sources.some(id=>!sources.some(s=>s.id===id)) || (v.facts.length>0&&!v.sources.length)) throw new Error('模型引用缺失或无效');
 if(JSON.stringify(v).length>18000) throw new Error('模型结果过长');
 return {...v,mode:'模型生成 · 待人工核验',limits:[...v.limits,'引用编号校验不等于逐句事实校验；模型结论需人工复核。']};
}

