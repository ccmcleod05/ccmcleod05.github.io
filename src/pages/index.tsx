import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
// import { Inter } from '@next/font/google';
import BlogCard, { blogCardProps } from './../components/blog-card';
import BlogCardLayout from './../layouts/blog-card-layout';
import TitleBar from './../components/title-bar';

import styles from '@/styles/Home.module.css'


function Home({ blogCardDataSet }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog project app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> {/* Change Favicon */}
      </Head>
      <main className={styles.main}>
        <TitleBar/>
        <BlogCardLayout>
          {blogCardDataSet.map((blogCardData: blogCardProps, index: number) => {
            return (
              <BlogCard 
                key={`${blogCardData.author}-${index}`} 
                imageSrc={blogCardData.imageSrc} 
                imageAlt={blogCardData.imageAlt} 
                title={blogCardData.title} 
                briefDescription={blogCardData.briefDescription} 
                author={blogCardData.author}
                content={blogCardData.content}
                date={blogCardData.date}
              />
            )
          })}
        </BlogCardLayout>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps<{ blogCardDataSet: blogCardProps[] }> = async () => {

  const serviceAccount = require('firebase.json');
  const admin = require('firebase-admin');
  const { getFirestore } = require('firebase-admin/firestore');

  const storageBucketUrl = process.env.REACT_APP_STORAGE_BUCKET_URL
  const storageMediaPath = process.env.REACT_APP_STORAGE_MEDIA_PATH

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: storageBucketUrl
    });
  }
  
  const firestore = getFirestore();

  let blogCardDataSet: blogCardProps[] = [];

  const snapshot = await firestore.collection('fl_content').get();

  snapshot.forEach((doc: any) => {
    const imageSrc = doc.data().imageSrc;
    const imagePathReference = `https://firebasestorage.googleapis.com/v0/b/${storageBucketUrl}/o/${storageMediaPath}%2${imageSrc}`
    blogCardDataSet.push({
      'author': doc.data().author,
      'briefDescription': doc.data().description,
      'content': doc.data().content,
      'imageAlt': doc.data().imageAlt,
      'imageSrc': imagePathReference,
      'title': doc.data().title,
      'date': doc.data().date
    });
  });

  return {
    props: { 
      blogCardDataSet
    }
  }
}

export default Home;