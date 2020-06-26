import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
let mapStateToProps = state => ({
    isAuth: state.header.isAuth
})

let withRedirect = Component => {
    let ContainerComponent = props => {
        if (!props.isAuth) return <Redirect to='/login' />
        return <Component {...props} />
    }
    return connect(mapStateToProps, {})(ContainerComponent)
}

export default withRedirect