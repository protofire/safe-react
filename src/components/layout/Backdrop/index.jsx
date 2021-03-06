// @flow
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'
import Backdrop from '@material-ui/core/Backdrop'

const useStyles = makeStyles({
  root: {
    zIndex: 1300,
  },
})

const BackdropLayout = ({ isOpen = false }: { isOpen: boolean }) => {
  if (!isOpen) {
    return null
  }

  const classes = useStyles()

  return ReactDOM.createPortal(<Backdrop classes={{ root: classes.root }} open />, document.body)
}

export default BackdropLayout
