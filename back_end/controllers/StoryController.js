import Story from "../models/StoryModel.js";

// Lấy toàn bộ stories
export const getStories = async (req, res) => {
    try {
        const response = await Story.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// Lấy stories theo ID
export const getStoryById = async (req, res) => {
    try {
        const response = await Story.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

// Lấy stories theo category
export const getStoriesByCategory = async (req, res) => {
    try {
        const stories = await Story.findAll({
            where: {
                category: req.params.category,
            },
        });
        res.status(200).json(stories);
    } catch (error) {
        console.log(error.message);
    }
};

// Tạo stories mới
export const createStory = async (req, res) => {
    try {
        await Story.create(req.body);
        res.status(201).json({ msg: "Story Created" });
    } catch (error) {
        console.log(error.message);
    }
};

// Chỉnh sửa stories theo ID
export const updateStory = async (req, res) => {
    try {
        await Story.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Story Updated" });
    } catch (error) {
        console.log(error.message);
    }
};

// Xóa stories
export const deleteStory = async (req, res) => {
    try {
        await Story.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Story Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

// Tìm kiếm stories bằng keyword title hoặc content
export const searchStories = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const stories = await Story.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${keyword}%`,
                        },
                    },
                    {
                        content: {
                            [Op.iLike]: `%${keyword}%`,
                        },
                    },
                ],
            },
        });
        res.status(200).json(stories);
    } catch (error) {
        console.log(error.message);
    }
};
