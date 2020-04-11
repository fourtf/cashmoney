import { Navbar } from 'react-bulma-components'
import { Component } from 'react'

class MainNav extends Component {
    constructor(props) {
        super(props)
        this.state = { active: false }
    }

    render() {
        return (
            <Navbar
                fixed="top"
                color="primary"
                id="main_nav"
                active={this.state.active}
            >
                <Navbar.Brand>
                    <Navbar.Item href="/">CASHMONEY</Navbar.Item>
                    <Navbar.Burger onClick={this.toggleMenu.bind(this)} />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item href="/users">Users</Navbar.Item>
                        <Navbar.Item href="/products">Products</Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        )
    }

    toggleMenu() {
        this.setState(s => ({ active: !s.active }))
    }
}

export default MainNav

// function MainNav(props) {
//     const toggleMenu = () => {
//         Object.assign({}, props, { active: !props.active })
//         // props.active = !props.active
//     }

//     return (
//         <Navbar fixed="top" color="primary" id="main_nav" active={props.active}>
//             <Navbar.Menu>
//                 <Navbar.Item href="/">CASHMONEY</Navbar.Item>
//                 {/*   <Navbar.Container>
//                         <Navbar.Item href="/users" dropdown> */}
//                 <Navbar.Item>Users</Navbar.Item>

//                 {/* <Navbar.Container position="end">
//                         <Navbar.Link onClick={toggleMenu}>Menu</Navbar.Link>
//                     </Navbar.Container> */}

//                 <Navbar.Dropdown>
//                     <Navbar.Item href="A">A</Navbar.Item>
//                     <Navbar.Item href="B">B</Navbar.Item>
//                     <Navbar.Item href="C">C</Navbar.Item>
//                     <Navbar.Item href="D">D</Navbar.Item>
//                 </Navbar.Dropdown>
//                 {/* </Navbar.Item>
//                     </Navbar.Container> */}
//             </Navbar.Menu>
//             <Navbar.Burger onClick={toggleMenu} />
//         </Navbar>
//     )
// }

// MainNav.getInitialProps = async () => ({
//     active: false,
// })

// export default MainNav
