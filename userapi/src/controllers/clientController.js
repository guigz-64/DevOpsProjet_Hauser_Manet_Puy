const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Client = mongoose.model('Client');



router.get('/',(req,res)=>{
    res.render("layout",{
        title:"Welcome to our new Clients !"
    });
});

router.post('/',(req,res)=>{
    if(req.body._id ==''){
        insert(req,res);
    }
    else{
        update(req,res);
    }
    
})

function insert(req,res){
    //nous créons une instance de l'objet client qui a été créer dans le fichier client.model
    var client = new Client();
    client.fullName = req.body.fullName;
    client.email = req.body.email;
    client.mobile = req.body.mobile;
    client.save((err,docs)=>{
        if(!err){
            //si la sauvegarde réussi le client est rediriger vers le chemin suivant
            res.redirect('client/list');
        } 
        else{
            console.log('Error during insertion'+err);
        }
    

    });
      
}
function update(req,res){
    Client.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){res.redirect('client/list');}
        else{
            console.log('The update does not work'+err);
        }
    });
}

router.get('/list',(req,res)=>{
    Client.find((err,docs)=>{
        if(!err){
           
            res.render("list",{
                list:docs
                

            },
            
        );
    }
        else{
            console.log('No such a list'+err);
        }
    });
   
});

router.get('/:id',(req,res)=>{
    Client.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("layout",{
                title:"Update Client",
                client:doc

            });

        }
       
    }) ;

});

router.get('/delete/:id',(req,res)=>{
    Client.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/client/list');
        }
        else{
            console.log('Error in employee delete:'+err);
        }
    });


});
 



module.exports = router;