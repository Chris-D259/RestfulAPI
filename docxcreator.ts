//From docxtemplater Documentation

const Docxtemplater = require("docxtemplater");


const PizZip = require("pizzip");

const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
    path.resolve(__dirname, "flha_template.docx"),
    "binary"
)

const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true
});

doc.render({
    project_name: "Sample Project",
    report_date: "2021-09-01",
    supervisor_name: "John Helldiver",
    task_1: "Build Thingy",
    task_2: "Test Thingy",
    task_3: "Deploy Thingy",
    task_4: "Maintain Thingy",
    task_5: "",
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
    fak: "✔",
    u_name: "Billy Bob",
    u_i: "BB",
    fq_1: "5",
    fq_2: "5",
    fq_3: "3",
    fq_4: "4",
    fq_5: "",
    sv_1: "5",
    sv_2: "5",
    sv_3: "3",
    sv_4: "4",
    sv_5: "",
    hzi_1: "Spooky Skeletons",
    hzi_2: "Spooky Monkey",
    hzi_3: "Spooky Ghost",
    hzi_4: "Spooky Manager",
    hzi_5: "",
    hzc_1: "Liberal Application of Calcium",
    hzc_2: "Grab Nearest Banana and Yeet",
    hzc_3: "Dig up Grave and Burn Corpse",
    hzc_4: "Call HR",
    hzc_5: "",
    comm_1: "Good Job",
    comm_2: "Why did you throw the banana?",
    comm_3: "Why did you eat the banana?",
    comm_4: "Why did you call HR?",
    comm_5: "",
    comm_6: "Who Pays for all of this?",
    comm_7: "Banana is not a weapon",
    comm_8: "Banana is not food",
    comm_9: "HR is not your friend",
    comm_10: "",
    comm_11: "",
    comm_12: "",

});

const buf = doc.getZip().generate({ 
    type: "nodebuffer" ,
    compression: "DEFLATE",
});

fs.writeFileSync(path.resolve(__dirname, "flha_output.docx"), buf);



