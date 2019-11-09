
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as strings from 'StreamWebPartStrings';
import { getUrlParams, isIE } from "../../helpers/Helpers"
import { Spinner, SpinnerSize, Label } from 'office-ui-fabric-react';
import { IwebpartStreamWebPartProps } from '../StreamWebPart';
import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
} from 'video-react';

export default function WebpartStream(props: IwebpartStreamWebPartProps) {
  const [context, setContext] = React.useState({
    loaded: false,
    hasUrl: false,
    urlStream: '',
    urlSubtitles: '',
  });

  React.useEffect(() => {
    if (context.loaded && context.hasUrl) {
      //Only IE11
      if (isIE()) {
        const spinner = document.getElementsByClassName('video-react-loading-spinner')[0] as HTMLElement
        spinner.style.display='none';
      }
    }
  }, [context.loaded]);


  React.useEffect(() => {
    if (!!props.video && !!props.subtitle)
      setContext({ loaded: true, urlStream: props.video, urlSubtitles: props.subtitle, hasUrl: true })
    else if (/[?&](urlStream)=/.test(window.location.search)) {
      let obj = getUrlParams(window.location.search);
      setContext(state => {
        return { ...state, ...obj }
      });
    }
    else
      setContext(state => {
        return { ...state, loaded: true }
      });
  }, []);


  return (
    <div>
      {!context.loaded ? (
        <Spinner label={strings.Loading} ariaLive="assertive" labelPosition="left" size={SpinnerSize.xSmall} />
      ) : (context.hasUrl ?
        <Player  >
          <source src={context.urlStream} />
          <track label="English" kind="captions" srcLang="en" src={context.urlSubtitles} default={true} />
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
          </ControlBar>
        </Player> : <Label>{strings.FillProperties}</Label>
        )
      }
    </div>
  );
}
