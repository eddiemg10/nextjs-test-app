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
      <div className="text-3xl pt-[60px] px-10 h-[100vh]">
        <h1>
          Simple next js <span className="font-mono text-red-400">CRUD</span>{" "}
          app covering:
        </h1>
        <ul className="list-disc mb-10 font-mono ml-20 mt-5">
          <li>SSR</li>
          <li>Integration with mongodb %amp; mongoose</li>
          <li>simple api routes</li>
          <li>Layouts</li>
          <li>next-auth with Github provider and JWT</li>
          <li>Sustom 404 page</li>
          etc..
        </ul>
        <a
          href="https://github.com/eddiemg10/nextjs-test-app"
          className="p-3 px-4 bg-red-400 rounded-md hover:shadow-md text-white text-md mt-10"
          target="_blank"
        >
          Github repo
        </a>
      </div>
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
