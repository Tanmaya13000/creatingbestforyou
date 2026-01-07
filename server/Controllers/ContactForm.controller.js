import axios from "axios";
import { Contact } from "../Models/Contact.model.js";


export const createContactFormEntry = async (req,res) => {
    try {
        console.log("Request body:", req.body);
        const { name, email, phoneNumber, companyName, message } = req.body;
        if(!name || !email || !phoneNumber || !companyName || !message){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newContact = await Contact.create({
            name,
            email,
            phoneNumber,
            companyName,    
            message
        });
        return res.status(201).json({ message: "Contact form submitted successfully", contact: newContact });
        
    } catch (error) {
        console.error("Error creating contact form entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
