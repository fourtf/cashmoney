import 'react-bulma-components/dist/react-bulma-components.min.css'
import MainNav from '../components/mainnav'

// https://www.npmjs.com/package/react-bulma-components
// https://couds.github.io/react-bulma-components/?path=/story/button--default

function MyApp({ Component, pageProps }) {
    // const toggleMenu = () => {
    //     pageProps.active = !pageProps.active
    // }

    return (
        <div>
            <MainNav />
            <Component {...pageProps} />
            <style jsx>
                {`
                    body {
                        font-family: 'Segoe UI';
                    }
                `}
            </style>
        </div>
    )
}

export default MyApp
