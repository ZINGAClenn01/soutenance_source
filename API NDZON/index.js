const express = require('express')
const cors = require('cors')
const app = express()
let mysql = require("mysql")

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Base de donnees connectee')
})

app.listen(process.env.PORT || 3001)

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ndzon'
})



con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})

// Lister les categories de maison


app.get('/categories', (req, res)=>{
    
    con.query('SELECT * FROM categories',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les maisons
app.get('/maisons', (req, res)=>{
    
    con.query('SELECT * FROM maisons',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})
// Lister les quartiers
app.get('/quartiers', (req, res)=>{
    
    con.query('SELECT * FROM quartiers',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les proprietaires

app.get('/proprietaires', (req, res)=>{
    
    con.query('SELECT * FROM proprietaires',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Ajouter un categorie;
app.post('/ajout/categorie', (req, res)=>{

    const id_categorie = req.body.id_classe;
    const categorie = req.body.categorie;
    
    con.query('INSERT INTO categories VALUES(NULL,?)',[categorie],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})
// Ajouter un quartier;
app.post('/ajout/quartier', (req, res)=>{

    const id_quartier = req.body.id_classe;
    const quartier = req.body.quartier;
    const image_quartier = req.body.image_quartier;
    
    con.query('INSERT INTO quartiers VALUES(NULL,?,?)',[quartier,image_quartier],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})
// Ajouter une maison;
app.post('/ajout/maison', (req, res)=>{

    const id_maison = req.body.id_classe;
    const id_categorie = req.body.id_categorie;
    const id_quartier = req.body.id_quartier;
    const id_proprietaire = req.body.id_proprietaire;
    const prix = req.body.prix;
    const description = req.body.description;
    const nombre_chambre = req.body.nombre_chambre;
    const nombre_douche = req.body.nombre_douche;
    const nombre_salon = req.body.nombre_salon;
    const coordonnees = req.body.coordonnees;
    const telephone_proprietaire = req.body.telephone_proprietaire;
    const image1 = req.body.image1;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const image4 = req.body.image4;
    const image5 = req.body.image5;
    
    con.query('INSERT INTO maisons VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id_categorie,id_quartier,id_proprietaire,prix,description,nombre_chambre,nombre_douche,nombre_salon,coordonnees,telephone_proprietaire,image1,image2,image3,image4,image5],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})


// Ajouter un proprietaire;
app.post('/ajout/proprietaires', (req, res)=>{

    const id_proprietaire = req.body.id_classe;
    const nom_proprietaire = req.body.nom_proprietaire;
    const email_proprietaire = req.body.email_proprietaire;
    const téléphone_proprietaire = req.body.téléphone_proprietaire;
    const password = req.body.password;
    
    con.query('INSERT INTO proprietaires VALUES(NULL,?,?,?,?)',[nom_proprietaire,email_proprietaire,téléphone_proprietaire,password],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})
//Effacer une categorie
app.delete('/delete/categorie/:id', (req, res)=>{
    
    con.query('DELETE FROM categories WHERE id_categorie=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})
//Effacer une maison
app.delete('/delete/maison/:id', (req, res)=>{
    
    con.query('DELETE FROM maisons WHERE id_maison=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})
//Effacer un quartiers
app.delete('/delete/quartier /:id', (req, res)=>{
    
    con.query('DELETE FROM quartier s WHERE id_quartier =?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})
// app.get('/classe/:id_classe/profs', (req, res)=>{
    
//     const id_classe = req.params.id_classe;
//     con.query(`SELECT DISTINCT id_prof FROM notes WHERE id_classe=${id_classe}`,(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
// Lister les profs du college
// app.get('/profs', (req, res)=>{
    
//     con.query('SELECT * FROM profs',(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Effacer une prof
// app.delete('/delete/prof/:id', (req, res)=>{
    
//     con.query('DELETE FROM profs WHERE id_prof=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
// Lister les eleves d'une classe
// app.get('/classes/eleves/:id', (req, res)=>{
    
//     con.query('SELECT * FROM eleves WHERE id_classe=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
// Lister les eleves du college
// app.get('/eleves', (req, res)=>{
    
//     con.query('SELECT * FROM eleves',(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Effacer une eleve
// app.delete('/delete/eleve/:id', (req, res)=>{
    
//     con.query('DELETE FROM eleves WHERE id_eleve=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
// Lister les notes d'un eleves
// app.get('/notes/eleve/:id', (req, res)=>{
    
//     con.query('SELECT * FROM notes WHERE id_eleve=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
// Lister les notes des eleves d'une classe par matiere
// app.get('/notes/classe/:id_classe/matiere/:id_matiere', (req, res)=>{
    
//     const id_classe = req.params.id_classe;
//     const id_matiere = req.params.id_matiere;

//     con.query(`SELECT * FROM notes WHERE id_classe=${id_classe} AND id_matiere=${id_matiere}`,(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Effacer une note
// app.delete('/delete/note/:id', (req, res)=>{
    
//     con.query('DELETE FROM notes WHERE id_note=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Effacer une matiere
// app.delete('/delete/matiere/:id', (req, res)=>{
    
//     con.query('DELETE FROM matieres WHERE id_matiere=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Effacer une classe
// app.delete('/delete/classe/:id', (req, res)=>{
    
//     con.query('DELETE FROM classes WHERE id_classe=?',[req.params.id],(err,result)=>{
//         if(err) res.status(500).send(err)
        
//         res.status(200).json(result)
//     })
// })
//Ajouter une classe;
// app.post('/ajout/classe', (req, res)=>{

//     const classe = req.body.classe;
    
//     con.query('INSERT INTO classes VALUES(NULL,?)',[classe],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send('POSTED');
//     }
//     })
// })
//Ajouter un eleve;
// app.post('/ajout/eleve', (req, res)=>{

//     const id_classe = req.body.id_classe;
//     const nom = req.body.nom;
//     const prenom = req.body.prenom;
//     const dateDeNaissance = req.body.dateDeNaissance;
//     const sexe = req.body.sexe;
    
//     con.query('INSERT INTO eleves VALUES(NULL,?)',[id_classe, nom, prenom, dateDeNaissance, sexe],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send('POSTED');
//     }
//     })
// })
//Ajouter un prof;
// app.post('/ajout/prof', (req, res)=>{

//     const nom_prof = req.body.nom_prof;
//     const prenom_prof = req.body.prenom_prof;
//     const id_matiere = req.body.id_matiere;
//     const password = req.body.password;
    
//     con.query('INSERT INTO profs VALUES(NULL,?,?,?,?)',[nom_prof, prenom_prof, id_matiere, password],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send('POSTED');
//     }
//     })
// })
//Ajouter un matiere;
// app.post('/ajout/matiere', (req, res)=>{

//     const matiere = req.body.matiere;
//     const coefficient = req.body.coefficient;
    
    
//     con.query('INSERT INTO matieres VALUES(NULL,?,?)',[matiere, coefficient],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send('POSTED');
//     }
//     })
// })
//Ajouter un note;
// app.post('/ajout/note', (req, res)=>{

//     const note = req.body.note;
//     const id_classe = req.body.id_classe;
//     const id_prof = req.body.id_prof;
//     const id_matiere = req.body.id_matiere;
//     const id_eleve = req.body.id_eleve;
    
//     con.query('INSERT INTO profs VALUES(NULL,?,?,?,?,?)',[note, id_classe, id_prof, id_matiere, id_eleve],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send('POSTED');
//     }
//     })
// })
