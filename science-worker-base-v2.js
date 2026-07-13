addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/' || path === '') {
    return serveIndex();
  }

  if (path === '/0001-cell-structure.html') {
    return decompressAndServe(htmlB64_1);
  }
  if (path === '/0002-photosynthesis-respiration.html') {
    return decompressAndServe(htmlB64_2);
  }

  return new Response('Not Found', { status: 404 });
}

function serveIndex() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>科学本体知识预习 - 小高职称备考</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
:root { --primary: #b45309; --primary-light: #d97706; --accent: #dc2626; --success: #16a34a; --warning: #ca8a04; --bg: #1c1917; --bg-card: #292524; --bg-element: #44403c; --text: #fafaf9; --text-muted: #a8a29e; --border: rgba(255,255,255,0.1); --gold: #fbbf24; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { text-align: center; padding: 30px 20px; background: linear-gradient(135deg, rgba(180,83,9,0.2) 0%, rgba(220,38,38,0.2) 100%); border-radius: 16px; margin-bottom: 24px; border: 1px solid var(--border); position: relative; overflow: hidden; }
.header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--accent), var(--gold)); }
.header h1 { font-size: 28px; margin-bottom: 8px; background: linear-gradient(90deg, var(--primary-light), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.header p { color: var(--text-muted); font-size: 14px; }
.status-bar { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.status-item { flex: 1; min-width: 120px; background: var(--bg-card); border-radius: 12px; padding: 16px; border: 1px solid var(--border); text-align: center; }
.status-label { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
.status-value { font-size: 24px; font-weight: 700; color: var(--gold); }
.content-area { background: var(--bg-card); border-radius: 16px; padding: 24px; border: 1px solid var(--border); min-height: 400px; }
.knowledge-card { background: var(--bg-element); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border); border-left: 4px solid var(--primary); }
.knowledge-card h3 { font-size: 18px; margin-bottom: 12px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.knowledge-card p, .knowledge-card ul { font-size: 14px; line-height: 1.8; color: var(--text-muted); }
.quiz-container { margin-top: 24px; }
.quiz-question { background: var(--bg-element); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border); }
.quiz-question h4 { font-size: 16px; margin-bottom: 16px; color: var(--text); }
.question-type { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 12px; }
.type-choice { background: rgba(180,83,9,0.3); color: var(--primary-light); }
.type-true-false { background: rgba(202,138,4,0.3); color: var(--warning); }
.type-fill { background: rgba(22,163,74,0.3); color: var(--success); }
.options { display: flex; flex-direction: column; gap: 10px; }
.option { padding: 12px 16px; background: var(--bg-card); border: 2px solid var(--border); border-radius: 8px; cursor: pointer; transition: all 0.3s; font-size: 14px; }
.option:hover { border-color: var(--primary-light); background: rgba(180,83,9,0.1); }
.option.selected { border-color: var(--primary); background: rgba(180,83,9,0.2); }
.option.correct { border-color: var(--success); background: rgba(22,163,74,0.2); }
.option.wrong { border-color: var(--accent); background: rgba(220,38,38,0.2); }
.true-false-options { display: flex; gap: 16px; }
.tf-option { flex: 1; padding: 16px; background: var(--bg-card); border: 2px solid var(--border); border-radius: 8px; cursor: pointer; text-align: center; font-size: 18px; font-weight: 600; transition: all 0.3s; }
.tf-option:hover { border-color: var(--primary-light); }
.tf-option.selected { border-color: var(--primary); background: rgba(180,83,9,0.2); }
.tf-option.correct { border-color: var(--success); background: rgba(22,163,74,0.2); }
.tf-option.wrong { border-color: var(--accent); background: rgba(220,38,38,0.2); }
.fill-blank { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 16px; line-height: 2; }
.fill-input { width: 150px; padding: 8px 12px; background: var(--bg-card); border: 2px solid var(--border); border-radius: 6px; color: var(--text); font-size: 14px; text-align: center; }
.fill-input:focus { border-color: var(--primary); outline: none; }
.fill-input.correct { border-color: var(--success); background: rgba(22,163,74,0.1); }
.fill-input.wrong { border-color: var(--accent); background: rgba(220,38,38,0.1); }
.btn { padding: 10px 24px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-light); }
.btn-group { display: flex; gap: 12px; margin-top: 20px; justify-content: center; flex-wrap: wrap; }
.feedback { padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 14px; display: none; }
.feedback.show { display: block; }
.feedback.correct { background: rgba(22,163,74,0.2); border: 1px solid var(--success); color: var(--success); }
.feedback.wrong { background: rgba(220,38,38,0.2); border: 1px solid var(--accent); color: var(--accent); }
@media (max-width: 768px) { .container { padding: 12px; } .header h1 { font-size: 22px; } .status-bar { gap: 8px; } .status-item { min-width: 80px; padding: 12px 8px; } .status-value { font-size: 18px; } .match-container { grid-template-columns: 1fr; } .true-false-options { flex-direction: column; } .fill-input { width: 120px; } }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>📚 科学本体知识预习</h1>
    <p>初中科学 · 小高职称备考</p>
  </div>
  <div class="status-bar">
    <div class="status-item"><div class="status-label">总分</div><div class="status-value" id="totalScore">0</div></div>
    <div class="status-item"><div class="status-label">连续答对</div><div class="status-value" id="streak">0</div></div>
    <div class="status-item"><div class="status-label">已完成</div><div class="status-value" id="completed">0</div></div>
    <div class="status-item"><div class="status-label">正确率</div><div class="status-value" id="accuracy">0%</div></div>
  </div>
  <div class="content-area" id="contentArea"></div>
</div>
<script>
let state = { totalScore: 0, streak: 0, completed: 0, correct: 0, currentTab: '初中科学', achievements: [], progress: {} };
function loadState() { const saved = localStorage.getItem('scienceGame'); if (saved) state = {...state, ...JSON.parse(saved)}; updateStatus(); }
function saveState() { localStorage.setItem('scienceGame', JSON.stringify(state)); }
function updateStatus() {
  document.getElementById('totalScore').textContent = state.totalScore;
  document.getElementById('streak').textContent = state.streak;
  document.getElementById('completed').textContent = state.completed;
  const acc = state.completed > 0 ? Math.round(state.correct / state.completed * 100) : 0;
  document.getElementById('accuracy').textContent = acc + '%';
}
function addScore(pts) { state.totalScore += pts; state.streak++; state.correct++; state.completed++; updateStatus(); saveState(); }
const quizBank = {
  '声现象': { knowledge: [{title:'声音的产生',content:'声音是由物体振动产生的。一切发声的物体都在振动，振动停止，发声也停止。'},{title:'声音的传播',content:'声音传播需要介质，固体、液体、气体都能传声。真空不能传声。15℃时空气中的声速为340m/s。'}], quizzes: [
    {type:'choice',question:'关于声现象，下列说法正确的是',options:['声音在真空中传播最快','声音是由物体振动产生的','声音在固体中传播速度比气体慢','只要物体振动我们就能听到声音'],answer:1,explanation:'声音是由物体振动产生的，需要介质传播，真空中不能传声。'},
    {type:'true-false',question:'声音可以在水中传播',answer:true,explanation:'水是液体介质，可以传播声音。'},
    {type:'fill',question:'15℃时空气中的声速为____m/s',answers:['340'],explanation:'15℃时空气中的声速为340m/s。'},
    {type:'choice',question:'下列哪个因素不会影响音调',options:['频率','振动快慢','振幅','声源材料'],answer:2,explanation:'音调由频率决定，振幅影响响度。'}
  ]},
  '光现象': { knowledge: [{title:'光的直线传播',content:'光在同种均匀介质中沿直线传播。应用：影子、日食月食、小孔成像。'},{title:'光的反射',content:'反射光线、入射光线、法线在同一平面内，反射角等于入射角。镜面反射和漫反射都遵循反射定律。'}], quizzes: [
    {type:'choice',question:'下列现象中，属于光的直线传播的是',options:['海市蜃楼','小孔成像','水中倒影','雨后彩虹'],answer:1,explanation:'小孔成像是光沿直线传播的典型例子。'},
    {type:'true-false',question:'镜面反射和漫反射都遵循光的反射定律',answer:true,explanation:'无论是镜面反射还是漫反射，每一条光线都遵循反射定律。'},
    {type:'choice',question:'关于平面镜成像，下列说法错误的是',options:['成正立等大的虚像','像距等于物距','像和物关于镜面对称','平面镜成实像'],answer:3,explanation:'平面镜成的是正立等大的虚像。'},
    {type:'fill',question:'光在真空中的传播速度约为____m/s',answers:['3×10^8','3*10^8','3×108'],explanation:'光速约为3×10^8 m/s。'}
  ]},
  '透镜及其应用': { knowledge: [{title:'凸透镜成像规律',content:'u>2f:倒立缩小实像(照相机); f<u<2f:倒立放大实像(投影仪); u<f:正立放大虚像(放大镜)。'}], quizzes: [
    {type:'choice',question:'照相机利用凸透镜成什么像',options:['正立放大虚像','倒立缩小实像','倒立放大实像','正立等大虚像'],answer:1,explanation:'照相机物距大于2倍焦距，成倒立缩小的实像。'},
    {type:'choice',question:'放大镜是利用凸透镜在什么条件下成像',options:['u>2f','f<u<2f','u=f','u<f'],answer:3,explanation:'放大镜物距小于焦距，成正立放大的虚像。'},
    {type:'true-false',question:'近视眼需要佩戴凹透镜矫正',answer:true,explanation:'近视眼晶状体太厚，像成在视网膜前方，需要凹透镜发散光线。'},
    {type:'fill',question:'投影仪成的是倒立____的实像',answers:['放大'],explanation:'投影仪物距在1倍和2倍焦距之间，成倒立放大的实像。'}
  ]},
  '热现象': { knowledge: [{title:'物态变化',content:'熔化(固→液吸热)、凝固(液→固放热)、汽化(液→气吸热)、液化(气→液放热)、升华(固→气吸热)、凝华(气→固放热)。'}], quizzes: [
    {type:'choice',question:'下列属于凝华现象的是',options:['冬天窗户上的冰花','夏天冰棍冒白气','春天冰雪融化','秋天早晨的露水'],answer:0,explanation:'冰花是水蒸气直接变成固态冰晶，属于凝华。'},
    {type:'true-false',question:'蒸发在任何温度下都能发生',answer:true,explanation:'蒸发是缓慢的汽化现象，在任何温度下都能发生在液体表面。'},
    {type:'choice',question:'晶体熔化的条件是',options:['达到熔点','继续吸热','达到熔点且继续吸热','温度不变'],answer:2,explanation:'晶体熔化需要同时满足两个条件：达到熔点和继续吸热。'},
    {type:'fill',question:'物质从气态直接变为固态的过程叫____',answers:['凝华'],explanation:'气态直接变为固态叫凝华，如水蒸气变成霜。'}
  ]},
  '力与运动': { knowledge: [{title:'牛顿第一定律',content:'一切物体在没有受到力的作用时，总保持静止状态或匀速直线运动状态。这就是惯性。'}], quizzes: [
    {type:'choice',question:'关于惯性，下列说法正确的是',options:['只有运动的物体才有惯性','速度越大惯性越大','质量越大惯性越大','受力越大惯性越大'],answer:2,explanation:'惯性只与质量有关，质量越大惯性越大。'},
    {type:'true-false',question:'物体不受力时一定保持静止',answer:false,explanation:'物体不受力时可能保持静止或匀速直线运动状态。'},
    {type:'choice',question:'下列哪个不是减小摩擦的方法',options:['减小压力','使接触面光滑','加润滑油','增大接触面积'],answer:3,explanation:'摩擦力与接触面积无关。增大接触面积不能减小摩擦。'}
  ]},
  '压强与浮力': { knowledge: [{title:'液体压强',content:'p=ρgh，液体压强只与液体密度和深度有关。'}], quizzes: [
    {type:'choice',question:'潜水员在水中下潜时，受到的压强',options:['变小','变大','不变','先变大后变小'],answer:1,explanation:'根据p=ρgh，深度增加，压强增大。'},
    {type:'true-false',question:'阿基米德原理适用于气体',answer:true,explanation:'阿基米德原理适用于所有流体，包括液体和气体。'},
    {type:'choice',question:'一艘船从河里驶入海里，船身会',options:['上浮一些','下沉一些','不变','无法确定'],answer:0,explanation:'海水密度大于河水，浮力不变时排开体积减小，船上浮一些。'}
  ]},
  '电路基础': { knowledge: [{title:'串联和并联',content:'串联电路中电流处处相等，电压按电阻分配。并联电路中电压处处相等，电流按电阻分配。'}], quizzes: [
    {type:'choice',question:'家庭电路中各用电器之间的连接方式是',options:['串联','并联','混联','无法确定'],answer:1,explanation:'家庭电路中各用电器并联，可以独立工作互不影响。'},
    {type:'true-false',question:'串联电路中电流处处相等',answer:true,explanation:'串联电路中电流只有一条路径，处处相等。'}
  ]},
  '欧姆定律': { knowledge: [{title:'欧姆定律',content:'I=U/R，导体中的电流与电压成正比，与电阻成反比。'}], quizzes: [
    {type:'choice',question:'一段导体两端电压为6V，电流为0.3A，其电阻为',options:['0.05Ω','2Ω','1.8Ω','20Ω'],answer:3,explanation:'R=U/I=6/0.3=20Ω。'},
    {type:'true-false',question:'导体的电阻与电压成正比',answer:false,explanation:'电阻是导体本身的性质，与电压和电流无关。'}
  ]},
  '电功电功率': { knowledge: [{title:'电功率',content:'P=W/t=UI，表示电流做功的快慢。'}], quizzes: [
    {type:'choice',question:'一个标有"220V 40W"的灯泡正常发光时，通过灯丝的电流约为',options:['0.18A','5.5A','220A','40A'],answer:0,explanation:'I=P/U=40/220≈0.18A。'},
    {type:'true-false',question:'电能表是用来测量电功率的仪表',answer:false,explanation:'电能表测量的是电功(消耗的电能)，不是电功率。'}
  ]},
  '电与磁': { knowledge: [{title:'电磁感应',content:'闭合电路的一部分导体在磁场中做切割磁感线运动时，导体中会产生感应电流。'}], quizzes: [
    {type:'choice',question:'发电机的工作原理是',options:['电流的磁效应','电磁感应','通电导体在磁场中受力','磁极间的相互作用'],answer:1,explanation:'发电机利用电磁感应原理将机械能转化为电能。'},
    {type:'true-false',question:'电动机是根据通电线圈在磁场中受力转动的原理制成的',answer:true,explanation:'电动机将电能转化为机械能。'}
  ]},
  '功和机械': { knowledge: [{title:'功和机械能',content:'做功的两个必要因素：作用在物体上的力和物体在力的方向上移动的距离。'}], quizzes: [
    {type:'choice',question:'下列情况中，人对物体做功的是',options:['提着水桶水平行走','举着杠铃不动','推墙墙不动','把书从地上捡起来'],answer:3,explanation:'只有把书从地上捡起来时，力和位移方向一致，做了功。'},
    {type:'true-false',question:'动能和势能统称为机械能',answer:true,explanation:'机械能=动能+势能(包括重力势能和弹性势能)。'}
  ]},
  '密度与浮力': { knowledge: [{title:'密度',content:'ρ=m/V，单位kg/m³或g/cm³。水的密度为1.0×10³kg/m³。'}], quizzes: [
    {type:'choice',question:'一块铁切成两半后，每一半的密度',options:['变为原来一半','变为原来的2倍','不变','无法确定'],answer:2,explanation:'密度是物质的特性，与质量和体积无关。'},
    {type:'true-false',question:'物体的密度越小越容易浮在水面上',answer:false,explanation:'要看物体密度与水的密度比较，不是密度越小越容易浮。空心结构也能浮。'}
  ]},
  '绿色植物': { knowledge: [{title:'植物的光合作用',content:'绿色植物通过叶绿体，利用光能，把CO₂和H₂O转化成储存能量的有机物，并释放O₂。'}], quizzes: [
    {type:'choice',question:'光合作用的场所是',options:['线粒体','叶绿体','细胞核','液泡'],answer:1,explanation:'光合作用在叶绿体中进行。'},
    {type:'true-false',question:'植物只有在白天才进行呼吸作用',answer:false,explanation:'植物时刻都在进行呼吸作用，白天晚上都一样。'}
  ]},
  '人体的系统': { knowledge: [{title:'消化系统',content:'消化道包括口腔、咽、食道、胃、小肠、大肠、肛门。小肠是消化和吸收的主要场所。'}], quizzes: [
    {type:'choice',question:'人体吸收营养物质的主要器官是',options:['胃','大肠','小肠','肝脏'],answer:2,explanation:'小肠很长，内表面积大，有多种消化液，是吸收的主要场所。'},
    {type:'true-false',question:'淀粉在口腔中开始被消化',answer:true,explanation:'唾液中含有唾液淀粉酶，能将淀粉初步分解为麦芽糖。'}
  ]},
  '遗传与变异': { knowledge: [{title:'基因和染色体',content:'DNA是主要的遗传物质，基因是有遗传效应的DNA片段。人类体细胞有23对染色体。'}], quizzes: [
    {type:'choice',question:'人的体细胞中染色体数目为',options:['23条','23对','46条','46对'],answer:1,explanation:'人类体细胞有23对(46条)染色体。'},
    {type:'true-false',question:'基因决定生物的性状',answer:true,explanation:'基因是控制生物性状的基本单位。'}
  ]},
  '生态系统': { knowledge: [{title:'生态系统的组成',content:'包括生物部分(生产者、消费者、分解者)和非生物部分(阳光、空气、水等)。'}], quizzes: [
    {type:'choice',question:'生态系统中生产者主要是指',options:['动物','绿色植物','细菌','真菌'],answer:1,explanation:'绿色植物能通过光合作用制造有机物，是生态系统中的生产者。'},
    {type:'true-false',question:'食物链从消费者开始',answer:false,explanation:'食物链从生产者(绿色植物)开始。'}
  ]},
  '化学反应': { knowledge: [{title:'化学反应基本类型',content:'化合反应(A+B→AB)、分解反应(AB→A+B)、置换反应(A+BC→B+AC)、复分解反应(AB+CD→AD+CB)。'}], quizzes: [
    {type:'choice',question:'2H₂+O₂点燃→2H₂O属于什么反应',options:['分解反应','化合反应','置换反应','复分解反应'],answer:1,explanation:'两种物质生成一种物质，属于化合反应。'},
    {type:'true-false',question:'化学反应前后物质的总质量不变',answer:true,explanation:'质量守恒定律：参加反应的各物质质量总和等于反应后生成的各物质质量总和。'}
  ]},
  '酸碱盐': { knowledge: [{title:'常见的酸和碱',content:'盐酸(HCl)、硫酸(H₂SO₄)是常见的酸。氢氧化钠(NaOH)、氢氧化钙(Ca(OH)₂)是常见的碱。'}], quizzes: [
    {type:'choice',question:'能使紫色石蕊试液变红的是',options:['食盐水','稀盐酸','氢氧化钠溶液','蒸馏水'],answer:1,explanation:'酸性溶液使石蕊变红。'},
    {type:'true-false',question:'pH<7的溶液显酸性',answer:true,explanation:'pH<7酸性，pH=7中性，pH>7碱性。'}
  ]}
};
let currentQuiz = { subject: '', questionIndex: 0, answered: false };
function switchTab(tab) { state.currentTab = tab; document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active')); event.target.classList.add('active'); showSubject(tab); }
function showSubject(subject) {
  currentQuiz.subject = subject; currentQuiz.questionIndex = 0; currentQuiz.answered = false;
  const knowledge = quizBank[subject].knowledge; const quizzes = quizBank[subject].quizzes;
  let html = '<h2 style="margin-bottom:20px;font-size:20px;">' + subject + '</h2>';
  knowledge.forEach(k => { html += '<div class="knowledge-card"><h3>' + k.title + '</h3>' + k.content + '</div>'; });
  html += '<div class="quiz-container"><h2 style="margin:24px 0 16px;font-size:20px;">📝 巩固练习</h2><div id="quizContent"></div></div>';
  document.getElementById('contentArea').innerHTML = html; loadQuestion(subject, 0);
}
function loadQuestion(subject, index) {
  const quizzes = quizBank[subject];
  if (index >= quizzes.quizzes.length) {
    document.getElementById('quizContent').innerHTML = '<div style="text-align:center;padding:40px;"><div style="font-size:48px;margin-bottom:16px;">🎉</div><h3>恭喜完成所有练习！</h3><p style="color:var(--text-muted);margin-top:8px;">继续加油！</p></div>';
    return;
  }
  currentQuiz.questionIndex = index; currentQuiz.answered = false;
  const q = quizzes.quizzes[index];
  let html = '<div class="quiz-question">';
  const typeLabels = {'choice':'<span class="question-type type-choice">选择题</span>','true-false':'<span class="question-type type-true-false">判断题</span>','fill':'<span class="question-type type-fill">填空题</span>'};
  html += (typeLabels[q.type] || '');
  html += '<h4>' + q.question + '</h4>';
  switch(q.type) {
    case 'choice':
      html += '<div class="options">';
      q.options.forEach((opt, i) => { html += '<div class="option" onclick="selectOption(' + i + ')" data-index="' + i + '">' + String.fromCharCode(65+i) + '. ' + opt + '</div>'; });
      html += '</div>'; break;
    case 'true-false':
      html += '<div class="true-false-options">';
      html += '<div class="tf-option" onclick="selectTrueFalse(true)" data-value="true">✔ 正确</div>';
      html += '<div class="tf-option" onclick="selectTrueFalse(false)" data-value="false">✘ 错误</div>';
      html += '</div>'; break;
    case 'fill':
      html += '<div class="fill-blank">';
      const parts = q.question.split('____');
      parts.forEach((part, i) => { html += part; if (i < parts.length - 1) html += '<input type="text" class="fill-input" data-index="' + i + '" placeholder="第'+(i+1)+'空">'; });
      html += '</div>';
      html += '<div class="btn-group"><button class="btn btn-primary" onclick="checkFill()">提交答案</button></div>'; break;
  }
  html += '<div class="feedback" id="feedback"></div></div>';
  document.getElementById('quizContent').innerHTML = html;
  if (q.type === 'choice' || q.type === 'true-false') {
    setTimeout(() => { if (!currentQuiz.answered) loadQuestion(subject, index + 1); }, 2000);
  }
}
function selectOption(index) {
  if (currentQuiz.answered) return; currentQuiz.answered = true;
  const q = quizBank[currentQuiz.subject].quizzes[currentQuiz.questionIndex];
  const options = document.querySelectorAll('.option');
  options.forEach(o => o.classList.remove('selected'));
  options[index].classList.add('selected');
  setTimeout(() => {
    if (index === q.answer) { options[index].classList.add('correct'); showFeedback(true, q.explanation); addScore(10); }
    else { options[index].classList.add('wrong'); options[q.answer].classList.add('correct'); showFeedback(false, q.explanation); state.streak = 0; }
    state.completed++; updateProgress(currentQuiz.subject); updateStatus(); saveState();
    setTimeout(() => loadQuestion(currentQuiz.subject, currentQuiz.questionIndex + 1), 2000);
  }, 500);
}
function selectTrueFalse(value) {
  if (currentQuiz.answered) return; currentQuiz.answered = true;
  const q = quizBank[currentQuiz.subject].quizzes[currentQuiz.questionIndex];
  const options = document.querySelectorAll('.tf-option');
  options.forEach(o => o.classList.remove('selected'));
  const selectedIdx = value ? 0 : 1;
  options[selectedIdx].classList.add('selected');
  setTimeout(() => {
    if (value === q.answer) { options[selectedIdx].classList.add('correct'); showFeedback(true, q.explanation); addScore(10); }
    else { options[selectedIdx].classList.add('wrong'); const correctIdx = q.answer ? 0 : 1; options[correctIdx].classList.add('correct'); showFeedback(false, q.explanation); state.streak = 0; }
    state.completed++; updateProgress(currentQuiz.subject); updateStatus(); saveState();
    setTimeout(() => loadQuestion(currentQuiz.subject, currentQuiz.questionIndex + 1), 2000);
  }, 500);
}
function checkFill() {
  if (currentQuiz.answered) return;
  const q = quizBank[currentQuiz.subject].quizzes[currentQuiz.questionIndex];
  const inputs = document.querySelectorAll('.fill-input');
  let allCorrect = true;
  inputs.forEach((input, i) => {
    const userAnswer = input.value.trim();
    if (userAnswer === q.answers[i]) { input.classList.add('correct'); }
    else { input.classList.add('wrong'); input.value = userAnswer + ' → ' + q.answers[i]; allCorrect = false; }
  });
  currentQuiz.answered = true;
  if (allCorrect) { showFeedback(true, q.explanation); addScore(15); }
  else { showFeedback(false, q.explanation); state.streak = 0; }
  state.completed++; updateProgress(currentQuiz.subject); updateStatus(); saveState();
  setTimeout(() => loadQuestion(currentQuiz.subject, currentQuiz.questionIndex + 1), 2500);
}
function showFeedback(correct, explanation) {
  const fb = document.getElementById('feedback'); if (!fb) return;
  fb.className = 'feedback show ' + (correct ? 'correct' : 'wrong');
  fb.innerHTML = '<strong>' + (correct ? '✅ 正确！' : '❌ 不对') + '</strong><br>' + explanation;
}
function updateProgress(subject) { const total = quizBank[subject].quizzes.length; state.progress[subject] = Math.max(state.progress[subject] || 0, currentQuiz.questionIndex + 1); saveState(); }
loadState(); showSubject('声现象');
</script>
</body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function decompressAndServe(b64str) {
  try {
    const compressed = Uint8Array.from(atob(b64str), c => c.charCodeAt(0));
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(compressed);
    writer.close();
    const readable = ds.readable;
    return new Response(readable, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}

var htmlB64_1 = PLACEHOLDER_HTML1_B64;
var htmlB64_2 = PLACEHOLDER_HTML2_B64;
