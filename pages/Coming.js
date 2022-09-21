import Image from "next/image";
// component
import Navbar from "../layouts/Navbar";
import styles from "../styles/Coming.module.css";
export default function Coming() {
  return (
    <div className={`px-3 ${styles.content}`}>
      <Navbar />
      <h1 className="text-muted text-center mt-5">Coming Soon</h1>
      <Image src="/images/coming.svg" width="700px" height="700px" />
    </div>
  );
}
