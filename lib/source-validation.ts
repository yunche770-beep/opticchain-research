export const allowedHosts=['static.cninfo.com.cn','www.sec.gov','www.coherent.com','ir.coherent.com','investor.lumentum.com','www.arista.com','investors.arista.com','investors.broadcom.com','www.marvell.com','investor.marvell.com','nvidianews.nvidia.com','abc.xyz'];
export function validateSource(input:unknown){
 const s=input as Record<string,unknown>;
 if(!s||typeof s.url!=='string')throw new Error('来源格式无效');
 let u:URL;try{u=new URL(s.url);}catch{throw new Error('来源 URL 无效');}
 if(u.protocol!=='https:'||u.username||u.password||u.port||!allowedHosts.includes(u.hostname))throw new Error('来源必须为台账中官方域名的 HTTPS 地址，不支持私网或任意网址');
 for(const [key,min,max] of [['title',4,160],['date',10,10],['period',4,80],['locator',2,200],['summary',8,1200]] as const){if(typeof s[key]!=='string'||(s[key] as string).trim().length<min||(s[key] as string).length>max)throw new Error(`来源 ${key} 字段长度无效`);}
 const date=s.date as string;if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||date>new Date().toISOString().slice(0,10))throw new Error('披露日期无效或晚于今天');
 return {id:'U'+crypto.randomUUID().slice(0,8),url:u.href,title:(s.title as string).trim(),date,period:s.period as string,locator:s.locator as string,summary:s.summary as string,publisher:u.hostname,type:'用户补充 · 待核验'};
}
