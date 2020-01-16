// @flow
import React from 'react'
import { Compound, ENS } from 'safe-widgets'
import styled from 'styled-components'
import { DELEGATE_CALL } from '~/logic/safe/transactions/send'

const AppsWrapper = styled.div`
  margin: 15px;
`

type Props = {
  safeAddress: String,
  web3: any,
  createTransaction: any
}

const multiSendAbi = [
  {
    type: 'function',
    name: 'multiSend',
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    inputs: [{ type: 'bytes', name: 'transactions' }],
    outputs: []
  }
]

function Apps({ web3, safeAddress, createTransaction }: Props) {
  const multiSendAddress = '0xB522a9f781924eD250A11C54105E51840B138AdD'
  // const masterCopyAddress = '0xaE32496491b53841efb51829d6f886387708F99B'
  const multiSend = new web3.eth.Contract(multiSendAbi, multiSendAddress)

  const sendTransactions = (txs: Array<any>) => {
    const encodeMultiSendCalldata = multiSend.methods
      .multiSend(
        `0x${txs
          .map((tx) => [
            web3.eth.abi.encodeParameter('uint8', 0).slice(-2),
            web3.eth.abi.encodeParameter('address', tx.to).slice(-40),
            web3.eth.abi.encodeParameter('uint256', tx.value).slice(-64),
            web3.eth.abi
              .encodeParameter(
                'uint256',
                web3.utils.hexToBytes(tx.data).length
              )
              .slice(-64),
            tx.data.replace(/^0x/, '')
          ].join(''))
          .join('')}`
      )
      .encodeABI()

    return createTransaction({
      safeAddress,
      to: multiSendAddress,
      valueInWei: 0,
      txData: encodeMultiSendCalldata,
      notifiedTransaction: 'STANDARD_TX',
      enqueueSnackbar: () => {},
      closeSnackbar: () => {},
      operation: DELEGATE_CALL,
      navigateToTransactionsTab: false
    })
  }

  return (
    <AppsWrapper>
      <Compound
        web3={web3}
        safeAddress={safeAddress}
        sendTransactions={sendTransactions}
      />
      <ENS
        web3={web3}
        safeAddress={safeAddress}
        sendTransactions={sendTransactions}
      />
    </AppsWrapper>
  )
}

export default Apps
