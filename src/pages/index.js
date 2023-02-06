import { Main } from 'next/document';
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../components/Header.static';


import React from 'react';

export default function Home() {


  //NOTE: HTML 
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="description" content="LemonCheck" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <div >
        <main >

          <h1 className="main__heading" data-centered-text>LemonCheck</h1>

        </main>
      </div>

    </>
  )
}
