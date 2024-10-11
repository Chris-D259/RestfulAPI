const ExcelJs = require('exceljs');
const Workbook = new ExcelJs.Workbook();
const data = {
  project_name: "Sample Project",
  report_date: "2021-09-01",
  supervisor_name: "John Helldiver",
  tasks: ["Build Thingy", "Test Thingy", "Deploy Thingy", "Maintain Thingy", ""],
  checkListQuestionsKey: {
    bppe: "Basic PPE (Inspected)",
    sppe: "Specific PPE",
    hk: "Housekeeping",
    ss: "Safety Signage",
    lad: "Ladders",
    scaf: "Scaffolding",
    grd: "Guard Rails",
    tls: "Tools",
    eqi: "Equipment",
    ne: "Noise Exposure > 85dBA",
    gct: "Grinding / Cutting",
    hzm: "Hazardous Materials",
    fp: "Flag Person (trained)",
    hoi: "Hoisting and /or rigging",
    ltg: "Lighting",
    fo: "Floor Openings",
    fa: "Fall Arrest",
    fpr: "Fall Prevention",
    ms: "Material Storage",
    fe: "Fire Extinguishers",
    fak: "First Aid Kit"
  },
  checklist: {
    bppe: "✔",
    sppe: "✔",
    hk: "✔",
    ss: "✔",
    lad: "NA",
    scaf: "NA",
    grd: "NA",
    tls: "✔",
    eqi: "✔",
    ne: "✔",
    gct: "✔",
    hzm: "X",
    fp: "X",
    hoi: "X",
    ltg: "✔",
    fo: "✔",
    fa: "✔",
    fpr: "✔",
    ms: "NA",
    fe: "NA",
    fak: "✔"
  },
  user: {
    name: "Billy Bob",
    id: "BB"
  },
  frequencies: {
    fq_1: "5", fq_2: "5", fq_3: "3", fq_4: "4", fq_5: ""
  },
  severities: {
    sv_1: "5", sv_2: "5", sv_3: "3", sv_4: "4", sv_5: ""
  },
  hazards: {
    hzi_1: "Spooky Skeletons",
    hzi_2: "Spooky Monkey",
    hzi_3: "Spooky Ghost",
    hzi_4: "Spooky Manager",
    hzi_5: ""
  },
  controls: {
    hzc_1: "Liberal Application of Calcium",
    hzc_2: "Grab Nearest Banana and Yeet",
    hzc_3: "Dig up Grave and Burn Corpse",
    hzc_4: "Call HR",
    hzc_5: ""
  },
  comments: [
    "Good Job", "Why did you throw the banana?", "Why did you eat the banana?",
    "Why did you call HR?", "", "Who Pays for all of this?",
    "Banana is not a weapon", "Banana is not food", "HR is not your friend",
    "", "", ""
  ]
};

Workbook.creator = 'Formless-Admin';
const worksheet = Workbook.addWorksheet('FLHA Report');
worksheet.getColumn('A').width = 30;
worksheet.getColumn('B').width = 30;
worksheet.addRow(['Field Level Hazard Assessment Report (FLHA)']);
worksheet.addRow(['']);
worksheet.addRow(['Project:', data.project_name]);
worksheet.addRow(['Date', data.report_date]);
worksheet.addRow(['Supervisor', data.supervisor_name]);
worksheet.addRow(['Tasks']);
data.tasks.forEach((task) => {
  worksheet.addRow([task]);
});
worksheet.addRow(['Checklist']);

// Mapping checklist questions with their answers
Object.keys(data.checklist).forEach(key => {
  const question = data.checkListQuestionsKey[key];
  const answer = data.checklist[key];
  worksheet.addRow([question, answer]);  // Mapping question with its answer
});

worksheet.addRow(['User Info']);
worksheet.addRow(['Name', data.user.name]);
worksheet.addRow(['Initials', data.user.id]);
worksheet.addRow([ '','Frequencies', 'Severities',  'Hazards']);
Object.keys(data.frequencies).forEach((key, index) => {
  const frequencyKey = key;
  const frequencyValue = data.frequencies[key];

  const severityKey = Object.keys(data.severities)[index];
  const severityValue = data.severities[severityKey];

  const hazardKey = Object.keys(data.hazards)[index];
  const hazardValue = data.hazards[hazardKey];

  
  worksheet.addRow(["Hazard Identification "+index+1, frequencyValue, severityValue, hazardValue]);
});
worksheet.addRow(['Controls']);
let hazardIndex = 1;
Object.entries(data.controls).forEach(([ value]) => {
  worksheet.addRow(["Hazard Control "+hazardIndex, value]);
  hazardIndex++;
});
let commentIndex = 1;
worksheet.addRow(['Comments']);
data.comments.forEach((comment) => {
  worksheet.addRow(["Comment "+commentIndex,comment]);
  commentIndex++;
});

Workbook.xlsx.writeFile('FLHA.xlsx')
  .then(() => {
    console.log('Excel file Created');
  })
  .catch(err => {
    console.error('Error creating Excel file:', err);
  });
