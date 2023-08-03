import Head from 'next/head'
import Link from 'next/link';
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

      <div className="main_page">
        <main>

          <h1 className="main__heading" data-centered-text>LemonCheck</h1>


          <article className="main_content">
            <p>   Are you tired of using the same password for all your online accounts? If so, then it&apos;s time to start using a secure password generator. A secure password generator is an online service that can help you create strong, unique passwords for each account <Link href="/password-generator">hereq</Link>.</p>

            <p>      Using a secure password generator is essential in today&apos;s digital world as hackers are constantly trying to gain access to our personal information and accounts. With this tool, users can easily generate random strings of characters which make it much harder for anyone attempting unauthorized access into their accounts or data.</p>

            {/* <p>      The home page of any reliable and trustworthy web-based Password Generator should provide its users with simple instructions on how they should use the service in order to protect themselves from cyber threats such as phishing scams or identity theft attempts. On top of that, there should be an easy-to-navigate interface where customers can quickly find what they need without having any difficulties understanding how things work around here – especially if they’re newbies when it comes down generating passwords securely!</p>
            <p>

              Finally, once customers have generated their desired number/combination of characters (which will become their customized “password recipe), these services usually offer additional features like email notifications whenever someone tries logging into one’s account with incorrect credentials – thus providing extra layers security against malicious activities happening behind our backs! So don't wait anymore - get yourself protected by taking advantage from these amazing tools available out there right now!
            </p> */}

              
          </article>

        </main>
      </div>

    </>
  )
}
