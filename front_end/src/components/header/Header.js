import styles from "./Header.module.scss"

function Header() {
    return (
        <div className={styles.wraper}>
            <h2 className = {styles.text}>Kho Truyện Hay</h2>
        </div>
    );
}

export default Header;
