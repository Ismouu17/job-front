import { CFooter } from '@coreui/react'
import React from 'react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Recrutement PowerBI
        </a>
        <span className="ms-1">&copy; 2024 corporate.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Recrutement Inc.
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
