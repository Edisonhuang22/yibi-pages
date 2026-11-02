import{t as e}from"./vendor-supabase-BCPLnydU.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=99999999999,n=1e4,r={asset:new Set([`cash`,`checking`,`wallet`,`savings`,`term_deposit`,`investment`,`receivable`,`other_asset`]),liability:new Set([`credit_card`,`loan`,`payable`,`other_liability`])},i=new Set([`budget`,`trend`,`conservative`]),a=new Set([`expense`,`income`]),o=()=>({schemaVersion:3,safetyBalance:0,forecastMode:`trend`,trendWindowDays:30,budgetCycleStartMonth:9,budgetPoolOpening:0,accounts:[],netWorthSnapshots:[],budgets:[],budgetPools:[],recurringRules:[],plannedTransactions:[],trips:[],activeTripId:``,profile:{nickname:``,theme:`jade`}});function s(e={}){if(!w(e))throw Error(`预算、资产或预测数据格式不正确`);let t={...o(),...e},n={schemaVersion:3,safetyBalance:t.safetyBalance,forecastMode:t.forecastMode,trendWindowDays:t.trendWindowDays,budgetCycleStartMonth:t.budgetCycleStartMonth,budgetPoolOpening:t.budgetPoolOpening,accounts:C(t.accounts,`资产账户`).map(d),netWorthSnapshots:C(t.netWorthSnapshots,`净资产快照`).map(f),budgets:C(t.budgets,`预算`).map(p),budgetPools:C(t.budgetPools,`长期资金池`).map(m),recurringRules:C(t.recurringRules,`周期交易`).map(e=>h(e,!0)),plannedTransactions:C(t.plannedTransactions,`计划交易`).map(e=>h(e,!1)),trips:C(t.trips||[],`行程`).map(x),activeTripId:typeof t.activeTripId==`string`?t.activeTripId.slice(0,200):``,profile:u(t.profile)};ee(n);for(let e of[`accounts`,`netWorthSnapshots`,`budgets`,`budgetPools`,`recurringRules`,`plannedTransactions`,`trips`])ie(n[e],e);return ae(n.budgets,e=>`${e.month}:${e.category}`,`同月同分类只能有一项预算`),ae(n.netWorthSnapshots,e=>e.date,`同一天只能有一份净资产快照`),n}function c(e){let t=s(e),n=o();return[`safetyBalance`,`forecastMode`,`trendWindowDays`,`budgetCycleStartMonth`,`budgetPoolOpening`].some(e=>t[e]!==n[e])||t.profile.nickname!==n.profile.nickname||t.profile.theme!==n.profile.theme||[`accounts`,`budgets`,`budgetPools`,`recurringRules`,`plannedTransactions`,`trips`].some(e=>t[e].length)||t.netWorthSnapshots.some(e=>e.totalAssetsMinor||e.totalLiabilitiesMinor||e.netWorthMinor)}function l(e,t){let n=s(e),r=s(t),i=o(),a=e=>n[e]===i[e]&&r[e]!==i[e]?r[e]:n[e];return s({...n,safetyBalance:a(`safetyBalance`),forecastMode:a(`forecastMode`),trendWindowDays:a(`trendWindowDays`),budgetCycleStartMonth:a(`budgetCycleStartMonth`),budgetPoolOpening:a(`budgetPoolOpening`),accounts:S(n.accounts,r.accounts,e=>e.id),netWorthSnapshots:S(n.netWorthSnapshots,r.netWorthSnapshots,e=>e.date),budgets:S(n.budgets,r.budgets,e=>`${e.month}:${e.category}`),budgetPools:S(n.budgetPools,r.budgetPools,e=>e.id),recurringRules:S(n.recurringRules,r.recurringRules,e=>e.id),plannedTransactions:S(n.plannedTransactions,r.plannedTransactions,e=>e.id),trips:S(n.trips,r.trips,e=>e.id),activeTripId:n.activeTripId||r.activeTripId||``,profile:n.profile.nickname||n.profile.theme!==i.profile.theme||n.profile.isTripLedger?n.profile:r.profile})}function u(e){if(!w(e)||typeof e.nickname!=`string`||e.nickname.length>20||![`jade`,`blue`,`bubu`,`yier`,`trip`].includes(e.theme))throw Error(`个性化设置格式不正确`);let t={nickname:e.nickname.trim(),theme:e.theme};return e.isTripLedger===!0&&(t.isTripLedger=!0),t}function d(e){T(e,`资产账户`);let t=e.accountClass||(e.liability?`liability`:`asset`),n=e.accountType||oe(e.type,t),i={id:E(e.id,`资产账户标识`),name:E(e.name,`资产账户名称`,50),accountClass:t,accountType:n,openingBalanceMinor:Number.isSafeInteger(e.openingBalanceMinor)?e.openingBalanceMinor:e.balance,balance:e.balance,includeInBudget:e.includeInBudget??t===`asset`,includeInForecast:e.includeInForecast??(t===`asset`&&[`cash`,`checking`,`wallet`,`savings`].includes(n)),archived:e.archived===!0};if(!r[t]?.has(n))throw Error(`资产账户类型不正确`);if(D(i.openingBalanceMinor,`资产账户期初余额`),D(i.balance,`资产账户余额`),typeof i.includeInBudget!=`boolean`)throw Error(`资产账户预算设置不正确`);if(typeof i.includeInForecast!=`boolean`)throw Error(`资产账户预测设置不正确`);return t===`liability`&&(i.includeInBudget=!1),t===`liability`&&(i.includeInForecast=!1),i}function f(e){T(e,`净资产快照`);let n={id:E(e.id,`净资产快照标识`),date:ne(e.date,`净资产快照日期`),totalAssetsMinor:e.totalAssetsMinor,totalLiabilitiesMinor:e.totalLiabilitiesMinor,netWorthMinor:e.netWorthMinor};if(D(n.totalAssetsMinor,`总资产`),D(n.totalLiabilitiesMinor,`总负债`),!Number.isSafeInteger(n.netWorthMinor)||Math.abs(n.netWorthMinor)>t)throw Error(`净资产金额不正确`);if(n.netWorthMinor!==n.totalAssetsMinor-n.totalLiabilitiesMinor)throw Error(`净资产快照计算不一致`);return n}function p(e){T(e,`预算`);let t={id:E(e.id,`预算标识`),month:re(e.month),category:E(e.category,`预算分类`,50),assigned:e.assigned,rollover:e.rollover===!0};return te(t.assigned,`预算金额`),t}function m(e){T(e,`长期资金池`);let t={id:E(e.id,`长期资金池标识`),name:E(e.name,`长期资金池名称`,50),target:e.target,used:e.used||0};if(D(t.target,`长期资金池目标金额`),D(t.used,`长期资金池已用金额`),t.used>t.target)throw Error(`长期资金池已用金额不能超过目标金额`);return t}function h(e,t){T(e,t?`周期交易`:`计划交易`);let n=t?`周期交易`:`计划交易`,r={id:E(e.id,`${n}标识`),name:E(e.name,`${n}名称`,50),amount:e.amount,type:e.type};if(te(r.amount,`${n}金额`),!a.has(r.type))throw Error(`${n}类型不正确`);if(t){if(r.day=e.day,r.frequency=e.frequency,r.active=e.active!==!1,!Number.isInteger(r.day)||r.day<1||r.day>31||r.frequency!==`monthly`)throw Error(`周期交易日期或频率不正确`)}else r.date=ne(e.date,`计划交易日期`);return e.currency===`USD`&&(r.currency=`USD`,r.foreignAmount=e.foreignAmount,r.exchangeRate=e.exchangeRate,te(r.foreignAmount,`${n}美元金额`),te(r.exchangeRate,`${n}汇率`)),r}var g=new Set([`cotton`,`seabreeze`,`forest`,`blossom`]),_=new Set([`polaroid`,`washi`,`art`]),v=new Set([`auto`,`editorial`,`grid`]),y=()=>({subtitle:``,weather:`☀️ 晴朗微风`,mood:`✨ 满心欢喜`,note:``,stampText:`旅途圆满 · 珍藏纪念`,signature:`布布 & 一二`,paper:`cotton`,mount:`polaroid`,layout:`auto`,showStats:!0,showCategories:!0,showFootprints:!0,showSplit:!0,photos:[]});function b(e={}){let t=y();if(!w(e))return t;let n=(Array.isArray(e.photos)?e.photos.slice(0,6):[]).filter(e=>w(e)&&typeof e.dataUrl==`string`&&/^data:image\/(?:webp|jpeg|jpg|png);base64,[A-Za-z0-9+/=\s]+$/.test(e.dataUrl)&&e.dataUrl.length<=8e5).map((e,t)=>({id:typeof e.id==`string`&&e.id.trim()?e.id.trim().slice(0,80):`photo-${t+1}`,dataUrl:e.dataUrl.replace(/\s+/g,``),caption:typeof e.caption==`string`?e.caption.trim().slice(0,40):``}));return{subtitle:typeof e.subtitle==`string`?e.subtitle.trim().slice(0,60):t.subtitle,weather:typeof e.weather==`string`?e.weather.trim().slice(0,24):t.weather,mood:typeof e.mood==`string`?e.mood.trim().slice(0,24):t.mood,note:typeof e.note==`string`?e.note.trim().slice(0,300):t.note,stampText:typeof e.stampText==`string`?e.stampText.trim().slice(0,30):t.stampText,signature:typeof e.signature==`string`?e.signature.trim().slice(0,40):t.signature,paper:g.has(e.paper)?e.paper:t.paper,mount:_.has(e.mount)?e.mount:t.mount,layout:v.has(e.layout)?e.layout:t.layout,showStats:e.showStats!==!1,showCategories:e.showCategories!==!1,showFootprints:e.showFootprints!==!1,showSplit:e.showSplit!==!1,photos:n}}function x(e){T(e,`行程`);let t={id:E(e.id,`行程标识`),name:E(e.name,`行程名称`,60),startDate:ne(e.startDate,`行程开始日期`),endDate:ne(e.endDate,`行程结束日期`),budget:e.budget||0,fundOpening:e.fundOpening||0,coverEmoji:typeof e.coverEmoji==`string`&&e.coverEmoji.trim()?e.coverEmoji.trim().slice(0,10):`🏖️`,status:[`active`,`completed`].includes(e.status)?e.status:`active`};if(D(t.budget,`行程预算`),D(t.fundOpening,`行程小金库期初`),t.startDate>t.endDate)throw Error(`行程开始日期不能晚于结束日期`);return e.journal!==void 0&&(t.journal=b(e.journal)),t}function ee(e){if(D(e.safetyBalance,`安全余额`),D(e.budgetPoolOpening,`学年初始资金`),!i.has(e.forecastMode))throw Error(`预测模式不正确`);if(![30,90].includes(e.trendWindowDays))throw Error(`趋势参考天数不正确`);if(!Number.isInteger(e.budgetCycleStartMonth)||e.budgetCycleStartMonth<1||e.budgetCycleStartMonth>12)throw Error(`学年开始月份不正确`)}function S(e,t,n){let r=new Set(e.map(n));return[...e,...t.filter(e=>!r.has(n(e)))]}function C(e,t){if(!Array.isArray(e)||e.length>n)throw Error(`${t}数据过多或格式不正确`);return e}function w(e){return e&&typeof e==`object`&&!Array.isArray(e)}function T(e,t){if(!w(e))throw Error(`${t}格式不正确`)}function E(e,t,n=200){if(typeof e!=`string`||!e.trim()||e.length>n)throw Error(`${t}不正确`);return e}function D(e,n){if(!Number.isSafeInteger(e)||e<0||e>t)throw Error(`${n}不正确`)}function te(e,t){if(D(e,t),!e)throw Error(`${t}须大于 0`)}function ne(e,t){if(typeof e!=`string`||!/^\d{4}-\d{2}-\d{2}$/.test(e))throw Error(`${t}不正确`);let n=new Date(`${e}T12:00:00Z`);if(Number.isNaN(+n)||n.toISOString().slice(0,10)!==e||e<`1900-01-01`||e>`2199-12-31`)throw Error(`${t}不正确`);return e}function re(e){if(typeof e!=`string`||!/^(19|20|21)\d{2}-(0[1-9]|1[0-2])$/.test(e))throw Error(`预算月份不正确`);return e}function ie(e,t){ae(e,e=>e.id,`${t}中存在重复标识`)}function ae(e,t,n){let r=new Set;for(let i of e){let e=t(i);if(r.has(e))throw Error(n);r.add(e)}}function oe(e,t){return{现金:`cash`,银行卡:`checking`,储蓄:`savings`,电子钱包:`wallet`,信用卡:`credit_card`,投资:`investment`,应收款:`receivable`,应付款:`payable`}[e]||(t===`liability`?`other_liability`:`other_asset`)}var se={wechat:{name:`微信支付`,short:`微信`,color:`#3caa76`,icon:`wechat`},alipay:{name:`支付宝`,short:`支付宝`,color:`#568bd6`,icon:`alipay`},cash:{name:`现金`,short:`现金`,color:`#c69859`,icon:`cash`},bank:{name:`银行卡`,short:`银行卡`,color:`#9285b6`,icon:`card`},other:{name:`其他`,short:`其他`,color:`#8c9490`,icon:`wallet`}},ce={餐饮:{icon:`food`,color:`#479982`,bg:`#edf5ed`},购物:{icon:`bag`,color:`#c18b66`,bg:`#fbf0e7`},交通:{icon:`car`,color:`#759bc9`,bg:`#eef3fa`},日用:{icon:`basket`,color:`#aa94bb`,bg:`#f4eff8`},居住:{icon:`home`,color:`#b5a05e`,bg:`#f7f3e7`},娱乐:{icon:`play`,color:`#d29196`,bg:`#fbeef0`},健康:{icon:`heart`,color:`#bd8594`,bg:`#f7edf0`},学习:{icon:`book`,color:`#7baaa0`,bg:`#eaf4f2`},人情:{icon:`gift`,color:`#c99878`,bg:`#f8efe8`},其他:{icon:`grid`,color:`#929c95`,bg:`#f0f2ef`},工资:{icon:`briefcase`,color:`#479982`,bg:`#edf5ed`},奖金:{icon:`sparkles`,color:`#c69859`,bg:`#f7f3e7`},其他收入:{icon:`wallet`,color:`#759bc9`,bg:`#eef3fa`},账户划转:{icon:`transfer`,color:`#929c95`,bg:`#f0f2ef`}},le={小笨交通:{icon:`car`,color:`#4a7fc2`,bg:`#edf4fc`,emoji:`🚄`},小笨酒店:{icon:`home`,color:`#b59247`,bg:`#f9f5e9`,emoji:`🏨`},小笨美食:{icon:`food`,color:`#d9654d`,bg:`#fdf2f0`,emoji:`🍲`},小笨娱乐:{icon:`play`,color:`#c46b9a`,bg:`#fdf0f7`,emoji:`🎡`},小笨特产与纪念品:{icon:`bag`,color:`#b87c53`,bg:`#faf3ee`,emoji:`🛍️`}},ue=[`小笨交通`,`小笨酒店`,`小笨美食`,`小笨娱乐`,`小笨特产与纪念品`],de={小笨门票:{icon:`play`,color:`#c46b9a`,bg:`#fdf0f7`,emoji:`🎟️`},大交通:{icon:`car`,color:`#4a7fc2`,bg:`#edf4fc`,emoji:`🚄`},酒店住宿:{icon:`home`,color:`#b59247`,bg:`#f9f5e9`,emoji:`🏨`},当地美食:{icon:`food`,color:`#d9654d`,bg:`#fdf2f0`,emoji:`🍲`},门票游乐:{icon:`play`,color:`#c46b9a`,bg:`#fdf0f7`,emoji:`🎟️`},门票娱乐:{icon:`play`,color:`#c46b9a`,bg:`#fdf0f7`,emoji:`🎟️`},市内交通:{icon:`car`,color:`#529688`,bg:`#eff7f5`,emoji:`🚕`},特产与纪念品:{icon:`bag`,color:`#b87c53`,bg:`#faf3ee`,emoji:`🛍️`},旅拍摄影:{icon:`sparkles`,color:`#8870b2`,bg:`#f4f0fa`,emoji:`📸`},旅行拍摄:{icon:`sparkles`,color:`#8870b2`,bg:`#f4f0fa`,emoji:`📸`}};function fe(e){return e===`小笨门票`?`小笨娱乐`:e}Object.assign(ce,de,le);var pe=[`餐饮`,`购物`,`交通`,`日用`,`居住`,`娱乐`,`健康`,`学习`,`人情`,`其他`],me=[...pe,...ue,...Object.keys(de)],he=[`工资`,`奖金`,`其他收入`],ge={expense:`支出`,income:`收入`,refund:`退款`,transfer:`划转`};function _e(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function ve(e){if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;let t=new Date(e+`T12:00:00Z`);return!Number.isNaN(+t)&&t.toISOString().slice(0,10)===e&&e>=`1900-01-01`&&e<=`2199-12-31`}function ye(e){if(typeof e==`number`&&e>1&&e<11e4)return new Date(Date.UTC(1899,11,30)+Math.floor(e)*864e5).toISOString().slice(0,10);let t=String(e??``).trim().match(/^(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})/);if(!t)return``;let n=`${t[1]}-${t[2].padStart(2,`0`)}-${t[3].padStart(2,`0`)}`;return ve(n)?n:``}function be(e){let t=String(e??``).replace(/[¥￥元\s]/g,``).trim();if(!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(t))return null;let[n,r=``]=t.replaceAll(`,`,``).split(`.`),i=Number(n)*100+Number(r.padEnd(2,`0`));return Number.isSafeInteger(i)&&i>0&&i<=99999999999?i:null}function O(e,t=!1){return(t?`¥`:``)+(e/100).toLocaleString(`zh-CN`,{minimumFractionDigits:2,maximumFractionDigits:2})}function xe(e,t){let[n,r]=e.split(`-`).map(Number),i=new Date(n,r-1+t,1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,`0`)}`}function Se(e){return e.type===`expense`?e.amount:e.type===`refund`?-e.amount:0}function Ce(e){let t={expense:0,gross:0,refund:0,income:0,balance:0,count:e.length};for(let n of e)n.type===`expense`&&(t.gross+=n.amount),n.type===`refund`&&(t.refund+=n.amount),n.type===`income`&&(t.income+=n.amount);return t.expense=t.gross-t.refund,t.balance=t.income-t.expense,t}function we(e,t){let n=new Map;for(let r of e)[`expense`,`refund`].includes(r.type)&&n.set(r[t],(n.get(r[t])||0)+Se(r));return[...n].map(([e,t])=>({name:e,amount:t})).sort((e,t)=>t.amount-e.amount)}function Te(e,t,n=_e()){let r=n.slice(0,7),i=e.filter(e=>e.date.startsWith(t)&&(t!==r||e.date<=n)),a=xe(t,-1),o=t===r?Number(n.slice(-2)):31,s=e.filter(e=>e.date.startsWith(a)&&Number(e.date.slice(-2))<=o),c=Ce(s).expense,l=Ce(i).expense;return{before:c,after:l,difference:l-c,comparable:s.length>0,label:t===r?`较上月同期`:`较上月`,percent:c>0?(l-c)/c*100:null}}function Ee(e,t,n=_e()){let r=n.slice(0,7),i=e.filter(e=>e.date.startsWith(t)&&(t!==r||e.date<=n)),a=xe(t,-1),o=t===r?Number(n.slice(-2)):31,s=e.filter(e=>e.date.startsWith(a)&&Number(e.date.slice(-2))<=o),c=s.length>0,l=we(i,`category`),u=we(s,`category`),d=new Map(l.map(e=>[e.name,e.amount])),f=new Map(u.map(e=>[e.name,e.amount])),p=new Map,m=new Set([...d.keys(),...f.keys()]);for(let e of m){let t=d.get(e)||0,n=f.get(e)||0,r=t-n;if(!c)p.set(e,{current:t,previous:n,diff:0,changeRate:null,percent:null,status:`none`,label:`—`});else if(n>0){let i=r/n,a=i*100;r>0?p.set(e,{current:t,previous:n,diff:r,changeRate:i,percent:a,status:`up`,label:`+${a.toFixed(1)}%`}):r<0?p.set(e,{current:t,previous:n,diff:r,changeRate:i,percent:a,status:`down`,label:`${a.toFixed(1)}%`}):p.set(e,{current:t,previous:n,diff:0,changeRate:0,percent:0,status:`flat`,label:`0.0%`})}else n===0?t>0?p.set(e,{current:t,previous:0,diff:r,changeRate:null,percent:null,status:`up`,label:`新增`}):p.set(e,{current:t,previous:0,diff:0,changeRate:0,percent:0,status:`flat`,label:`0.0%`}):r>0?p.set(e,{current:t,previous:n,diff:r,changeRate:null,percent:null,status:`up`,label:`上升`}):r<0?p.set(e,{current:t,previous:n,diff:r,changeRate:null,percent:null,status:`down`,label:`下降`}):p.set(e,{current:t,previous:n,diff:0,changeRate:0,percent:0,status:`flat`,label:`0.0%`})}let h={current:0,previous:0,diff:0,changeRate:null,percent:null,status:`none`,label:`—`};return{comparable:c,categories:p,label:t===r?`较上月同期`:`较上月`,get(e){return p.get(e)||h}}}function De(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`账单记录格式不正确`);if(typeof e.id!=`string`||!e.id||e.id.length>200)throw Error(`账单标识不正确`);if(!Object.hasOwn(ge,e.type))throw Error(`请选择有效的收支类型`);if(!Number.isSafeInteger(e.amount)||e.amount<=0||e.amount>99999999999)throw Error(`金额须大于 0，且最多两位小数`);if(!ve(e.date))throw Error(`请选择有效日期`);if(!Object.hasOwn(se,e.channel))throw Error(`请选择支付方式`);if(!(e.type===`income`?he:e.type===`transfer`?[`账户划转`]:me).includes(e.category))throw Error(`请选择对应的分类`);for(let t of[`payee`,`note`,`externalId`,`source`,`originalId`,`createdAt`,`accountId`,`fromAccountId`,`toAccountId`,`payer`,`tripId`])if(e[t]!==void 0&&(typeof e[t]!=`string`||e[t].length>(t===`note`?500:200)))throw Error(`账单文字过长或格式不正确`);if(e.payer!==void 0&&![``,`bubu`,`yier`,`fund`].includes(e.payer))throw Error(`出资方格式不正确`);if(e.accountBalanceApplied!==void 0&&typeof e.accountBalanceApplied!=`boolean`)throw Error(`账户联动标识格式不正确`);if(e.type===`transfer`&&(!!e.fromAccountId!=!!e.toAccountId||e.fromAccountId&&e.fromAccountId===e.toAccountId))throw Error(`划转账户设置不正确`);return e}function Oe(e){if(!Array.isArray(e)||e.length>5e4)throw Error(`账单数据无效或超过 50,000 笔`);let t=new Map;for(let n of e){if(De(n),t.has(n.id))throw Error(`存在重复账单标识`);t.set(n.id,n)}let n=new Map;for(let r of e.filter(e=>e.type===`refund`)){let e=t.get(r.originalId);if(!e||e.type!==`expense`)throw Error(`退款需要关联一笔原支出`);if(r.date<e.date)throw Error(`退款日期不能早于原支出`);if(r.category!==e.category)throw Error(`退款分类须与原支出一致`);let i=(n.get(e.id)||0)+r.amount;if(i>e.amount)throw Error(`累计退款不能超过原支出金额`);n.set(e.id,i)}return e}function ke(e){let t;try{t=JSON.parse(e)}catch{throw Error(`备份不是有效的 JSON 文件`)}if(t?.app!==`yibi-ledger`||![1,2].includes(t.version))throw Error(`请选择熊熊账本导出的完整备份文件`);if(Oe(t.transactions),t.version===2&&t.finance===void 0)throw Error(`新版备份缺少预算、资产和预测数据`);let n=t.finance===void 0?void 0:s(t.finance);return{transactions:t.transactions,...n===void 0?{}:{finance:n}}}function Ae(e){return[e.date,e.type,e.amount,e.channel,(e.payee||``).trim().toLowerCase()].join(`|`)}function je(e,t){return e.externalId&&t.some(t=>t.externalId===e.externalId&&t.source===e.source)?`exact`:t.some(t=>Ae(t)===Ae(e))?`possible`:``}function Me(e){e=e.replace(/^\uFEFF/,``);let t=e.split(/\r?\n/).slice(0,50).some(e=>e.includes(`	`)&&/金额/.test(e))?`	`:`,`,n=[],r=[],i=``,a=!1;for(let o=0;o<e.length;o++){let s=e[o];s===`"`?a&&e[o+1]===`"`?(i+=`"`,o++):!a&&i===``?a=!0:a?a=!1:i+=s:s===t&&!a?(r.push(i.trim()),i=``):(s===`
`||s===`\r`)&&!a?(s===`\r`&&e[o+1]===`
`&&o++,r.push(i.trim()),r.some(Boolean)&&n.push(r),r=[],i=``):i+=s}if(a)throw Error(`CSV 引号不完整，请检查文件是否完整导出`);return r.push(i.trim()),r.some(Boolean)&&n.push(r),n}var Ne=e=>String(e).replace(/[\s\uFEFF()（）/：:]/g,``);function Pe(e,t){return t===`income`?/工资|薪资|薪酬/.test(e)?`工资`:/奖金|年终/.test(e)?`奖金`:`其他收入`:t===`transfer`?`账户划转`:[[`餐饮`,/餐|饭|咖啡|茶|外卖|面包|美食|食品|水果|汉堡|早餐|午餐|晚餐/],[`交通`,/地铁|公交|打车|滴滴|交通|车票|铁路|加油|停车|出行/],[`居住`,/房租|物业|水费|电费|燃气|宽带/],[`健康`,/药|医|诊|健康/],[`学习`,/书|课程|学费|培训|学习/],[`日用`,/超市|便利店|日用|洗护|纸巾/],[`娱乐`,/电影|游戏|音乐|娱乐|门票|视频会员/],[`购物`,/购物|服饰|淘宝|京东|拼多多|鞋|衣/],[`人情`,/礼物|红包|人情/]].find(([,t])=>t.test(e))?.[0]||`其他`}function Fe(e,t=`auto`,n=[]){let r=e.findIndex(e=>e.some(e=>/^金额/.test(Ne(e)))&&e.some(e=>/交易时间|交易创建时间|付款时间|日期/.test(Ne(e))));if(r<0)throw Error(`没有找到账单表头。需要日期、金额、收/支等列；可下载通用 CSV 模板。`);let i=e[r].map(Ne),a=e=>i.findIndex(t=>e.includes(t)),o={date:a([`交易时间`,`交易创建时间`,`付款时间`,`日期`]),amount:a([`金额`,`金额元`,`交易金额`]),flow:a([`收支`,`收支类型`,`类型`]),payee:a([`交易对方`,`商户`,`名称`]),product:a([`商品`,`商品说明`,`商品名称`]),category:a([`分类`,`交易分类`,`交易类型`]),channel:a([`支付方式`,`收付款方式`,`付款方式`]),status:a([`当前状态`,`交易状态`]),externalId:a([`交易单号`,`交易订单号`,`交易号`]),note:a([`备注`]),fromAccount:a([`从账户`,`来源账户`,`支出账户`]),toAccount:a([`到账户`,`目标账户`,`入账账户`])};if(o.amount<0||o.flow<0)throw Error(`缺少金额或收/支列，请使用完整账单或通用模板。`);let s=e.slice(0,r+1).flat().join(` `),c=t===`auto`?i.includes(`从账户`)||i.includes(`到账户`)?`standard`:/微信/.test(s)||i.includes(`当前状态`)?`wechat`:/支付宝/.test(s)||i.includes(`交易订单号`)?`alipay`:`csv`:t,l=[],u=[...n],d=0;for(let t=r+1;t<e.length;t++){let n=e[t],r=e=>o[e]<0?``:String(n[o[e]]??``).trim();if(!n.some(e=>String(e).trim())||/^[\-=]+|^共\d|^导出时间|^说明|^注：/.test(String(n[0])))continue;let i=r(`status`);if(/交易关闭|已关闭|未支付|支付失败|交易失败|已撤销/.test(i)){d++;continue}let a=ye(n[o.date]),s=be(r(`amount`).replace(/^[-+]/,``)),f=r(`flow`),p=[r(`product`),r(`category`),r(`note`)].join(` `),m=Le([r(`category`),r(`product`),r(`payee`),r(`note`),r(`channel`),i].join(` `)),h=/支出/.test(f)?`expense`:/收入/.test(f)?`income`:/划转/.test(f)?`transfer`:``,g=``,_=``,v=0,y=null;if(c===`wechat`&&/零钱通(?:提现|转出|转入零钱)/.test(m))h=`transfer`,y={from:`零钱通`,to:`微信零钱`},_=`WECHAT_LQT_TO_BALANCE`,v=.99;else if(c===`wechat`&&/(?:微信零钱)?提现(?:至|到)?银行卡|提现至银行卡|提现到银行卡/.test(m)){let e=[r(`channel`),r(`product`),r(`note`),r(`payee`)].find(e=>/(?:\d{4}|招商|建设|工商|农业|交通|邮储|中信|兴业|民生|平安|光大|广发).*(?:银行|储蓄卡|信用卡)|(?:银行|储蓄卡|信用卡).*\d{4}/.test(e))||``;h=`transfer`,y={from:`微信零钱`,to:e},_=`WECHAT_BALANCE_TO_BANK`,v=.65,e||(g=`已识别为微信零钱转出；无法从账单确认具体银行卡，请在导入后补全目标账户`)}h||(h=`transfer`,g=`收支性质待核对，请选择支出、收入或本人账户划转`),/退款/.test(p+i+f)&&(g=`含退款信息，请核对；退款请在记一笔中关联原支出`),/转账/.test(r(`product`)+r(`category`))&&!/本人/.test(p)&&(g||=`转账用途待核对，可能是实际消费或本人账户划转`);let b=r(`channel`),x=[b,r(`fromAccount`),r(`toAccount`)].join(` `),ee=c===`wechat`||c===`alipay`?c:/微信|零钱/.test(x)?`wechat`:/支付宝|余额宝/.test(x)?`alipay`:/现金/.test(x)?`cash`:/银行|储蓄卡|信用卡/.test(x)?`bank`:`other`,S=r(`category`),C=h===`income`?he:h===`transfer`?[`账户划转`]:pe,w={id:`import-${t}`,date:a,amount:s,type:h,channel:ee,category:C.includes(S)?S:Pe(p,h),payee:(r(`payee`)||r(`product`)||`账单导入`).slice(0,200),note:[r(`product`),r(`note`)].filter(e=>e&&e!==`/`&&e!==`-`).join(` · `).slice(0,500),source:c,externalId:r(`externalId`).replace(/^['\t]/,``).slice(0,200),originalDescription:p.slice(0,500),originalType:r(`category`).slice(0,200),originalDirection:f.slice(0,50),originalPaymentMethod:b.slice(0,200),originalStatus:i.slice(0,200),recognitionRuleId:_,recognitionConfidence:v,needsReview:!!g};r(`fromAccount`)&&(w.fromAccountName=r(`fromAccount`).slice(0,200)),r(`toAccount`)&&(w.toAccountName=r(`toAccount`).slice(0,200)),y&&(w.fromAccountName=y.from,w.toAccountName=y.to||`银行卡（待确认）`);let T=/退款/.test(p+i+f),E=a?s?T?`含退款：请手动核对原消费并关联退款`:``:`金额无效`:`日期无效`,D=E?``:je(w,u);l.push({record:w,row:t+1,error:E,duplicate:D,review:g,needsType:!!g&&!T,selected:!E&&!D&&!g}),E||u.push(w)}if(!l.length)throw Error(`文件中没有可导入的交易记录`);if(l.length>1e4)throw Error(`单次最多导入 10,000 笔，请按月份拆分账单`);return{candidates:l,source:c,skipped:d}}function Ie(e){let t=e=>{let t=String(e??``);return/^[=+@\-\t\r]/.test(t)&&(t=`'`+t),`"`+t.replaceAll(`"`,`""`)+`"`},n=[[`交易 ID`,`日期`,`交易行为`,`金额`,`币种`,`从账户`,`到账户`,`交易对方`,`分类`,`支付方式`,`数据来源`,`原始交易 ID`,`原始描述`,`原始支付方式`,`原始状态`,`识别规则`,`待确认`,`备注`,`出资人`]];for(let t of e)n.push([t.id,t.date,ge[t.type],(t.amount/100).toFixed(2),`CNY`,t.fromAccountName||t.sourceAccountName||``,t.toAccountName||t.destinationAccountName||``,t.payee,t.category,se[t.channel].name,t.source,t.externalId,t.originalDescription,t.originalPaymentMethod,t.originalStatus,t.recognitionRuleId,t.needsReview?`是`:`否`,t.note,t.payer||``]);return`﻿`+n.map(e=>e.map(t).join(`,`)).join(`\r
`)}function Le(e){return String(e??``).normalize(`NFKC`).replace(/[\s\p{P}\p{S}]/gu,``).toLowerCase()}var Re=(e,t)=>[...e.getElementsByTagNameNS(`*`,t)];function ze(e){let t=new DOMParser().parseFromString(e,`application/xml`);if(t.querySelector(`parsererror`))throw Error(`表格内容损坏，无法读取`);return t}var Be=null;async function Ve(){if(typeof window<`u`&&window.JSZip)return window.JSZip;if(Be)return Be;if(typeof document<`u`)return Be=new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`./vendor/jszip.min.js`,n.onload=()=>{window.JSZip?e(window.JSZip):t(Error(`表格解析库未能正确加载`))},n.onerror=()=>{Be=null,t(Error(`无法加载表格解析组件，请检查网络连接`))},document.head.appendChild(n)}),Be;throw Error(`表格读取组件尚未就绪，请刷新后重试`)}async function He(e){let t=await Ve(),n;try{n=await t.loadAsync(e)}catch{throw Error(`无法打开 XLSX。请先解压账单压缩包，选择未加密的 .xlsx 文件。`)}let r=async e=>n.file(e)?n.file(e).async(`string`):``,i=await r(`xl/workbook.xml`);if(!i)throw Error(`这不是有效的 XLSX 工作簿`);let a=ze(i),o=Re(a,`sheet`)[0]?.getAttribute(`r:id`),s=Re(ze(await r(`xl/_rels/workbook.xml.rels`)),`Relationship`).find(e=>e.getAttribute(`Id`)===o)?.getAttribute(`Target`);if(!s)throw Error(`工作簿中没有可读取的工作表`);let c=new URL(s,`https://xlsx.local/xl/`).pathname.slice(1),l=await r(`xl/sharedStrings.xml`),u=l?Re(ze(l),`si`).map(e=>Re(e,`t`).map(e=>e.textContent).join(``)):[],d=await r(c);if(!d)throw Error(`工作表内容缺失`);let f=ze(d),p=[];for(let e of Re(f,`row`)){let t=[];for(let n of Re(e,`c`)){let e=(n.getAttribute(`r`)||``).match(/^[A-Z]+/)?.[0];if(!e)continue;let r=[...e].reduce((e,t)=>e*26+t.charCodeAt(0)-64,0)-1;if(r>100)continue;let i=n.getAttribute(`t`),a=Re(n,`v`)[0]?.textContent||``;t[r]=i===`s`?u[Number(a)]||``:i===`inlineStr`?Re(n,`t`).map(e=>e.textContent).join(``):(i===`n`||!i)&&/^\d{1,7}(\.\d+)?$/.test(a)?Number(a):a}t.some(e=>e!==``&&e!==void 0)&&p.push(Array.from(t,e=>e??``))}let m=Re(a,`workbookPr`)[0]?.getAttribute(`date1904`);if(m===`1`||m===`true`){let e=p.findIndex(e=>e.some(e=>/交易时间|交易创建时间|付款时间|日期/.test(String(e)))&&e.some(e=>/金额/.test(String(e))));if(e>=0){let t=p[e].findIndex(e=>/交易时间|交易创建时间|付款时间|日期/.test(String(e)));for(let n of p.slice(e+1))typeof n[t]==`number`&&(n[t]+=1462)}}return p}async function Ue(e){if(e.size>10485760)throw Error(`单个文件最大 10 MB，请按月份导出`);let t=await e.arrayBuffer();if(/\.xlsx$/i.test(e.name))return He(t);if(!/\.(csv|tsv|txt)$/i.test(e.name))throw Error(`支持 CSV 和 XLSX 文件；压缩包请先解压`);let n=new Uint8Array(t),r;if(n[0]===255&&n[1]===254)r=new TextDecoder(`utf-16le`).decode(n);else try{r=new TextDecoder(`utf-8`,{fatal:!0}).decode(n)}catch{r=new TextDecoder(`gb18030`).decode(n)}return Me(r)}var We={overview:`<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>`,list:`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>`,chart:`<path d="M4 3v17h17M9 15v-5M14 15V5M19 15V8"/>`,upload:`<path d="M12 16V3m-4 4 4-4 4 4M4 15v5h16v-5"/>`,download:`<path d="M12 3v13m-4-4 4 4 4-4M4 16v5h16v-5"/>`,plus:`<path d="M12 5v14M5 12h14"/>`,arrow:`<path d="M5 12h14m-5-5 5 5-5 5"/>`,left:`<path d="m14 6-6 6 6 6"/>`,right:`<path d="m10 6 6 6-6 6"/>`,down:`<path d="m7 10 5 5 5-5"/>`,calendar:`<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18"/>`,search:`<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>`,check:`<path d="m5 12 4 4L19 6"/>`,close:`<path d="m6 6 12 12M6 18 18 6"/>`,edit:`<path d="m15 4 5 5M4 20l5-1L20 8a3.5 3.5 0 0 0-5-5L4 14z"/>`,trash:`<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>`,shield:`<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>`,eye:`<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>`,wallet:`<path d="M20 7V4H5a2 2 0 0 0 0 4h16v12H5a3 3 0 0 1-3-3V6M21 12h-5v4h5"/>`,cash:`<rect x="2" y="5" width="20" height="14" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M5 9h.01M19 15h.01"/>`,card:`<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 15h3"/>`,wechat:`<path d="M13 15a7 7 0 0 1-6 0l-3 1 1-3C0 7 6 2 12 4c3 1 5 3 5 5"/><path d="M21 18l.5 3-3-1c-5 2-10-1-9-5s6-6 10-3c3 2 3 4 1.5 6z"/><path d="M7 8h.01M12 8h.01M14 15h.01M18 15h.01"/>`,alipay:`<path d="M5 6h14M12 3v8M7 11h10c-2 6-8 11-11 7-3-4 5-5 14 0"/>`,food:`<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-5 3-5 10 0 10"/>`,bag:`<path d="M4 8h16l1 13H3zM8 8V6a4 4 0 0 1 8 0v2"/>`,basket:`<path d="m3 9 2 12h14l2-12zM7 9l5-6 5 6M9 13v4M15 13v4"/>`,car:`<path d="m5 5-3 8v6h3v-3h14v3h3v-6l-3-8zM3 11h18M6 14h1M17 14h1"/>`,home:`<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>`,play:`<rect x="2" y="5" width="20" height="15" rx="4"/><path d="m10 9 6 4-6 4z"/>`,heart:`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>`,book:`<path d="M12 5s-4-3-10-1v16c6-2 10 1 10 1s4-3 10-1V4c-6-2-10 1-10 1v16"/>`,gift:`<path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8C2 8 5-1 9 3l3 5c10 0 7-9 3-5z"/>`,grid:`<circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>`,briefcase:`<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3"/>`,sparkles:`<path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3zM20 2v4M18 4h4"/>`,transfer:`<path d="M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4"/>`,income:`<path d="M17 4 5 16m0-9v9h9M4 21h16"/>`,expense:`<path d="M5 16 17 4m-9 0h9v9M4 21h16"/>`,refund:`<path d="M8 4 3 9l5 5M3 9h11a6 6 0 0 1 0 12h-3"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>`,leaf:`<path d="M20 3C5 1 0 12 7 18s16 0 13-15zM6 20 16 8"/>`,paw:`<ellipse cx="12" cy="15" rx="4.5" ry="3.5"/><circle cx="6.5" cy="10" r="1.5"/><circle cx="10" cy="7.5" r="1.5"/><circle cx="14" cy="7.5" r="1.5"/><circle cx="17.5" cy="10" r="1.5"/>`,bubu:`<circle cx="12" cy="13.5" r="7.5"/><path d="M5.5 8.5a3 3 0 0 1 4.5-1.5M14 7a3 3 0 0 1 4.5 1.5"/><ellipse cx="12" cy="15.2" rx="3.2" ry="2.2"/><path d="M11 14.8h2l-1 1z"/><circle cx="9.5" cy="12.5" r=".75" fill="currentColor"/><circle cx="14.5" cy="12.5" r=".75" fill="currentColor"/>`,yier:`<circle cx="12" cy="12.5" r="7"/><circle cx="6.5" cy="7" r="2.2" fill="currentColor"/><circle cx="17.5" cy="7" r="2.2" fill="currentColor"/><ellipse cx="9" cy="12" rx="1.6" ry="1.2" transform="rotate(-15 9 12)"/><ellipse cx="15" cy="12" rx="1.6" ry="1.2" transform="rotate(15 15 12)"/><circle cx="12" cy="14" r=".8" fill="currentColor"/><path d="M9.5 20.5l5-2.2v2.2l-5-2.2zM14.5 20.5l-5-2.2v2.2l5-2.2z"/>`,honey:`<rect x="8" y="4" width="8" height="2" rx="1"/><path d="M7 6h10l1.5 5c.5 3-1 8-6.5 8S5 14 5.5 11z"/><path d="M10 9v3a1 1 0 0 0 2 0v-2"/>`};function k(e,t=20){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${We[e]||We.grid}</svg>`}var Ge=`yibi-ledger-sync`,A=`state`,Ke=`current`,qe=()=>({app:`yibi-ledger`,version:1,revision:0,transactions:[],lastChannel:`wechat`,updatedAt:``}),Je=class{async database(){if(!globalThis.indexedDB)throw Error(`浏览器不支持 IndexedDB，无法安全保存待同步修改`);return this.db||=new Promise((e,t)=>{let n=indexedDB.open(Ge,1);n.onupgradeneeded=()=>n.result.createObjectStore(A),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),this.db}key(e=``){return e?`user:${e}`:Ke}async get(e=``){let t=await this.database();if(e){let n=await new Promise((n,r)=>{let i=t.transaction(A).objectStore(A).get(this.key(e));i.onsuccess=()=>n(i.result||null),i.onerror=()=>r(i.error)});if(n)return n;let r=await new Promise((e,n)=>{let r=t.transaction(A).objectStore(A).get(Ke);r.onsuccess=()=>e(r.result||null),r.onerror=()=>n(r.error)});return r&&(!r.user?.id||r.user.id===e)?r:null}return new Promise((e,n)=>{let r=t.transaction(A).objectStore(A).get(Ke);r.onsuccess=()=>e(r.result||null),r.onerror=()=>n(r.error)})}async set(e,t=``){let n=await this.database();return new Promise((r,i)=>{let a=n.transaction(A,`readwrite`),o=a.objectStore(A);o.put(e,Ke),t&&o.put(e,this.key(t)),a.oncomplete=()=>r(),a.onerror=()=>i(a.error)})}async clear(e=``){let t=await this.database();return new Promise((n,r)=>{let i=t.transaction(A,`readwrite`),a=i.objectStore(A);e?a.delete(this.key(e)):a.delete(Ke),i.oncomplete=()=>n(),i.onerror=()=>r(i.error)})}},Ye=class{constructor({fetcher:e=globalThis.fetch.bind(globalThis),syncStore:t,pendingStore:n,onChange:r=()=>{},onRecovered:i=()=>{},debounceMs:a=1500,user:o=null}={}){this.fetcher=e,this.syncStore=t||(n?{get:async(e=``)=>{try{if(e){let t=n.getItem(`yibi-pending-save-v1:${e}`);if(t)return JSON.parse(t);let r=JSON.parse(n.getItem(`yibi-pending-save-v1`)||`null`);return r&&(!r.user?.id||r.user.id===e)?r:null}return JSON.parse(n.getItem(`yibi-pending-save-v1`)||`null`)}catch{return null}},set:async(e,t=``)=>{n.setItem(`yibi-pending-save-v1`,JSON.stringify(e)),t&&n.setItem(`yibi-pending-save-v1:${t}`,JSON.stringify(e))},clear:async(e=``)=>{e?n.removeItem(`yibi-pending-save-v1:${e}`):n.removeItem(`yibi-pending-save-v1`)}}:new Je),this.eager=!!n,this.onChange=r,this.onRecovered=i,this.debounceMs=a,this.snapshot=qe(),this.remoteSnapshot=null,this.status=`loading`,this.ready=!1,this.busy=!1,this.user=o,this.pending=null,this.loaded=!1,this.paused=!1,this.timer=null}update(e=this.status){this.status=e,this.onChange(this)}accept(e){if(Oe(e.transactions),!Number.isSafeInteger(e.revision))throw Error(`服务器返回的账本格式不正确`);let t=e.finance===void 0?void 0:s(e.finance);return this.user=e.user||this.user,{...e,...t===void 0?{}:{finance:t},user:this.user}}async switchUser(e=null){clearTimeout(this.timer),this.user=e,this.loaded=!1,this.pending=null,this.paused=!1,this.busy=!1,this.snapshot=qe(),this.remoteSnapshot=null,this.status=e?`loading`:`auth`,this.ready=!1,e&&await this.loadLocal(),this.onChange(this)}async loadLocal(){if(this.loaded)return;let e=await this.syncStore.get(this.user?.id||``);this.loaded=!0,e&&(this.pending=e.inFlight||null,this.remoteSnapshot=e.remoteSnapshot||null,this.snapshot=e.snapshot||this.remoteSnapshot||qe(),this.user=e.user||this.snapshot.user||this.user,this.remoteSnapshot&&(this.ready=!0,this.status=this.hasLocalChanges()?`queued`:`synced`))}async persist(){await this.syncStore.set({user:this.user,snapshot:this.snapshot,remoteSnapshot:this.remoteSnapshot,inFlight:this.pending},this.user?.id||``)}localDocument(){let{user:e,operationApplied:t,...n}=this.snapshot;return n}remoteDocument(){let{user:e,operationApplied:t,...n}=this.remoteSnapshot||qe();return n}hasLocalChanges(){return!!this.pending||!!this.remoteSnapshot&&JSON.stringify(this.localDocument())!==JSON.stringify(this.remoteDocument())}async request(e=`/api/ledger`,t){let n=new AbortController,r=setTimeout(()=>n.abort(),2e4);try{let r=await this.fetcher(e,{method:t?`POST`:`GET`,credentials:`same-origin`,cache:`no-store`,headers:{Accept:`application/json`,...t?{"Content-Type":`application/json`}:{}},...t?{body:JSON.stringify(t)}:{},signal:n.signal});if(r.redirected||!r.headers.get(`content-type`)?.includes(`application/json`)){let e=Error(`授权已失效，请重新连接账本`);throw e.status=401,e}let i=await r.json();if(!r.ok){let e=Error(i.error||`暂时无法连接账本`);throw e.status=r.status,e}return i}finally{clearTimeout(r)}}mutation(){let e=new Map(this.remoteSnapshot.transactions.map(e=>[e.id,e])),t=new Map(this.snapshot.transactions.map(e=>[e.id,e]));return{accountId:this.user?.id,baseRevision:this.remoteSnapshot.revision,operationId:crypto.randomUUID(),lastChannel:this.snapshot.transactions.length?this.snapshot.lastChannel:`wechat`,upserts:this.snapshot.transactions.filter(t=>JSON.stringify(e.get(t.id))!==JSON.stringify(t)),deleteIds:[...e.keys()].filter(e=>!t.has(e)),...this.snapshot.finance===void 0?{}:{finance:this.snapshot.finance}}}schedule(e=this.debounceMs){!this.paused&&this.ready&&this.hasLocalChanges()&&(clearTimeout(this.timer),this.timer=setTimeout(()=>this.sync().catch(()=>{}),e))}async save(e,t,n){if(await this.loadLocal(),!this.ready||!this.remoteSnapshot)throw Error(`请先连接并同步在线账本`);Oe(e);let r=n===void 0?this.snapshot.finance:s(n);this.snapshot={...this.snapshot,transactions:e,lastChannel:e.length?t:`wechat`,...r===void 0?{}:{finance:r}},this.update(`queued`);try{await this.persist()}catch(e){throw this.update(`failed`),e}if(this.eager)return this.sync();this.schedule()}async saveFinance(e){return this.save(this.snapshot.transactions,this.snapshot.lastChannel,e)}async finishInFlight(e){let t=this.accept(e);this.remoteSnapshot=t,this.snapshot=JSON.stringify(this.localDocument())===JSON.stringify(this.pending.target)?t:{...this.snapshot,revision:t.revision,user:t.user},this.pending=null,await this.persist()}async sync(){if(await this.loadLocal(),!this.busy&&!this.paused&&this.ready&&this.hasLocalChanges()){this.busy=!0,this.update(`syncing`);try{this.pending||(this.pending={mutation:this.mutation(),target:this.localDocument()},await this.persist());let e=await this.request(`/api/ledger`,this.pending.mutation);if(!e.operationApplied)throw Error(`服务器尚未确认保存`);await this.finishInFlight(e),this.update(this.hasLocalChanges()?`queued`:`synced`),this.hasLocalChanges()?this.schedule(0):this.onRecovered()}catch(e){throw e.status===409?(this.paused=!0,this.update(`conflict`)):(this.update(e.status===401?`auth`:`failed`),e.status||(e.message=`保存结果待确认。请稍后重试同步。`),e.status===429&&(e.message=`同步服务暂时限流，已保留本机修改，稍后可重试同步。`)),await this.persist().catch(()=>{}),e}finally{this.busy=!1,this.onChange(this)}}}async refresh(){await this.loadLocal(),this.busy=!0,this.update(`loading`);try{let e=this.user,t=this.accept(await this.request(`/api/ledger`+(this.pending?`?operationId=${encodeURIComponent(this.pending.mutation.operationId)}`:``)));if(e?.id&&t.user?.id!==e.id&&this.hasLocalChanges()){this.user=e,this.paused=!0,this.ready=!0,this.update(`failed`);return}if(e?.id&&t.user?.id&&t.user.id!==e.id?(this.user=t.user,this.loaded=!1,await this.loadLocal()):this.user=t.user||this.user,this.pending&&t.operationApplied)await this.finishInFlight(t),this.onRecovered();else if(!this.remoteSnapshot||!this.hasLocalChanges())this.remoteSnapshot=t,this.snapshot=t,await this.persist();else if(t.revision!==this.remoteSnapshot.revision){this.paused=!0,this.update(`conflict`);return}this.ready=!0,this.paused=!1,this.update(this.hasLocalChanges()?`queued`:`synced`),this.eager&&this.hasLocalChanges()?(this.busy=!1,await this.sync()):this.schedule(0)}catch(e){throw this.ready=!!this.remoteSnapshot,this.update(e.status===409?`conflict`:e.status===401?`auth`:`failed`),e}finally{this.busy=!1,this.onChange(this)}}async retryNow(){this.paused=!1,await this.refresh(),await this.sync()}},Xe=e(`https://ucnepgqhzxpbjgfojfuj.supabase.co`,`sb_publishable_QeUl3UXDoeU5leO_oE8zSw_3gMbEZG8`,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}});function Ze(e,t=503){return Object.assign(Error(e),{status:t})}async function Qe(){let{data:e,error:t}=await Xe.auth.getUser();if(t||!e.user)throw Ze(`请先登录 Supabase 账本`,401);return e.user}async function $e(e=``){await Qe();let{data:t,error:n}=await Xe.rpc(`read_ledger`,{p_operation_id:e||null});if(n)throw Ze(n.message||`无法读取 Supabase 账本`);return t}async function et(e){let t=await Qe();if(e.accountId!==t.id)throw Ze(`登录账号已变化，请重新登录`,401);let{data:n,error:r}=await Xe.rpc(`mutate_ledger`,{p_base_revision:e.baseRevision,p_operation_id:e.operationId,p_last_channel:e.lastChannel,p_upserts:e.upserts||[],p_delete_ids:e.deleteIds||[],p_finance:e.finance??null});if(r)throw r.code===`P0001`?Ze(`账本已在其他设备更新，请先同步`,409):Ze(r.message||`无法保存 Supabase 账本`);return n}var tt=class{async fetch(e,t={}){try{let n=new URL(e,`https://ledger.invalid`);if(t.method===`POST`){let e=JSON.parse(t.body||`{}`);return Response.json(await et(e))}return Response.json(await $e(n.searchParams.get(`operationId`)||``))}catch(e){return Response.json({error:e.message||`暂时无法连接 Supabase`},{status:e.status||503})}}};async function nt(e,t){let{data:n,error:r}=await Xe.auth.signInWithPassword({email:e,password:t});if(r)throw Error(r.message);return n}async function rt(){let{error:e}=await Xe.auth.signOut();if(e)throw Error(e.message)}async function it(){let{data:e,error:t}=await Xe.auth.getSession();if(t)throw Error(t.message);return e.session}function at(e){return Xe.auth.onAuthStateChange((t,n)=>{e(n)})}async function ot(e){if(!e?.access_token||!e?.refresh_token)throw Error(`未找到该账号的登录凭据，请重新输入密码连接`);let{data:t,error:n}=await Xe.auth.setSession(e);if(n)throw Error(n.message);return t}var st=`yibi_saved_accounts_v1`,ct=`yibi_account_mode_`;function lt(){try{let e=localStorage.getItem(st);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ut(e){try{localStorage.setItem(st,JSON.stringify(e))}catch(e){console.error(`Failed to save accounts to localStorage:`,e)}}function dt(e=``){let t=String(e||``).toLowerCase();return t.includes(`484784621`)?`bubu`:t.includes(`cyrdmn`)?`yier`:t.includes(`trip`)||t.includes(`travel`)||t.includes(`shared`)||t.includes(`couple`)||t.includes(`dudutangtang`)||t.includes(`tangtangdudu`)||t.includes(`dudu`)&&t.includes(`tangtang`)?`trip`:`custom`}function ft(e=``){let t=String(e||``).toLowerCase();if(t.includes(`dudutangtang`)||t.includes(`tangtangdudu`)||t.includes(`dudu`)&&t.includes(`tangtang`))return`🐻🎒🐼 嘟嘟与糖糖的游玩账本`;let n=dt(e);return n===`bubu`?`🐻 布布的日常账本`:n===`yier`?`🐼 一二的日常账本`:n===`trip`?`✈️ 我们的游玩账本`:`🐾 ${e?e.split(`@`)[0]:`私人`}的账本`}function pt(e=null,t=null){if(!e?.id&&!e?.email)return!1;if(e?.id)try{let t=localStorage.getItem(`${ct}${e.id}`);if(t===`trip`)return!0;if(t===`personal`)return!1}catch{}if(e?.id){let t=lt().find(t=>t.id===e.id);if(t&&t.isTrip!==void 0)return!!t.isTrip}if(t?.profile?.isTripLedger)return!0;let n=(e?.email||``).toLowerCase();return!!(n.includes(`trip`)||n.includes(`travel`)||n.includes(`shared`)||n.includes(`couple`)||n.includes(`dudutangtang`)||n.includes(`tangtangdudu`)||n.includes(`dudu`)&&n.includes(`tangtang`))}function mt(e,t){if(!e)return;try{localStorage.setItem(`${ct}${e}`,t?`trip`:`personal`)}catch{}let n=lt(),r=n.findIndex(t=>t.id===e);r>=0&&(n[r].isTrip=!!t,t&&n[r].name?.includes(`日常`)?n[r].name=n[r].name.replace(`日常`,`游玩`):!t&&n[r].name?.includes(`游玩`)&&(n[r].name=n[r].name.replace(`游玩`,`日常`)),ut(n))}function ht(e,t={}){let n=e?.user||t?.user;if(!n?.id)return;let r=n.email||``,i=lt(),a=i.findIndex(e=>e.id===n.id),o=t.role||dt(r),s=t.isTrip===void 0?pt(n):t.isTrip,c=t.name||(a>=0?i[a].name:ft(r)),l={id:n.id,email:r,role:o,name:c,isTrip:s,tokens:{access_token:e?.access_token||t?.tokens?.access_token||i[a]?.tokens?.access_token,refresh_token:e?.refresh_token||t?.tokens?.refresh_token||i[a]?.tokens?.refresh_token},lastActive:Date.now()};a>=0?i[a]={...i[a],...l}:i.push(l),ut(i)}function gt(e){ut(lt().filter(t=>t.id!==e));try{localStorage.removeItem(`${ct}${e}`)}catch{}}function _t(e=[]){let t=0,n=0,r=0,i=0,a=0;for(let o of e){if(![`expense`,`refund`].includes(o.type))continue;let e=o.type===`expense`?o.amount:-o.amount;o.payer===`bubu`?t+=e:o.payer===`yier`?n+=e:o.payer===`fund`?r+=e:(i+=e,a++)}let o=t+n,s=Math.round(o/2),c=Math.abs(t-n),l=Math.round(c/2),u=t===n,d=t>n?`yier`:n>t?`bubu`:``,f=t>n?`bubu`:n>t?`yier`:``,p=o+r+i;return{bubuTotal:t,yierTotal:n,fundTotal:r,untaggedTotal:i,untaggedCount:a,totalShared:o,totalExpenses:p,half:s,diff:c,transferAmount:l,isEven:u,payerToPay:d,receiver:f}}function vt(e,t=[]){let n=e?.fundOpening||0,r=0;for(let n of t)e?.id&&n.tripId&&n.tripId!==e.id||n.payer===`fund`&&(n.type===`expense`?r+=n.amount:n.type===`refund`&&(r-=n.amount));let i=n-r,a=n>0?Math.min(100,Math.max(0,Math.round(r/n*100))):0;return{fundOpening:n,fundSpent:r,fundRemaining:i,percentSpent:a,hasFund:n>0||r>0}}function yt(e){let t=e?.startDate||``,n=e?.endDate||``;if(!t||!n)return 0;let r=new Date(`${n}T00:00:00Z`)-new Date(`${t}T00:00:00Z`);return Math.max(1,Math.round(r/864e5)+1)}function bt(e=[],t=[]){let n=0,r=0;for(let e of t)e.type===`expense`?n+=e.amount:e.type===`refund`&&(r+=e.amount);let i=n-r,a=0;if(e.length>0)for(let t of e)a+=yt(t);else a=new Set(t.filter(e=>[`expense`,`refund`].includes(e.type)&&e.date).map(e=>e.date)).size;let o=new Set(t.filter(e=>e.type===`expense`&&e.tripId).map(e=>e.tripId)),s=t.some(e=>e.type===`expense`&&!e.tripId),c=o.size+ +!!s;c===0&&e.length>0&&i>0&&(c=e.length),c===0&&i>0&&(c=1);let l=c>0?Math.round(i/c):0,u=a>0?Math.round(i/a):0;return{gross:n,refund:r,totalExpense:i,totalDays:a,tripCount:e.length,outingCount:c,perOutingAvg:l,dailyAvg:u}}function xt(e=[],t=[],n=``,r=`amount`){let i=n||e[0]?.id||``,a=new Set(e.map(e=>e.id)),o=bt(e,t),s=Math.max(0,o.totalExpense),c=e.map(e=>{let n=t.filter(t=>t.tripId===e.id&&[`expense`,`refund`].includes(t.type)),r=0,a=0;for(let e of n)e.type===`expense`?r+=e.amount:e.type===`refund`&&(a+=e.amount);let o=r-a,s=yt(e),c=s>0?Math.round(o/s):0;return{id:e.id,name:e.name,coverEmoji:e.coverEmoji||`🏖️`,startDate:e.startDate,endDate:e.endDate,status:e.status||`active`,budget:e.budget||0,fundOpening:e.fundOpening||0,days:s,gross:r,refund:a,expense:o,recordCount:n.length,dailyAvg:c,isActive:e.id===i,isCompleted:e.status===`completed`}});r===`date`?c.sort((e,t)=>t.startDate.localeCompare(e.startDate)||t.endDate.localeCompare(e.endDate)):c.sort((e,t)=>t.expense-e.expense||t.startDate.localeCompare(e.startDate));let l=t.filter(e=>(!e.tripId||!a.has(e.tripId))&&[`expense`,`refund`].includes(e.type)),u=null;if(l.length>0){let e=0,t=0;for(let n of l)n.type===`expense`?e+=n.amount:n.type===`refund`&&(t+=n.amount);let n=e-t;u={id:`__untagged__`,name:`未归属特定行程`,coverEmoji:`🗂️`,expense:n,recordCount:l.length,sharePct:s>0&&n>0?Number((n/s*100).toFixed(1)):0}}let d=Math.max(1,...c.map(e=>Math.max(0,e.expense)),u?Math.max(0,u.expense):0);for(let e of c)e.sharePct=s>0&&e.expense>0?Number((e.expense/s*100).toFixed(1)):0,e.barPct=Math.min(100,Math.max(0,Math.max(0,e.expense)/d*100));return u&&(u.barPct=Math.min(100,Math.max(0,Math.max(0,u.expense)/d*100))),{items:c,untagged:u,totalExpense:o.totalExpense}}function St(e=[],t={},n=``){let r=String(t.name??``).trim();if(!r)throw Error(`请输入行程名称`);let i=String(t.startDate??``).trim(),a=String(t.endDate??``).trim();if(!i||!a)throw Error(`请选择完整的出发与返回日期`);if(i>a)throw Error(`行程开始日期不能晚于结束日期`);let o=t.budget??0,c=t.fundOpening??0,l=typeof t.coverEmoji==`string`&&t.coverEmoji.trim()?t.coverEmoji.trim().slice(0,10):`🏖️`,u,d=n;if(n){let t=e.findIndex(e=>e.id===n);if(t<0)throw Error(`未找到要编辑的行程`);let s={...e[t],name:r,startDate:i,endDate:a,budget:o,fundOpening:c,coverEmoji:l};u=e.map((e,n)=>n===t?s:e)}else{d=t.id||`trip-${Date.now()}`;let n={id:d,name:r,startDate:i,endDate:a,budget:o,fundOpening:c,coverEmoji:l,status:`active`};u=[...e,n]}let f=s({trips:u}).trips;return{trips:f,savedTrip:f.find(e=>e.id===d)}}function Ct(e,t=[]){let n=e?.id?t.filter(t=>t.tripId===e.id):t,r=_t(n),i=vt(e,n),a=0,o=0,s=null,c=new Set,l=new Map;for(let e of n){let t=fe(e.category);if(e.type===`expense`){if(a+=e.amount,(!s||e.amount>s.amount)&&(s=e),e.category===`小笨美食`||e.category===`当地美食`||e.category===`餐饮`){let t=(e.payee||``).trim();t&&c.add(t)}l.set(t,(l.get(t)||0)+e.amount)}else e.type===`refund`&&(o+=e.amount,l.set(t,(l.get(t)||0)-e.amount))}let u=Math.max(0,a-o),d=e?.startDate||``,f=e?.endDate||``,p=Math.max(1,yt(e)),m=Math.max(0,p-1),h=Math.round(u/p),g=Math.round(u/2),_=[...l.entries()].map(([e,t])=>({name:e,amount:t})).filter(e=>e.amount>0).sort((e,t)=>t.amount-e.amount);return{tripName:e?.name||`游玩旅程`,coverEmoji:e?.coverEmoji||`🏖️`,startDate:d,endDate:f,days:p,nights:m,recordCount:n.filter(e=>[`expense`,`refund`].includes(e.type)).length,totalExpense:a,totalRefund:o,netExpense:u,dailyAverage:h,perPersonAverage:g,topExpense:s,foodFootprint:[...c].slice(0,12),categories:_,split:r,fund:i,happinessIndex:100,journal:b(e?.journal)}}var wt=`yibi-finance`,Tt=`settings`,Et=`default`,Dt=`cloud-sync`,Ot=class{async open(){if(!(`indexedDB`in globalThis))throw Error(`当前浏览器不支持 IndexedDB，无法建立财务数据本机缓存`);return this.db=await new Promise((e,t)=>{let n=indexedDB.open(wt,1);n.onupgradeneeded=()=>n.result.createObjectStore(Tt),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),this}key(e=``){return e?`finance:${e}`:Et}syncKey(e=``){return e?`sync-meta:${e}`:Dt}async get(e=``){let t=this.key(e),n=await this.request(`readonly`,e=>e.get(t));if(!n&&e){let t=await this.request(`readonly`,e=>e.get(Et)),r=await this.request(`readonly`,e=>e.get(Dt));r&&r.accountId===e&&(n=t)}return s(n||{})}async save(e,t=``){await this.request(`readwrite`,n=>n.put(s(e),this.key(t)))}async getSyncMeta(e=``){let t=this.syncKey(e),n=await this.request(`readonly`,e=>e.get(t));if(!n&&e){let t=await this.request(`readonly`,e=>e.get(Dt));t&&t.accountId===e&&(n=t)}return n&&typeof n.accountId==`string`&&Number.isSafeInteger(n.revision)?n:null}async markSynced(e,t){await this.request(`readwrite`,n=>n.put({accountId:e,revision:t},this.syncKey(e)))}request(e,t){return new Promise((n,r)=>{let i=this.db.transaction(Tt,e),a=t(i.objectStore(Tt));a.onsuccess=()=>n(a.result),a.onerror=()=>r(a.error),i.onerror=()=>r(i.error)})}},kt=e=>e.accountClass===`liability`||e.liability===!0,At=e=>typeof e==`string`&&e.length>0;function jt(e,t){return e.accountId===t||e.fromAccountId===t||e.toAccountId===t}function Mt(e,t){let n=new Map(t.map(e=>[e.id,e]));for(let t of e)if(t.type===`transfer`){let e=At(t.fromAccountId);if(e!==At(t.toAccountId))throw Error(`划转需要同时选择转出和转入账户`);if(e&&t.fromAccountId===t.toAccountId)throw Error(`转出和转入账户不能相同`);if(e&&(!n.has(t.fromAccountId)||!n.has(t.toAccountId)))throw Error(`关联账户不存在，请重新选择`);if(t.accountBalanceApplied===!0&&!e)throw Error(`划转需要选择转出和转入账户`)}else{let e=At(t.accountId);if(e&&!n.has(t.accountId))throw Error(`关联账户不存在，请重新选择`);if(t.accountBalanceApplied===!0&&!e)throw Error(`请选择实际扣款或到账账户`)}}function Nt(e,t,n,r){let i=n===`in`?kt(t)?-r:r:kt(t)?r:-r;e.set(t.id,(e.get(t.id)||0)+i)}function Pt(e,t){let n=new Map;return!e||e.accountBalanceApplied!==!0||(e.type===`transfer`?(Nt(n,t.get(e.fromAccountId),`out`,e.amount),Nt(n,t.get(e.toAccountId),`in`,e.amount)):Nt(n,t.get(e.accountId),e.type===`expense`?`out`:`in`,e.amount)),n}function Ft(e,t,n){Mt([t,n].filter(Boolean),e);let r=new Map(e.map(e=>[e.id,e])),i=new Map,a=(e,t)=>e.forEach((e,n)=>i.set(n,(i.get(n)||0)+e*t));return a(Pt(n,r),1),a(Pt(t,r),-1),e.map(e=>{let t=Number(e.balance||0)+(i.get(e.id)||0);if(!Number.isSafeInteger(t)||t<0)throw Error(`“${e.name}”余额不足，无法保存这笔账单`);return t===e.balance?e:{...e,balance:t}})}var It=e=>new Date(Number(e.slice(0,4)),Number(e.slice(5)),0).getDate();function Lt(e,t,n=6,r=localDate()){let i=Math.max(1,Math.min(120,Number(n)||1)),a=Array.from({length:i},(e,n)=>xe(t,n-i+1)),o=a.map(e=>xe(e,-i)),s=t=>e.filter(e=>t.includes(e.date.slice(0,7))&&!(e.date.slice(0,7)===r.slice(0,7)&&e.date>r)),c=s(a),l=s(o),u=Ce(c),d=Ce(l),f=e=>new Map(we(e,`category`).map(e=>[e.name,e.amount])),p=f(c),m=f(l),h=[...new Set([...p.keys(),...m.keys()])].map(e=>{let t=p.get(e)||0,n=m.get(e)||0;return{name:e,current:t,previous:n,difference:t-n,changeRate:n>0?(t-n)/n:null}}).sort((e,t)=>Math.abs(t.difference)-Math.abs(e.difference));return{months:a,rows:a.map(e=>({month:e,...Ce(c.filter(t=>t.date.startsWith(e)))})),current:c,previous:l,currentSummary:u,previousSummary:d,categoryChanges:h}}function Rt(e={}){return e.accountClass===`liability`||e.liability===!0}function zt(e=[]){let t=e.filter(e=>!e.archived),n=t.filter(e=>!Rt(e)).reduce((e,t)=>e+Number(t.balance||0),0),r=t.filter(Rt).reduce((e,t)=>e+Number(t.balance||0),0);return{assets:n,liabilities:r,netWorth:n-r}}var Bt=`yibi-ledger-v1`,j=document.querySelector(`#app`);j.addEventListener(`error`,e=>{let t=e.target;if(!(t instanceof HTMLImageElement)||t.dataset.fallbackApplied)return;let n=t.dataset.fallback;if(n){if(t.dataset.fallbackApplied=`1`,n===`emoji`){let e=document.createElement(`span`);e.className=t.className,e.textContent=t.dataset.emoji||`🐾`,e.setAttribute(`aria-hidden`,`true`),t.replaceWith(e)}else n===`hide`?(t.closest(`.page-heading-icon-badge`)||t).style.display=`none`:n===`sibling`?(t.style.display=`none`,t.nextElementSibling&&(t.nextElementSibling.style.display=`inline-flex`)):n===`src`&&t.dataset.src&&(t.src=t.dataset.src)}},!0);var M=document.querySelector(`#entry-dialog`),N=document.querySelector(`#confirm-dialog`),P=document.querySelector(`#auth-dialog`),Vt=document.querySelector(`#account-dialog`),Ht=document.querySelector(`#switch-dialog`),F=document.querySelector(`#trip-dialog`),I=document.querySelector(`#trip-form-dialog`),L=document.querySelector(`#poster-dialog`),R=(()=>{let e=window.location.pathname;return e.endsWith(`.html`)?e.slice(0,e.lastIndexOf(`/`)+1):e.endsWith(`/`)?e:`${e}/`})(),Ut=new tt,Wt=``,z=_e(),Gt=z.slice(0,7),Kt=``,B=qe(),V={page:`analysis`,month:Gt,demo:new URLSearchParams(location.search).get(`demo`)===`1`,search:``,channel:``,category:``,type:``,limit:40,importData:null,source:`auto`,analysisTrend:`daily`,reportRange:`6`,breakdownTab:`category`,tripScope:`all`,tripOverviewSort:`amount`},qt=new Ot,H=V.demo?En():o(),Jt=``,Yt=!1,Xt=!1,Zt=o(),Qt=null,$t=null,U=null,en=null,tn=!1,nn=null,rn,an;function on(){try{for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);if(t&&t.startsWith(`sb-`)&&t.endsWith(`-auth-token`)){let e=JSON.parse(localStorage.getItem(t)||`{}`);if(e?.user)return e.user}}}catch{}return null}var sn=on(),W=new Ye({user:sn,fetcher:(e,t)=>Ut.fetch(e,t),onChange(e){let t=B!==e.snapshot;B=e.snapshot,Xt&&B.finance!==void 0&&(H=s(B.finance)),(t||Wt!==e.status)&&!M.open&&!N.open&&!P.open&&!Ht?.open&&!F?.open&&!I?.open&&!L?.open?$():document.querySelectorAll(`[data-sync-status]`).forEach(e=>e.innerHTML=yn())},onRecovered(){J(`上一笔保存已确认，账本已同步`)}});sn&&(W.status=`loading`),at(e=>{e?.user&&ht(e)}),it().then(e=>{e?.user&&ht(e)}).catch(()=>{});function cn(){try{let e=localStorage.getItem(Bt);if(!e)return{app:`yibi-ledger`,version:1,transactions:[],lastChannel:`wechat`};let t=JSON.parse(e);if(t.app!==`yibi-ledger`||t.version!==1)throw Error(`数据版本无法识别`);return Oe(t.transactions),t}catch{return Kt=`本机旧版账本读取失败，请导出原始数据保留备份。`,{app:`yibi-ledger`,version:1,transactions:[],lastChannel:`wechat`}}}async function ln(e,t=B.lastChannel,n){if(V.demo){$t=e,n&&(H=s(n)),$();return}await W.save(e,e.length?t:`wechat`,n),B=W.snapshot,await gn()}function un(){if(V.demo)return Dn();if(!W.ready)throw Error(`请先连接并同步在线账本`);return B.transactions}async function dn(e=W.user?.id||``){if(V.demo){H=En(),Xt=!0,$();return}try{await qt.open(),Yt=!0,H=await qt.get(e),Zt=H,Qt=await qt.getSyncMeta(e),navigator.storage?.persist?.().catch(()=>{})}catch(e){Jt=e.message}Xt=!0,$()}async function G(e){let t=s({...H,...e});if(V.demo){H=t,$();return}await W.saveFinance(t),B=W.snapshot,H=s(B.finance),await gn()}function fn(e=H.accounts,t=z){let{assets:n,liabilities:r,netWorth:i}=zt(e);return{id:crypto.randomUUID(),date:t,totalAssetsMinor:n,totalLiabilitiesMinor:r,netWorthMinor:i}}function pn(e){let t=H.netWorthSnapshots||[],n=fn(e),r=t.findIndex(e=>e.date===z),i=r>=0?t.map((e,t)=>t===r?{...n,id:e.id}:e):[...t,n];return s({...H,accounts:e,netWorthSnapshots:i})}async function mn(){if(X()||!W.ready||!H.accounts.length)return;let e=H.netWorthSnapshots||[],t=fn(),n=e.findIndex(e=>e.date===z);n>=0&&[`totalAssetsMinor`,`totalLiabilitiesMinor`,`netWorthMinor`].every(r=>e[n][r]===t[r])||await G({netWorthSnapshots:n>=0?e.map((e,r)=>r===n?{...t,id:e.id}:e):[...e,t]})}async function hn(e){await G(pn(e))}async function gn(){if(B.finance===void 0)return;H=s(B.finance),Zt=null;let e=W.user?.id||``;if(Qt={accountId:e,revision:B.revision},Yt)try{await qt.save(H,e),await qt.markSynced(e,Qt.revision),Jt=``}catch(e){Jt=`云端数据已同步，但本机缓存失败：${e.message}`}}async function _n(){let e=W.user?.id||``,t=Zt,n=t&&c(t)&&(!Qt||Qt.accountId===e),r=!1;if(B.finance===void 0&&n)await W.saveFinance(t),B=W.snapshot,r=!0;else if(B.finance!==void 0&&!Qt&&n){let e=l(B.finance,t);JSON.stringify(e)!==JSON.stringify(s(B.finance))&&(await W.saveFinance(e),B=W.snapshot),r=!0}else B.finance===void 0&&(H=o());return await gn(),B.finance===void 0&&(Zt=null),r}async function vn(){await W.refresh(),B=W.snapshot;let e=await _n();return await mn(),e}function yn(){return V.demo?`<span class="sync-label preview"><i></i>示例模式 · 仅保存在本页</span>`:`<span class="sync-label ${W.status}"><i></i>${{loading:`正在连接账本…`,queued:`已保存到本机，等待同步`,syncing:`正在同步`,synced:`已同步`,failed:`同步失败，等待重试`,auth:`等待连接私人账本`,conflict:`其他设备已修改，需要处理冲突`,offline:`网络离线，已保存至本机`}[W.status]||`已连接`}</span>${W.status===`auth`?q(`连接账本`,`connect`,`text-btn`):q(`立即同步`,`sync`,`text-btn`)}${W.ready?q(`管理连接`,`connect`,`text-btn`):``}`}var K=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),bn=e=>String(e).trim()===`0`||String(e).trim()===`0.00`?0:be(e),q=(e,t,n=`btn`,r=``)=>`<button class="${n}" data-action="${t}" ${r}>${e}</button>`;function xn(){return W.status===`loading`?`<section class="panel connection-panel welcome-card" style="text-align:center;padding:56px 20px;">
      <div style="margin-bottom:14px;"><img src="${R}icons/icon-192.png" width="58" height="58" alt="熊熊账本" style="width:58px;height:58px;border-radius:14px;box-shadow:0 6px 18px #5c382015;display:inline-block;"></div>
      <h2 style="font-size:20px;margin-bottom:8px;color:#2e241d;">正在载入熊熊账本…</h2>
      <p style="color:var(--text-secondary);font-size:13px;">正在同步你的私人账本数据，请稍候</p>
    </section>`:`<section class="panel connection-panel welcome-card" style="text-align:center;padding:48px 20px;">
    <div style="margin-bottom:14px;"><img src="${R}icons/icon-192.png" width="64" height="64" alt="熊熊账本" style="width:64px;height:64px;border-radius:16px;box-shadow:0 6px 18px #5c382015;display:inline-block;"></div>
    <h2 style="font-size:22px;margin-bottom:8px;color:#2e241d;">连接你的熊熊账本</h2>
    <p style="max-width:340px;margin:0 auto 20px;color:var(--text-secondary);font-size:13px;line-height:1.6;">账本安全保存在你的云端数据库中。手机、平板与电脑登录同一账号即可实时同步。</p>
    <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
      <button class="btn primary" data-action="connect" style="min-width:130px;">登录 / 连接账本</button>
      <button class="btn secondary" data-action="toggle-demo">浏览示例账本</button>
    </div>
  </section>`}function Sn(){let e=W.user?.email||``;return`<div class="auth-dialog-body">
    <div class="dialog-header auth-dialog-header">
      <div class="auth-header-title-group">
        <span class="soft-icon auth-header-icon">${k(`shield`,22)}</span>
        <div class="auth-header-titles">
          <span class="eyebrow">CLOUD LEDGER</span>
          <h2>${W.ready?`管理本设备的连接`:`连接你的私人账本`}</h2>
        </div>
      </div>
      ${q(k(`close`,20),`close-auth`,`icon-btn auth-close`,`type="button" aria-label="关闭连接窗口"`)}
    </div>
    ${e?`
      <div class="auth-current-card">
        <span class="auth-status-dot ${W.ready?`ready`:``}" aria-hidden="true"></span>
        <div class="auth-current-meta">
          <strong>当前已连接账号</strong>
          <span>${K(e)}</span>
        </div>
        ${q(`退出登录`,`disconnect`,`btn small auth-disconnect-btn`,`type="button"`)}
      </div>
    `:``}
    <p class="auth-desc">${e?`如需刷新登录状态或切换其他云端账号，可在下方输入邮箱与密码：`:`账本保存在 Supabase 数据库中。手机、平板和电脑登录同一个账号即可使用同一本账。`}</p>
    <form class="connection-form"><label class="field-label" for="supabase-email">邮箱<input id="supabase-email" type="email" placeholder="例如：dudu@tangtang.com" autocomplete="email" required></label>
    <label class="field-label" for="supabase-password">密码<input id="supabase-password" type="password" autocomplete="current-password" required></label>
    <small>登录状态只保存在本浏览器的 Supabase 会话中。</small>
    <p class="connection-error inline-error" role="alert"></p><button type="submit" class="btn primary" ${W.busy?`disabled`:``}>${e?`重新验证并同步`:`登录并同步`}</button></form>
    ${W.pending?`<p class="field-hint">本机修改尚未同步。重新连接后会先检查保存结果，避免重复记账。</p>`:``}
  </div>`}function Cn(e=``){P.innerHTML=Sn(),wn(P),P.open||P.showModal();let t=P.querySelector(`#supabase-email`);t&&(t.value=e||W.user?.email||``)}function wn(e){let t=e.querySelector(`.connection-form`);t&&t.addEventListener(`submit`,async n=>{if(n.preventDefault(),W.busy)return;let r=t.querySelector(`#supabase-email`).value.trim(),i=t.querySelector(`#supabase-password`).value,a=()=>e.querySelector(`.connection-error`);t.querySelector(`[type="submit"]`).disabled=!0;try{await nt(r,i);let e=await it(),t=e?.user||null;e&&ht(e),await W.switchUser(t),t?.id&&await dn(t.id);let n=pt(t,H);n&&t?.id&&mt(t.id,!0);let a=(r||t?.email||t?.id||``).toLowerCase(),o=null;n?o=`trip`:a.includes(`484784621`)?o=`bubu`:a.includes(`cyrdmn`)&&(o=`yier`),(o&&H.profile.theme!==o||n&&!H.profile.isTripLedger)&&(H.profile.theme=o||H.profile.theme,await G({profile:{...H.profile,theme:o||H.profile.theme,...n?{isTripLedger:!0}:{}}}));let s=await vn();P.close(),$(),J((s?`账本已连接，本机财务数据已合并同步`:`账本已连接并同步`)+(n?`（已载入情侣游玩度假主题 🌲）`:o===`bubu`?`（已载入小熊布布主题 🐻）`:o===`yier`?`（已载入熊猫一二主题 🐼）`:``))}catch(e){a()&&(a().textContent=e.message)}finally{let t=e.querySelector(`.connection-form [type="submit"]`);t&&(t.disabled=!1)}})}function J(e,t){clearTimeout(rn),an=t;let n=document.querySelector(`#toast`);n.innerHTML=`${k(`check`,17)}<span>${K(e)}</span>${t?`<button data-action="undo">撤销</button>`:``}`,n.classList.add(`visible`),rn=setTimeout(()=>n.classList.remove(`visible`),t?15e3:4500)}function Tn(){let e=e=>`${Gt}-${String(Math.min(e,Number(z.slice(-2)))).padStart(2,`0`)}`,t=[[1,`income`,125e4,`工资`,`bank`,`${Number(Gt.slice(5))}月工资`,``],[1,`expense`,24e4,`居住`,`alipay`,`房租`,`每月固定支出`],[2,`expense`,12880,`日用`,`wechat`,`盒马鲜生`,`补充冰箱`],[2,`expense`,2800,`餐饮`,`wechat`,`工作日午餐`,``],[3,`expense`,18900,`购物`,`alipay`,`优衣库`,`换季添一件`],[3,`expense`,1800,`餐饮`,`wechat`,`瑞幸咖啡`,`一杯冰拿铁`],[4,`expense`,3600,`交通`,`alipay`,`滴滴出行`,`下雨天回家`],[4,`expense`,5e3,`学习`,`wechat`,`书店`,`一本新书`],[5,`expense`,8600,`餐饮`,`wechat`,`周末小聚`,`和朋友吃饭`],[5,`expense`,6e3,`娱乐`,`alipay`,`电影院`,`周末电影`],[6,`expense`,1500,`餐饮`,`cash`,`早餐铺`,`豆浆和小笼包`],[6,`expense`,3200,`日用`,`wechat`,`便利店`,``],[7,`expense`,4200,`餐饮`,`wechat`,`一人食`,`好好吃饭`],[8,`expense`,1800,`餐饮`,`wechat`,`Manner Coffee`,`晨间咖啡`],[8,`expense`,600,`交通`,`alipay`,`地铁出行`,`日常通勤`],[8,`expense`,2850,`餐饮`,`wechat`,`今日午餐`,`番茄牛腩饭`]].map(([t,n,r,i,a,o,s],c)=>({id:`demo-${c}`,date:e(t),type:n,amount:r,category:i,channel:a,payee:o,note:s,source:`demo`,createdAt:String(c).padStart(3,`0`)})),n=t.filter(e=>e.type===`expense`).map((e,t)=>({...e,id:`previous-${t}`,date:xe(Gt,-1)+e.date.slice(7),amount:Math.round(e.amount*(t%2==0?.82:1.25))}));return[...t,...n]}function En(){let e=(e,t,n,r)=>({id:e,name:t,accountClass:`asset`,accountType:n,openingBalanceMinor:r,balance:r,includeInBudget:!1,includeInForecast:[`cash`,`checking`,`wallet`].includes(n),archived:!1});return s({accounts:[e(`demo-account-bank`,`招商银行`,`checking`,1286400),e(`demo-account-wallet`,`微信钱包`,`wallet`,86e3),e(`demo-account-cash`,`现金`,`cash`,32e3)]})}function Dn(){return $t||=Tn(),$t}function Y(){return V.demo?Dn():B.transactions}function On(){return Y().filter(e=>e.date.startsWith(V.month))}function kn(e){return[...e].sort((e,t)=>t.date.localeCompare(e.date)||(t.createdAt||t.id).localeCompare(e.createdAt||e.id))}function An(){return`${Number(V.month.slice(0,4))} 年 ${Number(V.month.slice(5))} 月`}var jn=new Set([`餐饮`,`购物`,`交通`,`日用`,`居住`,`娱乐`,`健康`,`学习`,`人情`,`其他`]);function X(){return!V.demo&&pt(W.user,H)}function Mn(){if(X())return`trip`;let e=(W.user?.email||W.user?.id||``).toLowerCase();if(e.includes(`cyrdmn`))return`yier`;if(e.includes(`484784621`))return`bubu`;if(H.profile?.theme===`yier`)return`yier`;if(H.profile?.theme===`bubu`)return`bubu`;if(H.profile?.theme===`trip`)return`trip`;try{let e=localStorage.getItem(`local_theme_preview`);if(e===`yier`||e===`bubu`||e===`trip`)return e}catch{}return`bubu`}function Nn(e,t=Mn(),n=20){let r=e===`其它`?`其他`:e,i=ce[r]||ce.其他;return i.emoji?`<span style="font-size:${n}px;line-height:1;display:inline-flex;align-items:center;justify-content:center;">${i.emoji}</span>`:jn.has(r)&&t!==`trip`?`<img class="category-img" src="${`${R}icons/categories/${t}/${encodeURIComponent(r)}.webp`}" width="${n}" height="${n}" alt="" aria-hidden="true" loading="lazy" data-fallback="sibling"><span class="category-fallback" style="display:none">${k(i.icon,n)}</span>`:k(i.icon,n)}function Pn(e){let t=e===`其它`?`其他`:e,n=ce[t]||ce.其他;return`<span class="category-icon" style="--category:${n.color};--category-bg:${n.bg}">${Nn(t,Mn(),18)}</span>`}function Fn(e){let t=se[e];return`<span class="channel-label" style="--channel:${t.color}">${k(t.icon,16)}${t.name}</span>`}function In(e){if(e===z)return`今天`;let t=new Date(z+`T12:00:00`);return t.setDate(t.getDate()-1),e===_e(t)?`昨天`:`${Number(e.slice(5,7))} 月 ${Number(e.slice(8))} 日`}function Ln(){return{page:V.page,category:V.category||``,channel:V.channel||``,search:V.search||``,type:V.type||``,month:V.month||Gt}}var Rn=!1;function zn(e,t={}){let{push:n=!0}=t,r=Ln();if(V.page=e,V.limit=40,n&&!Rn){let e=Ln();JSON.stringify(r)!==JSON.stringify(e)&&history.pushState(e,``,window.location.href)}$(),window.scrollTo({top:0,behavior:`instant`})}function Bn(){return`<div class="month-picker">${q(k(`left`,16),`prev-month`,`icon-btn`,`aria-label="上个月"`)}<label class="month-label">${k(`calendar`,17)}<span>${An()}</span><input type="month" aria-label="选择月份" value="${V.month}" min="1900-01" max="2199-12"></label>${q(k(`right`,16),`next-month`,`icon-btn`,`aria-label="下个月"`)}</div>`}var Vn={analysis:{name:`收支分析`,glyph:`chart`,image:`analysis.webp`},assets:{name:`资产`,glyph:`card`,image:`assets.webp`},reports:{name:`报表`,glyph:`chart`,image:`reports.webp`},data:{name:`导入与备份`,glyph:`upload`,image:`data.webp`},transactions:{name:`账单明细`,glyph:`list`,image:`transactions.webp`}};function Hn(e,t=20){let n=Vn[e];return n?`<span class="nav-icon-wrap"><img class="nav-icon-img" src="${R}icons/tabs/${n.image}" width="${t}" height="${t}" alt="" aria-hidden="true" decoding="async" data-fallback="sibling"><span class="nav-icon-fallback" style="display:none">${k(n.glyph,t)}</span></span>`:``}function Un(e){let t=Vn[e];return t?`<div class="page-heading-icon-badge" aria-hidden="true"><img class="page-heading-icon-img" src="${R}icons/tabs/${t.image}" alt="" decoding="async" data-fallback="sibling"><span class="page-heading-icon-fallback" style="display:none">${k(t.glyph,22)}</span></div>`:``}function Wn(){let e=X(),t=W.user?.email||``,n=dt(t);return`
    <div class="account-switcher-trigger" data-action="open-switcher" title="点击快捷切换账本">
      <div class="switcher-avatar">${e?`✈️`:n===`yier`?`🐼`:n===`bubu`?`🐻`:`👤`}</div>
      <div class="switcher-info">
        <span class="switcher-name">${K(lt().find(e=>e.id===W.user?.id)?.name||ft(t))}</span>
        <span class="switcher-mode-badge ${e?`trip-badge`:`personal-badge`}">${e?`🌲 游玩专属账本`:`🏠 个人日常账本`}</span>
      </div>
      <span class="switcher-chevron">${k(`down`,13)}</span>
    </div>
  `}function Gn(){let e=X(),t=Mn(),n=W.user?.email||``,r=dt(n),i=!e&&(t===`yier`||r===`yier`),a=e?`✈️`:r===`yier`?`🐼`:r===`bubu`?`🐻`:`👤`,o=(lt().find(e=>e.id===W.user?.id)?.name||ft(n)).replace(/[🐻🐼✈️🐾\s]/g,``).slice(0,7)||`我的账本`;return`
    <header class="mobile-header">
      <div class="mobile-brand">
        <span class="mobile-brand-icon">${e?`🐻🎒🐼`:i?`<img class="mobile-brand-img" src="${R}icons/mascots/yier.webp" width="28" height="28" alt="一二" data-fallback="emoji" data-emoji="🐼">`:`<img class="mobile-brand-img" src="${R}icons/mascots/bubu.webp" width="28" height="28" alt="布布" data-fallback="emoji" data-emoji="🐻">`}</span>
        <span class="mobile-brand-title">${e?`熊熊同行`:`熊熊账本`}</span>
      </div>
      <button class="account-switcher-pill" data-action="open-switcher" type="button" aria-label="切换账本">
        <span>${a}</span>
        <span class="switcher-pill-label">${K(o)}</span>
        <span class="switcher-pill-badge">${e?`游玩`:`日常`}</span>
        <span class="switcher-pill-arrow">▾</span>
      </button>
    </header>
  `}function Kn(){qn(),Ht.showModal()}function qn(){let e=lt(),t=W.user?.id||``,n=X();Ht.innerHTML=`
    <div class="switch-dialog-content">
      <div class="dialog-header">
        <div>
          <span class="eyebrow">FAST SWITCHER</span>
          <h2>账本快捷切换</h2>
        </div>
        ${q(k(`close`,21),`close-switch-dialog`,`icon-btn`,`type="button" aria-label="关闭窗口"`)}
      </div>

      <p style="color:var(--text-secondary);font-size:13px;margin:8px 0 16px;line-height:1.5;">
        已在当前设备安全保存的账本凭据，点击即可秒级免密切换。日常开销与游玩账目清晰独立。
      </p>

      <div class="saved-account-list">
        ${e.length?e.map(e=>{let n=e.id===t,r=!!e.isTrip,i=r?`✈️`:e.role===`yier`?`🐼`:e.role===`bubu`?`🐻`:`👤`;return`
            <div class="saved-account-card ${n?`active`:``}">
              <div class="saved-account-avatar">${i}</div>
              <div class="saved-account-meta">
                <h4>${K(e.name)}</h4>
                <p>${K(e.email||`已连接账号`)}</p>
                <div class="saved-account-tags">
                  <span class="switcher-mode-badge ${r?`trip-badge`:`personal-badge`}">${r?`🌲 游玩专属`:`🏠 日常账本`}</span>
                  ${n?`<span class="active-tag">当前使用中 ✓</span>`:``}
                </div>
              </div>
              <div class="saved-account-actions">
                ${n?`
                  <button class="account-type-toggle-btn" data-action="toggle-account-trip" data-id="${K(e.id)}">
                    设为${r?`日常`:`游玩`}
                  </button>
                `:`
                  <button class="btn secondary" data-action="switch-account" data-id="${K(e.id)}" style="min-height:30px;padding:3px 12px;font-size:12px;">切换</button>
                  <button class="text-btn danger" data-action="remove-account" data-id="${K(e.id)}" style="font-size:12px;padding:4px;" title="仅移除本机快捷记录">移除</button>
                `}
              </div>
            </div>
          `}).join(``):`
          <div class="empty-state" style="padding:24px 16px;text-align:center;">
            <p style="color:var(--text-secondary);font-size:13px;margin:0;">当前暂无保存的账号，点击下方登录账本即可自动保存。</p>
          </div>
        `}
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px;">
        <button class="btn primary" data-action="add-new-account" type="button" style="width:100%;">
          + 连接 / 登录新账本账号
        </button>
        ${W.user?`
          <button class="text-btn" data-action="quick-toggle-current-mode" type="button" style="font-size:12px;color:var(--text-secondary);text-align:center;padding:6px;">
            将当前账本设为「${n?`个人日常账本 🏠`:`情侣游玩专属账本 🌲`}」
          </button>
        `:``}
      </div>
    </div>
  `}var Jn=[{emoji:`🏖️`,label:`海边度假`},{emoji:`🚄`,label:`高铁周边`},{emoji:`🏕️`,label:`户外露营`},{emoji:`🎡`,label:`主题乐园`},{emoji:`🍲`,label:`美食吃货`},{emoji:`🌲`,label:`森林自然`},{emoji:`✈️`,label:`远途飞行`},{emoji:`🏰`,label:`城市漫步`},{emoji:`🏔️`,label:`登山徒步`},{emoji:`🎆`,label:`节日度假`}],Z={editingId:``,coverEmoji:`🏖️`,name:``,startDate:``,endDate:``,budgetInput:``,fundOpeningInput:``};function Yn(e){return!e||e<=0?``:(e/100).toFixed(2).replace(/\.00$/,``)}function Xn(e,t){let n=String(e??``).replace(/[¥￥元\s]/g,``).trim();if(!n||/^0+(?:\.0{1,2})?$/.test(n))return 0;let r=be(n);if(r===null)throw Error(`请输入有效的${t}金额（最多两位小数，不设请留空或填 0）`);return r}function Zn(e){let t=H.trips||[],n=t.find(e=>e.id===H.activeTripId)||t[0]||null;if(!n)return`
      <section class="trip-hero-card" aria-label="游玩行程">
        <div class="trip-hero-top">
          <div class="trip-hero-main">
            <span class="trip-hero-emoji">🏕️</span>
            <div>
              <h3 class="trip-hero-name">开启属于你们的浪漫游玩吧！</h3>
              <div class="trip-hero-dates">创建专属行程，随时编辑时间与预算，记录花销并生成旅行手账海报</div>
            </div>
          </div>
          <div class="trip-hero-actions">
            <button type="button" class="trip-btn-poster" data-action="open-trip-create">➕ 新建游玩行程</button>
          </div>
        </div>
      </section>
    `;let r=Ce(e.filter(e=>e.tripId===n.id)),i=yt(n),a=n.budget||0,o=r.expense,s=a-o,c=a>0?Math.min(100,Math.max(0,Math.round(o/a*100))):0,l=vt(n,e),u=n.status===`completed`;return`
    <section class="trip-hero-card" aria-label="当前游玩行程">
      <div class="trip-hero-top">
        <div class="trip-hero-main">
          <span class="trip-hero-emoji">${n.coverEmoji||`🏖️`}</span>
          <div>
            <h3 class="trip-hero-name">
              <span>${K(n.name)}</span>
              <span class="trip-badge-active" style="${u?`background:#888;`:``}">${u?`已收官 🎉`:`进行中 🎒`}</span>
            </h3>
            <div class="trip-hero-dates">📅 ${n.startDate} ~ ${n.endDate}（${i}天） · 本趟花销 ¥${O(r.expense)}</div>
          </div>
        </div>
        <div class="trip-hero-actions">
          <button type="button" class="trip-btn-create" data-action="open-trip-create">➕ 新建行程</button>
          <button type="button" class="trip-btn-manage" data-action="edit-trip" data-id="${K(n.id)}">✏️ 编辑行程</button>
          <button type="button" class="trip-btn-manage" data-action="open-trip-manage">🎒 行程管理</button>
          <button type="button" class="trip-btn-poster" data-action="open-poster-dialog" data-trip-id="${K(n.id)}">📖 旅行艺术手账</button>
        </div>
      </div>

      ${a>0||l.hasFund?`
      <div class="trip-hero-grid">
        ${a>0?`
          <div class="trip-meter-box">
            <div class="trip-meter-label">
              <span>🎯 行程预算进度</span>
              <strong>${c}%</strong>
            </div>
            <div class="trip-meter-bar">
              <div class="trip-meter-fill budget" style="width:${c}%"></div>
            </div>
            <div class="trip-meter-detail">
              <span>已用 ¥${O(o)}</span>
              <span>${s>=0?`剩余 ¥${O(s)}`:`超支 ¥${O(Math.abs(s))}`}</span>
            </div>
          </div>
        `:``}

        ${l.hasFund?`
          <div class="trip-meter-box">
            <div class="trip-meter-label">
              <span>🍯 恋爱游玩小金库</span>
              <strong>${l.percentSpent}% 已扣</strong>
            </div>
            <div class="trip-meter-bar">
              <div class="trip-meter-fill fund" style="width:${l.percentSpent}%"></div>
            </div>
            <div class="trip-meter-detail">
              <span>剩余 ¥${O(l.fundRemaining)}</span>
              <span>初始 ¥${O(l.fundOpening)}</span>
            </div>
          </div>
        `:``}
      </div>
      `:``}
    </section>
  `}function Qn(){let e=H.trips||[];if(!e.length)return`<button type="button" class="btn secondary small" data-action="open-trip-create" style="min-height:36px;font-size:13px;padding:4px 12px;">➕ 新建行程</button>`;let t=H.activeTripId||e[0]?.id||``;return`
    <div class="trip-quick-picker-box">
      <select class="trip-quick-select" data-action="quick-switch-trip" aria-label="切换当前游玩行程">
        ${e.map(e=>`<option value="${K(e.id)}" ${e.id===t?`selected`:``}>${e.coverEmoji||`🏖️`} ${K(e.name)} (${e.startDate.slice(5)}~${e.endDate.slice(5)})</option>`).join(``)}
      </select>
    </div>
  `}function $n(){er(),F.open||F.showModal()}function er(){let e=H.trips||[],t=H.activeTripId||e[0]?.id||``,n=Y(),r=e.length?`
    <div class="trip-list-wrap">
      <div class="trip-list-meta">
        <span>已创建 <strong>${e.length}</strong> 趟行程 · 点击「编辑」可随时反复修改行程信息</span>
      </div>
      ${e.map(e=>{let r=e.id===t,i=Ce(n.filter(t=>t.tripId===e.id)),a=yt(e),o=e.status===`completed`;return`
          <div class="trip-card-item ${r?`active`:``}">
            <div class="trip-card-left">
              <span class="trip-card-emoji">${e.coverEmoji||`🏖️`}</span>
              <div class="trip-card-info">
                <h4>
                  <span class="trip-card-name-text">${K(e.name)}</span>
                  ${r?`<span class="trip-badge-active">当前</span>`:``}
                  ${o?`<span class="trip-badge-done">已收官</span>`:``}
                </h4>
                <p class="trip-card-meta">
                  <span class="trip-meta-chunk">📅 ${e.startDate} ~ ${e.endDate}（${a}天）</span>
                  <span class="trip-meta-chunk">开销 ¥${O(i.expense)}</span>
                  ${e.budget?`<span class="trip-meta-chunk">预算 ¥${O(e.budget)}</span>`:``}
                  ${e.fundOpening?`<span class="trip-meta-chunk">小金库 ¥${O(e.fundOpening)}</span>`:``}
                </p>
              </div>
            </div>
            <div class="trip-card-actions">
              <button type="button" class="btn secondary trip-action-btn" data-action="edit-trip" data-id="${K(e.id)}">✏️ 编辑</button>
              <button type="button" class="btn secondary trip-action-btn" data-action="open-poster-from-trip" data-id="${K(e.id)}">📖 手账</button>
              ${r?``:`<button type="button" class="btn secondary trip-action-btn" data-action="set-active-trip" data-id="${K(e.id)}">设为当前</button>`}
              <button type="button" class="btn secondary trip-action-btn" data-action="toggle-trip-status" data-id="${K(e.id)}">${o?`重开`:`收官`}</button>
              <button type="button" class="text-btn danger trip-delete-btn" data-action="delete-trip" data-id="${K(e.id)}" title="删除行程">删除</button>
            </div>
          </div>
        `}).join(``)}
    </div>
  `:`
    <div class="empty-state" style="padding:28px 16px;text-align:center;">
      <p style="color:var(--text-secondary);font-size:13.5px;margin:0 0 14px 0;">目前还没有创建游玩行程，点击下方新建第一趟旅程吧！</p>
      <button type="button" class="btn primary" data-action="open-trip-create">➕ 新建游玩行程</button>
    </div>
  `;F.innerHTML=`
    <div class="trip-dialog-content">
      <div class="trip-dialog-header">
        <h3 class="trip-dialog-title">🎒 行程管理</h3>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn secondary small" data-action="open-trip-create" style="min-height:32px;padding:4px 12px;font-size:12.5px;">➕ 新建行程</button>
          ${q(k(`close`,20),`close-trip-dialog`,`icon-btn`,`type="button" aria-label="关闭"`)}
        </div>
      </div>
      ${r}
    </div>
  `}function tr(e=``){let t=e?(H.trips||[]).find(t=>t.id===e):null;if(e&&!t){J(`未找到要编辑的行程`);return}Z.editingId=t?t.id:``,Z.coverEmoji=t?.coverEmoji||`🏖️`,Z.name=t?.name||``,Z.startDate=t?.startDate||z,Z.endDate=t?.endDate||z,Z.budgetInput=Yn(t?.budget||0),Z.fundOpeningInput=Yn(t?.fundOpening||0),nr(),I.open||I.showModal(),I.querySelector(`[name="name"]`)?.focus()}function nr(){let e=!!Z.editingId,t=Z.coverEmoji&&!Jn.some(e=>e.emoji===Z.coverEmoji)?[{emoji:Z.coverEmoji,label:`当前图标`},...Jn]:Jn;I.innerHTML=`
    <div class="trip-dialog-content">
      <div class="trip-dialog-header">
        <h3 class="trip-dialog-title">${e?`✏️ 编辑行程信息`:`➕ 新建游玩行程`}</h3>
        ${q(k(`close`,20),`close-trip-form-dialog`,`icon-btn`,`type="button" aria-label="关闭"`)}
      </div>

      <form id="trip-upsert-form" class="trip-upsert-form">
        <label class="field-label trip-form-field">
          <span class="trip-field-label-text">行程名称</span>
          <input name="name" value="${K(Z.name)}" placeholder="例如：五一成都吃货行 / 厦门海边行" required maxlength="60">
        </label>

        <div class="field-label trip-form-field">
          <span class="trip-field-label-text">旅行主题图标</span>
          <div class="emoji-selector-grid" role="group" aria-label="旅行主题图标">
            ${t.map(e=>`<button type="button" class="emoji-pill-btn ${e.emoji===Z.coverEmoji?`selected`:``}" data-action="select-trip-emoji" data-emoji="${K(e.emoji)}"><span class="emoji-pill-icon">${e.emoji}</span><span class="emoji-pill-text">${e.label}</span></button>`).join(``)}
          </div>
        </div>

        <div class="trip-form-row-two">
          <label class="field-label trip-form-field">
            <span class="trip-field-label-text">出发日期</span>
            <input type="date" name="startDate" value="${K(Z.startDate)}" required>
          </label>
          <label class="field-label trip-form-field">
            <span class="trip-field-label-text">返回日期</span>
            <input type="date" name="endDate" value="${K(Z.endDate)}" required>
          </label>
        </div>

        <div class="trip-form-row-two">
          <label class="field-label trip-form-field">
            <span class="trip-field-label-text">行程总预算 <span class="optional">(可选)</span></span>
            <input type="number" step="0.01" min="0" inputmode="decimal" name="budget" value="${K(Z.budgetInput)}" placeholder="留空表示不设预算">
          </label>
          <label class="field-label trip-form-field">
            <span class="trip-field-label-text">共同小金库初始总额 <span class="optional">(可选)</span></span>
            <input type="number" step="0.01" min="0" inputmode="decimal" name="fundOpening" value="${K(Z.fundOpeningInput)}" placeholder="例如双方各存2000填4000">
          </label>
        </div>

        <div class="trip-explain-card">
          <div class="explain-row">
            <span class="explain-badge">🎯 总预算</span>
            <p><strong>本趟游玩的花费上限目标</strong>。无论谁买单均计入预算消耗；留空或填 0 可关闭预算进度条。</p>
          </div>
          <div class="explain-row">
            <span class="explain-badge">🍯 小金库</span>
            <p><strong>出发前两人凑好的公共钱包</strong>。记账选「共同基金」付款直接扣减小金库；行程信息保存后仍可随时反复修改。</p>
          </div>
        </div>

        <p id="trip-form-error" class="inline-error" role="alert" style="margin:0;"></p>

        <div class="trip-form-actions">
          ${q(`取消`,`close-trip-form-dialog`,`btn`,`type="button"`)}
          <button type="submit" class="btn primary">${e?`保存修改`:`创建并设为当前行程`}</button>
        </div>
      </form>
    </div>
  `,I.querySelector(`#trip-upsert-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();let n=t.target,r=I.querySelector(`#trip-form-error`);r&&(r.textContent=``);let i=new FormData(n),a=String(i.get(`name`)||``).trim(),o=String(i.get(`startDate`)||``).trim(),s=String(i.get(`endDate`)||``).trim();try{let t=Xn(i.get(`budget`),`行程总预算`),n=Xn(i.get(`fundOpening`),`共同小金库`),{trips:r,savedTrip:c}=St(H.trips||[],{name:a,startDate:o,endDate:s,budget:t,fundOpening:n,coverEmoji:Z.coverEmoji},Z.editingId);e?(await G({trips:r}),J(`行程「${c.name}」信息已更新 ✨`)):(await G({trips:r,activeTripId:c.id}),J(`行程「${c.name}」已创建并设为当前进行中！🎉`)),I.close(),F.open&&er(),$()}catch(e){r?r.textContent=e.message:J(`保存行程失败: ${e.message}`)}})}var rr=`你是一名擅长极简插画、纸张媒介、丙烯色块绘画与视觉提炼的封面插画师。
