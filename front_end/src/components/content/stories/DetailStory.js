import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../header/Header";
import styles from "../styles/DetailStory.module.scss";

const DetailStory = () => {
    const [story, setStory] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getStoryById();
    }, [id]);

    const getStoryById = async () => {
        const response = await axios.get(`http://localhost:5000/stories/${id}`);
        setStory(response.data);
    };

    const handleGoOut = () => {
        navigate("/");
    };

    return (
        <div>
            <Header />
            {story && (
                <div className={styles["wrapper-detail"]}>
                    <h2 className={styles["detail-title"]}>{story.title}</h2>
                    <p 
                        className={styles["detail-content"]}
                        style={{ whiteSpace: "pre-wrap" }}>
                        {story.content}
                    </p>
                </div>
            )}
            <button className={styles["btn-exit"]} onClick={handleGoOut}>
                Thoát
            </button>
        </div>
    );
};

export default DetailStory;
