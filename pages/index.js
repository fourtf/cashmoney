import { Section, Heading, Tile } from 'react-bulma-components'

function TileLink({ text, href, color }) {
    return (
        <Tile kind="parent">
            <a href={href} style={{ width: '100%' }}>
                <Tile
                    renderAs="article"
                    kind="child"
                    color={color}
                    notification
                >
                    <Heading>{text}</Heading>
                </Tile>
            </a>
        </Tile>
    )
}

export default function AppIndex() {
    return (
        <div>
            <Tile kind="ancestor">
                <TileLink text="Users" color="link" href="/users" />
                <TileLink text="Products" color="warning" href="/products" />
            </Tile>
            <style jsx>{`
                .index-tile {
                    width: 33%;
                }
            `}</style>
        </div>
    )
}
