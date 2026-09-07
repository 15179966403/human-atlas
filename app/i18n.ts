import {useSyncExternalStore} from 'react';
import {ZH_BY_ID} from './structure-zh';
export type Lang='en'|'zh';
const STORAGE_KEY='atlas-lang';
let lang:Lang='en';
const listeners=new Set<()=>void>();
function apply(next:Lang){
 lang=next;
 if(typeof document!=='undefined'){
  document.documentElement.lang=next==='zh'?'zh-CN':'en';
  document.title=next==='zh'?'人体图谱 · 交互式三维解剖':'Human Atlas';
 }
}
export function getLang(){return lang}
export function setLang(next:Lang){
 apply(next);
 try{localStorage.setItem(STORAGE_KEY,next);}catch{/* storage may be unavailable */}
 listeners.forEach(fn=>fn());
}
if(typeof window!=='undefined'){
 let saved:unknown=null;
 try{saved=localStorage.getItem(STORAGE_KEY);}catch{/* storage may be unavailable */}
 if(saved==='zh'||saved==='en')apply(saved);
 else if(typeof navigator!=='undefined'&&navigator.language?.toLowerCase().startsWith('zh'))apply('zh');
}
const subscribe=(notify:()=>void)=>{listeners.add(notify);return()=>{listeners.delete(notify)}};
export function useLang(){return useSyncExternalStore(subscribe,getLang,getLang)}
/** Translate a source English string; unknown strings fall back to English. */
export function t(text:string,lang:Lang=getLang()){return lang==='zh'?ZH[text]??text:text}
/** Translate a template string, replacing {name} placeholders with values. */
export function tf(text:string,vars:Record<string,string|number>,lang:Lang=getLang()){
 const translated=t(text,lang);
 return translated.replace(/\{(\w+)\}/g,(m,key)=>vars[key]!==undefined?String(vars[key]):m);
}
/** Display label for a structure: FMA-id translation first, then name alias, then English. */
export function label(name:string,lang:Lang=getLang(),id?:string){
 if(lang!=='zh')return name;
 if(id){const byId=ZH_BY_ID[id.toUpperCase()];if(byId)return byId;}
 return ZH_NAMES[name.toLowerCase()]??name;
}
/** Chinese translation for a structure (id map first, then curated alias), or undefined. */
export function zhTerm(name:string,id?:string){
 if(id){const byId=ZH_BY_ID[id.toUpperCase()];if(byId)return byId;}
 return ZH_NAMES[name.toLowerCase()];
}
const ZH:Record<string,string>={
 // Header, search and panels
 'INTERACTIVE ANATOMY':'交互式人体解剖',
 'Human Atlas':'人体图谱',
 '{n} modeled pieces':'{n} 个建模结构',
 'Find a structure':'查找结构',
 'Search anatomy':'搜索解剖结构',
 'About this atlas':'关于本图谱',
 'Explorer panels':'浏览面板',
 'Systems':'系统',
 'Close systems':'关闭系统面板',
 'Anatomical layers':'解剖图层',
 'All':'全部',
 'Skeleton':'骨骼',
 'Organs':'内脏',
 'Show only {name}':'仅显示{name}',
 'Show {name}':'显示{name}',
 '{n} pieces visible':'{n} 个结构可见',
 'Hide all':'全部隐藏',
 'Find anatomy':'查找解剖结构',
 'Close search':'关闭搜索',
 'Heart, femur, cranial nerve…':'如：心脏、股骨、脑神经…',
 'Search named anatomical structures':'搜索已命名的解剖结构',
 'No structures match your search.':'没有符合搜索的解剖结构。',
 '1 piece':'1 个结构',
 '{n} pieces':'{n} 个结构',
 'Showing up to 80 matches. Refine your search to find smaller structures.':'最多显示 80 条结果。优化搜索词可找到更小的结构。',
 'Start with a major organ, or search every named structure.':'从主要器官开始，或搜索所有已命名的结构。',
 // View controls and scene captions
 'Camera controls':'视角控制',
 'three-quarter view':'斜角视图',
 'front view':'正面视图',
 'side view':'侧面视图',
 'back view':'背面视图',
 'Pause rotation':'暂停旋转',
 'Rotate body':'旋转人体',
 'Auto rotate':'自动旋转',
 'Reset view and layers':'重置视角与图层',
 'Reset':'重置',
 'SELECTED STRUCTURE':'已选结构',
 'ANATOMICAL INVENTORY':'解剖结构清单',
 'SEPARATED STRUCTURES':'结构分层展示',
 'ADULT HUMAN · MALE':'成年人体 · 男性',
 // Bottom dock and footer
 'Open system layers':'打开系统图层面板',
 'Explode anatomy':'展开解剖结构',
 'Assembled':'组合状态',
 'Every piece':'全部结构',
 'Assemble and reset':'组合并重置',
 'Drag to orbit':'拖拽旋转视角',
 'Drag to pan':'拖拽平移',
 'Pinch to zoom':'捏合缩放',
 'Tap to inspect':'点按查看结构',
 'Source & credits':'来源与致谢',
 // Loading and errors
 'Preparing the anatomy':'正在准备解剖数据',
 'Loading {n} pieces':'正在加载 {n} 个结构',
 'The anatomy catalogue could not be loaded.':'无法加载解剖目录。',
 'Reload viewer':'重新加载',
 // Detail sheet
 'ANATOMY':'解剖系统',
 'System overview · structure identified from source anatomy':'系统概述 · 结构名称来自源解剖数据',
 'Atlas reference':'图谱编号',
 'Selected pieces':'已选结构',
 'Included structures':'包含的结构',
 'And {n} more modeled pieces.':'还有 {n} 个建模结构。',
 'View anatomical source':'查看解剖数据来源',
 'Show surrounding anatomy':'显示周围结构',
 'Isolate structure':'隔离该结构',
 'Clear selection':'清除选择',
 // About sheet
 'SOURCE & SCOPE':'来源与范围',
 'A body, revealed.':'逐层揭示人体。',
 'Explore the adult male reference anatomy from BodyParts3D.':'探索 BodyParts3D 的成年男性参考解剖数据。',
 'Male · BodyParts3D':'男性 · BodyParts3D',
 '2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.':'来自成年男性参考解剖的 2,234 个独立网格与 3,432 个命名概念。',
 'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.':'本参考数据不包含人体的所有结构与个体变异。一个命名概念可包含多个网格；每个源网格仅渲染一次。',
 'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.':'配色与系统分组仅为便于探索而设计。几何体已为网页性能简化，简短说明仅提供一般性教育背景。本图谱是解剖学参考资料，不能用于诊断或手术。',
 'Source':'数据来源',
 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.':'BodyParts3D，© 生命科学数据库中心，依 CC 署名 4.0 国际许可协议授权。',
 'Dataset license':'数据集许可',
 'Original geometry & metadata':'原始几何与元数据',
 'Read the source publication':'阅读来源文献',
 // 3D scene
 'Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.':'交互式三维人体解剖。拖拽旋转视角，捏合或滚轮缩放，点按结构查看详情。',
 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.':'当前浏览器无法启动三维视图，请改用支持 WebGL 的浏览器。',
 'Could not assemble anatomy geometry.':'无法组装解剖几何数据。',
 'Could not load the anatomy.':'无法加载解剖数据。',
 'An anatomy file could not be loaded.':'无法加载解剖数据文件。',
 'An anatomy file was incomplete. Please reload the viewer.':'解剖数据不完整，请重新加载。',
 'The 3D session was paused by your device. Reload to continue.':'三维会话已被设备暂停，请重新加载以继续。',
};
/** Curated Chinese aliases for frequently seen anatomical structures.
 * Names without an alias keep their English label from the BodyParts3D source. */
