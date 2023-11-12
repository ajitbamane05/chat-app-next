import '@/styles/globals.css'
import UserContextProvider from '@/Component/Context/userContexProvider'


export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
    )
}
