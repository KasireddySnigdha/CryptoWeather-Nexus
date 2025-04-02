import styles from "./Coins.module.css";
import Link from "next/link";
import "animate.css";

function formatNumber(number) {
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1) + "B";
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
  if (number >= 1_000) return (number / 1_000).toFixed(1) + "K";
  return number.toString();
}

function formatString(string) {
  const index = string.indexOf(" ");
  return index !== -1 ? string.substring(0, index) : string;
}

const Coins = ({ name, price, symbol, marketcap, volume, image, priceChange, id }) => {
  return (
    <div className={`${styles.coin_section} animate__animated animate__fadeIn`}>
      <Link href={`/coin/${id}`} className={styles.coin_link}>
        <div className={`${styles.coin_container} animate__animated animate__fadeIn`}>
          <div className={styles.coin_row}>
            <div className={styles.coin}>
              <img className={styles.coin_img} src={image} alt={name} />
              <div className={styles.coin_text}>
                <h1 className={styles.coin_heading}>{formatString(name)}</h1>
              </div>
            </div>
            <div className={styles.coin_data}>
              <p className={styles.coin_price}>${price.toFixed(2)}</p>
              <p className={styles.coin_volume}>${formatNumber(volume)}</p>
              {priceChange < 0 ? (
                <p className={`${styles.coin_percent} ${styles.red}`}>
                  {Number(priceChange).toFixed(2)}%
                </p>
              ) : (
                <p className={`${styles.coin_percent} ${styles.green}`}>
                  +{Number(priceChange).toFixed(2)}%
                </p>
              )}
              <p className={styles.coin_marketcap}>Mkt Cap: {formatNumber(marketcap)}</p>
              <br />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Coins;
