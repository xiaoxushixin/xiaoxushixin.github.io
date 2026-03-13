// ===== 八字核心数据 =====
const TIANGAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DIZHI   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SHENGXIAO = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const TIGAN_WX = ['木','木','火','火','土','土','金','金','水','水'];
const DIZHI_WX = ['水','土','木','木','土','火','火','土','金','金','土','水'];
const TIGAN_YY = ['阳','阴','阳','阴','阳','阴','阳','阴','阳','阴'];
const DIZHI_YY = ['阳','阴','阳','阴','阳','阴','阳','阴','阳','阴','阳','阴'];

// 纳音表
const NAYIN = {
  '甲子乙丑':'海中金','丙寅丁卯':'炉中火','戊辰己巳':'大林木','庚午辛未':'路旁土',
  '壬申癸酉':'剑锋金','甲戌乙亥':'山头火','丙子丁丑':'涧下水','戊寅己卯':'城头土',
  '庚辰辛巳':'白蜡金','壬午癸未':'杨柳木','甲申乙酉':'泉中水','丙戌丁亥':'屋上土',
  '戊子己丑':'霹雳火','庚寅辛卯':'松柏木','壬辰癸巳':'长流水','甲午乙未':'沙中金',
  '丙申丁酉':'山下火','戊戌己亥':'平地木','庚子辛丑':'壁上土','壬寅癸卯':'金箔金',
  '甲辰乙巳':'覆灯火','丙午丁未':'天河水','戊申己酉':'大驿土','庚戌辛亥':'钗钏金',
  '壬子癸丑':'桑柘木','甲寅乙卯':'大溪水','丙辰丁巳':'沙中土','戊午己未':'天上火',
  '庚申辛酉':'石榴木','壬戌癸亥':'大海水'
};

const NAYIN_MEANING = {
  '海中金':'深藏不露，温润有余，主稳重内敛',
  '炉中火':'性情刚烈，光明磊落，主热情进取',
  '大林木':'枝繁叶茂，庇荫众人，主宽厚有情',
  '路旁土':'平易近人，踏实勤勉，主勤劳稳健',
  '剑锋金':'锋芒毕露，果断刚毅，主决断有为',
  '山头火':'光辉照远，志向高远，主积极进取',
  '涧下水':'静流深远，随机应变，主灵活聪慧',
  '城头土':'稳固坚实，守正不阿，主诚信厚道',
  '白蜡金':'柔韧可塑，变化多端，主适应力强',
  '杨柳木':'柔顺婀娜，随风摇曳，主柔和变通',
  '泉中水':'源源不断，滋润万物，主聪慧善良',
  '屋上土':'稳重保守，安居守业，主安稳平和',
  '霹雳火':'声势浩大，雷厉风行，主果断威严',
  '松柏木':'高洁坚韧，历久弥坚，主坚毅不拔',
  '长流水':'流而不息，润泽四方，主智慧通达',
  '沙中金':'砥砺成器，历经磨砺，主厚积薄发',
  '山下火':'含而不发，深沉内敛，主沉稳持重',
  '平地木':'根基扎实，广施恩泽，主稳健大方',
  '壁上土':'支撑保护，坚守职责，主负责尽职',
  '金箔金':'光彩照人，华贵显耀，主才华出众',
  '覆灯火':'照明引路，温柔细腻，主善解人意',
  '天河水':'博大精深，包容万物，主胸怀宽广',
  '大驿土':'通达四方，服务众人，主勤劳奉献',
  '钗钏金':'精致华美，玲珑剔透，主聪慧灵秀',
  '桑柘木':'坚韧耐劳，实用有益，主踏实肯干',
  '大溪水':'奔腾不息，气势磅礴，主积极进取',
  '沙中土':'包容广大，含蓄深沉，主宽容大度',
  '天上火':'高远明亮，照耀人间，主光明正大',
  '石榴木':'丰硕甘甜，富有内涵，主充实满足',
  '大海水':'深不可测，浩瀚无边，主智谋深远'
};

// ===== 八字计算函数 =====
function getJDN(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524;
}

function getDayPillar(y, m, d) {
  const jdn = getJDN(y, m, d);
  const base = getJDN(1900, 1, 1);
  const diff = jdn - base;
  const stemIdx = ((diff % 10) + 10) % 10;
  const branchIdx = (((diff + 10) % 12) + 12) % 12;
  return { stem: stemIdx, branch: branchIdx };
}

function getSolarMonth(year, month, day) {
  const boundaries = [
    { m: 2, d: 4,  branch: 2 },
    { m: 3, d: 6,  branch: 3 },
    { m: 4, d: 5,  branch: 4 },
    { m: 5, d: 6,  branch: 5 },
    { m: 6, d: 6,  branch: 6 },
    { m: 7, d: 7,  branch: 7 },
    { m: 8, d: 7,  branch: 8 },
    { m: 9, d: 8,  branch: 9 },
    { m: 10, d: 8, branch: 10 },
    { m: 11, d: 7, branch: 11 },
    { m: 12, d: 7, branch: 0 },
  ];
  
  let currentBranch = 1;
  const dateVal = month * 100 + day;
  
  for (let i = boundaries.length - 1; i >= 0; i--) {
    const b = boundaries[i];
    const bVal = b.m * 100 + b.d;
    if (dateVal >= bVal) {
      currentBranch = b.branch;
      break;
    }
  }
  
  if (month === 1) {
    currentBranch = day >= 6 ? 1 : 0;
  }
  
  return currentBranch;
}

function getYearPillar(year, month, day) {
  let y = year;
  if (month < 2 || (month === 2 && day < 4)) {
    y = year - 1;
  }
  const stemIdx = ((y - 4) % 10 + 10) % 10;
  const branchIdx = ((y - 4) % 12 + 12) % 12;
  return { stem: stemIdx, branch: branchIdx, year: y };
}

function getMonthPillar(yearStemIdx, month, day) {
  const branchIdx = getSolarMonth(0, month, day);
  const monthStemStarts = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const start = monthStemStarts[yearStemIdx];
  const branchToMonthNum = { 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:7, 9:8, 10:9, 11:10, 0:11, 1:12 };
  const monthNum = branchToMonthNum[branchIdx] || 1;
  const stemIdx = (start + (monthNum - 1)) % 10;
  return { stem: stemIdx, branch: branchIdx };
}

function getHourPillar(dayStemIdx, hour) {
  const hourBranch = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];
  const branchIdx = hourBranch[hour] !== undefined ? hourBranch[hour] : 0;
  const hourStemStarts = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const start = hourStemStarts[dayStemIdx];
  const stemIdx = (start + branchIdx) % 10;
  return { stem: stemIdx, branch: branchIdx };
}

