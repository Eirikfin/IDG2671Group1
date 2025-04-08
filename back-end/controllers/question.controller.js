import Question from '../models/questions.model.js';
import Artifact from '../models/artifacts.model.js';

// Add artifact to new question
const addArtifactToQuestion = async (req, res) => {
  try {
    const { questionId, artifactId } = req.body;
    
    const question = await Question.findById(questionId);
    const artifact = await Artifact.findById(artifactId);
    
    if (!question || !artifact) {
      return res.status(404).json({ message: 'Question or Artifact not found' });
    }
    
    question.artifacts.push(artifactId);
    await question.save();
    
    res.json({
      message: 'Artifact added to question',
      question
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addArtifactToQuestion };