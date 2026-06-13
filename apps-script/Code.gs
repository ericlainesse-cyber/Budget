
const SHEET='Transactions';

function doGet(){
 const sh=SpreadsheetApp.getActive().getSheetByName(SHEET);
 const data=sh.getDataRange().getValues();
 const headers=data.shift();
 const out=data.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]])));
 return json(out);
}

function doPost(e){
 const body=JSON.parse(e.postData.contents);

 const sh=SpreadsheetApp.getActive().getSheetByName(SHEET);

 if(body.action==='save'){
   sh.appendRow([Utilities.getUuid(),body.date,body.type,body.description,body.category,body.amount,'']);
 }

 if(body.action==='delete'){
   const values=sh.getDataRange().getValues();
   for(let i=1;i<values.length;i++){
      if(values[i][0]===body.id){sh.deleteRow(i+1);break;}
   }
 }
 return json({success:true});
}

function json(o){
 return ContentService.createTextOutput(JSON.stringify(o))
 .setMimeType(ContentService.MimeType.JSON);
}
