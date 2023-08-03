import AppHeader from '@/components/Header.static'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <div div className='primary__theme'>
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </>
  )
}
