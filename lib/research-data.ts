export const SNAPSHOT = '2025-08-31';
export const VERIFIED = '2026-09-27';
export type EvidenceLevel = 'revenue' | 'product' | 'validation' | 'statement' | 'none';
export const levels: Record<EvidenceLevel, {name:string; short:string; color:string; rule:string}> = {
  revenue:{name:'已披露相关收入',short:'收入证据',color:'green',rule:'有相应产品或业务口径的收入；不能自动等同于 AI 专属收入。'},
  product:{name:'明确产品 / 供货',short:'产品证据',color:'blue',rule:'官方材料明确产品、供货或合作；相关收入未单独量化。'},
  validation:{name:'送样 / 验证',short:'验证阶段',color:'purple',rule:'明确样品、试产或验证；不视为规模销售。'},
  statement:{name:'规划 / 表态',short:'规划表态',color:'amber',rule:'仅披露计划、研发方向或未来供应时间。'},
  none:{name:'未找到充分证据',short:'证据不足',color:'gray',rule:'仅指当前材料不足以支持该项关系，不证明不存在业务。'},
};
export const sources = [
 {id:'S01',title:'中际旭创 2024 年年度报告',publisher:'巨潮资讯 · 公司公告',date:'2025-04-21',period:'2024-01-01 — 2024-12-31',url:'https://static.cninfo.com.cn/finalpage/2025-04-21/1223155483.PDF',locator:'PDF 第 24–29 页；收入构成第 26 页',type:'监管披露',summary:'光通信收发模块收入 228.86 亿元，占总收入 95.91%；800G/400G 产品结构改善。'},
 {id:'S02',title:'新易盛 2024 年年度报告',publisher:'巨潮资讯 · 公司公告',date:'2025-04-23',period:'2024-01-01 — 2024-12-31',url:'https://static.cninfo.com.cn/finalpage/2025-04-23/1223219348.PDF',locator:'PDF 第 11、14–16 页',type:'监管披露',summary:'点对点光模块收入 85.92 亿元，占比 99.36%；披露高速光模块产品及批量交付能力。'},
 {id:'S03',title:'天孚通信 2024 年年度报告',publisher:'巨潮资讯 · 公司公告',date:'2025-04-21',period:'2024 年度',url:'https://static.cninfo.com.cn/finalpage/2025-04-21/1223152632.PDF',locator:'公司基本情况，第 141 页',type:'监管披露',summary:'定位光器件整体解决方案及光电先进封装服务，归属器件及封装环节。'},
 {id:'S04',title:'Coherent FY2025 Form 10-K',publisher:'Coherent · 投资者关系',date:'2025-08-14',period:'截至 2025-06-30 的财年',url:'https://www.coherent.com/content/dam/coherent/site/en/documents/investors/annual-filings/2025/coherent-annual-report-2025.pdf',locator:'MD&A / Results of Operations / Networking',type:'监管披露',summary:'Networking 增长由 AI 数据中心与电信推动；激光与材料业务使公司整体口径不可直接类比模块厂。'},
 {id:'S05',title:'Lumentum FY2025 业绩公告',publisher:'Lumentum · 投资者关系',date:'2025-08-12',period:'截至 2025-06-28 的财年',url:'https://investor.lumentum.com/financial-news-releases/news-details/2025/Lumentum-Announces-Fourth-Quarter-and-Full-Fiscal-Year-2025-Results/',locator:'Financial Overview / Net Revenue by Segment',type:'公司财报',summary:'Cloud & Networking 收入 14.108 亿美元；范围包含云与电信，不能作为 AI 收入。'},
 {id:'S06',title:'Arista 2024 全年业绩公告',publisher:'Arista · 官方新闻',date:'2025-02-18',period:'2024-01-01 — 2024-12-31',url:'https://www.arista.com/en/company/news/press-release/21096-pr-20250218',locator:'Full Year Financial Results',type:'公司财报',summary:'全年收入 70.03 亿美元，GAAP 毛利率 64.1%；覆盖多类网络业务。'},
 {id:'S07',title:'Broadcom Tomahawk 6 发布',publisher:'Broadcom · 官方新闻',date:'2025-06-03',period:'产品发布时点',url:'https://investors.broadcom.com/news-releases/news-release-details/broadcom-ships-tomahawk-6-worlds-first-1024-tbps-switch',locator:'首段 / 产品特性',type:'官方产品材料',summary:'宣布交付 102.4 Tbps 交换芯片，支持 CPO。产品披露不等于该产品收入披露。'},
 {id:'S08',title:'Marvell Nova 2 DSP 发布',publisher:'Marvell · 官方新闻',date:'2024-03-25',period:'发布时点；2024 Q2 送样计划',url:'https://www.marvell.com/company/newsroom/marvell-extends-connectivity-leadership-with-industrys-first-pam4-optical-dsp.html',locator:'Availability / InnoLight 合作引述',type:'官方产品材料',summary:'1.6T Nova 2 在当时公告中处于送样计划；不能以同系列 Nova 的上市状态替代 Nova 2。'},
 {id:'S09',title:'NVIDIA 硅光交换机发布',publisher:'NVIDIA · Newsroom',date:'2025-03-18',period:'发布时点；2026 年产品计划',url:'https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories',locator:'合作方名单 / Availability',type:'官方产品材料',summary:'公布 Spectrum-X Photonics；列明 Coherent 与 Lumentum 等合作方，发布时预告 2026 年供货。'},
 {id:'S10',title:'Alphabet 2025 Q2 业绩电话会',publisher:'Alphabet · 投资者关系',date:'2025-07-23',period:'2025 Q2；2025 年资本开支指引',url:'https://abc.xyz/investor/events/event-details/2025/2025-Q2-Earnings-Call/',locator:'CFO / Moving to investments',type:'公司业绩指引',summary:'将 2025 年资本开支预期从 750 亿美元上调至约 850 亿美元；这是当时指引，不是实际支出。'},
];
export type Source = typeof sources[number];
export const stages = [
 {id:'chip',name:'芯片与光源',sub:'DSP · 交换芯片 · 激光器',layer:'上游',detail:'提供信号处理、电交换与发光能力。按功能区分 DSP、交换 ASIC 与激光芯片；同为芯片不代表可直接估值比较。'},
 {id:'component',name:'器件与封装',sub:'光器件 · 光引擎 · 精密封装',layer:'上游',detail:'实现耦合、连接和光电封装。服务或器件价值量与完整光模块不同；不能把 CPO 概念直接转成 CPO 收入。'},
 {id:'module',name:'光模块',sub:'400G · 800G · 1.6T',layer:'中游',detail:'实现电光转换，以速率、距离、封装及客户场景细分。可插拔、LPO 与 CPO 是不同架构，不相互等同。'},
 {id:'network',name:'交换系统',sub:'以太网 · InfiniBand · CPO',layer:'下游',detail:'整合芯片、光互连与网络软件。系统供应商包含软硬件收入，不能直接对照模块厂毛利率。'},
 {id:'cloud',name:'算力需求',sub:'云厂商 · 数据中心资本开支',layer:'需求端',detail:'提供需求信号。总资本开支还包含服务器、建筑和电力，不等于网络采购；环节连接不证明指定公司间供货。'},
];
export type Company = {id:string;name:string;en:string;ticker:string;market:string;stages:string[];level:EvidenceLevel;business:string;limit:string;sources:string[];metric?:{label:string;value:number;unit:string;share?:number;margin?:number;period:string;source:string};tags:string[]};
export const companies:Company[] = [
 {id:'innolight',name:'中际旭创',en:'InnoLight',ticker:'300308.SZ',market:'A股',stages:['module'],level:'revenue',business:'高速光通信收发模块，面向数据中心与通信网络。',limit:'光通信收发模块收入包含多个速率与场景，未单列 AI 专属收入；客户 A–E 不可推定为具体云厂商。',sources:['S01','S08'],metric:{label:'光通信收发模块收入',value:228.8575672793,unit:'亿元 CNY',share:95.91,margin:34.65,period:'2024 年度',source:'S01'},tags:['800G','1.6T','硅光']},
 {id:'eoptolink',name:'新易盛',en:'Eoptolink',ticker:'300502.SZ',market:'A股',stages:['module'],level:'revenue',business:'点对点光模块，覆盖数据中心、AI/ML 与电信网络。',limit:'点对点收入不是纯 AI 收入；产品目录中的 1.6T 不足以量化该产品收入或出货。',sources:['S02'],metric:{label:'点对点光模块收入',value:85.9170891712,unit:'亿元 CNY',share:99.36,margin:44.88,period:'2024 年度',source:'S02'},tags:['800G','1.6T','LPO']},
 {id:'tfc',name:'天孚通信',en:'TFC',ticker:'300394.SZ',market:'A股',stages:['component'],level:'product',business:'光器件整体解决方案与光电先进封装制造服务。',limit:'本样本未抽取细分收入；器件及封装能力不等于已披露 CPO 收入。',sources:['S03'],tags:['光器件','封装']},
 {id:'coherent',name:'Coherent',en:'Coherent Corp.',ticker:'COHR',market:'美股',stages:['chip','component','module'],level:'revenue',business:'光源、器件、光模块及通信解决方案，覆盖多个产业。',limit:'Networking 包含数通与电信；另有激光和材料业务，不能拿集团整体做模块纯业务比较。',sources:['S04','S09'],tags:['光源','光模块','硅光']},
 {id:'lumentum',name:'Lumentum',en:'Lumentum Holdings',ticker:'LITE',market:'美股',stages:['chip','module'],level:'revenue',business:'EML 等光学元件及云网络光模块。',limit:'Cloud & Networking 同时包含云与电信；财年截止日与 A 股不同。',sources:['S05','S09'],metric:{label:'Cloud & Networking 收入',value:14.108,unit:'亿美元 USD',share:85.7629,period:'FY2025 · 截至 06-28',source:'S05'},tags:['EML','800G','光源']},
 {id:'marvell',name:'Marvell',en:'Marvell Technology',ticker:'MRVL',market:'美股',stages:['chip'],level:'validation',business:'面向高速光互连的 PAM4 DSP；本证据卡聚焦 Nova 2。',limit:'状态仅针对 2024-03 发布材料中的 Nova 2。历史送样状态不代表公司当前整体进度。',sources:['S08'],tags:['DSP','1.6T','历史送样']},
 {id:'broadcom',name:'Broadcom',en:'Broadcom Inc.',ticker:'AVGO',market:'美股',stages:['chip'],level:'product',business:'Tomahawk 6 交换 ASIC，服务大规模 AI 网络。',limit:'产品交付有官方证据；本材料未披露该系列收入，集团还包含基础设施软件等业务。',sources:['S07'],tags:['交换ASIC','102.4T','CPO']},
 {id:'arista',name:'Arista',en:'Arista Networks',ticker:'ANET',market:'美股',stages:['network'],level:'revenue',business:'数据中心及企业网络系统，配套网络软件。',limit:'70.03 亿美元为集团收入，覆盖园区等非 AI 场景；软件与系统价值不同于光模块。',sources:['S06'],metric:{label:'集团营业收入（非 AI 专属）',value:70.03,unit:'亿美元 USD',margin:64.1,period:'2024 年度',source:'S06'},tags:['以太网','交换系统']},
 {id:'nvidia',name:'NVIDIA',en:'NVIDIA Corporation',ticker:'NVDA',market:'美股',stages:['network'],level:'statement',business:'Spectrum-X Photonics 硅光交换机，提供 AI 网络系统。',limit:'状态针对 2025-03 公告中的 2026 年供应计划；不能据此宣称当时已有该产品收入。',sources:['S09'],tags:['CPO','硅光','历史规划']},
 {id:'alphabet',name:'Alphabet',en:'Alphabet Inc.',ticker:'GOOGL',market:'美股',stages:['cloud'],level:'none',business:'云和 AI 基础设施需求侧，作为资本开支信号源。',limit:'未找到其对外销售光模块的充分证据；需求侧归属不意味着光模块供应商。',sources:['S10'],tags:['云资本开支','需求信号']},
];
export const comparisons = [
 {id:'module',title:'中际旭创 × Lumentum',left:'innolight',right:'lumentum',grade:'产品可比 · 财务需调整',reason:'两者均参与高速数据中心光模块，可比较速率迭代、产品结构及客户认证要求。',rows:[['比较对象','光通信收发模块','Cloud & Networking'],['重合业务','高速数据中心光模块','高速模块及光学元件'],['非重合部分','其他速率、电信场景','电信、激光器及其他元件'],['财务期间','2024 自然年','FY2025，截至 2025-06-28'],['币种与准则','人民币 · 中国会计准则','美元 · US GAAP'],['使用边界','AI 收入未单列','云网络分部 ≠ AI 收入']],verdict:'可以做产品和增长驱动比较。不能直接比较收入规模、净利率或套用集团估值倍数；需统一期间、汇率、产品范围与会计调整。',sources:['S01','S05']},
 {id:'cohr',title:'新易盛 × Coherent',left:'eoptolink',right:'coherent',grade:'模块业务可比 · 集团差异大',reason:'高速光模块是交集；同受数据中心互连需求影响。',rows:[['比较对象','点对点光模块','Networking 中数通业务'],['重合业务','800G / 1.6T 等模块','数通光模块'],['非重合部分','电信和接入产品','激光、材料与电信'],['财务期间','2024 自然年','FY2025，截至 2025-06-30'],['币种与准则','人民币 · 中国会计准则','美元 · US GAAP'],['使用边界','点对点不全是 AI','Networking 不全是数通']],verdict:'以模块产品和数通需求作定性比较。Coherent 的垂直整合、并购及集团业务组合会影响利润率，不能直接把集团净利润作为模块竞争力指标。',sources:['S02','S04']},
 {id:'tfc',title:'天孚通信 × Coherent',left:'tfc',right:'coherent',grade:'局部能力可比 · 非直接同业',reason:'在光器件与封装能力有交集；两者在模块价值链中的覆盖范围不同。',rows:[['比较对象','器件及先进封装','光源、器件及模块'],['重合业务','光器件和封装','部分光器件'],['非重合部分','制造服务模式','材料、激光及完整模块'],['财务期间','2024 自然年','FY2025，截至 2025-06-30'],['币种与准则','人民币 · 中国会计准则','美元 · US GAAP'],['使用边界','未单列 CPO 收入','集团不等于器件业务']],verdict:'只能比较部分工艺和环节能力。不能将器件服务商与垂直整合集团当作一对一估值锚。',sources:['S03','S04']},
];
export const events = [
 {id:'capex',tag:'需求变化',date:'2025-07-23',title:'Alphabet 上调资本开支指引',fact:'2025 年资本开支预期由 750 亿美元上调至约 850 亿美元，增幅约 13.33%。',source:'S10',direction:'需求偏正向',chain:[['外部信号','资本开支指引上调','已披露事实'],['产业环节','网络预算与高速端口需求可能增长','条件推断'],['公司业务','中际旭创 / 新易盛的订单与产品结构','客户份额未披露'],['财务观察','模块收入、毛利率、存货与经营现金流','需后续财报验证']],boundary:'资本开支不全用于网络；无法确认新增采购分配给哪一家供应商。不能把 13.33% 直接映射为公司收入增速。',watch:'关注云厂商实际支出、网络采购占比、模块出货、应收与库存。'},
 {id:'cpo',tag:'技术变化',date:'2025-03-18',title:'硅光交换机推动互连架构演进',fact:'NVIDIA 公布硅光交换机及合作方，并在发布时给出未来供应安排。',source:'S09',direction:'环节影响分化',chain:[['外部信号','硅光 / CPO 系统路线发布','官方产品材料'],['产业环节','光源、封装与可插拔模块价值分配变化','情景推断'],['公司业务','Lumentum / Coherent 的光学合作；模块厂需迭代','合作方有来源'],['财务观察','研发费用、产品组合、良率与毛利率','收入尚待验证']],boundary:'合作方名单不证明合同金额；技术发布不等于即时规模替代，不能断言可插拔模块必然衰退。',watch:'跟踪量产和客户验证、单位功耗、可靠性、良率与系统成本。'},
 {id:'supply',tag:'供给情景',date:'假设情景',title:'关键光源成本上涨 10%',fact:'研究假设：光源等关键物料单位成本上涨，客户价格暂未完全传导；不是已发生新闻。',source:'S01',direction:'利润承压 / 现金占用',chain:[['假设输入','关键光源价格上涨 10%','用户情景'],['产业环节','模块物料成本及安全库存增加','成本逻辑'],['公司业务','模块厂采购、良率、交付与议价','公司暴露需核实'],['财务观察','毛利率下降；存货及营运资金上升','非盈利预测']],boundary:'年报披露海外关键原料风险，但未披露光源成本占比；实际影响取决于锁价、库存、替代与转嫁能力。',watch:'跟踪关键物料交期、采购价格、产品售价、库存周转和供应商集中度。'},
];
export function sourceById(id:string){return sources.find(s=>s.id===id)!;}
export function companyById(id:string){return companies.find(c=>c.id===id)!;}

