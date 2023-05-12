import { IconType } from './Icons.types';
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

export const ICON_BY_TYPE = {
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
};