const ZH_NAMES:Record<string,string>={
 // Organs and viscera
 'heart':'心脏','brain':'大脑','liver':'肝脏','stomach':'胃','spleen':'脾','pancreas':'胰腺','urinary bladder':'膀胱','trachea':'气管','diaphragm':'膈',
 'lung':'肺','left lung':'左肺','right lung':'右肺','kidney':'肾','left kidney':'左肾','right kidney':'右肾','esophagus':'食管','small intestine':'小肠','large intestine':'大肠',
 'colon':'结肠','rectum':'直肠','appendix':'阑尾','gallbladder':'胆囊','larynx':'喉','pharynx':'咽','thyroid gland':'甲状腺','parathyroid gland':'甲状旁腺',
 'duodenum':'十二指肠','jejunum':'空肠','ileum':'回肠','cecum':'盲肠','sigmoid colon':'乙状结肠','ileocecal valve':'回盲瓣','bronchus':'支气管','main bronchus':'主支气管',
 'left bronchus':'左支气管','right bronchus':'右支气管','salivary gland':'唾液腺','parotid gland':'腮腺','submandibular gland':'下颌下腺','tongue':'舌','lips':'唇',
 'hard palate':'硬腭','soft palate':'软腭','gingiva':'牙龈','tooth':'牙','teeth':'牙',
 // Nervous system
 'spinal cord':'脊髓','cerebrum':'大脑','cerebellum':'小脑','brain stem':'脑干','hypothalamus':'下丘脑','pituitary gland':'垂体','sciatic nerve':'坐骨神经',
 'vagus nerve':'迷走神经','optic nerve':'视神经','olfactory nerve':'嗅神经','facial nerve':'面神经','median nerve':'正中神经','radial nerve':'桡神经','ulnar nerve':'尺神经',
 // Sensory organs
 'eye':'眼','eyeball':'眼球','ear':'耳','external ear':'外耳','auricle':'耳廓','nose':'鼻',
 // Skeletal system
 'femur':'股骨','tibia':'胫骨','fibula':'腓骨','patella':'髌骨','humerus':'肱骨','radius':'桡骨','ulna':'尺骨','skull':'颅','mandible':'下颌骨','rib':'肋骨','sternum':'胸骨',
 'pelvis':'骨盆','hip bone':'髋骨','scapula':'肩胛骨','clavicle':'锁骨','vertebral column':'脊柱','spine':'脊柱','vertebra':'椎骨','sacrum':'骶骨','cartilage':'软骨',
 // Cardiovascular
 'aorta':'主动脉','ascending aorta':'升主动脉','arch of aorta':'主动脉弓','descending aorta':'降主动脉','pulmonary artery':'肺动脉','pulmonary trunk':'肺动脉干',
 'superior vena cava':'上腔静脉','inferior vena cava':'下腔静脉','carotid artery':'颈动脉','femoral artery':'股动脉','coronary artery':'冠状动脉',
 // Urogenital
 'ureter':'输尿管','urethra':'尿道','prostate':'前列腺','testis':'睾丸','penis':'阴茎','epididymis':'附睾','vas deferens':'输精管','seminal vesicle':'精囊',
 // Endocrine / lymphatic
 'adrenal gland':'肾上腺','thymus':'胸腺','lymph node':'淋巴结','tonsil':'扁桃体',
 // Muscles and soft tissue
 'muscle':'肌肉','biceps brachii':'肱二头肌','triceps brachii':'肱三头肌','deltoid':'三角肌','pectoralis major':'胸大肌','gluteus maximus':'臀大肌',
 'rectus abdominis':'腹直肌','gastrocnemius':'腓肠肌','soleus':'比目鱼肌','quadriceps femoris':'股四头肌','biceps femoris':'股二头肌','latissimus dorsi':'背阔肌',
 'trapezius':'斜方肌','sartorius':'缝匠肌','temporalis':'颞肌','masseter':'咬肌','sternocleidomastoid':'胸锁乳突肌','achilles tendon':'跟腱',
 'tendon':'肌腱','ligament':'韧带','skin':'皮肤','scalp':'头皮',
 // Body regions
 'head':'头部','neck':'颈部','chest':'胸部','thorax':'胸廓','abdomen':'腹部','shoulder':'肩','elbow':'肘','wrist':'腕','knee':'膝','hip':'髋','ankle':'踝','hand':'手','foot':'足',
};
