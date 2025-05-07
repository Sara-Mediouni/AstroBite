const FoodModel = require('../Models/FoodSchema');


// Ajouter un plat
const addfood = async (req, res) => {
  try { 
    const food=await FoodModel.find({name:req.body.name})
    if (!food)
    { console.log(req.body)
    let image_filename=`${req.file.filename}`;
    
    const newFood = new FoodModel
    ({ name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       
       image:image_filename,
     });
    await newFood.save();
    res.status(201).json({success:true,newFood});}
    else {
      res.status(400).json({success:false,message:"Food already exists"})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un plat
const deletefood = async (req, res) => {
  try {
    const deletedfood = await FoodModel.findByIdAndDelete(req.params.id);
    if (!deletedfood) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.status(200).json({ success:true,message: 'supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success:false,message: 'Erreur lors de la suppression', error });
  }
};

// Mettre à jour un plat
const updatefood = async (req, res) => {
  try {
    const updatedfood = await FoodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedfood) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.status(200).json({ message: ' mis à jour avec succès', food: updatedfood });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Récupérer tous les plats
const getAllfoods = async (req, res) => {
   try {
     const foods = await FoodModel.find();
     res.status(200).json({success:true,foods});
   } catch (error) {
     res.status(500).json({ message: 'Erreur lors de la récupération', error });
   }
 };
 const filterfood = async (req, res) => {
  try {
    let foods;
    const filter = req.params.category;

    if (filter !== "") {
      foods = await FoodModel.find({ category: filter });
    } else {
      foods = await FoodModel.find(); 
    }

    res.status(200).json({success:true,foods});
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};


const getAllCategories = async (req, res) => {
  try {
    
    
    // Utilisation de .lean() pour obtenir des objets JavaScript simples
    const food = await FoodModel.find().lean(); 
    console.log(food);
    

    const uniqueCategories = food.reduce((acc, food) => {
      if (food.category && !acc.includes(food.category)) {
        acc.push(food.category);
      }
      return acc;
    }, []);

    res.status(200).json({success:true, uniqueCategories });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des plats', error });
  }
};
const getfood=async(req,res)=>{
   try
   { 
    const id=req.params.id;
    const food=await FoodModel.findById(id);
    res.status(200).json({success:true,food});
    }
    catch(error){
      res.status(500).json({ message: 'Error getting the food', error });
    }
}
 module.exports = {
   addfood,
   deletefood,
   updatefood,
   getAllfoods,
   filterfood,
   
   getAllCategories,
  
   getfood
 };