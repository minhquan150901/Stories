import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../../header/Header";
import styles from "../styles/Category.module.scss";

const CategoryList = () => {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { category } = useParams();

    const storiesPerPage = 5;
    const pagesVisited = (currentPage - 1) * storiesPerPage;

    useEffect(() => {
        if (category) {
            getStoryByCategory();
        }
    }, [category, currentPage]);

    const getStoryByCategory = async () => {
        const response = await axios.get(
            `http://localhost:5000/stories/category/${category}`
        );
        setStories(response.data);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category) {
            navigate(`/category/${category}`);
          } else {
            navigate("/");
          }
    };

    const handleAdd = () => {
        navigate("/add");
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGoOut = () => {
        navigate("/");
    };

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
                    padding: "5px 30px 20px 20px",
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
                        fontWeight: "bolder",
                    }}>
                    {story.category}
                </p>
            </div>
        ));

    const pageCount = Math.ceil(stories.length / storiesPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles["left-bar"]}>
                    <p className={styles.text}>Thể Loại </p>
                    <div className={styles.menu}>
                        <select
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
                                        Thêm mới
                                    </Link>
                                    để tạo truyện mới
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles["right-bar"]}>
                            <div>{displayStories}</div>
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                className={styles.paging}
                                activeClassName={styles.active}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button className={styles["btn-exit"]} onClick={handleGoOut}>
                Thoát
            </button>
        </div>
    );
};

export default CategoryList;
