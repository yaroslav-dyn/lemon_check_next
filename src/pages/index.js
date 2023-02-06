import { Main } from 'next/document';
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../components/Header.static';


import React from 'react';

export default function LemonCheckApp() {


  //NOTE: HTML 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="LemonCheck" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <div className="">
        <main className="">

          <h1 className="main__heading">LemonCheck</h1>

        </main>
      </div>

    </>
  )
}
