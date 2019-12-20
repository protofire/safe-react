// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'
import Block from '~/components/layout/Block'
import Heading from '~/components/layout/Heading'
import Row from '~/components/layout/Row'
import Paragraph from '~/components/layout/Paragraph'
import { styles } from './style'
import { TX_NOTIFICATION_TYPES } from '~/logic/safe/transactions'
import { getGnosisSafeInstanceAt, SENTINEL_ADDRESS } from '~/logic/contracts/safeContracts'

export const SAFE_NAME_INPUT_TEST_ID = 'safe-name-input'
export const SAFE_NAME_SUBMIT_BTN_TEST_ID = 'change-safe-name-btn'
const ALLOWANCE_MODULE = '0xb4f7291fA058fbcbdcBb347647459aCb2f714a80'

type State = {
  moduleEnabled: boolean,
  moduleVersion: number,
}

type Props = {
  classes: Object,
  safeAddress: string,
  createTransaction: Function,
  enqueueSnackbar: Function,
  closeSnackbar: Function,
}

class AllowanceModuleDetails extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      moduleEnabled: false,
      moduleVersion: null,
    }
  }

  async componentDidMount() {
    const {
      safeAddress,
    } = this.props
    try {
      const gnosisSafe = await getGnosisSafeInstanceAt(safeAddress)
      const modules = await gnosisSafe.getModules()
      const moduleEnabled = modules.includes(ALLOWANCE_MODULE)
      this.setState({ moduleEnabled })
    } catch (err) {
      console.error(err)
    }
  }

  async toggleModule() {
    // TODO: use modal
    try {
      const {
        safeAddress, createTransaction, enqueueSnackbar, closeSnackbar,
      } = this.props
      const gnosisSafe = await getGnosisSafeInstanceAt(safeAddress)
      const modules = await gnosisSafe.getModules()
      const moduleIndex = modules.indexOf(ALLOWANCE_MODULE)
      let txData
      if (moduleIndex < 0) {
        txData = gnosisSafe.contract.methods.enableModule(ALLOWANCE_MODULE).encodeABI()
      } else {
        const prevModule = moduleIndex === 0 ? SENTINEL_ADDRESS : modules[moduleIndex - 1]
        txData = gnosisSafe.contract.methods.disableModule(prevModule, ALLOWANCE_MODULE).encodeABI()
      }
      await createTransaction({
        safeAddress,
        to: safeAddress,
        valueInWei: 0,
        txData,
        notifiedTransaction: TX_NOTIFICATION_TYPES.SETTINGS_CHANGE_TX,
        enqueueSnackbar,
        closeSnackbar,
      })
    } catch (error) {
      console.error('Error while toggling module', error)
    }
  }

  render() {
    const { classes } = this.props
    const { moduleVersion, moduleEnabled } = this.state

    return (
      <>
        <Block className={classes.formContainer}>
          <Heading tag="h2">Allowance Module Version</Heading>
          <Row
            align="end"
            grow
            onClick={() => { this.toggleModule() }}
          >
            <Paragraph className={classes.versionNumber}>
              {moduleVersion}
              Module is
              {' '}
              {moduleEnabled ? 'enabled' : 'disabled' }
            </Paragraph>
          </Row>
        </Block>
      </>
    )
  }
}

export default connect(undefined, undefined)(withStyles(styles)(withSnackbar(AllowanceModuleDetails)))
