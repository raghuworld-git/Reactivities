import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading: React.FC<{ inverted?: boolean, content?: string }> = ({ inverted = true, content }) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default Loading
