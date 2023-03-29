import styles from "./Footer.module.scss"

function Footer() {
    return (
        <div className={styles.wraper}>
            <p >&copy; 2023 Minh Quân</p>
            <p >
                Liên hệ tôi qua email:{" "}
                <a className={styles.myEmail} href="phungminhquan.tl5@gmail.com">
                    phungminhquan.tl5@gmail.com
                </a>
            </p>
            <p>
                Liên hệ bằng Số Điện Thoại:{" "}
                <a className={styles.myNumberPhone} href="tel:+84386039618">
                    0386039618
                </a>
            </p>
        </div>
    );
}

export default Footer;
