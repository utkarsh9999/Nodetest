const express=require('express');
const router=express.Router();
const Contract=require('../model/Contract');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const supabase = require("../sync");
const upload = multer({ dest: "uploads/" });
const axios = require("axios");
function cleanString(input) {
    return input.replace(/["/]/g, "");
}

router.post("/upload-file", upload.single("jsonFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = `${Date.now()}-${req.file.originalname}`;
        console.log("File Name : "+fileName);
        const { data, error } = await supabase.storage
            .from("bucket1") // Replace with your bucket name
            .upload(fileName, fileBuffer, { contentType: "application/json", upsert: false });

        fs.unlinkSync(filePath);
        console.log('done');
        if (error) {
            throw error;
        }
        console.log('done 2');
        const { data: publicUrlData } = supabase.storage.from("bucket1").getPublicUrl(fileName);
        console.log(publicUrlData.publicUrl);
        const newContract = await Contract.create({
            file_url: publicUrlData.publicUrl,
            file_name: fileName,
            contract_status: cleanString(req.body.contract_status),
            created_at: req.body.created_at,
        });
        console.log(req.body.contract_status);
        console.log('done 2');
        res.status(200).json({ message: "✅ File uploaded successfully", publicUrl: publicUrlData,newcontract:newContract.toJSON() });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/get-contracts/:pageId',async (req,res)=>{
    try{
        const page = parseInt(req.params["pageId"]);
        const limit = 5;
        const offset = (page - 1) * limit;

        const { count, rows } = await Contract.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        console.log("Page value : "+page);
        res.send(rows);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
});


router.get('/get-contracts/contract_id/:contract_id',async (req,res)=>{
    try{
        const contract_id=req.params["contract_id"];
        console.log("contract_id : "+contract_id);
        const contract=await Contract.findOne({
            where:{
                id:contract_id
            }
        });
        console.log(contract);
        res.send(contract);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get('/get-contracts/client_name/:client_name',async (req,res)=>{
    try{
        const client_name=req.params["client_name"];
        // const { count, rows } = await Contract.findAndCountAll({
        //     where: {
        //         client_name: client_name,
        //     },
        //     order: [["createdAt", "DESC"]],
        // });
        const rows=await Contract.findAll({});
        let resultRow;
        for(let i=0;i<rows.length;i++){
            const { data, error } = await axios.get(rows[i].file_url);
            if (data.clientName.toLowerCase().includes(client_name.toLowerCase())) {
                console.log("Client Name : " + data.clientName);
                resultRow=rows[i];
                break;
            }
        }
        if(!resultRow){
            res.status(204).send("No contract found");
        }
        else res.status(200).send(resultRow);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get('/get-contracts/:pageId/contract_status/:contract_status',async (req,res)=>{
    try{
        const page = parseInt(req.params["pageId"]);
        const limit = 5;
        const offset = (page - 1) * limit;
        const contract_status=cleanString(req.params["contract_status"]);
        if(contract_status==="All"){
            const { count, rows } = await Contract.findAndCountAll({
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });
            res.send(rows);
            return;
        }
        const { count, rows } = await Contract.findAndCountAll({
            where: {
                contract_status: contract_status,
            },
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        res.send(rows);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.delete('/delete-contract/:id/file_name/:file_name',async (req,res)=>{
    try{
        const id=req.params["id"];
        console.log("delete ID : "+id);
        await Contract.destroy({
            where:{
                id:id
            }
        });
        console.log("file : "+req.params["file_name"] +" "+req.params);
        const { data, error } = await supabase.storage
            .from("bucket1").remove([req.params.file_name]);

        res.status(200).send("Contract deleted "+data);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get('/get-contract/:id',async (req,res)=>{
    try{
        const id=req.params["id"];
        const contract=await Contract.findOne({
            where:{
                id:id
            }
        });
        res.send(contract);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.put('/update-contract/:id',async (req,res)=>{
    try{
        const id=req.params["id"];
        console.log("update ID : "+id);
        console.log(req.body);
        const contract=await Contract.findOne({
            where:{
                id:id
            }
        });
        contract.contract_status=cleanString(req.body.data.contract_status);
        await contract.save();
        res.send("Contract updated");
    }catch(err){
        console.log(err);
        res.send(err);
    }
});
module.exports=router;
