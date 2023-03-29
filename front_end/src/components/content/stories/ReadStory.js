import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaArrowUp } from "react-icons/fa"

import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "../styles/ReadStory.module.scss";

const ReadStory = () => {
    const [stories, setStory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();

    const mybutton = document.getElementById("myBtn");

    window.onscroll = () => {
        scrollFunction();
    };

    const scrollFunction = () => {
        if (
            document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const storiesPerPage = 10;
    const pagesVisited = pageNumber * storiesPerPage;

    useEffect(() => {
        getStories();
    }, [selectedCategory]);

    const getStories = async () => {
        let url = "http://localhost:5000/stories";
        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        setStory(response.data);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        navigate(`/category/${category}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa câu chuyện này?"
        );
        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/stories/${id}`);
            const response = await axios.get("http://localhost:5000/stories");
            setStory(response.data);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayStories = filteredStories
        .slice(pagesVisited, pagesVisited + storiesPerPage)
        .map((story, index) => (
            <div
                key={story.id}
                style={{
                    fontSize: "18px",
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    margin: "20px 0 20px 20px",
                    backgroundColor: "rgb(150, 244, 244)",
                    borderRadius: "5px",
                    padding: "5px 30px 40px 20px",
                }}>
                <h2
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                    }}>
                    <Link to={`story/${story.id}`} className={styles.title}>
                        {story.title}
                    </Link>
                </h2>
                <p
                    style={{
                        fontSize: "16px",
                        marginBottom: "10px",
                    }}>
                    {story.content.slice(0, 100)}
                    {story.content.length > 100 && (
                        <Link
                            to={`story/${story.id}`}
                            className={styles.readMore}>
                            ... Đọc thêm
                        </Link>
                    )}
                </p>
                <p
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: 0,
                    }}>
                    {story.category}
                </p>
                <Link to={`edit/${story.id}`} className={styles["btn-edit"]}>
                    Edit
                </Link>
                <button
                    onClick={() => handleDelete(story.id)}
                    className={styles["btn-delete"]}>
                    Xóa
                </button>
            </div>
        ));

    const pageCount = Math.ceil(stories.length / storiesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleAdd = () => {
        navigate("/add");
    };

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles["left-bar"]}>
                    <p className={styles.text}>Thể Loại </p>
                    <div className={styles.menu}>
                        <select
                        className={styles.inputOption}
                            value={selectedCategory}
                            onChange={handleCategoryChange}>
                            <option value="">Tất cả</option>
                            <option value="Truyện cười">Truyện cười</option>
                            <option value="Truyện kinh dị">
                                Truyện kinh dị
                            </option>
                        </select>
                    </div>
                    <button onClick={handleAdd} className={styles["btn-add"]}>
                        Thêm mới
                    </button>
                    <div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên truyện"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles["btn-search"]}
                        />
                    </div>
                </div>
                <div>
                    {stories.length === 0 ? (
                        <div>
                            <div>
                                <p>
                                    Không có truyện nào.Vui lòng nhấn vào
                                    <Link
                                        to={"/add"}
                                        className={styles["btn-add"]}>
                                        {" "}
                                        Thêm mới{" "}
                                    </Link>
                                    để tạo truyện mới
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles["right-bar"]}>
                            <button
                                className={styles["btn-onTop"]}
                                onClick={topFunction}
                                id="myBtn"
                                title="Go to top">
                                <FaArrowUp />
                            </button>
                            <div>
                                <div>{displayStories}</div>
                            </div>
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                className={styles.paging}
                                activeClassName={styles.active}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReadStory;
