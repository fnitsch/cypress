import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Prism from 'prismjs'

import { CodeFrame } from './err-model'
import ErrorFilePath from './error-file-path'

interface Props {
  codeFrame: CodeFrame
}

@observer
class ErrorCodeFrame extends Component<Props> {
  componentDidMount () {
    Prism.highlightAllUnder(this.refs.codeFrame as ParentNode)
  }

  render () {
    const { line, frame, language } = this.props.codeFrame

    // since we pull out 2 lines above the highlighted code, it will always
    // be the 3rd line unless it's at the top of the file (lines 1 or 2)
    const highlightLine = Math.min(line, 3)

    return (
      <div className='test-err-code-frame'>
        <ErrorFilePath fileDetails={this.props.codeFrame} />
        <pre ref='codeFrame' data-line={highlightLine}>
          <code className={`language-${language || 'text'}`}>{frame}</code>
        </pre>
      </div>
    )
  }
}

export default ErrorCodeFrame
