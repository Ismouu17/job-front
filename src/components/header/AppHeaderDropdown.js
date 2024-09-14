import {
  cilAccountLogout,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  let navigate = useNavigate()

  const handleLogout = (location) => {
    console.log(location)
    navigate(location)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Mon compte</CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Commentaires
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Entretiens
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2"></CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profil
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          paramètres
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem as="button" type="button" onClick={() => handleLogout('/logout')}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
