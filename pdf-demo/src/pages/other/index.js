import React from 'react'
import { SimpleViewer } from '../../components'

const url = 'http://127.0.0.1:9002/p0.pdf'

const Index = props => {
    return (<div>
        <SimpleViewer url={url} />
    </div>)
}

export default Index;