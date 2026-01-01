const express = require('express');
const fs = require('fs');
const app = express();
const DB = 'student.json';

// 1. GET /students - See all students
app.get('/students', (req, res) => {
    fs.readFile(DB,'utf-8',function(err,data){
        if(err) return res.status(500).send("database error")
        res.send(data)
    })
});

// 2. POST /students - Enroll a student
app.post('/students', (req, res) => {
    let body = "";
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        const student=JSON.parse(body);
        student.id=Math.floor(Math.random()*1000);
        student.status="Active";
        fs.readFile(DB,'utf-8',function(err,data){
            if(err) return res.status(500).send("error reading the file")
                let students;
                    if (data) {
                        students = JSON.parse(data);
                    } else {
                    students = [];
                    } 
                    students.push(student);
                    fs.writeFile(DB,JSON.stringify(students),(err)=>{
                        if(err) return res.status(500).send("error writting the file");
                        res.status(201).send("sucess writting the data")
                    })                 
        })
       // TODO: Standard parse -> read file -> push -> write file
    });
});

// 3. PUT /students/:id - Update student grade
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let body = "";
    req.on('data',chunk => body +=chunk.toString())
    // TODO: Capture chunks
    req.on('end', () => {
        const updateData=JSON.parse(body);
        fs.readFile(DB,'utf-8',function(err,data){
            if (err) return res.status(500).send("error reading while updating the file")
                let students=JSON.parse(data);
                let found=false;
                for(let i=0;i<students.length;i++){
                    if(students[i].id===id){
                      //good approach to add if (updateData.grade) help is no data send then it can erase the exisiting so we use this if
                      if (updateData.name)  students[i].name=updateData.name; 
                      if (updateData.grade)  students[i].grade=updateData.grade;
                       if (updateData.status) students[i].status=updateData.status;
                        found=true;
                        break;
                    }
                }
                if(!found) return res.status(404).send("error id not found");
                fs.writeFile(DB,JSON.stringify(students),(err)=>{
                    if(err) res.status(500).send("error writting file while updating the file")
                        res.status(200).send("updated successfulllyy")
                });
        });

        // TODO: Find student loop. Update their grade. Save file.
    });
});

// 4. DELETE /students/:id - Expel a student
app.delete('/students/:id', (req, res) => {
    // TODO: Read file -> Filter array -> Write file
    fs.readFile(DB,'utf-8',function(err,data){
        if (err) return res.status(500).send("error while delteing / reading the file");
        const student=JSON.parse(data);
        const id=parseInt(req.params.id);
        const remainingStudents=student.filter(s=>s.id!==id);
        if(remainingStudents.length===student.length){
            return res.status(404).send("student not found")
        }
        fs.writeFile(DB,JSON.stringify(remainingStudents),(err)=>{
            if(err) return res.status(500).send("error item not found while writiing")
                res.status(200).send("student deleted")
        })
    })
});

app.listen(3000, () => console.log('School System running on 3000'));