const express = require("express");
const bodyparser = require("body-parser");

const router = express.Router();

const modelskill1 = require("../models/skillset");
//const modelskill2 = require('../models/skillset1')
const modelmanagername = require("../models/managername");
const managername = require("../models/managername");
//const questions = require('../models/questions');
const awsquestion = require("../models/aws");
const javaquestion = require("../models/java");
const collections = [
  
    awsquestion,
    javaquestion
  
];
router.use(bodyparser.json());

// Adding skills

router.post("/skillnames", async (req, res) => {
  const sname = new modelskill1({
    _id: req.body._id,
    skills: req.body.skills,
    subskills: req.body.subskills,
  });
  try {
    const a = await sname.save();
    res.json(a);
  } catch (error) {
    res.send("Error please check");
  }
});

router.post("/skillnames1", async (req, res) => {
  const sname = new modelskill1({
    skillname: req.body.skillname,
  });
  try {
    const a = await sname.save();
    res.json(a);
  } catch (error) {
    res.send("Error please check");
  }
});
// Adding Manager name

router.post("/mnames", async (req, res) => {
  const mname = new modelmanagername({
    Managername: req.body.Managername,
  });
  try {
    const b = await mname.save();
    res.json(b);
  } catch (error) {
    res.send("Error please check");
  }
});

// Displaying Skill names

router.get("/getskill", async (req, res) => {
  try {
    const skill = await modelskill1.find();

    res.json(skill);
  } catch (err) {
    res.send("Error" + err);
  }
});

//Displaying manager name

router.get("/getmanagername", async (req, res) => {
  try {
    const skill = await modelmanagername.find();

    res.json(skill);
  } catch (err) {
    res.send("Error " + err);
  }
});

//TO FILTER THE PARTICULAR DATA AND SHOW PARTICULAR FIELD QUESTION
router.post("/selected", (req, res) => {
  // const skill = await modelskill.find(
  const selectedoption = req.body.selectedskills;
  console.log(selectedoption);
  // const selectedoption=new modelskill({
  //   soption:req.body.skillname
  // })
  const p1 = [];

  // const filteredSkill = collections.filter(item =>
  //   selectedoption.every(skill=> item.skills) //.include(skill)
  // );
  // console.log(filteredSkill);
  // const mapSkill = filteredSkill.map(item => item.skills);
  // console.log(mapSkill);
  // // console.log("EXAMPLE==",example);

  awsquestion
    .find({ skills: { $in: selectedoption } })
    //modelskill2.find({skillname:{$in:selectedoption}})
    .then((skills) => {
      // res.json(skills)
      // skills.array.forEach(element => {
      //   p1.push(element.skillname)
      // });
      // for (let g of skills){
      //   p1.push(g.skillname)
      // }
      p1.push(skills);
      // p1.push(skills)
      //console.log("skill",skills[0].skillname)
      //res.json(p1)
    });
  javaquestion
    .find({ skills: { $in: selectedoption } })
    //modelskill2.find({skillname:{$in:selectedoption}})
    .then((skills) => {
      // res.json(skills)

      // p1.push(skills)
      // console.log(skills)
      //  for(let g1 of skills){
      //   p1.push(g1.skillname)
      //  }
      p1.push(skills);
      res.json(p1);
    })
    //res.json(p1)
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving from Mongodb" });
    });
});

// router.post("/selected1",(req,res)=>{
//   const 
//   const matchingcollection=collections.filter(item=>)
// })

//post aws skill
router.post("/awsquestion", async (req, res) => {
  try {
    const { question, questionType, options, skills } = req.body;

    const newQuestion = new awsquestion({
      // Use the correct model here

      question,

      questionType,

      options,

      skills,
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error("Error:", error);

    res
      .status(500)
      .json({ error: "An error occurred while adding the question." });
  }
});

/////post java questions
router.post("/javaquestion", async (req, res) => {
  try {
    const { question, questionType, options, skills } = req.body;

    const newQuestion = new javaquestion({
      // Use the correct model here

      question,

      questionType,

      options,
      skills,
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error("Error:", error);

    res
      .status(500)
      .json({ error: "An error occurred while adding the question." });
  }
});

module.exports = router;
