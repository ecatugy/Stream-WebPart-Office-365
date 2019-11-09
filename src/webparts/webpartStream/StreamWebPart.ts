import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'StreamWebPartStrings';
import WebpartStream from './components/WebPartStream';

export interface IwebpartStreamWebPartProps {
  video: string;
  subtitle: string
}

export default class StreamWebPart extends BaseClientSideWebPart<IwebpartStreamWebPartProps> {

  public render(): void {
    ReactDom.render(React.createElement(WebpartStream, this.properties), this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('video', {
                  label: strings.video
                }),
                PropertyPaneTextField('subtitle', {
                  label: strings.subtitle
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
