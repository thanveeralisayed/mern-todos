import React from 'react'

const Preloader = () => {
    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Loading...
            </button>

        </div>
    )
}

export default Preloader