请将我上传的单张照片制作成一张3:4竖版双分区艺术海报，画面上下严格按照1:1/50%:50%分区。上半部分:完整保留原始照片的主体、人物、建筑、动物、自然景观、空间关系与核心构图，保持真实摄影质感、自然光影和原有色彩氛围，仅允许轻微高级调色，不改变照片内容。
下半部分:根据上半部分照片重新进行视觉提炼与再创作。
提取照片中最具识别性的主体、轮廓、姿态、动作、空间关系与叙事关系，删除复杂细节，用纤细、轻微不稳定的手绘线条+少量明确的丙烯平涂色块重新表达。
不要写实复刻原图，也不要直接将照片转换成线稿。插画主体必须小而集中，仅占下半部分约10%-20%，四周保留大量留白，让画面呈现"小主体、大留白"的视觉关系。
背景使用粗糙白纸、米白纸或浅色艺术纸张纹理，保留明显纸张颗粒感，仅用少量线条、笔触或简单色面暗示山脉、海面、草地、建筑、天空等环境。
颜色从原照片中提取，并压缩为不超过4种主要颜色。`,ir={cotton:{label:`米白棉浆`,desc:`暖赭丙烯`,paperTop:`#fbf8f1`,paperBottom:`#f3ebdc`,cardBg:`#fffdf9`,ink:`#2c251f`,inkSoft:`#6f6357`,inkMuted:`#9b8e80`,line:`#ded3c1`,ruleLine:`rgba(182, 166, 144, 0.28)`,stamp:`#b84a39`,tape:`rgba(200, 109, 81, 0.34)`,tapeAlt:`rgba(110, 139, 116, 0.34)`,palette:[`#c86d51`,`#6e8b74`,`#d4a359`,`#6c8ba4`]},seabreeze:{label:`粗纹海盐`,desc:`雾蓝海岸`,paperTop:`#f7f9fb`,paperBottom:`#eaf1f6`,cardBg:`#ffffff`,ink:`#20303d`,inkSoft:`#5c7081`,inkMuted:`#8a9ead`,line:`#cddae4`,ruleLine:`rgba(145, 169, 188, 0.26)`,stamp:`#b24f43`,tape:`rgba(79, 124, 155, 0.34)`,tapeAlt:`rgba(214, 128, 104, 0.34)`,palette:[`#4f7c9b`,`#d68068`,`#6fa08e`,`#dfb468`]},forest:{label:`草木宣笺`,desc:`松针苔绿`,paperTop:`#f6f8f2`,paperBottom:`#e9efe2`,cardBg:`#fcfdfb`,ink:`#213025`,inkSoft:`#57695b`,inkMuted:`#869789`,line:`#ccd8ca`,ruleLine:`rgba(139, 162, 143, 0.26)`,stamp:`#ad4b3e`,tape:`rgba(75, 120, 89, 0.34)`,tapeAlt:`rgba(207, 165, 90, 0.34)`,palette:[`#4b7859`,`#c76b7a`,`#a67552`,`#cfa55a`]},blossom:{label:`樱粉和纸`,desc:`暮色玫瑰`,paperTop:`#fdf8f7`,paperBottom:`#f5eaeb`,cardBg:`#fffdfd`,ink:`#322326`,inkSoft:`#765e63`,inkMuted:`#a28b90`,line:`#e3cfd3`,ruleLine:`rgba(192, 160, 167, 0.26)`,stamp:`#b54454`,tape:`rgba(196, 104, 123, 0.32)`,tapeAlt:`rgba(116, 140, 110, 0.32)`,palette:[`#c4687b`,`#748c6e`,`#dc986a`,`#6f7d95`]}},ar=[`☀️ 晴朗微风`,`🌤️ 云淡风轻`,`🌊 海风咸咸`,`🌧️ 听雨漫步`,`❄️ 冬日暖阳`,`🌙 晚风温柔`],or=[`✨ 满心欢喜`,`🍵 慵懒治愈`,`🥂 微醺浪漫`,`🐾 步履不停`,`🌿 自在松弛`,`🎨 灵感满满`],Q={tripId:``,draft:null,mobileTab:`preview`,replaceIndex:-1,saveTimer:null,dirty:!1,promptOpen:!1,exporting:!1};function sr(e,t=`auto`){return e<=0?[]:e===1?[{indices:[0],singleRatio:.66}]:e===2?[{indices:[0,1]}]:e===3?t===`grid`?[{indices:[0,1]},{indices:[2],singleRatio:.56}]:[{indices:[0],singleRatio:.62},{indices:[1,2]}]:e===4?[{indices:[0,1]},{indices:[2,3]}]:e===5?t===`grid`?[{indices:[0,1]},{indices:[2,3]},{indices:[4],singleRatio:.56}]:[{indices:[0],singleRatio:.6},{indices:[1,2]},{indices:[3,4]}]:[{indices:[0,1]},{indices:[2,3]},{indices:[4,5]}]}function cr(e=``){let t=e||Q.tripId||H.activeTripId;return H.trips?.find(e=>e.id===t)||H.trips?.find(e=>e.id===H.activeTripId)||H.trips?.[0]||null}function lr(){Q.dirty=!0,clearTimeout(Q.saveTimer),Q.saveTimer=setTimeout(()=>{ur(!0).catch(()=>{})},800)}async function ur(e=!0){if(clearTimeout(Q.saveTimer),!Q.tripId||!Q.draft)return;let t=H.trips||[],n=t.findIndex(e=>e.id===Q.tripId);if(n<0)return;let r=b(Q.draft),i=t.map((e,t)=>t===n?{...e,journal:r}:e);Q.dirty=!1,await G({trips:i}),e||J(`旅行手账个性设置已保存 ✨`)}async function dr(){if(Q.dirty)try{await ur(!0)}catch{}L.close()}function fr(e){return new Promise((t,n)=>{if(!e||!e.type.startsWith(`image/`)){n(Error(`请选择有效的图片文件`));return}let r=new FileReader;r.onerror=()=>n(Error(`读取图片失败`)),r.onload=()=>{let e=new Image;e.onerror=()=>n(Error(`解析图片失败，请换一张图片试试`)),e.onload=()=>{let n=(t,n,r)=>{let i=Math.min(1,t/e.naturalWidth,n/e.naturalHeight),a=Math.max(1,Math.round(e.naturalWidth*i)),o=Math.max(1,Math.round(e.naturalHeight*i)),s=document.createElement(`canvas`);s.width=a,s.height=o;let c=s.getContext(`2d`);c.fillStyle=`#fbf8f1`,c.fillRect(0,0,a,o),c.drawImage(e,0,0,a,o);let l=s.toDataURL(`image/webp`,r);return l.startsWith(`data:image/webp`)||(l=s.toDataURL(`image/jpeg`,r)),l},r=n(660,880,.82);r.length>45e4&&(r=n(510,680,.74)),r.length>78e4&&(r=n(390,520,.68)),t(r)},e.src=r.result},r.readAsDataURL(e)})}function pr(e=``){let t=cr(e);if(!t){J(`请先创建行程后再打开旅行手账`);return}Q.tripId=t.id,Q.draft=structuredClone(b(t.journal)),Q.mobileTab=`preview`,Q.replaceIndex=-1,Q.dirty=!1,vr(),L.open||L.showModal()}function mr(e){let t=ir[e]||ir.cotton;return`--jp-top:${t.paperTop};--jp-bottom:${t.paperBottom};--jp-card:${t.cardBg};--jp-ink:${t.ink};--jp-soft:${t.inkSoft};--jp-muted:${t.inkMuted};--jp-line:${t.line};--jp-rule:${t.ruleLine};--jp-stamp:${t.stamp};--jp-tape:${t.tape};--jp-tape-alt:${t.tapeAlt};--jp-c1:${t.palette[0]};--jp-c2:${t.palette[1]};--jp-c3:${t.palette[2]};--jp-c4:${t.palette[3]};`}function hr(e,t,n=!1){let r=t[e%t.length],i=t[(e+1)%t.length];return`
    <button type="button" class="jp-empty-slot ${n?`featured`:``}" data-action="trigger-journal-upload" data-slot="-1" aria-label="点击放入第 ${e+1} 张 3:4 艺术海报">
      <div class="jp-empty-upper">
        <span class="jp-empty-zone-tag">PHOTO 50%</span>
        <span class="jp-empty-plus">+ 放入 3:4 画卡</span>
      </div>
      <div class="jp-empty-lower">
        <svg viewBox="0 0 120 76" aria-hidden="true" class="jp-empty-sketch">
          <circle cx="78" cy="24" r="9" fill="${r}" opacity="0.72"/>
          <path d="M22 54 Q45 36 66 50 T102 48" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M46 52 L55 35 L64 52 Z" fill="${i}" opacity="0.75"/>
          <path d="M55 34 L55 54" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
        </svg>
        <span class="jp-empty-hint">ART SKETCH 50%</span>
      </div>
    </button>
  `}function gr(e,t,n){let r=ir[n.paper]||ir.cotton,i=n.photos||[],a=sr(i.length,n.layout),o=n.subtitle||`VOL.01 · ${t.startDate.slice(0,4)} TRAVELOGUE`,s=`${e.startDate.replaceAll(`-`,`.`)} — ${e.endDate.replaceAll(`-`,`.`)}`,c=n.note||`把沿途吹过的风、吃过的热气腾腾与并肩走过的风景，都折进这一页纸张颗粒里。`,l=n.stampText||`旅途圆满 · 珍藏纪念`,u=n.signature||`布布 & 一二`,d=e.split.totalShared?Math.round(e.split.bubuTotal/e.split.totalShared*100):50,f=100-d,p=e.categories.slice(0,4),m=Math.max(1,p.reduce((e,t)=>e+t.amount,0)),h=i.length===0?`
    <div class="jp-gallery jp-gallery-empty">
      <div class="jp-gallery-row single" style="--single-w:60%">
        ${hr(0,r.palette,!0)}
      </div>
      <div class="jp-gallery-row pair">
        ${hr(1,r.palette)}
        ${hr(2,r.palette)}
      </div>
      <p class="jp-empty-tip">支持放入 1～5 张 3:4 竖版双分区插画卡，画面完整保留不裁切</p>
    </div>
  `:`
    <div class="jp-gallery mount-${n.mount}">
      ${a.map(t=>`
        <div class="jp-gallery-row ${t.indices.length===1?`single`:`pair`}" ${t.singleRatio?`style="--single-w:${Math.round(t.singleRatio*100)}%"`:``}>
          ${t.indices.map(t=>{let r=i[t],a=String(t+1).padStart(2,`0`),o=n.mount===`washi`?t%2==0?`tilt-left`:`tilt-right`:``,s=t%2==0?`tape-a`:`tape-b`;return`
              <figure class="jp-photo-card mount-${n.mount} ${o}">
                ${n.mount===`washi`?`<span class="jp-washi-tape ${s}" aria-hidden="true"></span>`:``}
                <div class="jp-photo-frame" data-action="trigger-journal-upload" data-slot="${t}" title="点击更换此张画卡">
                  <img src="${r.dataUrl}" alt="${K(r.caption||`手账画卡 ${a}`)}" loading="lazy">
                </div>
                <figcaption class="jp-photo-caption">
                  <span class="jp-photo-idx">${n.mount===`art`?`fig.${a}`:a}</span>
                  <span class="jp-photo-text">${K(r.caption||`${e.tripName} · 片段`)}</span>
                </figcaption>
              </figure>
            `}).join(``)}
        </div>
      `).join(``)}
    </div>
  `;return`
    <div class="jp-inner-frame">
      <span class="jp-corner tl" aria-hidden="true"></span>
      <span class="jp-corner tr" aria-hidden="true"></span>
      <span class="jp-corner bl" aria-hidden="true"></span>
      <span class="jp-corner br" aria-hidden="true"></span>

      <header class="jp-masthead">
        <div class="jp-meta-top">
          <span>${K(o)}</span>
          <span>${e.days} DAYS · ${e.nights} NIGHTS</span>
        </div>
        <div class="jp-divider-dots" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </div>
        <h2 class="jp-title"><span class="jp-title-emoji">${e.coverEmoji}</span>${K(e.tripName)}</h2>
        <div class="jp-atmosphere-bar">
          <span>${K(s)}</span>
          ${n.weather?`<span class="jp-dot">·</span><span>${K(n.weather)}</span>`:``}
          ${n.mood?`<span class="jp-dot">·</span><span>${K(n.mood)}</span>`:``}
        </div>
      </header>

      ${h}

      ${c?`
        <section class="jp-note-block" aria-label="旅途随笔">
          <span class="jp-quote-mark" aria-hidden="true">“</span>
          <p class="jp-note-text">${K(c)}</p>
        </section>
      `:``}

      ${n.showStats?`
        <section class="jp-stats-strip" aria-label="旅途花费概览">
          <div class="jp-stat-cell">
            <span class="jp-stat-lbl">TOTAL · 旅程总支</span>
            <strong class="jp-stat-val">¥${O(e.netExpense)}</strong>
            <small>${e.recordCount} 笔记录</small>
          </div>
          <div class="jp-stat-cell">
            <span class="jp-stat-lbl">PER PERSON · 双人人均</span>
            <strong class="jp-stat-val">¥${O(e.perPersonAverage)}</strong>
            <small>共同分担记忆</small>
          </div>
          <div class="jp-stat-cell">
            <span class="jp-stat-lbl">DAILY · 日均开销</span>
            <strong class="jp-stat-val">¥${O(e.dailyAverage)}</strong>
            <small>历时 ${e.days} 天</small>
          </div>
        </section>
      `:``}

      ${n.showCategories&&p.length?`
        <section class="jp-block" aria-label="分类风物构成">
          <div class="jp-block-head">
            <span>ACRYLIC PALETTE · 旅途风物构成</span>
          </div>
          <div class="jp-acrylic-bar">
            ${p.map((e,t)=>`<i style="width:${Math.max(6,Math.round(e.amount/m*100))}%;background:${r.palette[t%r.palette.length]}"></i>`).join(``)}
          </div>
          <div class="jp-cat-grid">
            ${p.map((e,t)=>`
              <div class="jp-cat-item">
                <i style="background:${r.palette[t%r.palette.length]}"></i>
                <span>${K(e.name)}</span>
                <strong>¥${O(e.amount)}</strong>
              </div>
            `).join(``)}
          </div>
        </section>
      `:``}

      ${n.showFootprints&&(e.topExpense||e.foodFootprint.length)?`
        <section class="jp-block" aria-label="高光与寻味足迹">
          <div class="jp-block-head">
            <span>FOOTPRINTS · 高光与寻味印记</span>
          </div>
          ${e.topExpense?`
            <div class="jp-top-moment">
              <span class="jp-moment-tag">✦ 难忘单笔</span>
              <span class="jp-moment-name">${K(e.topExpense.payee||e.topExpense.category)}</span>
              <strong>¥${O(e.topExpense.amount)}</strong>
            </div>
          `:``}
          ${e.foodFootprint.length?`
            <div class="jp-ticket-tags">
              ${e.foodFootprint.map(e=>`<span class="jp-ticket-tag">📍 ${K(e)}</span>`).join(``)}
            </div>
          `:``}
        </section>
      `:``}

      ${n.showSplit?`
        <section class="jp-block" aria-label="同行出资默契">
          <div class="jp-block-head">
            <span>TOGETHER · 双人同行默契</span>
            <small>布布 ${d}% · 一二 ${f}%</small>
          </div>
          <div class="jp-split-track">
            <i style="width:${d}%;background:${r.palette[0]}"></i>
            <i style="width:${f}%;background:${r.palette[1]}"></i>
          </div>
          <div class="jp-split-meta">
            <span>🐻 布布 ¥${O(e.split.bubuTotal)}</span>
            ${e.split.fundTotal?`<span>🍯 基金 ¥${O(e.split.fundTotal)}</span>`:``}
            <span>🐼 一二 ¥${O(e.split.yierTotal)}</span>
          </div>
        </section>
      `:``}

      <footer class="jp-footer">
        <div class="jp-postmark" aria-label="旅行纪念邮戳">
          <svg viewBox="0 0 180 180" class="jp-postmark-svg" aria-hidden="true">
            <circle cx="90" cy="90" r="80" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="10 3 2 3"/>
            <circle cx="90" cy="90" r="71" fill="none" stroke="currentColor" stroke-width="1"/>
            <line x1="20" y1="68" x2="160" y2="68" stroke="currentColor" stroke-width="1.2"/>
            <line x1="20" y1="112" x2="160" y2="112" stroke="currentColor" stroke-width="1.2"/>
          </svg>
          <div class="jp-postmark-text">
            <span class="jp-pm-top">POSTMARK · ${(e.startDate||z).slice(0,7).replace(`-`,`.`)}</span>
            <strong class="jp-pm-mid">${K(l)}</strong>
            <span class="jp-pm-bot">${K(u)}</span>
          </div>
        </div>
        <div class="jp-colophon">
          <span>BEAR LEDGER · PAPER &amp; ACRYLIC EDITION</span>
          <span>SIGNED BY ${K(u)}</span>
        </div>
      </footer>
    </div>
  `}function _r(){let e=cr();if(!e||!Q.draft)return;let t=L.querySelector(`#poster-capture-card`);if(!t)return;let n=Ct(e,Y());t.setAttribute(`style`,mr(Q.draft.paper)),t.dataset.paper=Q.draft.paper,t.innerHTML=gr(n,e,Q.draft)}function vr(){let e=cr();if(!e)return;let t=Q.draft||b(e.journal);Q.draft=t;let n=Ct(e,Y()),r=t.photos||[];L.innerHTML=`
    <div class="journal-studio" data-mobile-tab="${Q.mobileTab}">
      <div class="journal-studio-topbar">
        <div class="journal-studio-brand">
          <span class="soft-icon journal-studio-icon">🎨</span>
          <div>
            <span class="eyebrow">ART PAPER TRAVELOGUE</span>
            <h3>旅行纸感手账工坊 · ${K(n.tripName)}</h3>
          </div>
        </div>
        <div class="journal-mobile-tabs" role="tablist" aria-label="手账视图切换">
          <button type="button" class="jm-tab ${Q.mobileTab===`preview`?`active`:``}" data-action="journal-mobile-tab" data-tab="preview">📖 预览画册</button>
          <button type="button" class="jm-tab ${Q.mobileTab===`edit`?`active`:``}" data-action="journal-mobile-tab" data-tab="edit">✨ 个性装帧</button>
        </div>
        ${q(k(`close`,20),`close-poster-dialog`,`icon-btn auth-close`,`type="button" aria-label="关闭手账工坊"`)}
      </div>

      <div class="journal-studio-body">
        <div class="journal-preview-pane">
          <div class="poster-canvas-card" id="poster-capture-card" data-paper="${t.paper}" style="${mr(t.paper)}">
            ${gr(n,e,t)}
          </div>
        </div>

        <aside class="journal-editor-pane" id="journal-editor-pane" aria-label="手账个性化设置">
          <section class="je-section">
            <div class="je-sec-head">
              <h4>🖼️ 3:4 双分区插画卡 <span>(${r.length}/5)</span></h4>
              ${r.length<6?`<button type="button" class="btn small primary je-upload-btn" data-action="trigger-journal-upload" data-slot="-1">+ 添加画卡</button>`:``}
            </div>
            <p class="je-hint">专为 3:4 竖版双分区海报设计（上 50% 摄影 + 下 50% 极简丙烯留白），原比例完整呈现不裁切。点击画册上的图片也可直接替换。</p>

            <div class="je-prompt-box">
              <div class="je-prompt-actions">
                <button type="button" class="je-prompt-copy-btn" data-action="copy-gpt-prompt">📋 一键复制 GPT 3:4 插画提示词</button>
                <button type="button" class="text-btn je-prompt-toggle" data-action="toggle-gpt-prompt">${Q.promptOpen?`收起提示词`:`查看提示词`}</button>
              </div>
              ${Q.promptOpen?`<pre class="je-prompt-pre">${K(rr)}</pre>`:``}
            </div>

            ${r.length?`
              <div class="je-photo-list">
                ${r.map((e,t)=>`
                  <div class="je-photo-row">
                    <img src="${e.dataUrl}" alt="" class="je-photo-thumb">
                    <input type="text" class="je-caption-input" data-journal-caption="${t}" maxlength="40" placeholder="第 ${t+1} 张小注脚（如：橘子海日落）" value="${K(e.caption)}">
                    <div class="je-photo-btns">
                      <button type="button" class="icon-btn" data-action="move-journal-photo" data-idx="${t}" data-dir="-1" ${t===0?`disabled`:``} title="前移" aria-label="前移图片">↑</button>
                      <button type="button" class="icon-btn" data-action="move-journal-photo" data-idx="${t}" data-dir="1" ${t===r.length-1?`disabled`:``} title="后移" aria-label="后移图片">↓</button>
                      <button type="button" class="icon-btn danger" data-action="remove-journal-photo" data-idx="${t}" title="移除图片" aria-label="移除图片">${k(`close`,15)}</button>
                    </div>
                  </div>
                `).join(``)}
              </div>
            `:``}
            <input type="file" id="journal-photo-input" accept="image/*" multiple hidden>
          </section>

          <section class="je-section">
            <h4>🎨 艺术纸张与装裱</h4>
            <div class="je-label">纸张媒介与四色丙烯基调</div>
            <div class="je-paper-grid">
              ${Object.entries(ir).map(([e,n])=>`
                <button type="button" class="je-paper-chip ${t.paper===e?`active`:``}" data-action="journal-set-opt" data-key="paper" data-val="${e}">
                  <span class="je-paper-swatch" style="background:linear-gradient(135deg,${n.paperTop},${n.paperBottom});border-color:${n.line}">
                    ${n.palette.map(e=>`<i style="background:${e}"></i>`).join(``)}
                  </span>
                  <span class="je-paper-meta"><strong>${n.label}</strong><small>${n.desc}</small></span>
                </button>
              `).join(``)}
            </div>

            <div class="je-row-two">
              <div>
                <div class="je-label">画卡装裱方式</div>
                <div class="je-seg-group">
                  <button type="button" class="je-seg ${t.mount===`polaroid`?`active`:``}" data-action="journal-set-opt" data-key="mount" data-val="polaroid">拍立得签</button>
                  <button type="button" class="je-seg ${t.mount===`washi`?`active`:``}" data-action="journal-set-opt" data-key="mount" data-val="washi">和纸胶带</button>
                  <button type="button" class="je-seg ${t.mount===`art`?`active`:``}" data-action="journal-set-opt" data-key="mount" data-val="art">极简画芯</button>
                </div>
              </div>
              <div>
                <div class="je-label">多图画廊版式</div>
                <div class="je-seg-group">
                  <button type="button" class="je-seg ${t.layout===`grid`?``:`active`}" data-action="journal-set-opt" data-key="layout" data-val="auto">封面主图</button>
                  <button type="button" class="je-seg ${t.layout===`grid`?`active`:``}" data-action="journal-set-opt" data-key="layout" data-val="grid">均衡双栏</button>
                </div>
              </div>
            </div>
          </section>

          <section class="je-section">
            <h4>✍️ 手账题记与私语</h4>
            <label class="je-field">
              <span>刊头编号 / 目的地副标</span>
              <input type="text" data-journal-field="subtitle" maxlength="60" placeholder="例如：VOL.01 · 成都秋日慢行记" value="${K(t.subtitle)}">
            </label>

            <div class="je-field">
              <span>旅途天气印记</span>
              <div class="je-preset-chips">
                ${ar.map(e=>`<button type="button" class="je-chip ${t.weather===e?`active`:``}" data-action="journal-set-opt" data-key="weather" data-val="${K(e)}">${e}</button>`).join(``)}
              </div>
              <input type="text" data-journal-field="weather" maxlength="24" placeholder="自定义天气，留空可隐藏" value="${K(t.weather)}">
            </div>

            <div class="je-field">
              <span>当下心情注脚</span>
              <div class="je-preset-chips">
                ${or.map(e=>`<button type="button" class="je-chip ${t.mood===e?`active`:``}" data-action="journal-set-opt" data-key="mood" data-val="${K(e)}">${e}</button>`).join(``)}
              </div>
              <input type="text" data-journal-field="mood" maxlength="24" placeholder="自定义心情，留空可隐藏" value="${K(t.mood)}">
            </div>

            <label class="je-field">
              <span>旅途随笔 / 手写寄语</span>
              <textarea rows="3" data-journal-field="note" maxlength="300" placeholder="写下这趟旅途里最想记住的瞬间…">${K(t.note)}</textarea>
            </label>

            <div class="je-row-two">
              <label class="je-field">
                <span>复古邮戳字样</span>
                <input type="text" data-journal-field="stampText" maxlength="30" placeholder="旅途圆满 · 珍藏纪念" value="${K(t.stampText)}">
              </label>
              <label class="je-field">
                <span>落款署名</span>
                <input type="text" data-journal-field="signature" maxlength="40" placeholder="布布 & 一二" value="${K(t.signature)}">
              </label>
            </div>
          </section>

          <section class="je-section">
            <h4>📊 账目印记模块开关</h4>
            <div class="je-toggle-grid">
              <label class="je-toggle"><input type="checkbox" data-journal-toggle="showStats" ${t.showStats?`checked`:``}><span>花费概览</span></label>
              <label class="je-toggle"><input type="checkbox" data-journal-toggle="showCategories" ${t.showCategories?`checked`:``}><span>分类风物</span></label>
              <label class="je-toggle"><input type="checkbox" data-journal-toggle="showFootprints" ${t.showFootprints?`checked`:``}><span>寻味足迹</span></label>
              <label class="je-toggle"><input type="checkbox" data-journal-toggle="showSplit" ${t.showSplit?`checked`:``}><span>同行分摊</span></label>
            </div>
          </section>
        </aside>
      </div>

      <div class="journal-studio-footer">
        <span class="je-footer-tip">✨ 图文设置会自动随行程保存同步</span>
        <div class="je-footer-btns">
          <button type="button" class="btn secondary" data-action="save-journal-now">💾 保存设置</button>
          <button type="button" class="btn primary je-export-btn" data-action="download-poster" data-trip-id="${e.id}" ${Q.exporting?`disabled`:``}>
            ${Q.exporting?`正在绘制画册…`:`📥 导出高清手账长图`}
          </button>
        </div>
      </div>
    </div>
  `,yr()}function yr(){L.querySelector(`#journal-photo-input`)?.addEventListener(`change`,async e=>{let t=Array.from(e.target.files||[]);if(e.target.value=``,t.length&&Q.draft)try{let e=[...Q.draft.photos||[]];if(Q.replaceIndex>=0&&Q.replaceIndex<e.length){let n=await fr(t[0]);e[Q.replaceIndex]={...e[Q.replaceIndex],dataUrl:n},Q.replaceIndex=-1}else{let n=Math.max(0,6-e.length);if(!n){J(`最多可放入 6 张艺术画卡`);return}let r=t.slice(0,n);for(let t of r){let n=await fr(t);e.push({id:`photo-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,dataUrl:n,caption:``})}t.length>n&&J(`已添置 ${r.length} 张画卡（上限 6 张）`)}Q.draft.photos=e,vr(),await ur(!0)}catch(e){J(e.message||`添加图片失败`)}}),L.querySelectorAll(`[data-journal-field]`).forEach(e=>{e.addEventListener(`input`,()=>{if(!Q.draft)return;let t=e.dataset.journalField;Q.draft[t]=e.value,_r(),lr()})}),L.querySelectorAll(`[data-journal-caption]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=Number(e.dataset.journalCaption);Q.draft?.photos?.[t]&&(Q.draft.photos[t].caption=e.value,_r(),lr())})}),L.querySelectorAll(`[data-journal-toggle]`).forEach(e=>{e.addEventListener(`change`,()=>{if(!Q.draft)return;let t=e.dataset.journalToggle;Q.draft[t]=e.checked,_r(),lr()})})}function br(e){return new Promise(t=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>t(null),n.src=e})}function xr(e,t,n){let r=[];for(let i of String(t||``).split(/\r?\n/)){let t=Array.from(i);if(!t.length){r.push(``);continue}let a=``;for(let i of t){let t=a+i;a&&e.measureText(t).width>n?(r.push(a),a=i):a=t}a&&r.push(a)}return r}function Sr(e,t,n,r,i,a){if(!t||!t.naturalWidth||!t.naturalHeight)return;let o=i/a,s=t.naturalWidth/t.naturalHeight,c=0,l=0,u=t.naturalWidth,d=t.naturalHeight;Math.abs(s-o)>.01&&(s>o?(u=Math.round(t.naturalHeight*o),c=Math.round((t.naturalWidth-u)/2)):(d=Math.round(t.naturalWidth/o),l=Math.round((t.naturalHeight-d)/2))),e.drawImage(t,c,l,u,d,n,r,i,a)}function Cr(e,t,n,r){let i=e.createLinearGradient(0,0,0,n);i.addColorStop(0,r.paperTop),i.addColorStop(1,r.paperBottom),e.fillStyle=i,e.fillRect(0,0,t,n);let a=20261101,o=()=>(a=a*1664525+1013904223>>>0,a/4294967296),s=Math.min(18e3,Math.round(t*n/95));for(let r=0;r<s;r++){let i=o()*t,a=o()*n,s=.6+o()*1.3;e.fillStyle=r%3==0?`rgba(255,255,255,0.42)`:`rgba(130,112,92,0.045)`,e.fillRect(i,a,s,s)}e.save(),e.strokeStyle=`rgba(140, 120, 98, 0.05)`,e.lineWidth=.8;let c=Math.min(420,Math.round(t*n/3800));for(let r=0;r<c;r++){let r=o()*t,i=o()*n,a=6+o()*14,s=o()*Math.PI;e.beginPath(),e.moveTo(r,i),e.lineTo(r+Math.cos(s)*a,i+Math.sin(s)*a),e.stroke()}e.restore()}async function wr(e){if(Q.exporting)return;let t=cr(e);if(t){if(Q.exporting=!0,L.open){let e=L.querySelector(`[data-action="download-poster"]`);e&&(e.disabled=!0,e.textContent=`正在绘制画册…`)}try{if(Q.dirty)try{await ur(!0)}catch{}let e=Q.tripId===t.id&&Q.draft?b(Q.draft):b(t.journal),n=Ct(t,Y()),r=ir[e.paper]||ir.cotton,i=1080,a=`"Songti SC", "STSong", "SimSun", Georgia, serif`,o=`"PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif`,s=e.photos||[],c=await Promise.all(s.map(e=>br(e.dataUrl))),l=sr(s.length,e.layout),u=document.createElement(`canvas`).getContext(`2d`),d=e.subtitle||`VOL.01 · ${t.startDate.slice(0,4)} TRAVELOGUE`,f=`${n.startDate.replaceAll(`-`,`.`)} — ${n.endDate.replaceAll(`-`,`.`)}`,p=e.note||`把沿途吹过的风、吃过的热气腾腾与并肩走过的风景，都折进这一页纸张颗粒里。`,m=e.stampText||`旅途圆满 · 珍藏纪念`,h=e.signature||`布布 & 一二`,g=n.categories.slice(0,4),_=102;_+=188;let v=[];for(let t of l)if(t.indices.length===1){let n=Math.round(904*(t.singleRatio||.62)),r=e.mount===`polaroid`?18:e.mount===`washi`?10:0,i=e.mount===`polaroid`?58:42,a=n-r*2,o=Math.round(a*4/3),s=r+o+i;v.push({type:`single`,indices:t.indices,cardOuterW:n,innerPad:r,imgW:a,imgH:o,cardH:s}),_+=s+38}else{let n=e.mount===`polaroid`?16:e.mount===`washi`?10:0,r=e.mount===`polaroid`?54:40,i=435-n*2,a=Math.round(i*4/3),o=n+a+r;v.push({type:`pair`,indices:t.indices,cardOuterW:435,innerPad:n,imgW:i,imgH:a,cardH:o}),_+=o+38}v.length&&(_+=10),u.font=`24px ${a}`;let y=p?xr(u,p,820):[],x=y.length?Math.max(110,y.length*44+46):0;if(x&&(_+=x+38),e.showStats&&(_+=184),e.showCategories&&g.length){let e=Math.ceil(g.length/2);_+=86+e*42+34}let ee=0;if(e.showFootprints&&n.foodFootprint.length){u.font=`20px ${o}`;let e=0;ee=1;for(let t of n.foodFootprint){let n=u.measureText(`📍 ${t}`).width+36;e>0&&e+n>904?(ee++,e=n+12):e+=n+12}}e.showFootprints&&(n.topExpense||n.foodFootprint.length)&&(_+=50+(n.topExpense?78:0)+(ee?ee*48+12:0)+34),e.showSplit&&(_+=160),_+=285;let S=Math.max(1360,_),C=document.createElement(`canvas`);C.width=i,C.height=S;let w=C.getContext(`2d`);Cr(w,i,S,r),w.save(),w.strokeStyle=r.line,w.lineWidth=2,w.strokeRect(34,34,1012,S-68),w.lineWidth=1,w.strokeRect(44,44,992,S-88);let T=(e,t,n,i)=>{w.strokeStyle=r.inkMuted,w.lineWidth=1.6,w.beginPath(),w.moveTo(e,t+i*18),w.lineTo(e,t),w.lineTo(e+n*18,t),w.stroke()};T(58,58,1,1),T(1022,58,-1,1),T(58,S-58,1,-1),T(1022,S-58,-1,-1),w.restore();let E=102;w.fillStyle=r.inkMuted,w.font=`600 18px ${o}`,w.textAlign=`left`,w.fillText(d,88,E),w.textAlign=`right`,w.fillText(`${n.days} DAYS · ${n.nights} NIGHTS`,992,E),E+=22,w.strokeStyle=r.line,w.lineWidth=1.5,w.beginPath(),w.moveTo(88,E),w.lineTo(992,E),w.stroke(),r.palette.forEach((e,t)=>{w.fillStyle=e,w.beginPath(),w.arc(513+t*18,E,4.5,0,Math.PI*2),w.fill()}),E+=68,w.textAlign=`center`,w.fillStyle=r.ink,w.font=`bold 48px ${a}`,w.fillText(`${n.coverEmoji} ${n.tripName}`,i/2,E),E+=44;let D=[f,e.weather,e.mood].filter(Boolean);w.fillStyle=r.inkSoft,w.font=`500 21px ${o}`,w.fillText(D.join(`   ·   `),i/2,E),E+=54;for(let t of v){if(t.type===`single`){let l=t.indices[0],u=Math.round((i-t.cardOuterW)/2);Tr(w,{img:c[l],idx:l,caption:s[l]?.caption||`${n.tripName} · 片段`,x:u,y:E,outerW:t.cardOuterW,innerPad:t.innerPad,imgW:t.imgW,imgH:t.imgH,cardH:t.cardH,mount:e.mount,theme:r,serifFont:a,sansFont:o})}else t.indices.forEach((i,l)=>{let u=88+l*(t.cardOuterW+34),d=e.mount===`washi`&&l===1?10:0;Tr(w,{img:c[i],idx:i,caption:s[i]?.caption||`${n.tripName} · 片段`,x:u,y:E+d,outerW:t.cardOuterW,innerPad:t.innerPad,imgW:t.imgW,imgH:t.imgH,cardH:t.cardH,mount:e.mount,theme:r,serifFont:a,sansFont:o})});E+=t.cardH+38}if(v.length&&(E+=10),x){w.save(),w.fillStyle=`rgba(255, 255, 255, 0.42)`,w.strokeStyle=r.line,w.lineWidth=1.2,w.beginPath(),w.roundRect(88,E,904,x,12),w.fill(),w.stroke(),w.strokeStyle=r.ruleLine,w.lineWidth=1;for(let e=E+62;e<E+x-16;e+=44)w.beginPath(),w.moveTo(116,e),w.lineTo(964,e),w.stroke();w.fillStyle=r.palette[0],w.font=`bold 46px ${a}`,w.textAlign=`left`,w.fillText(`“`,110,E+54),w.fillStyle=r.ink,w.font=`24px ${a}`,y.forEach((e,t)=>{w.fillText(e,148,E+52+t*44)}),w.restore(),E+=x+38}if(e.showStats){w.save(),w.fillStyle=r.cardBg,w.strokeStyle=r.line,w.lineWidth=1.5,w.beginPath(),w.roundRect(88,E,904,148,14),w.fill(),w.stroke();let e=904/3;[[`TOTAL · 旅程总支`,`¥${O(n.netExpense)}`,`${n.recordCount} 笔记录`,r.palette[0]],[`PER PERSON · 双人人均`,`¥${O(n.perPersonAverage)}`,`共同分担记忆`,r.palette[1]],[`DAILY · 日均开销`,`¥${O(n.dailyAverage)}`,`历时 ${n.days} 天`,r.palette[2]]].forEach(([t,n,i,a],s)=>{let c=88+e*s+e/2;s>0&&(w.strokeStyle=r.line,w.beginPath(),w.moveTo(88+e*s,E+26),w.lineTo(88+e*s,E+122),w.stroke()),w.fillStyle=a,w.fillRect(c-18,E+18,36,3),w.textAlign=`center`,w.fillStyle=r.inkMuted,w.font=`600 15px ${o}`,w.fillText(t,c,E+44),w.fillStyle=r.ink,w.font=`bold 32px ${o}`,w.fillText(n,c,E+88),w.fillStyle=r.inkSoft,w.font=`17px ${o}`,w.fillText(i,c,E+118)}),w.restore(),E+=184}if(e.showCategories&&g.length){w.textAlign=`left`,w.fillStyle=r.inkSoft,w.font=`600 18px ${o}`,w.fillText(`ACRYLIC PALETTE · 旅途风物构成`,88,E+20),E+=36;let e=Math.max(1,g.reduce((e,t)=>e+t.amount,0)),t=88;w.save(),w.beginPath(),w.roundRect(88,E,904,16,8),w.clip(),g.forEach((n,i)=>{let a=i===g.length-1?992-t:Math.round(n.amount/e*904);w.fillStyle=r.palette[i%r.palette.length],w.fillRect(t,E,a,16),t+=a}),w.restore(),E+=38,g.forEach((e,t)=>{let n=t%2,i=Math.floor(t/2),a=88+n*468,s=E+i*42;w.fillStyle=r.palette[t%r.palette.length],w.beginPath(),w.roundRect(a,s-13,14,14,3),w.fill(),w.fillStyle=r.ink,w.textAlign=`left`,w.font=`500 20px ${o}`,w.fillText(e.name,a+24,s),w.textAlign=`right`,w.fillStyle=r.inkSoft,w.font=`600 20px ${o}`,w.fillText(`¥${O(e.amount)}`,a+436,s)}),E+=Math.ceil(g.length/2)*42+34}if(e.showFootprints&&(n.topExpense||n.foodFootprint.length)){if(w.textAlign=`left`,w.fillStyle=r.inkSoft,w.font=`600 18px ${o}`,w.fillText(`FOOTPRINTS · 高光与寻味印记`,88,E+20),E+=36,n.topExpense&&(w.fillStyle=r.cardBg,w.strokeStyle=r.line,w.lineWidth=1.2,w.beginPath(),w.roundRect(88,E,904,64,10),w.fill(),w.stroke(),w.fillStyle=r.palette[0],w.fillRect(88,E,6,64),w.fillStyle=r.inkSoft,w.font=`600 18px ${o}`,w.textAlign=`left`,w.fillText(`✦ 难忘单笔`,110,E+40),w.fillStyle=r.ink,w.font=`bold 22px ${o}`,w.fillText((n.topExpense.payee||n.topExpense.category).slice(0,22),224,E+40),w.textAlign=`right`,w.fillStyle=r.palette[0],w.font=`bold 24px ${o}`,w.fillText(`¥${O(n.topExpense.amount)}`,970,E+41),E+=78),n.foodFootprint.length){w.font=`20px ${o}`;let e=88,t=E+26;for(let i of n.foodFootprint){let n=`📍 ${i}`,a=w.measureText(n).width+34;e>88&&e+a>992&&(e=88,t+=48),w.fillStyle=r.cardBg,w.strokeStyle=r.line,w.lineWidth=1.2,w.beginPath(),w.roundRect(e,t-26,a,38,8),w.fill(),w.stroke(),w.fillStyle=r.ink,w.textAlign=`left`,w.fillText(n,e+16,t),e+=a+12}E=t+24}E+=24}if(e.showSplit){let e=n.split.totalShared?Math.round(n.split.bubuTotal/n.split.totalShared*100):50,t=100-e;w.textAlign=`left`,w.fillStyle=r.inkSoft,w.font=`600 18px ${o}`,w.fillText(`TOGETHER · 双人同行默契`,88,E+20),w.textAlign=`right`,w.fillStyle=r.inkMuted,w.font=`18px ${o}`,w.fillText(`布布 ${e}% · 一二 ${t}%`,992,E+20),E+=36;let a=Math.round(904*e/100);w.save(),w.beginPath(),w.roundRect(88,E,904,14,7),w.clip(),w.fillStyle=r.palette[0],w.fillRect(88,E,a,14),w.fillStyle=r.palette[1],w.fillRect(88+a,E,904-a,14),w.restore(),E+=42,w.font=`600 20px ${o}`,w.fillStyle=r.ink,w.textAlign=`left`,w.fillText(`🐻 布布  ¥${O(n.split.bubuTotal)}`,88,E),n.split.fundTotal&&(w.textAlign=`center`,w.fillStyle=r.inkSoft,w.fillText(`🍯 共同基金  ¥${O(n.split.fundTotal)}`,i/2,E)),w.textAlign=`right`,w.fillStyle=r.ink,w.fillText(`🐼 一二  ¥${O(n.split.yierTotal)}`,992,E),E+=48}E+=18,w.strokeStyle=r.line,w.lineWidth=1,w.beginPath(),w.moveTo(88,E),w.lineTo(992,E),w.stroke();let te=E+108;w.save(),w.translate(540,te),w.rotate(-.12),w.strokeStyle=r.stamp,w.fillStyle=r.stamp,w.globalAlpha=.86,w.lineWidth=2.6,w.setLineDash([14,4,3,4]),w.beginPath(),w.arc(0,0,74,0,Math.PI*2),w.stroke(),w.setLineDash([]),w.lineWidth=1.2,w.beginPath(),w.arc(0,0,65,0,Math.PI*2),w.stroke(),w.beginPath(),w.moveTo(-58,-20),w.lineTo(58,-20),w.moveTo(-58,22),w.lineTo(58,22),w.stroke(),w.textAlign=`center`,w.font=`600 13px ${o}`,w.fillText(`POSTMARK · ${(n.startDate||z).slice(0,7).replace(`-`,`.`)}`,0,-32),w.font=`bold 18px ${a}`,w.fillText(m.slice(0,12),0,7),w.font=`600 14px ${o}`,w.fillText(h.slice(0,14),0,42),w.restore();let ne=S-66;w.fillStyle=r.inkMuted,w.font=`600 15px ${o}`,w.textAlign=`left`,w.fillText(`BEAR LEDGER · PAPER & ACRYLIC EDITION`,88,ne),w.textAlign=`right`,w.fillText(`SIGNED BY ${h}`,992,ne),await new Promise(e=>{C.toBlob(t=>{if(t){let e=URL.createObjectURL(t),r=document.createElement(`a`);r.href=e,r.download=`${n.tripName}-旅行艺术手账.png`,document.body.appendChild(r),r.click(),document.body.removeChild(r),setTimeout(()=>URL.revokeObjectURL(e),3e3),J(`高清纸感旅行手账已导出！快分享给对方吧 ✨`)}e()},`image/png`)})}finally{if(Q.exporting=!1,L.open){let e=L.querySelector(`[data-action="download-poster"]`);e&&(e.disabled=!1,e.textContent=`📥 导出高清手账长图`)}}}}function Tr(e,t){let{img:n,idx:r,caption:i,x:a,y:o,outerW:s,innerPad:c,imgW:l,imgH:u,cardH:d,mount:f,theme:p,serifFont:m,sansFont:h}=t,g=String(r+1).padStart(2,`0`);e.save();let _=a+s/2,v=o+d/2;e.translate(_,v),f===`washi`&&e.rotate(r%2==0?-.018:.016);let y=-s/2,b=-d/2;if(f===`polaroid`){e.save(),e.shadowColor=`rgba(60, 42, 24, 0.12)`,e.shadowBlur=18,e.shadowOffsetY=6,e.fillStyle=p.cardBg,e.fillRect(y,b,s,d),e.restore(),e.strokeStyle=p.line,e.lineWidth=1.2,e.strokeRect(y,b,s,d);let t=y+c,r=b+c;e.fillStyle=p.paperTop,e.fillRect(t,r,l,u),Sr(e,n,t,r,l,u),e.fillStyle=p.inkMuted,e.font=`600 16px ${h}`,e.textAlign=`left`,e.fillText(g,t+2,r+u+35),e.fillStyle=p.inkSoft,e.font=`18px ${m}`,e.textAlign=`right`,e.fillText(i.slice(0,18),t+l-2,r+u+35)}else if(f===`washi`){let t=u+c*2;e.save(),e.shadowColor=`rgba(60, 42, 24, 0.11)`,e.shadowBlur=16,e.shadowOffsetY=5,e.fillStyle=p.cardBg,e.fillRect(y,b,s,t),e.restore(),e.strokeStyle=p.line,e.lineWidth=1,e.strokeRect(y,b,s,t),Sr(e,n,y+c,b+c,l,u),e.save(),e.translate(0,b+2),e.rotate(r%2==0?-.05:.06),e.fillStyle=r%2==0?p.tape:p.tapeAlt,e.fillRect(-52,-11,104,22),e.restore(),e.fillStyle=p.inkSoft,e.font=`18px ${m}`,e.textAlign=`center`,e.fillText(`${g} · ${i.slice(0,18)}`,0,b+t+28)}else e.fillStyle=p.cardBg,e.fillRect(y,b,l,u),Sr(e,n,y,b,l,u),e.strokeStyle=p.ink,e.lineWidth=1.4,e.strokeRect(y,b,l,u),e.fillStyle=p.inkMuted,e.font=`italic 16px ${m}`,e.textAlign=`left`,e.fillText(`fig.${g}`,y,b+u+28),e.fillStyle=p.inkSoft,e.font=`18px ${m}`,e.textAlign=`right`,e.fillText(i.slice(0,18),y+l,b+u+28);e.restore()}function Er(e,t){return e?`
    <div class="trend-switch trip-scope-switch" role="group" aria-label="行程统计范围切换">
      ${q(`全部行程`,`set-trip-scope`,`btn small ${t===`all`?`primary`:``}`,`type="button" data-scope="all"`)}
      ${q(`当前行程`,`set-trip-scope`,`btn small ${t===`current`?`primary`:``}`,`type="button" data-scope="current"`)}
    </div>
  `:``}function Dr(e,t=`all`,n=null){let r=_t(e),i=r.totalShared||1,a=Math.round(r.bubuTotal/i*100)||0,o=100-a;return`
    <section class="split-dashboard-card" aria-label="双人出资对账看板">
      <div class="split-card-header">
        <div class="split-card-title">
          <span class="trip-mascot-badge">🐻🎒🐼</span>
          <div>
            <h3>双人出资对账</h3>
            <small style="color:var(--text-secondary);font-size:12px;">${t===`current`&&n?`当前「${K(n.name)}」消费 ¥${O(r.totalExpenses)}`:`全部行程累计总消费 ¥${O(r.totalExpenses)}`}</small>
          </div>
        </div>
        ${Er(n,t)}
      </div>

      <div class="split-ratio-bar-wrap">
        <div class="split-ratio-bar" title="布布 ${a}% vs 一二 ${o}%">
          <div class="ratio-fill-bubu" style="width:${a}%"></div>
          <div class="ratio-fill-yier" style="width:${o}%"></div>
        </div>
      </div>

      <div class="split-stat-grid">
        <div class="split-stat-box bubu">
          <span class="split-stat-label">🐻 布布累计买单</span>
          <strong class="split-stat-amount">¥${O(r.bubuTotal)}</strong>
        </div>
        <div class="split-stat-box yier">
          <span class="split-stat-label">🐼 一二累计买单</span>
          <strong class="split-stat-amount">¥${O(r.yierTotal)}</strong>
        </div>
      </div>

      ${r.fundTotal?`
        <div style="margin-bottom:12px;padding:8px 12px;background:#fef9e7;border:1px solid #fae69e;border-radius:10px;font-size:12px;color:#7a5a0c;display:flex;align-items:center;gap:6px;">
          <span>🍯 <strong>共同基金扣款：</strong>已扣减 ¥${O(r.fundTotal)}</span>
        </div>
      `:``}

      ${r.untaggedCount>0?`
        <p style="margin:10px 0 0;font-size:11px;color:var(--text-secondary);">
          ℹ️ 还有 ${r.untaggedCount} 笔账单（¥${O(r.untaggedTotal)}）未标记买单人，可在明细中编辑补全。
        </p>
      `:``}
    </section>
  `}function Or(e,t,n){let r=V.tripOverviewSort===`date`?`date`:`amount`,i=xt(e,t,n?.id||``,r),a=i.untagged?`
    <div class="trip-outing-item untagged">
      <div class="trip-outing-top">
        <div class="trip-outing-title-group">
          <span class="trip-outing-emoji">🗂️</span>
          <div>
            <div class="trip-outing-name"><span>${K(i.untagged.name)}</span></div>
            <div class="trip-outing-meta">共 ${i.untagged.recordCount} 笔未关联行程记录 · 可在明细中补选归属行程</div>
          </div>
        </div>
        <div class="trip-outing-amount">
          <strong>¥${O(i.untagged.expense)}</strong>
          <small>占比 ${i.untagged.sharePct.toFixed(1)}%</small>
        </div>
      </div>
      <div class="trip-outing-bar"><i style="width:${i.untagged.barPct}%"></i></div>
    </div>
  `:``,o=i.items.length?`
    <div class="trip-outings-list">
      ${i.items.map(e=>`
        <div class="trip-outing-item ${e.isActive?`active`:``}">
          <div class="trip-outing-top">
            <div class="trip-outing-title-group">
              <span class="trip-outing-emoji">${e.coverEmoji}</span>
              <div>
                <div class="trip-outing-name">
                  <span>${K(e.name)}</span>
                  ${e.isActive?`<span class="trip-badge-active">当前</span>`:``}
                  ${e.isCompleted?`<span class="trip-badge-done">已收官</span>`:``}
                </div>
                <div class="trip-outing-meta">📅 ${e.startDate} ~ ${e.endDate} · ${e.days} 天 · ${e.recordCount} 笔${e.dailyAvg>0?` · 日均 ¥${O(e.dailyAvg)}`:``}</div>
              </div>
            </div>
            <div class="trip-outing-amount">
              <strong>¥${O(e.expense)}</strong>
              <small>占总支出 ${e.sharePct.toFixed(1)}%</small>
            </div>
          </div>
          <div class="trip-outing-bar"><i style="width:${e.barPct}%"></i></div>
          <div class="trip-outing-footer">
            <span class="trip-outing-budget-hint">
              ${e.budget>0?`🎯 预算 ¥${O(e.budget)}`:`未设单项预算`}
            </span>
            <div class="trip-outing-actions">
              ${e.isActive?`<span class="trip-outing-current-pill">当前选中</span>`:`<button type="button" class="trip-outing-btn" data-action="select-overview-trip" data-id="${K(e.id)}">切换查看</button>`}
              <button type="button" class="trip-outing-btn" data-action="edit-trip" data-id="${K(e.id)}">✏️ 编辑</button>
              <button type="button" class="trip-outing-btn accent" data-action="open-poster-dialog" data-trip-id="${K(e.id)}">📖 手账</button>
            </div>
          </div>
        </div>
      `).join(``)}
      ${a}
    </div>
  `:`
    <div class="empty-state" style="padding:26px 16px;">
      <p style="margin:0 0 12px;color:var(--text-secondary);">创建游玩行程后，这里会直观对比每趟旅行的天数、花费与占比。</p>
      <button type="button" class="btn primary small" data-action="open-trip-create">➕ 新建第一趟行程</button>
    </div>
    ${a?`<div class="trip-outings-list" style="margin-top:12px;">${a}</div>`:``}
  `;return`
    <section class="panel trip-outings-panel">
      <div class="panel-heading">
        <div>
          <h2>历次行程开销总览</h2>
          <p>每趟游玩的天数、花费与占比 · 支持一键切换、编辑或打开手账</p>
        </div>
        ${e.length>1?`
          <div class="trend-switch" role="group" aria-label="历次行程排序方式">
            ${q(`按花费`,`trip-overview-sort`,`btn small ${r===`amount`?`primary`:``}`,`type="button" data-sort="amount"`)}
            ${q(`按时间`,`trip-overview-sort`,`btn small ${r===`date`?`primary`:``}`,`type="button" data-sort="date"`)}
          </div>
        `:``}
      </div>
      ${o}
    </section>
  `}function $(){Wt=W.status;let e=X();e&&(V.page===`assets`||V.page===`reports`)&&(V.page=`analysis`);let t=Mn();document.documentElement.dataset.theme=t;let n={analysis:[H.profile.nickname?`${K(H.profile.nickname)}的收支`:`收支分析`,`先看钱花在哪里，再决定下一步。`],transactions:[`账单明细`,`每一笔，都有它的来处。`],assets:[`资产`,`看清资产、负债和净资产。`],reports:[`报表`,`把一段日子放在一起看。`],data:[`导入与备份`,`把零散的账单，整理在一起。`]},r=e?{analysis:[`双人游玩收支`,`出游开销随时记 🐾`],transactions:[`出游账单明细`,`这一趟旅途中的每一份欢笑与足迹 ✈️`],data:[`导入与备份`,`把出游账单安全备份与保存 🌲`]}:n,i=e?[[`analysis`,`游玩概览`],[`transactions`,`账单明细`],[`data`,`导入与备份`]]:[[`analysis`,`收支分析`],[`transactions`,`账单明细`],[`assets`,`资产`],[`reports`,`报表`],[`data`,`导入与备份`]],a={loading:`正在连接`,queued:`等待同步`,syncing:`正在同步`,synced:`同步正常`,failed:`等待重试`,auth:`等待连接`,conflict:`需要核对`,offline:`离线就绪`},o=V.demo?`preview`:W.status===`offline`?`offline`:[`synced`,`loading`,`queued`,`syncing`].includes(W.status)?`connected`:`disconnected`,s=dt(W.user?.email||``),c=!e&&(t===`yier`||s===`yier`),l=c?`${R}icons/mascots/yier.webp`:`${R}icons/mascots/bubu.webp`,u=e?`<a class="brand" href="${R}" aria-label="熊熊同行"><span class="brand-mascots"><span class="trip-mascot-badge">🐻🎒🐼</span></span><span>熊熊同行<small>双人游玩专属账本 🐾</small></span></a>`:`<a class="brand" href="${R}" aria-label="熊熊账本"><span class="brand-mascots"><img class="brand-logo-img mascot-img" src="${l}" width="36" height="36" alt="${c?`一二`:`布布`}" data-fallback="src" data-src="${R}icons/icon-192.png"></span><span>熊熊账本<small>温暖记账本 🐾</small></span></a>`,d=e?`BUBU & YIER TRAVEL TOGETHER 🌲`:V.page===`analysis`?`YOUR EVERYDAY, IN BALANCE`:V.page===`data`?`ALL YOUR RECORDS, TOGETHER`:`A LITTLE CLARITY, EVERY DAY`,f=e&&V.page===`analysis`?Qn():[`analysis`,`transactions`].includes(V.page)?Bn():``;j.innerHTML=`
    <div class="workspace">
    <main>
    ${Gn()}
    <div class="page-heading"><div class="page-heading-group">${Un(V.page)}<div class="page-heading-titles"><p class="eyebrow">${d}</p><h1>${r[V.page][0]}<span class="title-dot">.</span></h1><p class="page-subtitle">${r[V.page][1]}</p></div></div><div class="heading-actions">${f}${[`analysis`,`transactions`].includes(V.page)?q(k(`plus`,18)+(e?`记一笔游玩`:`记一笔`),`add`,`btn primary heading-add`):``}</div></div>
    ${V.demo?`<div class="notice demo-notice">${k(`eye`,18)}<span>正在浏览示例账本：可试记一笔，数据仅保存在本页，刷新后恢复。</span>${q(`开始我的账本 `+k(`arrow`,15),`start-real`,`text-btn`)}</div>`:``}
    ${Kt?`<div class="notice error-notice">${k(`info`,18)}${K(Kt)}</div>`:``}${Jt?`<div class="notice error-notice">${k(`info`,18)}${K(Jt)}</div>`:``}
    ${V.demo?``:`<div class="sync-strip" data-sync-status role="status" aria-live="polite">${yn()}</div>`}<div id="page-content">${!W.ready&&!V.demo?xn():kr()}</div>
    ${[`analysis`,`transactions`].includes(V.page)?`<button class="fab-add" data-action="add" aria-label="${e?`记一笔游玩`:`记一笔`}">${k(`plus`,24)}</button>`:``}
    ${e?``:`<footer class="page-footer"><span>熊熊账本伴你认真生活 🐾</span></footer>`}</main></div>
    <aside class="sidebar">
      ${u}
      ${Wn()}
      <nav aria-label="主导航">${i.map(([e,t])=>`<button data-action="nav" data-page="${e}" class="nav-item ${V.page===e?`active`:``}" ${V.page===e?`aria-current="page"`:``}>${Hn(e,20)}<span class="nav-text">${t}</span></button>`).join(``)}</nav>
      ${V.demo?``:`<div class="sidebar-bottom"><div class="sidebar-sync ${o}" role="status"><i></i><span>${a[W.status]}</span></div></div>`}
    </aside>`,li(),wn(j)}function kr(){return V.page===`analysis`?Ar():V.page===`transactions`?ti():V.page===`assets`?Ur():V.page===`reports`?Yr():ri()}function Ar(){let e=X(),t=H.trips||[],n=t.find(e=>e.id===H.activeTripId)||t[0]||null,r=Y();if(e){let e=bt(t,r),i=n&&V.tripScope===`current`?`current`:`all`,a=i===`current`?r.filter(e=>e.tripId===n.id):r,o=a.filter(e=>e.type===`expense`).reduce((e,t)=>!e||t.amount>e.amount?t:e,null),s=o?fe(o.category):``,c=o?.tripId?t.find(e=>e.id===o.tripId):null,l=o?`${K(o.payee||s)}${i===`all`&&c?` · ${K(c.name)}`:``}`:`暂无支出`,u=`<small class="expense-breakdown"><span>毛支出 ¥${O(e.gross)}</span><span>已退款 ¥${O(e.refund)}</span></small>`,d=`
      <section class="finance-summary four overview-row" aria-label="游玩行程开销概览">
        <article class="overview-metric-card">
          <span>行程总支出</span>
          <strong>¥${O(e.totalExpense)}</strong>
          ${u}
        </article>
        <article class="overview-metric-card">
          <span>行程次均支出</span>
          <strong>¥${O(e.perOutingAvg)}</strong>
          <small>${e.outingCount>0?`按累计 ${e.outingCount} 次游玩行程核算`:`暂无出游记录`}</small>
        </article>
        <article class="overview-metric-card">
          <span>📅 行程游玩天数</span>
          <strong>${e.totalDays} 天</strong>
          <small>${t.length>0?`累计 ${t.length} 趟行程${e.dailyAvg>0?` · 日均 ¥${O(e.dailyAvg)}`:``}`:e.totalDays>0?`共记录 ${e.totalDays} 个游玩日`:`暂无游玩日记录`}</small>
        </article>
        <article class="overview-metric-card largest-expense-card">
          <div class="card-left">
            <span>最大单笔支出</span>
            <strong>${o?`¥${O(o.amount)}`:`—`}</strong>
            <small>${l}</small>
          </div>
          ${o?`<div class="card-right-icon" title="${K(s)}">${Pn(s)}</div>`:``}
        </article>
      </section>
    `;return`
      ${Zn(r)}
      ${Dr(a,i,n)}
      ${d}
      ${r.length?``:`<div class="welcome-strip"><div class="welcome-icon">${k(`paw`,22)}</div><div><strong>和熊熊一起，记下旅途的每一份小确幸 🐾</strong><p>随时记下一笔游玩花销，让回忆温暖而清晰。</p></div>${q(`记下第一笔 `+k(`arrow`,16),`add`,`text-btn`)}${q(`导入账单`,`go-import`,`btn small`)}</div>`}
      <div class="dashboard-grid">
        ${Or(t,r,n)}
        <section class="panel category-panel breakdown-panel">
          <div class="panel-heading">
            <div>
              <h2>游玩分类开销</h2>
              <p>${i===`current`&&n?`当前「${K(n.name)}」分类占比 · 点击查看对应账单`:`全部行程累计分类占比 · 点击查看对应账单`}</p>
            </div>
            ${Er(n,i)}
          </div>
          ${Nr(a,r,V.month,!0)}
        </section>
      </div>
    `}let i=On(),a=Ce(i),o=i.filter(e=>e.type===`expense`).reduce((e,t)=>!e||t.amount>e.amount?t:e,null),s=`<small class="expense-breakdown"><span>毛支出 ¥${O(a.gross)}</span><span>已退款 ¥${O(a.refund)}</span></small>`,c=Te(r,V.month),l=V.month===z.slice(0,7)?Number(z.slice(-2)):V.month<z.slice(0,7)?It(V.month):0,u=l?Math.round(a.expense/l):0,d=c.percent>0?`rate-up`:c.percent<0?`rate-down`:`rate-flat`,f=c.percent===null?``:`<span class="comparison-percent ${d}">${c.percent>0?`+`:``}${c.percent.toFixed(1)}%</span>`,p=c.comparable?`<small class="expense-breakdown"><span>本期 ¥${O(c.after)}</span><span>上期 ¥${O(c.before)}</span></small>`:`<small>暂无可比数据：上期至少需要 1 笔记录</small>`,m=`
    <section class="finance-summary four overview-row" aria-label="${An()}支出概览">
      <article class="overview-metric-card">
        <span>本期支出</span>
        <strong>¥${O(a.expense)}</strong>
        ${s}
      </article>
      <article class="overview-metric-card">
        <span>日均支出</span>
        <strong>¥${O(u)}</strong>
        <small>${l?`按 ${l} 个已发生日计算`:`尚未到达此月份`}</small>
      </article>
      <article class="overview-metric-card comparison-card">
        <span>较上期变化</span>
        <div class="diff-amount-wrap">
          <strong class="${c.difference>0?`negative`:c.difference<0?`positive`:``}">${c.comparable?`${c.difference>0?`+`:c.difference<0?`−`:``}¥${O(Math.abs(c.difference))}`:`—`}</strong>
          ${c.comparable?f:``}
        </div>
        ${p}
      </article>
      <article class="overview-metric-card largest-expense-card">
        <div class="card-left">
          <span>最大单笔支出</span>
          <strong>${o?`¥${O(o.amount)}`:`—`}</strong>
          <small>${o?K(o.payee||o.category):`暂无支出`}</small>
        </div>
        ${o?`<div class="card-right-icon" title="${K(o.category)}">${Pn(o.category)}</div>`:``}
      </article>
    </section>
  `,h=V.analysisTrend===`daily`?`实线＝每日实际支出，虚线＝7 日移动平均。`:`实线＝累计实际支出，虚线＝按本期日均推算的累计参考。`;return`
    ${m}
    ${r.length?``:`<div class="welcome-strip"><div class="welcome-icon">${k(`paw`,22)}</div><div><strong>和熊熊一起，记下生活的每一份小确幸 🐾</strong><p>随时记下一笔，让生活温暖而清晰。</p></div>${q(`记下第一笔 `+k(`arrow`,16),`add`,`text-btn`)}${q(`导入账单`,`go-import`,`btn small`)}</div>`}
    <div class="dashboard-grid">
      <section class="panel trend-panel">
        <div class="panel-heading">
          <div>
            <h2>消费趋势</h2>
            <p>${V.analysisTrend===`daily`?`实线为每日支出，虚线为 7 日移动平均`:`实线为累计支出，虚线为按本期日均推算的累计参考`}</p>
          </div>
          <div class="trend-switch" role="group" aria-label="消费趋势视图">
            ${q(`每日`,`analysis-trend-mode`,`btn small ${V.analysisTrend===`daily`?`primary`:``}`,`data-mode="daily"`)}
            ${q(`累计`,`analysis-trend-mode`,`btn small ${V.analysisTrend===`cumulative`?`primary`:``}`,`data-mode="cumulative"`)}
          </div>
        </div>
        ${Mr(i,V.analysisTrend,!1,null)}
        <div class="chart-caption">${k(`info`,13)} ${h}退款按到账日期抵扣，账户划转不计入收支</div>
      </section>
      <section class="panel category-panel breakdown-panel">
        <div class="panel-heading">
          <div>
            <h2>${V.breakdownTab===`channel`?`支出账户 / 支付渠道`:`分类支出`}</h2>
            <p>${V.breakdownTab===`channel`?`金额、占比与交易笔数`:`钱花在哪里 · 点击分类查看对应账单`}</p>
          </div>
          <div class="trend-switch breakdown-switch" role="group" aria-label="支出维度切换">
            ${q(`分类支出`,`analysis-breakdown-mode`,`btn small ${V.breakdownTab===`channel`?``:`primary`}`,`data-mode="category"`)}
            ${q(`支付渠道`,`analysis-breakdown-mode`,`btn small ${V.breakdownTab===`channel`?`primary`:``}`,`data-mode="channel"`)}
          </div>
        </div>
        ${V.breakdownTab===`channel`?`${Pr(i)}<div class="payment-footnote">只统计支出与退款；账户划转不会被当作收入或支出。</div>`:Nr(i,r,V.month,!1)}
      </section>
    </div>
    <div class="dashboard-grid bottom-grid single-bottom-grid">
      <section class="panel recent-panel full-width">
        <div class="panel-heading">
          <div><h2>最近账单 <span class="count-pill">${i.length}</span></h2><p>记录生活的每一个小片段</p></div>
          ${q(`查看全部 `+k(`arrow`,15),`go-transactions`,`text-btn`)}
        </div>
        ${Fr(kn(i).slice(0,5),!0)}
      </section>
    </div>`}function jr(e){let t=Math.max(1,e/4),n=10**Math.floor(Math.log10(t)),r=t/n;return Math.max(100,Math.round((r<=1?1:r<=2?2:r<=5?5:10)*n/100)*100)}function Mr(e,t=`daily`,n=X(),r=null){let i=[];if(n){if(r?.startDate&&r?.endDate){let e=new Date(`${r.startDate}T00:00:00Z`),t=new Date(`${r.endDate}T00:00:00Z`);for(;e<=t;)i.push(e.toISOString().slice(0,10)),e.setUTCDate(e.getUTCDate()+1)}else i=[...new Set(e.map(e=>e.date).filter(Boolean))].sort(),i.length||(i=[z])}else{let e=new Date(Number(V.month.slice(0,4)),Number(V.month.slice(5)),0).getDate();i=Array.from({length:e},(e,t)=>`${V.month}-${String(t+1).padStart(2,`0`)}`)}let a=i.length,o=i.map(t=>e.filter(e=>e.date===t).reduce((e,t)=>e+Se(t),0)),s=a;!n&&V.month===z.slice(0,7)&&(s=Math.min(a,Number(z.slice(-2))));let c=o.slice(0,s),l=t===`cumulative`?c.map((e,t)=>c.slice(0,t+1).reduce((e,t)=>e+t,0)):c,u=c.length?c.reduce((e,t)=>e+t,0)/c.length:0,d=t===`cumulative`?l.map((e,t)=>u*(t+1)):n?l.map(()=>u):l.map((e,t)=>c.slice(Math.max(0,t-6),t+1).reduce((e,t)=>e+t,0)/Math.min(7,t+1)),f=jr(Math.max(0,...l,...d)),p=f*4,m=Math.min(0,...l,...d),h=m<0?Math.floor(m*1.15/100)*100:0,g=e=>64+e/Math.max(a-1,1)*616,_=e=>18+(p-e)/(p-h)*157,v=l.map((e,t)=>`${t?`L`:`M`}${g(t).toFixed(1)},${_(e).toFixed(1)}`).join(` `),y=d.map((e,t)=>`${t?`L`:`M`}${g(t).toFixed(1)},${_(e).toFixed(1)}`).join(` `),b=s?`${v} L${g(s-1)},${_(0)} L64,${_(0)} Z`:``,x=[0,1,2,3,4].map(e=>h===0?f*e:h+(p-h)/4*e),ee=e=>`¥${Math.round(e/100).toLocaleString(`zh-CN`)}`,S=[];S=n?a<=8?i.map((e,t)=>t):[0,Math.floor(a/4),Math.floor(a/2),Math.floor(a*3/4),a-1]:[1,5,10,15,20,25,a].map(e=>e-1).filter(e=>e>=0&&e<a);let C=e=>{if(n){let t=i[e];return`D${e+1} (${t.slice(5)})`}return`${String(e+1).padStart(2,`0`)}日`};return`
    <div class="trend-chart" data-trend-chart>
      <div class="trend-touch-bar" aria-live="polite"><span class="touch-bar-hint">滑动或点击图表查看每日明细</span></div>
      <svg class="trend-chart-svg" viewBox="0 0 700 207" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${n?`行程开销趋势`:An()+(t===`daily`?`每日支出`:`累计支出`)+`趋势`}${e.length?``:`，暂无记录`}">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent)" stop-opacity=".24"/>
            <stop offset="100%" stop-color="var(--accent)" stop-opacity=".015"/>
          </linearGradient>
        </defs>
        ${x.map(e=>`<path d="M64 ${_(e)} H680" stroke="#c7d7e5" stroke-dasharray="3 5"/><text x="51" y="${_(e)+4}" text-anchor="end" fill="#536b7d" font-size="11">${ee(e)}</text>`).join(``)}
        ${b?`<path d="${b}" fill="url(#chart-fill)"/>`:``}
        ${y?`<path d="${y}" fill="none" stroke="#78a58e" stroke-width="2.5" stroke-dasharray="6 5"/>`:``}
        ${v?`<path d="${v}" fill="none" stroke="var(--accent)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`:``}
        ${l.map((e,n)=>`
          <g class="chart-point-hit" data-date="${i[n]}" data-day="第 ${n+1} 天" data-val="${O(e)}" data-ref="${d[n]?O(d[n]):``}" data-mode="${t}" data-cx="${g(n).toFixed(1)}" data-cy="${_(e).toFixed(1)}">
            <line class="point-hover-guide" x1="${g(n).toFixed(1)}" y1="18" x2="${g(n).toFixed(1)}" y2="175" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="3 3"/>
            <circle class="point-hit-area" cx="${g(n).toFixed(1)}" cy="${_(e).toFixed(1)}" r="14" fill="transparent"/>
            <circle class="point-dot" cx="${g(n).toFixed(1)}" cy="${_(e).toFixed(1)}" r="${e?4:1.8}" fill="var(--accent)"/>
            <title>${i[n]} (第 ${n+1} 天) · ${t===`daily`?`支出`:`累计支出`} ¥${O(e)}</title>
          </g>
        `).join(``)}
        ${S.map(e=>`<text x="${g(e)}" y="202" text-anchor="middle" fill="#536b7d" font-size="11">${C(e)}</text>`).join(``)}
      </svg>
      <div class="trend-tooltip" aria-hidden="true"></div>
      ${e.length?``:`<div class="chart-empty"><span>等待你的第一笔记录</span></div>`}
    </div>
  `}function Nr(e,t=Y(),n=V.month,r=X()){if(r){let t=we(e.map(e=>e.category===`小笨门票`?{...e,category:`小笨娱乐`}:e),`category`),n=t.length?t:ue.map(e=>({name:e,amount:0})),r=n.reduce((e,t)=>e+Math.max(0,t.amount),0);return`<div class="category-legend">${n.map(e=>{let t=ce[e.name]||ce.其他,n=r>0&&e.amount>0?`${(e.amount/r*100).toFixed(1)}%`:`0.0%`;return`<button class="legend-row" data-action="filter-category" data-category="${K(e.name)}"><i style="background:${t.color}"></i><span>${K(e.name)}</span><strong>¥${O(e.amount)}</strong><span class="legend-rate rate-flat" title="占总分类支出比例">${n}</span></button>`}).join(``)}</div>`}let i=we(e,`category`),a=Ee(t,n,z);return`<div class="category-legend">${(i.length?i:[`餐饮`,`购物`,`交通`].map(e=>({name:e,amount:0}))).map(e=>{let t=a.get(e.name),n=t.status===`up`?`rate-up`:t.status===`down`?`rate-down`:`rate-flat`,r=t.status===`up`?t.label===`新增`?`${a.label}新增支出`:`${a.label}上升 ${t.label.replace(`+`,``)}`:t.status===`down`?`${a.label}下降 ${t.label.replace(`-`,``)}`:t.status===`flat`?`${a.label}持平`:`暂无上月可比数据`;return`<button class="legend-row" data-action="filter-category" data-category="${K(e.name)}"><i style="background:${ce[e.name].color}"></i><span>${K(e.name)}</span><strong>¥${O(e.amount)}</strong><span class="legend-rate ${n}" title="${K(r)}">${t.label}</span></button>`}).join(``)}</div>`}function Pr(e){let t=we(e,`channel`),n=t.filter(e=>e.amount!==0).map(e=>e.name),r=Math.max(1,...t.map(e=>Math.max(0,e.amount))),i=t.reduce((e,t)=>e+Math.max(0,t.amount),0);return n.length?`<div class="payment-rows">${n.map(n=>{let a=t.find(e=>e.name===n)?.amount||0,o=se[n],s=e.filter(e=>e.channel===n&&[`expense`,`refund`].includes(e.type)).length;return`<button class="payment-row" data-action="filter-channel" data-channel="${n}"><span class="payment-logo" style="--channel:${o.color}">${k(o.icon,22)}</span><span class="payment-detail"><span>${o.name}<strong>¥${O(a)}</strong></span><small>${i&&a>0?(a/i*100).toFixed(1):`0.0`}% · ${s} 笔</small><span class="progress-track"><i style="width:${Math.max(0,a)/r*100}%;background:${o.color}"></i></span></span></button>`}).join(``)}</div>`:`<div class="empty-state"><p>记录支出后，这里会显示支付渠道。</p></div>`}function Fr(e,t=!1){if(!e.length)return`<div class="empty-state">${k(`list`,32)}<h3>${V.search||V.category||V.channel||V.type?`没有找到符合条件的账单`:`这里还没有账单`}</h3><p>${V.search||V.category||V.channel||V.type?`试试其他关键词，或清除筛选条件。`:`一顿午饭，一杯咖啡，都可以是第一笔。`}</p>${q(V.search||V.category||V.channel||V.type?`清除筛选`:`记一笔`,V.search||V.category||V.channel||V.type?`clear-filters`:`add`,`btn small`)}</div>`;let n=``,r=X();return`<div class="transaction-list ${t?`compact`:``}">${e.map(e=>{let i=!t&&e.date!==n?`<div class="day-heading"><strong>${In(e.date)}</strong><span>${e.date}</span></div>`:``;n=e.date;let a=r?fe(e.category):e.category,o=r?null:vi(e),s=r&&e.tripId?H.trips?.find(t=>t.id===e.tripId):null,c=t?``:r?s?`<span>·</span>${s.coverEmoji||`🏖️`} ${K(s.name)}`:``:o?`<span>·</span>${K(yi(o))}`:``,l=e.payer?`<span class="payer-tag ${e.payer}">${e.payer===`bubu`?`🐻 布布`:e.payer===`yier`?`🐼 一二`:`🍯 基金`}</span>`:``,u=r?``:`<div class="transaction-channel">${Fn(e.channel)}</div>`;return`${i}<div class="transaction-row" data-record="${K(e.id)}"><button class="transaction-main" data-action="edit" data-id="${K(e.id)}" aria-label="查看${K(e.payee||a)}">${Pn(a)}<span class="transaction-title"><strong>${K(e.payee||a)}</strong>${l}<small>${K(a)}<span>·</span>${t?In(e.date):K(e.note||ge[e.type])}${c}</small></span></button>${u}<div class="transaction-amount ${e.type}"><strong>${e.type===`expense`?`−`:e.type===`income`||e.type===`refund`?`+`:``}${O(e.amount)}</strong>${t?``:`<small>${ge[e.type]}</small>`}</div>${t?``:`<div class="row-actions">${q(k(`edit`,16),`edit`,`icon-btn`,`data-id="${K(e.id)}" aria-label="编辑${K(e.payee||a)}"`)}${q(k(`trash`,16),`delete`,`icon-btn danger`,`data-id="${K(e.id)}" aria-label="删除${K(e.payee||a)}"`)}</div>`}</div>`}).join(``)}</div>`}function Ir(){let e=X(),t=e?``:V.channel,n=e&&(V.type===`income`||V.type===`transfer`)?``:V.type;return kn(On().filter(r=>{let i=!V.category||r.category===V.category||e&&V.category===`小笨娱乐`&&r.category===`小笨门票`;return(!t||r.channel===t)&&i&&(!n||r.type===n)&&(!V.search||[r.payee,r.note,r.category,fe(r.category),r.date,O(r.amount)].join(` `).toLowerCase().includes(V.search.toLowerCase()))}))}var Lr={asset:[[`cash`,`现金`],[`checking`,`活期账户`],[`wallet`,`电子钱包`],[`savings`,`储蓄`],[`term_deposit`,`定期存款`],[`investment`,`投资`],[`receivable`,`应收款`],[`other_asset`,`其他资产`]],liability:[[`credit_card`,`信用卡`],[`loan`,`借款 / 贷款`],[`payable`,`应付款`],[`other_liability`,`其他负债`]]},Rr=[[`现金与活期`,new Set([`cash`,`checking`,`wallet`])],[`储蓄`,new Set([`savings`,`term_deposit`])],[`投资`,new Set([`investment`])],[`其他资产`,new Set([`receivable`,`other_asset`])],[`负债`,new Set([`credit_card`,`loan`,`payable`,`other_liability`])]],zr=Object.fromEntries(Object.values(Lr).flat()),Br=e=>zr[e.accountType]||e.type||`其他`,Vr=e=>Rr.find(([,t])=>t.has(e.accountType))?.[0]||(Rt(e)?`负债`:`其他资产`),Hr=(e,t)=>e===`asset`&&[`cash`,`checking`,`wallet`].includes(t);function Ur(){let e=H.accounts.filter(e=>!e.archived),t=H.accounts.filter(e=>e.archived),{assets:n,liabilities:r,netWorth:i}=zt(e),a=Wr(i),o=Kr(e,n);return`<section class="finance-summary three assets-summary"><article class="net-worth-card"><span>净资产</span><strong>¥${O(i)}</strong><small class="${a.change<0?`negative`:``}">${a.label}</small></article><article><span>总资产</span><strong>¥${O(n)}</strong><small>不含已归档账户</small></article><article><span>总负债</span><strong class="${r?`negative`:``}">¥${O(r)}</strong><small>${r?`计入净资产扣减`:`当前没有负债账户`}</small></article></section>
  <section class="panel finance-panel asset-trend-panel"><div class="panel-heading"><div><h2>净资产趋势</h2><p>每日首次打开与账户余额更新时记录同步快照。</p></div></div>${Gr(i)}</section>
  ${n?`<section class="panel finance-panel"><div class="panel-heading"><div><h2>资产结构</h2><p>资产按账户类型归类；负债单独显示，不混入资产占比。</p></div></div>${qr(o,n,r)}</section>`:``}
  <section class="panel finance-panel"><div class="panel-heading"><div><h2>账户</h2><p>账户余额由已联动账单自动更新；按住账户卡片即可拖拽调整顺序。</p></div>${q(k(`plus`,16)+` 添加账户`,`add-account`,`btn primary`)}</div>${e.length?`<div class="account-list account-sort-list" data-account-sort-list aria-label="拖拽调整账户顺序">${e.map(e=>Jr(e,!0)).join(``)}</div>`:`<div class="empty-state"><p>添加现金、银行卡或电子钱包后，这里会显示资产结构与净资产。</p></div>`}</section>
  ${t.length?`<section class="panel finance-panel archived-panel"><div class="panel-heading"><div><h2>已归档账户</h2><p>归档账户不计入当前资产，可随时恢复。</p></div></div><div class="account-list">${t.map(Jr).join(``)}</div></section>`:``}`}function Wr(e){let t=`${z.slice(0,7)}-01`,n=[...H.netWorthSnapshots||[]].filter(e=>e.date<t).sort((e,t)=>t.date.localeCompare(e.date))[0];if(!n)return{change:0,label:`开始记录后显示月度变化`};let r=e-n.netWorthMinor,i=n.netWorthMinor?r/Math.abs(n.netWorthMinor)*100:null;return{change:r,label:`较上月 ${r>=0?`+`:`−`}¥${O(Math.abs(r))}${i===null?``:` · ${r>=0?`+`:``}${i.toFixed(1)}%`}`}}function Gr(e){let t=[...H.netWorthSnapshots||[]].sort((e,t)=>e.date.localeCompare(t.date)).slice(-12);if(t.length<2)return`<div class="asset-trend-empty"><strong>当前净资产 ¥${O(e)}</strong><span>连续记录两天后，这里会展示变化趋势。</span></div>`;let n=t.map(e=>e.netWorthMinor),r=Math.min(...n),i=Math.max(...n)-r||1;return`<div class="asset-trend"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="净资产趋势图"><polyline points="${t.map((e,n)=>`${n/(t.length-1)*100},${100-(e.netWorthMinor-r)/i*82-9}`).join(` `)}"/></svg><div><span>${t[0].date}</span><span>当前 ¥${O(e)}</span></div></div>`}function Kr(e,t){return Rr.slice(0,-1).map(([t])=>({name:t,amount:e.filter(e=>!Rt(e)&&Vr(e)===t).reduce((e,t)=>e+Number(t.balance||0),0)})).filter(e=>e.amount>0||!t)}function qr(e,t,n){if(!t)return`<div class="empty-state"><p>添加现金、银行卡或电子钱包后，这里会显示资产结构与净资产。</p></div>`;let r=0,i=[`#6eaa84`,`#8cb88e`,`#b6c995`,`#d6c17d`];return`<div class="asset-structure"><div class="asset-donut" style="background:conic-gradient(${e.map((e,n)=>{let a=r+e.amount/t*100,o=`${i[n]} ${r}% ${a}%`;return r=a,o}).join(`,`)})"><span>总资产</span><strong>¥${O(t)}</strong></div><div class="asset-structure-rows">${e.map((e,n)=>`<div><i style="background:${i[n]}"></i><span>${e.name}<small>${t?(e.amount/t*100).toFixed(1):`0.0`}%</small></span><b>¥${O(e.amount)}</b></div>`).join(``)}${n?`<div class="liability-structure"><i></i><span>负债<small>不计入资产占比</small></span><b class="negative">¥${O(n)}</b></div>`:``}</div></div>`}function Jr(e,t=!1){let n=Rt(e),r=t&&!e.archived?`data-account-id="${K(e.id)}"`:``,i=t&&!e.archived?`<button type="button" class="account-drag-handle" data-drag-handle aria-label="拖动${K(e.name)}调整顺序" title="按住拖动排序">${k(`grid`,18)}</button>`:``;return`<div class="account-row account-card" ${r}><span><strong>${K(e.name)}</strong><small>${n?`负债`:`资产`} · ${K(Br(e))}${e.archived?` · 已归档`:``}</small></span><b class="${n?`negative`:``}">¥${O(e.balance)}</b>${i}<details class="account-menu"><summary aria-label="${K(e.name)}更多操作">⋯</summary><div>${q(`编辑账户`,`edit-account`,`text-btn`,`data-id="${K(e.id)}"`)}${e.archived?q(`恢复账户`,`restore-account`,`text-btn`,`data-id="${K(e.id)}"`):q(`归档账户`,`archive-account`,`text-btn`,`data-id="${K(e.id)}"`)}${q(`删除账户`,`delete-account`,`text-btn danger`,`data-id="${K(e.id)}"`)}</div></details></div>`}function Yr(){let e=Number(V.reportRange)||6,t=Lt(Y(),z.slice(0,7),e,z);return`<section class="panel report-filter-panel"><div class="report-filters"><label>时间<select id="report-range" aria-label="报表时间范围">${Object.entries({1:`本月`,3:`近 3 个月`,6:`近 6 个月`,12:`近 12 个月`}).map(([t,n])=>`<option value="${t}" ${e===Number(t)?`selected`:``}>${n}</option>`).join(``)}</select></label><span>比较周期：前 ${e} 个月</span><small>${t.months[0]} 至 ${t.months.at(-1)}；当前月只统计已发生日期。</small></div></section>
  <section class="panel finance-panel report-section"><div class="panel-heading"><div><h2>收支趋势</h2><p>按月聚合收入、支出与净结余</p></div></div>${Zr(t.rows)}</section>
  <section class="panel finance-panel report-section"><div class="panel-heading"><div><h2>分类变动与支出贡献</h2><p>按金额变化绝对值排序，对比前期支出并分析对总支出变动的贡献。</p></div></div>${Qr(t.categoryChanges,t.currentSummary.expense,t.previousSummary.expense)}</section>
  <section class="panel finance-panel report-section"><div class="panel-heading"><div><h2>统计口径</h2><p>退款按实际到账日期抵扣原分类；本人账户划转不计入收支。</p></div></div></section>`}function Xr(e){let t=[...new Set(e)].sort((e,t)=>e-t),n=[],r=null,i=null;for(let e of t){if(r===null){r=i=e;continue}if(e===i+1){i=e;continue}n.push(r===i?`${r} 月`:`${r}–${i} 月`),r=i=e}return r!==null&&n.push(r===i?`${r} 月`:`${r}–${i} 月`),n.join(`、`)}function Zr(e){let t=e.filter(e=>e.count);if(!t.length)return`<div class="empty-state"><p>这个时间范围还没有可统计的记录。</p></div>`;let n=Math.max(1,...t.flatMap(e=>[e.income,e.expense,Math.abs(e.balance)])),r=e.filter(e=>!e.count).map(e=>Number(e.month.slice(5)));return`<div class="report-trend">${t.map(e=>`<div class="report-trend-row"><span>${Number(e.month.slice(5))} 月</span><div class="report-bars"><i class="income" style="width:${e.income/n*100}%" title="收入 ¥${O(e.income)}"></i><i class="expense" style="width:${Math.max(0,e.expense)/n*100}%" title="支出 ¥${O(e.expense)}"></i></div><strong class="${e.balance<0?`negative`:``}">${e.balance>=0?`+`:`−`}¥${O(Math.abs(e.balance))}</strong><small>收入 ¥${O(e.income)} · 支出 ¥${O(e.expense)}</small></div>`).join(``)}${r.length?`<p class="report-empty-note">${Xr(r)}无记录</p>`:``}<p class="report-legend"><i></i>收入 <i></i>支出 · 右侧为净结余</p></div>`}function Qr(e,t=0,n=0){return e.length?`<div class="report-table">${e.slice(0,10).map(e=>`<div><span>${K(e.name)}<small>本期 ¥${O(e.current)} · 前期 ¥${O(e.previous)}</small></span><b class="${e.difference>0?`negative`:``}">${e.difference>=0?`+`:`−`}¥${O(Math.abs(e.difference))}<small>${$r(e,t,n)}</small></b></div>`).join(``)}</div>`:`<div class="empty-state"><p>还没有可比较的分类支出。</p></div>`}function $r(e,t=0,n=0){if(e.difference===0)return`持平`;if(n<=0)return t>0&&e.current>0?`新增 · 占总支出 ${(e.current/t*100).toFixed(1)}%`:e.current>0?`新增`:`—`;let r=e.changeRate===null?e.current>0?`新增`:`减少至0`:`${e.changeRate>=0?`+`:``}${(e.changeRate*100).toFixed(1)}%`,i=t-n;return i===0?r:i>0?e.difference>0?`${r} · 贡献增长 ${(e.difference/i*100).toFixed(1)}%`:`${r} · 减少支出`:e.difference<0?`${r} · 贡献节流 ${(Math.abs(e.difference)/Math.abs(i)*100).toFixed(1)}%`:`${r} · 增加支出`}function ei(){if(X()){let e=Object.keys(de).filter(e=>e!==`小笨门票`&&Y().some(t=>t.category===e));return[...new Set([...ue,...e])]}return V.type===`income`?he:V.type===`transfer`?[`账户划转`]:pe}function ti(){let e=X(),t=ei();V.category&&!t.includes(V.category)&&(V.category=``);let n=e?``:`<select aria-label="筛选支付方式" data-filter="channel"><option value="">全部支付方式</option>${Object.entries(se).map(([e,t])=>`<option value="${e}" ${V.channel===e?`selected`:``}>${t.name}</option>`).join(``)}</select>`,r=Object.entries(ge).filter(([t])=>!e||t===`expense`||t===`refund`);return`<section class="panel ledger-panel"><div class="filters"><label class="search-input">${k(`search`,18)}<input type="search" aria-label="搜索账单" placeholder="搜索商户、备注或金额" value="${K(V.search)}"></label>${n}<select aria-label="筛选分类" data-filter="category"><option value="">全部分类</option>${t.map(e=>`<option ${V.category===e?`selected`:``}>${e}</option>`).join(``)}</select><select aria-label="筛选收支类型" data-filter="type"><option value="">全部类型</option>${r.map(([e,t])=>`<option value="${e}" ${V.type===e?`selected`:``}>${t}</option>`).join(``)}</select>${q(`重置`,`clear-filters`,`text-btn`)}</div><div id="filtered-content">${ni()}</div></section>`}function ni(){let e=X(),t=Ir(),n=Ce(t),r=e?``:`<span>收入 <strong>¥${O(n.income)}</strong></span>`;return`<div class="filtered-summary"><span>共 <strong>${t.length}</strong> 笔记录</span><span>净支出 <strong>¥${O(n.expense)}</strong></span>${r}${q(k(`download`,15)+`导出当前结果`,`export-filtered`,`text-btn`)}</div>${Fr(t.slice(0,V.limit))}${t.length>V.limit?`<div class="load-more">${q(`加载更多（剩余 ${t.length-V.limit} 笔）`,`load-more`,`btn`)}</div>`:``}`}function ri(){let e=cn();return`<div class="data-grid"><section class="panel import-panel"><div class="panel-heading"><div><h2>导入支付账单</h2><p>微信、支付宝，以及通用 CSV 表格</p></div><span class="soft-icon page-soft-icon">${Hn(`data`,24)}</span></div><label class="field-label source-select">账单来源<select id="import-source" aria-label="账单来源"><option value="auto">自动识别</option><option value="wechat" ${V.source===`wechat`?`selected`:``}>微信支付</option><option value="alipay" ${V.source===`alipay`?`selected`:``}>支付宝</option><option value="csv" ${V.source===`csv`?`selected`:``}>通用表格</option></select></label><label class="drop-zone file-picker"><span class="upload-illustration">${k(`list`,30)}<i>${k(`plus`,14)}</i></span><strong>选择账单文件，或拖放到这里</strong><span>支持 CSV / XLSX，单个文件最大 10 MB</span><span class="btn small">${k(`upload`,15)}选择文件</span><input id="bill-file" class="file-overlay" type="file" accept=".csv,.xlsx,.tsv,.txt" aria-label="选择账单文件"></label><div class="import-steps"><span><b>1</b>选择账单</span><i></i><span><b>2</b>预览与核对</span><i></i><span><b>3</b>确认导入</span></div><div id="import-message" role="status"></div><div class="import-notes"><p>${k(`shield`,15)} 文件在本机读取，确认后的账单同步到在线账本。</p><p>${k(`info`,15)} 压缩包请先解压；XLSX 读取第一张工作表。</p></div>${q(k(`download`,15)+`下载通用 CSV 模板`,`template`,`text-btn`)}</section>
  <div class="data-side"><section class="panel backup-panel"><div class="panel-heading"><div><h2>给记录留一份备份</h2><p>${V.demo?`示例账本`:`当前真实账本`}共 ${Y().length} 笔</p></div>${k(`shield`,22)}</div>${q(k(`download`,17)+`导出完整备份`,`backup`,`btn primary full`)}<label class="btn full file-picker">${k(`upload`,17)}从备份恢复<input id="backup-file" class="file-overlay" type="file" accept=".json" aria-label="从备份恢复"></label><small>JSON 备份保留退款关联和导入标识。</small>${e.transactions.length?`<p class="backup-description">此浏览器还有 ${e.transactions.length} 笔旧版记录，可导出后在在线账本中恢复。</p>${q(`导出旧版账本`,`raw-backup`,`btn full`)}`:``}<div id="restore-message" role="status"></div>${Kt?q(`导出原始存储数据`,`raw-backup`,`btn full`):``}</section></div></div><section id="import-preview">${V.importData?oi():``}</section>`}function ii(e,t){return`<option value="">${t}</option>${[...H.accounts,...(V.importData?.accountAdditions||[]).filter(e=>!H.accounts.some(t=>t.id===e.id))].map(t=>`<option value="${K(t.id)}" ${t.id===e?`selected`:``}>${K(t.name)}</option>`).join(``)}`}function ai(e,t,n){let r=e.record;if(!(r.type===`transfer`||n===`from`&&r.type===`expense`||n===`to`&&[`income`,`refund`].includes(r.type)))return`—`;let i=n===`from`?r.type===`transfer`?r.fromAccountId:r.accountId:r.type===`transfer`?r.toAccountId:r.accountId;return`<select aria-label="第${t+1}笔${n===`from`?`从账户`:`到账户`}" data-import-account="${t}" data-account-side="${n}" ${e.error||e.duplicate===`exact`?`disabled`:``}>${ii(i,n===`from`?`选择从账户`:`选择到账户`)}</select>`}function oi(){let e=V.importData,t=X(),n=e.candidates.filter(e=>e.selected).length,r=e.candidates.filter(e=>e.duplicate===`exact`).length,i=e.candidates.filter(e=>e.review||e.duplicate===`possible`||e.error).length,a=t?`游玩账本导入仅记录行程收支数据，不关联扣款/到账账户，也不变动个人资产余额。`:`可直接修改交易对方（名称）及账户；划转优先于收支字段，不能可靠确认账户的记录默认不导入。`;return`<div class="panel preview-panel"><div class="panel-heading"><div><h2>导入预览 <span class="count-pill">${e.candidates.length} 笔</span></h2><p>${K(e.filename)} · ${r} 笔已导入 · ${i} 笔需核对${e.skipped?` · 已跳过 ${e.skipped} 笔关闭或失败交易`:``}</p></div>${q(`取消预览`,`cancel-import`,`text-btn`)}</div><div class="notice import-notice">${k(`info`,17)}<span>${a}</span></div><div class="preview-scroll"><table class="preview-table"><thead><tr><th>选择</th><th>日期 / 交易对方</th><th>金额</th><th>类型</th>${t?``:`<th>从账户</th><th>到账户</th>`}<th>分类</th><th>检查结果</th></tr></thead><tbody>${e.candidates.map((e,n)=>{let r=t?[`expense`,`refund`]:[`expense`,`income`,`transfer`],i=t?ue:pe,a=e.record.type===`income`?he:e.record.type===`transfer`?[`账户划转`]:i,o=r.includes(e.record.type)?``:`<option value="${e.record.type}" selected disabled>${ge[e.record.type]||e.record.type}（不记录）</option>`;return`<tr class="${e.error||e.review||e.duplicate?`needs-review`:``}"><td><input type="checkbox" aria-label="导入第${n+1}笔" data-import-check="${n}" ${e.selected?`checked`:``} ${e.error||e.needsType||e.duplicate===`exact`?`disabled`:``}></td><td><input class="preview-cell-input" type="text" aria-label="第${n+1}笔交易对方" data-import-payee="${n}" value="${K(e.record.payee)}" maxlength="200" ${e.duplicate===`exact`?`disabled`:``}><small>${K(e.record.date||`日期无效`)}</small></td><td class="money">${e.record.amount?`¥`+O(e.record.amount):`无效`}</td><td><select aria-label="第${n+1}笔类型" data-import-type="${n}" ${e.error||e.duplicate===`exact`?`disabled`:``}>${e.needsType?`<option value="" selected disabled>待核对</option>`:``}${o}${r.map(t=>`<option value="${t}" ${!e.needsType&&t===e.record.type?`selected`:``}>${ge[t]}</option>`).join(``)}</select></td>${t?``:`<td>${ai(e,n,`from`)}</td><td>${ai(e,n,`to`)}</td>`}<td><select aria-label="第${n+1}笔分类" data-import-category="${n}" ${e.error||e.duplicate===`exact`?`disabled`:``}>${a.map(t=>`<option ${t===e.record.category?`selected`:``}>${t}</option>`).join(``)}</select></td><td><span class="preview-status ${e.error||e.review||e.duplicate?`warning`:`ok`}">${e.error||(e.duplicate===`exact`?`已导入`:e.duplicate===`possible`?`可能重复，请核对`:e.review||`可导入`)}</span></td></tr>`}).join(``)}</tbody></table></div><div class="preview-footer"><label><input type="checkbox" id="select-safe" ${n===e.candidates.filter(e=>!e.error&&!e.duplicate&&!e.review).length&&n>0?`checked`:``}>选择全部可直接导入记录</label><span id="selected-count">已选 ${n} 笔</span>${q(`确认导入`,`confirm-import`,`btn primary`,n?``:`disabled`)}</div></div>`}async function si(e,t,n){if(W.busy){J(`正在同步上一项修改，请稍候`);return}let r=H.accounts.filter(e=>!e.archived),i=r.findIndex(t=>t.id===e),a=r.findIndex(e=>e.id===t);if(i<0||a<0||i===a)return;let[o]=r.splice(i,1);i<a&&a--,r.splice(a+ +!!n,0,o);let s=0;await hn(H.accounts.map(e=>e.archived?e:r[s++])),$(),J(`账户顺序已调整并同步`)}function ci(){let e=j.querySelector(`[data-account-sort-list]`);if(!e)return;let t=null,n=null,r=!1,i=()=>{e.querySelectorAll(`.drop-before, .drop-after, .is-dragging`).forEach(e=>e.classList.remove(`drop-before`,`drop-after`,`is-dragging`)),n=null},a=(i,a)=>{!i||i.dataset.accountId===t?.id||n===i&&r===a||(e.querySelectorAll(`.drop-before, .drop-after`).forEach(e=>e.classList.remove(`drop-before`,`drop-after`)),n=i,r=a,i.classList.add(r?`drop-after`:`drop-before`))};e.addEventListener(`pointerdown`,e=>{let n=e.target.closest(`[data-drag-handle]`),r=n?.closest(`[data-account-id]`);n&&r&&e.button===0&&(e.preventDefault(),t={id:r.dataset.accountId,row:r,startY:e.clientY,active:!1},n.setPointerCapture?.(e.pointerId))}),e.addEventListener(`pointermove`,n=>{if(!t||!t.active&&Math.abs(n.clientY-t.startY)<7)return;t.active=!0,t.row.classList.add(`is-dragging`),n.preventDefault();let r=document.elementFromPoint(n.clientX,n.clientY)?.closest?.(`[data-account-id]`);if(!r||!e.contains(r))return;let i=r.getBoundingClientRect();a(r,n.clientY>i.top+i.height/2)}),e.addEventListener(`pointerup`,async e=>{if(!t)return;let a=t;if(t=null,!a.active||!n){i();return}let o=n.dataset.accountId,s=r;i();try{await si(a.id,o,s)}catch(e){J(e.message)}}),e.addEventListener(`pointercancel`,()=>{t=null,i()})}function li(){j.querySelector(`input[type="month"]`)?.addEventListener(`change`,e=>{/^(19|20|21)\d{2}-(0[1-9]|1[0-2])$/.test(e.target.value)&&(V.month=e.target.value,$())}),j.querySelector(`input[type="search"]`)?.addEventListener(`input`,e=>{V.search=e.target.value,V.limit=40,j.querySelector(`#filtered-content`).innerHTML=ni()}),j.querySelectorAll(`[data-filter]`).forEach(e=>e.addEventListener(`change`,()=>{let t=e.dataset.filter;V[t]=e.value,t===`type`?(V.category&&!ei().includes(V.category)&&(V.category=``),V.limit=40,$()):(V.limit=40,j.querySelector(`#filtered-content`).innerHTML=ni())})),j.querySelector(`#report-range`)?.addEventListener(`change`,e=>{V.reportRange=e.target.value,$()}),j.querySelector(`#import-source`)?.addEventListener(`change`,e=>V.source=e.target.value),j.querySelector(`#bill-file`)?.addEventListener(`change`,e=>{e.target.files[0]&&mi(e.target.files[0])}),j.querySelector(`#backup-file`)?.addEventListener(`change`,e=>{e.target.files[0]&&Ai(e.target.files[0])});let e=j.querySelector(`.drop-zone`);e&&(e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`dragover`)}),e.addEventListener(`dragleave`,()=>e.classList.remove(`dragover`)),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`dragover`),t.dataTransfer.files[0]&&mi(t.dataTransfer.files[0])})),ci()}function ui(e=null){nn=e?.id||null;let t=e?.accountClass||(e?.liability?`liability`:`asset`),n=e?.accountType||(t===`liability`?`credit_card`:`cash`);di({name:e?.name||``,accountClass:t,accountType:n,balance:e?(Number(e.balance||0)/100).toFixed(2):``}),Vt.showModal()}function di(e){let t=Lr[e.accountClass];t.some(([t])=>t===e.accountType)||(e.accountType=t[0][0]),Vt.innerHTML=`<form id="account-form"><div class="dialog-header"><div><span class="eyebrow">ASSET ACCOUNT</span><h2>${nn?`编辑账户`:`添加账户`}</h2></div>${q(k(`close`,21),`close-account-dialog`,`icon-btn`,`type="button" aria-label="关闭账户窗口"`)}</div><div class="account-dialog-fields"><label class="field-label">账户名称<input name="name" maxlength="50" value="${K(e.name)}" required autocomplete="off"></label><label class="field-label">账户性质<select name="accountClass"><option value="asset" ${e.accountClass===`asset`?`selected`:``}>资产</option><option value="liability" ${e.accountClass===`liability`?`selected`:``}>负债</option></select></label><label class="field-label">账户类型<select name="accountType">${t.map(([t,n])=>`<option value="${t}" ${e.accountType===t?`selected`:``}>${n}</option>`).join(``)}</select></label><label class="field-label">${nn?`当前账户余额`:`期初余额`}<input name="balance" inputmode="decimal" placeholder="0.00" value="${K(e.balance)}" required></label><p class="field-hint">新增账单关联此账户后会自动更新余额；手动修改余额用于首次录入或对账校正。</p></div><p id="account-error" class="inline-error" role="alert"></p><div class="dialog-footer"><span>${k(`shield`,14)} 保存后同步到其他设备</span>${q(nn?`保存修改`:`添加账户`,`btn primary`,`type="submit"`)}</div></form>`;let n=Vt.querySelector(`form`);n.querySelector(`[name="accountClass"]`).addEventListener(`change`,e=>{let t=Object.fromEntries(new FormData(n)),r=e.target.value,i=Lr[r][0][0];di({...t,accountClass:r,accountType:i})}),n.querySelector(`[name="accountType"]`).addEventListener(`change`,()=>{di(Object.fromEntries(new FormData(n)))}),n.addEventListener(`submit`,fi)}async function fi(e){e.preventDefault();let t=e.currentTarget,n=Object.fromEntries(new FormData(t)),r=bn(n.balance),i=t.querySelector(`#account-error`);if(!n.name.trim()){i.textContent=`请输入账户名称`;return}if(r===null){i.textContent=`请输入有效账户余额，可填写 0.00`;return}let{accountClass:a,accountType:o}=n;if(!Lr[a]?.some(([e])=>e===o)){i.textContent=`账户性质与类型不匹配`;return}let s=H.accounts.find(e=>e.id===nn),c={...s||{},id:s?.id||crypto.randomUUID(),name:n.name.trim(),accountClass:a,accountType:o,openingBalanceMinor:s?.openingBalanceMinor??r,balance:r,includeInBudget:s?.includeInBudget??!1,includeInForecast:a===`asset`&&(s?.includeInForecast??Hr(a,o)),archived:s?.archived===!0};await hn(s?H.accounts.map(e=>e.id===s.id?c:e):[...H.accounts,c]),Vt.close(),$(),J(s?`账户修改已同步`:`账户已添加并同步`)}function pi(e){return ue.includes(e)?e:e===`交通`||e===`大交通`||e===`市内交通`?`小笨交通`:e===`居住`||e===`酒店住宿`?`小笨酒店`:e===`餐饮`||e===`当地美食`?`小笨美食`:e===`娱乐`||e===`门票游乐`||e===`门票娱乐`||e===`小笨门票`?`小笨娱乐`:`小笨特产与纪念品`}async function mi(e){if(V.demo){J(`请先退出示例，再导入到你的真实账本`);return}let t=j.querySelector(`#import-message`);t.textContent=`正在读取文件…`;try{let t={...Fe(await Ue(e),V.source,un()),filename:e.name};if(X()){let e=dt(W.user?.email||``)===`yier`?`yier`:`bubu`,n=H.trips?.length?H.activeTripId||H.trips[0].id:``;for(let r of t.candidates)r.record.accountBalanceApplied=!1,r.record.accountId=``,r.record.fromAccountId=``,r.record.toAccountId=``,r.record.fromAccountName=``,r.record.toAccountName=``,r.record.type===`transfer`||r.record.type===`income`?(r.selected=!1,r.review||=r.record.type===`income`?`游玩账本不记录收入，已默认跳过`:`游玩账本不记录账户划转，已默认跳过`):(r.record.type===`expense`&&(r.record.category=pi(r.record.category)),r.record.payer=r.record.payer||e,r.record.tripId=r.record.tripId||n);V.importData={...t,accountAdditions:[]}}else V.importData=gi(t);$(),j.querySelector(`#import-preview`).scrollIntoView({behavior:`smooth`,block:`start`})}catch(e){t.textContent=e.message,t.className=`inline-error`}}function hi(e,t){let n=String(t||``).normalize(`NFKC`).replace(/[\s·.()（）]/g,``).toLowerCase();if(!n)return null;let r=n.match(/\d{4}$/)?.[0],i=e.find(e=>{let t=e.name.normalize(`NFKC`).replace(/[\s·.()（）]/g,``).toLowerCase();return t===n||r&&t.includes(r)&&t.includes(n.replace(r,``))});if(i)return i;let a=n.match(/招商银行|建设银行|工商银行|农业银行|交通银行|邮储银行|中国银行|中信银行|兴业银行|民生银行|平安银行|光大银行|广发银行/)?.[0];if(!a||r)return null;let o=e.filter(e=>e.name.normalize(`NFKC`).replace(/[\s·.()（）]/g,``).toLowerCase().includes(a));return o.length===1?o[0]:null}function gi(e){let t=[],n=[...H.accounts],r=e=>{let r=e===`零钱通`?/零钱通/:/微信零钱|微信余额|^零钱$/,i=hi(n,e),a=n.filter(e=>r.test(e.name)),o=i||(a.length===1?a[0]:null);if(o)return o;let s={id:`wechat-${e===`零钱通`?`money-market`:`balance`}`,name:e,accountClass:`asset`,accountType:`wallet`,openingBalanceMinor:0,balance:0,includeInBudget:!0,includeInForecast:!0,archived:!1};return n.push(s),t.push(s),s},i=(e,t=``)=>{let i=[t,e.originalPaymentMethod,e.originalDescription,e.originalType,e.payee,e.note].filter(Boolean).join(` `).normalize(`NFKC`);if(/零钱通/.test(i))return r(`零钱通`);if(/微信零钱|微信支付零钱|(?:^|\s)零钱(?:\s|$)/.test(i))return r(`微信零钱`);let a=hi(n,t)||hi(n,e.originalPaymentMethod);if(a)return a;if(e.channel===`cash`){let e=n.filter(e=>e.accountType===`cash`);return e.length===1?e[0]:null}let o=e.channel===`wechat`?n.filter(e=>/微信|零钱/.test(e.name)):e.channel===`alipay`?n.filter(e=>/支付宝|余额宝/.test(e.name)):[];return o.length===1?o[0]:null},a=e=>{if(!e)return null;let r=i({originalPaymentMethod:e,originalDescription:``,originalType:``,payee:``,note:``,channel:`other`},e);if(r)return r;let a={id:crypto.randomUUID(),name:e,accountClass:`asset`,accountType:/银行|储蓄卡|信用卡/.test(e)?`checking`:`other_asset`,openingBalanceMinor:0,balance:0,includeInBudget:!0,includeInForecast:!0,archived:!1};return n.push(a),t.push(a),a};for(let t of e.candidates){let e=t.record;if(e.type!==`transfer`){let t=e.type===`expense`?e.fromAccountName:e.toAccountName,n=t?a(t):i(e);if(!n)continue;e.accountId=n.id,e.type===`expense`?e.fromAccountName=n.name:e.toAccountName=n.name;continue}let n=e.fromAccountName?a(e.fromAccountName):null,r=e.toAccountName&&e.toAccountName!==`银行卡（待确认）`?a(e.toAccountName):null;e.fromAccountId=n?.id||``,e.toAccountId=r?.id||``,n&&(e.fromAccountName=n.name),r&&(e.toAccountName=r.name),(!n||!r)&&(t.review||=`账户待确认：${n?`未找到“${e.toAccountName||`到账账户`}”`:`未找到“${e.fromAccountName||`来源账户`}”`}`,e.needsReview=!0,t.selected=!1)}return{...e,accountAdditions:t}}function _i(e){return H.accounts.find(t=>t.id===e)?.name||``}function vi(e){if(e.type===`transfer`){let t=_i(e.fromAccountId)||e.fromAccountName||``,n=_i(e.toAccountId)||e.toAccountName||``;return!t&&!n?null:{from:t,to:n}}let t=_i(e.accountId)||e.toAccountName||e.fromAccountName||``;return t?e.type===`expense`?{from:t,to:``}:{from:``,to:t}:null}function yi(e){return e?e.from&&e.to?`${e.from} → ${e.to}`:e.to?`到 ${e.to}`:e.from:``}function bi(){let e=M.querySelector(`form`),t=Object.fromEntries(new FormData(e));return{...t,type:e.dataset.type,channel:e.dataset.channel,category:e.dataset.category,payer:e.dataset.payer||``,tripId:t.tripId||``}}function xi(e=null){if(!V.demo&&!W.ready){J(`请先登录并同步私人账本`),j.querySelector(`#supabase-email`)?.focus();return}U=e?.id||null,en=e?JSON.stringify(e):null;let t=X(),n=``;t&&(n=dt(W.user?.email||``)===`yier`?`yier`:`bubu`);let r=t&&H.trips?.length?H.activeTripId||H.trips[0].id:``,i=t?ue[0]:`餐饮`,a=t&&e?.type===`expense`&&e?.category===`小笨门票`?`小笨娱乐`:e?.category;Ti(e?{...e,category:a,amountInput:(e.amount/100).toFixed(2),payer:e.payer||n,tripId:e.tripId===void 0?r:e.tripId}:{type:`expense`,category:i,channel:Object.hasOwn(se,B.lastChannel)?B.lastChannel:`wechat`,date:z,payee:``,note:``,amountInput:``,payer:n,tripId:r}),M.showModal(),M.querySelector(`[name="amountInput"]`).focus()}function Si(e){let t=new Set([e.accountId,e.fromAccountId,e.toAccountId]);return H.accounts.filter(e=>!e.archived||t.has(e.id))}function Ci(e,t,n){return`<option value="">${n}</option>${e.map(e=>`<option value="${K(e.id)}" ${e.id===t?`selected`:``}>${K(e.name)}${e.archived?`（已归档）`:``}</option>`).join(``)}`}function wi(e){let t=Si(e);if(!t.length)return`<p class="field-hint inline-error">请先在“资产”页添加账户，再记录会影响资产余额的账单。</p>`;if(e.type===`transfer`)return`<div class="form-grid"><label class="field-label">转出账户<select name="fromAccountId" required>${Ci(t,e.fromAccountId,`选择转出账户`)}</select></label><label class="field-label">转入账户<select name="toAccountId" required>${Ci(t,e.toAccountId,`选择转入账户`)}</select></label></div>`;let n=e.type===`expense`?`实际扣款账户`:`实际到账账户`,r=U&&e.accountBalanceApplied!==!0?`<small class="field-hint">历史账单关联账户仅补全关系，不会改动已核对的当前余额。</small>`:``;return`<label class="field-label">${n}<select name="accountId" required>${Ci(t,e.accountId,`选择${n}`)}</select>${r}</label>`}function Ti(e){let t=X();t&&(e.type===`transfer`||e.type===`income`)&&(e.type=`expense`);let n=t?ue:pe,r=e.type===`income`?he:e.type===`transfer`?[`账户划转`]:n;!r.includes(e.category)&&!me.includes(e.category)&&(e.category=r[0]);let i=kn(Y().filter(e=>e.type===`expense`)),a=Object.entries(ge).filter(([e])=>!t||e===`expense`||e===`refund`),o=t&&(e.type===`expense`||e.type===`refund`)?`
    <div class="field-label">${e.type===`refund`?`退回谁 / 原出资方`:`谁买单 / 出资方`}</div>
    <div class="payer-options">
      <button type="button" class="payer-btn ${e.payer===`bubu`?`selected`:``}" data-action="entry-payer" data-payer="bubu">
        <span class="payer-emoji">🐻</span>
        <span>${e.type===`refund`?`退回布布`:`布布买单`}</span>
      </button>
      <button type="button" class="payer-btn ${e.payer===`yier`?`selected`:``}" data-action="entry-payer" data-payer="yier">
        <span class="payer-emoji">🐼</span>
        <span>${e.type===`refund`?`退回一二`:`一二买单`}</span>
      </button>
      <button type="button" class="payer-btn ${e.payer===`fund`?`selected`:``}" data-action="entry-payer" data-payer="fund">
        <span class="payer-emoji">🍯</span>
        <span>${e.type===`refund`?`退回基金`:`共同基金`}</span>
      </button>
    </div>
  `:``,s=t&&H.trips?.length?`
    <label class="field-label">归属行程
      <select name="tripId">
        <option value="">不关联特定行程</option>
        ${H.trips.map(t=>`<option value="${K(t.id)}" ${t.id===e.tripId?`selected`:``}>${t.coverEmoji||`🏖️`} ${K(t.name)} (${t.startDate.slice(5)})</option>`).join(``)}
      </select>
    </label>
  `:``,c=t?``:`
    <div class="field-label">${e.type===`income`||e.type===`refund`?`收款方式`:`支付方式`}</div>
    <div class="channel-options">
      ${[`wechat`,`alipay`,`cash`].map(t=>q(`${k(se[t].icon,19)}${se[t].short}`,`entry-channel`,`channel-option ${e.channel===t?`selected`:``}`,`type="button" data-channel="${t}" aria-pressed="${e.channel===t}"`)).join(``)}
      <select name="moreChannel" aria-label="更多支付方式" class="more-channel ${[`bank`,`other`].includes(e.channel)?`selected`:``}">
        <option value="">更多</option>
        <option value="bank" ${e.channel===`bank`?`selected`:``}>银行卡</option>
        <option value="other" ${e.channel===`other`?`selected`:``}>其他</option>
      </select>
    </div>
  `,l=t?`<p class="field-hint">游玩账本仅做行程开销与分摊记录，不涉及实际资金账户流向与余额变动。</p>`:``;M.innerHTML=`<form id="entry-form" data-type="${e.type}" data-channel="${e.channel||`other`}" data-category="${K(e.category)}" data-payer="${e.payer||``}"><div class="dialog-header"><div><span class="eyebrow">${t?`BUBU & YIER TRAVEL NOTE`:`A LITTLE NOTE FOR TODAY`}</span><h2>${U?`编辑账单`:t?`记一笔游玩开销`:`记一笔`}</h2></div>${q(k(`close`,21),`close-entry`,`icon-btn`,`type="button" aria-label="关闭记账窗口"`)}</div><div class="type-tabs" role="group" aria-label="收支类型">${a.map(([t,n])=>q(n,`entry-type`,`type-tab ${e.type===t?`active`:``}`,`type="button" data-type="${t}" aria-pressed="${e.type===t}"`)).join(``)}</div><label class="amount-input"><span>金额</span><div><b>¥</b><input name="amountInput" aria-label="金额" inputmode="decimal" placeholder="0.00" value="${K(e.amountInput)}" maxlength="14" required autocomplete="off"></div></label>${o}${e.type===`refund`?`<label class="field-label">关联原支出<select name="originalId" aria-label="关联原支出" required><option value="">选择要退款的原消费</option>${i.map(t=>`<option value="${K(t.id)}" ${t.id===e.originalId?`selected`:``}>${t.date} · ${K(t.payee||t.category)} · ¥${O(t.amount)}</option>`).join(``)}</select></label><p class="field-hint">退款会抵扣原消费分类，累计金额不能超过原支出。</p>`:`<div class="field-label">${e.type===`transfer`?`交易性质`:`选择分类`}</div><div class="category-options">${r.map(t=>q(`${Nn(t,Mn(),26)}<span>${t}</span>`,`entry-category`,`category-option ${e.category===t?`selected`:``}`,`type="button" data-category="${t}" aria-pressed="${e.category===t}"`)).join(``)}</div>`}${c}${s}<div class="form-grid"><label class="field-label">日期<input type="date" name="date" aria-label="日期" min="1900-01-01" max="2199-12-31" value="${K(e.date)}" required></label><label class="field-label">商户 / 名称 <span class="optional">选填</span><input name="payee" aria-label="商户或名称" placeholder="${t?`例如：当地火锅 / 景区门票`:`例如：今天的午餐`}" value="${K(e.payee)}" maxlength="200"></label></div><label class="field-label">备注 <span class="optional">选填</span><input name="note" aria-label="备注" placeholder="${t?`记下出游小故事…`:`记点什么…`}" value="${K(e.note)}" maxlength="500"></label>${l}${e.type===`transfer`?`<p class="field-hint">仅用于你本人账户之间的资金移动，不计入收入或支出。</p>`:``}<p id="entry-error" class="inline-error" role="alert"></p><div class="dialog-footer"><span>${k(`shield`,14)} ${V.demo?`仅保存在本页，刷新后恢复`:`保存后同步到其他设备`}</span>${q(U?`保存修改`:`保存账单`,`submit-entry`,`btn primary`,`type="submit"`)}</div></form>`,t||M.querySelector(`.channel-options`).insertAdjacentHTML(`afterend`,wi(e)),t&&e.type===`refund`&&M.querySelector(`[name="originalId"]`)?.addEventListener(`change`,e=>{let t=i.find(t=>t.id===e.target.value);if(!t)return;let n=bi();t.payer&&(n.payer=t.payer),t.tripId&&(n.tripId=t.tripId),Ti(n)}),M.querySelector(`form`).addEventListener(`submit`,Ei),M.querySelector(`[name="moreChannel"]`)?.addEventListener(`change`,e=>{if(e.target.value){let t=bi();t.channel=e.target.value,Ti(t)}})}async function Ei(e){if(e.preventDefault(),tn)return;tn=!0;let t=M.querySelector(`[type="submit"]`);t.disabled=!0,t.textContent=`正在保存…`;try{let e=X(),t=bi(),n=un(),r=n.find(e=>e.id===U);if(U&&!r)throw Error(`这笔账单已在其他设备删除，请关闭后重新操作`);if(r&&JSON.stringify(r)!==en)throw Error(`这笔账单已被其他设备修改，请关闭后重新打开，核对最新内容`);let i=t.type===`refund`?n.find(e=>e.id===t.originalId):null,a={...r||{},id:U||crypto.randomUUID(),type:t.type,amount:be(t.amountInput),date:t.date,channel:t.channel,category:i?.category||t.category,payee:t.payee.trim(),note:t.note.trim(),source:r?.source||`manual`,createdAt:r?.createdAt||new Date().toISOString(),...t.type===`refund`?{originalId:t.originalId}:{originalId:``},payer:t.payer||(e&&(t.type===`expense`||t.type===`refund`)?i?.payer||`bubu`:``),tripId:t.tripId||(e&&i?.tripId?i.tripId:``)};if(r&&n.some(e=>e.originalId===r.id)&&r.type!==a.type)throw Error(`这笔支出已有退款，请先处理关联退款再修改类型`);let o;e?(a.accountBalanceApplied=!1,a.accountId=``,a.fromAccountId=``,a.toAccountId=``,a.fromAccountName=``,a.toAccountName=``,o=void 0):(a.accountBalanceApplied=r?.accountBalanceApplied===!0||!r,a.type===`transfer`?(a.accountId=``,a.fromAccountId=t.fromAccountId||``,a.toAccountId=t.toAccountId||``):(a.accountId=t.accountId||``,a.fromAccountId=``,a.toAccountId=``),Mt([a],H.accounts),o=pn(Ft(H.accounts,r,a)));let s=U?n.map(e=>e.id===U?a:e):[...n,a];r&&r.category!==a.category&&(s=s.map(e=>e.originalId===r.id?{...e,category:a.category}:e)),await ln(s,a.channel,o),V.month=a.date.slice(0,7);let c=a.id,l=window.scrollY;M.close(),$(),requestAnimationFrame(()=>{let e=j.querySelector(`[data-record="${CSS.escape(c)}"]`);e?e.scrollIntoView({block:`center`,behavior:`instant`}):window.scrollTo({top:l,behavior:`instant`}),e?.classList.add(`just-saved`),setTimeout(()=>e?.classList.remove(`just-saved`),1600)}),J(V.demo?U?`示例修改已保存，刷新后恢复`:`已加入示例账本，刷新后恢复`:U?`修改已保存`:`已记下这一笔`)}catch(e){M.querySelector(`#entry-error`).textContent=e.message}finally{tn=!1,t.disabled=!1,t.textContent=U?`保存修改`:`保存账单`}}function Di(e,t,n,r){N.innerHTML=`<div class="confirm-content"><span class="soft-icon">${k(`info`,24)}</span><h2>${K(e)}</h2><p>${K(t)}</p><div class="confirm-actions">${q(`取消`,`cancel-confirm`,`btn`)}${q(n,`accept-confirm`,`btn primary`)}</div><p class="inline-error" role="alert"></p></div>`,N.querySelector(`[data-action="accept-confirm"]`).onclick=async()=>{let e=N.querySelector(`[data-action="accept-confirm"]`);if(!e.disabled){e.disabled=!0;try{await r(),N.close()}catch(e){N.querySelector(`.inline-error`).textContent=e.message}finally{e.disabled=!1}}},N.showModal()}function Oi(e){let t=V.demo?Dn():B.transactions,n=t.find(t=>t.id===e);if(n){if(t.some(t=>t.originalId===e)){J(`这笔支出关联了退款，请先删除关联退款`);return}Di(`删除这笔账单？`,`${n.date} · ${n.payee||n.category} · ¥${O(n.amount)}。删除后可通过提示条撤销。`,`删除账单`,async()=>{let t=un();if(t.some(t=>t.originalId===e))throw Error(`这笔支出已有退款，请先处理关联退款`);let r=t.find(t=>t.id===e);if(!r)throw Error(`这笔账单已被删除`);if(JSON.stringify(r)!==JSON.stringify(n))throw Error(`这笔账单已在其他设备修改，请核对后重新删除`);let i=X()?void 0:pn(Ft(H.accounts,r,null));await ln(t.filter(t=>t.id!==e),B.lastChannel,i),$(),J(V.demo?`已从示例账本删除`:`账单已删除`,async()=>{let e=un();if(!e.some(e=>e.id===r.id)){let t=X()?void 0:pn(Ft(H.accounts,null,r));await ln([...e,r],B.lastChannel,t)}$(),J(`已恢复这笔账单`)})})}}function ki(e,t,n=`application/json;charset=utf-8`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.click(),setTimeout(()=>URL.revokeObjectURL(r),1e4)}async function Ai(e){try{if(V.demo)throw Error(`请先退出示例，再恢复到真实账本`);if(e.size>31457280)throw Error(`备份文件过大，最大支持 30 MB`);let t=ke(await e.text()),n=t.transactions,r=un(),i=n.filter(e=>r.some(t=>t.id===e.id&&JSON.stringify(t)!==JSON.stringify(e))),a=n.filter(e=>!r.some(t=>t.id===e.id)),o=t.finance?`；财务设置将去重合并，当前账本内容优先`:``;Di(`合并备份到账本`,`备份包含 ${n.length} 笔；新增 ${a.length} 笔。相同标识的已有记录保持不变${i.length?`，其中 ${i.length} 笔内容有差异，将保留当前账本版本`:``}${o}。`,`确认合并`,async()=>{let e=un(),r=n.filter(t=>!e.some(e=>e.id===t.id)),i=t.finance?l(H,t.finance):void 0;await ln([...e,...r],B.lastChannel,i),$(),J(`备份已合并，新增 ${r.length} 笔${t.finance?`，财务设置已同步`:``}`)})}catch(e){j.querySelector(`#restore-message`).textContent=e.message,j.querySelector(`#restore-message`).className=`inline-error`}}function ji(){let e=j.querySelector(`#import-preview`),t=e.querySelector(`.preview-scroll`),n={pageY:window.scrollY,tableTop:t?.scrollTop||0,tableLeft:t?.scrollLeft||0};e.innerHTML=oi(),requestAnimationFrame(()=>{let t=e.querySelector(`.preview-scroll`);t&&(t.scrollTop=n.tableTop,t.scrollLeft=n.tableLeft),window.scrollTo({top:n.pageY,behavior:`instant`})})}function Mi(e,t,n){let r=e.record,i=[...H.accounts,...V.importData.accountAdditions||[]].find(e=>e.id===n);r.type===`transfer`?(r[t===`from`?`fromAccountId`:`toAccountId`]=n,r[t===`from`?`fromAccountName`:`toAccountName`]=i?.name||``,r.fromAccountId&&r.toAccountId?(e.review=``,r.needsReview=!1):(e.review=`账户待确认：请选择从账户和到账户`,r.needsReview=!0,e.selected=!1)):(r.accountId=n,t===`from`?r.fromAccountName=i?.name||``:r.toAccountName=i?.name||``)}document.addEventListener(`change`,e=>{let t=e.target;if(t.matches(`[data-action="quick-switch-trip"]`)){let e=t.value;H.activeTripId=e,G({activeTripId:e}).catch(e=>J(e.message)),$();return}if(V.importData){if(t.matches(`[data-import-check]`)&&(V.importData.candidates[Number(t.dataset.importCheck)].selected=t.checked,ji()),t.matches(`[data-import-type]`)){let e=V.importData.candidates[Number(t.dataset.importType)];e.record.type=t.value,e.needsType=!1,e.review=``,e.record.needsReview=!1,t.value!==`transfer`&&(e.record.fromAccountId=``,e.record.toAccountId=``,e.record.fromAccountName=``,e.record.toAccountName=``),e.record.category=t.value===`income`?`其他收入`:t.value===`transfer`?`账户划转`:X()?`小笨美食`:`其他`,ji()}if(t.matches(`[data-import-account]`)){let e=V.importData.candidates[Number(t.dataset.importAccount)];Mi(e,t.dataset.accountSide,t.value),ji()}t.matches(`[data-import-payee]`)&&(V.importData.candidates[Number(t.dataset.importPayee)].record.payee=t.value.trim()||`账单导入`,ji()),t.matches(`[data-import-category]`)&&(V.importData.candidates[Number(t.dataset.importCategory)].record.category=t.value,ji()),t.id===`select-safe`&&(V.importData.candidates.forEach(e=>e.selected=t.checked&&!e.error&&!e.duplicate&&!e.review),ji())}}),document.addEventListener(`click`,async e=>{if(e.target===P){P.close();return}if(e.target===Ht){Ht.close();return}if(e.target===F){F.close();return}if(e.target===I){I.close();return}if(e.target===L){Q.exporting||await dr();return}let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.action;if(!(tn&&[`close-entry`,`entry-type`,`entry-category`,`entry-channel`,`entry-payer`].includes(n)))try{if(n===`connect`&&Cn(),n===`close-auth`&&P.close(),n===`disconnect`){if(W.pending||W.busy)throw Error(`请先确认上一笔保存，再断开连接`);await rt(),await W.switchUser(null),B=qe(),H=o(),Zt=null,Qt=null,P.close(),W.update(`auth`),$(),J(`已退出登录，云端账本仍然保留`)}if(n===`sync`){await W.retryNow();let e=await _n();$(),J(e?`账本已同步，本机财务数据已完成迁移`:`已开始同步本机修改`)}if(n===`nav`&&zn(t.dataset.page),n===`go-transactions`){try{history.replaceState(Ln(),``,window.location.href)}catch{}Ni(),zn(`transactions`)}if(n===`go-import`&&zn(`data`),n===`add-account`&&ui(),n===`close-account-dialog`&&Vt.close(),n===`edit-account`&&ui(H.accounts.find(e=>e.id===t.dataset.id)),n===`archive-account`&&Di(`归档这个账户？`,`归档后它不计入当前资产；历史净值快照会保留。`,`归档`,async()=>{await hn(H.accounts.map(e=>e.id===t.dataset.id?{...e,archived:!0}:e)),$(),J(`账户已归档并同步`)}),n===`restore-account`&&(await hn(H.accounts.map(e=>e.id===t.dataset.id?{...e,archived:!1}:e)),$(),J(`账户已恢复并同步`)),n===`analysis-trend-mode`&&(V.analysisTrend=t.dataset.mode,$()),n===`analysis-breakdown-mode`&&(V.breakdownTab=t.dataset.mode,$()),n===`delete-account`){if(Y().some(e=>jt(e,t.dataset.id))){J(`该账户已有历史交易，只能归档，不能直接删除`);return}Di(`删除这个账户？`,`此操作不可撤销。没有关联交易的账户才允许删除。`,`删除`,async()=>{await hn(H.accounts.filter(e=>e.id!==t.dataset.id)),$(),J(`账户已删除并同步`)})}if((n===`prev-month`||n===`next-month`)&&(V.month=xe(V.month,n===`prev-month`?-1:1),$()),n===`toggle-demo`||n===`start-real`){let e=n!==`start-real`&&!V.demo;if(V.demo=e,V.importData=null,V.month=Gt,Ni(),$t=null,history.replaceState(null,``,e?R+`?demo=1`:R),e)H=En(),Xt=!0,$();else{if(W.user){await dn(W.user.id);try{await vn()}catch{}}else H=o(),Xt=!0,$();xi()}}if(n===`toggle-theme`){let e=Mn()===`yier`?`bubu`:`yier`;H.profile.theme=e;try{localStorage.setItem(`local_theme_preview`,e)}catch{}if(W.ready)try{await G({profile:{...H.profile,theme:e}})}catch{}$(),J(e===`yier`?`已切换至 熊猫一二 主题 🐼`:`已切换至 小熊布布 主题 🐻`)}if(n===`open-switcher`&&Kn(),n===`close-switch-dialog`&&Ht.close(),n===`add-new-account`&&(Ht.close(),Cn()),n===`switch-account`){let e=t.dataset.id,n=lt().find(t=>t.id===e);if(!n)return;if(Ht.close(),!n.tokens?.access_token||!n.tokens?.refresh_token){J(`账号「${n.name}」需重新输入密码连接`),Cn(n.email||``);return}J(`正在切换到：${n.name}…`);try{let e=await ot(n.tokens),t=e?.session||await it(),r=e?.user||t?.user||null;if(!r)throw Error(`未获取到有效用户凭据，请重新登录`);t&&ht(t,{user:r,name:n.name,isTrip:n.isTrip}),await W.switchUser(r),r?.id&&await dn(r.id);let i=pt(r,H),a=null;i?a=`trip`:n.role===`bubu`||n.email&&n.email.includes(`484784621`)?a=`bubu`:(n.role===`yier`||n.email&&n.email.includes(`cyrdmn`))&&(a=`yier`),a&&H.profile.theme!==a&&(H.profile.theme=a,await G({profile:{...H.profile,theme:a,...i?{isTripLedger:!0}:{}}})),await vn(),$(),J(`已成功切换至：${n.name}`)}catch(e){J(`切换失败，可能登录凭据已过期：${e.message}`),Cn(n.email||``)}}if(n===`remove-account`){let e=t.dataset.id;gt(e),qn(),J(`已从快捷列表中移除`)}if(n===`toggle-account-trip`||n===`quick-toggle-current-mode`){let e=n===`toggle-account-trip`?t.dataset.id:W.user?.id;if(e){let t=!X();mt(e,t);let n=t?`trip`:W.user?.email?.includes(`cyrdmn`)?`yier`:`bubu`;H.profile.theme=n;try{W.ready&&await G({profile:{...H.profile,theme:n,isTripLedger:t}})}catch{}qn(),$(),J(`当前账本已变更为「${t?`情侣游玩专属账本 🌲`:`个人日常账本 🏠`}」`)}}if(n===`entry-payer`){let e=bi();e.payer=t.dataset.payer,Ti(e)}if((n===`open-trip-manage`||n===`open-trip-dialog`)&&$n(),n===`close-trip-dialog`&&F.close(),n===`open-trip-create`&&tr(``),n===`edit-trip`&&tr(t.dataset.id||``),n===`close-trip-form-dialog`&&I.close(),n===`select-trip-emoji`&&(Z.coverEmoji=t.dataset.emoji||`🏖️`,I?.querySelectorAll(`[data-action="select-trip-emoji"]`).forEach(e=>{e.classList.toggle(`selected`,e.dataset.emoji===Z.coverEmoji)})),n===`set-active-trip`){let e=t.dataset.id;H.activeTripId=e,await G({activeTripId:e}),F.open&&er(),$(),J(`已设为当前进行中行程`)}if(n===`toggle-trip-status`){let e=t.dataset.id,n=(H.trips||[]).map(t=>t.id===e?{...t,status:t.status===`completed`?`active`:`completed`}:t),r=n.find(t=>t.id===e);r&&(await G({trips:n}),F.open&&er(),$(),J(r.status===`completed`?`行程已收官 🎉`:`行程已重新开启 🎒`))}if(n===`delete-trip`){let e=t.dataset.id;if(window.confirm(`确定要删除该行程吗？（属于该行程的账单仍会保留）`)){let t=(H.trips||[]).filter(t=>t.id!==e);await G({trips:t,activeTripId:H.activeTripId===e?t[0]?.id||``:H.activeTripId}),F.open&&er(),$(),J(`行程已删除`)}}if(n===`set-trip-scope`&&(V.tripScope=t.dataset.scope===`current`?`current`:`all`,$()),n===`trip-overview-sort`&&(V.tripOverviewSort=t.dataset.sort===`date`?`date`:`amount`,$()),n===`select-overview-trip`){let e=t.dataset.id||``,n=(H.trips||[]).find(t=>t.id===e);n&&(H.activeTripId=e,await G({activeTripId:e}),$(),J(`已切换当前行程为「${n.name}」`))}if(n===`open-poster-from-trip`){let e=t.dataset.id||``;F.close(),pr(e)}if(n===`open-poster-dialog`&&pr(t.dataset.tripId||``),n===`close-poster-dialog`&&await dr(),n===`journal-mobile-tab`){Q.mobileTab=t.dataset.tab||`preview`;let e=L.querySelector(`.journal-studio`);e&&(e.dataset.mobileTab=Q.mobileTab),L.querySelectorAll(`.jm-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===Q.mobileTab))}if(n===`trigger-journal-upload`&&(Q.replaceIndex=Number(t.dataset.slot??-1),L.querySelector(`#journal-photo-input`)?.click()),n===`move-journal-photo`){let e=Number(t.dataset.idx),n=Number(t.dataset.dir),r=Q.draft?.photos;if(Array.isArray(r)&&r[e]&&r[e+n]){let t=[...r];[t[e],t[e+n]]=[t[e+n],t[e]],Q.draft.photos=t,vr(),lr()}}if(n===`remove-journal-photo`){let e=Number(t.dataset.idx),n=Q.draft?.photos;Array.isArray(n)&&n[e]&&(Q.draft.photos=n.filter((t,n)=>n!==e),vr(),lr())}if(n===`journal-set-opt`){let e=t.dataset.key,n=t.dataset.val??``;Q.draft&&e&&(Q.draft[e]=n,vr(),lr())}if(n===`copy-gpt-prompt`){let e=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(rr),e=!0}catch{}if(!e){let t=document.createElement(`textarea`);t.value=rr,t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();try{e=document.execCommand(`copy`)}catch{}t.remove()}J(e?`已复制 3:4 双分区插画提示词，可直接粘贴给 GPT ✨`:`复制失败，请展开提示词手动复制`)}if(n===`toggle-gpt-prompt`&&(Q.promptOpen=!Q.promptOpen,vr()),n===`save-journal-now`&&await ur(!1),n===`download-poster`&&await wr(t.dataset.tripId||``),n===`add`&&xi(),n===`close-entry`&&M.close(),n===`entry-type`){let e=bi();e.type=t.dataset.type,Ti(e)}if(n===`entry-category`){let e=bi();e.category=t.dataset.category,Ti(e)}if(n===`entry-channel`){let e=bi();e.channel=t.dataset.channel,Ti(e)}if(n===`edit`&&xi(Y().find(e=>e.id===t.dataset.id)),n===`delete`&&Oi(t.dataset.id),n===`cancel-confirm`&&N.close(),n===`undo`&&an){let e=an;an=null,await e()}if(n===`filter-category`||n===`filter-channel`){try{history.replaceState(Ln(),``,window.location.href)}catch{}Ni();let e=n===`filter-category`?`category`:`channel`,r=t.dataset[e];if(V[e]=r,n===`filter-category`&&X()&&r){let e=e=>e.category===r||r===`小笨娱乐`&&e.category===`小笨门票`;if(!On().some(e)){let t=Y().filter(e).sort((e,t)=>t.date.localeCompare(e.date))[0];t?.date&&(V.month=t.date.slice(0,7))}}zn(`transactions`)}if(n===`clear-filters`){Ni();try{history.replaceState(Ln(),``,window.location.href)}catch{}$()}if(n===`load-more`&&(V.limit+=80,j.querySelector(`#filtered-content`).innerHTML=ni()),n===`export-filtered`&&(ki(`熊熊账本-${V.month}-账单.csv`,Ie(Ir().map(e=>{let t=X()?null:vi(e);return{...e,sourceAccountName:t?.from||``,destinationAccountName:t?.to||``}})),`text/csv;charset=utf-8`),J(`当前筛选结果已导出；完整恢复请使用 JSON 备份`)),n===`backup`){if(V.demo){ki(`熊熊账本-示例备份-${z}.json`,JSON.stringify({app:`yibi-ledger`,version:1,transactions:Dn()},null,2)),J(`示例账本已导出，刷新后恢复`);return}await vn(),un(),ki(`熊熊账本-完整备份-${z}.json`,JSON.stringify(B,null,2)),J(`包含账单和财务设置的完整备份已导出`)}if(n===`raw-backup`&&ki(`熊熊账本-原始数据-${z}.json`,localStorage.getItem(Bt)||``),n===`template`&&ki(`熊熊账本-通用导入模板.csv`,`﻿日期,收/支,金额,分类,交易对方,支付方式,备注\r
