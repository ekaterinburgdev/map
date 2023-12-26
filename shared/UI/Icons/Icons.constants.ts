import { Edit } from 'shared/UI/Icons/Edit';
import { IconBaseProps, IconType } from './Icons.types';
import { Copy } from './Copy';
import { Link } from './Link';
import { OKN } from './OKN';
import { Pdf } from './Pdf';
import { Auto } from './Auto';
import { Pedestrian } from './Pedestrian';
import { Bycicle } from './Bycicle';
import { Bike } from './Bike';
import { PublicTransport } from './PublicTransport';
import { Children } from './Children';
import { Download } from './Download';
import { External } from './External';

export const ICON_BY_TYPE: Record<IconType, (props: IconBaseProps) => JSX.Element> = {
  [IconType.Copy]: Copy,
  [IconType.Link]: Link,
  [IconType.OKN]: OKN,
  [IconType.Pdf]: Pdf,
  [IconType.Auto]: Auto,
  [IconType.Pedestrian]: Pedestrian,
  [IconType.Bycicle]: Bycicle,
  [IconType.Bike]: Bike,
  [IconType.PublicTransport]: PublicTransport,
  [IconType.Children]: Children,
  [IconType.Edit]: Edit,
  [IconType.Download]: Download,
  [IconType.External]: External,
};
