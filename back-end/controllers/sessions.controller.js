import Session from "../models/sessions.model.js";
import { Parser } from "json2csv";
// POST
export const createSession = async (req, res) => {
    try {
        const newSession = new Session(req.body);
        await newSession.save();
        return res.status(201).json({
            message: "Session submission successful",
            Session: newSession,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error", error: err.message
        });
    }
};

// GET all
export const getSession = async (req, res) => {
    try {
        const allSessions = await Session.find({ projectId: req.params.projectId });
        if (allSessions.length === 0) {
        return res.status(404).json({ message: "No Sessions were found" });
        }
        const result = {
            id: allSessions._id,
            deviceType: allSessions.deviceType,
            startTime: allSessions.startTime,
            finishedTime: allSessions.finishedTime,
            projectId: allSessions.projectId,
        };
        res.status(200).json(result);
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
};

// GET by id
export const getSessionById = async (req, res) => {
    try {
        const foundSession = await Session.findById(req.params.id);
        if (!foundSession) {
          return res.status(404).json({ message: "No Session was found" });
        }
    
        return res.status(200).json(foundSession);
        } catch (err) {
            return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};

// Patch
export const updateSession = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res
              .status(403)
              .json({ message: "You can only update Sessions from your own Projects." });
          }
      
          const updatedSession = await Session.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
      
          if (!updatedSession) {
            return res.status(404).json({ message: "Session ID not found" });
          }
      
          return res.status(200).json({
            message: "Session has been updated successfully",
            Session: updatedSession,
          });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    };
};

// Delete
export const deleteSession = async (req, res) => {
    try {
        //compare tokenid with request parameter
        if (req.user.id !== req.params.id) {
            return res
            .status(403)
            .json({ message: "You can only delete Sessions from your own questions." });
        }
    
        const deletedSession = await Session.findByIdAndDelete(req.params.id);
    
        if (!deletedSession) {
            return res.status(404).json({ message: "Session ID not found" });
        }
        return res.status(200).json({
            message: "Session has been deleted sucessfully",
            Session: deletedSession,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// sends sessions as a .csv file to the client:
export const exportCsv = async (req, res) => {
    try{
        const sessions = await Session.find({ projectId: req.params.projectId })

        if(!sessions || sessions.length === 0) {
            return res.status(404).json({ message: "No answers for this project was found"});
        }
        const flattened = sessions.map(session => {
            const base = {
              sessionId: session._id,
              projectId: session.projectId,
              startTime: session.startTime,
              finishedTime: session.finishedTime,
              deviceType: session.deviceType,
              age: session.demographics?.age,
              gender: session.demographics?.gender,
              education: session.demographics?.education,
            };
      
         
            session.answers?.forEach(({ SectionId, sectionAnswers }) => {
              const key = `section_${SectionId}`;
              base[key] = JSON.stringify(sectionAnswers || []);
            });
      
            return base;
          });

          const parser = new Parser();
          const csv = parser.parse(flattened);

          res.header('Content-Type', 'text/csv');
          res.attachment(`sessions_project_${req.params.projectId}.csv`);
          return res.send(csv);
      
    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message})
    }
}