${z},支出,28.00,餐饮,午餐,微信支付,示例行：请替换为你的账单\r\n`,`text/csv;charset=utf-8`),n===`cancel-import`&&(V.importData=null,$()),n===`confirm-import`){if(V.demo)throw Error(`请先退出示例账本`);let e=X(),t=dt(W.user?.email||``)===`yier`?`yier`:`bubu`,n=H.trips?.length?H.activeTripId||H.trips[0].id:``,r=V.importData.candidates.filter(e=>e.selected&&!e.error&&!e.needsType&&e.duplicate!==`exact`),i=[...un()],a=0;for(let o of r){if(je(o.record,i)===`exact`)continue;let r=e?{...o.record,accountBalanceApplied:!1,accountId:``,fromAccountId:``,toAccountId:``,fromAccountName:``,toAccountName:``,payer:o.record.payer||t,tripId:o.record.tripId||n,id:crypto.randomUUID(),createdAt:new Date().toISOString()}:{...o.record,id:crypto.randomUUID(),createdAt:new Date().toISOString()};i.push(r),a++}if(!a){J(`没有新增账单，记录可能已经导入`);return}let o=e?[]:V.importData.accountAdditions||[],s=o.length?pn([...H.accounts,...o.filter(e=>!H.accounts.some(t=>t.id===e.id))]):void 0;await ln(i,B.lastChannel,s),V.month=r.map(e=>e.record.date).sort().at(-1).slice(0,7),V.importData=null,Ni(),zn(`transactions`),J(`已导入 ${a} 笔账单${o.length?`，并新建 ${o.length} 个账户`:``}`)}}catch(e){J(e.message)}});function Ni(){V.search=``,V.channel=``,V.category=``,V.type=``,V.limit=40}async function Pi(){if(!(V.demo||!Xt||document.hidden||M.open||N.open||P.open||Vt?.open||Ht?.open||F?.open||I?.open||L?.open||V.importData||W.busy||!W.user)){_e()!==z&&(z=_e(),V.month===Gt&&(V.month=z.slice(0,7)),Gt=z.slice(0,7),$());try{await vn()}catch{}}}window.addEventListener(`online`,Pi),window.addEventListener(`offline`,()=>{W.ready&&(W.status=W.hasLocalChanges()?`queued`:`offline`,$())}),window.addEventListener(`focus`,Pi),document.addEventListener(`visibilitychange`,Pi),M.addEventListener(`cancel`,e=>{tn&&e.preventDefault()}),L?.addEventListener(`cancel`,e=>{Q.exporting?e.preventDefault():Q.dirty&&ur(!0).catch(()=>{})}),setInterval(Pi,6e4);async function Fi(){if(V.demo){sn&&(W.user=sn),W.status=sn?`loading`:`auth`,H=En(),Xt=!0,$();return}if(sn){W.user=sn,W.status=`loading`;try{await Promise.all([W.loadLocal(),dn(sn.id)])}catch{}$()}else W.status=`auth`,$(),dn();try{let e=await it();if(e?.user){(!W.user||W.user.id!==e.user.id)&&(await W.switchUser(e.user),await dn(e.user.id));let t=(e.user.email||e.user.id||``).toLowerCase(),n=null;t.includes(`484784621`)?n=`bubu`:t.includes(`cyrdmn`)&&(n=`yier`),n&&H.profile?.theme!==n&&(H.profile.theme=n,G({profile:{...H.profile,theme:n}}).catch(()=>{}),$());try{await vn()}catch{}}else sn&&(await W.switchUser(null),$())}catch{}}Fi(),`serviceWorker`in navigator&&navigator.serviceWorker.register(`${R}service-worker.js`,{scope:R}).then(e=>{e.update().catch(()=>{}),e.addEventListener(`updatefound`,()=>{let t=e.installing;t&&t.addEventListener(`statechange`,()=>{t.state===`installed`&&navigator.serviceWorker.controller&&window.location.reload()})})}).catch(()=>{});function Ii(e,t){if(!e||!t)return;let n=t.dataset.date,r=t.dataset.val,i=t.dataset.ref,a=t.dataset.mode,o=a===`cumulative`?`累计支出`:`当日支出`,s=a===`cumulative`?`日均推算`:`7日移动平均`,c=e.querySelector(`.trend-touch-bar`);c&&(c.innerHTML=`<div class="touch-bar-active"><strong>${n}</strong><span>${o}：<b>¥${r}</b></span>${i&&i!==`0.00`?`<small>${s}：¥${i}</small>`:``}</div>`);let l=e.querySelector(`.trend-tooltip`),u=e.querySelector(`svg`);if(l&&u){l.innerHTML=`<div class="tooltip-header">${n}</div><div class="tooltip-row"><i class="tooltip-dot"></i><span>${o}：<strong>¥${r}</strong></span></div>${i&&i!==`0.00`?`<div class="tooltip-row ref-row"><span>${s}：¥${i}</span></div>`:``}`;let a=u.createSVGPoint();a.x=Number(t.dataset.cx),a.y=Number(t.dataset.cy);let c=a.matrixTransform(u.getScreenCTM()),d=e.getBoundingClientRect(),f=c.x-d.left,p=c.y-d.top;l.style.left=`${Math.round(f)}px`,l.style.top=`${Math.round(p)}px`,l.classList.add(`visible`)}e.querySelectorAll(`.chart-point-hit`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`)}function Li(e){if(!e)return;let t=e.querySelector(`.trend-tooltip`);t&&t.classList.remove(`visible`),e.querySelectorAll(`.chart-point-hit`).forEach(e=>e.classList.remove(`active`))}document.addEventListener(`mouseover`,e=>{let t=e.target.closest(`.chart-point-hit`);if(!t)return;let n=t.closest(`.trend-chart`);n&&Ii(n,t)}),document.addEventListener(`mouseout`,e=>{let t=e.target.closest(`.chart-point-hit`);if(!t)return;let n=t.closest(`.trend-chart`);n&&Li(n)});function Ri(e){let t=e.touches?.[0]||e.changedTouches?.[0];if(!t)return;let n=e.target.closest(`.trend-chart`);if(!n)return;let r=n.querySelector(`svg`);if(!r)return;let i=Array.from(n.querySelectorAll(`.chart-point-hit`));if(!i.length)return;let a=r.getScreenCTM();if(!a)return;let o=null,s=1/0;i.forEach(e=>{let n=r.createSVGPoint();n.x=Number(e.dataset.cx),n.y=Number(e.dataset.cy);let i=n.matrixTransform(a),c=Math.abs(i.x-t.clientX);c<s&&(s=c,o=e)}),o&&Ii(n,o)}document.addEventListener(`touchstart`,e=>{e.target.closest(`.trend-chart svg`)&&Ri(e)},{passive:!0}),document.addEventListener(`touchmove`,e=>{e.target.closest(`.trend-chart svg`)&&Ri(e)},{passive:!0});var zi=0;window.addEventListener(`popstate`,e=>{zi=Date.now(),Rn=!0;try{let t=e.state;t&&t.page?(V.page=t.page,V.category=t.category||``,V.channel=t.channel||``,V.search=t.search||``,V.type=t.type||``,t.month&&(V.month=t.month)):(V.page=`analysis`,Ni()),V.limit=40,$(),window.scrollTo({top:0,behavior:`instant`})}finally{Rn=!1}});try{history.state||history.replaceState(Ln(),``,window.location.href)}catch{}var Bi=0,Vi=0,Hi=0;document.addEventListener(`touchstart`,e=>{if(e.touches.length!==1)return;let t=e.touches[0];Bi=t.clientX,Vi=t.clientY,Hi=Date.now()},{passive:!0}),document.addEventListener(`touchend`,e=>{if(!Bi)return;let t=e.changedTouches?.[0];if(!t)return;let n=t.clientX-Bi,r=t.clientY-Vi,i=Date.now()-Hi,a=Bi;if(Bi=0,Vi=0,!(M?.open||N?.open||P?.open||Vt?.open||Ht?.open||F?.open||I?.open||L?.open)&&!e.target.closest(`.trend-chart, [data-trend-chart]`)&&!(a<24)&&a<=Math.min(window.innerWidth*.45,180)&&n>=50&&n>Math.abs(r)*1.3&&i<500){let e=Date.now();if(e-zi<500)return;zi=e,(V.page!==`analysis`||V.category||V.channel||V.search||V.type)&&(window.history.length>1?window.history.back():(Ni(),zn(`analysis`)))}},{passive:!0});