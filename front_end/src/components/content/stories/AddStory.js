import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../header/Header";
import styles from "../styles/AddStory.module.scss";

const AddStory = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const saveStory = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/stories", {
                title,
                content,
                category,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div >
            <Header />
            <div className={styles.wapper}>
                <form onSubmit={saveStory}>
                    <div>
                        <label className={styles.name}>Tên</label>
                        <div>
                            <input
                                className={styles.inputName}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Tên truyện"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.content}>Nội Dung</label>
                        <div >
                            <textarea
                                className={styles.inputContent}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Nội dung của truyện"
                                required
                            />
                        </div>
                    </div>
                    <div >
                        <label className={styles.category}>Thể Loại</label>
                        <div >
                            <select
                                className={styles.inputCategory}
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                                required>
                                <option value="">--Chọn--</option>
                                <option value="Truyện cười">Truyện cười</option>
                                <option value="Truyện ma">Truyện ma</option>
                            </select>
                        </div>
                    </div>
                    <div >
                        <button type="submit" className={styles["btn-add"]}>
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStory;
