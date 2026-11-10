        // =============================================================
        // 第一部分：紫微斗数核心数据
        // =============================================================
        const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        const PALACE_ORDER = ['命宫', '父母', '福德', '田宅', '事业', '交友', '迁移', '疾厄', '财帛', '子女', '夫妻', '兄弟'];
        const GRID_LAYOUT = [
            ['巳', '午', '未', '申'],
            ['辰', '●', '●', '酉'],
            ['卯', '●', '●', '戌'],
            ['寅', '丑', '子', '亥']
        ];

        // 星曜星系与五行
        const STAR_GALAXY = {
            '紫微': { galaxy: '北斗', element: '阴土' },
            '武曲': { galaxy: '北斗', element: '阴金' },
            '廉贞': { galaxy: '北斗', element: '阴火' },
            '贪狼': { galaxy: '北斗', element: '阳木' },
            '巨门': { galaxy: '北斗', element: '阴水' },
            '破军': { galaxy: '北斗', element: '阴金' },
            '天府': { galaxy: '南斗', element: '阳土' },
            '天机': { galaxy: '南斗', element: '阴木' },
            '天同': { galaxy: '南斗', element: '阳水' },
            '天相': { galaxy: '南斗', element: '阳水' },
            '天梁': { galaxy: '南斗', element: '阳土' },
            '七杀': { galaxy: '南斗', element: '阴金' },
            '太阳': { galaxy: '中天', element: '阳火' },
            '太阴': { galaxy: '中天', element: '阴水' },
            '左辅': { galaxy: '辅佐', element: '阳土', category: '月系' },
            '右弼': { galaxy: '辅佐', element: '阴水', category: '月系' },
            '天魁': { galaxy: '辅佐', element: '阳火', category: '年干' },
            '天钺': { galaxy: '辅佐', element: '阴火', category: '年干' },
            '文昌': { galaxy: '辅佐', element: '阳金', category: '时系' },
            '文曲': { galaxy: '辅佐', element: '阴水', category: '时系' },
            '擎羊': { galaxy: '辅佐', element: '阳金', category: '年干' },
            '陀罗': { galaxy: '辅佐', element: '阴金', category: '年干' },
            '火星': { galaxy: '辅佐', element: '阳火', category: '年支' },
            '铃星': { galaxy: '辅佐', element: '阴火', category: '年支' },
            '地空': { galaxy: '辅佐', element: '阳火', category: '时系' },
            '地劫': { galaxy: '辅佐', element: '阴火', category: '时系' },
            '禄存': { galaxy: '辅佐', element: '阳土', category: '年干' },
            '天马': { galaxy: '辅佐', element: '阳火', category: '年支' }
        };

        const STAR_SIHUA_QUALIFICATIONS = {
            '紫微': { quan: true, ke: true },
            '天机': { lu: true, quan: true, ke: true, ji: true },
            '太阳': { lu: true, quan: true, ke: true, ji: true },
            '武曲': { lu: true, quan: true, ke: true, ji: true },
            '天同': { lu: true, quan: true, ke: true, ji: true },
            '廉贞': { lu: true, quan: true, ke: true, ji: true },
            '天府': {},
            '太阴': { lu: true, quan: true, ke: true, ji: true },
            '贪狼': { lu: true, quan: true, ke: true, ji: true },
            '巨门': { lu: true, quan: true, ke: true, ji: true },
            '天相': { lu: true, quan: true, ke: true },
            '天梁': { lu: true, quan: true, ke: true },
            '七杀': {},
            '破军': { lu: true, quan: true, ke: true },
            '左辅': { ke: true },
            '右弼': { ke: true },
            '天魁': {},
            '天钺': {},
            '文昌': { ke: true, ji: true },
            '文曲': { ke: true, ji: true },
            '擎羊': {},
            '陀罗': {},
            '火星': {},
            '铃星': {},
            '地空': {},
            '地劫': {},
            '禄存': {},
            '天马': {}
        };

        const SIHUA_MEANINGS = {
            '紫微': { quan: "化权：威权更盛 · 独揽大权 · 号令四方", ke: "化科：名望显赫 · 文人雅士 · 领袖风范" },
            '天机': { lu: "化禄：智谋生财 · 机会不断 · 以巧取胜", quan: "化权：权谋在握 · 决策精准 · 运筹帷幄",
                ke: "化科：智慧扬名 · 术数成名 · 谋略家声", ji: "化忌：思虑过度 · 错失良机 · 聪明反误" },
            '太阳': { lu: "化禄：光明得财 · 名声显达 · 光彩照人", quan: "化权：权位显赫 · 炙手可热 · 如日中天",
                ke: "化科：文采斐然 · 声誉远播 · 光照四方", ji: "化忌：光芒黯淡 · 声名受损 · 热情耗竭" },
            '武曲': { lu: "化禄：财源滚滚 · 实业兴旺 · 金玉满堂", quan: "化权：权柄在手 · 杀伐决断 · 威震四方",
                ke: "化科：以商成名 · 技术扬名 · 刚正之誉", ji: "化忌：财务困顿 · 孤克加重 · 刚愎自用" },
            '天同': { lu: "化禄：福禄双全 · 享受人生 · 衣食丰足", quan: "化权：慵懒变勤 · 担起重任 · 以柔克刚",
                ke: "化科：名士风流 · 文艺出众 · 雅量高致", ji: "化忌：福气消散 · 劳碌奔波 · 天真招损" },
            '廉贞': { lu: "化禄：激情生财 · 人脉变现 · 烈火铸金", quan: "化权：铁腕手段 · 权倾一方 · 令行禁止",
                ke: "化科：原则成名 · 清誉远播 · 廉洁之声", ji: "化忌：情劫难逃 · 官非缠身 · 烈火焚身" },
            '天府': {},
            '太阴': { lu: "化禄：暗财涌动 · 不动产利 · 温柔生财", quan: "化权：内敛变强 · 幕后掌权 · 以柔制刚",
                ke: "化科：阴柔之美 · 文艺成名 · 月光皎洁", ji: "化忌：情绪决堤 · 财务暗耗 · 阴云蔽月" },
            '贪狼': { lu: "化禄：人脉生财 · 桃花带利 · 社交致富", quan: "化权：欲望成权 · 掌控全局 · 狼性领导",
                ke: "化科：才艺扬名 · 魅力成名 · 风流雅士", ji: "化忌：欲望失控 · 桃花劫难 · 贪得无厌" },
            '巨门': { lu: "化禄：口舌生财 · 演说获利 · 以言致富", quan: "化权：一言九鼎 · 以理服人 · 舌战群儒",
                ke: "化科：辩才无碍 · 学术成名 · 博学之声", ji: "化忌：口舌是非 · 官司缠身 · 祸从口出" },
            '天相': { lu: "化禄：文书得财 · 合约生利 · 以印致富", quan: "化权：辅佐掌权 · 成为核心 · 调和鼎鼐",
                ke: "化科：公正成名 · 信誉卓著 · 宰相之誉" },
            '天梁': { lu: "化禄：荫庇生财 · 长辈赐福 · 祖德流芳", quan: "化权：仲裁掌权 · 司法权威 · 定分止争",
                ke: "化科：清高扬名 · 学术声誉 · 道德文章" },
            '七杀': {},
            '破军': { lu: "化禄：革新得财 · 变动生利 · 破旧立新", quan: "化权：破旧立新 · 权柄在握 · 开疆拓土",
                ke: "化科：改革成名 · 先锋声誉 · 开创之誉" },
            '左辅': { ke: "化科：调和成名 · 声誉日隆 · 伯乐之誉" },
            '右弼': { ke: "化科：隐忍成名 · 化解得誉 · 忠勇之誉" },
            '天魁': {},
            '天钺': {},
            '文昌': { ke: "化科：文名远播 · 金榜题名 · 文章千古", ji: "化忌：文曲蒙尘 · 声名受损 · 文章惹祸" },
            '文曲': { ke: "化科：才艺扬名 · 风雅成名 · 艺术大家", ji: "化忌：才艺受阻 · 桃花破财 · 弦断声哑" },
            '擎羊': {},
            '陀罗': {},
            '火星': {},
            '铃星': {},
            '地空': {},
            '地劫': {},
            '禄存': {},
            '天马': {}
        };

        const STAR_ORIGINAL_MEANINGS = {
            '紫微': '帝王 · 北极星 · 万星之主', '天机': '木之纹理 · 机枢 · 机关', '太阳': '太阳 · 光明 · 炙热',
            '武曲': '刀剑 · 金属 · 财富', '天同': '和风 · 浮云 · 孩童', '廉贞': '烈火 · 廉洁之印',
            '天府': '府库 · 财库 · 大地', '太阴': '月亮 · 夜晚的湖水', '贪狼': '贪婪的狼 · 欲望之口',
            '巨门': '巨大的门 · 分隔内外的关口', '天相': '宰相印信 · 文书 · 印章', '天梁': '古老梁柱 · 庙宇',
            '七杀': '战场先锋 · 将旗 · 刀刃', '破军': '先锋将军 · 破阵战车', '左辅': '辅助之车 · 副手 · 辇',
            '右弼': '护卫 · 守护之盾', '天魁': '魁星 · 文曲之首', '天钺': '天钺星 · 权柄之钺',
            '文昌': '文昌 · 文曲之笔', '文曲': '文曲 · 音律之弦', '擎羊': '擎羊 · 出鞘之刃',
            '陀罗': '陀罗 · 旋转之轮', '火星': '火星 · 爆裂之火', '铃星': '铃星 · 暗铃之声',
            '地空': '地空 · 虚空之洞', '地劫': '地劫 · 劫夺之风', '禄存': '禄存 · 财库之珠 · 福星',
            '天马': '天马 · 奔驰之驹 · 驿马'
        };

        // =============================================================
        // 星曜 · 天地映射表（宇宙观 → 地球观 → 抽象心性）
        // =============================================================
        const STAR_COSMIC_MAP = {
            '紫微': {
                cosmic: '奇点 / 恒星核心 · 以巨大质量扭曲时空，吸引众星环绕',
                earth: '地核 / 大陆板块 · 地球最炙热的固态内核，自身不动却统御全局',
                abstract: '「自我之主宰」· 存在的本身就是权威，代表自尊、领导力与人生中心'
            },
            '天机': {
                cosmic: '量子涨落 / 神经电信号 · 真空中不断生灭的虚粒子，是最原初的"变易"之源',
                earth: '神经网络 / 含羞草 · 人体内传递信号的网络，对触碰极度敏感的精密系统',
                abstract: '「谋略与机变」· 智慧的火花，代表思虑、算计、机动性与精神上的紧张'
            },
            '太阳': {
                cosmic: '恒星核聚变 / 辐射源 · 以光和热无偿辐射整个星系，是能量的源头',
                earth: '天空中的火球 · 万物生长的第一推动力，带来日夜与四季',
                abstract: '「博爱与光明」· 无私的给予者，代表父亲、权贵、名声与传播力'
            },
            '武曲': {
                cosmic: '重力波 / 金刚石 · 时空本身的刚性结构，是宇宙间最"硬"的法则',
                earth: '钻石 / 金条 · 地球上最硬的物质，或衡量一切价值的贵金属',
                abstract: '「刚毅与务实」· 价值的执行者，代表财富、行动力、毅力与孤独'
            },
            '天同': {
                cosmic: '超流体 / 弱核力 · 接近绝对零度时零阻力的完美流体，代表着无抵抗的圆融',
                earth: '温泉 / 山间溪流 · 至柔至顺，滋养万物而不争，顺势而行',
                abstract: '「福气与融合」· 情绪的零阻力状态，代表温顺、享乐、儿童心性与随缘'
            },
            '廉贞': {
                cosmic: 'X射线 / 高压电弧 · 穿透力极强、带有"囚禁"性质的高能电磁辐射',
                earth: '火山熔岩 / 闪电 · 地球内部被囚禁的怒火，一旦释放可带来文明或毁灭',
                abstract: '「禁忌与灼烧」· 律法与情欲的化身，代表权术、囚笼、血光与偏执的爱'
            },
            '天府': {
                cosmic: '黑洞 / 稳定轨道 · 以强大的引力场牢牢锁住周围物质，形成稳定的行星环',
                earth: '青藏高原 / 巨大山脉 · 厚重、稳固、蕴藏丰富矿藏的天然仓库',
                abstract: '「包容与聚藏」· 天然的财库与福地，代表安全感、稳定与享福'
            },
            '太阴': {
                cosmic: '反射卫星 / 潮汐引力 · 自身不发光，却牵动着整个海洋的周期性涨落',
                earth: '月球与江河潮汐 · 围绕地球旋转，用引力牵引着地表水体的涌动与回旋',
                abstract: '「潜意识的暗流」· 情感的盈缺，代表母亲、记忆、内在的富足与忧愁'
            },
            '贪狼': {
                cosmic: '暗能量 / 星系旋臂 · 推动宇宙加速膨胀的未知力量，让星系不断向外扩张',
                earth: '原始森林 / 藤蔓植物 · 不顾一切向上生长、向外攀附的生命原力',
                abstract: '「原始的欲望」· 创造与毁灭的双刃剑，代表桃花、交际与深层渴望'
            },
            '巨门': {
                cosmic: '声波衍射 / 光栅干涉 · 既是信息的传播介质，也是造成"遮蔽"的屏障',
                earth: '黄河大坝 / 深井 · 巨大的"口"，既能蓄积奔涌之水，又能密闭深藏',
                abstract: '「是非与隐秘」· 通道的守护者，代表口舌、暗昧、疑惑与爆发'
            },
            '天相': {
                cosmic: '引力透镜 / 精密陀螺仪 · 让光线弯曲走向，维持着宇宙大尺度的"平衡"',
                earth: '都江堰 / 水平仪 · 精密的引水分流工程，确保万物的平衡运作',
                abstract: '「规则与调和」· 印章与契约之神，代表辅佐、公正与和谐的守护者'
            },
            '天梁': {
                cosmic: '催化剂 / 地质年轮 · 不参与反应却能加速"因果"成熟的时间沉淀者',
                earth: '古树 / 庙宇 · 历经沧桑的古老梁柱，承载着历史与庇佑',
                abstract: '「道德与庇佑」· 福荫的见证者，代表清高、司法、医疗与长辈风范'
            },
            '七杀': {
                cosmic: '流星 / 切割磁感线 · 以极速穿越大气的天体，锋利如刀，专司"破局"',
                earth: '利刃 / 科罗拉多大峡谷 · 被河流亿万年来"切割"出的地球疤痕',
                abstract: '「肃杀与开创」· 破而后立的先锋，代表勇气、决断、挑战与刑伤'
            },
            '破军': {
                cosmic: '反物质湮灭 / 冲击波 · 新旧物质相遇时瞬间湮灭、释放巨能的相变节点',
                earth: '海啸 / 泥石流 · 带着毁灭性力量冲垮一切旧有形态的洪流',
                abstract: '「先破后立」· 旧秩序的终结者，代表变动、颠覆、开创与牺牲'
            },
            '左辅': {
                cosmic: '暗物质晕 · 不可见却提供引力，维持星系高速旋转而不解体',
                earth: '坚固的河堤 · 约束河流走向，显性的辅助与支持',
                abstract: '「显性的贵人」· 实实在在的帮手、朋友，增加格局的广度与可持续性'
            },
            '右弼': {
                cosmic: '潮汐锁定 / 轨道共振 · 在背后默默修正行星轨道，是隐形的保护者',
                earth: '地下水层 · 看不见却无声滋润大地的根基',
                abstract: '「隐性的贵人」· 暗中的灵感、直觉或支持，能化解危机于无形'
            },
            '天魁': {
                cosmic: '伽马射线暴 · 瞬间释放照亮整个宇宙的能量，突然而至，无可预料',
                earth: '灯塔 / 烽火台 · 在黑暗中突然为你指明方向的高光',
                abstract: '「突降的贵人」· 阳性的、显性的机遇，如同天降奇兵'
            },
            '天钺': {
                cosmic: '超新星遗迹 · 能量柔和且持久，以星云形式久久照亮四周',
                earth: '萤火虫 / 暗室烛光 · 需要用心发现，却能在暗处给你温暖的微光',
                abstract: '「暗中的提携」· 阴性的、女性或长辈的贵人，贵在时机与契机'
            },
            '文昌': {
                cosmic: '电磁波谱（可见光）· 承载清晰信息的标准媒介，以线性方式传递',
                earth: '石碑刻文 / 书籍 · 将契约与知识凝固于实体之上',
                abstract: '「正统与声誉」· 契约、文凭、正统文化的传承者，主科名'
            },
            '文曲': {
                cosmic: '引力波 / 恒星振荡 · 一种更隐性、更感性的时空涟漪',
                earth: '山谷回声 / 音乐 · 飘忽不定却充满韵律，触动人心',
                abstract: '「才艺与情感」· 艺术、口才、情感的波动，主才艺与异路功名'
            },
            '擎羊': {
                cosmic: '切割磁力线 / 强核力截断 · 宇宙中最锐利的"一刀两断"之力',
                earth: '手术刀 / 开山斧 · 精确、果断、不留情面地切除或劈开',
                abstract: '「明面的决断」· 突发的冲突、血光、尖锐的矛盾，也是快刀斩乱麻的魄力'
            },
            '陀罗': {
                cosmic: '时空拖拽 / 摩擦阻尼 · 大质量天体旋转引起的"黏滞"效应，让人原地打转',
                earth: '石磨 / 漩涡 · 反复碾压、无法迅速脱身的缠斗与循环',
                abstract: '「暗中的拖延」· 慢性疾病、口舌是非、反复纠结，是人生的"磨刀石"'
            },
            '火星': {
                cosmic: '恒星耀斑 / 激波 · 爆发迅猛、能量集中、来得快去得也快的表面事件',
                earth: '森林大火 / 鞭炮 · 炙热猛烈，来去如风，不留余地',
                abstract: '「瞬时的爆发」· 急躁、突发、明火执仗的冲突或机遇，迅速了结'
            },
            '铃星': {
                cosmic: '脉冲星 / 持续辐射 · 虽不大爆发，却以极高的频率持续"敲击"着周围',
                earth: '地热蒸汽 / 慢性炎症 · 持续不断，阴烧暗灼，令人难以安枕',
                abstract: '「持续的煎熬」· 暗中的是非、内心的焦虑、长期的折磨与警惕'
            },
            '地空': {
                cosmic: '真空涨落 / 量子泡沫 · 看似空无一物，却让穿过其中的事物无端消失或变异',
                earth: '沙漠流沙 · 看似平坦，却会吞噬一切计划和成果',
                abstract: '「理想的破灭」· 让你计划落空，从而看破执着，转而追求精神层面'
            },
            '地劫': {
                cosmic: '虫洞 / 空间奇点 · 突然切断你当前的时空路径，强制转向另一条维度',
                earth: '地陷天坑 · 脚下的路突然崩塌，被迫另寻他路',
                abstract: '「路径的中断」· 让你原有路径中断，从而获得"断尾求生"的新生'
            },
            '禄存': {
                cosmic: '行星环 / 吸积盘 · 稳定、有序、不断聚集物质的固态环',
                earth: '谷仓 / 煤矿 · 静态的、可随时提取的储备与存粮',
                abstract: '「稳态的盈余」· 天然的福气与财库，代表安全感、稳定与健康'
            },
            '天马': {
                cosmic: '相对论性喷流 · 从黑洞两极射出的、接近光速的高能粒子流',
                earth: '骏马 / 高铁 / 信风 · 不断位移、承载着能量与信息的载体',
                abstract: '「流动与变迁」· 代表远行、升迁、变动与机遇的活水'
            }
        };

        const STAR_STATIC_MEANINGS = {
            '紫微': ["领导 · 尊贵", "格局 · 气度", "孤高 · 自我", "权威 · 厚重", "核心 · 中心"],
            '天机': ["策划 · 谋略", "变通 · 灵动", "心机 · 算计", "管道 · 媒介", "细微 · 洞察"],
            '太阳': ["光明 · 博爱", "热情 · 慷慨", "父亲 · 男性", "官贵 · 名声", "耗散 · 过火"],
            '武曲': ["刚毅 · 果断", "财富 · 实业", "孤克 · 务实", "执行力 · 坚持", "短虑 · 缺情"],
            '天同': ["随和 · 懒散", "福气 · 享受", "天真 · 单纯", "协调 · 润滑", "依赖 · 被动"],
            '廉贞': ["激情 · 烈性", "权威 · 刑罚", "情感 · 纠葛", "洁癖 · 原则", "突发 · 意外"],
            '天府': ["包容 · 收纳", "财富 · 稳定", "保守 · 守成", "领导 · 雍容", "安享 · 懒散"],
            '太阴': ["温柔 · 内敛", "母性 · 包容", "财务 · 不动产", "暗处 · 隐性", "情绪 · 敏感"],
            '贪狼': ["桃花 · 魅力", "欲望 · 执着", "才艺 · 多元", "交际 · 应酬", "冒险 · 投机"],
            '巨门': ["口舌 · 沟通", "探究 · 挖掘真相", "外地 · 异族", "隔阂 · 秘密", "费劲 · 说服"],
            '天相': ["辅佐 · 协调", "公正 · 稳定", "表面 · 和谐", "文书 · 合约", "随从 · 被动"],
            '天梁': ["庇护 · 荫庇", "长寿 · 清高", "医疗 · 养生", "司法 · 仲裁", "孤高 · 老成"],
            '七杀': ["决断 · 刚猛", "冒险 · 突破", "孤独 · 先驱", "压力 · 挑战", "变革 · 破坏"],
            '破军': ["破旧 · 革新", "变动 · 无常", "冲劲 · 莽撞", "牺牲 · 先驱", "消耗 · 难守"],
            '左辅': ["助力 · 增福", "广结人缘", "包容 · 调和", "延长好运", "稳定 · 帮手"],
            '右弼': ["暗中助力", "化解是非", "贵人 · 庇护", "隐忍 · 迂回", "二次机会"],
            '天魁': ["贵人 · 提携", "名声 · 机遇", "突来好运", "考试 · 文书", "光明 · 引路"],
            '天钺': ["贵人 · 暗助", "权威 · 提拔", "女性贵人", "意外之喜", "幕后助力"],
            '文昌': ["文采 · 才华", "学术 · 文艺", "名誉 · 声名", "契约 · 文书", "斯文 · 优雅"],
            '文曲': ["才艺 · 技艺", "口才 · 辩论", "感情 · 浪漫", "偏财 · 偏门", "桃花 · 魅力"],
            '擎羊': ["冲动 · 锐利", "刀伤 · 意外", "争斗 · 诉讼", "孤克 · 分离", "快速 · 利落"],
            '陀罗': ["拖延 · 纠缠", "慢性病 · 反复", "固执 · 阻碍", "暗耗 · 消磨", "是非不断"],
            '火星': ["爆发 · 急变", "血光 · 火险", "情绪暴躁", "冲动行事", "快速成败"],
            '铃星': ["暗算 · 惊险", "口舌是非", "焦虑不安", "突然打击", "暗中生变"],
            '地空': ["空想 · 虚无", "钱财难守", "理想高远", "落寞孤独", "创意空泛"],
            '地劫': ["破耗 · 损失", "波折不断", "半途而废", "手段偏激", "造化弄人"],
            '禄存': ["财富 · 积累", "福气 · 持久", "稳定 · 守成", "衣食无忧", "贵人加持"],
            '天马': ["奔波 · 远行", "变动 · 机遇", "速度 · 效率", "流动 · 迁居", "海外 · 发展"]
        };

        const PALACE_SCENES = {
            '紫微': { '命宫': '天生领袖气质，格局宏大', '兄弟': '兄弟中有人杰出', '夫妻': '配偶有贵气', '子女': '子女优秀出众', '财帛': '财运丰厚', '疾厄': '体质强健', '迁移': '外出受人敬重', '交友': '交友广阔', '事业': '适合管理职', '田宅': '家业丰厚', '福德': '精神追求高', '父母': '父母有社会地位' },
            '天机': { '命宫': '聪明机敏，善于策划', '兄弟': '兄弟间关系微妙', '夫妻': '配偶聪明灵活', '子女': '子女聪明伶俐', '财帛': '靠智谋生财', '疾厄': '神经敏感', '迁移': '外出多机遇', '交友': '朋友多为智谋型', '事业': '适合策划、咨询', '田宅': '住宅多变动', '福德': '精神世界丰富', '父母': '父母聪明' },
            '太阳': { '命宫': '光明磊落，热情大方', '兄弟': '兄弟关系融洽', '夫妻': '配偶阳光积极', '子女': '子女活泼开朗', '财帛': '靠名声得财', '疾厄': '心脏需注意', '迁移': '外出有利', '交友': '朋友多', '事业': '适合教育、公职', '田宅': '采光好', '福德': '精神开朗', '父母': '父亲影响大' },
            '武曲': { '命宫': '刚毅果断，务实重财', '兄弟': '兄弟关系务实', '夫妻': '缺乏浪漫', '子女': '子女独立性强', '财帛': '财库丰盈', '疾厄': '需防意外伤', '迁移': '靠专业技能获利', '交友': '朋友务实', '事业': '适合金融、技术', '田宅': '房产运稳定', '福德': '精神追求实际', '父母': '父母务实' },
            '天同': { '命宫': '随和乐观，福气深厚', '兄弟': '兄弟和睦', '夫妻': '婚姻和睦', '子女': '子女乖巧', '财帛': '福禄双全', '疾厄': '体质一般', '迁移': '多贵人', '交友': '朋友温和', '事业': '适合文教', '田宅': '环境舒适', '福德': '精神满足', '父母': '父母慈爱' },
            '廉贞': { '命宫': '激情热烈，有原则', '兄弟': '关系复杂', '夫妻': '情感浓烈', '子女': '个性强烈', '财帛': '人际关系生财', '疾厄': '需防心血管', '迁移': '多变', '交友': '性情中人', '事业': '适合军警、法律', '田宅': '环境复杂', '福德': '精神追求高', '父母': '关系复杂' },
            '天府': { '命宫': '稳重包容，有领导风范', '兄弟': '关系稳定', '夫妻': '配偶温和', '子女': '稳重懂事', '财帛': '财库丰盈', '疾厄': '需注意消化', '迁移': '贵人相助', '交友': '朋友稳重', '事业': '适合管理', '田宅': '家产丰厚', '福德': '精神富足', '父母': '宽厚包容' },
            '太阴': { '命宫': '温柔内敛，情感细腻', '兄弟': '女性影响力', '夫妻': '配偶温柔', '子女': '乖巧懂事', '财帛': '不动产投资收益佳', '疾厄': '妇科需注意', '迁移': '适应力强', '交友': '朋友温和', '事业': '适合文艺', '田宅': '环境优雅', '福德': '情绪化', '父母': '母亲影响大' },
            '贪狼': { '命宫': '欲望强烈，多才多艺', '兄弟': '关系复杂', '夫妻': '注重享乐', '子女': '活泼好动', '财帛': '人脉生财', '疾厄': '需防肝病', '迁移': '多应酬', '交友': '朋友遍天下', '事业': '适合娱乐、公关', '田宅': '位于繁华地段', '福德': '物欲过度', '父母': '关系复杂' },
            '巨门': { '命宫': '口才犀利，善辩', '兄弟': '多口舌', '夫妻': '多沟通', '子女': '表达好', '财帛': '靠口才获利', '疾厄': '需防咽喉', '迁移': '靠口才发展', '交友': '朋友能言善辩', '事业': '适合法律、教育', '田宅': '隔音需注意', '福德': '思考为主', '父母': '善辩' },
            '天相': { '命宫': '稳重公正，协调', '兄弟': '和睦', '夫妻': '配偶温和', '子女': '听话懂事', '财帛': '靠合约得财', '疾厄': '注意慢性病', '迁移': '贵人相助', '交友': '朋友稳重', '事业': '适合行政、文职', '田宅': '稳定', '福德': '平衡和谐', '父母': '温和' },
            '天梁': { '命宫': '清高正直，长辈风范', '兄弟': '受照拂', '夫妻': '付出型', '子女': '孝顺', '财帛': '长辈馈赠', '疾厄': '长寿之相', '迁移': '受尊重', '交友': '年长朋友', '事业': '适合司法、医疗', '田宅': '临近庙宇', '福德': '道德修养', '父母': '有威望' },
            '七杀': { '命宫': '刚毅果决，勇于突破', '兄弟': '疏离', '夫妻': '起伏较大', '子女': '独立性强', '财帛': '起伏大', '疾厄': '需防意外', '迁移': '变动多', '交友': '豪爽之人', '事业': '适合军警', '田宅': '多变', '福德': '不甘平凡', '父母': '关系复杂' },
            '破军': { '命宫': '冲劲十足，敢于打破', '兄弟': '多变', '夫妻': '变动多', '子女': '独立性强', '财帛': '先破后立', '疾厄': '需防意外', '迁移': '变动频繁', '交友': '冒险家', '事业': '适合创新', '田宅': '多变动', '福德': '突破追求', '父母': '关系复杂' },
            '左辅': { '命宫': '随和，善于助人', '兄弟': '互助', '夫妻': '体贴包容', '子女': '乖巧', '财帛': '靠人脉生财', '疾厄': '贵人庇佑', '迁移': '贵人相助', '交友': '多善缘', '事业': '适合副手', '田宅': '邻里友善', '福德': '乐于助人', '父母': '随和' },
            '右弼': { '命宫': '隐忍，暗中贵人', '兄弟': '暗中相助', '夫妻': '暗中付出', '子女': '内敛', '财帛': '暗中得财', '疾厄': '慢性病调理', '迁移': '暗中相助', '交友': '暗贵人', '事业': '适合幕后', '田宅': '内藏乾坤', '福德': '内敛', '父母': '暗中支持' },
            '天魁': { '命宫': '贵人运强', '兄弟': '兄弟提携', '夫妻': '互为贵人', '子女': '学业优秀', '财帛': '贵人得财', '疾厄': '少病灾', '迁移': '贵人提携', '交友': '结交贵人', '事业': '适合社交', '田宅': '房产运佳', '福德': '理想追求', '父母': '有地位' },
            '天钺': { '命宫': '温和隐忍', '兄弟': '暗中助力', '夫妻': '互为暗助', '子女': '隐藏才华', '财帛': '暗财涌动', '疾厄': '病灾化解', '迁移': '暗中相助', '交友': '暗贵人', '事业': '适合幕后', '田宅': '安静宜居', '福德': '隐忍', '父母': '暗中支持' },
            '文昌': { '命宫': '文采斐然', '兄弟': '文才者', '夫妻': '精神交流', '子女': '学业优秀', '财帛': '文采生财', '疾厄': '神经系统', '迁移': '以文会友', '交友': '文人雅士', '事业': '适合教育', '田宅': '有书房', '福德': '追求高雅', '父母': '书香门第' },
            '文曲': { '命宫': '多才多艺', '兄弟': '才艺多', '夫妻': '浪漫多情', '子女': '艺术天赋', '财帛': '偏财不断', '疾厄': '生殖系统', '迁移': '桃花运旺', '交友': '艺术圈', '事业': '适合艺术', '田宅': '艺术氛围', '福德': '浪漫', '父母': '艺术气质' },
            '擎羊': { '命宫': '刚烈冲动', '兄弟': '紧张', '夫妻': '摩擦冲突', '子女': '刚强', '财帛': '起伏大', '疾厄': '刀伤', '迁移': '竞争挑战', '交友': '竞争关系', '事业': '适合军警', '田宅': '安静', '福德': '易焦虑', '父母': '紧张' },
            '陀罗': { '命宫': '固执坚韧', '兄弟': '纠缠', '夫妻': '冷战', '子女': '反应慢', '财帛': '缓慢积累', '疾厄': '慢性病', '迁移': '多阻延', '交友': '纠缠', '事业': '适合研究', '田宅': '陈旧', '福德': '纠结', '父母': '纠缠' },
            '火星': { '命宫': '急躁火爆', '兄弟': '突发争执', '夫妻': '突发冲突', '子女': '活泼好动', '财帛': '突然得财', '疾厄': '心血管', '迁移': '突发机遇', '交友': '冲突', '事业': '适合快速反应', '田宅': '防火', '福德': '急躁', '父母': '紧张' },
            '铃星': { '命宫': '心思缜密', '兄弟': '暗藏竞争', '夫妻': '暗藏矛盾', '子女': '心思细腻', '财帛': '暗财得财', '疾厄': '神经衰弱', '迁移': '暗藏机遇', '交友': '暗藏竞争', '事业': '适合洞察力', '田宅': '明亮', '福德': '多疑', '父母': '暗藏矛盾' },
            '地空': { '命宫': '天马行空', '兄弟': '疏离', '夫妻': '理想化', '子女': '创意天赋', '财帛': '大起大落', '疾厄': '气虚', '迁移': '多空想', '交友': '虚交', '事业': '适合创意', '田宅': '空旷', '福德': '空虚', '父母': '疏离' },
            '地劫': { '命宫': '人生多波折', '兄弟': '波折', '夫妻': '多波折', '子女': '多波折', '财帛': '多损耗', '疾厄': '意外伤', '迁移': '多波折', '交友': '多损耗', '事业': '韧性行业', '田宅': '破败', '福德': '多磨难', '父母': '波折' },
            '禄存': { '命宫': '福禄丰厚', '兄弟': '和睦', '夫妻': '白头偕老', '子女': '孝顺', '财帛': '财库充盈', '疾厄': '福星庇佑', '迁移': '发展顺利', '交友': '贵人', '事业': '适合金融', '田宅': '丰厚', '福德': '富足', '父母': '慈爱' },
            '天马': { '命宫': '奔放自由', '兄弟': '聚少离多', '夫妻': '聚少离多', '子女': '活泼好动', '财帛': '动中得财', '疾厄': '运动损伤', '迁移': '运势强', '交友': '遍布各地', '事业': '流动性', '田宅': '变动多', '福德': '自由', '父母': '奔波' }
        };

        const ALL_STARS = [
            { name: "紫微", icon: "紫", category: "主星" }, { name: "天机", icon: "机", category: "主星" },
            { name: "太阳", icon: "阳", category: "主星" }, { name: "武曲", icon: "武", category: "主星" },
            { name: "天同", icon: "同", category: "主星" }, { name: "廉贞", icon: "廉", category: "主星" },
            { name: "天府", icon: "府", category: "主星" }, { name: "太阴", icon: "阴", category: "主星" },
            { name: "贪狼", icon: "贪", category: "主星" }, { name: "巨门", icon: "巨", category: "主星" },
            { name: "天相", icon: "相", category: "主星" }, { name: "天梁", icon: "梁", category: "主星" },
            { name: "七杀", icon: "杀", category: "主星" }, { name: "破军", icon: "破", category: "主星" },
            { name: "左辅", icon: "辅", category: "吉星" }, { name: "右弼", icon: "弼", category: "吉星" },
            { name: "天魁", icon: "魁", category: "吉星" }, { name: "天钺", icon: "钺", category: "吉星" },
            { name: "文昌", icon: "昌", category: "吉星" }, { name: "文曲", icon: "曲", category: "吉星" },
            { name: "擎羊", icon: "羊", category: "煞星" }, { name: "陀罗", icon: "陀", category: "煞星" },
            { name: "火星", icon: "火", category: "煞星" }, { name: "铃星", icon: "铃", category: "煞星" },
            { name: "地空", icon: "空", category: "煞星" }, { name: "地劫", icon: "劫", category: "煞星" },
            { name: "禄存", icon: "禄", category: "辅星" }, { name: "天马", icon: "马", category: "辅星" }
        ];

        // =============================================================
        // 第二部分：紫微斗数逻辑
        // =============================================================
        let currentSihua = null;
        let minggongDi = '子';
        let chartData = {};
        let placedStars = new Set();
        let currentDetailStar = null;
        // 十二宫纳音所用的「确认年份」（干支年），默认今年
        let nayinYear = new Date().getFullYear();

        // 五虎遁：年干 -> 寅宫（寅月）天干序号
        // 甲己之年丙作首，乙庚之岁戊为头，丙辛必定寻庚起，丁壬壬位顺行流，戊癸甲寅好追求
        const WU_HU_DUN_YIN_GAN = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];

        // 六十甲子纳音（相邻两干支共用一条，下标 = 六十甲子序号 / 2）
        const NAYIN_TABLE = [
            '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火',
            '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土',
            '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木',
            '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金',
            '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水'
        ];

        // 命盘模块独立天干表（避免与后文 CalendarEngine 初始化顺序耦合）
        const TIAN_GAN_FOR_CHART = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

        // 按确认年份计算十二宫天干与纳音，返回 { 地支: { gan, nayin } }
        function getPalaceNayinMap(year) {
            const yearGan = ((year - 4) % 10 + 10) % 10;
            const yinGan = WU_HU_DUN_YIN_GAN[yearGan]; // 寅宫天干
            const map = {};
            DI_ZHI.forEach((di, zhiIdx) => {
                // 自寅位起顺时针（寅→卯→辰…→子→丑）逐宫递一阳干
                const ganIdx = (yinGan + ((zhiIdx - 2 + 12) % 12)) % 10;
                // 六十甲子序号：甲己起甲子…满足 序号%10=天干、序号%12=地支
                const jiaziIdx = ((6 * ganIdx - 5 * zhiIdx) % 60 + 60) % 60;
                map[di] = {
                    gan: TIAN_GAN_FOR_CHART[ganIdx],
                    ganIdx: ganIdx,
                    nayin: NAYIN_TABLE[Math.floor(jiaziIdx / 2)]
                };
            });
            return map;
        }

        function getPalaceNameMap(mgDi) {
            const mgIndex = DI_ZHI.indexOf(mgDi);
            const map = {};
            for (let i = 0; i < 12; i++) {
                const di = DI_ZHI[(mgIndex + i) % 12];
                map[di] = PALACE_ORDER[i];
            }
            return map;
        }

        function getPalaceName(di, mgDi) {
            const map = getPalaceNameMap(mgDi);
            return map[di] || di;
        }

        function getGalaxy(starName) {
            return STAR_GALAXY[starName]?.galaxy || '辅佐';
        }

        function getElement(starName) {
            return STAR_GALAXY[starName]?.element || '—';
        }

        function getCategory(starName) {
            return STAR_GALAXY[starName]?.category || '主星';
        }

        function getSihuaMeaning(starName, sihuaType) {
            const m = SIHUA_MEANINGS[starName];
            if (!m) return null;
            return m[sihuaType] || null;
        }

        function getQualificationList(starName) {
            const q = STAR_SIHUA_QUALIFICATIONS[starName];
            if (!q) return [];
            const map = { lu: '化禄', quan: '化权', ke: '化科', ji: '化忌' };
            const result = [];
            for (const [k, v] of Object.entries(q)) {
                if (v) result.push(map[k] || k);
            }
            return result;
        }

        function getSihuaLabel(sihuaType) {
            const map = { lu: '禄 化禄', quan: '权 化权', ke: '科 化科', ji: '忌 化忌' };
            return map[sihuaType] || '';
        }

        function getAllScenes(starName) {
            const scenes = PALACE_SCENES[starName];
            if (!scenes) return null;
            const result = [];
            const palaceMap = getPalaceNameMap(minggongDi);
            for (const di of DI_ZHI) {
                const palaceName = palaceMap[di] || di;
                if (scenes[palaceName]) {
                    result.push({ di: di, palace: palaceName, scene: scenes[palaceName] });
                }
            }
            return result;
        }

        function getStaticMeanings(starName) {
            return STAR_STATIC_MEANINGS[starName] || [];
        }

        function getOriginalMeaning(starName) {
            return STAR_ORIGINAL_MEANINGS[starName] || '暂无原始意象';
        }

        // =============================================================
        // 天地映射 · 折叠切换 (全局函数)
        // =============================================================
        function toggleCosmic(id) {
            const body = document.getElementById(id + '_body');
            const arrow = document.getElementById(id + '_arrow');
            if (!body || !arrow) return;
            if (body.style.display === 'none') {
                body.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                body.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        }

        // =============================================================
        // 场景面板渲染 (核心)
        // =============================================================
        function showSceneDetail(starName) {
            const panel = document.getElementById('scenePanel');
            if (!panel) return;

            document.querySelectorAll('.palace-cell.highlight-star').forEach(cell => cell.classList.remove('highlight-star'));

            if (!starName) {
                panel.innerHTML = `<div class="scene-empty">点击左侧星曜，查看十二宫场景</div>`;
                currentDetailStar = null;
                return;
            }

            currentDetailStar = starName;
            const starInfo = ALL_STARS.find(s => s.name === starName);
            const galaxy = getGalaxy(starName);
            const element = getElement(starName);
            const originalMeaning = getOriginalMeaning(starName);
            const staticMeanings = getStaticMeanings(starName);
            const allScenes = getAllScenes(starName);
            const quals = getQualificationList(starName);

            // 高亮命盘中对应星曜的位置
            document.querySelectorAll('.palace-cell').forEach(cell => {
                const di = cell.dataset.di;
                if (!di || di === '●') return;
                const stars = chartData[di] || [];
                if (stars.includes(starName)) cell.classList.add('highlight-star');
            });

            let galaxyClass = 'auxiliary';
            let galaxyLabel = '辅佐';
            if (galaxy === '北斗') { galaxyClass = 'beidou'; galaxyLabel = '北斗'; } 
            else if (galaxy === '南斗') { galaxyClass = 'nandou'; galaxyLabel = '南斗'; }
            else if (galaxy === '中天') { galaxyClass = 'zhongtian'; galaxyLabel = '中天'; }

            let headerHtml = `
                    <div class="scene-star-header">
                        <span class="s-icon">${starInfo ? starInfo.icon : '星'}</span>
                        <span class="s-name">${starName}</span>
                        <div class="s-tags">
                            <span class="tag ${galaxyClass}">${galaxyLabel}</span>
                            <span class="tag">${element}</span>
                            ${quals.length > 0 ? `<span class="tag">${quals.join(' · ')}</span>` : ''}
                        </div>
                    </div>
                `;

            let originalHtml = `
                    <div class="info-block">
                        <span class="block-label">原始意象 · 本象：</span><span>${originalMeaning}</span>
                    </div>
                `;

            let staticHtml = '';
            if (staticMeanings.length > 0) {
                let tags = '';
                staticMeanings.forEach(item => { tags += `<span class="static-tag">${item}</span>`; });
                staticHtml = `
                        <div class="info-block">
                            <span class="block-label">静态意象：</span>${tags}
                        </div>
                    `;
            }

            let sihuaHtml = '';
            if (currentSihua) {
                const meaning = getSihuaMeaning(starName, currentSihua);
                if (meaning) {
                    const label = getSihuaLabel(currentSihua);
                    sihuaHtml = `
                            <div class="scene-sihua">
                                <span class="sihua-label">${label}：</span>
                                <span class="sihua-value">${meaning.replace(/[^：]*：/, '').replace(/ · /g, ' · ')}</span>
                            </div>
                        `;
                } else {
                    const typeMap = { lu: '化禄', quan: '化权', ke: '化科', ji: '化忌' };
                    sihuaHtml = `
                            <div class="scene-sihua" style="color:#8a7a6a;">
                                <span class="sihua-label">${getSihuaLabel(currentSihua)}：</span>
                                <span class="sihua-value" style="color:#8a7a6a;">此星不${typeMap[currentSihua] || ''}</span>
                            </div>
                        `;
                }
            }

            let scenesHtml = '';
            if (allScenes && allScenes.length > 0) {
                let items = '';
                allScenes.forEach(item => {
                    items += `
                            <div class="scene-item">
                                <span class="s-palace">${item.palace}</span>
                                <span class="s-desc">${item.scene}</span>
                            </div>
                        `;
                });
                scenesHtml = `<div class="info-block" style="padding: 0 10px 10px; border: none; background: transparent;"><div class="scene-grid">${items}</div></div>`;
            } else {
                scenesHtml = `<div style="text-align:center;color:#8a7a6a;font-size:0.75rem;padding:20px 0;">暂无宫位场景配置</div>`;
            }

            // =============================================================
            // 天地映射 · 可折叠区块
            // =============================================================
            let cosmicHtml = '';
            const cosmicMap = STAR_COSMIC_MAP[starName];
            if (cosmicMap) {
                // 生成唯一ID
                const collapseId = 'cosmic_' + starName.replace(/[^a-zA-Z\u4e00-\u9fa5]/g, '');
                cosmicHtml = `
                    <div style="margin-top: 12px; padding-top: 8px; border-top: 2px solid rgba(61,53,46,0.06);">
                        <div style="display:flex; align-items:center; justify-content:space-between; cursor:pointer; user-select:none; padding:4px 0;" 
                             onclick="toggleCosmic('${collapseId}')">
                            <span style="font-size:0.65rem; color:#5a4a3a; letter-spacing:2px; font-weight:600;">
                                天地映射 · 宇宙 → 地球 → 人心
                            </span>
                            <span id="${collapseId}_arrow" style="font-size:0.7rem; color:#8a7a6a; transition:transform 0.25s ease;">▼</span>
                        </div>
                        <div id="${collapseId}_body" style="display:none; padding-top:6px; transition:all 0.25s ease;">
                            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:5px; font-size:0.6rem; line-height:1.5;">
                                <div style="background:rgba(60,100,150,0.03); border:1px solid rgba(60,100,150,0.06); border-radius:2px; padding:5px 7px;">
                                    <div style="color:#4a6a8a; font-weight:600; letter-spacing:1px; font-size:0.5rem;">宇宙</div>
                                    <div style="color:#3d352e;">${cosmicMap.cosmic}</div>
                                </div>
                                <div style="background:rgba(100,150,80,0.03); border:1px solid rgba(100,150,80,0.06); border-radius:2px; padding:5px 7px;">
                                    <div style="color:#4a7a3a; font-weight:600; letter-spacing:1px; font-size:0.5rem;">地球</div>
                                    <div style="color:#3d352e;">${cosmicMap.earth}</div>
                                </div>
                                <div style="background:rgba(180,120,80,0.03); border:1px solid rgba(180,120,80,0.06); border-radius:2px; padding:5px 7px;">
                                    <div style="color:#8a5a3a; font-weight:600; letter-spacing:1px; font-size:0.5rem;">人心</div>
                                    <div style="color:#3d352e;">${cosmicMap.abstract}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            panel.innerHTML = `${headerHtml}${originalHtml}${staticHtml}${sihuaHtml}${scenesHtml}${cosmicHtml}`;
        }

        // =============================================================
        // 命盘渲染
        // =============================================================
        function renderChart() {
            const grid = document.getElementById('chartGrid');
            if (!grid) return;

            const palaceMap = getPalaceNameMap(minggongDi);
            // 十二宫天干（五虎遁）与纳音
            const nayinMap = getPalaceNayinMap(nayinYear);

            let html = '';
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    const di = GRID_LAYOUT[r][c];
                    if (di === '●') {
                        html += `<div class="palace-cell" style="background:transparent;border:none;cursor:default;"></div>`;
                        continue;
                    }

                    const palaceName = palaceMap[di] || di;
                    const stars = chartData[di] || [];
                    const isMinggong = (di === minggongDi);
                    const isZi = di === '子';
                    const isWu = di === '午';
                    const isMao = di === '卯';
                    const isYou = di === '酉';
                    let extraClass = '';
                    if (isZi || isWu || isMao || isYou) extraClass = 'zi';
                    if (isMinggong) extraClass += ' is-minggong';

                    let starHtml = '';
                    if (stars.length > 0) {
                        stars.forEach(starName => {
                            const starInfo = ALL_STARS.find(s => s.name === starName);
                            let sihuaBadgeHtml = '';
                            if (currentSihua) {
                                const q = STAR_SIHUA_QUALIFICATIONS[starName];
                                if (q && q[currentSihua] === true) {
                                    const badgeMap = { lu: '禄', quan: '权', ke: '科', ji: '忌' };
                                    const label = badgeMap[currentSihua] || currentSihua;
                                    sihuaBadgeHtml = `<span class="sihua-badge ${currentSihua}">${label}</span>`;
                                }
                            }

                            starHtml += `
                                    <div class="palace-star">
                                        <span class="star-icon-sm">${starInfo ? starInfo.icon : '星'}</span>
                                        <span class="star-name-sm">${starName}</span>
                                        ${sihuaBadgeHtml}
                                    </div>
                                `;
                        });
                    } else {
                        starHtml = `<span class="empty-hint">▢ 空</span>`;
                    }

                    const ny = nayinMap[di];

                    html += `
                            <div class="palace-cell ${extraClass}" 
                                 data-di="${di}" 
                                 data-palace="${palaceName}"
                                 ondragover="onDragOver(event)" 
                                 ondrop="onDrop(event)"
                                 ondragleave="onDragLeave(event)">
                                <span class="palace-gan">${ny.gan}</span>
                                <span class="palace-di">${di}</span>
                                <span class="palace-name">${palaceName}</span>
                                <span class="palace-nayin">${ny.gan}${di} · ${ny.nayin}</span>
                                ${starHtml}
                            </div>
                        `;
                }
            }

            grid.innerHTML = html;
        }

        function renderLibrary() {
            const grid = document.getElementById('libGrid');
            if (!grid) return;

            let html = '';
            ALL_STARS.forEach(star => {
                const isPlaced = placedStars.has(star.name);
                const galaxy = getGalaxy(star.name);
                const element = getElement(star.name);
                const isActive = (currentDetailStar === star.name);

                let galaxyClass = 'auxiliary';
                let galaxyLabel = '辅佐';
                if (galaxy === '北斗') { galaxyClass = 'beidou'; galaxyLabel = '北斗'; } 
                else if (galaxy === '南斗') { galaxyClass = 'nandou'; galaxyLabel = '南斗'; }
                else if (galaxy === '中天') { galaxyClass = 'zhongtian'; galaxyLabel = '中天'; }

                const placedClass = isPlaced ? 'placed' : '';
                const activeClass = isActive ? 'active' : '';

                const category = getCategory(star.name);

                html += `
                        <div class="lib-star ${placedClass} ${activeClass}" 
                             data-star="${star.name}"
                             draggable="${!isPlaced}"
                             ondragstart="onDragStart(event)"
                             ondragend="onDragEnd(event)"
                             title="点击查看 ${star.name} 的宫位场景">
                            <span class="lib-icon">${star.icon}</span>
                            <span class="lib-name">${star.name}</span>
                            <span class="lib-galaxy ${galaxyClass}">${galaxyLabel}</span>
                            <span class="lib-category">${category}</span>
                            <span class="lib-element">${element}</span>
                        </div>
                    `;
            });

            grid.innerHTML = html;
        }

        let draggedStar = null;
        function onDragStart(e) {
            const el = e.target.closest('.lib-star');
            if (!el) return;
            if (el.classList.contains('placed')) { e.preventDefault(); return; }
            draggedStar = el.dataset.star;
            el.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedStar);
        }
        function onDragEnd(e) {
            const el = e.target.closest('.lib-star');
            if (el) el.classList.remove('dragging');
            document.querySelectorAll('.palace-cell.drag-over').forEach(cell => cell.classList.remove('drag-over'));
        }
        function onDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const cell = e.target.closest('.palace-cell');
            if (cell) cell.classList.add('drag-over');
        }
        function onDragLeave(e) {
            const cell = e.target.closest('.palace-cell');
            if (cell) cell.classList.remove('drag-over');
        }
        function onDrop(e) {
            e.preventDefault();
            const cell = e.target.closest('.palace-cell');
            if (!cell) return;
            cell.classList.remove('drag-over');

            const di = cell.dataset.di;
            if (!di || di === '●') return;
            const starName = e.dataTransfer.getData('text/plain');
            if (!starName) return;

            let alreadyPlaced = false;
            for (const d of DI_ZHI) {
                if (chartData[d] && chartData[d].includes(starName)) { alreadyPlaced = true; break; }
            }
            if (alreadyPlaced) { alert(`「${starName}」已经在命盘中了`); return; }

            if (!chartData[di]) chartData[di] = [];
            chartData[di].push(starName);
            placedStars.add(starName);

            renderChart();
            renderLibrary();
            
            if (currentDetailStar === starName) {
                setTimeout(() => {
                    document.querySelectorAll('.palace-cell.highlight-star').forEach(cell => cell.classList.remove('highlight-star'));
                    document.querySelectorAll('.palace-cell').forEach(cell => {
                        const d = cell.dataset.di;
                        if (!d || d === '●') return;
                        const stars = chartData[d] || [];
                        if (stars.includes(starName)) cell.classList.add('highlight-star');
                    });
                }, 50);
            }
        }

        function clearChart() {
            if (placedStars.size === 0) { alert('命盘已经是空的了'); return; }
            if (!confirm('确定要清空命盘中的所有星曜吗？')) return;
            DI_ZHI.forEach(di => { chartData[di] = []; });
            placedStars.clear();
            renderChart();
            renderLibrary();
            showSceneDetail(null);
        }

        // =============================================================
        // 初始化
        // =============================================================
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('minggongSelect').value = '子';

            // 年份选择器：填充 1900-2100，选项标注该年干支（用于十二宫天干纳音）
            const nayinYearSelect = document.getElementById('nayinYearSelect');
            if (nayinYearSelect) {
                const GAN = TIAN_GAN_FOR_CHART;
                const ZHI = DI_ZHI;
                for (let y = 1900; y <= 2100; y++) {
                    const opt = document.createElement('option');
                    opt.value = y;
                    opt.textContent = `${y} ${GAN[((y - 4) % 10 + 10) % 10]}${ZHI[((y - 4) % 12 + 12) % 12]}年`;
                    nayinYearSelect.appendChild(opt);
                }
                nayinYearSelect.value = nayinYear;
                nayinYearSelect.addEventListener('change', function() {
                    nayinYear = parseInt(this.value, 10);
                    renderChart();
                });
            }

            DI_ZHI.forEach(di => { chartData[di] = []; });
            placedStars.clear();
            renderChart();
            renderLibrary();
            showSceneDetail(null);

            const libGrid = document.getElementById('libGrid');
            if (libGrid) {
                libGrid.addEventListener('click', function(e) {
                    const libStar = e.target.closest('.lib-star');
                    if (!libStar) return;
                    const starName = libStar.dataset.star;
                    if (starName) { showSceneDetail(starName); renderLibrary(); }
                });
            }

            document.getElementById('minggongSelect').addEventListener('change', function() {
                minggongDi = this.value;
                DI_ZHI.forEach(di => { chartData[di] = []; });
                placedStars.clear();
                renderChart(); renderLibrary();
                if (currentDetailStar) showSceneDetail(currentDetailStar);
            });

            document.getElementById('clearChartBtn').addEventListener('click', clearChart);

            document.querySelectorAll('.sihua-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const sihua = this.dataset.sihua;
                    if (currentSihua === sihua) {
                        currentSihua = null;
                    } else {
                        currentSihua = sihua;
                    }
                    document.querySelectorAll('.sihua-btn').forEach(b => {
                        b.classList.toggle('active', b.dataset.sihua === currentSihua);
                    });
                    renderChart(); 
                    if (currentDetailStar) showSceneDetail(currentDetailStar);
                });
            });

            document.getElementById('clearSihua').addEventListener('click', function() {
                currentSihua = null;
                document.querySelectorAll('.sihua-btn').forEach(b => b.classList.remove('active'));
                renderChart();
                if (currentDetailStar) showSceneDetail(currentDetailStar);
            });

            const hetuToggle = document.getElementById('hetuToggleBtn');
            const hetuOverlay = document.getElementById('hetuOverlay');
            const hetuClose = document.getElementById('hetuCloseBtn');
            if (hetuToggle) {
                hetuToggle.addEventListener('click', function() { hetuOverlay.classList.toggle('show'); this.classList.toggle('active'); });
            }
            if (hetuClose) {
                hetuClose.addEventListener('click', function() { hetuOverlay.classList.remove('show'); hetuToggle.classList.remove('active'); });
            }
            if (hetuOverlay) {
                hetuOverlay.addEventListener('click', function(e) {
                    if (e.target === this) { this.classList.remove('show'); hetuToggle.classList.remove('active'); }
                });
            }

            document.addEventListener('dblclick', function(e) {
                const cell = e.target.closest('.palace-cell');
                if (!cell) return;
                const di = cell.dataset.di;
                if (!di || di === '●') return;
                const stars = chartData[di] || [];
                if (stars.length === 0) return;
                const starName = stars[stars.length - 1];
                const palaceName = getPalaceName(di, minggongDi);
                if (!confirm(`从「${palaceName}」移除「${starName}」？`)) return;
                const idx = chartData[di].indexOf(starName);
                if (idx > -1) { chartData[di].splice(idx, 1); placedStars.delete(starName); }
                renderChart(); renderLibrary();
                if (currentDetailStar === starName) showSceneDetail(null);
            });
        });

        // =============================================================
        // Tab 切换
        // =============================================================
        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    this.classList.add('active');
                    const targetId = this.dataset.tab;
                    document.getElementById(targetId).classList.add('active');
                });
            });
        });

        // =============================================================
        // 节气引擎：寿星天文历（与 lunar-javascript ShouXingUtil 同源的
        // 太阳黄经链精简版，含章动、光行差与 ΔT 修正，输出北京时交节时刻）
        // =============================================================
        const SolarTerms = {
            J2000: 2451545,
            ONE_THIRD: 1.0 / 3,
            SECOND_PER_DAY: 86400,
            SECOND_PER_RAD: 648000 / Math.PI,

            // 公历年内 24 节气名称，对应年节气表下标 2..25
            // （年表下标 0=上年大雪, 1=上年冬至, 2 小寒 … 25 冬至）
            NAMES: ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'],

            NUT_B:[
                    2.1824, -33.75705, 36e-6, -1720, 920,
                    3.5069, 1256.66393, 11e-6, -132, 57,
                    1.3375, 16799.4182, -51e-6, -23, 10,
                    4.3649, -67.5141, 72e-6, 21, -9,
                    0.04, -628.302, 0, -14, 0,
                    2.36, 8328.691, 0, 7, 0,
                    3.46, 1884.966, 0, -5, 2,
                    5.44, 16833.175, 0, -4, 2,
                    3.69, 25128.110, 0, -3, 0,
                    3.55, 628.362, 0, 2, 0
            ],
            DT_AT:[
                    -4000, 108371.7, -13036.80, 392.000, 0.0000,
                    -500, 17201.0, -627.82, 16.170, -0.3413,
                    -150, 12200.6, -346.41, 5.403, -0.1593,
                    150, 9113.8, -328.13, -1.647, 0.0377,
                    500, 5707.5, -391.41, 0.915, 0.3145,
                    900, 2203.4, -283.45, 13.034, -0.1778,
                    1300, 490.1, -57.35, 2.085, -0.0072,
                    1600, 120.0, -9.81, -1.532, 0.1403,
                    1700, 10.2, -0.91, 0.510, -0.0370,
                    1800, 13.4, -0.72, 0.202, -0.0193,
                    1830, 7.8, -1.81, 0.416, -0.0247,
                    1860, 8.3, -0.13, -0.406, 0.0292,
                    1880, -5.4, 0.32, -0.183, 0.0173,
                    1900, -2.3, 2.06, 0.169, -0.0135,
                    1920, 21.2, 1.69, -0.304, 0.0167,
                    1940, 24.2, 1.22, -0.064, 0.0031,
                    1960, 33.2, 0.51, 0.231, -0.0109,
                    1980, 51.0, 1.29, -0.026, 0.0032,
                    2000, 63.87, 0.1, 0, 0,
                    2005, 64.7, 0.21, 0, 0,
                    2012, 66.8, 0.22, 0, 0,
                    // 2018, 69.0, 0.36, 0, 0,
                    // 使用skyfeild的DE440s△T预测数据拟合
                    2016, 68.1024, 0.5456, -0.0542, -0.001172,
                    2020, 69.3612, 0.0422, -0.0502, 0.006216,
                    2024, 69.1752, -0.0335, -0.0048, 0.000811,
                    2028, 69.0206, -0.0275, 0.0055, -0.000014,
                    2032, 68.9981, 0.0163, 0.0054, 0.000006,
                    2036, 69.1498, 0.0599, 0.0053, 0.000026,
                    2040, 69.4751, 0.1035, 0.0051, 0.000046,
                    2044, 69.9737, 0.1469, 0.0050, 0.000066,
                    2048, 70.6451, 0.1903, 0.0049, 0.000085,
                    2050, 71.0457
            ],
            XL0:[
                    10000000000,
                    20, 578, 920, 1100, 1124, 1136, 1148, 1217, 1226, 1229, 1229, 1229, 1229, 1937, 2363, 2618, 2633, 2660, 2666,
                    17534704567, 0.00000000000, 0.00000000000, 334165646, 4.669256804, 6283.075849991, 3489428, 4.6261024,
                    12566.1517000, 349706, 2.744118, 5753.384885, 341757, 2.828866, 3.523118, 313590, 3.627670, 77713.771468,
                    267622, 4.418084, 7860.419392, 234269, 6.135162, 3930.209696, 132429, 0.742464, 11506.769770, 127317, 2.037097,
                    529.690965, 119917, 1.109629, 1577.343542, 99025, 5.23268, 5884.92685, 90186, 2.04505, 26.29832, 85722, 3.50849,
                    398.14900, 77979, 1.17883, 5223.69392, 75314, 2.53339, 5507.55324, 50526, 4.58293, 18849.22755, 49238, 4.20507,
                    775.52261, 35666, 2.91954, 0.06731, 31709, 5.84902, 11790.62909, 28413, 1.89869, 796.29801, 27104, 0.31489,
                    10977.07880, 24281, 0.34481, 5486.77784, 20616, 4.80647, 2544.31442, 20539, 1.86948, 5573.14280, 20226, 2.45768,
                    6069.77675, 15552, 0.83306, 213.29910, 13221, 3.41118, 2942.46342, 12618, 1.08303, 20.77540, 11513, 0.64545,
                    0.98032, 10285, 0.63600, 4694.00295, 10190, 0.97569, 15720.83878, 10172, 4.26680, 7.11355, 9921, 6.2099,
                    2146.1654, 9761, 0.6810, 155.4204, 8580, 5.9832, 161000.6857, 8513, 1.2987, 6275.9623, 8471, 3.6708, 71430.6956,
                    7964, 1.8079, 17260.1547, 7876, 3.0370, 12036.4607, 7465, 1.7551, 5088.6288, 7387, 3.5032, 3154.6871, 7355,
                    4.6793, 801.8209, 6963, 0.8330, 9437.7629, 6245, 3.9776, 8827.3903, 6115, 1.8184, 7084.8968, 5696, 2.7843,
                    6286.5990, 5612, 4.3869, 14143.4952, 5558, 3.4701, 6279.5527, 5199, 0.1891, 12139.5535, 5161, 1.3328, 1748.0164,
                    5115, 0.2831, 5856.4777, 4900, 0.4874, 1194.4470, 4104, 5.3682, 8429.2413, 4094, 2.3985, 19651.0485, 3920,
                    6.1683, 10447.3878, 3677, 6.0413, 10213.2855, 3660, 2.5696, 1059.3819, 3595, 1.7088, 2352.8662, 3557, 1.7760,
                    6812.7668, 3329, 0.5931, 17789.8456, 3041, 0.4429, 83996.8473, 3005, 2.7398, 1349.8674, 2535, 3.1647, 4690.4798,
                    2474, 0.2148, 3.5904, 2366, 0.4847, 8031.0923, 2357, 2.0653, 3340.6124, 2282, 5.2220, 4705.7323, 2189, 5.5559,
                    553.5694, 2142, 1.4256, 16730.4637, 2109, 4.1483, 951.7184, 2030, 0.3713, 283.8593, 1992, 5.2221, 12168.0027,
                    1986, 5.7747, 6309.3742, 1912, 3.8222, 23581.2582, 1889, 5.3863, 149854.4001, 1790, 2.2149, 13367.9726, 1748,
                    4.5605, 135.0651, 1622, 5.9884, 11769.8537, 1508, 4.1957, 6256.7775, 1442, 4.1932, 242.7286, 1435, 3.7236,
                    38.0277, 1397, 4.4014, 6681.2249, 1362, 1.8893, 7632.9433, 1250, 1.1305, 5.5229, 1205, 2.6223, 955.5997, 1200,
                    1.0035, 632.7837, 1129, 0.1774, 4164.3120, 1083, 0.3273, 103.0928, 1052, 0.9387, 11926.2544, 1050, 5.3591,
                    1592.5960, 1033, 6.1998, 6438.4962, 1001, 6.0291, 5746.2713, 980, 0.999, 11371.705, 980, 5.244, 27511.468, 938,
                    2.624, 5760.498, 923, 0.483, 522.577, 922, 4.571, 4292.331, 905, 5.337, 6386.169, 862, 4.165, 7058.598, 841,
                    3.299, 7234.794, 836, 4.539, 25132.303, 813, 6.112, 4732.031, 812, 6.271, 426.598, 801, 5.821, 28.449, 787,
                    0.996, 5643.179, 776, 2.957, 23013.540, 769, 3.121, 7238.676, 758, 3.974, 11499.656, 735, 4.386, 316.392, 731,
                    0.607, 11513.883, 719, 3.998, 74.782, 706, 0.323, 263.084, 676, 5.911, 90955.552, 663, 3.665, 17298.182, 653,
                    5.791, 18073.705, 630, 4.717, 6836.645, 615, 1.458, 233141.314, 612, 1.075, 19804.827, 596, 3.321, 6283.009,
                    596, 2.876, 6283.143, 555, 2.452, 12352.853, 541, 5.392, 419.485, 531, 0.382, 31441.678, 519, 4.065, 6208.294,
                    513, 2.361, 10973.556, 494, 5.737, 9917.697, 450, 3.272, 11015.106, 449, 3.653, 206.186, 447, 2.064, 7079.374,
                    435, 4.423, 5216.580, 421, 1.906, 245.832, 413, 0.921, 3738.761, 402, 0.840, 20.355, 387, 1.826, 11856.219, 379,
                    2.344, 3.881, 374, 2.954, 3128.389, 370, 5.031, 536.805, 365, 1.018, 16200.773, 365, 1.083, 88860.057, 352,
                    5.978, 3894.182, 352, 2.056, 244287.600, 351, 3.713, 6290.189, 340, 1.106, 14712.317, 339, 0.978, 8635.942, 339,
                    3.202, 5120.601, 333, 0.837, 6496.375, 325, 3.479, 6133.513, 316, 5.089, 21228.392, 316, 1.328, 10873.986, 309,
                    3.646, 10.637, 303, 1.802, 35371.887, 296, 3.397, 9225.539, 288, 6.026, 154717.610, 281, 2.585, 14314.168, 262,
                    3.856, 266.607, 262, 2.579, 22483.849, 257, 1.561, 23543.231, 255, 3.949, 1990.745, 251, 3.744, 10575.407, 240,
                    1.161, 10984.192, 238, 0.106, 7.046, 236, 4.272, 6040.347, 234, 3.577, 10969.965, 211, 3.714, 65147.620, 210,
                    0.754, 13521.751, 207, 4.228, 5650.292, 202, 0.814, 170.673, 201, 4.629, 6037.244, 200, 0.381, 6172.870, 199,
                    3.933, 6206.810, 199, 5.197, 6262.300, 197, 1.046, 18209.330, 195, 1.070, 5230.807, 195, 4.869, 36.028, 194,
                    4.313, 6244.943, 192, 1.229, 709.933, 192, 5.595, 6282.096, 192, 0.602, 6284.056, 189, 3.744, 23.878, 188,
                    1.904, 15.252, 188, 0.867, 22003.915, 182, 3.681, 15110.466, 181, 0.491, 1.484, 179, 3.222, 39302.097, 179,
                    1.259, 12559.038,
                    62833196674749, 0.000000000000, 0.000000000000, 20605886, 2.67823456, 6283.07584999, 430343, 2.635127,
                    12566.151700, 42526, 1.59047, 3.52312, 11926, 5.79557, 26.29832, 10898, 2.96618, 1577.34354, 9348, 2.5921,
                    18849.2275, 7212, 1.1385, 529.6910, 6777, 1.8747, 398.1490, 6733, 4.4092, 5507.5532, 5903, 2.8880, 5223.6939,
                    5598, 2.1747, 155.4204, 4541, 0.3980, 796.2980, 3637, 0.4662, 775.5226, 2896, 2.6471, 7.1135, 2084, 5.3414,
                    0.9803, 1910, 1.8463, 5486.7778, 1851, 4.9686, 213.2991, 1729, 2.9912, 6275.9623, 1623, 0.0322, 2544.3144, 1583,
                    1.4305, 2146.1654, 1462, 1.2053, 10977.0788, 1246, 2.8343, 1748.0164, 1188, 3.2580, 5088.6288, 1181, 5.2738,
                    1194.4470, 1151, 2.0750, 4694.0030, 1064, 0.7661, 553.5694, 997, 1.303, 6286.599, 972, 4.239, 1349.867, 945,
                    2.700, 242.729, 858, 5.645, 951.718, 758, 5.301, 2352.866, 639, 2.650, 9437.763, 610, 4.666, 4690.480, 583,
                    1.766, 1059.382, 531, 0.909, 3154.687, 522, 5.661, 71430.696, 520, 1.854, 801.821, 504, 1.425, 6438.496, 433,
                    0.241, 6812.767, 426, 0.774, 10447.388, 413, 5.240, 7084.897, 374, 2.001, 8031.092, 356, 2.429, 14143.495, 350,
                    4.800, 6279.553, 337, 0.888, 12036.461, 337, 3.862, 1592.596, 325, 3.400, 7632.943, 322, 0.616, 8429.241, 318,
                    3.188, 4705.732, 297, 6.070, 4292.331, 295, 1.431, 5746.271, 290, 2.325, 20.355, 275, 0.935, 5760.498, 270,
                    4.804, 7234.794, 253, 6.223, 6836.645, 228, 5.003, 17789.846, 225, 5.672, 11499.656, 215, 5.202, 11513.883, 208,
                    3.955, 10213.286, 208, 2.268, 522.577, 206, 2.224, 5856.478, 206, 2.550, 25132.303, 203, 0.910, 6256.778, 189,
                    0.532, 3340.612, 188, 4.735, 83996.847, 179, 1.474, 4164.312, 178, 3.025, 5.523, 177, 3.026, 5753.385, 159,
                    4.637, 3.286, 157, 6.124, 5216.580, 155, 3.077, 6681.225, 154, 4.200, 13367.973, 143, 1.191, 3894.182, 138,
                    3.093, 135.065, 136, 4.245, 426.598, 134, 5.765, 6040.347, 128, 3.085, 5643.179, 127, 2.092, 6290.189, 125,
                    3.077, 11926.254, 125, 3.445, 536.805, 114, 3.244, 12168.003, 112, 2.318, 16730.464, 111, 3.901, 11506.770, 111,
                    5.320, 23.878, 105, 3.750, 7860.419, 103, 2.447, 1990.745, 96, 0.82, 3.88, 96, 4.08, 6127.66, 91, 5.42, 206.19,
                    91, 0.42, 7079.37, 88, 5.17, 11790.63, 81, 0.34, 9917.70, 80, 3.89, 10973.56, 78, 2.40, 1589.07, 78, 2.58,
                    11371.70, 77, 3.98, 955.60, 77, 3.36, 36.03, 76, 1.30, 103.09, 75, 5.18, 10969.97, 75, 4.96, 6496.37, 73, 5.21,
                    38.03, 72, 2.65, 6309.37, 70, 5.61, 3738.76, 69, 2.60, 3496.03, 69, 0.39, 15.25, 69, 2.78, 20.78, 65, 1.13,
                    7058.60, 64, 4.28, 28.45, 61, 5.63, 10984.19, 60, 0.73, 419.48, 60, 5.28, 10575.41, 58, 5.55, 17298.18, 58,
                    3.19, 4732.03,
                    5291887, 0.0000000, 0.0000000, 871984, 1.072097, 6283.075850, 30913, 0.86729, 12566.15170, 2734, 0.0530, 3.5231,
                    1633, 5.1883, 26.2983, 1575, 3.6846, 155.4204, 954, 0.757, 18849.228, 894, 2.057, 77713.771, 695, 0.827,
                    775.523, 506, 4.663, 1577.344, 406, 1.031, 7.114, 381, 3.441, 5573.143, 346, 5.141, 796.298, 317, 6.053,
                    5507.553, 302, 1.192, 242.729, 289, 6.117, 529.691, 271, 0.306, 398.149, 254, 2.280, 553.569, 237, 4.381,
                    5223.694, 208, 3.754, 0.980, 168, 0.902, 951.718, 153, 5.759, 1349.867, 145, 4.364, 1748.016, 134, 3.721,
                    1194.447, 125, 2.948, 6438.496, 122, 2.973, 2146.165, 110, 1.271, 161000.686, 104, 0.604, 3154.687, 100, 5.986,
                    6286.599, 92, 4.80, 5088.63, 89, 5.23, 7084.90, 83, 3.31, 213.30, 76, 3.42, 5486.78, 71, 6.19, 4690.48, 68,
                    3.43, 4694.00, 65, 1.60, 2544.31, 64, 1.98, 801.82, 61, 2.48, 10977.08, 50, 1.44, 6836.65, 49, 2.34, 1592.60,
                    46, 1.31, 4292.33, 46, 3.81, 149854.40, 43, 0.04, 7234.79, 40, 4.94, 7632.94, 39, 1.57, 71430.70, 38, 3.17,
                    6309.37, 35, 0.99, 6040.35, 35, 0.67, 1059.38, 31, 3.18, 2352.87, 31, 3.55, 8031.09, 30, 1.92, 10447.39, 30,
                    2.52, 6127.66, 28, 4.42, 9437.76, 28, 2.71, 3894.18, 27, 0.67, 25132.30, 26, 5.27, 6812.77, 25, 0.55, 6279.55,
                    23, 1.38, 4705.73, 22, 0.64, 6256.78, 20, 6.07, 640.88,
                    28923, 5.84384, 6283.07585, 3496, 0.0000, 0.0000, 1682, 5.4877, 12566.1517, 296, 5.196, 155.420, 129, 4.722,
                    3.523, 71, 5.30, 18849.23, 64, 5.97, 242.73, 40, 3.79, 553.57,
                    11408, 3.14159, 0.00000, 772, 4.134, 6283.076, 77, 3.84, 12566.15, 42, 0.42, 155.42,
                    88, 3.14, 0.00, 17, 2.77, 6283.08, 5, 2.01, 155.42, 3, 2.21, 12566.15,
                    27962, 3.19870, 84334.66158, 10164, 5.42249, 5507.55324, 8045, 3.8801, 5223.6939, 4381, 3.7044, 2352.8662, 3193,
                    4.0003, 1577.3435, 2272, 3.9847, 1047.7473, 1814, 4.9837, 6283.0758, 1639, 3.5646, 5856.4777, 1444, 3.7028,
                    9437.7629, 1430, 3.4112, 10213.2855, 1125, 4.8282, 14143.4952, 1090, 2.0857, 6812.7668, 1037, 4.0566,
                    71092.8814, 971, 3.473, 4694.003, 915, 1.142, 6620.890, 878, 4.440, 5753.385, 837, 4.993, 7084.897, 770, 5.554,
                    167621.576, 719, 3.602, 529.691, 692, 4.326, 6275.962, 558, 4.410, 7860.419, 529, 2.484, 4705.732, 521, 6.250,
                    18073.705,
                    903, 3.897, 5507.553, 618, 1.730, 5223.694, 380, 5.244, 2352.866,
                    166, 1.627, 84334.662,
                    10001398880, 0.00000000000, 0.00000000000, 167069963, 3.098463508, 6283.075849991, 1395602, 3.0552461,
                    12566.1517000, 308372, 5.198467, 77713.771468, 162846, 1.173877, 5753.384885, 157557, 2.846852, 7860.419392,
                    92480, 5.45292, 11506.76977, 54244, 4.56409, 3930.20970, 47211, 3.66100, 5884.92685, 34598, 0.96369, 5507.55324,
                    32878, 5.89984, 5223.69392, 30678, 0.29867, 5573.14280, 24319, 4.27350, 11790.62909, 21183, 5.84715, 1577.34354,
                    18575, 5.02194, 10977.07880, 17484, 3.01194, 18849.22755, 10984, 5.05511, 5486.77784, 9832, 0.8868, 6069.7768,
                    8650, 5.6896, 15720.8388, 8583, 1.2708, 161000.6857, 6490, 0.2725, 17260.1547, 6292, 0.9218, 529.6910, 5706,
                    2.0137, 83996.8473, 5574, 5.2416, 71430.6956, 4938, 3.2450, 2544.3144, 4696, 2.5781, 775.5226, 4466, 5.5372,
                    9437.7629, 4252, 6.0111, 6275.9623, 3897, 5.3607, 4694.0030, 3825, 2.3926, 8827.3903, 3749, 0.8295, 19651.0485,
                    3696, 4.9011, 12139.5535, 3566, 1.6747, 12036.4607, 3454, 1.8427, 2942.4634, 3319, 0.2437, 7084.8968, 3192,
                    0.1837, 5088.6288, 3185, 1.7778, 398.1490, 2846, 1.2134, 6286.5990, 2779, 1.8993, 6279.5527, 2628, 4.5890,
                    10447.3878, 2460, 3.7866, 8429.2413, 2393, 4.9960, 5856.4777, 2359, 0.2687, 796.2980, 2329, 2.8078, 14143.4952,
                    2210, 1.9500, 3154.6871, 2035, 4.6527, 2146.1654, 1951, 5.3823, 2352.8662, 1883, 0.6731, 149854.4001, 1833,
                    2.2535, 23581.2582, 1796, 0.1987, 6812.7668, 1731, 6.1520, 16730.4637, 1717, 4.4332, 10213.2855, 1619, 5.2316,
                    17789.8456, 1381, 5.1896, 8031.0923, 1364, 3.6852, 4705.7323, 1314, 0.6529, 13367.9726, 1041, 4.3329,
                    11769.8537, 1017, 1.5939, 4690.4798, 998, 4.201, 6309.374, 966, 3.676, 27511.468, 874, 6.064, 1748.016, 779,
                    3.674, 12168.003, 771, 0.312, 7632.943, 756, 2.626, 6256.778, 746, 5.648, 11926.254, 693, 2.924, 6681.225, 680,
                    1.423, 23013.540, 674, 0.563, 3340.612, 663, 5.661, 11371.705, 659, 3.136, 801.821, 648, 2.650, 19804.827, 615,
                    3.029, 233141.314, 612, 5.134, 1194.447, 563, 4.341, 90955.552, 552, 2.091, 17298.182, 534, 5.100, 31441.678,
                    531, 2.407, 11499.656, 523, 4.624, 6438.496, 513, 5.324, 11513.883, 477, 0.256, 11856.219, 461, 1.722, 7234.794,
                    458, 3.766, 6386.169, 458, 4.466, 5746.271, 423, 1.055, 5760.498, 422, 1.557, 7238.676, 415, 2.599, 7058.598,
                    401, 3.030, 1059.382, 397, 1.201, 1349.867, 379, 4.907, 4164.312, 360, 5.707, 5643.179, 352, 3.626, 244287.600,
                    348, 0.761, 10973.556, 342, 3.001, 4292.331, 336, 4.546, 4732.031, 334, 3.138, 6836.645, 324, 4.164, 9917.697,
                    316, 1.691, 11015.106, 307, 0.238, 35371.887, 298, 1.306, 6283.143, 298, 1.750, 6283.009, 293, 5.738, 16200.773,
                    286, 5.928, 14712.317, 281, 3.515, 21228.392, 280, 5.663, 8635.942, 277, 0.513, 26.298, 268, 4.207, 18073.705,
                    266, 0.900, 12352.853, 260, 2.962, 25132.303, 255, 2.477, 6208.294, 242, 2.800, 709.933, 231, 1.054, 22483.849,
                    229, 1.070, 14314.168, 216, 1.314, 154717.610, 215, 6.038, 10873.986, 200, 0.561, 7079.374, 198, 2.614, 951.718,
                    197, 4.369, 167283.762, 186, 2.861, 5216.580, 183, 1.660, 39302.097, 183, 5.912, 3738.761, 175, 2.145, 6290.189,
                    173, 2.168, 10575.407, 171, 3.702, 1592.596, 171, 1.343, 3128.389, 164, 5.550, 6496.375, 164, 5.856, 10984.192,
                    161, 1.998, 10969.965, 161, 1.909, 6133.513, 157, 4.955, 25158.602, 154, 6.216, 23543.231, 153, 5.357,
                    13521.751, 150, 5.770, 18209.330, 150, 5.439, 155.420, 139, 1.778, 9225.539, 139, 1.626, 5120.601, 128, 2.460,
                    13916.019, 123, 0.717, 143571.324, 122, 2.654, 88860.057, 121, 4.414, 3894.182, 121, 1.192, 3.523, 120, 4.030,
                    553.569, 119, 1.513, 17654.781, 117, 3.117, 14945.316, 113, 2.698, 6040.347, 110, 3.085, 43232.307, 109, 0.998,
                    955.600, 108, 2.939, 17256.632, 107, 5.285, 65147.620, 103, 0.139, 11712.955, 103, 5.850, 213.299, 102, 3.046,
                    6037.244, 101, 2.842, 8662.240, 100, 3.626, 6262.300, 98, 2.36, 6206.81, 98, 5.11, 6172.87, 98, 2.00, 15110.47,
                    97, 2.67, 5650.29, 97, 2.75, 6244.94, 96, 4.02, 6282.10, 96, 5.31, 6284.06, 92, 0.10, 29088.81, 85, 3.26,
                    20426.57, 84, 2.60, 28766.92, 81, 3.58, 10177.26, 80, 5.81, 5230.81, 78, 2.53, 16496.36, 77, 4.06, 6127.66, 73,
                    0.04, 5481.25, 72, 5.96, 12559.04, 72, 5.92, 4136.91, 71, 5.49, 22003.91, 70, 3.41, 7.11, 69, 0.62, 11403.68,
                    69, 3.90, 1589.07, 69, 1.96, 12416.59, 69, 4.51, 426.60, 67, 1.61, 11087.29, 66, 4.50, 47162.52, 66, 5.08,
                    283.86, 66, 4.32, 16858.48, 65, 1.04, 6062.66, 64, 1.59, 18319.54, 63, 5.70, 45892.73, 63, 4.60, 66567.49, 63,
                    3.82, 13517.87, 62, 2.62, 11190.38, 61, 1.54, 33019.02, 60, 5.58, 10344.30, 60, 5.38, 316428.23, 60, 5.78,
                    632.78, 59, 6.12, 9623.69, 57, 0.16, 17267.27, 57, 3.86, 6076.89, 57, 1.98, 7668.64, 56, 4.78, 20199.09, 55,
                    4.56, 18875.53, 55, 3.51, 17253.04, 54, 3.07, 226858.24, 54, 4.83, 18422.63, 53, 5.02, 12132.44, 52, 3.63,
                    5333.90, 52, 0.97, 155427.54, 51, 3.36, 20597.24, 50, 0.99, 11609.86, 50, 2.21, 1990.75, 48, 1.62, 12146.67, 48,
                    1.17, 12569.67, 47, 4.62, 5436.99, 47, 1.81, 12562.63, 47, 0.59, 21954.16, 47, 0.76, 7342.46, 46, 0.27, 4590.91,
                    46, 3.77, 156137.48, 45, 5.66, 10454.50, 44, 5.84, 3496.03, 43, 0.24, 17996.03, 41, 5.93, 51092.73, 41, 4.21,
                    12592.45, 40, 5.14, 1551.05, 40, 5.28, 15671.08, 39, 3.69, 18052.93, 39, 4.94, 24356.78, 38, 2.72, 11933.37, 38,
                    5.23, 7477.52, 38, 4.99, 9779.11, 37, 3.70, 9388.01, 37, 4.44, 4535.06, 36, 2.16, 28237.23, 36, 2.54, 242.73,
                    36, 0.22, 5429.88, 35, 6.15, 19800.95, 35, 2.92, 36949.23, 34, 5.63, 2379.16, 34, 5.73, 16460.33, 34, 5.11,
                    5849.36, 33, 6.19, 6268.85,
                    10301861, 1.10748970, 6283.07584999, 172124, 1.064423, 12566.151700, 70222, 3.14159, 0.00000, 3235, 1.0217,
                    18849.2275, 3080, 2.8435, 5507.5532, 2497, 1.3191, 5223.6939, 1849, 1.4243, 1577.3435, 1008, 5.9138, 10977.0788,
                    865, 1.420, 6275.962, 863, 0.271, 5486.778, 507, 1.686, 5088.629, 499, 6.014, 6286.599, 467, 5.987, 529.691,
                    440, 0.518, 4694.003, 410, 1.084, 9437.763, 387, 4.750, 2544.314, 375, 5.071, 796.298, 352, 0.023, 83996.847,
                    344, 0.949, 71430.696, 341, 5.412, 775.523, 322, 6.156, 2146.165, 286, 5.484, 10447.388, 284, 3.420, 2352.866,
                    255, 6.132, 6438.496, 252, 0.243, 398.149, 243, 3.092, 4690.480, 225, 3.689, 7084.897, 220, 4.952, 6812.767,
                    219, 0.420, 8031.092, 209, 1.282, 1748.016, 193, 5.314, 8429.241, 185, 1.820, 7632.943, 175, 3.229, 6279.553,
                    173, 1.537, 4705.732, 158, 4.097, 11499.656, 158, 5.539, 3154.687, 150, 3.633, 11513.883, 148, 3.222, 7234.794,
                    147, 3.653, 1194.447, 144, 0.817, 14143.495, 135, 6.151, 5746.271, 134, 4.644, 6836.645, 128, 2.693, 1349.867,
                    123, 5.650, 5760.498, 118, 2.577, 13367.973, 113, 3.357, 17789.846, 110, 4.497, 4292.331, 108, 5.828, 12036.461,
                    102, 5.621, 6256.778, 99, 1.14, 1059.38, 98, 0.66, 5856.48, 93, 2.32, 10213.29, 92, 0.77, 16730.46, 88, 1.50,
                    11926.25, 86, 1.42, 5753.38, 85, 0.66, 155.42, 81, 1.64, 6681.22, 80, 4.11, 951.72, 66, 4.55, 5216.58, 65, 0.98,
                    25132.30, 64, 4.19, 6040.35, 64, 0.52, 6290.19, 63, 1.51, 5643.18, 59, 6.18, 4164.31, 57, 2.30, 10973.56, 55,
                    2.32, 11506.77, 55, 2.20, 1592.60, 55, 5.27, 3340.61, 54, 5.54, 553.57, 53, 5.04, 9917.70, 53, 0.92, 11371.70,
                    52, 3.98, 17298.18, 52, 3.60, 10969.97, 49, 5.91, 3894.18, 49, 2.51, 6127.66, 48, 1.67, 12168.00, 46, 0.31,
                    801.82, 42, 3.70, 10575.41, 42, 4.05, 10984.19, 40, 2.17, 7860.42, 40, 4.17, 26.30, 38, 5.82, 7058.60, 37, 3.39,
                    6496.37, 36, 1.08, 6309.37, 36, 5.34, 7079.37, 34, 3.62, 11790.63, 32, 0.32, 16200.77, 31, 4.24, 3738.76, 29,
                    4.55, 11856.22, 29, 1.26, 8635.94, 27, 3.45, 5884.93, 26, 5.08, 10177.26, 26, 5.38, 21228.39, 24, 2.26,
                    11712.96, 24, 1.05, 242.73, 24, 5.59, 6069.78, 23, 3.63, 6284.06, 23, 1.64, 4732.03, 22, 3.46, 213.30, 21, 1.05,
                    3496.03, 21, 3.92, 13916.02, 21, 4.01, 5230.81, 20, 5.16, 12352.85, 20, 0.69, 1990.75, 19, 2.73, 6062.66, 19,
                    5.01, 11015.11, 18, 6.04, 6283.01, 18, 2.85, 7238.68, 18, 5.60, 6283.14, 18, 5.16, 17253.04, 18, 2.54, 14314.17,
                    17, 1.58, 7.11, 17, 0.98, 3930.21, 17, 4.75, 17267.27, 16, 2.19, 6076.89, 16, 2.19, 18073.70, 16, 6.12, 3.52,
                    16, 4.61, 9623.69, 16, 3.40, 16496.36, 15, 0.19, 9779.11, 15, 5.30, 13517.87, 15, 4.26, 3128.39, 15, 0.81,
                    709.93, 14, 0.50, 25158.60, 14, 4.38, 4136.91, 13, 0.98, 65147.62, 13, 3.31, 154717.61, 13, 2.11, 1589.07, 13,
                    1.92, 22483.85, 12, 6.03, 9225.54, 12, 1.53, 12559.04, 12, 5.82, 6282.10, 12, 5.61, 5642.20, 12, 2.38,
                    167283.76, 12, 0.39, 12132.44, 12, 3.98, 4686.89, 12, 5.81, 12569.67, 12, 0.56, 5849.36, 11, 0.45, 6172.87, 11,
                    5.80, 16858.48, 11, 6.22, 12146.67, 11, 2.27, 5429.88,
                    435939, 5.784551, 6283.075850, 12363, 5.57935, 12566.15170, 1234, 3.1416, 0.0000, 879, 3.628, 77713.771, 569,
                    1.870, 5573.143, 330, 5.470, 18849.228, 147, 4.480, 5507.553, 110, 2.842, 161000.686, 101, 2.815, 5223.694, 85,
                    3.11, 1577.34, 65, 5.47, 775.52, 61, 1.38, 6438.50, 50, 4.42, 6286.60, 47, 3.66, 7084.90, 46, 5.39, 149854.40,
                    42, 0.90, 10977.08, 40, 3.20, 5088.63, 35, 1.81, 5486.78, 32, 5.35, 3154.69, 30, 3.52, 796.30, 29, 4.62,
                    4690.48, 28, 1.84, 4694.00, 27, 3.14, 71430.70, 27, 6.17, 6836.65, 26, 1.42, 2146.17, 25, 2.81, 1748.02, 24,
                    2.18, 155.42, 23, 4.76, 7234.79, 21, 3.38, 7632.94, 21, 0.22, 4705.73, 20, 4.22, 1349.87, 20, 2.01, 1194.45, 20,
                    4.58, 529.69, 19, 1.59, 6309.37, 18, 5.70, 6040.35, 18, 6.03, 4292.33, 17, 2.90, 9437.76, 17, 2.00, 8031.09, 17,
                    5.78, 83996.85, 16, 0.05, 2544.31, 15, 0.95, 6127.66, 14, 0.36, 10447.39, 14, 1.48, 2352.87, 13, 0.77, 553.57,
                    13, 5.48, 951.72, 13, 5.27, 6279.55, 13, 3.76, 6812.77, 11, 5.41, 6256.78, 10, 0.68, 1592.60, 10, 4.95, 398.15,
                    10, 1.15, 3894.18, 10, 5.20, 244287.60, 10, 1.94, 11856.22, 9, 5.39, 25132.30, 8, 6.18, 1059.38, 8, 0.69,
                    8429.24, 8, 5.85, 242.73, 7, 5.26, 14143.50, 7, 0.52, 801.82, 6, 2.24, 8635.94, 6, 4.00, 13367.97, 6, 2.77,
                    90955.55, 6, 5.17, 7058.60, 5, 1.46, 233141.31, 5, 4.13, 7860.42, 5, 3.91, 26.30, 5, 3.89, 12036.46, 5, 5.58,
                    6290.19, 5, 5.54, 1990.75, 5, 0.83, 11506.77, 5, 6.22, 6681.22, 4, 5.26, 10575.41, 4, 1.91, 7477.52, 4, 0.43,
                    10213.29, 4, 1.09, 709.93, 4, 5.09, 11015.11, 4, 4.22, 88860.06, 4, 3.57, 7079.37, 4, 1.98, 6284.06, 4, 3.93,
                    10973.56, 4, 6.18, 9917.70, 4, 0.36, 10177.26, 4, 2.75, 3738.76, 4, 3.33, 5643.18, 4, 5.36, 25158.60,
                    14459, 4.27319, 6283.07585, 673, 3.917, 12566.152, 77, 0.00, 0.00, 25, 3.73, 18849.23, 4, 2.80, 6286.60,
                    386, 2.564, 6283.076, 31, 2.27, 12566.15, 5, 3.44, 5573.14, 2, 2.05, 18849.23, 1, 2.06, 77713.77, 1, 4.41,
                    161000.69, 1, 3.82, 149854.40, 1, 4.08, 6127.66, 1, 5.26, 6438.50,
                    9, 1.22, 6283.08, 1, 0.66, 12566.15
            ],

            _cacheJD: {},
            _cacheTerms: {},

            nutationLon2: function (t) {
                let a = -1.742 * t;
                const t2 = t * t;
                let dl = 0;
                for (let i = 0, j = this.NUT_B.length; i < j; i += 5) {
                    dl += (this.NUT_B[i + 3] + a) * Math.sin(this.NUT_B[i] + this.NUT_B[i + 1] * t + this.NUT_B[i + 2] * t2);
                    a = 0;
                }
                return dl / 100 / this.SECOND_PER_RAD;
            },

            eLon: function (t, n) {
                t /= 10;
                let v = 0;
                let tn = 1;
                let n1, n2, m, c;
                const pn = 1;
                const m0 = this.XL0[pn + 1] - this.XL0[pn];
                for (let i = 0; i < 6; i++, tn *= t) {
                    n1 = Math.floor(this.XL0[pn + i]);
                    n2 = Math.floor(this.XL0[pn + 1 + i]);
                    const n0 = n2 - n1;
                    if (n0 === 0) {
                        continue;
                    }
                    if (n < 0) {
                        m = n2;
                    } else {
                        m = Math.floor((3 * n * n0 / m0 + 0.5) + n1);
                        if (i !== 0) {
                            m += 3;
                        }
                        if (m > n2) {
                            m = n2;
                        }
                    }
                    c = 0;
                    for (let j = n1; j < m; j += 3) {
                        c += this.XL0[j] * Math.cos(this.XL0[j + 1] + t * this.XL0[j + 2]);
                    }
                    v += c * tn;
                }
                v /= this.XL0[0];
                const t2 = t * t;
                v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t2 * t) / this.SECOND_PER_RAD;
                return v;
            },

            gxcSunLon: function (t) {
                const t2 = t * t;
                const v = -0.043126 + 628.301955 * t - 0.000002732 * t2;
                const e = 0.016708634 - 0.000042037 * t - 0.0000001267 * t2;
                return -20.49552 * (1 + e * Math.cos(v)) / this.SECOND_PER_RAD;
            },

            ev: function (t) {
                const f = 628.307585 * t;
                return 628.332 + 21 * Math.sin(1.527 + f) + 0.44 * Math.sin(1.48 + f * 2) + 0.129 * Math.sin(5.82 + f) * t + 0.00055 * Math.sin(4.21 + f) * t * t;
            },

            saLon: function (t, n) {
                return this.eLon(t, n) + this.nutationLon2(t) + this.gxcSunLon(t) + Math.PI;
            },

            dtExt: function (y, jsd) {
                const dy = (y - 1820) / 100;
                return -20 + jsd * dy * dy;
            },

            dtCalc: function (y) {
                const size = this.DT_AT.length;
                const y0 = this.DT_AT[size - 2];
                const t0 = this.DT_AT[size - 1];
                if (y >= y0) {
                    const jsd = 31;
                    if (y > y0 + 100) {
                        return this.dtExt(y, jsd);
                    }
                    return this.dtExt(y, jsd) - (this.dtExt(y0, jsd) - t0) * (y0 + 100 - y) / 100;
                }
                let i;
                for (i = 0; i < size; i += 5) {
                    if (y < this.DT_AT[i + 5]) {
                        break;
                    }
                }
                const t1 = (y - this.DT_AT[i]) / (this.DT_AT[i + 5] - this.DT_AT[i]) * 10;
                const t2 = t1 * t1;
                const t3 = t2 * t1;
                return this.DT_AT[i + 1] + this.DT_AT[i + 2] * t1 + this.DT_AT[i + 3] * t2 + this.DT_AT[i + 4] * t3;
            },

            dtT: function (t) {
                return this.dtCalc(t / 365.2425 + 2000) / this.SECOND_PER_DAY;
            },

            // 太阳视黄经达到 w 的时刻（J2000 起算的力学时千分年 → 日），两次牛顿迭代
            saLonT: function (w) {
                let t;
                let v = 628.3319653318;
                t = (w - 1.75347 - Math.PI) / v;
                v = this.ev(t);
                t += (w - this.saLon(t, 10)) / v;
                v = this.ev(t);
                t += (w - this.saLon(t, -1)) / v;
                return t;
            },

            // 精确节气（相对 J2000 日数，已减 ΔT 并加 1/3 日换算为北京时）
            qiAccurate: function (w) {
                const t = this.saLonT(w) * 36525;
                return t - this.dtT(t) + this.ONE_THIRD;
            },

            // 由粗值日反推节气黄经，偏差过大则平移一个节气重算（±5 天容差）
            qiAccurate2: function (jd) {
                const d = Math.PI / 12;
                const w = Math.floor((jd + 293) / 365.2422 * 24) * d;
                const a = this.qiAccurate(w);
                if (a - jd > 5) {
                    return this.qiAccurate(w - d);
                }
                if (a - jd < -5) {
                    return this.qiAccurate(w + d);
                }
                return a;
            },

            // 儒略日 -> 公历（北京时），Meeus 标准换算，原样移植自 lunar-javascript
            fromJulianDay: function (julianDay) {
                let d = Math.floor(julianDay + 0.5);
                let f = julianDay + 0.5 - d;
                if (d >= 2299161) {
                    const c = Math.floor((d - 1867216.25) / 36524.25);
                    d += 1 + c - Math.floor(c / 4);
                }
                d += 1524;
                let year = Math.floor((d - 122.1) / 365.25);
                d -= Math.floor(365.25 * year);
                let month = Math.floor(d / 30.601);
                d -= Math.floor(30.601 * month);
                let day = d;
                if (month > 13) {
                    month -= 13;
                    year -= 4715;
                } else {
                    month -= 1;
                    year -= 4716;
                }
                f *= 24;
                let hour = Math.floor(f);
                f -= hour;
                f *= 60;
                let minute = Math.floor(f);
                f -= minute;
                f *= 60;
                let second = Math.round(f);
                if (second > 59) { second -= 60; minute++; }
                if (minute > 59) { minute -= 60; hour++; }
                if (hour > 23) { hour -= 24; day++; }
                return { year: year, month: month, day: day, hour: hour, minute: minute, second: second };
            },

            // 年节气表：26 个绝对儒略日
            // 下标 0=上年大雪, 1=上年冬至, 2..25=本年小寒…冬至
            computeYearJD: function (y) {
                if (this._cacheJD[y]) return this._cacheJD[y];
                const jd0 = Math.floor((y - 2000) * 365.2422 + 180);
                // 355 ≈ 2000 年冬至相对 J2000 的日数，先定位本公历年前最近的冬至
                let w = Math.floor((jd0 - 355 + 183) / 365.2422) * 365.2422 + 355;
                if (w > jd0) w -= 365.2422;
                const jd = new Array(26);
                jd[0] = this.qiAccurate2(w - 15.2184);
                // w 即冬至粗值日：jd[1]=冬至，jd[i] 依次后推一个节气
                for (let i = 1; i <= 25; i++) {
                    jd[i] = this.qiAccurate2(w + 15.2184 * (i - 1));
                }
                const res = jd.map(v => v + this.J2000);
                this._cacheJD[y] = res;
                return res;
            },

            // 本公历年内的 24 节气映射：键 'M-D' -> 节气信息
            getYearTerms: function (y) {
                if (this._cacheTerms[y]) return this._cacheTerms[y];
                const jds = this.computeYearJD(y);
                const map = {};
                for (let i = 2; i <= 25; i++) {
                    const t = this.fromJulianDay(jds[i]);
                    map[t.month + '-' + t.day] = {
                        name: this.NAMES[i - 2],
                        index: i,
                        year: t.year,
                        month: t.month,
                        day: t.day,
                        hour: t.hour,
                        minute: t.minute,
                        date: new Date(t.year, t.month - 1, t.day, t.hour, t.minute, t.second)
                    };
                }
                this._cacheTerms[y] = map;
                return map;
            },

            // 公历日期当天交节则返回节气名，否则 null
            getDayTerm: function (y, m, d) {
                const t = this.getYearTerms(y)[m + '-' + d];
                return t ? t.name : null;
            },

            // 年表下标对应的交节时刻（本地 Date；下标 0/1 为上年末大雪/冬至）
            getTermDate: function (y, index) {
                const t = this.fromJulianDay(this.computeYearJD(y)[index]);
                return new Date(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
            }
        };

        // =============================================================
        // 万年历引擎
        // =============================================================
        const CalendarEngine = {
            lunarInfo: [
                0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
                0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
                0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
                0x06566,0x0d4a0,0x0ea50,0x16a95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
                0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
                0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
                0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
                0x096d0,0x04ddb,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
                0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
                0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
                0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
                0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
                0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
                0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
                0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
            ],
            TIAN_GAN: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
            DI_ZHI: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
            LUNAR_MONTHS: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
            LUNAR_DAYS: ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"],
            
            LUNAR_FESTIVALS: {
                "1-1": "春节", "1-15": "元宵节", "5-5": "端午节", "7-7": "七夕节", 
                "7-15": "中元节", "8-15": "中秋节", "9-9": "重阳节", "12-30": "除夕"
            },

            // 五虎遁：年干 -> 寅月天干（甲己之年丙作首，乙庚戊寅，丙辛庚寅，丁壬壬寅，戊癸甲寅）
            YEAR_TO_MONTH_GAN: [2, 4, 6, 8, 0, 2, 4, 6, 8, 0],

            getDaysOffset: function(year, month, day) {
                let base = new Date(1900, 0, 1);
                let target = new Date(year, month - 1, day);
                return Math.floor((target - base) / 86400000);
            },

            getDayPillar: function(daysOffset, hour) {
                if (hour === 23) { daysOffset += 1; }
                let gan = (daysOffset + 0) % 10; if(gan < 0) gan += 10;
                let zhi = (daysOffset + 10) % 12; if(zhi < 0) zhi += 12;
                return { gan: gan, zhi: zhi, name: this.TIAN_GAN[gan] + this.DI_ZHI[zhi] };
            },

            // 年柱以立春交节时刻为界：交春前仍属上一年干支
            getYearPillar: function(date) {
                const year = date.getFullYear();
                const baziYear = date >= SolarTerms.getTermDate(year, 4) ? year : year - 1;
                let gan = (baziYear - 4) % 10; if (gan < 0) gan += 10;
                let zhi = (baziYear - 4) % 12; if (zhi < 0) zhi += 12;
                return { gan: gan, zhi: zhi, name: this.TIAN_GAN[gan] + this.DI_ZHI[zhi] };
            },

            // 月柱以十二「节」交节时刻为界（不含中气）
            getMonthPillar: function(date, yearGanIndex) {
                const year = date.getFullYear();
                // [年表下标, 月支]：上年大雪起，依次换月
                const JIE_LIST = [[0, 0], [2, 1], [4, 2], [6, 3], [8, 4], [10, 5], [12, 6],
                                  [14, 7], [16, 8], [18, 9], [20, 10], [22, 11], [24, 0]];
                let zhiIndex = 11;
                for (let i = 0; i < JIE_LIST.length; i++) {
                    if (date >= SolarTerms.getTermDate(year, JIE_LIST[i][0])) {
                        zhiIndex = JIE_LIST[i][1];
                    }
                }
                // 寅月为一月：寅=1 … 子=11，丑=12
                const mZhi = (zhiIndex - 2 + 12) % 12 + 1;
                const mGanStart = this.YEAR_TO_MONTH_GAN[yearGanIndex];
                const mGan = (mGanStart + mZhi - 1) % 10;
                return this.TIAN_GAN[mGan] + this.DI_ZHI[zhiIndex];
            },
            
            getTimePillar: function(dayGanIndex, hour) {
                let tZhiIndex = Math.floor((hour + 1) / 2) % 12;
                let tStartGan = (dayGanIndex * 2) % 10;
                let tGan = (tStartGan + tZhiIndex) % 10;
                return this.TIAN_GAN[tGan] + this.DI_ZHI[tZhiIndex];
            },

            solarToLunar: function(year, month, day) {
                let baseDate = new Date(1900, 0, 31);
                let targetDate = new Date(year, month - 1, day);
                let offset = Math.floor((targetDate - baseDate) / 86400000);

                let lunarYear = 1900;
                while (offset >= this.lunarYearDays(lunarYear)) {
                    offset -= this.lunarYearDays(lunarYear);
                    lunarYear++;
                }

                let leap = this.leapMonth(lunarYear);
                let isLeap = false;
                let lunarMonth = 1;
                let daysInMonth;

                for (let i = 1; i <= 12 && offset >= 0; i++) {
                    daysInMonth = this.monthDays(lunarYear, i);
                    if (leap === i) {
                        daysInMonth = this.leapDays(lunarYear);
                        if (offset < daysInMonth) { isLeap = true; lunarMonth = i; break; }
                        offset -= daysInMonth;
                    }
                    if (offset < daysInMonth) { lunarMonth = i; break; }
                    offset -= daysInMonth;
                }
                let lunarDay = offset + 1;
                
                let festival = null;
                let key = `${lunarMonth}-${lunarDay}`;
                if (this.LUNAR_FESTIVALS[key]) { festival = this.LUNAR_FESTIVALS[key]; }

                return {
                    year: lunarYear,
                    monthStr: (isLeap ? "闰" : "") + this.LUNAR_MONTHS[lunarMonth - 1],
                    dayStr: this.LUNAR_DAYS[lunarDay - 1],
                    festival: festival
                };
            },
            
            lunarYearDays: function(y) {
                let sum = 348;
                for (let i = 0x8000; i > 0x8; i >>= 1) sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
                return sum + this.leapDays(y);
            },
            leapMonth: function(y) { return this.lunarInfo[y - 1900] & 0xf; },
            leapDays: function(y) { if (this.leapMonth(y)) return (this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29; return 0; },
            monthDays: function(y, m) { return (this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29; },
        };

        // =============================================================
        // 万年历视图
        // =============================================================
        const CalView = {
            today: new Date(),
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth() + 1,
            currentDay: new Date().getDate(),

            init: function() {
                this.initSelectors();
                this.render(this.currentYear, this.currentMonth, this.currentDay);
                this.bindEvents();
            },

            initSelectors: function() {
                const yearSel = document.getElementById('calSelectYear');
                for (let y = 1900; y <= 2100; y++) {
                    let opt = document.createElement('option');
                    opt.value = y; opt.innerText = y;
                    if (y === this.currentYear) opt.selected = true;
                    yearSel.appendChild(opt);
                }
                const monthSel = document.getElementById('calSelectMonth');
                for (let m = 1; m <= 12; m++) {
                    let opt = document.createElement('option');
                    opt.value = m; opt.innerText = m;
                    if (m === this.currentMonth) opt.selected = true;
                    monthSel.appendChild(opt);
                }
                this.updateDaySelect(this.currentYear, this.currentMonth);
            },

            updateDaySelect: function(year, month) {
                const daySel = document.getElementById('calSelectDay');
                let daysInMonth = new Date(year, month, 0).getDate();
                daySel.innerHTML = '';
                for (let d = 1; d <= daysInMonth; d++) {
                    let opt = document.createElement('option');
                    opt.value = d; opt.innerText = d;
                    if (d === this.currentDay) opt.selected = true;
                    daySel.appendChild(opt);
                }
            },

            refreshBazi: function() {
                let hour = parseInt(document.getElementById('calSelectShiChen').value);
                let daysOffset = CalendarEngine.getDaysOffset(this.currentYear, this.currentMonth, this.currentDay);
                let dayPillarObj = CalendarEngine.getDayPillar(daysOffset, hour);
                // 年柱/月柱按所选时辰的交节边界判定
                let moment = new Date(this.currentYear, this.currentMonth - 1, this.currentDay, hour, 0, 0);
                let yearPillarObj = CalendarEngine.getYearPillar(moment);
                let monthPillar = CalendarEngine.getMonthPillar(moment, yearPillarObj.gan);
                let timePillar = CalendarEngine.getTimePillar(dayPillarObj.gan, hour);

                document.getElementById('calBaziDisplay').innerText = `年: ${yearPillarObj.name}  月: ${monthPillar}  日: ${dayPillarObj.name}  时: ${timePillar}`;
            },

            render: function(year, month, day) {
                const grid = document.getElementById('calGrid');
                grid.innerHTML = '';

                let firstDay = new Date(year, month - 1, 1);
                let startDayOfWeek = firstDay.getDay();
                let daysInMonth = new Date(year, month, 0).getDate();
                let prevMonthDays = new Date(year, month - 1, 0).getDate();

                const lunarInfo = CalendarEngine.solarToLunar(year, month, day);
                document.getElementById('calCurrentDateDisplay').innerHTML = 
                    `农历 ${lunarInfo.year}年 ${lunarInfo.monthStr}月 ${lunarInfo.dayStr} <span class="bazi-tag" id="calBaziDisplay">年: -- 月: -- 日: -- 时: --</span>`;

                this.refreshBazi();

                let totalSlots = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
                let dayCounter = 1;
                let nextMonthDay = 1;

                for (let i = 0; i < totalSlots; i++) {
                    let cell = document.createElement('div');
                    cell.className = 'cal-cell';
                    
                    let dateObj = null;
                    let displayDay = '';
                    let isWeekend = (i % 7 === 0 || i % 7 === 6);

                    if (i < startDayOfWeek) {
                        displayDay = prevMonthDays - startDayOfWeek + i + 1;
                        cell.classList.add('other-month');
                        dateObj = new Date(year, month - 2, displayDay);
                    } else if (dayCounter <= daysInMonth) {
                        displayDay = dayCounter;
                        dateObj = new Date(year, month - 1, displayDay);
                        if (displayDay === day) cell.classList.add('selected');
                        dayCounter++;
                    } else {
                        displayDay = nextMonthDay;
                        cell.classList.add('other-month');
                        dateObj = new Date(year, month, displayDay);
                        nextMonthDay++;
                    }

                    if (isWeekend) cell.classList.add('weekend');

                    const solarYear = dateObj.getFullYear();
                    const solarMonth = dateObj.getMonth() + 1;
                    const solarDay = dateObj.getDate();
                    const lunar = CalendarEngine.solarToLunar(solarYear, solarMonth, solarDay);

                    cell.dataset.year = solarYear;
                    cell.dataset.month = solarMonth;
                    cell.dataset.day = solarDay;

                    let solarSpan = document.createElement('div');
                    solarSpan.className = 'cal-solar-date';
                    solarSpan.innerText = displayDay;
                    cell.appendChild(solarSpan);

                    let lunarSpan = document.createElement('div');
                    lunarSpan.className = 'cal-lunar-date';
                    if (lunar.dayStr === '初一') lunarSpan.innerText = lunar.monthStr + "月";
                    else lunarSpan.innerText = lunar.dayStr;
                    cell.appendChild(lunarSpan);

                    let festivalTag = document.createElement('div');
                    festivalTag.className = 'cal-festival-tag';
                    // 农历节日优先，其次显示当日交节
                    const termName = SolarTerms.getDayTerm(solarYear, solarMonth, solarDay);
                    if (lunar.festival) {
                        festivalTag.className += ' holiday';
                        festivalTag.innerText = lunar.festival;
                    } else if (termName) {
                        festivalTag.className += ' solar-term';
                        festivalTag.innerText = termName;
                    } else {
                        festivalTag.className += ' normal';
                        festivalTag.innerText = '·';
                    }
                    cell.appendChild(festivalTag);
                    
                    cell.addEventListener('click', function() {
                        let y = parseInt(this.dataset.year);
                        let m = parseInt(this.dataset.month);
                        let d = parseInt(this.dataset.day);
                        CalView.selectDate(y, m, d);
                    });

                    grid.appendChild(cell);
                }
            },

            selectDate: function(year, month, day) {
                this.currentYear = year; this.currentMonth = month; this.currentDay = day;
                document.getElementById('calSelectYear').value = year;
                document.getElementById('calSelectMonth').value = month;
                this.updateDaySelect(year, month);
                document.getElementById('calSelectDay').value = day;
                this.render(year, month, day);
            },

            refresh: function() {
                this.render(this.currentYear, this.currentMonth, this.currentDay);
                document.getElementById('calSelectYear').value = this.currentYear;
                document.getElementById('calSelectMonth').value = this.currentMonth;
                this.updateDaySelect(this.currentYear, this.currentMonth);
                document.getElementById('calSelectDay').value = this.currentDay;
            },

            bindEvents: function() {
                document.getElementById('calBtnPrevMonth').addEventListener('click', () => {
                    if (this.currentMonth === 1) { this.currentYear--; this.currentMonth = 12; } 
                    else { this.currentMonth--; }
                    let maxDays = new Date(this.currentYear, this.currentMonth, 0).getDate();
                    if(this.currentDay > maxDays) this.currentDay = maxDays;
                    this.refresh();
                });
                document.getElementById('calBtnNextMonth').addEventListener('click', () => {
                    if (this.currentMonth === 12) { this.currentYear++; this.currentMonth = 1; } 
                    else { this.currentMonth++; }
                    let maxDays = new Date(this.currentYear, this.currentMonth, 0).getDate();
                    if(this.currentDay > maxDays) this.currentDay = maxDays;
                    this.refresh();
                });
                document.getElementById('calBtnToday').addEventListener('click', () => {
                    this.currentYear = this.today.getFullYear();
                    this.currentMonth = this.today.getMonth() + 1;
                    this.currentDay = this.today.getDate();
                    this.refresh();
                });
                document.getElementById('calBtnJumpYear').addEventListener('click', () => {
                    this.currentYear = this.today.getFullYear();
                    this.refresh();
                });
                document.getElementById('calBtnJumpDate').addEventListener('click', () => {
                    const y = parseInt(document.getElementById('calSelectYear').value);
                    const m = parseInt(document.getElementById('calSelectMonth').value);
                    const d = parseInt(document.getElementById('calSelectDay').value);
                    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) { 
                        this.currentYear = y; this.currentMonth = m; this.currentDay = d; this.refresh(); 
                    }
                });
                document.getElementById('calSelectMonth').addEventListener('change', function() {
                    const y = parseInt(document.getElementById('calSelectYear').value);
                    const m = parseInt(this.value);
                    CalView.updateDaySelect(y, m);
                });
                document.getElementById('calSelectShiChen').addEventListener('change', () => {
                    if(this.currentYear && this.currentMonth && this.currentDay) {
                        this.refreshBazi();
                    }
                });
            }
        };

        // =============================================================
        // 万年历初始化
        // =============================================================
        document.addEventListener('DOMContentLoaded', function() {
            CalView.init();
        });
