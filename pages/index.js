import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className="text-3xl pt-[60px] px-10 h-[100vh]">Hello world</div>
    </>
  );
}

export async function getStaticProps() {
  const data = "Data from your server 2.0";
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
