import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../header/Header";
import styles from "../styles/EditStory.module.scss";

const EditStory = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getStoryById();
    }, []);

    const updateStory = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/stories/${id}`, {
                title,
                content,
                category,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getStoryById = async () => {
        const response = await axios.get(`http://localhost:5000/stories/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
    };

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <form onSubmit={updateStory}>
                    <div >
                        <label className={styles.name}>
                            Tên Truyện
                        </label>
                        <div>
                            <input
                            className={styles.inputName}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div >
                        <label className={styles.content}>
                            Nội Dung
                        </label>
                        <div>
                            <textarea
                            className={styles.inputContent}
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.category}>
                            Thể Loại
                        </label>
                        <div>
                            <select
                                className={styles.inputCategory}
                                id="category"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                required>
                                <option value="">--Chọn--</option>
                                <option value="Truyện cười">Truyện cười</option>
                                <option value="Truyện ma">Truyện ma</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button
                        className={styles["btn-update"]}
                            type="submit">
                            Cập Nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStory;
