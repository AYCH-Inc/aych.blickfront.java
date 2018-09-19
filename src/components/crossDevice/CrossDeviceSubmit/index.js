import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { trackComponent } from '../../../Tracker'
import {preventDefaultOnClick} from '../../utils'
import Title from '../../Title'
import theme from '../../Theme/style.css'
import style from './style.css'
import { withTreeContext } from '../../Tree'

class CrossDeviceSubmit extends Component {
  hasMultipleDocuments = () => {
    const {steps} = this.props
    const documentSteps = steps.filter(step =>
      step.type === 'document'
    )
    return documentSteps.length > 1
  }

  hasFace = () => {
    const {steps} = this.props
    return steps.filter(step => {
      return step.type === 'face'
    }).length > 0
  }

  faceVariant = () => {
    const { captures = {} } = this.props
    const { face = [] } = captures
    return face[0] ? face[0].variant : 'standard'
  }

  render () {
    const i18n = this.props.i18n
    const documentCopy = this.hasMultipleDocuments() ? i18n.t('cross_device.submit.multiple_docs_uploaded') : i18n.t('cross_device.submit.one_doc_uploaded')
    return (
      <div>
        <Title title={i18n.t('cross_device.submit.title')} subTitle={i18n.t('cross_device.submit.sub_title')} />
        <div className={theme.thickWrapper}>
          <ul className={style.uploadList}>
            <li>
              <span className={`${theme.icon} ${style.icon}`}/>
              <span className={style.listText}>{documentCopy}</span>
            </li>
            { this.hasFace() &&
              <li>
                <span className={`${theme.icon} ${style.icon}`}/>
                <span className={style.listText}>{
                  i18n.t(`cross_device.submit.${
                    this.faceVariant() === 'standard' ? 'selfie' : 'video'
                  }_uploaded`)
                }</span>
              </li>
            }
          </ul>

          <div>
            <button
              className={`${theme.btn} ${theme["btn-primary"]} ${theme["btn-centered"]}`}
              onClick={preventDefaultOnClick(this.props.next)}
            >
            {i18n.t('cross_device.submit.action')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ captures }) => ({ captures })

export default connect(mapStateToProps)(trackComponent(withTreeContext(CrossDeviceSubmit), 'desktop_submit'))
