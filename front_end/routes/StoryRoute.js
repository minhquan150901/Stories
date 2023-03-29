import express from "express";
import {
    getStories, 
    getStoryById,
    getStoriesByCategory,
    createStory,
    updateStory,
    deleteStory,
    searchStories 
} from "../controllers/StoryController.js";
 
const router = express.Router();
 
router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.get('/stories/category/:category', getStoriesByCategory);
router.post('/stories', createStory);
router.patch('/stories/:id', updateStory);
router.delete('/stories/:id', deleteStory);
router.get('/stories/search', searchStories);
 
export default router;