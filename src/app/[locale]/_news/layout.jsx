import Gutter from 'shared/Gutter'

export default function NewsLayout({ children }) {
    return (
        <Gutter className={'pt-14'}>
            {children}
        </Gutter>
    )
}
