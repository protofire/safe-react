// @flow
import * as React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Block from '~/components/layout/Block'
import Col from '~/components/layout/Col'
import Row from '~/components/layout/Row'
import Hairline from '~/components/layout/Hairline'
import AllowanceModuleDetails from './AllowanceModuleDetails'
// import ManageAllowances from './ManageAllowances'
import actions, { type Actions } from './actions'
import { styles } from './style'
import type { Safe } from '~/routes/safe/store/models/safe'

type State = {
  menuOptionIndex: number,
}

type Props = Actions & {
  classes: Object,
  granted: boolean,
  etherScanLink: string,
  safeAddress: string,
  network: string,
  createTransaction: Function,
  userAddress: string,
  safe: Safe
}

class Allowances extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      menuOptionIndex: 1,
    }
  }

  handleChange = (menuOptionIndex) => () => {
    this.setState({ menuOptionIndex })
  }

  onShow = (action: Action) => () => {
    this.setState(() => ({ [`show${action}`]: true }))
  }

  onHide = (action: Action) => () => {
    this.setState(() => ({ [`show${action}`]: false }))
  }

  render() {
    const { menuOptionIndex } = this.state
    const {
      classes,
      safeAddress,
      createTransaction,
    } = this.props

    return (
      <>
        <Block className={classes.root}>
          <Col xs={3} layout="column">
            <Block className={classes.menu}>
              <Row
                className={cn(classes.menuOption, menuOptionIndex === 1 && classes.active)}
                onClick={this.handleChange(1)}
              >
                Allowances details
              </Row>
              <Hairline />
              <Row
                className={cn(classes.menuOption, menuOptionIndex === 2 && classes.active)}
                onClick={this.handleChange(2)}
              >
                Allowances
              </Row>
              <Hairline />
            </Block>
          </Col>
          <Col xs={9} layout="column">
            <Block className={classes.container}>
              {menuOptionIndex === 1 && (
                <AllowanceModuleDetails
                  safeAddress={safeAddress}
                  createTransaction={createTransaction}
                />
              )}
            </Block>
          </Col>
        </Block>
      </>
    )
  }
}

const allowancesComponent = withStyles(styles)(Allowances)

export default connect(
  undefined,
  actions,
)(allowancesComponent)
