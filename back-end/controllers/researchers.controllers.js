import Researcher from "../models/researchers.model.js";

//creating  a new researcher:
export const createResearcher = async (req, res) => {
    try{
    const newResearcher = new Researcher(req.body);
    await newResearcher.save();
    return res.status(201).json({ message: "New Researcher created sucessfully", researcher: newResearcher })
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
}

//updating a researcher:
export const updateResearcher = async (req, res) => {
    try{
        const updatedResearcher = await Researcher.findByIdAndUpdate( req.params.id, req.body, { new: true });
        
        if(!updatedResearcher){
            return res.status(404).json({message: "Researcher ID not found"});
        }
        return res.status(200).json({ message: "Researcher has been updated sucessfully", researcher: updatedResearcher });
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
}

//deleting a researcher:
export const deleteResearcher = async (req, res) => {
    try{
        const deletedResearcher = await Researcher.findByIdAndDelete( req.params.id );

        if(!deletedResearcher){
            return res.status(404).json({message: "Researcher ID not found"});
        }
        return res.status(200).json({ message: "Researcher has been deleted sucessfully", researcher: deletedResearcher});
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
}

//getting a researchers info:
export const findResearcher = async (req, res) => {
    try{
        const foundResearcher = await Researcher.findById(req.params.id);
        
        if(!foundResearcher){
            return res.status(404).json({message: "No researcher with this id was found"});
        }
        const result = { 
            email: foundResearcher.email,
            name: foundResearcher.name
        };
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message})
    }
}

export const findAllResearchers = async (req, res) => {
    try{
        const allResearchers = await Researcher.find();
        if(allResearchers.length === 0){
            return res.status(404).json({message: "No researchers was found"})
        }
        const result = {
            id: allResearchers._id,
            name: allResearchers.name,
            email: allResearchers.email
        }
        res.status(200).json(result);
    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message})
    }
}