function getNayin(stemIdx, branchIdx) {
  const gz = TIANGAN[stemIdx] + DIZHI[branchIdx];
  for (const [key, val] of Object.entries(NAYIN)) {
    if (key.includes(gz)) return val;
  }
  return '未知';
}

function getWuxingClass(wx) {
  return { '木':'wood','火':'fire','土':'earth','金':'metal','水':'water' }[wx] || '';
}

function getWuxingBgClass(wx) {
  return 'bg-' + getWuxingClass(wx);
}

function getDayun(yearStemIdx, yearBranchIdx, monthStemIdx, monthBranchIdx, gender, year, month, day) {
  const isYang = TIGAN_YY[yearStemIdx] === '阳';
  const isMale = gender === 'male';
  const forward = (isYang && isMale) || (!isYang && !isMale);
  const startAge = 3 + (monthBranchIdx % 6);
  
  const dayuns = [];
  for (let i = 0; i < 8; i++) {
    let mStem, mBranch;
    if (forward) {
      mStem   = (monthStemIdx + i + 1) % 10;
      mBranch = (monthBranchIdx + i + 1) % 12;
    } else {
      mStem   = ((monthStemIdx - i - 1) % 10 + 10) % 10;
      mBranch = ((monthBranchIdx - i - 1) % 12 + 12) % 12;
    }
    dayuns.push({
      stem: mStem,
      branch: mBranch,
      startAge: startAge + i * 10,
      endAge: startAge + i * 10 + 9,
      startYear: year + startAge + i * 10
    });
  }
  return { dayuns, startAge };
}

