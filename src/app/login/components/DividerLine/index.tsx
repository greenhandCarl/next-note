import styles from './index.module.css';

const points = new Array(20).fill(0);

const DividerLine = () => {
  return <div className={styles.dividerWrapper}>
    <div className={styles.pointWrapperL}>{points.map((_item, index) => <span key={index} className={styles.point} />)}</div>
    <span className={styles.text}>or</span>
    <div className={styles.pointWrapperR}>{points.map((_item, index) => <span key={index} className={styles.point} />)}</div>
  </div>
};

export default DividerLine;