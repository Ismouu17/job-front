import {
  cibGoogleAnalytics,
  cibShowpad,
  cilApps,
  cilCalendar,
  cilClipboard,
  cilHistory,
  cilPlus,
  cilSpeedometer,
  cilTask
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Offres d'emploi",
  },
  {
    component: CNavItem,
    name: 'Toutes les offres',
    to: '/theme/colors',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mes offres',
    to: '/theme/typography',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ajouter une offre',
    to: '/theme/typography',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analyse des offres',
    to: '/theme/typography',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Entretiens',
  },
  {
    component: CNavItem,
    name: 'Planifications',
    to: '/theme/colors',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Calendrier d'entretiens",
    to: '/theme/colors',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Historiques d'entretiens",
    to: '/theme/colors',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Candidatures',
  },
  {
    component: CNavItem,
    name: 'Toutes les candidatures',
    to: '/theme/colors',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analyse candidatures',
    to: '/theme/colors',
    icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recrutements',
  },
  {
    component: CNavItem,
    name: 'Performances',
    to: '/theme/colors',
    icon: <CIcon icon={cibShowpad} customClassName="nav-icon" />,
  },
]

export default _nav
