// @flow
import * as React from 'react'
import { h, Component } from 'preact'
import PermissionsPrimer from '../CameraPermissions/Primer'
import PermissionsRecover from '../CameraPermissions/Recover'
import { checkIfWebcamPermissionGranted } from '../utils'
import { includes } from '../utils/array'
import Flow from '../Flow'
import Step from '../Step'

const permissionErrors = ['PermissionDeniedError', 'NotAllowedError', 'NotFoundError']

type State = {
  hasGrantedPermission: ?boolean,
}

type InjectedProps = {
  hasGrantedPermission: boolean,
  onUserMedia: () => void,
  onFailure: Error => void,
}

export default <Props: *>(
    WrappedCamera: React.ComponentType<Props>
  ): React.ComponentType<Props & InjectedProps> =>
  class WithPermissionFlow extends Component<Props, State> {

    static defaultProps = {
      onUserMedia: () => {},
      onFailure: () => {},
    }

    state: State = {
      hasGrantedPermission: undefined,
    }

    componentDidMount() {
      checkIfWebcamPermissionGranted(value =>
        this.setState({ hasGrantedPermission: value || undefined }))
    }

    handleUserMedia = () => {
      this.setState({ hasGrantedPermission: true })
      this.props.onUserMedia()
    }

    handleWebcamFailure = (error: Error) => {
      if (includes(permissionErrors, error.name)) {
        this.setState({ hasGrantedPermission: false })
      } else {
        this.props.onFailure()
      }
    }

    render() {
      const { hasGrantedPermission } = this.state
      const { i18n, trackScreen } = this.props
      return hasGrantedPermission === false ? 
        <PermissionsRecover {...{i18n, trackScreen}} /> : (
        <Flow name="camera">
        {
          hasGrantedPermission !== true ?
            <Step>
              <PermissionsPrimer {...{i18n, trackScreen}} />
            </Step> :
            null
        }
          <Step>
            <WrappedCamera
              {...this.props}
              hasGrantedPermission={hasGrantedPermission}
              onUserMedia={this.handleUserMedia}
              onFailure={this.handleWebcamFailure}
            />
          </Step>
        </Flow>
      )
    }
  }