// ===== 八字排盘主函数 =====
function calculateBazi() {
  const year  = parseInt(document.getElementById('year').value);
  const month = parseInt(document.getElementById('month').value);
  const day   = parseInt(document.getElementById('day').value);
  const hour  = parseInt(document.getElementById('hour').value);
  const gender = document.getElementById('gender').value;
  const name  = document.getElementById('baziName').value;
  
  if (!year || !month || !day || isNaN(hour)) {
    alert('请完整填写出生信息！');
    return;
  }
  
  const yearP  = getYearPillar(year, month, day);
  const monthP = getMonthPillar(yearP.stem, month, day);
  const dayP   = getDayPillar(year, month, day);
  const hourP  = getHourPillar(dayP.stem, hour);
  
  const pillars = [
    { label: '年柱', ...yearP },
    { label: '月柱', ...monthP },
    { label: '日柱', ...dayP },
    { label: '时柱', ...hourP },
  ];
  
  const wxCount = { '木':0, '火':0, '土':0, '金':0, '水':0 };
  pillars.forEach(p => {
    wxCount[TIGAN_WX[p.stem]]++;
    wxCount[DIZHI_WX[p.branch]]++;
  });
  
  const riWx = TIGAN_WX[dayP.stem];
  const riWxCount = wxCount[riWx];
  const isStrong = riWxCount >= 3;
  
  const generates = { '木':'火','火':'土','土':'金','金':'水','水':'木' };
  const generated_by = { '木':'水','火':'木','土':'火','金':'土','水':'金' };
  const restrains = { '木':'土','火':'金','土':'水','金':'木','水':'火' };
  
  let yongshen, xishen, jishen;
  if (isStrong) {
    yongshen = restrains[riWx];
    xishen = generates[riWx];
    jishen = generated_by[riWx];
  } else {
    yongshen = generated_by[riWx];
    xishen = riWx;
    jishen = restrains[riWx];
  }
  
  // 渲染结果
  let html = `
    <div class="section-title">✦ 命理排盘</div>
    <div class="wuxing-card" style="margin-bottom:20px;">
      <div class="info-row">
        ${name ? `<div class="info-badge">姓名：<span>${name}</span></div>` : ''}
        <div class="info-badge">出生：<span>${year}年${month}月${day}日</span></div>
        <div class="info-badge">时辰：<span>${DIZHI[hourP.branch]}时</span></div>
        <div class="info-badge">性别：<span>${gender === 'male' ? '男命' : '女命'}</span></div>
        <div class="info-badge">生肖：<span>${SHENGXIAO[yearP.branch]}</span></div>
        <div class="info-badge">日主：<span>${TIANGAN[dayP.stem]}（${riWx}）</span></div>
        <div class="info-badge">身${isStrong?'强':'弱'}：<span>${isStrong?'日主旺相':'日主衰弱'}</span></div>
      </div>
    </div>
    
    <div class="pillars-grid">
  `;
  
  pillars.forEach(p => {
    const stemWx = TIGAN_WX[p.stem];
    const branchWx = DIZHI_WX[p.branch];
    const stemYY = TIGAN_YY[p.stem];
    const branchYY = DIZHI_YY[p.branch];
    const nayin = getNayin(p.stem, p.branch);
    html += `
      <div class="pillar-card">
        <div class="pillar-label">${p.label}</div>
        <div class="pillar-stem ${getWuxingClass(stemWx)}">${TIANGAN[p.stem]}</div>
        <div class="pillar-branch ${getWuxingClass(branchWx)}">${DIZHI[p.branch]}</div>
        <div>
          <span class="pillar-element ${getWuxingBgClass(stemWx)}">${stemWx}${stemYY}</span>
          <span class="pillar-element ${getWuxingBgClass(branchWx)}">${branchWx}${branchYY}</span>
        </div>
        <div class="pillar-shengxiao">${nayin}</div>
        ${p.label === '年柱' ? `<div class="pillar-shengxiao">生肖${SHENGXIAO[p.branch]}</div>` : ''}
      </div>
    `;
  });
  html += '</div>';
  
  // 五行分析
  const total = Object.values(wxCount).reduce((a,b) => a+b, 0);
  const wxArr = ['木','火','土','金','水'];
  const wxColors = { '木':'#5cb85c','火':'#e74c3c','土':'#c9a84c','金':'#bdc3c7','水':'#3498db' };
  
  html += `
    <div class="wuxing-card">
      <div class="section-title">✦ 五行分析</div>
      <div class="wuxing-grid">
  `;
  
  wxArr.forEach(wx => {
    const cnt = wxCount[wx] || 0;
    const pct = Math.round(cnt / total * 100);
    html += `
      <div class="wuxing-item">
        <div class="wuxing-name ${getWuxingClass(wx)}">${wx}</div>
        <div class="wuxing-count ${getWuxingClass(wx)}">${cnt}</div>
        <div class="wuxing-bar-wrap">
          <div class="wuxing-bar" style="width:${pct}%;background:${wxColors[wx]}"></div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-dim)">${pct}%</div>
      </div>
    `;
  });
  
  const maxWx = wxArr.reduce((a,b) => wxCount[a] >= wxCount[b] ? a : b);
  const minWx = wxArr.reduce((a,b) => wxCount[a] <= wxCount[b] ? a : b);
  
  html += `
      </div>
      <div style="font-size:0.88rem;color:var(--text-dim);line-height:1.8;">
        五行中 <strong class="${getWuxingClass(maxWx)}">${maxWx}</strong> 最旺（${wxCount[maxWx]}个），
        <strong class="${getWuxingClass(minWx)}">${minWx}</strong> 最弱（${wxCount[minWx]}个）。
        ${wxCount[minWx] === 0 ? `<strong class="${getWuxingClass(minWx)}">${minWx}</strong> 缺失，需后天多接触${minWx}行相关事物以补充。` : '五行相对平衡。'}
      </div>
    </div>
  `;
  
  // 用神喜神忌神
  const shenData = [
    { label: '用神', value: yongshen, desc: isStrong ? '制化日主' : '扶助日主', color: wxColors[yongshen] },
    { label: '喜神', value: xishen,   desc: '辅助用神', color: wxColors[xishen] },
    { label: '忌神', value: jishen,   desc: '阻碍命运', color: '#666' },
  ];
  
  html += `
    <div class="divider"></div>
    <div class="section-title">✦ 用神 · 喜神 · 忌神</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px;">
  `;
  
  shenData.forEach(s => {
    html += `
      <div class="yongshen-box">
        <div class="yongshen-label">${s.label}</div>
        <div class="yongshen-value" style="color:${s.color}">${s.value}</div>
        <div style="font-size:0.75rem;color:var(--text-dim);margin-top:6px">${s.desc}</div>
      </div>
    `;
  });
  html += '</div>';
  
  // 命理解析
  const riGan = TIANGAN[dayP.stem];
  const traits = {
    '甲': { main: '甲木日主，如参天大树，性情正直豁达，富有进取心与领导力。', career: '适合从政、管理、教育、林业等领域，有大志向且能付诸行动。', love: '感情专一，重感情，但有时过于固执，需学会柔软。' },
    '乙': { main: '乙木日主，如温婉藤蔓，外柔内刚，善于变通，生命力顽强。', career: '适合文艺、教育、医疗、服务行业，善于在夹缝中求生存。', love: '感情细腻，善解人意，但情绪易受外界影响，需保持自我。' },
    '丙': { main: '丙火日主，如炎炎烈日，热情开朗，光明磊落，有感召力。', career: '适合演艺、销售、公关、餐饮等行业，人缘极佳，贵人多助。', love: '感情热烈直接，喜欢主动，但需注意三分钟热度，贵在坚持。' },
    '丁': { main: '丁火日主，如摇曳烛光，聪明细腻，有艺术天赋，情感丰富。', career: '适合设计、文学、心理、咨询等领域，有独特的创意思维。', love: '感情深沉细腻，忠诚专一，但容易钻牛角尖，需开阔心胸。' },
    '戊': { main: '戊土日主，如巍峨高山，稳重可靠，厚道诚实，值得信赖。', career: '适合建筑、房地产、农业、物流等行业，脚踏实地成就事业。', love: '感情稳定踏实，是可靠的伴侣，但需注意表达情感，避免沉默。' },
    '己': { main: '己土日主，如肥沃田园，细心体贴，心思缜密，善于谋划。', career: '适合财务、策划、行政、农业等领域，处事灵活，善于周旋。', love: '感情细心周到，善于照顾他人，但有时过于保守，需勇于表达。' },
    '庚': { main: '庚金日主，如铁骨铮铮，性格刚直，行事果断，重情重义。', career: '适合军警、法律、工程、制造等行业，有魄力，敢于承担责任。', love: '感情刚烈直接，忠诚可靠，但需注意方式方法，多些温柔体贴。' },
    '辛': { main: '辛金日主，如精雕细琢，聪慧灵秀，审美出众，追求完美。', career: '适合艺术、珠宝、医美、精密仪器等领域，注重细节，精益求精。', love: '感情唯美浪漫，对伴侣要求较高，需降低完美主义，包容彼此。' },
    '壬': { main: '壬水日主，如奔腾江河，思维活跃，适应力强，有大格局。', career: '适合金融、贸易、旅游、外交等领域，视野开阔，善于把握机遇。', love: '感情豁达包容，但情感不易专一，需培养稳定感，给伴侣安全感。' },
    '癸': { main: '癸水日主，如涓涓细流，直觉敏锐，内心细腻，善解人意。', career: '适合研究、心理、医疗、哲学等领域，有深刻的洞察力。', love: '感情敏感深沉，善于感知他人情绪，但需建立自我边界，不过度付出。' },
  };
  
  const trait = traits[riGan] || { main: '', career: '', love: '' };
  
  html += `
    <div class="analysis-card">
      <div class="section-title">✦ 命盘解析</div>
      <div class="analysis-section">
        <h3>✦ 日主性格</h3>
        <p>${trait.main}${isStrong ? '八字身强，自信独立，行事主动，适合独当一面。' : '八字身弱，需借助外力，善于合作，做事较为谨慎。'}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 事业方向</h3>
        <p>${trait.career}用神为<strong class="${getWuxingClass(yongshen)}">${yongshen}</strong>，建议从事与${yongshen}行相关的事业。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 感情姻缘</h3>
        <p>${trait.love}</p>
      </div>
    </div>
  `;
  
  // 大运
  const { dayuns, startAge } = getDayun(yearP.stem, yearP.branch, monthP.stem, monthP.branch, gender, year, month, day);
  
  html += `
    <div class="divider"></div>
    <div class="section-title">✦ 大运推算</div>
    <div class="dayun-grid">
      <div class="dayun-item" style="grid-column:1/-1;background:rgba(201,168,76,0.05);">
        <div style="font-size:0.82rem;color:var(--text-dim)">
          起运年龄：<strong style="color:var(--gold)">${startAge}岁</strong>（约${year + startAge}年），
          ${gender==='male'?'男':'女'}命${TIGAN_YY[yearP.stem]==='阳'?'阳':'阴'}年，
          ${TIGAN_YY[yearP.stem]==='阳'&&gender==='male'||TIGAN_YY[yearP.stem]==='阴'&&gender==='female'?'顺排':'逆排'}大运
        </div>
      </div>
  `;
  
  dayuns.forEach(dy => {
    const dyWx1 = TIGAN_WX[dy.stem];
    const dyWx2 = DIZHI_WX[dy.branch];
    const hint = (dyWx1 === yongshen || dyWx2 === yongshen) ? '✦ 吉运' : ((dyWx1 === jishen || dyWx2 === jishen) ? '⚠ 需谨慎' : '平稳');
    html += `
      <div class="dayun-item">
        <div class="dayun-age">${dy.startAge}-${dy.endAge}岁 · ${dy.startYear}年起</div>
        <div class="dayun-gz">
          <span class="${getWuxingClass(dyWx1)}">${TIANGAN[dy.stem]}</span><span class="${getWuxingClass(dyWx2)}">${DIZHI[dy.branch]}</span>
        </div>
        <div class="dayun-hint">${dyWx1}${dyWx2} · ${hint}</div>
      </div>
    `;
  });
  html += '</div>';
  
  html += `
    <div style="margin-top:20px;padding:16px;background:rgba(201,168,76,0.05);border-radius:8px;border:1px solid rgba(201,168,76,0.1);">
      <p style="font-size:0.8rem;color:var(--text-dim);line-height:1.8;text-align:center;">
        ⚠ 命理仅供参考，人生命运由自身努力决定。节气以近似值计算，精确排盘建议咨询专业命理师。
      </p>
    </div>
  `;
  
  const resultsEl = document.getElementById('baziResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 姓名测试 =====
function calculateName() {
  const surname = document.getElementById('surname').value.trim();
  const givenName = document.getElementById('givenName').value.trim();
  const gender = document.getElementById('nameGender').value;
  
  if (!surname || !givenName) {
    alert('请输入完整姓名！');
    return;
  }
  
  const fullName = surname + givenName;
  
  // 简化笔画计算（实际需要康熙字典笔画）
  const strokes = {};
  for (let char of fullName) {
    strokes[char] = char.charCodeAt(0) % 20 + 1;
  }
  
  const surnameStrokes = [...surname].reduce((sum, c) => sum + (strokes[c] || 1), 0);
  const givenStrokes = [...givenName].reduce((sum, c) => sum + (strokes[c] || 1), 0);
  const totalStrokes = surnameStrokes + givenStrokes;
  
  // 三才五格
  const tiange = surnameStrokes + 1;
  const renge = surnameStrokes + (strokes[givenName[0]] || 1);
  const dige = givenStrokes;
  const waige = totalStrokes - renge + 1;
  const zongge = totalStrokes;
  
  // 打分（简化）
  const score = 60 + Math.floor((tiange + renge + dige) % 40);
  
  let rating = '中等';
  if (score >= 90) rating = '极佳';
  else if (score >= 80) rating = '优秀';
  else if (score >= 70) rating = '良好';
  
  let html = `
    <div class="name-score">
      <div class="score-label">综合评分</div>
      <div class="score">${score}</div>
      <div class="score-label">评级：${rating}</div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 三才五格分析</div>
      <div class="grid-2">
        <div>
          <div class="analysis-section">
            <h3>✦ 天格 ${tiange}画</h3>
            <p>代表先天运势，由姓氏决定，影响早年运程。</p>
          </div>
          <div class="analysis-section">
            <h3>✦ 人格 ${renge}画</h3>
            <p>代表主运，影响中年时期（25-50岁）的性格与命运。</p>
          </div>
          <div class="analysis-section">
            <h3>✦ 地格 ${dige}画</h3>
            <p>代表前运，影响青少年时期的性格与人际关系。</p>
          </div>
        </div>
        <div>
          <div class="analysis-section">
            <h3>✦ 外格 ${waige}画</h3>
            <p>代表副运，影响社交能力与他人对你的印象。</p>
          </div>
          <div class="analysis-section">
            <h3>✦ 总格 ${zongge}画</h3>
            <p>代表后运，影响中年之后（50岁以后）的命运。</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 姓名解析</div>
      <div class="analysis-section">
        <h3>✦ 音律美感</h3>
        <p>姓名"${fullName}"读音${['优美流畅','和谐动听','朗朗上口'][score % 3]}，声调搭配合理，易于记忆传播。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 字形结构</h3>
        <p>字形结构${['匀称优美','工整大方','清秀端庄'][score % 3]}，书写流畅，视觉效果良好。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 吉祥寓意</h3>
        <p>此名${score >= 80 ? '寓意吉祥，暗含福禄，有助于人生顺遂，事业发展' : '寓意平和，踏实稳健，适合稳步发展'}。</p>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('nameResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 观音灵签 =====
const GUANYIN_SIGNS = [
  { num: 1, level: '上上签', title: '开天辟地', content: '混沌初开天地分，乾坤定位日月明。福禄寿全人钦敬，富贵荣华播远名。', meaning: '此签大吉，万事如意，求谋遂心，名利双收。', advice: '抓住机遇，勇往直前，必有大成。' },
  { num: 9, level: '上签', title: '云开见日', content: '守得云开见日时，否极泰来喜可期。命中若遇贵人助，百般如意自称心。', meaning: '苦尽甘来，困境将过，贵人相助，前程光明。', advice: '守正待时，坚持不懈，曙光在前。' },
  { num: 18, level: '中签', title: '稳步前行', content: '平地起风波未定，暂且停舟待好风。他日天晴云散尽，一帆风顺到江东。', meaning: '目前有阻，暂缓为宜，静待时机，自有转机。', advice: '勿急躁冒进，耐心等待，时机成熟再动。' },
  { num: 27, level: '中平', title: '守成为上', content: '守旧安然无大喜，如风吹草不能深。虽然财利无增减，凡事平平度光阴。', meaning: '平稳度日，无大喜大悲，守成即可，不宜大动。', advice: '安分守己，稳扎稳打，切忌冒险。' },
  { num: 36, level: '下签', title: '波折重重', content: '山重水复路难行，险滩暗礁处处生。若得贵人来指点，或有柳暗花明时。', meaning: '困难重重，阻碍多多，需求助他人，方能化险为夷。', advice: '谦虚求助，放低姿态，借助外力度过难关。' },
  { num: 45, level: '上上签', title: '春暖花开', content: '春来花发映阳红，万物生辉庆大同。贵人提携多得利，谋望从心事事通。', meaning: '春风得意，万事亨通，有贵人扶持，心想事成。', advice: '积极进取，把握良机，大展宏图。' },
  { num: 54, level: '中上签', title: '蛟龙得水', content: '蛟龙得水上天池，变化由来不可知。一朝风云际会合，满门福禄自然齐。', meaning: '时来运转，机遇降临，施展才华，飞黄腾达。', advice: '审时度势，顺势而为，大有可为。' },
  { num: 63, level: '中签', title: '修心养性', content: '劝君耐守旧生涯，把定身心莫听邪。待等时来龙虎榜，一朝荣显耀光华。', meaning: '暂守本分，修身养性，时机未到，切勿妄动。', advice: '充实自己，等待时机，厚积薄发。' },
  { num: 72, level: '上签', title: '鱼跃龙门', content: '龙门一跃便腾空，万里云霄任往来。若得此签为吉兆，他日定作栋梁材。', meaning: '鱼跃龙门，飞黄腾达，前程似锦，功名显赫。', advice: '全力以赴，奋勇拼搏，成就在即。' },
  { num: 81, level: '中平', title: '平步青云', content: '君今百事且随缘，如水行舟听自然。切莫私心妄生事，秋来自有好因缘。', meaning: '顺其自然，随遇而安，勿强求，自有缘分。', advice: '放平心态，顺应天时，水到渠成。' },
  { num: 90, level: '上上签', title: '凤鸣岐山', content: '凤鸣岐山天下知，安邦定国显英姿。若得此签为上吉，功名富贵两相宜。', meaning: '天降祥瑞，大展宏图，名利双收，福禄无边。', advice: '大胆施为，开创事业，必成大器。' },
  { num: 99, level: '上签', title: '百事大吉', content: '财利双丰百事兴，凡谋事事庆称心。诸般好事如春雨，福禄财源四季临。', meaning: '万事大吉，心想事成，财源广进，福禄绵长。', advice: '珍惜福分，广结善缘，福泽深厚。' }
];

function drawSign() {
  const btn = document.getElementById('signStick');
  btn.style.animation = 'none';
  setTimeout(() => {
    btn.style.animation = 'shake 0.5s';
  }, 10);
  
  setTimeout(() => {
    const sign = GUANYIN_SIGNS[Math.floor(Math.random() * GUANYIN_SIGNS.length)];
    
    let html = `
      <div class="sign-result">
        <div class="sign-number">第 ${sign.num} 签 · ${sign.level}</div>
        <div class="analysis-card">
          <div class="section-title">✦ ${sign.title}</div>
          <div class="analysis-section">
            <h3>✦ 签文</h3>
            <p style="font-size:1.1rem;line-height:2;text-align:center;color:var(--gold);">${sign.content}</p>
          </div>
          <div class="analysis-section">
            <h3>✦ 签解</h3>
            <p>${sign.meaning}</p>
          </div>
          <div class="analysis-section">
            <h3>✦ 建议</h3>
            <p>${sign.advice}</p>
          </div>
        </div>
      </div>
    `;
    
    const resultsEl = document.getElementById('signResults');
    resultsEl.innerHTML = html;
    resultsEl.style.display = 'block';
    resultsEl.scrollIntoView({ behavior: 'smooth' });
  }, 600);
}

// 抖动动画
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    75% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);

// ===== 周易占卜 =====
const BAGUA_NAMES = ['乾','兑','离','震','巽','坎','艮','坤'];
const BAGUA_ATTR = ['天','泽','火','雷','风','水','山','地'];
const BAGUA_WX = ['金','金','火','木','木','水','土','土'];

const LIUSHISI_GUA = {
  '111111': { name: '乾为天', meaning: '刚健中正，自强不息', advice: '大吉大利，积极进取，但需防骄傲自满' },
  '000000': { name: '坤为地', meaning: '厚德载物，顺势而为', advice: '宜守不宜攻，顺应环境，厚积薄发' },
  '100010': { name: '水雷屯', meaning: '万事起头难', advice: '初期多阻，需耐心积累，切勿急躁' },
  '010001': { name: '山水蒙', meaning: '童蒙待启', advice: '虚心求学，不耻下问，方能有成' },
  '111010': { name: '水天需', meaning: '待时而动', advice: '时机未到，耐心等待，养精蓄锐' },
  '010111': { name: '天水讼', meaning: '争执不休', advice: '慎防官司口舌，和为贵，退一步海阔天空' },
  '010000': { name: '地水师', meaning: '行军布阵', advice: '需有组织，统筹规划，众志成城' },
  '000010': { name: '水地比', meaning: '亲比辅佐', advice: '团结合作，互相扶持，共克时艰' }
};

function calculateYijing() {
  const question = document.getElementById('yijingQuestion').value.trim();
  
  if (!question) {
    alert('请输入您要占卜的问题！');
    return;
  }
  
  // 随机生成上下卦
  const shangGua = Math.floor(Math.random() * 8);
  const xiaGua = Math.floor(Math.random() * 8);
  
  // 生成六爻（简化版）
  const yaoLines = [];
  for (let i = 0; i < 6; i++) {
    yaoLines.push(Math.random() > 0.5 ? 1 : 0);
  }
  
  const guaCode = yaoLines.join('');
  const guaInfo = LIUSHISI_GUA[guaCode] || { 
    name: `${BAGUA_NAMES[shangGua]}${BAGUA_ATTR[shangGua]} ${BAGUA_NAMES[xiaGua]}${BAGUA_ATTR[xiaGua]}`,
    meaning: `上卦为${BAGUA_NAMES[shangGua]}（${BAGUA_ATTR[shangGua]}·${BAGUA_WX[shangGua]}），下卦为${BAGUA_NAMES[xiaGua]}（${BAGUA_ATTR[xiaGua]}·${BAGUA_WX[xiaGua]}）`,
    advice: '此卦需结合具体情况分析，建议咨询专业易学老师'
  };
  
  let html = `
    <div class="analysis-card">
      <div class="section-title">✦ 您的问题</div>
      <p style="font-size:1.1rem;color:var(--gold);text-align:center;padding:20px;">${question}</p>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 卦象</div>
      <div class="gua-container">
        <div class="gua-item">
          <div class="gua-lines">
  `;
  
  // 绘制六爻（从下到上）
  for (let i = 5; i >= 0; i--) {
    html += `<div class="gua-line ${yaoLines[i] === 1 ? '' : 'broken'}"></div>`;
  }
  
  html += `
          </div>
          <div class="gua-name">${guaInfo.name}</div>
          <div class="gua-label">本卦</div>
        </div>
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 卦辞解析</div>
      <div class="analysis-section">
        <h3>✦ 卦意</h3>
        <p>${guaInfo.meaning}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 建议</h3>
        <p>${guaInfo.advice}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 详解</h3>
        <p>此卦对于您所问"${question}"，暗示${['顺势而为，不可强求','需谨慎行事，三思而后行','时机成熟，可积极进取'][Math.floor(Math.random()*3)]}。${['近期宜守不宜攻，静观其变','可适度尝试，但需留有余地','大胆施为，天时地利人和'][Math.floor(Math.random()*3)]}。</p>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('yijingResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 合婚测算 =====
function calculateMarriage() {
  const maleYear = parseInt(document.getElementById('maleYear').value);
  const maleMonth = parseInt(document.getElementById('maleMonth').value);
  const maleDay = parseInt(document.getElementById('maleDay').value);
  const maleHour = parseInt(document.getElementById('maleHour').value);
  
  const femaleYear = parseInt(document.getElementById('femaleYear').value);
  const femaleMonth = parseInt(document.getElementById('femaleMonth').value);
  const femaleDay = parseInt(document.getElementById('femaleDay').value);
  const femaleHour = parseInt(document.getElementById('femaleHour').value);
  
  if (!maleYear || !maleMonth || !maleDay || !femaleYear || !femaleMonth || !femaleDay) {
    alert('请完整填写双方出生信息！');
    return;
  }
  
  // 简化：计算生肖、纳音、五行匹配度
  const maleYearP = getYearPillar(maleYear, maleMonth, maleDay);
  const femaleYearP = getYearPillar(femaleYear, femaleMonth, femaleDay);
  
  const maleShengxiao = SHENGXIAO[maleYearP.branch];
  const femaleShengxiao = SHENGXIAO[femaleYearP.branch];
  
  // 生肖相合相冲（简化）
  const compatible = Math.abs(maleYearP.branch - femaleYearP.branch);
  let shengxiaoScore = 50;
  if (compatible === 0) shengxiaoScore = 60; // 同生肖
  else if (compatible === 4 || compatible === 8) shengxiaoScore = 90; // 三合
  else if (compatible === 6) shengxiaoScore = 30; // 相冲
  else shengxiaoScore = 70;
  
  // 纳音
  const maleNayin = getNayin(maleYearP.stem, maleYearP.branch);
  const femaleNayin = getNayin(femaleYearP.stem, femaleYearP.branch);
  
  // 综合评分
  const totalScore = Math.floor((shengxiaoScore + 60 + Math.random() * 20));
  
  let rating = '一般';
  if (totalScore >= 90) rating = '天作之合';
  else if (totalScore >= 80) rating = '相配';
  else if (totalScore >= 70) rating = '较合';
  else if (totalScore >= 60) rating = '中等';
  
  let html = `
    <div class="analysis-card" style="text-align:center;">
      <div class="section-title">✦ 合婚评分</div>
      <div style="position:relative;width:200px;height:200px;margin:30px auto;">
        <svg width="200" height="200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.1)" stroke-width="20"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#c9a84c" stroke-width="20" 
                  stroke-dasharray="${2 * Math.PI * 80}" 
                  stroke-dashoffset="${2 * Math.PI * 80 * (1 - totalScore/100)}"
                  style="transform:rotate(-90deg);transform-origin:100px 100px;"/>
        </svg>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
          <div style="font-size:3rem;font-weight:700;color:var(--gold);line-height:1;">${totalScore}</div>
          <div style="font-size:0.85rem;color:var(--text-dim);margin-top:5px;">分</div>
        </div>
      </div>
      <div style="font-size:1.2rem;color:var(--gold);margin-top:20px;">评级：${rating}</div>
    </div>
    
    <div class="grid-2">
      <div class="analysis-card">
        <div class="section-title">✦ 男方</div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">生肖：<span>${maleShengxiao}</span></div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">纳音：<span>${maleNayin}</span></div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">出生：<span>${maleYear}年${maleMonth}月${maleDay}日</span></div>
      </div>
      <div class="analysis-card">
        <div class="section-title">✦ 女方</div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">生肖：<span>${femaleShengxiao}</span></div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">纳音：<span>${femaleNayin}</span></div>
        <div class="info-badge" style="display:block;text-align:center;margin:10px 0;">出生：<span>${femaleYear}年${femaleMonth}月${femaleDay}日</span></div>
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 详细分析</div>
      <div class="analysis-section">
        <h3>✦ 生肖配对</h3>
        <p>${maleShengxiao}与${femaleShengxiao}，${shengxiaoScore >= 80 ? '生肖相合，性格互补，感情融洽' : shengxiaoScore >= 60 ? '生肖平和，需互相理解包容' : '生肖有冲，需多沟通化解矛盾'}。评分：${shengxiaoScore}分。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 纳音分析</h3>
        <p>男方${maleNayin}，${NAYIN_MEANING[maleNayin] || ''}；女方${femaleNayin}，${NAYIN_MEANING[femaleNayin] || ''}。双方${maleNayin === femaleNayin ? '纳音相同，志趣相投' : '纳音互异，各有所长，可互补不足'}。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 婚姻建议</h3>
        <p>${totalScore >= 80 ? '双方八字相配度高，感情基础良好，婚后幸福美满。建议多沟通交流，共同成长。' : totalScore >= 60 ? '双方有缘分，但需要双方共同努力经营。建议多理解包容，培养共同兴趣。' : '双方需要更多了解和磨合。建议先深入交往，确认感情稳固后再做决定。'}珍惜缘分，相互扶持，白头偕老。</p>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('marriageResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 生肖运势 =====
const SHENGXIAO_FORTUNE = {
  '鼠': { career: '事业运势佳，贵人多助，把握机遇可有突破。', wealth: '财运旺盛，正财偏财皆有，但需防小人破财。', love: '桃花运旺，单身者有望遇良缘，有伴者感情升温。', health: '整体健康，注意作息规律，多运动少熬夜。', lucky: '3、5、7', color: '蓝色、金色', dir: '东北、西北' },
  '牛': { career: '稳扎稳打，虽进展缓慢但根基牢固，贵在坚持。', wealth: '财运平稳，收入稳定，适合长期投资理财。', love: '感情稳定，需多沟通表达，避免误会产生。', health: '注意肠胃消化，饮食清淡，保持良好习惯。', lucky: '1、4、9', color: '黄色、绿色', dir: '东南、正北' },
  '虎': { career: '冲劲十足，勇往直前，但需防冲动误事。', wealth: '财运波动大，有横财运，但需谨慎投资。', love: '热情如火，感情进展迅速，但需注意平衡。', health: '精力旺盛，但需防意外伤害，出行注意安全。', lucky: '2、7、8', color: '红色、橙色', dir: '正东、西南' },
  '兔': { career: '贵人相助，机遇多多，温和处事可成大事。', wealth: '财运亨通，多方进财，但需防被骗。', love: '桃花朵朵，魅力四射，但需擦亮双眼。', health: '身体康健,保持乐观心态，定期体检。', lucky: '3、4、6', color: '粉色、白色', dir: '正东、正南' },
  '龙': { career: '龙腾四海，大展宏图，领导力强，事业有成。', wealth: '财运极佳，财源广进，投资理财皆宜。', love: '魅力非凡，追求者众，但需专一用情。', health: '精力充沛，但需防过度劳累，适当休息。', lucky: '1、6、7', color: '金色、银色', dir: '西北、正西' },
  '蛇': { career: '智谋过人，步步为营，适合策划运筹。', wealth: '财运不错，善于理财，可有意外之财。', love: '神秘魅力，感情深沉，忠诚专一。', health: '注意保暖，防寒湿入侵，多晒太阳。', lucky: '2、8、9', color: '红色、黑色', dir: '东南、西南' },
  '马': { career: '奔腾不息，积极进取，适合开拓创新。', wealth: '财运旺盛，奔波劳碌，但收获颇丰。', love: '热情奔放，感情真挚，但需稳定。', health: '活力四射，多运动健身，保持体态。', lucky: '2、3、7', color: '绿色、红色', dir: '正南、西南' },
  '羊': { career: '温和待人，团队合作，适合辅佐他人。', wealth: '财运平稳，细水长流，积少成多。', love: '温柔体贴，家庭和睦，感情美满。', health: '体质偏弱，需加强锻炼，注意保暖。', lucky: '3、4、9', color: '绿色、紫色', dir: '正南、东南' },
  '猴': { career: '聪明机智，灵活变通，善于把握时机。', wealth: '财运波动，善于投机，但需适可而止。', love: '花心多变，桃花多多，需专一对待。', health: '活泼好动，注意安全，防跌打损伤。', lucky: '4、5、9', color: '白色、金色', dir: '西南、西北' },
  '鸡': { career: '勤奋努力，认真负责，可有好成绩。', wealth: '财运亨通，勤劳致富，正财为主。', love: '挑剔完美，标准较高，需放宽心态。', health: '早睡早起，规律作息，身体健康。', lucky: '5、7、8', color: '黄色、白色', dir: '正西、西南' },
  '狗': { career: '忠诚可靠，任劳任怨，深得上司信任。', wealth: '财运平稳，踏实赚钱，积蓄丰厚。', love: '忠诚专一，感情稳定，家庭和睦。', health: '身体健康，但需防焦虑，放松心情。', lucky: '3、4、9', color: '红色、绿色', dir: '正东、东南' },
  '猪': { career: '踏实肯干，福分深厚，可得贵人相助。', wealth: '财运极佳，财源滚滚，生活富足。', love: '真诚善良，感情顺利，易得良缘。', health: '注意饮食节制，多运动，保持体型。', lucky: '2、5、8', color: '黑色、灰色', dir: '正北、西北' }
};

function calculateShengxiao() {
  const sx = document.getElementById('shengxiaoSelect').value;
  const fortune = SHENGXIAO_FORTUNE[sx];
  
  const currentYear = new Date().getFullYear();
  
  let html = `
    <div class="analysis-card" style="text-align:center;">
      <div style="font-size:4rem;margin:20px 0;">🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷'[SHENGXIAO.indexOf(sx)]</div>
      <div style="font-size:2rem;color:var(--gold);font-weight:700;">生肖${sx}</div>
      <div style="font-size:1rem;color:var(--text-dim);margin-top:10px;">${currentYear}年运势</div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 各方面运势</div>
      <div class="analysis-section">
        <h3>✦ 事业运</h3>
        <p>${fortune.career}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 财运</h3>
        <p>${fortune.wealth}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 感情运</h3>
        <p>${fortune.love}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 健康运</h3>
        <p>${fortune.health}</p>
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 吉祥助运</div>
      <div class="lucky-grid">
        <div class="lucky-item">
          <div class="l-label">幸运数字</div>
          <div class="l-value">${fortune.lucky}</div>
        </div>
        <div class="lucky-item">
          <div class="l-label">幸运颜色</div>
          <div class="l-value">${fortune.color}</div>
        </div>
        <div class="lucky-item">
          <div class="l-label">幸运方位</div>
          <div class="l-value">${fortune.dir}</div>
        </div>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('shengxiaoResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 号码吉凶 =====
function calculatePhone() {
  const phone = document.getElementById('phoneNumber').value.trim();
  
  if (!/^\d{11}$/.test(phone)) {
    alert('请输入正确的11位手机号！');
    return;
  }
  
  // 尾数吉凶（简化版）
  const lastFour = phone.slice(-4);
  const sum = lastFour.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const num81 = sum % 81 || 81;
  
  const ji81 = {
    1: { level: '大吉', meaning: '万事顺意，功成名就' },
    3: { level: '大吉', meaning: '根深蒂固，蒸蒸日上' },
    5: { level: '大吉', meaning: '阴阳和合，精神愉快' },
    6: { level: '大吉', meaning: '天时地利，富贵荣达' },
    7: { level: '吉', meaning: '精力旺盛，头脑灵活' },
    8: { level: '吉', meaning: '努力发达，贯彻志望' },
    11: { level: '大吉', meaning: '草木逢春，枝叶沾露' },
    13: { level: '大吉', meaning: '天赋吉运，能得人望' },
    15: { level: '大吉', meaning: '谦恭做事，必得人和' },
    16: { level: '大吉', meaning: '能获众望，成就大业' },
    17: { level: '吉', meaning: '排除万难，有贵人助' },
    18: { level: '吉', meaning: '经商做事，顺利昌隆' },
    21: { level: '大吉', meaning: '专心经营，善用智慧' },
    23: { level: '大吉', meaning: '旭日东升，名显四方' },
    24: { level: '大吉', meaning: '锦绣前程，须靠自力' },
    25: { level: '吉', meaning: '天时地利，只欠人和' },
    29: { level: '吉', meaning: '智谋兼备，成就大业' },
    31: { level: '大吉', meaning: '此数大吉，名利双收' },
    32: { level: '大吉', meaning: '龙池得水，一跃冲天' },
    33: { level: '大吉', meaning: '功威智谋，财力俱备' },
    35: { level: '吉', meaning: '处事严谨，进退保守' },
    37: { level: '大吉', meaning: '逢凶化吉，风调雨顺' },
    39: { level: '大吉', meaning: '云开见月，虽有劳苦' },
    41: { level: '大吉', meaning: '天赋吉运，德望兼备' },
    45: { level: '大吉', meaning: '顺风扬帆，新生泰和' },
    47: { level: '大吉', meaning: '有贵人助，可成大业' },
    48: { level: '吉', meaning: '美花丰实，鹤立鸡群' },
    52: { level: '吉', meaning: '先见之明，理想实现' },
    57: { level: '吉', meaning: '努力经营，时来运转' },
    63: { level: '吉', meaning: '万物化育，繁荣之象' },
    65: { level: '大吉', meaning: '吉运自来，能享盛名' },
    67: { level: '大吉', meaning: '天时地利，顺水行舟' },
    68: { level: '大吉', meaning: '思虑周祥，计划力行' },
    81: { level: '大吉', meaning: '最极之数，还本归元' }
  };
  
  const result = ji81[num81] || { level: '中平', meaning: '吉凶参半，需谨慎行事' };
  const score = result.level.includes('大吉') ? 95 : result.level === '吉' ? 82 : 65;
  
  let html = `
    <div class="analysis-card" style="text-align:center;">
      <div style="font-size:2.5rem;color:var(--gold);font-weight:700;margin:20px 0;">${phone}</div>
      <div style="font-size:1.5rem;color:var(--text-dim);">综合评分：<span style="color:var(--gold)">${score}分</span></div>
      <div style="font-size:1.2rem;margin:15px 0;padding:10px 20px;background:rgba(201,168,76,0.1);border-radius:8px;display:inline-block;">
        ${result.level}
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 号码分析</div>
      <div class="analysis-section">
        <h3>✦ 尾数吉凶</h3>
        <p>尾数${lastFour}，数理为${num81}，${result.meaning}。</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 综合评价</h3>
        <p>${score >= 90 ? '此号码极佳，大吉大利，有助事业财运，建议长期使用。' : score >= 80 ? '此号码吉利，运势平稳向上，可长期使用。' : '此号码平平，无大吉大凶，若有更好选择可考虑更换。'}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 使用建议</h3>
        <p>号码能量影响有限，关键在于个人努力。保持积极心态，善待他人，自然好运常伴。${result.level.includes('吉') ? '此号助力，更需珍惜。' : '若求更吉，可参考其他号码。'}</p>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('phoneResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// ===== 黄历查询 =====
const TIANGAN_SHORT = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DIZHI_SHORT = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

const JIANCHU = ['建','除','满','平','定','执','破','危','成','收','开','闭'];
const ERSHIBASU = ['角','亢','氐','房','心','尾','箕','斗','牛','女','虚','危','室','壁','奎','娄','胃','昴','毕','觜','参','井','鬼','柳','星','张','翼','轸'];

function calculateHuangli() {
  const dateStr = document.getElementById('huangliDate').value;
  if (!dateStr) {
    alert('请选择日期！');
    return;
  }
  
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const yearP = getYearPillar(year, month, day);
  const monthP = getMonthPillar(yearP.stem, month, day);
  const dayP = getDayPillar(year, month, day);
  
  const ganzhiYear = TIANGAN[yearP.stem] + DIZHI[yearP.branch];
  const ganzhiMonth = TIANGAN[monthP.stem] + DIZHI[monthP.branch];
  const ganzhiDay = TIANGAN[dayP.stem] + DIZHI[dayP.branch];
  
  const shengxiao = SHENGXIAO[yearP.branch];
  
  // 建除十二神（简化）
  const jc = JIANCHU[day % 12];
  
  // 二十八宿（简化）
  const xiu = ERSHIBASU[day % 28];
  
  // 宜忌（简化示例）
  const yiList = ['祭祀','祈福','求嗣','开光','出行','解除','伐木','修造','动土','移徙','入宅','安床','开市','交易','立券','栽种'];
  const jiList = ['嫁娶','安葬','破土','行丧','作灶','开渠','造船','伐木','造庙','谢土','修坟'];
  
  const yi = [];
  const ji = [];
  for (let i = 0; i < 5; i++) {
    yi.push(yiList[(day * 3 + i) % yiList.length]);
    ji.push(jiList[(day * 2 + i) % jiList.length]);
  }
  
  // 吉神凶煞
  const jishen = ['天德','月德','天恩','三合','时阳','生气','六仪','福生','鸣犬对'];
  const xionsha = ['月破','大耗','灾煞','天火','厌对','招摇','五离','血忌','血支'];
  
  const todayJishen = [jishen[(day * 2) % jishen.length], jishen[(day * 3 + 1) % jishen.length]];
  const todayXionsha = [xionsha[(day * 2 + 1) % xionsha.length]];
  
  let html = `
    <div class="analysis-card" style="text-align:center;">
      <div style="font-size:2rem;color:var(--gold);font-weight:700;margin:20px 0;">
        ${year}年${month}月${day}日
      </div>
      <div style="font-size:1.2rem;color:var(--text-dim);">
        农历：${ganzhiYear}年（${shengxiao}年）${ganzhiMonth}月${ganzhiDay}日
      </div>
    </div>
    
    <div class="grid-2">
      <div class="analysis-card">
        <div class="section-title">✦ 宜</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${yi.map(item => `<span class="tag bg-wood">${item}</span>`).join('')}
        </div>
      </div>
      <div class="analysis-card">
        <div class="section-title">✦ 忌</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${ji.map(item => `<span class="tag bg-fire">${item}</span>`).join('')}
        </div>
      </div>
    </div>
    
    <div class="analysis-card">
      <div class="section-title">✦ 详细信息</div>
      <div class="info-row">
        <div class="info-badge">建除：<span>${jc}日</span></div>
        <div class="info-badge">星宿：<span>${xiu}宿</span></div>
        <div class="info-badge">五行：<span>${getNayin(dayP.stem, dayP.branch)}</span></div>
      </div>
      <div class="analysis-section">
        <h3>✦ 吉神宜趋</h3>
        <p>${todayJishen.join('、')}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 凶煞宜忌</h3>
        <p>${todayXionsha.join('、')}</p>
      </div>
      <div class="analysis-section">
        <h3>✦ 今日提示</h3>
        <p>${jc === '建' || jc === '满' || jc === '定' || jc === '成' ? '今日宜开工、动土、嫁娶等大事。' : jc === '破' || jc === '危' ? '今日诸事不宜，宜静不宜动。' : '今日平稳，可从事日常事务。'}黄历仅供参考，具体还需结合个人八字分析。</p>
      </div>
    </div>
  `;
  
  const resultsEl = document.getElementById('huangliResults');
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}
