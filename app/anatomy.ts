import type{Lang} from './i18n';
export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;nameZh:string;color:string;description:string;descriptionZh:string}[] = [
 {id:'skeletal',name:'Skeleton',nameZh:'骨骼',color:'#e2d9ba',description:'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.',descriptionZh:'骨构成人体的支撑框架，保护内脏并为肌肉提供附着点。骨组织内部还储存矿物质并制造血细胞。'},
 {id:'muscular',name:'Muscles',nameZh:'肌肉',color:'#a85b50',description:'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.',descriptionZh:'骨骼肌通过牵拉附着点产生运动。它与肌腱一起活动关节、稳定姿势并产生热量。'},
 {id:'cardiac',name:'Heart',nameZh:'心脏',color:'#b96760',description:'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.',descriptionZh:'心脏是具有四个腔室的肌性泵。其瓣膜引导血液在肺循环和体循环中向前流动。'},
 {id:'sensory',name:'Sensory organs',nameZh:'感觉器官',color:'#b0c8ce',description:'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.',descriptionZh:'这些结构构成视觉、听觉和平衡等特殊感觉。其特化组织感受刺激，并与神经系统协作传递信息。'},
 {id:'arterial',name:'Arteries',nameZh:'动脉',color:'#c05245',description:'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.',descriptionZh:'心脏推动血液进行循环。动脉将血液从心脏输送至全身组织，或经肺循环送入肺部。'},
 {id:'venous',name:'Veins',nameZh:'静脉',color:'#527c9f',description:'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.',descriptionZh:'静脉将血液送回心脏。浅静脉与深静脉网络收集组织中的血液；肺静脉则把含氧血液从肺部带回。'},
 {id:'nervous',name:'Nervous system',nameZh:'神经系统',color:'#d8b565',description:'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.',descriptionZh:'脑、脊髓和周围神经传递并处理信号，支持感觉、运动、协调以及身体功能的自动调节。'},
 {id:'respiratory',name:'Respiratory',nameZh:'呼吸系统',color:'#b98991',description:'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.',descriptionZh:'呼吸道将空气导入肺部，氧气和二氧化碳在空气与血液之间进行交换。呼吸依赖于呼吸肌产生的压力变化。'},
 {id:'digestive',name:'Digestive',nameZh:'消化系统',color:'#b8916b',description:'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.',descriptionZh:'消化道分解食物、吸收营养和水分，并推进食物残渣。消化腺分泌胆汁和消化酶辅助消化。'},
 {id:'urinary',name:'Urinary',nameZh:'泌尿系统',color:'#b47961',description:'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.',descriptionZh:'肾过滤血液，调节体液、电解质和酸碱平衡。尿液经输尿管到达膀胱，再由尿道排出。'},
 {id:'lymphatic',name:'Lymphatic',nameZh:'淋巴系统',color:'#879f7c',description:'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.',descriptionZh:'淋巴管将多余的组织液送回循环系统。淋巴结和其他淋巴器官支持免疫监视与免疫应答。'},
 {id:'endocrine',name:'Endocrine',nameZh:'内分泌系统',color:'#c5a09a',description:'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.',descriptionZh:'内分泌器官向血液释放激素，协调新陈代谢、生长发育、应激反应和生殖等生理过程。'},
 {id:'reproductive',name:'Reproductive',nameZh:'生殖系统',color:'#bda098',description:'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.',descriptionZh:'此处所示的男性生殖结构参与精子的产生、成熟与运输，以及性激素的分泌。'},
 {id:'integumentary',name:'Body surface',nameZh:'体表',color:'#ba9b7d',description:'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.',descriptionZh:'体表提供外部的解剖参照。皮肤系统构成保护屏障，并参与感觉与体温调节。'},
 {id:'connective',name:'Connective tissue',nameZh:'结缔组织',color:'#aec3bb',description:'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.',descriptionZh:'软骨、韧带等结缔组织支撑、连接并分隔各结构，并有稳定关节、分散机械负荷的作用。'},
];
export function systemLabel(s:{name:string;nameZh?:string},lang:Lang){return lang==='zh'&&s.nameZh?s.nameZh:s.name}
export function systemDescription(s:{description:string;descriptionZh?:string},lang:Lang){return lang==='zh'&&s.descriptionZh?s.descriptionZh:s.description}
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
 'liver':'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
 'brain':'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
 'stomach':'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
 'spleen':'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
 'pancreas':'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
 'urinary bladder':'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
 'trachea':'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
 'diaphragm':'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
};
const EXPLANATIONS_ZH:Record<string,string> = {
 'heart':'位于胸部的肌性泵。右心将血液送往肺部；左心将血液泵入体循环。',
 'liver':'位于膈右侧下方的大器官。它加工吸收的营养物质、制造胆汁，并合成多种血液蛋白。',
 'brain':'神经系统的中枢器官。其相互连接的区域支持感知、运动、记忆、语言和身体功能的调节。',
 'stomach':'位于食管和小肠之间的肌性器官。它储存食物并与胃酸、酶混合，再逐步排入十二指肠。',
 'spleen':'位于左上腹的淋巴器官。它过滤血液、清除衰老血细胞，并参与免疫应答。',
 'pancreas':'兼具消化与内分泌功能的腹部器官。它向小肠提供消化酶，并分泌胰岛素、胰高血糖素等激素。',
 'urinary bladder':'位于盆腔的肌性储尿器官，储存经输尿管从肾脏送来的尿液。',
 'trachea':'连接喉与支气管的主要气道。其软骨支架在呼吸时保持气道通畅。',
 'diaphragm':'分隔胸腔与腹腔的阔肌。收缩时增大胸腔容积，帮助空气吸入肺部。',
};
export function hasNamedExplanation(name:string){const key=name.toLowerCase();return !!EXPLANATIONS[key]||!!EXPLANATIONS_ZH[key];}
export function explanation(name:string,system:SystemId,lang:Lang='en'){
 const key=name.toLowerCase();
 if(lang==='zh'){const zh=EXPLANATIONS_ZH[key];if(zh)return zh;}
 return EXPLANATIONS[key] ?? systemDescription(SYSTEMS.find(s=>s.id===system)??{description:'',descriptionZh:''},lang);
}
