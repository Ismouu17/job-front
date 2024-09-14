import {
  cibGoogleAnalytics,
  cibShowpad,
  cilApps,
  cilBadge,
  cilCalendar,
  cilClipboard,
  cilHistory,
  cilPlus,
  cilSpeedometer,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { userType } from './utils/isAuth'

console.log('USER TYPE: ', userType())

const _nav =
  userType() == 'recruiter'
    ? [
        {
          component: CNavItem,
          name: 'Dashboard-Recruteur',
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
          to: '/charts',
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
          to: '/login',
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
    : userType() == 'applicant'
      ? [
          {
            component: CNavItem,
            name: 'Dashboard-Postulant',
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
            component: CNavTitle,
            name: 'Entretiens',
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
            name: 'Mes candidatures',
            to: '/theme/colors',
            icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Vos statistiques',
            to: '/login',
            icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
          },
        ]
      : [
          {
            component: CNavItem,
            name: 'Dashboard-Admin',
            to: '/dashboard',
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
          },
          {
            component: CNavTitle,
            name: 'Gestion des utilisateurs',
          },
          {
            component: CNavItem,
            name: 'Recruteurs',
            to: '/theme/colors',
            icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Candidats',
            to: '/theme/colors',
            icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
          },
          {
            component: CNavTitle,
            name: 'Gestion des offres',
          },
          {
            component: CNavItem,
            name: 'Toutes les offres',
            to: '/theme/colors',
            icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Notifications',
            to: '/theme/colors',
            icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
          },
        ]

export default _nav
